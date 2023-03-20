package com.example.demo_web.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BidMessage {
    private MessageType type;
    private String sender;
    private int bid_price;

    public enum MessageType {
        BID,
        JOIN,
        LEAVE
    }
}