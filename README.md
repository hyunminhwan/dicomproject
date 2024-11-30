#  HealScope(의료영상 API연동 하여 의료이미지를 시각화한 프로젝트)

## 제작 기간 
<h3>2024.10.07 ~ 2024.11.25</h4>

## 프로젝트 소개
<ul>
  <li> DICOM 데이터를 효율적으로 관리하고 의료 영상을 시각화하는 시스템 개발 </li>
  <li> cornerstone.js 라이브러리를 활용하여 DICOM 이미지를 로드 및 시각화 </li>
  <li> 환자 CT 및 X-ray 이미지 뷰어, 검색 및 필터링, 보고서 작성 기능 제공 </li>
  <li> Spring Boot, Thymeleaf, Oracle DB를 사용하여 안정적이고 직관적인 UI 구현 </li>
  <li> 의료 데이터 관리 효율성과 사용 편의성을 크게 향상 </li>
</ul>

### ⭐ 팀장: 현민환 | 팀원 : 박혜연 , 김광훈 , 유병수 , 김승욱 |

### 담당 기능
<ul>
  <li>로그인</li>
  <li>회원가입</li>
  <li>과거검사이력 및 이미지</li>
  <li>이미지 리스트</li>
  <li>이미지 디테일</li>
  <li>흑색반전, 스크롤 줌, 이미지이동, 초기화</li>
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
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"> 
</div>

---

# 기능설명
### 🔐 회원가입/로그인
<img src="https://github.com/user-attachments/assets/408a3e8f-1313-4fe7-a5ba-51a841f595a9">

### ⭐기능구현
<ul>
  <li>첫 페이지를 로그인 페이지로 설정하여 보안을 강화했습니다.</li>
  <li>admin 권한으로 사용자 권한을 설정하고, 비밀번호는 암호화하여 안전한 회원가입을 구현했습니다.</li>
  <li>Spring Security를 활용해 로그인 인증 기능을 개발했습니다.</li>
  <li>admin 권한을 가진 사용자만 특정 기능에 접근할 수 있도록 제한했습니다.</li>
</ul>

### 🚨개발 이슈

## 
<hr>

### ⭐ 메인 페이지 검색 및 검색리스트
<img src="https://github.com/user-attachments/assets/8557b558-de7c-45c2-a87a-6106bcf39a07">

### 🔎 검색 및 필터링 기능
### ⭐ 기능구현
<ul>
  <li> 환자 ID, 이름, 장비, 판독 상태, 검사 날짜 범위 등을 입력하여 데이터 조회합니다.</li>
  <li> 날짜 범위를 지정하여 검색(Flatpickr로 구현)할 수 있습니다.</li>
  <li> 검색 결과를 페이지별로 나누어 표시하며, 이전/다음 버튼을 통해 손쉽게 탐색 가능합니다.</li>
  <li> Thymeleaf와 axios를 사용하여 동적 URL로 서버에 요청합니다.</li>
</ul>

### 📋 검색 리스트
### ⭐ 기능구현
<ul>
  <li> 검색 결과를 테이블로 출력합니다.</li>
  <li> 검사 설명, 장비, 날짜, 환자 정보(이름, 성별, 생년월일), 이미지 및 시리즈 건수 보여 줍니다.</li>
  <li> 행 클릭 시 과거 검사 이력 확인, 더블 클릭으로 해당 series이미지 전부 보여줄 수 있습니다.</li>
</ul>

### 🚨개발 이슈
#### 발견🔍 : 통합적으로 검색 조건에 반영되지 않는 문제 발생
#### 과정🛠️ : 각 프래그먼트에서 데이터를 개별적으로 관리하고 있어, 검색 요청 시 두 프래그먼트의 변수를 하나의 검색 쿼리로 합치는 로직이 필요
#### 해결✅ : document.getElementById를 통해 HTML 요소로부터 직접 가져오도록 통합 하여 서버로 전달
---
### ⭐ 메인페이지 하단 비동기처리
<img src="https://github.com/user-attachments/assets/50051bb0-cbee-4f99-a785-fc63ad68975f">

### 📄 리포트 기능
### ⭐ 기능구현
<ul>
  <li> 코멘트, 탐색 내용, 결론, 권장 사항 4가지 작성하여 수정, 저장 가능합니다.</li>
  <li> 리포트 데이터를 서버에서 불러와 자동으로 입력 필드 채워 알아 보기 쉽습니다.</li>
  <li> 저장 버튼 클릭 시 서버에 데이터 전송(axios POST 요청) 하여 save 합니다.</li>
</ul>

### 🏥 과거 검사 이력
### ⭐ 기능구현
<ul>
  <li> 선택한 환자의 과거 검사 데이터를 테이블 형태로 표시 하였습니다.</li>
  <li> 검사 장비, 검사 설명, 검사 일시, 판독 상태, 시리즈 및 이미지 수 조회가 가능합니다.</li>
  <li> 데이터를 axios GET 요청으로 서버에서 가져와 비동기로 업데이트합니다.</li>
</ul>
  
### 🖼️ DICOM 이미지 송출
<ul>
  <li> Cornerstone.js를 사용해 DICOM 이미지를 시각화 하였습니다.</li>
  <li> 마우스 휠로 이미지 탐색 가능(이전/다음 이미지 로드)합니다.</li>
  <li> 선택한 studyKey에 따라 서버에서 이미지를 가져와 뷰어에 로드합니다.</li>
</ul>

---

### 📊 ImageList(DICOM Viewer Grid)
<img src="https://github.com/user-attachments/assets/9ba8107e-f886-4e7d-9ae2-73bb0edbfb63">

### ⭐ 기능구현
<ul>
  <li> 다수의 DICOM 이미지를 그리드 형식으로 배치하여 동시에 표시 합니다.</li>
  <li> 각 seriesKey별로 그룹화된 이미지 리스트를 처리하고, 각 뷰어 컨테이너를 더블 클릭으로 상세 페이지로 이동 합니다.</li>
  <li> Thymeleaf의 th:each 반복문을 활용하여 동적으로 그리드 생성 합니다</li>
  <li> 각 DICOM 뷰어가 studyKey와 seriesKey를 포함하여 개별적으로 동작하도록 하였습니다.</li>
  <li> DICOM 이미지 목록 페이지에 페이지네이션 추가 하여 속도를 향상 시켰습니다.</li>
  <li> "이전" 및 "다음" 버튼을 통해 이미지 목록을 탐색 가능합니다.</li>
  <li> 마우스 휠로 이미지 탐색 가능(이전/다음 이미지 로드) 합니다.</li>
</ul>

### 🚨개발 이슈
#### 발견🔍 : 대량의 DICOM 데이터를 처리할 때 모든 시리즈를 한꺼번에 불러와 메모리 소모와 로딩 시간이 증가하는 문제 발생
#### 과정🛠️ : 초기에는 데이터를 객체 형태로 모두 가져와 처리했으나, 속도가 느려져 이를 시리즈별로 ArrayList<String>으로 간소화하여 처리하도록 수정
#### 해결✅ : 페이징(PageRequest)을 적용해 데이터를 제한적으로 불러오고, 시리즈별로 데이터를 효율적으로 관리하여 성능을 개선
---


### 🎛️ ImageDetail (cornerstoneTools을 사용한 기능 구현)
<img src="https://github.com/user-attachments/assets/2c661bc1-4ab3-40b1-8cb7-abb61f640d93">

### ⭐ 기능구현
### 1. 윈도우 레벨 조정 (windowLevel.js)

<ul>
  <li>밝기와 대비를 조정하여 DICOM 이미지를 사용자 선호에 맞게 조정합니다.</li>
  <li>`cornerstoneTools`를 사용해 도구를 활성화하고 비활성화할 수 있습니다.</li>
  <li>버튼 상태(활성/비활성)와 도구 상태를 실시간으로 확인할 수 있습니다.</li>
</ul>

### 2. 흑백 반전 (invert.js)
<ul> 
  <li>이미지를 흑백으로 반전하여 병변이나 구조물을 강조합니다.</li> 
  <li>DICOM 이미지의 `viewport` 속성을 변경하여 반전 효과를 적용합니다.</li> 
</ul>

### 3. 이미지 이동 (drag.js)
<ul> 
  <li>이미지의 위치를 이동하여 관심 영역을 확대하거나 재배치할 수 있습니다.</li>                
  <li>`cornerstoneTools`의 `Pan` 도구를 활성화하여 드래그 기능을 구현합니다.</li> 
  <li>멀티 뷰어 모드에서도 각각의 뷰어에서 독립적으로 드래그를 활성화할 수 있습니다.</li> 
</ul>

### 5. 줌 조정 (scrollZoom.js)
<ul> 
  <li>이미지를 확대/축소하여 세부 사항을 정밀하게 관찰할 수 있습니다.</li>
  <li>`cornerstoneTools`의 `Zoom` 도구를 활성화하여 줌 기능을 제공합니다.</li> 
  <li>멀티 뷰어 모드에서 각각의 뷰어에서 독립적으로 줌을 활성화할 수 있습니다.</li>
</ul>

### 6. 초기화 (reset.js)
<ul> 
  <li>DICOM 뷰어를 초기 상태로 복원합니다.</li> 
  <li>모든 도구를 비활성화하고 기본 뷰로 재설정합니다.</li> 
  <li>멀티 뷰어 모드에서도 모든 뷰어를 일괄 초기화할 수 있습니다.</li> 
</ul>

---

<img src="https://github.com/user-attachments/assets/ea19396e-16c5-4a28-bdce-15ccd3023593">


### ⭐ 기능구현
 ### 1. 길이 측정 (length.js)
  <ul> 
    <li>이미지 상에서 두 점 사이의 거리를 측정하여 정확한 수치를 제공합니다.</li> 
    <li>`cornerstoneTools`의 `Length` 도구를 활용하여 사용자가 직관적으로 시작점과 끝점을 선택할 수 있습니다.</li> 
    <li>측정된 거리는 실시간으로 화면에 표시되며 저장 및 재사용이 가능합니다.</li> 
  </ul> 
  
### 2. 화살표 주석 추가 (arrow.js)
  <ul> 
    <li>특정 이미지 영역을 강조하기 위해 화살표와 텍스트 주석을 추가합니다.</li> 
    <li>`cornerstoneTools`의 `ArrowAnnotate` 도구를 활용해 화살표의 시작점과 끝점을 정의할 수 있습니다.</li> 
    <li>텍스트 크기, 색상 및 위치는 사용자 요구에 따라 조정 가능하며 추가된 주석은 수정 및 이동이 가능합니다.</li> 
  </ul> 

### 3. 각도 측정 (angle.js)
  <ul> 
    <li>이미지 상에서 두 선분 사이의 각도를 측정하여 분석에 활용할 수 있습니다.</li> 
    <li>`cornerstoneTools`의 `Angle` 도구를 사용해 두 직선의 교차점 기준 각도를 실시간으로 계산합니다.</li> 
    <li>측정된 각도는 화면에 표시되며 저장 및 공유가 가능합니다.</li>
  </ul> 

### 4. 주석 지우기 (eraser.js)
  <ul> 
    <li>추가된 모든 주석(길이, 화살표, 각도 등)을 선택적으로 삭제할 수 있습니다.</li> 
    <li>`cornerstoneTools`의 `Eraser` 도구를 활용해 원하는 주석만 제거하거나 이미지 상의 모든 주석을 한 번에 초기화할 수 있습니다.</li> 
    <li>오류 방지를 위해 삭제 전 확인 메시지를 표시합니다.</li> 
  </ul> 

### 5.다운로드 기능 (download.js)
  <ul> 
    <li>사용자가 DICOM 이미지를 원하는 형식으로 다운로드할 수 있는 기능입니다.</li>
    <li>Canvas를 활용하여 현재 화면에 렌더링된 이미지를 JPG 형식으로 저장합니다.</li> 
    <li>이미지 파일 형식(JPG)과 시리즈 데이터(ZIP)을 선택적으로 저장할 수 있습니다.</li> 
  </ul>

### 6. 클립 재생 (playClip.js)
<ul> 
  <li>DICOM 이미지 스택을 연속적으로 재생하여 동영상처럼 확인할 수 있는 기능입니다.</li> 
  <li>`cornerstoneTools`의 `playClip` 및 `stopClip` 기능을 활용하여 재생 및 정지 기능을 구현합니다.</li> 
  <li>FPS(초당 프레임 수)를 사용자 입력으로 조정하여 재생 속도를 변경할 수 있습니다.</li> 
  <li>재생 컨트롤 UI를 통해 재생, 정지 및 속도 설정이 가능하며, 관련 버튼은 상호작용 중 적절히 활성화/비활성화됩니다.</li> 
</ul>

### 🚨개발 이슈
#### 발견🔍 : DICOM 뷰어에서 도구를 활성화/비활성화할 때, 버튼 상태와 실제 도구 상태가 일치하지 않는 문제가 발생
#### 과정🛠️ : 각 도구와 버튼 상태를 수동으로 관리하려다 보니, 비활성화된 도구의 버튼이 활성화 상태로 남거나, 멀티 뷰어 간 도구 상태가 동기화되지 않는 문제 확
#### 해결✅ : deactivateAllTools 함수를 만들어, 모든 도구를 비활성화하고 버튼의 활성 상태(active 클래스)를 초기화하도록 구현

---
### 🔔보완할 점
#### 📝주석 저장 및 불러오기 기능 
 <li> 현재 주석 기능(길이, 각도, 화살표 등)이 즉시 적용되지만, 저장 후 다시 불러올 수 있는 기능이 추가되면 사용자 편의성이 향상될 것입니다. </li>
 
#### 📝리포트 공유 및 출력 기능
<li> 리포트 내용을 PDF로 저장하거나 이메일 등으로 공유할 수 있는 기능 추가</li>

#### 📝DICOM 데이터 업로드 기능
<li>외부에서 가져온 DICOM 파일을 시스템에 업로드하여 뷰어에서 즉시 확인할 수 있는 기능 추가</li>

