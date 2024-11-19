package com.study.dicom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.dicom.domain.ReportTab;

public interface ReportTabRepository extends JpaRepository<ReportTab, Long>{

	Optional<ReportTab> findByStudyKeyAndSeriesKeyIsNull(Long studyKey);



}
