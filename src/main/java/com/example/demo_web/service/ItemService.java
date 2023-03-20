package com.example.demo_web.service;

import com.example.demo_web.model.Item;
import com.example.demo_web.response.BaseResponse;
import com.example.demo_web.response.DeleteItemResponse;
import com.example.demo_web.response.GetAllItemResponse;
import com.example.demo_web.response.UpdateItemResponse;

import java.util.ArrayList;

public interface ItemService {
    Item saveItem(Item item);
    GetAllItemResponse getAllItem();

    UpdateItemResponse updateItem(Item item);
    DeleteItemResponse deleteItem(int id_item);
}
