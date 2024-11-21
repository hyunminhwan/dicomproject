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

	@Autowired
	ReportTabService reportTabService;

	// 검색 기능( 날짜,환자아이디,환자이름,판독결과,장비)
	@GetMapping("/search")
	public String search(@RequestParam(value = "searchPage", defaultValue = "0") int searchPage,
			@RequestParam(value = "pid", required = false, defaultValue = "") String pid,
			@RequestParam(value = "pname", required = false, defaultValue = "") String pname,
			@RequestParam(value = "reportStatus", required = false, defaultValue = "0") Long reportStatus,
			@RequestParam(value = "modality", required = false, defaultValue = "") String modality,
			@RequestParam(value = "startDate", required = false, defaultValue = "") String startDate,
			@RequestParam(value = "endDate", required = false, defaultValue = "") String endDate, Model model) {

		Page<StudyTab> study = studyTabService.searchStudyTab(PageRequest.of(searchPage, 10), pid, pname, reportStatus,
				modality, startDate, endDate);
		
		 int totalPages = study != null ? study.getTotalPages() : 0;
		    int pagePerBlock = 5;
		    int startPage = totalPages > 0 ? (searchPage / pagePerBlock) * pagePerBlock : 0;
		    int endPage = totalPages > 0 ? Math.min(startPage + pagePerBlock, totalPages) : 0;
		model.addAttribute("study", study);
		model.addAttribute("searchPage", searchPage);
		model.addAttribute("startPage", startPage);
	    model.addAttribute("endPage", endPage);
	    model.addAttribute("totalPages", totalPages);
		model.addAttribute("pid", pid); // 모델에 추가
		model.addAttribute("pname", pname); // 모델에 추가
		model.addAttribute("reportStatus", reportStatus);
		model.addAttribute("modality", modality);
		model.addAttribute("startDate", startDate);
		model.addAttribute("endDate", endDate);

		return "index";
	}

	// 과거검사이력 기능
	@GetMapping("/pastList")
	@ResponseBody
	public List<StudyTab> pastList(@RequestParam(value = "pastNowPage", defaultValue = "0") int pastNowPage,
			@RequestParam(value = "pid") String pid, @RequestParam(value = "pname") String pname) {

		Page<StudyTab> pastStudy = studyTabService.pastList(PageRequest.of(pastNowPage, 5), pid, pname);
		return pastStudy.getContent();
	}

	//리포트저장기능(스터디,시리즈)
	@PostMapping("/api/saveReport")
	@ResponseBody
	public ResponseEntity<String> saveReport(@RequestBody ReportTab report) {
		try {
			reportTabService.save(report); // 서비스에서 데이터 저장
			return ResponseEntity.ok("저장완료");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save report");
		}
	}

	//리포트로드기능(스터디,시리즈)
	@GetMapping("/api/report/{studyKey}/{seriesKey}")
	@ResponseBody
	public ReportTab getReportByStudyKeySeriesKey(@PathVariable(name = "studyKey") Long StudyKey,
			@PathVariable(name = "seriesKey") Long SeriesKey) {
		Optional<ReportTab> studyKeyseriesKey = reportTabService.findByStudyKeyAndSeriesKey(StudyKey, SeriesKey);
		// isPresent 들어있으면 true
		if (studyKeyseriesKey.isPresent()) {
			return studyKeyseriesKey.get();
		} else {
			return null;
		}
	}

}
