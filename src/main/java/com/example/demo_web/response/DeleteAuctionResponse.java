package com.example.demo_web.response;

import com.example.demo_web.model.Auction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteAuctionResponse extends BaseResponse{
    private boolean result;
}
