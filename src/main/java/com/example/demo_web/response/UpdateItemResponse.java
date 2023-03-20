package com.example.demo_web.response;

import com.example.demo_web.model.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateItemResponse extends BaseResponse{
    private Item result;
}
