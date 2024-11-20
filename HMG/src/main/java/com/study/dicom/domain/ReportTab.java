package com.study.dicom.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.Data;

@Data
@Entity(name = "REPORTTAB")
@IdClass(ReportTabId.class)
public class ReportTab {

    @Id
    @Column(name = "STUDYKEY")
    private Long studyKey;
    
    @Id
    @Column(name = "SERIESKEY")
    private Long seriesKey;

    @Column(name = "RE_COMMENT", length = 1000)
    private String reComment;

    @Column(name = "RE_EXPLORATION", length = 1000)
    private String reExploration;

    @Column(name = "RE_CONCLUSION", length = 1000)
    private String reConclusion;

    @Column(name = "RE_RECOMMENDATION", length = 1000)
    private String reRecommendation;

    @Column(name = "CREATED_AT", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp createdAt;
}
