package com.study.dicom.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity(name="MEMBERTAB")
public class MemberTab  {
	
	@Id
	@Column(name = "USER_NAME")
	private String userName;
	@Column(name = "PWD",nullable = false)
	private String pwd;
	@Column(name = "ROLE",nullable = false)
	private String role;
	
}
