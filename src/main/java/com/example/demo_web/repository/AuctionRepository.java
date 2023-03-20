package com.example.demo_web.repository;

import com.example.demo_web.model.Auction;
import com.example.demo_web.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Integer> {
    @Query(value = "select * from auctions where name like %:name% and status <> -1 and is_delete <> 1 ",nativeQuery = true)
    ArrayList<Auction> searchAuction(@Param("name") String name);
    @Query(value = "select * from auctions where id_item =  :idItem and status <> -1 ",nativeQuery = true)
    ArrayList<Auction> getAuctionItemDelete(@Param("idItem") int idItem);
    @Query(value = "select * from auctions where status = 1 and is_delete <> 1",nativeQuery = true)
    ArrayList<Auction> getAuctionProgressing();
    @Query(value = "select * from auctions where is_delete <> 1",nativeQuery = true)
    ArrayList<Auction> getAllAuction();
}
