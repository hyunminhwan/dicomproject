 $('#searchBtn').click(function() {
            const pid = $('#pid').val();
            const pname = $('#pname').val();
            const reportStatus = $('#reportStatus').val();
            
            $.ajax({
                url: '/search',  // 검색 요청을 처리하는 서버 엔드포인트
                method: 'GET',   // GET 요청으로 데이터 전송
                data: {
                    pid: pid,
                    pname: pname,
                    reportStatus: reportStatus
                },
                success: function(response) {
                    // 응답 데이터를 받아와서 검색 결과를 화면에 표시
                    $('#searchResults').html(response);
                },
                error: function() {
                    alert('검색 중 오류가 발생했습니다.');
                }
            });
        });