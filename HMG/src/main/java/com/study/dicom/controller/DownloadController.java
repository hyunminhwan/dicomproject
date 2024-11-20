package com.study.dicom.controller;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.zip.*;

@RestController
@RequestMapping("/file")
public class DownloadController {

    @PostMapping("/download-series")
    public ResponseEntity<InputStreamResource> downloadSeries(@RequestBody Map<String, Object> payload) throws IOException {
        // 폴더 경로, 파일 이름 구분
        String folderPath = (String) payload.get("folderPath"); // 예: "/mhg/202304/04/14162/CT/2"
        List<String> fileNames = (List<String>) payload.get("fileNames"); // 예: ["CT.1.3.12.2.1107.5.1.4.92599.30000023040400043524300000026.dcm", ...]

        if (folderPath == null || fileNames == null || fileNames.isEmpty()) {
            throw new IllegalArgumentException("folderPath 및 fileNames가 필요합니다.");
        }

        // 절대 경로 생성
        String baseDir = "C:" + folderPath; // 기본 드라이브 + 폴더 경로 예: "C:/mhg/202304/04/14162/CT/2"
        List<String> absolutePaths = new ArrayList<>();
        for (String fileName : fileNames) {
            String absolutePath = baseDir + "/" + fileName;
            absolutePaths.add(absolutePath); // 폴더 경로 + 파일 이름 으로 절대 경로 생성
            System.out.println("Resolved absolute path: " + absolutePath); // 디버깅 로그
        }

        // ZIP 파일 생성
        String tempDir = Files.createTempDirectory("dicom-series").toString();
        String zipFilePath = tempDir + File.separator + "series_images.zip"; // File.separator = 파일 구분자('/')

        try {
            // 파일 경로 리스트를 ZIP 파일로 압축
            createZipFile(absolutePaths, zipFilePath); 

            // 클라이언트로 ZIP 파일 전송
            File zipFile = new File(zipFilePath);
            InputStreamResource resource = new InputStreamResource(new FileInputStream(zipFile)); // 생성된 zip파일 InputStreamResource으로 감싸서 클라이언트에 반환

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=series_images.zip"); // CONTENT_DISPOSITION으로 다운로드 파일 이름 설정

            return ResponseEntity.ok()
                    .headers(headers) // 응답 헤더 설정
                    .contentLength(zipFile.length()) // 응답의 콘텐츠 길이를 ZIP 파일 크기로 설정
                    .contentType(MediaType.APPLICATION_OCTET_STREAM) // 콘텐츠 타입 APPLICATION_OCTET_STREAM 으로 설정(바이너리 데이터 전송시 사용되는 MIME타입으로, ZIP 같은 비텍스트 데이터 표현)
                    .body(resource); // 응답 본문에 InputStreamResource 객체 전달
        } finally {
            // 작업 완료 후 임시 디렉토리 삭제
            deleteDirectory(new File(tempDir));
        }
    }

    // ZIP 파일 생성 메소드
    private void createZipFile(List<String> filePaths, String zipFilePath) throws IOException {
        try (FileOutputStream fos = new FileOutputStream(zipFilePath);
             ZipOutputStream zos = new ZipOutputStream(fos)) { // ZipOutputStream으로 ZIP 파일 생성

            for (String filePath : filePaths) {
                File file = new File(filePath); // 폴더위치에 각 파일들을 file에 넣어주기
                if (!file.exists()) {
                    System.err.println("파일을 찾을 수 없습니다: " + filePath);
                    continue; // 없는 파일은 건너뛰기
                }

                try (FileInputStream fis = new FileInputStream(file)) {
                    ZipEntry zipEntry = new ZipEntry(file.getName()); // 각 파일의 경로 읽어오기
                    zos.putNextEntry(zipEntry); // 읽어온거 ZIP 엔트리(ZipEntry)로 추가

                    byte[] buffer = new byte[1024]; // ZIP 파일에 데이터 사용 위해 1024바이트 크기의 버퍼 생성
                    int length; // 읽은 데이터 1024바이트 보다 작으면 읽은 데이터 크기 반환
                    while ((length = fis.read(buffer)) >= 0) { // fis.read(buffer) 파일 데이터 읽기, 크기 length에 저장, 읽을 데이터 없으면 -1 반환해 루프 종료
                        zos.write(buffer, 0, length); // ZIP 출력 스트림(zos)에 버퍼 데이터 입력. 파일 크기 설정되는 부분
                    }

                    zos.closeEntry();
                }
            }
        }
    }

    // 임시 디렉토리 제거
    private void deleteDirectory(File directory) {
        if (directory.isDirectory()) {
            for (File file : Objects.requireNonNull(directory.listFiles())) { // requireNonNull = null 확인하는 메소드
                deleteDirectory(file);
            }
        }
        directory.delete();
    }
}
