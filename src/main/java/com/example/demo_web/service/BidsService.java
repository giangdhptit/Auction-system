package com.example.demo_web.service;

import com.example.demo_web.request.BidMessage;
import com.example.demo_web.response.AddBidsResponse;

public interface BidsService {
    void addBids (BidMessage bidMessage, int auction_id);
}
