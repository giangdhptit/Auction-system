package com.example.demo_web.config;


import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageConfig {
    public final int CODE_SUCCESS =1;
    public final int CODE_FAILED =-1;
    public final String MESSGAGE_LOGINSUCCESS ="login success";
    public final String MESSGAGE_LOGINFAILED ="username or password incorrect";
    public final String MESSGAGE_LOGINADMINFAILED ="u are not admin";
    public final int CODE_UNAUTHOR_ADMIN =-2;
    public final String MESSGAGE_REGISTERSUCCESS="register success";
    public final String MESSGAGE_REGISTERFAILED=" username already exist";
    public final String MESSGAGE_GETALLUSER="get all user success";
    public final String MESSAGE_GETALLITEM="get all item success";
    public final String MESSAGE_GETALLAUCTION="get all item success";
    public final String MESSAGE_ADDITEM="add item success";
    public final String MESSAGE_ADDBIDS="add bids success";
    public final String MESSAGE_UPDATEITEM="update item success";
    public final String MESSAGE_DELETEITEM="delete item success";
    public final String MESSAGE_SETROLE="set role success";
    public final String MESSAGE_ADDAUCTIONSUCCES="add auction success";
    public final String MESSAGE_ADDAUCTIONERROR="add auction fail";
    public final String MESSAGE_ADDAUCTIONFAIL="item already exists";
    public final String MESSAGE_UPDATEAUCTION="update auction success";
    public final String MESSAGE_DELETEAUCTION="delete auction success";


}
