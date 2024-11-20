package com.study.dicom.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.study.dicom.domain.MemberTab;
import com.study.dicom.repository.MemberRepository;

@Service
public class SecurityMemberTabService implements UserDetailsService {

    private final MemberRepository memberRepository;
    

    public SecurityMemberTabService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	MemberTab member = memberRepository.findByUserName(username);
        if (member == null) {
            throw new UsernameNotFoundException("유저가 없습니다");
        }

        return User.builder()
                .username(member.getUserName())
                .password(member.getPwd())
                .roles(member.getRole()) // role 필드를 사용하여 권한 설정
                .build();
    }
}
