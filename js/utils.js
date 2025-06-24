// 유틸리티 함수들

// 현재 날짜/시간 업데이트
function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const dateTimeString = now.toLocaleDateString('ko-KR', options);
    const dateTimeElement = document.getElementById('currentDateTime');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateTimeString;
    }
}

// 챗봇 초기화 (UI 개선)
function initChatbot() {
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    if (!chatbotInput || !chatbotSend || !chatbotMessages) return;
    
    // 전송 버튼 클릭 이벤트
    chatbotSend.addEventListener('click', function() {
        sendChatMessage();
    });
    
    // 엔터 키 이벤트
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendChatMessage();
        }
    });
    
    // 입력 필드 포커스 이벤트
    chatbotInput.addEventListener('focus', function() {
        this.style.borderColor = '#007bff';
    });
    
    chatbotInput.addEventListener('blur', function() {
        this.style.borderColor = '#e9ecef';
    });
}

// 챗봇 메시지 전송 (UI 구분 개선)
function sendChatMessage() {
    const chatbotInput = document.getElementById('chatbotInput');
    const message = chatbotInput.value.trim();
    
    if (!message) return;
    
    // 사용자 메시지 추가
    addChatMessage(message, 'user');
    
    // 입력 필드 초기화
    chatbotInput.value = '';
    
    // 봇 응답 생성 (약간의 지연으로 자연스럽게)
    setTimeout(() => {
        const response = getChatbotResponse(message);
        addChatMessage(response, 'bot');
    }, 500);
}

// 챗봇 메시지 추가 (카카오톡/아이폰 메시지 스타일)
function addChatMessage(message, sender) {
    const chatbotMessages = document.getElementById('chatbotMessages');
    if (!chatbotMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = message;
    
    messageDiv.appendChild(messageContent);
    chatbotMessages.appendChild(messageDiv);
    
    // 자동 스크롤
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // 메시지 애니메이션
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 50);
}

// 챗봇 응답 생성
function getChatbotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // 키워드 매칭
    for (const [keyword, response] of Object.entries(chatbotResponses)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }
    
    // 기본 응답
    return chatbotResponses.default;
}

// 숫자 포맷팅 (천 단위 콤마)
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 퍼센트 계산
function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
}

// 상태 클래스 생성
function getStatusClass(status) {
    switch(status) {
        case '정상':
            return 'status-normal';
        case '주의':
            return 'status-warning';
        case '위험':
            return 'status-danger';
        default:
            return 'status-normal';
    }
}

// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 알림 표시
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 스타일 적용
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    // 타입별 배경색
    const colors = {
        info: '#007bff',
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // 애니메이션
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 자동 제거
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 초기화 함수
function initUtils() {
    // 날짜/시간 업데이트 시작
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // 챗봇 초기화
    initChatbot();
}