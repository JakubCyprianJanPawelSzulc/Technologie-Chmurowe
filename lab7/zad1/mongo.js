use ('myDB')
db.createCollection('users')
db.users.insertOne({name: 'user', last_name: 'kowalski'})
db.users.find()