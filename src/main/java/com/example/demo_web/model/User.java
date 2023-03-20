package com.example.demo_web.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable,UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;
    @Column(name = "username",nullable = false)
    private String username;
    @Column(name = "password",nullable = false)
    private String password;
    @Column(name = "address",nullable = false)
    private String address;
    @Column(name = "name",nullable = false)
    private String name;
    @Column(name = "email",nullable = false)
    private String email;
    @Column(name = "dob",nullable = false)
    private String dob;
    @Column(name = "nameAvatar",nullable = false)
    private String nameAvatar;
    @Column(name = "role",nullable = false)
    private String role;
    @Column(name = "balance",nullable = false)
    private int balance;
    @Column(name = "creatAt")
    @CreationTimestamp
    private LocalDateTime creatAt;
    @Column(name = "modifyAt")
    @UpdateTimestamp
    private LocalDateTime modifyAt;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userBids", cascade= CascadeType.ALL)
    @JsonIgnore
    private List<Bids> listBidUser=new ArrayList<>();
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userCreate", cascade= CascadeType.ALL)
    @JsonIgnore
    private  List<Auction> listAuctionCreated=new ArrayList<>();
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userTransaction", cascade= CascadeType.ALL)
    @JsonIgnore
    private List<Transaction> listTransactionUser=new ArrayList<>();

    @Transient
    public String getPhotosImagePath() {
        if (nameAvatar == null ) return null;

        return "http://localhost:8080/user/imageUser/" + id + "/" + nameAvatar;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("ROLE_"+this.getRole()));
        return authorities;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}