package com.study.dicom.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {



    // 로그인 페이지 표시
	  @GetMapping("/")
	  public String loginForm() {
		  
		  return "login/login";
		  
	  }
	
	  @GetMapping("/index")
	  public String index() {
		  
	      return "index"; // index.html 파일을 반환
	  }

 
}