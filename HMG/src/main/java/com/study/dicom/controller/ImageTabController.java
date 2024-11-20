package com.study.dicom.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.dicom.service.ImageTabService;
import com.study.dicom.service.SeriesTabService;

@Controller
public class ImageTabController {
	
	@Autowired
	ImageTabService imageTabService;
	
	@Autowired
	SeriesTabService seriesTabService;
	
	
	@GetMapping("/ImageTabList")
	public String list(@RequestParam(value="nowPage", defaultValue="0") int nowPage,@RequestParam(value="studyKey") Long studyKey, 
            Model model) {
		
//		ArrayList<SeriesTab> series = seriesTabService.seriesList(studyKey);
//		ArrayList<ArrayList<ImageTab>> imagesList = new ArrayList<ArrayList<ImageTab>>();
//		
//		for(SeriesTab s : series) {
//			ArrayList<ImageTab> images = imageTabService.list(s.getId().getStudyKey(),s.getId().getSeriesKey());
//			for(int i=0;i<images.size();i++) {
//				ImageTab imgTab =images.get(i);
//				imgTab.setPath(imgTab.getPath().replace("\\","/"));
//				images.set(i,imgTab);
//				
//			}
//			
//			imagesList.add(images);
//		}
		
		
		
		 // 시리즈별로 이미지를 그룹화할 맵 생성 (Key: seriesKey, Value: ImageTab 리스트)
//	    Map<Long, ArrayList<ImageTab>> seriesImageMap = new HashMap<>();
//	    
//		ArrayList<ImageTab>  imagesList = imageTabService.imgList(studyKey);
//		for (ImageTab imgTab : imagesList) {
//		    imgTab.setPath(imgTab.getPath().replace("\\", "/"));
//
//		    Long seriesKey = imgTab.getId().getSeriesKey();
//		    
//		    // 시리즈 키가 존재하지 않으면 새 ArrayList를 생성하여 추가
//		    if (!seriesImageMap.containsKey(seriesKey)) {
//		        seriesImageMap.put(seriesKey, new ArrayList<>());
//		    }
//
//		    // 존재하는 리스트에 imgTab을 추가
//		    seriesImageMap.get(seriesKey).add(imgTab);
//		}
//	
//		System.out.println("images"+seriesImageMap);
//		model.addAttribute("images",seriesImageMap);
		
		ArrayList<ArrayList<String>> imagesList = new ArrayList<ArrayList<String>>();
		Page<Long> seriesList = imageTabService.seriesList(PageRequest.of(nowPage, 4),studyKey);
		for(Long s : seriesList) {
			System.out.println("seriesList : "+s);
			ArrayList<String> images = imageTabService.list(studyKey,s);
			imagesList.add(images);
			
		}
		
		int totalPages =seriesList.getTotalPages()-1;
		model.addAttribute("imageList",imagesList);
		model.addAttribute("nowPage",nowPage);
		model.addAttribute("totalPages",totalPages);
		model.addAttribute("studyKey",studyKey);
		model.addAttribute("seriesList", seriesList); 
		return "/admin/Image/ImageList";
		
	}
	
	@GetMapping("/ImageDetail")
	public String detail(@RequestParam(value = "studyKey") Long studyKey,@RequestParam(value = "seriesKey") Long seriesKey,Model model) {
		ArrayList<String> image = imageTabService.imageDetail(studyKey,seriesKey);
		model.addAttribute("images",image);
		model.addAttribute("studyKey",studyKey);
		model.addAttribute("seriesKey",seriesKey);
		return "/admin/Image/ImageDetail";
		
	}
	
	@GetMapping("/studyImages")
	@ResponseBody
	public ArrayList<String> studyImages(@RequestParam(value="studyKey") Long studyKey) {
		ArrayList<String> imageList =imageTabService.studyImages(studyKey);
		
		return imageList;
	}
	
	@GetMapping("/gridImageData")
	public ResponseEntity<ArrayList<ArrayList<String>>> gridList(@RequestParam(value="studyKey") Long studyKey, Model model) {
		ArrayList<ArrayList<String>> imagesList = new ArrayList<ArrayList<String>>();
		ArrayList<Long> seriesList = imageTabService.gridSeriesList(studyKey);
		for(Long s : seriesList) {
			System.out.println("seriesList : "+s);
			ArrayList<String> images = imageTabService.list(studyKey,s);
			imagesList.add(images);
		}
		
		model.addAttribute("imageList",imagesList);
		model.addAttribute("studyKey",studyKey);
		model.addAttribute("seriesList", seriesList); 
		return ResponseEntity.ok(imagesList);
	}
}
