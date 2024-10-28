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
public class SeriesTabId implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "SERIESKEY")
    private Long seriesKey;

    @Column(name = "STUDYKEY")
    private Long studyKey;
    
}
