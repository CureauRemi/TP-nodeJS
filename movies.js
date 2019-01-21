const express = require ('express');
const fs = require('fs');
const router = express.Router();
const objectID = require('mongodb').ObjectId
const mongoDbClient = require('./mongo.connector')


//----------------------------------------------------------
//               READ
//----------------------------------------------------------
// listing des films
router.get('/', (req, res) => {
      mongoDbClient.db.collection("movies").find({}, (error, result) =>{
      if(error){ res.status(500).send(error);}
      result.toArray().then((array) =>{
        res.send(array);
     }).catch(console.error)
    }); 
});
//endregion


// get by id
router.get('/:id', (req,res) =>{
  mongoDbClient.db.collection("movies").findOne( {"_id": parseInt(req.params.id)} , (error, result) =>{
    console.log("id : ", req.params.id)
  if(error){ res.status(500).send(error);}
   console.log(result);
  res.send(result); 
  }) 
})

//----------------------------------------------------------
//               CREATE
//----------------------------------------------------------
// ajout d'un film
router.post('/insertOne/', (req, res) => {
   mongoDbClient.db.collection("movies").insertOne( req.body , (error, result) =>{
    if(error){ res.status(500).send(error);}
      console.log(result)
      res.send(`Film ajouté, son identifiant est : ${result.insertedId}`)
    }); 
});
  // suppression d'un film
  // DELETE A REVOIR
router.delete('/deleteOne/:title', (req,res) =>{
  mongoDbClient.db.collection("movies").remove( {"_id": parseInt(req.params.title)} , (error, result) =>{
    console.log("title : ", req.params.title)
  if(error){ res.status(500).send(error);}
   console.log(result);
  res.send(result); 
  })
})
module.exports = router;