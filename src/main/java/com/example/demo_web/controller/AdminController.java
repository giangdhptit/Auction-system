package com.example.demo_web.controller;

import com.example.demo_web.config.MessageConfig;
import com.example.demo_web.model.User;
import com.example.demo_web.request.LoginRequest;
import com.example.demo_web.response.BaseResponse;
import com.example.demo_web.response.SetAdminResponse;
import com.example.demo_web.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    UserServiceImpl userService;
    @Autowired
    private final MessageConfig messageConfig;
    @PostMapping(value = "/login")
    public ResponseEntity checkLoginAdmin(@RequestBody LoginRequest req){
        BaseResponse res = new BaseResponse();
        res=userService.checkLoginAdmin(req);
        if(res.getCode()==messageConfig.CODE_FAILED){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
        }
        if(res.getCode()==messageConfig.CODE_UNAUTHOR_ADMIN){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(res);
        }
        return ResponseEntity.ok().body(res);
    }

}