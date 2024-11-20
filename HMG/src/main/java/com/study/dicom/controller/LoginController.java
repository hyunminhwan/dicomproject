package com.study.dicom.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.dicom.domain.MemberTab;
import com.study.dicom.service.LoginService;



@Controller
public class LoginController {

@Autowired
 LoginService loginService;


    // 로그인 페이지 표시
	  @GetMapping("/")
	  public String root() {
		  return "login/login";
	  }
	  
	  @GetMapping("/login")
	  public String loginForm() {
		  return "login/login";
	  }
	
	  @GetMapping("/index")
	  public String index() {
	      return "index"; // index.html 파일을 반환
	  }

 
	  @GetMapping("/signUp")
	  public String signUpform() {
		  return"login/signUp";
	  }
	  
	  @PostMapping("/signUp")
	  @ResponseBody
	  public Map<String, Object> signUp(@RequestBody MemberTab member) {
		    Map<String, Object> response = new HashMap<>();
		    boolean isSaved = loginService.saveMember(member);
		    if (isSaved) {
		        response.put("success", true);
		        response.put("message", "회원가입이 완료되었습니다.");
		    } else {
		        response.put("success", false);
		        response.put("message", "이미 존재하는 회원입니다.");
		    }
		    return response;
		}
}