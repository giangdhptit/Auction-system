package com.example.demo_web.response;

import com.example.demo_web.model.Auction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Optional;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAuctionResponse extends BaseResponse{
    private Auction result;
}
