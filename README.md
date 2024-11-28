# DicomProject

<h3>프로젝트 명 : HealScope </h3>
<ul>
  <li>팀장: 현민환</li>
  <li>박혜연</li>
  <li>김광훈</li>
  <li>유병수</li>
  <li>김승욱</li>
</ul>

# 🚀 Stacks
<div>
<img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" alt="Oracle DB">
</div>
<div>
<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white" alt="Java">
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security">
  <img src="https://img.shields.io/badge/JPA-59666C?style=for-the-badge&logo=jpa&logoColor=white" alt="JPA">
  <img src="https://img.shields.io/badge/Thymeleaf-005F0F?style=for-the-badge&logo=thymeleaf&logoColor=white" alt="Thymeleaf">
</div>
<div>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS">
</div>
<div>
  <img src="https://img.shields.io/badge/SQL%20Developer-4479A1?style=for-the-badge&logo=oracle&logoColor=white" alt="SQL Developer">
  <img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code">
</div>


## 프로젝트 소개
<ul>
  <li> DICOM 데이터를 효율적으로 관리하고 의료 영상을 시각화하는 시스템 개발 </li>
  <li> cornerstone.js 라이브러리를 활용하여 DICOM 이미지를 로드 및 시각화 </li>
  <li> 환자 CT 및 X-ray 이미지 뷰어, 검색 및 필터링, 보고서 작성 기능 제공 </li>
  <li> Spring Boot, Thymeleaf, Oracle DB를 사용하여 안정적이고 직관적인 UI 구현 </li>
  <li> 의료 데이터 관리 효율성과 사용 편의성을 크게 향상 </li>
</ul>

---
### 🔐 회원가입/로그인
<img src="https://github.com/user-attachments/assets/408a3e8f-1313-4fe7-a5ba-51a841f595a9">

### ⭐기능구현
<ul>
  <li>첫 페이지를 로그인 페이지로 설정하여 보안을 강화했습니다.</li>
  <li>admin 권한으로 사용자 권한을 설정하고, 비밀번호는 암호화하여 안전한 회원가입을 구현했습니다.</li>
  <li>Spring Security를 활용해 로그인 인증 기능을 개발했습니다.</li>
  <li>admin 권한을 가진 사용자만 특정 기능에 접근할 수 있도록 제한했습니다.</li>
</ul>

<hr>

### ⭐ 메인 페이지 검색 및 검색리스트
<img src="https://github.com/user-attachments/assets/8557b558-de7c-45c2-a87a-6106bcf39a07">

### 🔎 검색 및 필터링 기능
### ⭐ 기능구현
<ul>
  <li> 환자 ID, 이름, 장비, 판독 상태, 검사 날짜 범위 등을 입력하여 데이터 조회</li>
  <li> 날짜 범위를 지정하여 검색(Flatpickr로 구현)</li>
  <li> 검색 결과를 페이지별로 나누어 표시하며, 이전/다음 버튼을 통해 손쉽게 탐색 가능</li>
  <li> Thymeleaf와 axios를 사용하여 동적 URL로 서버에 요청</li>
</ul>

### 📋 검색 리스트
### ⭐ 기능구현
<ul>
  <li> 검색 결과를 테이블로 출력</li>
  <li> 검사 설명, 장비, 날짜, 환자 정보(이름, 성별, 생년월일), 이미지 및 시리즈 건수</li>
  <li> 행 클릭 시 과거 검사 이력 확인, 더블 클릭으로 해당 series이미지 전부 송출</li>
</ul>

---
### ⭐ 메인페이지 하단 비동기처리
<img src="https://github.com/user-attachments/assets/50051bb0-cbee-4f99-a785-fc63ad68975f">

### 📄 리포트 기능
### ⭐ 기능구현
<ul>
<li> 검사별 상세 리포트를 작성, 수정, 저장 가능</li>
  <li> 코멘트, 탐색 내용, 결론, 권장 사항</li>
  <li> 리포트 데이터를 서버에서 불러와 자동으로 입력 필드 채움</li>
  <li> 저장 버튼 클릭 시 서버에 데이터 전송(axios POST 요청)</li>
</ul>

### 🏥 과거 검사 이력
### ⭐ 기능구현
<ul>
  <li> 선택한 환자의 과거 검사 데이터를 테이블 형태로 표시</li>
  <li> 검사 장비, 검사 설명, 검사 일시, 판독 상태, 시리즈 및 이미지 수</li>
  <li> 데이터를 axios GET 요청으로 서버에서 가져와 동적으로 업데이트</li>
</ul>
  
### 🖼️ DICOM 이미지 송출
<ul>
  <li> Cornerstone.js를 사용해 DICOM 이미지를 시각화</li>
  <li> 마우스 휠로 이미지 탐색 가능(이전/다음 이미지 로드)</li>
  <li> 선택한 studyKey에 따라 서버에서 이미지를 가져와 뷰어에 로드</li>
</ul>

<hr>

### 📊 ImageList(DICOM Viewer Grid)
<img src="https://github.com/user-attachments/assets/9ba8107e-f886-4e7d-9ae2-73bb0edbfb63">

### ⭐ 기능구현
<ul>
  <li> 다수의 DICOM 이미지를 그리드 형식으로 배치하여 동시에 표시</li>
  <li> 각 seriesKey별로 그룹화된 이미지 리스트를 처리하고, 각 뷰어 컨테이너를 더블 클릭으로 상세 페이지로 이동</li>
  <li> Thymeleaf의 th:each 반복문을 활용하여 동적으로 그리드 생성</li>
  <li> 각 DICOM 뷰어가 studyKey와 seriesKey를 포함하여 개별적으로 동작하도록 설계</li>
  <li> DICOM 이미지 목록 페이지에 페이지네이션 추가</li>
  <li> "이전" 및 "다음" 버튼을 통해 이미지 목록을 탐색 가능</li>
  <li> 마우스 휠로 이미지 탐색 가능(이전/다음 이미지 로드)</li>
</ul>
