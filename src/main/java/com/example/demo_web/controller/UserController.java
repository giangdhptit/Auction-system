package com.example.demo_web.controller;


import com.example.demo_web.config.FileUploadUtil;
import com.example.demo_web.config.MessageConfig;
import com.example.demo_web.model.User;
import com.example.demo_web.request.LoginRequest;
import com.example.demo_web.request.SetAdminRequest;
import com.example.demo_web.response.BaseResponse;
import com.example.demo_web.response.RegisterResponse;
import com.example.demo_web.response.SetAdminResponse;
import com.example.demo_web.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLConnection;


@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserServiceImpl userService;
    @Autowired
    private final MessageConfig messageConfig;
    private static final String EXTERNAL_FILE_PATH = "src/main/resources/static/user-photos/";

    @PostMapping(value = "/login")
    public ResponseEntity checklogin(@RequestBody LoginRequest req){
        BaseResponse res = new BaseResponse();
        res=userService.checkLogin(req);
        if(res.getCode()==messageConfig.CODE_FAILED){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
        }
        return ResponseEntity.ok().body(res);
    }
    @PostMapping(value = "/register")
    public ResponseEntity registerUser(@RequestParam("imageUser") MultipartFile multipartFile,@RequestParam String username,@RequestParam String password,@RequestParam String address,@RequestParam String name,@RequestParam String email,@RequestParam String dob,@RequestParam int balance) throws IOException {
        RegisterResponse res = new RegisterResponse();
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        User u = new User();
        u.setUsername(username);
        u.setPassword(password);
        u.setName(name);
        u.setEmail(email);
        u.setDob(dob);
        u.setAddress(address);
        u.setBalance(balance);
        u.setNameAvatar(fileName);
        User saveuser =userService.registerUser(u);
        if(saveuser==null){
            res.setCode(messageConfig.CODE_FAILED);
            res.setMessage(messageConfig.MESSGAGE_REGISTERFAILED);
            res.setResult(false);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(res);
        }else{
            String uploadDir = EXTERNAL_FILE_PATH + saveuser.getId();
            FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
            res.setCode(messageConfig.CODE_SUCCESS);
            res.setMessage(messageConfig.MESSGAGE_REGISTERSUCCESS);
            res.setResult(true);
            return ResponseEntity.ok().body(res);
        }
    }
    @RequestMapping("/imageUser/{id}/{fileName:.+}")
    public void downloadPDFResource(HttpServletRequest request, HttpServletResponse response,
                                    @PathVariable("fileName") String fileName, @PathVariable("id") String id) throws IOException {
        File file = new File(EXTERNAL_FILE_PATH+id+"/" + fileName);
        if (file.exists()) {
            String mimeType = URLConnection.guessContentTypeFromName(file.getName());
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }
            response.setContentType(mimeType);
            response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() + "\""));
            response.setContentLength((int) file.length());
            InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
            FileCopyUtils.copy(inputStream, response.getOutputStream());

        }
    }
    @GetMapping(value = "/getAllUsers")
    public  ResponseEntity getAllUser(){
        BaseResponse res = new BaseResponse();
        res= userService.getAllUser();
        return ResponseEntity.ok().body(res);
    }

    @PutMapping("/setAdmin")
    public ResponseEntity setAdmin(@RequestBody SetAdminRequest req){
        SetAdminResponse res = userService.setAdmin(req.getIdUser());
        return ResponseEntity.ok().body(res);
    }

}
