const app = require('express')()
const moviesRouter = require('./movies')
const fs = require('fs')
const bodyParser = require('body-parser')

//--------------------------------------------------------
// Connexion a mongoDB
//--------------------------------------------------------

const mongoDbClient = require('./mongo.connector')
mongoDbClient.init()
    .then(client =>{
        app.use(bodyParser.json())
        app.use('/movies', moviesRouter)
        app.get('/', (req, res) =>{
            res.sendFile(__dirname + "/views/index.html" )
        })
        app.listen(4600, () =>{
            console.log('App listening on port 4600')
        })        
    }).catch(err => { throw err})