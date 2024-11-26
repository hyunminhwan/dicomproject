# DicomProject

<h3>팀명: HealScope </h3>
<ul>
  <li>팀장: 현민환</li>
  <li>박혜연</li>
  <li>김광훈</li>
  <li>유병수</li>
  <li>김승욱</li>
</ul>
사용 기술: JavaScript, Thymeleaf.
<h3>프로젝트 소개</h3>
<ul>
  <li> DICOM 데이터를 효율적으로 관리하고 의료 영상을 시각화하는 시스템 개발 </li>
  <li> cornerstone.js 라이브러리를 활용하여 DICOM 이미지를 로드 및 시각화 </li>
  <li> 환자 CT 및 X-ray 이미지 뷰어, 검색 및 필터링, 보고서 작성 기능 제공 </li>
  <li> Spring Boot, Thymeleaf, Oracle DB를 사용하여 안정적이고 직관적인 UI 구현 </li>
  <li> 의료 데이터 관리 효율성과 사용 편의성을 크게 향상 </li>
</ul>

<h2>메인페이지</h2>
<ol>
  <li> 검색 및 필터링 기능
      <ul>
        <li> 환자 ID, 이름, 장비, 판독 상태, 검사 날짜 범위 등을 입력하여 데이터 조회</li>
        <li> 날짜 범위를 지정하여 검색(Flatpickr로 구현)</li>
        <li> 검색 결과를 페이지별로 나누어 표시하며, 이전/다음 버튼을 통해 손쉽게 탐색 가능</li>
        <li> Thymeleaf와 axios를 사용하여 동적 URL로 서버에 요청</li>
      </ul>
</li>
    <br>
  <li> 리포트 기능(report.html, StudyList.js)
    <ul>
      <li> 검사별 상세 리포트를 작성, 수정, 저장 가능</li>
      <li> 코멘트, 탐색 내용, 결론, 권장 사항</li>
      <li> 리포트 데이터를 서버에서 불러와 자동으로 입력 필드 채움</li>
      <li> 저장 버튼 클릭 시 서버에 데이터 전송(axios POST 요청)</li>
    </ul>
  </li>
    <br>
  <li> 과거 검사 이력
    <ul>
      <li> 선택한 환자의 과거 검사 데이터를 테이블 형태로 표시</li>
      <li> 검사 장비, 검사 설명, 검사 일시, 판독 상태, 시리즈 및 이미지 수</li>
      <li> 데이터를 axios GET 요청으로 서버에서 가져와 동적으로 업데이트</li>
      <li></li>
    </ul>
  </li>
    <br>
  <li> 검색 리스트
    <ul>
      <li> 검색 결과를 테이블로 출력</li>
      <li> 검사 설명, 장비, 날짜, 환자 정보(이름, 성별, 생년월일), 이미지 및 시리즈 건수</li>
      <li> 행 클릭 시 과거 검사 이력 확인, 더블 클릭으로 해당 series이미지 전부 송출</li>
    </ul>
  </li>
  <br>
  <li> DICOM 이미지 송출
    <ul>
      <li> Cornerstone.js를 사용해 DICOM 이미지를 시각화</li>
      <li> 마우스 휠로 이미지 탐색 가능(이전/다음 이미지 로드)</li>
      <li> 선택한 studyKey에 따라 서버에서 이미지를 가져와 뷰어에 로드</li>
    </ul>
  </li>
</ol>
<h3>ImageList(DICOM Viewer Grid)</h3>
<ul>
  <li> 다수의 DICOM 이미지를 그리드 형식으로 배치하여 동시에 표시</li>
  <li> 각 seriesKey별로 그룹화된 이미지 리스트를 처리하고, 각 뷰어 컨테이너를 더블 클릭으로 상세 보기 기능 제공</li>
  <li> Thymeleaf의 th:each 반복문을 활용하여 동적으로 그리드 생성</li>
  <li> 각 DICOM 뷰어가 studyKey와 seriesKey를 포함하여 개별적으로 동작하도록 설계</li>
  <li> DICOM 이미지 목록 페이지에 페이지네이션 추가</li>
  <li> "이전" 및 "다음" 버튼을 통해 이미지 목록을 탐색 가능</li>
  <li> 현재 페이지 번호를 시각적으로 표시</li>
</ul>
