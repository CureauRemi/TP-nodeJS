var socket= io();
var listUtil = document.getElementById('listeUtil');
var messageDiv = document.getElementById('messageDiv');
var submitBtn = document.getElementById('submitBtn');
var messageInput = document.getElementById('messageInput');
var submitPseudo = document.getElementById('submitPseudo');
var pseudoUtil = document.getElementById('pseudoUtil');
var pseudoInput = document.getElementById('pseudoInput');
var user =[];
var id= null;
var pseudo = null;
// écoute sur les boutons !
submitPseudo.addEventListener('click', () =>{
    pseudo = pseudoInput.value;
    socket.emit('pseudo', pseudoInput.value);
    pseudoInput.value ='';
    pseudoUtil.style.display = "none";
});
submitBtn.addEventListener('click', () =>{
    socket.emit('message', messageInput.value, user.pseudo);
    messageInput.value= '';
});
socket.on('message', data =>{
    //console.log('message received', data);
    //console.log(data);
    messageDiv.innerHTML += '<p>' + data +"</p><hr></hr>";
});
socket.on('pseudo', (user) =>{
    //console.log('user received', user);
    user.forEach(user =>{
        id =  user.id;
        listUtil.innerHTML += '<p><i>' + id.substr(0,5) + "...</i> - "+ user.pseudo +"</p>"
    })
});