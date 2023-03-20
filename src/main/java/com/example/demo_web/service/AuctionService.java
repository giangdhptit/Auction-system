package com.example.demo_web.service;

import com.example.demo_web.model.Auction;

import com.example.demo_web.model.Item;
import com.example.demo_web.request.AddAuctionRequest;
import com.example.demo_web.response.*;


public interface AuctionService {
    AddAuctionResponse addAuction(AddAuctionRequest req);
    GetAllAuctionResponse getAllAuction();
    DeleteAuctionResponse deleteAuction(int idAuction);
    FindAuctionbyNameResponse findAuctionbyName(String name);

    void deleteItemAuction(Item item);
    GetAuctionInProgressResponse getAuctionInProgress();

}
