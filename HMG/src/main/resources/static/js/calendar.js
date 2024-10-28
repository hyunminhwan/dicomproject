let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let startDate = null;
let endDate = null;

// 달력 아이콘 클릭 시 Flatpickr 달력 열기
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("calendar-icon").addEventListener("click", function() {
        flatpickr("#calendar-icon", {
            altInput: true,
            altFormat: "F Y", // 월과 년도만 표시
            dateFormat: "Y-m-d",
            defaultDate: `${currentYear}-${currentMonth + 1}-01`, // 현재 년도와 월로 초기화
            onChange: function(selectedDates) {
                const selectedDate = selectedDates[0];
                currentYear = selectedDate.getFullYear();
                currentMonth = selectedDate.getMonth();
                // 선택된 월과 년도로 달력 업데이트
                renderCalendar(currentMonth, currentYear);
            }
        }).open(); // 달력 열기
    });

    // 초기 로드 시 현재 달 렌더링
    renderCalendar(currentMonth, currentYear);
});

function renderCalendar(month, year) {
    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarTitle = document.getElementById("calendar-title");
    calendarTitle.textContent = `${year}년 ${monthNames[month]}`;

    const calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = "";

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                cell.textContent = "";
            } else if (date > daysInMonth) {
                cell.textContent = "";
            } else {
                cell.textContent = date;
                cell.dataset.date = `${year}-${month < 9 ? '0' + (month + 1) : (month + 1)}-${date < 10 ? '0' + date : date}`;
                cell.addEventListener("click", () => handleDateSelection(cell, cell.textContent, month + 1, year)); // 날짜 선택
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
    highlightSelectedRange();
}

function highlightSelectedRange() {
    if (!startDate || !endDate) return;

    const cells = document.querySelectorAll("td");
    cells.forEach(cell => {
        const cellDate = cell.dataset.date;
        if (cellDate >= startDate && cellDate <= endDate) {
            cell.classList.add("in-range");
        } else {
            cell.classList.remove("in-range");
        }
    });
}

function handleDateSelection(cell, day, month, year) {
    const selectedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    if (!startDate || (startDate && endDate)) {
        startDate = selectedDate;
        endDate = null;
    } else {
        endDate = selectedDate;
        if (startDate > endDate) {
            [startDate, endDate] = [endDate, startDate]; // 날짜 순서 반전
        }
    }

    document.getElementById("start-date").value = startDate;
    document.getElementById("end-date").value = endDate ? endDate : startDate;

    highlightSelectedRange();

    // 선택된 날짜 동그랗게 표시
    const cells = document.querySelectorAll("td");
    cells.forEach(cell => {
        const cellDate = cell.dataset.date;
        if (cellDate === startDate || cellDate === endDate) {
            cell.classList.add("selected");
        } else {
            cell.classList.remove("selected");
        }
    });
}

// 새 페이지로 이동하는 폼 제출 함수
function submitNewForm() {
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    if (startDate && endDate) {
        alert(`날짜 범위: ${startDate} ~ ${endDate}`);
    } else {
        alert("날짜를 선택하세요.");
    }
}

// 이전 달 이동
document.getElementById("prev-month").addEventListener("click", () => {
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
    renderCalendar(currentMonth, currentYear);
});

// 다음 달 이동
document.getElementById("next-month").addEventListener("click", () => {
    currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
    currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
    renderCalendar(currentMonth, currentYear);
});
