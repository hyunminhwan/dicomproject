package com.study.dicom.repository;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.dicom.domain.StudyTab;

@Repository
public interface StudyTabRepository extends JpaRepository<StudyTab,Long>{

	Page<StudyTab> findAllByOrderByStudyKeyDesc(PageRequest of);

	 @Query("SELECT s FROM STUDYTAB s WHERE "
	            + "(:pid IS NULL OR s.pid LIKE %:pid%) " 
	            + "AND (:pname IS NULL OR s.pname LIKE %:pname%) "
	            + "AND (:reportStatus IS NULL OR :reportStatus = 0 OR s.reportStatus = :reportStatus) "
	            + "AND (:modality IS NULL OR s.modality = :modality) "
	            + "AND (:sDate IS NULL  OR s.studyDate BETWEEN :sDate AND :eDate) "
	            + "and 1=1")
	 Page<StudyTab> findStudyTabsByCriteria(PageRequest of,
	    									   @Param("pid") String pid,
	                                           @Param("pname") String pname,
	                                           @Param("reportStatus") Long reportStatus,
	                                           @Param("modality") String modality,
	                                           @Param("sDate") String sDate,
	                                           @Param("eDate") String eDate);

	Page<StudyTab> findAllByPidAndPname(PageRequest of, String pid, String pname);

	
}

