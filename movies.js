const express = require ('express');
const fs = require('fs');
const router = express.Router();

const mongoDbClient = require('./mongo.connector')

/* const movies = document.getElementById('moviesRead').innerHTML; */


// listing des films
router.get('/', (req, res) => {
      mongoDbClient.db.collection("movies").find({}, (error, result) =>{
      if(error){ res.status(500).send(error);}
      result.toArray().then((array) =>{
        res.send(array);
     }).catch(console.error)
    }); 
});


// ajout d'un item
router.post('/', (req, res) => {    

  });

// get by id
  router.get('/:id', (req,res) =>{
/*     try {
         mongoDbClient.db.movies.find({"_id":req.params.id}); 
        mongoDbClient.db.movies.find();
     } catch (e) {
        console.log(e)
     } */


  })


// get by title
router.get('/:title', (req,res) =>{
    /* console.log("requete :",req) */
    fs.readFile('./data.json', 'utf8', (err, data) => {
      if(err){
        console.log(err);
        res.status(500).send(err);
      }
      else{
        //console.log(data);
        var obj = JSON.parse(data);
        obj.findOne({
            'title': req.params.id
        }, (req, res) => {
            //send 400 status code if record not found
            if (err) return res.status(400).send("record doesn't exists");
            console.log(movies);
            res.send(movies)
        })
        /* obj.movies = obj.movies.filter(movies => {
          if(movies._id === req.params.id) { return false } else { return movies. }
        }) */
        var json = JSON.stringify(obj, null, 4);
        fs.writeFile('./data.json', json, 'utf8', (error) => {
          if (err) {
              console.error(error);
              res.status(500).send(error);
          } 
          res.send(obj.movies);
      }); 
      }
    })
  })

  // suppression d'un item
  router.delete('/:id', (req,res) =>{
    fs.readFile('./data.json', 'utf8', (err, data) => {
      if(err){
        console.log(err);
        res.status(500).send(err);
      }
      else{
        //console.log(data);
        var obj = JSON.parse(data);
        obj.movies = obj.movies.filter(movies => {
          if(movies.id === req.params.id) { return false } else { return true }
        })
        var json = JSON.stringify(obj, null, 4);
        fs.writeFile('data.json', json, 'utf8', (error) => {
          if (err) {
              console.error(error);
              res.status(500).send(error);
          } 
          res.send(true);
      });
      }
    })
  })
module.exports = router;