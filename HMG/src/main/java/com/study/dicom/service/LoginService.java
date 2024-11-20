package com.study.dicom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.study.dicom.domain.MemberTab;
import com.study.dicom.repository.LoginRepository;

@Service
public class LoginService {

	@Autowired
	LoginRepository loginRepository;

	@Autowired
	PasswordEncoder passwordEncoder;
	public boolean saveMember(MemberTab member) {
		if(loginRepository.findById(member.getUserName()).isPresent()) {
			return false;
		}
		String enPwd=passwordEncoder.encode(member.getPwd());
		member.setPwd(enPwd);
		loginRepository.save(member);
		return true;
	}
	
	
}
