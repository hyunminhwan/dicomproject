function confirmDownloadType() {
	const container = document.createElement('div');
	container.id = 'confirm-download-modal';
	container.style.position = 'fixed';
	container.style.top = '50%';
	container.style.left = '50%';
	container.style.transform = 'translate(-50%, -50%)';
	container.style.background = '#fff';
	container.style.padding = '20px';
	container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
	container.style.zIndex = '9999';
	
	const title = document.createElement('h3');
	title.textContent = '다운로드 유형 선택';
	container.appendChild(title);
	
	const currentBtn = document.createElement('button');
	currentBtn.textContent = '현재 페이지';
	currentBtn.style.margin = '10px';
	container.appendChild(currentBtn);

	const seriesBtn = document.createElement('button');
	seriesBtn.textContent = '시리즈';
	seriesBtn.style.margin = '10px';
	container.appendChild(seriesBtn);

	const cancelBtn = document.createElement('button');
	cancelBtn.textContent = '취소';
	cancelBtn.style.margin = '10px';
	cancelBtn.style.background = 'red';
	cancelBtn.style.color = '#fff';
	container.appendChild(cancelBtn);
	
	document.body.appendChild(container);
	
	return new Promise((resolve) => {
	    currentBtn.addEventListener('click', () => {
	        resolve('current');
	        document.body.removeChild(container);
	    });

	    seriesBtn.addEventListener('click', () => {
	        resolve('series');
	        document.body.removeChild(container);
	    });

	    cancelBtn.addEventListener('click', () => {
	        resolve(null);
	        document.body.removeChild(container);
	    });
	});
	
}





















