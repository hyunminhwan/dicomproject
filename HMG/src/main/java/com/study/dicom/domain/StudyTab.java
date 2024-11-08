package com.study.dicom.domain;


import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity(name = "STUDYTAB")
public class StudyTab {

    @Id
    @Column(name = "STUDYKEY", nullable = false)
    private Long studyKey;

    @Column(name = "STUDYINSUID", nullable = false, length = 64)
    private String studyInsUid;

    @Column(name = "ACCESSNUM", length = 64)
    private String accessNum;

    @Column(name = "STUDYDATE", length = 16)
    private String studyDate;

    @Column(name = "STUDYTIME", length = 14)
    private String studyTime;

    @Column(name = "STUDYID", length = 64)
    private String studyId;

    @Column(name = "STUDYDESC", length = 256)
    private String studyDesc;

    @Column(name = "MODALITY", length = 16)
    private String modality;

    @Column(name = "BODYPART", length = 256)
    private String bodyPart;

    @Column(name = "PATIENTKEY")
    private Long patientKey;

    @Column(name = "PID", length = 64)
    private String pid;

    @Column(name = "PNAME", length = 64)
    private String pname;

    @Column(name = "PSEX", length = 16)
    private String psex;

    @Column(name = "PBIRTHDATETIME", length = 16)
    private String pBirthDateTime;

    @Column(name = "PATAGE", length = 16)
    private String patAge;

    @Column(name = "EXAMSTATUS")
    private Long examStatus;

    @Column(name = "REPORTSTATUS")
    private Long reportStatus;

    @Column(name = "SERIESCNT")
    private Long seriesCnt;

    @Column(name = "IMAGECNT")
    private Long imageCnt;

    @Column(name = "NONSERIESCOUNT")
    private Long nonSeriesCount;

    @Column(name = "NONIMAGECOUNT")
    private Long nonImageCount;

    @Column(name = "VERIFYFLAG")
    private Long verifyFlag;

    @Column(name = "DEPT", length = 64)
    private String dept;

    @Column(name = "REFPHYSICIANNAME", length = 64)
    private String refPhysicianName;

    @Column(name = "OPERATORSNAME", length = 64)
    private String operatorsName;

    @Column(name = "INSNAME", length = 64)
    private String insName;

    @Column(name = "STATIONNAME", length = 64)
    private String stationName;

    @Column(name = "STEREOCOUNT", nullable = false, columnDefinition = "NUMBER DEFAULT 0")
    private Long stereoCount;

    @Column(name = "PROTOCOLNAME", length = 256)
    private String protocolName;

    @Column(name = "VIEWPOSITION", length = 255)
    private String viewPosition;

    @Column(name = "LATERALITY", length = 255)
    private String laterality;

    @Column(name = "ARCHSTATUS")
    private Long archStatus;

    @Column(name = "DELFLAG")
    private Long delFlag;

    @Column(name = "BACKUPSTATUS", columnDefinition = "NUMBER DEFAULT 0")
    private Long backupStatus;

    @Column(name = "MISMATCHFLAG", columnDefinition = "NUMBER DEFAULT 0")
    private Long mismatchFlag;

    @Column(name = "READINGPRIORITY", columnDefinition = "NUMBER DEFAULT 0")
    private Long readingPriority;

    @Column(name = "ABNORMALPATIENT", columnDefinition = "NUMBER DEFAULT 0")
    private Long abnormalPatient;

    @Column(name = "INSERTDATE", length = 8)
    private String insertDate;

    @Column(name = "INSERTTIME", length = 8)
    private String insertTime;

    @Column(name = "HOSPITALID", columnDefinition = "NUMBER DEFAULT 0")
    private Long hospitalId;

    @Column(name = "BURNCNT", columnDefinition = "NUMBER DEFAULT 0")
    private Long burnCnt;

    @Column(name = "VALIDATEFLAG", nullable = false)
    private Long validateFlag;

    @Column(name = "REQREADSTATUS")
    private Long reqReadStatus;

    @Column(name = "TBFLAG")
    private Long tbFlag;

    @Column(name = "MOVIEFLAG")
    private Long movieFlag;

    @Column(name = "OTHERSCPSENDSTATUS")
    private Long otherScpSendStatus;

    @Column(name = "AETITLE", length = 64)
    private String aeTitle;

    @Column(name = "FILESIZE")
    private Long fileSize;

    @Column(name = "INSERTED", length = 14)
    private String inserted;

    @Column(name = "UPDATED", length = 14)
    private String updated;

    @Column(name = "AI_COMPANY", length = 64)
    private String aiCompany;

    @Column(name = "AI_MODEL_NAME", length = 64)
    private String aiModelName;

    @Column(name = "AI_UPDATED", length = 14)
    private String aiUpdated;

    @Column(name = "AI_SCORE")
    private BigDecimal aiScore;

    @Column(name = "AI_PRIORITY")
    private Long aiPriority;

    @Column(name = "AI_NUMBER_OF_FINDINGS")
    private Long aiNumberOfFindings;

    @Column(name = "AI_ABNORMAL_YN", length = 1)
    private String aiAbnormalYn;

    @Column(name = "AI_FINDING", length = 64)
    private String aiFinding;

    @Column(name = "AI_REPORT", length = 4000)
    private String aiReport;

    @Column(name = "AI_VERSION", length = 16)
    private String aiVersion;

    @Column(name = "STUDY_KEY", nullable = false)
    private Long studyKeySecondary;
    

    

}

