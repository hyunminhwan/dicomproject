let annoDropControllEnabled = false;

// 주석 드롭다운 초기화 함수
function annoDropControll() {
    const toolDropdown = document.getElementById('annotateDropdown');
	const annotateBtn = document.getElementById('annotateBtn');
	annoDropControllEnabled = !annoDropControllEnabled;
	
	if(annoDropControllEnabled) {
		// 드롭다운 메뉴 표시/숨기기
		toolDropdown.style.display = 'block';
		annotateBtn.classList.add('active'); // 버튼 활성화 표시
		
		// 주석모음 버튼 위치와 드롭다운 너비 계산
		const btnRect = annotateBtn.getBoundingClientRect();
		const dropdownWidth = toolDropdown.offsetWidth;
		
		// 주석모음 버튼의 중앙에 드롭다운 메뉴의 중앙을 맞춤
		const leftPosition = btnRect.left + (btnRect.width / 2) - (dropdownWidth / 2);
		const topPosition = btnRect.bottom;
		
		toolDropdown.style.left = `${leftPosition}px`;
		toolDropdown.style.top = `${topPosition}px`;
		
		// 드롭다운 메뉴가 뷰어 위에 겹치도록 설정
		toolDropdown.style.position = 'absolute';

	} else {
		annotateBtn.classList.remove('active'); // 버튼 비활성화 표시
		toolDropdown.style.display = 'none';
	}
}

function multiAnnoDropControll() {
    const toolDropdown = document.getElementById('annotateDropdown');
	const annotateBtn = document.getElementById('annotateBtn');

	// 드롭다운 메뉴 표시/숨기기
	toolDropdown.style.display = 'block';
	annotateBtn.classList.add('active'); // 버튼 활성화 표시
	
	// 주석모음 버튼 위치와 드롭다운 너비 계산
	const btnRect = annotateBtn.getBoundingClientRect();
	const dropdownWidth = toolDropdown.offsetWidth;
	
	// 주석모음 버튼의 중앙에 드롭다운 메뉴의 중앙을 맞춤
	const leftPosition = btnRect.left + (btnRect.width / 2) - (dropdownWidth / 2);
	const topPosition = btnRect.bottom;
	
	toolDropdown.style.left = `${leftPosition}px`;
	toolDropdown.style.top = `${topPosition}px`;
	
	// 드롭다운 메뉴가 뷰어 위에 겹치도록 설정
	toolDropdown.style.position = 'absolute';
}

function multiUnAnnoDropControll() {
	const toolDropdown = document.getElementById('annotateDropdown');
	const annotateBtn = document.getElementById('annotateBtn');
	
	annotateBtn.classList.remove('active'); // 버튼 비활성화 표시
	toolDropdown.style.display = 'none';
}