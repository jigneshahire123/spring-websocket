package com.chatapp.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.chatapp.websocket.chat.Message;

@RestController
public class ChatController {
	
	@MessageMapping("/hello")
	@SendTo("/topic/chat-message")
	public Message getMessage(@Payload Message message) {
		return message;
	}

}
