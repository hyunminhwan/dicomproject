package com.study.dicom.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity(name = "SERIESTAB")
@Data
public class SeriesTab {

	@EmbeddedId
    private SeriesTabId id;  // 복합 키 클래스 사용 (id가 여러개)/포랜키(어려움)

    @Column(name = "STUDYINSUID", nullable = false, length = 64)
    private String studyInsUid;

    @Column(name = "SERIESINSUID", nullable = false, length = 64)
    private String seriesInsUid;

    @Column(name = "SERIESNUM")
    private Long seriesNum;

    @Column(name = "SERIESCURSEQNUM")
    private Long seriesCurSeqNum;

    @Column(name = "STUDYID", length = 64)
    private String studyId;

    @Column(name = "MODALITY", length = 16)
    private String modality;

    @Column(name = "BODYPART", length = 256)
    private String bodyPart;

    @Column(name = "SERIESDESC", length = 256)
    private String seriesDesc;

    @Column(name = "PROTOCOLNAME", length = 64)
    private String protocolName;

    @Column(name = "VIEWPOSITION", length = 255)
    private String viewPosition;

    @Column(name = "LATERALITY", length = 64)
    private String laterality;

    @Column(name = "COMMENTS", length = 255)
    private String comments;

    @Column(name = "IMAGECNT")
    private Long imageCnt;

    @Column(name = "MOVIECNT")
    private Long movieCnt;

    @Column(name = "SERIESTYPE", length = 64)
    private String seriesType;

    @Column(name = "VERIFYFLAG")
    private Long verifyFlag;

    @Column(name = "DELFLAG")
    private Long delFlag;

    @Column(name = "SERIESDATE", length = 8)
    private String seriesDate;

    @Column(name = "SERIESTIME", length = 14)
    private String seriesTime;

    @Column(name = "INSERTDATE", length = 8)
    private String insertDate;

    @Column(name = "INSERTTIME", length = 8)
    private String insertTime;

    @Column(name = "HOSPITALID", columnDefinition = "NUMBER DEFAULT 0")
    private Long hospitalId;

    @Column(name = "PERFORMINGPHYSICIANNAME", length = 64)
    private String performingPhysicianName;

    @Column(name = "OPERATORSNAME", length = 64)
    private String operatorsName;

    @Column(name = "PATPOSITION", length = 64)
    private String patPosition;

    @Column(name = "ANATOMICALORIENTATIONTYPE", length = 64)
    private String anatomicalOrientationType;

    @Column(name = "MANUFACTURER", length = 64)
    private String manufacturer;

    @Column(name = "INSTITUTIONNAME", length = 256)
    private String institutionName;

    @Column(name = "STATIONNAME", length = 64)
    private String stationName;

    @Column(name = "INSTITUTIONALDEPARTMENTNAME", length = 64)
    private String institutionalDepartmentName;

    @Column(name = "MANUMODELNAME", length = 64)
    private String manuModelName;

    @Column(name = "NONIMAGECOUNT")
    private Long nonImageCount;

    @Column(name = "FILESIZE")
    private Long fileSize;

    @Column(name = "INSERTED", length = 14)
    private String inserted;

    @Column(name = "UPDATED", length = 14)
    private String updated;

    @Column(name = "RESERVED1")
    private Long reserved1;

    @Column(name = "RESERVED2")
    private Long reserved2;

    @Column(name = "RESERVED3")
    private Long reserved3;

    @Column(name = "RESERVED4", length = 255)
    private String reserved4;

    @Column(name = "RESERVED5", length = 255)
    private String reserved5;

    @Column(name = "RESERVED6", length = 255)
    private String reserved6;

    @Column(name = "RESERVED7", length = 255)
    private String reserved7;

    @Column(name = "RESERVED8", length = 255)
    private String reserved8;

    @Column(name = "RESERVED9", length = 255)
    private String reserved9;

    @Column(name = "RESERVED10", length = 255)
    private String reserved10;

  

}


