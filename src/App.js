import logo from './logo.svg';
import './App.css';
import {Button} from "./Button";
import Stomp from "stompjs";
//import socket from "socketjs";
import SockJS from "sockjs-client";



//var url = "ws://localhost:15674/ws";
//var client = Stomp.client(url);
var stompClient = null;


var socket1 = new SockJS('http://localhost:8082/gs-guide-websocket');
stompClient = Stomp.over(socket1);
stompClient.connect();
stompClient.subscribe('/topic/greetings', function (greeting) {
    showGreeting(JSON.parse(greeting.body).content);
});

function showGreeting(message) {
    console.log("show greeting" +message);
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify("name sent"));
}

function App() {


    return (
        <div className="App">
            <header className="App-header">

                <Button
                    width="100%"
                    onClick={() => sendName()}
                >
                    Click here to register
                </Button>



            </header>
        </div>
    );
}

export default App;

