package com.ryoshi.WebsocketLearning.controller;

import com.ryoshi.WebsocketLearning.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat")    //Basic Mapping Where you want to send the message *FROM*
    @SendTo("/topic/public")    //Where you want to send the message
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage){
        return chatMessage;
    }

    //When joining!
    //This will get send when you join and this will get wrapped by WebSocketEventlistener
    @MessageMapping("/chat")    //Basic Mapping Where you want to send the message *FROM*
    @SendTo("/topic/public")
    public ChatMessage user(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){
        // Add username in WebSocket Session
        headerAccessor.getSessionAttributes().put("username",chatMessage.getSender());
        return chatMessage;
    }

}
