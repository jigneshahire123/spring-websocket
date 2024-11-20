package com.chatapp.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.chatapp.websocket.chat.Message;

@RestController
public class ChatController {

	@MessageMapping("/message") // /app/message > client will send to this
	@SendTo("/chatroom/public") // route to /topic/chatroom/public > client has to listen to this
	public String getMessage(@Payload String message) {
		String msg = null;
		if (message != null || message.length() > 0) {
			msg = message;
		}
		return msg;
	}

}
