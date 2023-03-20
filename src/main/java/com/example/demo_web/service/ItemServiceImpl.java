package com.example.demo_web.service;

import com.example.demo_web.config.MessageConfig;
import com.example.demo_web.model.Item;
import com.example.demo_web.repository.ItemRepository;
import com.example.demo_web.response.DeleteItemResponse;
import com.example.demo_web.response.GetAllItemResponse;
import com.example.demo_web.response.UpdateItemResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor

public class ItemServiceImpl implements ItemService{
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    AuctionServiceIpml auctionServiceIpml;
    @Autowired
    MessageConfig messageConfig;
    private static final String EXTERNAL_FILE_PATH = "src/main/resources/static/item-photos/";

    @Override
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public GetAllItemResponse getAllItem() {
        ArrayList<Item> listItem =(ArrayList<Item>) itemRepository.getAllItem();
        GetAllItemResponse res = new GetAllItemResponse();
        res.setCode(messageConfig.CODE_SUCCESS);
        res.setMessage(messageConfig.MESSAGE_GETALLITEM);
        res.setResult(listItem);
        return res;
    }

    @Override
    public UpdateItemResponse updateItem(Item item) {
        UpdateItemResponse res = new UpdateItemResponse();
        Item oldItem = itemRepository.findById(item.getId()).orElse(null);
        if(!oldItem.getName().equals(item.getName())){
            oldItem.setName(item.getName());
        }
        if(!oldItem.getDescription().equals(item.getDescription())){
            oldItem.setDescription(item.getDescription());
        }
        if(!oldItem.getNameImage().equals(item.getNameImage())){
            Path path = Paths.get(EXTERNAL_FILE_PATH+oldItem.getId()+"/"+oldItem.getNameImage());
            try {
                Files.delete(path);
                System.out.println("File or directory deleted successfully");
            } catch (NoSuchFileException ex) {
                System.out.printf("No such file or directory: %s\n", path);
            } catch (DirectoryNotEmptyException ex) {
                System.out.printf("Directory %s is not empty\n", path);
            } catch (IOException ex) {
                System.out.println(ex);
            }
            oldItem.setNameImage(item.getNameImage());
        }
        res.setCode(messageConfig.CODE_SUCCESS);
        res.setMessage(messageConfig.MESSAGE_UPDATEITEM);
        res.setResult(itemRepository.save(oldItem));
        return res;
    }

    @Override
    public DeleteItemResponse deleteItem(int item_id) {
        DeleteItemResponse res = new DeleteItemResponse();
        Item item = itemRepository.findById(item_id).orElse(null);
        item.setIsDelete(1);
        itemRepository.save(item);
        auctionServiceIpml.deleteItemAuction(item);
        res.setCode(messageConfig.CODE_SUCCESS);
        res.setMessage(messageConfig.MESSAGE_DELETEITEM);
        res.setResult(true);
        return res;
    }



}
