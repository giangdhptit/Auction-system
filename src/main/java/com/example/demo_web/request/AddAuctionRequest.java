package com.example.demo_web.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddAuctionRequest {
    private int initPrice;
    private LocalDateTime timeStart;
    private LocalDateTime timeEnd;
    private int idUser;
    private int idItem;
}
