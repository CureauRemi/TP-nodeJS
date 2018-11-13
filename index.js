const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('static'));


var personneConnecte = [];
// une connection vers le chat
io.on('connection', socket =>{
var stock= null;
var pseudo = "Anne Onyme";
    // un utilisateur
    socket.on('pseudo', (data) =>{
        pseudo = data;
        console.log("pseudo de l'utilisateur : ", data);

        personneConnecte.push({'id' : socket.id, 'pseudo':data});
        // console.log(personneConnecte);
        io.emit("pseudo", personneConnecte);
    });
    console.log('user connected : ', socket.id, pseudo);
    socket.on('loaded', data =>{
        console.log('data from client : ', data)
        });
    // un utlisateur reçoit le message
    socket.on('message', (data) =>{
            console.log(data);
            var date = new Date();
            var heure =date.getHours();
            var minute=date.getMinutes();
            var seconde=date.getSeconds();

            //console.log('message received : ', data);
            var string = heure + ":" + minute + ":" + seconde;
            //console.log ("l'heure à laquelle le message est envoyé :", string);
            data =  data + ' - '+ string;
            //console.log("message with pseudo : ", data);
            // on stocke les messages dans le cas ou une personne arrive en cours de route
            stock += data;
            // console.log(stock);
            io.emit('message',data)
        })

    });

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/views/index.html');
});

// démarrage du serveur
http.listen(3000, () => {
    console.log('Server is up and running on http://locahost:3000')
});