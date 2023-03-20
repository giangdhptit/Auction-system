package com.example.demo_web.service;

import com.example.demo_web.config.MessageConfig;
import com.example.demo_web.model.Bids;
import com.example.demo_web.repository.AuctionRepository;
import com.example.demo_web.repository.BidsRepository;
import com.example.demo_web.repository.UserRepository;
import com.example.demo_web.request.BidMessage;
import com.example.demo_web.response.AddBidsResponse;
import com.example.demo_web.tokenAuthen.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BidsServiceImpl implements BidsService {
    @Autowired
    BidsRepository bidsRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuctionRepository auctionRepository;
    @Autowired
    MessageConfig messageConfig;
    @Override
    public void addBids(BidMessage bidMessage,int auction_id) {
        Bids bids = new Bids();
        bids.setBid_price(bidMessage.getBid_price());
        bids.setAuctionBids(auctionRepository.findById(auction_id).orElse(null));
        bids.setUserBids( userRepository.findByUsername(bidMessage.getSender()));
        bidsRepository.save(bids) ;
        return;
    }
}
