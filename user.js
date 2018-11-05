const express = require ('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Tous les utlisateurs');
});

// ajout d'un user
router.post('/', (req, res) => {    
  fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).send(err);
      } else {
          console.log(data);
          var obj = JSON.parse(data);
          obj.user.push({id:req.body.id, name:req.body.name, password:req.body.password});
          var json = JSON.stringify(obj);
          fs.writeFile('data.json', json, 'utf8', (error) => {
              if (err) {
                  console.error(error);
                  res.status(500).send(error);
              } 
              res.json(obj.user)
          });
      }
  })
});

// suppression d'un user
router.delete('/:id', (req,res) =>{
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if(err){
      console.log(err);
      res.status(500).send(err);
    }
    else{
      console.log(data);
      var obj = JSON.parse(data);
      obj.user = obj.user.filter(user => {
        if(user.id === req.params.id) { return false } else { return true }
      })
      var json = JSON.stringify(obj);
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



/*
router.put('/:id', (req,res) =>{
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if(err){
      console.log(err);
      res.status(500).send(err);
    }
    else{
      console.log(data);
      var obj = JSON.parse(data);


    }
  })
})
*/
module.exports = router;