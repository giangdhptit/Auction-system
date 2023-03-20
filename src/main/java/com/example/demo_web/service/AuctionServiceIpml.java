package com.example.demo_web.service;

import com.example.demo_web.config.MessageConfig;
import com.example.demo_web.model.*;
import com.example.demo_web.model.Auction;
import com.example.demo_web.repository.*;
import com.example.demo_web.request.AddAuctionRequest;
import com.example.demo_web.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AuctionServiceIpml implements AuctionService{
    @Autowired
    AuctionRepository auctionRepository;
    @Autowired
    UserServiceImpl userService;
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BidsRepository bidsRepository;
    @Autowired
    MessageConfig messageConfig;

    @Override
    public AddAuctionResponse addAuction(AddAuctionRequest req)  {
        AddAuctionResponse res = new AddAuctionResponse();
        Auction newauction = new Auction();
        try {
            newauction.setTimeStart(req.getTimeStart());
            newauction.setCurrentPrice(req.getInitPrice());
            newauction.setInitPrice(req.getInitPrice());
            newauction.setStatus(0);
            newauction.setIsDelete(0);
            newauction.setTimeEnd(req.getTimeEnd());
            User user = userRepository.findById(req.getIdUser()).orElse(null);
            Item item = itemRepository.findById(req.getIdItem()).orElse(null);
            newauction.setUserCreate(user);
            newauction.setItem(item);
            ArrayList<Auction>listAuction =(ArrayList<Auction>) auctionRepository.findAll();
            for(Auction auction :listAuction){
                if(auction.getItem().getId()== item.getId()){
                    res.setCode(messageConfig.CODE_FAILED);
                    res.setMessage(messageConfig.MESSAGE_ADDAUCTIONFAIL);
                    return res;
                }
            }
            res.setCode(messageConfig.CODE_SUCCESS);
            res.setMessage(messageConfig.MESSAGE_ADDAUCTIONSUCCES);
            res.setResult( auctionRepository.save(newauction));
            user.getListAuctionCreated().add(newauction) ;
            userRepository.save(user) ;
            return res;
        }catch (Exception e){
            res.setCode(messageConfig.CODE_FAILED);
            res.setMessage(messageConfig.MESSAGE_ADDAUCTIONERROR);
            return res;
        }
    }

    @Override
    public GetAllAuctionResponse getAllAuction() {
        GetAllAuctionResponse res = new GetAllAuctionResponse();
        ArrayList<Auction> listAuction = (ArrayList<Auction>) auctionRepository.getAllAuction();
        res.setCode(messageConfig.CODE_SUCCESS);
        res.setMessage(messageConfig.MESSAGE_GETALLAUCTION);
        res.setResult(listAuction);
        return res;
    }


    @Override
    public DeleteAuctionResponse deleteAuction(int idAuction){
        DeleteAuctionResponse res = new DeleteAuctionResponse();
        Auction auction = auctionRepository.findById(idAuction).orElse(null);
        auction.setIsDelete(1);
        auctionRepository.save(auction);
        res.setCode(messageConfig.CODE_SUCCESS);
        res.setMessage(messageConfig.MESSAGE_DELETEAUCTION);
        res.setResult(true);
        return res;
    }


    @Override
    public FindAuctionbyNameResponse findAuctionbyName(String name) {
        FindAuctionbyNameResponse res = new FindAuctionbyNameResponse();
        res.setCode(1);
        res.setMessage("find auction success");
        res.setResult(auctionRepository.searchAuction(name));
        return res;
    }


    @Override
    public void deleteItemAuction(Item item) {
     ArrayList<Auction> listAuction=  auctionRepository.getAuctionItemDelete(item.getId());
     for (Auction auction :listAuction){
         auction.setIsDelete(1);
         auctionRepository.save(auction);
        }
    }

    @Override
    public GetAuctionInProgressResponse getAuctionInProgress() {
        GetAuctionInProgressResponse res= new GetAuctionInProgressResponse();
        res.setCode(1);
        res.setMessage("get auctioninprogress success");
        ArrayList<Auction>listAuction = auctionRepository.getAuctionProgressing();
        res.setResult(listAuction);
        return res;
    }
}
