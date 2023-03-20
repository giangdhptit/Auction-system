package com.example.demo_web.response;

import com.example.demo_web.model.Bids;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddBidsResponse extends BaseResponse{
    private Bids result;
}
