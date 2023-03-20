package com.example.demo_web.response;
import com.example.demo_web.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SetAdminResponse extends BaseResponse{
    private User result;
}
