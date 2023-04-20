import bcrypt from 'bcrypt';
import neo4j from 'neo4j-driver';

require('dotenv').config()

const {
    url,
    db_username,
    db_password,
    database,
} = process.env
const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password));
const findAll = async () => {
    const newSession = driver.session({database})
    const transaction = newSession.beginTransaction()
    const result = transaction.run(`MATCH (n:User) RETURN n`)
    await transaction.commit()
    await newSession.close()
    return result.record
}

const addNewUser = async (user) => {
    try {
        const newSession = driver.session({database});
        const existingUser = await newSession.run(`MATCH (u:User) WHERE u.nickname = $nickname OR u.email = $email RETURN u`, {
            nickname: user.nickname,
            email: user.email
        });
        if (existingUser.records.length > 0) {
            await newSession.close();
            console.log("user already exist")
            return {status: 'error', message: 'User already exists'};
        }
        const hash = await bcrypt.hash(user.password, 10);
        await newSession.run(`CREATE (n:User {nickname: $nickname, email: $email, password: $password})`, {
            nickname: user.nickname,
            email: user.email,
            password: hash
        });
        await newSession.close();
        console.log("user created")
        return {status: 'success', message: user.nickname};
    } catch (error) {
        throw new Error(error);
    }
};

const login = async (user) => {
    try {
        const session = driver.session({database});
        const result = await session.run(`MATCH (u:User {email: $email}) RETURN u`, {email: user.email});
        await session.close();
        if (result.records.length === 0) {
            console.log("user not found")
            return {status: 'error', message: 'User not found'};
        }
        const userData = result.records[0].get("u").properties;
        const match = await bcrypt.compare(user.password, userData.password);
        if (match) {
            console.log("user logged in")
            return {status: 'success', message: userData.nickname};
        } else {
            console.log("incorrect password")
            return {status: 'error', message: 'Incorrect password'};
        }
    } catch (error) {
        throw new Error(error);
    }
};

const createNewGame = async (user) => {
    try {
        const session = driver.session({database});
        await session.run(`MERGE (user:User {nickname: "${user.nickname}"}) CREATE (game:Game {id: "${user.id}", nickname: "${user.nickname}", score: 0}) CREATE (user)-[:GAME]->(game)`);
        await session.close();
        return {status: 'success', message: 'game created'}
    } catch (error) {
        throw new Error(error);
    }
}
//
const putNewScore = async (game) => {
    try {
        const session = driver.session({database})
        await session.run(`MATCH (game: Game) WHERE game.id = '${game.id}' SET game.score = '${game.score}'`)
        await session.close();
        return {status: 'success', message: 'score added'}
    } catch (error) {
        throw new Error(error)
    }
}

const getUser = async (nickname) => {
    try {
        const session = driver.session({database})
        const result = await session.run(`MATCH (u:User) WHERE u.nickname = '${nickname}' RETURN u`)
        await session.close();
        if (result.records[0]) {
            return {
                nickname: result.records[0].get('u').properties.nickname,
                email: result.records[0].get('u').properties.email
            };
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(error)
    }
}

const putUser = async (user) => {
    try {
        const session = driver.session({database})
        await session.run(`MATCH (u:User) WHERE u.nickname = '${user.nickname}' SET u.email = '${user.email}' RETURN u`)
        await session.close();

        return {status: "success"}
    } catch (error) {
        throw new Error(error)
    }
}


const getBestScore = async () => {
    try {
        const session = driver.session({database})
        const result = await session.run(`MATCH (g:Game) RETURN g ORDER BY g.score ASC LIMIT 10`)
        await session.close()
        return result.records.map(record => record.get('g').properties)
    } catch (error) {
        throw new Error(error)
    }
}

const deleteUser = async (nickname) => {
    try {
        const session = driver.session({database})
        await session.run(`MATCH (u:User {nickname: '${nickname}'}) DETACH DELETE u`)
        await session.close()
        return {status: "success"}
    } catch (error) {
        throw new Error(error)
    }
}


export default {
    findAll,
    addNewUser,
    login,
    createNewGame,
    putNewScore,
    getUser,
    putUser,
    getBestScore,
    deleteUser
}
