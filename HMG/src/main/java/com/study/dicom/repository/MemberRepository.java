package com.study.dicom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.dicom.domain.MemberTab;

@Repository
public interface MemberRepository extends JpaRepository<MemberTab,String> {
	MemberTab findByUserName(String username);
}
