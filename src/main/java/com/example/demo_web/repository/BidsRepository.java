package com.example.demo_web.repository;

import com.example.demo_web.model.Auction;
import com.example.demo_web.model.Bids;
import com.example.demo_web.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface BidsRepository extends JpaRepository<Bids, Integer> {
    ArrayList<Bids> findByAuctionBids(Auction auction);
}
