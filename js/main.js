// 메인 애플리케이션 로직

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('품질관리 대시보드 시작...');
    
    // 모든 컴포넌트 초기화
    initializeApp();
});

// 앱 초기화 함수
function initializeApp() {
    try {
        // 1. 유틸리티 초기화 (날짜/시간, 챗봇)
        initUtils();
        
        // 2. 모달 초기화
        initModals();
        
        // 3. 차트 및 데이터 초기화
        initCharts();
        
        // 4. 추가 이벤트 리스너 설정
        setupEventListeners();
        
        console.log('대시보드 초기화 완료');
        
        // 초기화 완료 알림
        showNotification('품질관리 대시보드가 준비되었습니다!', 'success');
        
    } catch (error) {
        console.error('초기화 중 오류 발생:', error);
        showNotification('초기화 중 오류가 발생했습니다.', 'error');
    }
}

// 추가 이벤트 리스너 설정
function setupEventListeners() {
    // 윈도우 리사이즈 이벤트
    window.addEventListener('resize', debounce(handleWindowResize, 250));
    
    // 키보드 단축키
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // 페이지 가시성 변경 이벤트
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // 온라인/오프라인 상태 감지
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);
}

// 윈도우 리사이즈 처리
function handleWindowResize() {
    // 차트 리사이즈는 Chart.js가 자동으로 처리
    console.log('화면 크기 변경됨');
}

// 키보드 단축키 처리
function handleKeyboardShortcuts(e) {
    // Ctrl + K: 챗봇 포커스
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const chatInput = document.getElementById('chatbotInput');
        if (chatInput) {
            chatInput.focus();
        }
    }
    
    // Ctrl + M: 배치기준 모달 열기
    if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        showDeploymentCriteria();
    }
    
    // F5 새로고침 확인
    if (e.key === 'F5') {
        if (!confirm('페이지를 새로고침하시겠습니까?')) {
            e.preventDefault();
        }
    }
}

// 페이지 가시성 변경 처리
function handleVisibilityChange() {
    if (document.hidden) {
        console.log('페이지가 백그라운드로 전환됨');
        // 필요시 업데이트 일시정지
    } else {
        console.log('페이지가 포그라운드로 전환됨');
        // 데이터 새로고침
        refreshData();
    }
}

// 온라인 상태 처리
function handleOnlineStatus() {
    showNotification('인터넷에 연결되었습니다.', 'success');
    refreshData();
}

// 오프라인 상태 처리
function handleOfflineStatus() {
    showNotification('인터넷 연결이 끊어졌습니다.', 'warning');
}

// 데이터 새로고침
function refreshData() {
    try {
        // 현재 시간 업데이트
        updateDateTime();
        
        // 필요시 서버에서 새 데이터 가져오기
        // 여기서는 시뮬레이션
        console.log('데이터 새로고침 완료');
        
    } catch (error) {
        console.error('데이터 새로고침 실패:', error);
    }
}

// 개발자 모드 (콘솔에서 사용 가능한 유틸리티)
window.dashboard = {
    // 데이터 확인
    getData: () => ({
        sites: siteData,
        structures: structureData,
        materials: materialData,
        grades: gradeData,
        inspections: inspectionData
    }),
    
    // 챗봇에 메시지 추가
    addMessage: (message, sender = 'bot') => {
        addChatMessage(message, sender);
    },
    
    // 알림 표시
    notify: (message, type = 'info') => {
        showNotification(message, type);
    },
    
    // 모달 제어
    modal: {
        deployment: () => showDeploymentCriteria(),
        sms: () => showSMSModal(),
        closeAll: () => closeAllModals()
    },
    
    // 테마 변경 (추후 확장용)
    setTheme: (theme) => {
        console.log(`테마 변경: ${theme}`);
        // 테마 변경 로직 추가 예정
    }
};

// 에러 처리
window.addEventListener('error', function(e) {
    console.error('전역 에러:', e.error);
    showNotification('예상치 못한 오류가 발생했습니다.', 'error');
});

// Promise 에러 처리
window.addEventListener('unhandledrejection', function(e) {
    console.error('처리되지 않은 Promise 에러:', e.reason);
    showNotification('비동기 작업 중 오류가 발생했습니다.', 'error');
});

console.log('메인 스크립트 로드 완료');