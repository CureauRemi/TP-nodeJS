const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017/';
// Database Name
const dbName = 'Pascal'
// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true })
// Use connect method to connect to the Server
class mongoConnector {
  init(){
      return new Promise((resolve, reject)=>{
          client.connect()
              .then(connectedClient =>{
                this.client = connectedClient
                this.dbName = dbName
                this.db = connectedClient.db(dbName)
                console.log("Connected on Mongo Server")
                resolve(connectedClient)
              })
              .catch(err =>{
                console.error("failed to connect to server")
                throw err
         
              })
          
     
      })     
     
  }
}
const connector = new mongoConnector()
module.exports = connector;