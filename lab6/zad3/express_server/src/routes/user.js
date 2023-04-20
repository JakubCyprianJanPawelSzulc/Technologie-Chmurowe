import {Router} from "express";
import userModel from '../models/user'

const user = Router()
const expiresInMinutes = 30;


user.get('/', async (req, res) => {
    const result = await userModel.findAll()
    res.json(result)
})

user.post('/registration', async (req, res) => {
    const result = await userModel.addNewUser(req.body)
    if (result.status === 'success') {
        res.cookie('isLoggedIn', true, {
            expires: new Date(Date.now() + expiresInMinutes * 60000),
            httpOnly: true,
        });
        res.json({status: 'success', nickname: result.message})

    } else {
        res.json("login failed")
    }
})

user.post('/login', async (req, res) => {
    const result = await userModel.login(req.body)
    if (result.status === 'success') {
        res.cookie('isLoggedIn', true, {
            expires: new Date(Date.now() + expiresInMinutes * 60000),
            httpOnly: true,
        });

        res.cookie('nickname', result.message, {
            expires: new Date(Date.now() + expiresInMinutes * 60000),
            httpOnly: true
        });
        res.json({status: 'success', nickname: result.message})

    } else {
        res.json("login failed")
    }
})

user.get('/check-cookie', async (req, res) => {
    if (req.cookies.isLoggedIn) {
        res.json({isLoggedIn: true, nickname: req.cookies.nickname});
    } else {
        res.json({isLoggedIn: false});
    }
});

user.get('/logout', (req, res) => {
    res.clearCookie('isLoggedIn');
    res.clearCookie('nickname');
    res.redirect('/login');
});

user.get('/leaderboard', async (req, res) => {
    const result = await userModel.getBestScore();
    res.json(result)
});

user.post('/:nickname/game', async (req, res) => {
    await userModel.createNewGame(req.body)
    console.log(req.body.id)
    console.log("new game")
    res.json("success")
})

user.put('/:nickname/game', async (req, res) => {
    console.log(req.body.id)
    await userModel.putNewScore(req.body)
    res.json("success")
})

user.get('/:nickname', async (req, res) => {
    const result = await userModel.getUser(req.params.nickname)
    res.json(result)
})

user.delete('/:nickname', async (req, res) => {
    await userModel.deleteUser(req.params.nickname)
    res.json("success")
})

user.put('/:nickname', async (req, res) => {
    await userModel.putUser(req.body)
    res.json(req.body)
})




export default user


