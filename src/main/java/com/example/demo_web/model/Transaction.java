package com.example.demo_web.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="transactions")
public class Transaction implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID",nullable = false)
    private int id;
    @Column(name="paid",nullable = false)
    private int paid;
    @Column(name = "creatAt")
    @CreationTimestamp
    private LocalDateTime creatAt;
    @Column(name = "modifyAt")
    @UpdateTimestamp
    private LocalDateTime modifyAt;
    @ManyToOne
    @JoinColumn(name = "idAuction", nullable = false)
    private Auction auctionTransaction;
    @ManyToOne
    @JoinColumn(name = "idUser", nullable = false)
    private User userTransaction;

}
