const express = require ('express');
const fs = require('fs');
const router = express.Router();

// composant : id, name, user, items
//listing 
router.get('/', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).send(err);
      } else {
          console.log(data);
          var obj = JSON.parse(data);
          res.json(obj.list)
      }
    })
  });


//ajout
router.post('/', (req, res) => {    
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            console.log("avant ajout : ", data);
            var obj = JSON.parse(data);
            obj.list.push({id:req.body.id, name:req.body.name, user:req.body.user, items:req.body.items});
            var json = JSON.stringify(obj, null, 4);
            fs.writeFile('data.json', json, 'utf8', (error) => {
                if (err) {
                    console.error(error);
                    res.status(500).send(error);
                } 
                console.log("apres ajout :", data)
                res.json(obj.list)
            });
        }
    })
  });
  
  // suppression d'un list
  router.delete('/:id', (req,res) =>{
    fs.readFile('./data.json', 'utf8', (err, data) => {
      if(err){
        console.log(err);
        res.status(500).send(err);
      }
      else{
        console.log("avant suppression : " ,data);
        var obj = JSON.parse(data);
        obj.list = obj.list.filter(list => {
          if(list.id === req.params.id) { return false } else { return true }
        })
        var json = JSON.stringify(obj, null, 4);
        fs.writeFile('data.json', json, 'utf8', (error) => {
          if (err) {
              console.error(error);
              res.status(500).send(error);
          } 
          console.log("apres suppression : ", data)
          res.send(true);
      });
      }
    })
  })
  
module.exports = router;