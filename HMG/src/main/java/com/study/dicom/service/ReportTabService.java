package com.study.dicom.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.dicom.domain.ReportTab;
import com.study.dicom.repository.ReportTabRepository;

@Service
public class ReportTabService {

	@Autowired
	ReportTabRepository reportTabRepository;

	public Optional<ReportTab> findById(Long studyKey) {
		return reportTabRepository.findById(studyKey);
	}

	public void save(ReportTab reportTab) {
		reportTabRepository.save(reportTab);
	}
	
}
