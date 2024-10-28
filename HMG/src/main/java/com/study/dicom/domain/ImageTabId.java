package com.study.dicom.domain;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ImageTabId implements Serializable {

    private static final long serialVersionUID = 1L;  // 직렬화 버전 ID 추가

    @Column(name = "STUDYKEY", nullable = false)
    private Long studyKey;
    
    @Column(name = "SERIESKEY", nullable = false)
    private Long seriesKey;
    
    @Column(name = "IMAGEKEY", nullable = false)
    private Long imageKey;

}
