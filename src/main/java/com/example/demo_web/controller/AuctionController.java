package com.example.demo_web.controller;

import com.example.demo_web.config.MessageConfig;
import com.example.demo_web.model.Auction;
import com.example.demo_web.repository.AuctionRepository;
import com.example.demo_web.request.AddAuctionRequest;
import com.example.demo_web.request.DeleteAuctionRequest;
import com.example.demo_web.request.UpdateAuctionRequest;
import com.example.demo_web.response.*;
import com.example.demo_web.service.AuctionServiceIpml;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequiredArgsConstructor
@RequestMapping("/auction")
public class AuctionController {
    @Autowired
    AuctionServiceIpml auctionServiceIpml;
    @GetMapping("/getAllAuctions")
    public ResponseEntity getAllAuction(){
        GetAllAuctionResponse res = auctionServiceIpml.getAllAuction();
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/addAuction")
    public ResponseEntity addAuction(@RequestBody AddAuctionRequest req) {
        AddAuctionResponse res= auctionServiceIpml.addAuction(req);
        return ResponseEntity.ok().body(res);
    }
    @DeleteMapping("/deleteAuction")
    public ResponseEntity deleteAuction(@RequestBody DeleteAuctionRequest req){
        int idAuction = req.getIdAuction();
        DeleteAuctionResponse res = auctionServiceIpml.deleteAuction(idAuction);
        return ResponseEntity.ok().body(res);
    }
    @GetMapping("/findAuctionByName")
    public ResponseEntity findAuctionByName(@RequestParam String name){
        FindAuctionbyNameResponse res =auctionServiceIpml.findAuctionbyName(name);
        return ResponseEntity.ok().body(res);
    }
    @GetMapping("/getAuctionInProgress")
    public ResponseEntity getAuctionInProgress(){
        GetAuctionInProgressResponse res = auctionServiceIpml.getAuctionInProgress();
        return ResponseEntity.ok().body(res);
    }
}
