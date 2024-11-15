package com.study.dicom.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.study.dicom.repository.ImageTabRepository;

@Service
public class ImageTabService {

	@Autowired
	ImageTabRepository imageTabRepository;
	
	public ArrayList<String> list(Long studyKey,Long seriesKey) {
		return imageTabRepository.findByIdStudyKeyAndIdSeriesKeyOrderByIdImageKey(studyKey,seriesKey);
	}

	//detail
	public ArrayList<String> imageDetail(Long studyKey, Long seriesKey) {
		return imageTabRepository.findByIdStudyKeyAndIdSeriesKey(studyKey,seriesKey);
	}

	public Page<Long> seriesList(PageRequest of, Long studyKey) {
		return imageTabRepository.findBySeriesKey(of,studyKey);
	}

	public ArrayList<String> studyImages(Long studyKey) {
		return imageTabRepository.studyImages(studyKey);
	}

//	public ArrayList<ImageTab> imgList(Long studyKey) {
//		return imageTabRepository.findByIdStudyKeyOrderByIdSeriesKeyAscIdImageKeyAsc(studyKey);
//	}

	public ArrayList<Long> gridSeriesList(Long studyKey) {
	    ArrayList<Long> seriesList = imageTabRepository.findBySeriesKey(studyKey);
	    System.out.println("Retrieved series list: " + seriesList);
		return imageTabRepository.findBySeriesKey(studyKey);
	}
}
