$(document).ready(function() {
  const gridButton = $("#gridButton");
  const gridContainer = $("#gridContainer");
  const gridSelector = $(".grid-selector");

  // 초기 5x5 그리드 셀 생성
  for (let i = 0; i < 25; i++) {
    gridSelector.append("<div></div>");
  }

  // 버튼 클릭 시 드롭다운 메뉴 표시
  gridButton.on("click", function() {
    gridContainer.toggle();
  });

  // 마우스 오버 이벤트를 각 셀에 추가
  gridSelector.children("div").on("mouseover", function() {
    const index = $(this).index();
    const gridSize = Math.sqrt(gridSelector.children().length); // 그리드 크기 계산 (예: 5x5)

    // 마우스가 위치한 셀의 행, 열 인덱스 계산
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    // 모든 셀의 배경 초기화 (기존 색상 초기화)
    gridSelector.children("div").css("background-color", "");

    // (0,0)부터 (row, col)까지의 영역에 배경색 적용
    gridSelector.children("div").each(function(i) {
      const r = Math.floor(i / gridSize); // 현재 셀의 행 인덱스
      const c = i % gridSize; // 현재 셀의 열 인덱스

      // (0, 0)부터 마우스 위치 셀(row, col)까지 포함되는 셀에만 배경색 적용
      if (r <= row && c <= col) {
        $(this).css("background-color", "grey");
      }
    });

    // 현재 선택된 그리드 크기를 출력 (예: 3x3)
    console.log(`현재 선택된 그리드 크기: ${col + 1}x${row + 1}`);
  });

  // 드롭다운 외부 클릭 시 드롭다운 숨기기
  $(window).on("click", function(event) {
    if (!$(event.target).closest("#gridButton").length) {
      gridContainer.hide();
    }
  });
});
