package com.study.dicom.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.dicom.domain.ReportTab;
import com.study.dicom.domain.StudyTab;
import com.study.dicom.service.ReportTabService;
import com.study.dicom.service.StudyTabService;

@Controller
public class StudyTabController {

    @Autowired
    StudyTabService studyTabService;


    @GetMapping("/StudyTabList")
    public String list(@RequestParam(value = "nowPage", defaultValue = "0") int nowPage, Model model) {
        Page<StudyTab> study = studyTabService.list(PageRequest.of(nowPage, 10));
        int totalPages = study.getTotalPages() - 1;
        model.addAttribute("totalPages", totalPages);
        model.addAttribute("study", study);
        model.addAttribute("nowPage", nowPage);
        return "index";
    }

    @GetMapping("/search")
    public String search(@RequestParam(value = "searchPage", defaultValue = "0") int searchPage,
                         @RequestParam(value = "pid", defaultValue = "") String pid,
                         @RequestParam(value = "pname", defaultValue = "") String pname,
                         @RequestParam(value = "reportStatus", defaultValue = "0") Long reportStatus,
                         @RequestParam(value = "modality", defaultValue = "") String modality,
                         @RequestParam(value = "startDate", defaultValue = "") String startDate,
                         @RequestParam(value = "endDate", defaultValue = "") String endDate,
                         Model model) {

        Page<StudyTab> study = studyTabService.searchStudyTab(PageRequest.of(searchPage, 10), pid, pname, reportStatus, modality, startDate, endDate);
        int totalPages = study.getTotalPages() - 1;
        model.addAttribute("totalPages", totalPages);
        model.addAttribute("study", study);
        model.addAttribute("searchPage", searchPage);
        model.addAttribute("pid", pid);
        model.addAttribute("pname", pname);
        model.addAttribute("reportStatus", reportStatus);
        model.addAttribute("modality", modality);
        model.addAttribute("startDate", startDate);
        model.addAttribute("endDate", endDate);
        return "index";
    }

    @GetMapping("/pastList")
    @ResponseBody
    public List<StudyTab> pastList(@RequestParam(value = "pastNowPage", defaultValue = "0") int pastNowPage,
                                   @RequestParam(value = "pid") String pid,
                                   @RequestParam(value = "pname") String pname) {

        Page<StudyTab> pastStudy = studyTabService.pastList(PageRequest.of(pastNowPage, 5), pid, pname);
        return pastStudy.getContent();
    }
    
    @PostMapping("/api/saveReport")
    public ResponseEntity<String> saveReport(@RequestBody ReportTab reportTab) {
        studyTabService.saveReport(reportTab);
        return ResponseEntity.ok("저장되었습니다.");
    }

    
}










