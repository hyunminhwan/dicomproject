package com.study.dicom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.dicom.domain.ReportTab;
import com.study.dicom.domain.ReportTabId;

public interface ReportTabRepository extends JpaRepository<ReportTab, ReportTabId>{

	Optional<ReportTab> findByStudyKeyAndSeriesKey(Long studyKey, Long seriesKey);

}
