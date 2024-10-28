package com.study.dicom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.study.dicom.domain.SeriesTab;
import com.study.dicom.repository.SeriesTabRepository;

@Service
public class SeriesTabService {

	@Autowired
	SeriesTabRepository seriesTabRepository;
	
	public Page<SeriesTab> seriesList(PageRequest of ,Long studyKey) {
		return seriesTabRepository.findByIdStudyKeyOrderByIdSeriesKeyAsc(of,studyKey);
	}
}
