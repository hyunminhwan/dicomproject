package com.study.dicom.repository;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.dicom.domain.ImageTab;
import com.study.dicom.domain.ImageTabId;


@Repository
public interface ImageTabRepository extends JpaRepository<ImageTab,ImageTabId> {


	

	
	//serieskey 가져오기
		@Query(value="SELECT distinct CAST(s.SERIESKEY AS NUMBER(19)) "
				+ "FROM IMAGETAB s "
				+ "WHERE s.STUDYKEY = :studyKey "
				+ "ORDER BY s.SERIESKEY",nativeQuery = true)
		Page<Long> findBySeriesKey(PageRequest of,@Param("studyKey") Long studyKey);
		
	//imageList 가져오기
	@Query(value = "SELECT CONCAT(REPLACE(i.PATH, '\\', '/'), i.FNAME) " +
		       "FROM IMAGETAB i " +
		       "WHERE i.STUDYKEY = :studyKey AND i.SERIESKEY = :seriesKey " +
		       "ORDER BY i.CURSEQNUM",nativeQuery = true)
	ArrayList<String> findByIdStudyKeyAndIdSeriesKeyOrderByIdImageKey(@Param("studyKey") Long studyKey,
																	@Param("seriesKey") Long seriesKey);
	
	
	
	
	//detail
	@Query(value = "SELECT CONCAT(REPLACE(i.PATH, '\\', '/'), i.FNAME) " +
		       "FROM IMAGETAB i " +
		       "WHERE i.STUDYKEY = :studyKey AND i.SERIESKEY = :seriesKey " +
		       "ORDER BY i.CURSEQNUM",nativeQuery = true)
	ArrayList<String> findByIdStudyKeyAndIdSeriesKey(@Param("studyKey") Long studyKey,@Param("seriesKey") Long seriesKey);

  
	//해당 스터디 이미지 가져오기
	@Query(value ="SELECT CONCAT(REPLACE(i.PATH, '\\', '/'),i.FNAME) "
			+ "FROM IMAGETAB i "
			+ "WHERE i.STUDYKEY = :studyKey "
			+ "ORDER BY i.SERIESKEY,i.CURSEQNUM",nativeQuery = true)
	ArrayList<String> studyImages(@Param("studyKey") Long studyKey);

	

//	ArrayList<ImageTab> findByIdStudyKeyOrderByIdSeriesKeyAscIdImageKeyAsc(Long studyKey);
	
	//serieskey 가져오기
	@Query(value = "SELECT DISTINCT s.SERIESKEY " +
            "FROM IMAGETAB s " +
            "WHERE s.STUDYKEY = :studyKey " +
            "ORDER BY s.SERIESKEY", 
    nativeQuery = true)
	ArrayList<Long> findBySeriesKey(@Param("studyKey") Long studyKey);
}
