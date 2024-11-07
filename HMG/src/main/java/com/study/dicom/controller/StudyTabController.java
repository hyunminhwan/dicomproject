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
	
	
	 @GetMapping("/search")
	    public String search(@RequestParam(value="searchPage", defaultValue="0") int searchPage,
	    					 @RequestParam(value = "pid" ,required = false) String pid,
	                         @RequestParam(value = "pname",required = false) String pname,
	                         @RequestParam(value = "reportStatus",required = false) Long reportStatus,
	                         @RequestParam(value = "modality",required = false) String modality,
	                         @RequestParam(value = "startDate",required = false) String startDate,
	                         @RequestParam(value = "endDate",required = false) String endDate,
	                         Model model) {

		 Page<StudyTab> study = studyTabService.searchStudyTab(PageRequest.of(searchPage, 10),pid, pname, reportStatus, modality,startDate,endDate);
	        int totalPages=study.getTotalPages()-1;
			model.addAttribute("totalPages",totalPages);
			model.addAttribute("study",study);
			model.addAttribute("searchPage",searchPage);
			model.addAttribute("pid", pid); // 모델에 추가
		    model.addAttribute("pname", pname); // 모델에 추가
		    model.addAttribute("reportStatus", reportStatus); 
		    model.addAttribute("modality", modality);
		    model.addAttribute("startDate", startDate);
		    model.addAttribute("endDate", endDate); 
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
