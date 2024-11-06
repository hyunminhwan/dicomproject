package com.study.dicom.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.dicom.domain.StudyTab;
import com.study.dicom.service.StudyTabService;

@Controller
public class StudyTabController {

	@Autowired
	StudyTabService studyTabService;
	
	@GetMapping("/StudyTabList")
	public String list(@RequestParam(value="nowPage", defaultValue="0") int nowPage, Model model) {
		Page<StudyTab> study = studyTabService.list(PageRequest.of(nowPage, 10));
		int totalPages=study.getTotalPages()-1;
		model.addAttribute("totalPages",totalPages);
		model.addAttribute("study",study);
		model.addAttribute("nowPage",nowPage);
		return "index";
		
	}
	
	 @GetMapping("/search")
	    public String search(@RequestParam(value="nowPage", defaultValue="0") int nowPage,
	    					 @RequestParam(value = "pid", required = false) String pid,
	                         @RequestParam(value = "pname", required = false) String pname,
	                         @RequestParam(value = "reportStatus", required = false) Long reportStatus,
	                         @RequestParam(value = "modality", required = false) String modality,
	                         @RequestParam(value = "startDate", required = false) String startDate,
	                         @RequestParam(value = "endDate", required = false) String endDate,
	                         Model model) {

		 Page<StudyTab> study = studyTabService.searchStudyTab(PageRequest.of(nowPage, 10),pid, pname, reportStatus, modality,startDate,endDate);
	        int totalPages=study.getTotalPages()-1;
			model.addAttribute("totalPages",totalPages);
			model.addAttribute("study",study);
			model.addAttribute("nowPage",nowPage);
	        return "index";
	 }
	 
	 @GetMapping("/pastList")
	 @ResponseBody
	 public List<StudyTab> pastList(@RequestParam(value="pastNowPage", defaultValue="0") int pastNowPage,
			 				@RequestParam(value = "pid") String pid,
             				@RequestParam(value = "pname") String pname
             				 ) {
		 
		 Page<StudyTab> pastStudy=studyTabService.pastList(PageRequest.of(pastNowPage, 5),pid,pname);
		 return pastStudy.getContent();
	 }
	 
	 
}
