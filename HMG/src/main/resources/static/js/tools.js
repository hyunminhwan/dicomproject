document.addEventListener('DOMContentLoaded', function() {
    const dicomElement = document.getElementById('dicomViewer');  // DICOM 뷰어 요소 가져오기

	// cornerstone-tools 초기화는 페이지 로드 시 한 번만 수행
	   cornerstoneTools.init();
	   
	   let zoomEnabled = false;  // 확대/축소 기능이 활성화되었는지 여부
       let dragEnabled = false;  // 이미지 이동(드래그) 기능이 활성화되었는지 여부
	   let windowLevelEnabled = false; // 윈도우 레벨 기능이 활성화되었는지 여부

	
    // hFlip 버튼 이벤트 처리
    document.getElementById('hFlip').addEventListener('click', function(e) {
        const viewport = cornerstone.getViewport(dicomElement);
        viewport.hflip = !viewport.hflip;  // 수평 플립 토글
        cornerstone.setViewport(dicomElement, viewport);
    });

	document.getElementById('vFlip').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(dicomElement);
        viewport.vflip = !viewport.vflip;
        cornerstone.setViewport(dicomElement, viewport);
    });

    document.getElementById('lRotate').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(dicomElement);
        viewport.rotation-=90;
        cornerstone.setViewport(dicomElement, viewport);
    });

    document.getElementById('rRotate').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(dicomElement);
        viewport.rotation+=90;
        cornerstone.setViewport(dicomElement, viewport);
    });
	
	document.getElementById('zoomIn').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(dicomElement);
        viewport.scale += 0.25;
        cornerstone.setViewport(dicomElement, viewport);
    });
	
	document.getElementById('zoomOut').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(dicomElement);
        viewport.scale -= 0.25;
        cornerstone.setViewport(dicomElement, viewport);
    });
	
	// Zoom 버튼 클릭 시 이벤트 핸들러
    document.getElementById('scrollZoom').addEventListener('click', function () {
        zoomEnabled = !zoomEnabled;  // 클릭할 때마다 활성화/비활성화 전환

        if (zoomEnabled) {
            // Zoom 활성화 (이동 기능 해제)
            disableDrag();  // 드래그 기능 비활성화
			disableWL(); // 윈도우레벨 기능 비활성화
            dicomElement.addEventListener('mousedown', zoomMouseDownHandler);
            document.getElementById('scrollZoom').classList.add('active');
        } else {
            // Zoom 비활성화
            dicomElement.removeEventListener('mousedown', zoomMouseDownHandler);
            document.getElementById('scrollZoom').classList.remove('active');
        }
    });

    // Drag 버튼 클릭 시 이벤트 핸들러
    document.getElementById('drag').addEventListener('click', function () {
        dragEnabled = !dragEnabled;  // 클릭할 때마다 활성화/비활성화 전환

        if (dragEnabled) {
            // Drag 활성화 (확대/축소 기능 해제)
            disableZoom();  // 확대/축소 기능 비활성화
			disableWL(); // 윈도우레벨 기능 비활성화
            dicomElement.addEventListener('mousedown', dragMouseDownHandler);
            document.getElementById('drag').classList.add('active');
        } else {
            // Drag 비활성화
            dicomElement.removeEventListener('mousedown', dragMouseDownHandler);
            document.getElementById('drag').classList.remove('active');
        }
    });
	
	// WindowLevel 버튼 클릭 시 이벤트 핸들러
	    document.getElementById('windowLevel').addEventListener('click', function () {
	        windowLevelEnabled = !windowLevelEnabled;  // 클릭할 때마다 활성화/비활성화 전환

	        if (windowLevelEnabled) {
				disableDrag();  // 드래그 기능 비활성화
	            disableZoom();  // 확대/축소 기능 비활성화
	            dicomElement.addEventListener('mousedown', wLMouseDownHandler);
	            document.getElementById('windowLevel').classList.add('active');
	        } else {
	            // Drag 비활성화
	            dicomElement.removeEventListener('mousedown', wLMouseDownHandler);
	            document.getElementById('windowLevel').classList.remove('active');
	        }
	    });
		
	// 흑백전환 버튼 이벤트 처리
      document.getElementById('invert').addEventListener('click', function(e) {
          const viewport = cornerstone.getViewport(dicomElement);
          viewport.invert = !viewport.invert;  // 수평 플립 토글
          cornerstone.setViewport(dicomElement, viewport);
      });
			

    document.getElementById('reset').addEventListener('click', function (e) {
        cornerstone.reset(dicomElement);
    });
	
	
	
	
	
	
	
	// 확대/축소를 위한 mousedown 핸들러
    function zoomMouseDownHandler(e) {
        let lastY = e.pageY;

        function mouseMoveHandler(e) {
            const deltaY = e.pageY - lastY;
            lastY = e.pageY;

            const viewport = cornerstone.getViewport(dicomElement);
            viewport.scale += deltaY * 0.01;
            if (viewport.scale < 0.1) {
                viewport.scale = 0.1;
            }
            cornerstone.setViewport(dicomElement, viewport);
        }

        function mouseUpHandler() {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }

    // 이미지를 드래그하기 위한 mousedown 핸들러
    function dragMouseDownHandler(e) {
        let lastX = e.pageX;
        let lastY = e.pageY;

        function mouseMoveHandler(e) {
            const deltaX = e.pageX - lastX;
            const deltaY = e.pageY - lastY;
            lastX = e.pageX;
            lastY = e.pageY;

            const viewport = cornerstone.getViewport(dicomElement);
            viewport.translation.x += (deltaX / viewport.scale);
            viewport.translation.y += (deltaY / viewport.scale);
            cornerstone.setViewport(dicomElement, viewport);
        }

        function mouseUpHandler() {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }
	
	// 확대/축소를 위한 mousedown 핸들러
	    function zoomMouseDownHandler(e) {
	        let lastY = e.pageY;

	        function mouseMoveHandler(e) {
	            const deltaY = e.pageY - lastY;
	            lastY = e.pageY;

	            const viewport = cornerstone.getViewport(dicomElement);
	            viewport.scale += deltaY * 0.01;
	            if (viewport.scale < 0.1) {
	                viewport.scale = 0.1;
	            }
	            cornerstone.setViewport(dicomElement, viewport);
	        }

	        function mouseUpHandler() {
	            document.removeEventListener('mousemove', mouseMoveHandler);
	            document.removeEventListener('mouseup', mouseUpHandler);
	        }

	        document.addEventListener('mousemove', mouseMoveHandler);
	        document.addEventListener('mouseup', mouseUpHandler);
	    }
		
	// 윈도우 레벨 조정을 위한 mousedown 핸들러
	    function wLMouseDownHandler(e) {
	        let lastX = e.pageX;
	        let lastY = e.pageY;

	        function mouseMoveHandler(e) {
	            const deltaX = e.pageX - lastX;
	            const deltaY = e.pageY - lastY;
	            lastX = e.pageX;
	            lastY = e.pageY;

	            // 뷰포트를 가져와서 윈도우 레벨 조정
	            const viewport = cornerstone.getViewport(dicomElement);
	            viewport.voi.windowWidth += deltaX;   // X축 움직임에 따라 윈도우 너비 조정
	            viewport.voi.windowCenter += deltaY;  // Y축 움직임에 따라 윈도우 중심 조정
	            cornerstone.setViewport(dicomElement, viewport);
	        }

	        function mouseUpHandler() {
	            document.removeEventListener('mousemove', mouseMoveHandler);
	            document.removeEventListener('mouseup', mouseUpHandler);
	        }

	        document.addEventListener('mousemove', mouseMoveHandler);
	        document.addEventListener('mouseup', mouseUpHandler);
	    }

    // Zoom 기능 비활성화 함수
    function disableZoom() {
        zoomEnabled = false;
        dicomElement.removeEventListener('mousedown', zoomMouseDownHandler);
        document.getElementById('scrollZoom').classList.remove('active');
    }

    // Drag 기능 비활성화 함수
    function disableDrag() {
        dragEnabled = false;
        dicomElement.removeEventListener('mousedown', dragMouseDownHandler);
        document.getElementById('drag').classList.remove('active');
    }

	// WindowLevel 기능 비활성화 함수
	    function disableWL() {
	        windowLevelEnabled = false;
	        dicomElement.removeEventListener('mousedown', wLMouseDownHandler);
	        document.getElementById('windowLevel').classList.remove('active');
	    }


		// 이동 기능
		document.getElementById('panButton').addEventListener('click', function(){
			const PanTool = cornerstoneTools.PanTool;

			if (!panToolActive) {
				cornerstoneTools.addTool(PanTool);
				cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
				panToolActive = true;
			} else {
				cornerstoneTools.setToolDisabled('Pan');
				panToolActive = false;
			}
		}); // panButton에 해당하는 버튼을 생성해서 연결
});