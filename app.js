/*ecrir Ecrire une api express :
sauvegarde des données dans  un fichier json a chaque modification
authentification (si tout le reste est fait)
*/
const app = require('express')()
const userRouter = require('./user')
const itemsRouter = require('./items')
const listRouter = require('./list')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/user', userRouter)
app.use('/items', itemsRouter)
app.use('/list', listRouter)

app.get('/', (req, res) =>{

    res.end("hello world !")
})
app.listen(3000, () =>{
    console.log('App listening on port 3000')
    

})
/*
function loggerMiddleware(req, res, next) {
    console.log(`New request received :
   <== [${req.method}] ${req.originalUrl}`)
    next()
   }

*/