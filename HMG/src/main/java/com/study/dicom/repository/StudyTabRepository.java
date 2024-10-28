package com.study.dicom.repository;



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
	            + "AND (:reportStatus = 0 OR s.reportStatus = :reportStatus) "
	            + "AND (:modality IS NULL OR s.modality = :modality) "
	            + "AND (:startDate IS NULL OR :endDate IS NULL OR s.studyDate BETWEEN :startDate AND :endDate)")
	 Page<StudyTab> findStudyTabsByCriteria(PageRequest of,
	    									   @Param("pid") String pid,
	                                           @Param("pname") String pname,
	                                           @Param("reportStatus") Long reportStatus,
	                                           @Param("modality") String modality,
	                                           @Param("startDate") String startDate,
	                                           @Param("endDate") String endDate);

	Page<StudyTab> findAllByPidAndPname(PageRequest of, String pid, String pname);

}

