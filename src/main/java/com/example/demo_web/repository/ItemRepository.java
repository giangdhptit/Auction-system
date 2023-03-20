package com.example.demo_web.repository;

import com.example.demo_web.model.Auction;
import com.example.demo_web.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    Item findItemById(int id);
    @Query(value = "select * from items where is_delete <> 1",nativeQuery = true)
    ArrayList<Item> getAllItem();
}
