package com.example.demo_web.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.io.Serializable;
import javax.persistence.CascadeType;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "auctions")
public class Auction implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;
    @Column(name = "initPrice",nullable = false)
    private int initPrice;
    @Column(name = "currentPrice",nullable = false)
    private int currentPrice;
    @Column(name = "timeStart",nullable = false)
    private LocalDateTime timeStart;
    @Column(name = "timeEnd",nullable = false)
    private LocalDateTime timeEnd;
    @Column(name = "isDelete",nullable = false)
    private int isDelete;
    @Column(name = "creatAt")
    @CreationTimestamp
    private LocalDateTime creatAt;
    @Column(name = "modifyAt")
    @UpdateTimestamp
    private LocalDateTime modifyAt;
    @Column(name = "status")
    private int status;
    @OneToOne
    @JoinColumn(name = "idItem", nullable = false)
    private Item item;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "auctionBids")
    @JsonIgnore
    private List<Bids> listBid = new ArrayList<>();
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "auctionTransaction")
    @JsonIgnore
    private List<Transaction> listTransaction=new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "idUserCreate", nullable = false)
    private User userCreate;
    @OneToOne
    @JoinColumn(name = "idWinner")
    private User winner;
}
