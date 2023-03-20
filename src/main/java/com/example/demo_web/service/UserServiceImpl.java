package com.example.demo_web.service;


import com.example.demo_web.config.MessageConfig;
import com.example.demo_web.model.Bids;
import com.example.demo_web.model.User;
import com.example.demo_web.repository.UserRepository;
import com.example.demo_web.request.LoginRequest;
import com.example.demo_web.response.*;
import com.example.demo_web.tokenAuthen.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;


@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService,UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;
    @Autowired
    private final MessageConfig messageConfig;



    @Override
    public LoginResponse checkLogin(LoginRequest req) {
        LoginResponse res = new LoginResponse();
        try {
            User user = new User();
            user.setUsername(req.getUsername());
            user.setPassword(req.getPassword());
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    user.getUsername(), user.getPassword()
                            )
                    );
            SecurityContextHolder.getContext().setAuthentication(authenticate);
            String accessToken = jwtTokenUtil.generateAccessToken(user);
            user =userRepository.findByUsername(user.getUsername());
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("token",accessToken);
            map.put("user", user);
            res.setResult(map);
            res.setCode(messageConfig.CODE_SUCCESS);
            res.setMessage(messageConfig.MESSGAGE_LOGINSUCCESS);
            return res;
        }
        catch (Exception ex) {
            res.setCode(messageConfig.CODE_FAILED);
            res.setMessage(messageConfig.MESSGAGE_LOGINFAILED);
            return res;
        }
    }
    @Override
    public User registerUser(User user){
        User newuser =userRepository.findByUsername(user.getUsername());
        if(newuser!=null){
            return null;
        }else{
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole("guest");
            return userRepository.save(user);
        }
    }
    @Override
    public GetAllUserResponse getAllUser (){
        ArrayList<User> listUser = (ArrayList<User>) userRepository.findAll();
        GetAllUserResponse res = new GetAllUserResponse();
        res.setCode(messageConfig.CODE_SUCCESS);
        res.setMessage(messageConfig.MESSGAGE_GETALLUSER);
        res.setResult(listUser);
        return res;
    }



    @Override
    public LoginResponse checkLoginAdmin(LoginRequest req) {
        LoginResponse res = new LoginResponse();
        try {
            User user = new User();
            user.setUsername(req.getUsername());
            user.setPassword(req.getPassword());
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    user.getUsername(), user.getPassword()
                            )
                    );
            SecurityContextHolder.getContext().setAuthentication(authenticate);
            String accessToken = jwtTokenUtil.generateAccessToken(user);
            user = userRepository.findByUsername(user.getUsername());
            if(!user.getRole().equals("admin")){
                res.setCode(messageConfig.CODE_UNAUTHOR_ADMIN);
                res.setMessage(messageConfig.MESSGAGE_LOGINADMINFAILED);
                return res;
            }
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("token", accessToken);
            map.put("user", user);
            res.setResult(map);
            res.setCode(messageConfig.CODE_SUCCESS);
            res.setMessage(messageConfig.MESSGAGE_LOGINSUCCESS);
            return res;
        } catch (Exception ex) {
            res.setCode(messageConfig.CODE_FAILED);
            res.setMessage(messageConfig.MESSGAGE_LOGINFAILED);
            return res;
        }
    }

    @Override
    public SetAdminResponse setAdmin(int idUser) {
        User user = userRepository.findById(idUser).orElse(null);
        user.setRole("admin");
        SetAdminResponse res = new SetAdminResponse();
        res.setCode(messageConfig.CODE_SUCCESS);
        res.setMessage(messageConfig.MESSAGE_SETROLE);
        res.setResult(userRepository.save(user));
        return res;
    }

    @Override
    public void updateBalanceUser(Bids maxbid, int maxprice) {
        User user = userRepository.findById(maxbid.getUserBids().getId()).orElse(null);
        user.setBalance(user.getBalance()-maxprice);
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("Could not find user");
        }

        return user;
    }

}
