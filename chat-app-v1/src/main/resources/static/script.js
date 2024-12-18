const stompClient = new StompJs.Client({
	brokerURL: 'ws://localhost:9091/server1'
});

stompClient.onConnect = (frame) => {
	setConnected(true);
	console.log('Connected: ' + frame);
	stompClient.subscribe('/topic/chat-message', (message) => {
		//console.log(message)
		console.log(JSON.parse(message.body).name)
		//showGreeting()
		showGreeting(JSON.parse(message.body).name)
	});
};

function setConnected(connected) {
	$("#connect").prop("disabled", connected);
	$("#disconnect").prop("disabled", !connected);
	if (connected) {
		$("#conversation").show();
	}
	else {
		$("#conversation").hide();
	}
	$("#greetings").html("");
}

function sendName() {
	stompClient.publish({
		destination: "/app/hello",
		body: JSON.stringify({ 'name': $("#name").val() })
	});
}

function showGreeting(message) {
	$("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function() {
	$("form").on('submit', (e) => e.preventDefault());
	$("#connect").click(() => connect());
	$("#disconnect").click(() => disconnect());
	$("#send").click(() => sendName());
});

function connect() {
	stompClient.activate();
}

function disconnect() {
	stompClient.deactivate();
	setConnected(false);
	console.log("Disconnected");
}

stompClient.onWebSocketError = (error) => {
	console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
	console.error('Broker reported error: ' + frame.headers['message']);
	console.error('Additional details: ' + frame.body);
};