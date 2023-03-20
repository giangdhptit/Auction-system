package com.example.demo_web.response;

import com.example.demo_web.model.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class GetAllItemResponse extends BaseResponse{
    private ArrayList<Item> result;
}
