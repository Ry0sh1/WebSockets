'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var username = null;

var colors= [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event){
    username = document.querySelector('#name').value.trim();
    if (username){
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        //Connect to ServerSocket

        var socket = new SocketJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }

    //Prevent normal process of the event. In this example its preventing the normal Submit behavior
    event.preventDefault();
}


function onConnected() {
    //Subscribe to the public topic
    stompClient.subscribe("/topic/public",onMessageReceived)

    //Tell username to server
    //Send it as JSON because of responseBody. responsebody has to be a json
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender:username,type:'JOIN'})
    );
}
function onMessageReceived() {

}

usernameForm.addEventListener('submit', connect, true);
