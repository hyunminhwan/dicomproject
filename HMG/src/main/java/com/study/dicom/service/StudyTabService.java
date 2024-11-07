package com.study.dicom.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.study.dicom.domain.ReportTab;
import com.study.dicom.domain.StudyTab;
import com.study.dicom.repository.ReportTabRepository;
import com.study.dicom.repository.StudyTabRepository;

@Service
public class StudyTabService {
	ArrayList<StudyTab> list = new ArrayList<StudyTab>();
	
	@Autowired
	StudyTabRepository studyTabRepository;

	@Autowired
	ReportTabRepository reportTabRepository;
	
	public Page<StudyTab> list(PageRequest of) {
		return studyTabRepository.findAllByOrderByStudyKeyDesc(of);
	}	
	
	public Page<StudyTab> searchStudyTab(PageRequest of,String pid, String pname, Long reportStatus, String modality,String startDate,String endDate) {
        String sDate = startDate!=null ? startDate.replace("-",""):"";
        String eDate = endDate!=null ? endDate.replace("-",""):"";
		return studyTabRepository.findStudyTabsByCriteria(of,pid, pname, reportStatus, modality,sDate,eDate);
    }

	public Page<StudyTab> pastList(PageRequest of, String pid, String pname) {
		return studyTabRepository.findAllByPidAndPname(of,pid,pname);
	}
	
	public void saveReport(ReportTab reportTab) {
            reportTabRepository.save(reportTab);
            throw new RuntimeException("해당 studyKey를 찾을 수 없습니다.");
    }
	
}
