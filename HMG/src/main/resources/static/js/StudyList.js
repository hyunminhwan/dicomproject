function studyPast(element) {
	var pid = element.getAttribute('data-pid');
	var pname = element.getAttribute('data-pname');
	var studyKey = element.getAttribute('data-studyKey');  // studyKey 추가
	document.getElementById('pastPid').innerText = pid;
	document.getElementById('pastPname').innerText = pname;

	console.log(pid, pname);
	// AXIOS GET 요청
	
	axios.get(`/pastList`, {
		params: {
			pid: pid,
			pname: pname
		}
	})
		.then((response)=>{
			var studyPastList = response.data;

			// 테이블의 기존 내용을 지우고 새로운 내용을 추가
			var tbody = document.getElementById('studyPastList');
			tbody.innerHTML = ''; // 기존 데이터 지우기

			// HTML 문자열을 생성하여 한번에 추가
			let htmlContent = '';
			studyPastList.forEach(function(study) {
				htmlContent += `
                <tr>
                    <td>${study.modality}</td>
                    <td>${study.studyDesc ? study.studyDesc : '이름없음'}</td>
                    <td>${study.studyDateTime}</td>
                    <td>${study.reportStatus == 3 ? '읽지 않음' : (study.reportStatus == 5 ? '예비 판독' : '판독')}</td>
                    <td>${study.seriesCnt}</td>
                    <td>${study.imageCnt}</td>
                </tr>
            `;
			})
			// tbody에 한 번에 삽입
			tbody.innerHTML = htmlContent;                                                                                

			// studyKey 사용하여 이미지 로드
			loadImages(studyKey);
			
			loadReportData(studyKey);
		})
		.catch(function(error) {
			console.error('Error during AXIOS request:', error);
		});
		
		
}

let reportStudyKey;

function loadReportData(studyKey) {
	reportStudyKey=studyKey;
    axios.get(`/api/report/${studyKey}/${0}`) // 검사에 대한 리포트를 가져오는 API 호출
        .then(response => {
            const report = response.data;
			console.log(report);
            // 리포트 데이터가 있다면 입력 필드에 채우기
            if (report) {
                document.getElementById("comment").value = report.reComment || "";
                document.getElementById("exploration").value = report.reExploration || "";
                document.getElementById("conclusion").value = report.reConclusion || "";
                document.getElementById("recommendation").value = report.reRecommendation || "";
            }else{
				document.getElementById("comment").value = "";
                document.getElementById("exploration").value = "";
                document.getElementById("conclusion").value = "";
                document.getElementById("recommendation").value = "";
			}
        })
        .catch(error => {
            console.error("리포트 로드 오류:", error);
        });
}

// 리포트 저장
function saveReport() {
	if (!reportStudyKey) {
		alert("검사를 선택한 후 저장하세요.");
		return;
	}
	
	const comment = document.getElementById("comment").value;
	const exploration = document.getElementById("exploration").value;
	const conclusion = document.getElementById("conclusion").value;
	const recommendation = document.getElementById("recommendation").value;

	axios.post('/api/saveReport', {
		studyKey: reportStudyKey, // studyKey 함께 전송
		seriesKey: 0,
		reComment: comment,
		reExploration: exploration,
		reConclusion: conclusion,
		reRecommendation: recommendation
	})
		.then(response => {
			if (response.status === 200) {
				alert("저장되었습니다.");
			} else {
				alert("저장에 실패했습니다.");
			}
		})
		.catch(error => {
			console.error("오류 발생:", error);
			alert("오류가 발생했습니다.");
		});
}


function loadImages(studyKey) {
	console.log(studyKey);
	// AXIOS GET 요청으로 선택한 studyKey에 대한 이미지 리스트 가져오기
	axios.get(`/studyImages`, {
		params: {
			studyKey: studyKey
		}
	})
		.then(function(response) {
			var images = response.data; // 서버로부터 이미지 경로 리스트를 가져옴
			// cornerstone 설정
			cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
			cornerstoneWADOImageLoader.configure({ useWebWorkers: true });


			// DICOM 이미지를 단일 뷰어 컨테이너에서 로드하고 전환
			const dicomElement = document.getElementById('dicomViewer');

			// 여기에서 studyKey를 dicomViewer에 저장
			dicomElement.setAttribute('data-studyKey', studyKey);

			// cornerstone 활성화 (첫 로드 시 한 번만 실행)
			if (!cornerstone.getEnabledElements().some(el => el.element === dicomElement)) {
				cornerstone.enable(dicomElement); // cornerstone 활성화는 첫 번째 로드 시에만 호출
			}

			let currentImageIndex = 0;
			const totalImages = images.length;

			// 이미지 경로 앞에 '/mhg/' 추가하여 절대 경로 구성
			const imagePaths = images.map(image => '/mhg/' + image);

			// 이미지 로드 함수
			function loadDicomImage(index) {
				if (index < 0 || index >= totalImages) {
					console.error('Invalid index for loading DICOM image.');
					return;
				}

				const dicomFilePath = imagePaths[index]; // 서버로부터 받은 이미지 리스트에서 경로 사용
				console.log("Loading DICOM image:", dicomFilePath); // 디버깅을 위해 이미지 경로 로그 출력

				// cornerstone을 사용해 DICOM 이미지 로드 및 표시
				cornerstone.loadAndCacheImage('wadouri:' + dicomFilePath).then(function(image) {
					cornerstone.displayImage(dicomElement, image); // 이미 cornerstone이 활성화된 상태에서 이미지만 변경
					dicomElement.classList.remove('hidden');  // 이미지가 있으면 뷰어를 표시
				}).catch(function(error) {
					console.error('Error loading DICOM image:', error);
					dicomElement.classList.add('hidden');  // 이미지가 없으면 뷰어를 숨김
				});
			}

			// 처음 이미지 로드
			if (totalImages > 0) {
				loadDicomImage(currentImageIndex); // 첫 번째 이미지를 로드
			} else {
				console.error('No DICOM images to display.');
				dicomElement.classList.add('hidden');  // 이미지가 없으면 뷰어를 숨김
			}

			// 마우스 휠 이벤트 처리 (이벤트 중복 방지)
			dicomElement.onwheel = function(e) {
				if (e.deltaY > 0) {
					// 마우스 휠 아래로 (다음 이미지)
					currentImageIndex = (currentImageIndex + 1) % totalImages;
				} else {
					// 마우스 휠 위로 (이전 이미지)
					currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
				}
				loadDicomImage(currentImageIndex); // 현재 이미지 인덱스에 해당하는 이미지 로드
				e.preventDefault(); // 페이지 스크롤 방지
			};
		})
		.catch(function(error) {
			console.error('Error loading images:', error);
		});
}

function imageTabList() {
	const studyKey = document.getElementById('dicomViewer').getAttribute('data-studyKey'); // studyKey를 가져옴
	if (studyKey) {
		window.location.href = `/ImageTabList?studyKey=${studyKey}`; // studyKey를 포함한 URL로 이동
	} else {
		console.error('studyKey가 없습니다');
	}
}
