package com.example.demo_web.response;

import com.example.demo_web.model.Auction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse {
    protected int code;
    protected String message;

}
