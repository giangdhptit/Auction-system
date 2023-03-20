package com.example.demo_web.response;

import com.example.demo_web.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllUserResponse extends BaseResponse{
    private ArrayList<User> result;
}