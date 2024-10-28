package com.study.dicom.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import com.study.dicom.service.SeriesTabService;

@Controller
public class SeriesTabController {
	
	@Autowired
	SeriesTabService seriesTabService;
	
	
}
