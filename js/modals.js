// 모달 관련 함수들

// 모달 초기화
function initModals() {
    // 배치기준 모달 초기화
    initDeploymentModal();
    
    // SMS 모달 초기화  
    initSMSModal();
    
    // 모든 모달의 닫기 버튼 이벤트
    initModalCloseEvents();
}

// 배치기준 모달 초기화 (문자발송 팝업 충돌 수정)
function initDeploymentModal() {
    const deploymentBtn = document.getElementById('deploymentBtn');
    const deploymentModal = document.getElementById('deploymentModal');
    
    if (deploymentBtn && deploymentModal) {
        deploymentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // 이벤트 버블링 방지
            
            // 다른 모든 모달 닫기
            closeAllModals();
            
            // 배치기준 모달만 열기
            setTimeout(() => {
                deploymentModal.style.display = 'block';
            }, 100); // 약간의 지연으로 충돌 방지
        });
    }
}

// SMS 모달 초기화
function initSMSModal() {
    const sendSmsBtn = document.getElementById('sendSmsBtn');
    
    if (sendSmsBtn) {
        sendSmsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSMSSend();
        });
    }
}

// 모든 모달 닫기 함수
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// 모달 닫기 이벤트 초기화
function initModalCloseEvents() {
    // 모든 닫기 버튼 이벤트
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // 모달 외부 클릭 시 닫기
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// SMS 전송 처리
function handleSMSSend() {
    const recipient = document.getElementById('smsRecipient').value;
    const message = document.getElementById('smsMessage').value;
    
    if (!message.trim()) {
        alert('메시지를 입력해주세요.');
        return;
    }
    
    // 실제 SMS 전송 로직 (여기서는 시뮬레이션)
    let recipientText = '';
    switch(recipient) {
        case 'all':
            recipientText = '전체 현장관리자';
            break;
        case 'incomplete':
            recipientText = '배치미완료 현장';
            break;
        case 'custom':
            recipientText = '선택된 관리자';
            break;
        default:
            recipientText = '수신자';
    }
    
    // 성공 메시지 표시
    alert(`${recipientText}에게 문자가 발송되었습니다.\\n\\n메시지: ${message}`);
    
    // 폼 초기화
    document.getElementById('smsMessage').value = '';
    
    // 모달 닫기
    document.getElementById('smsModal').style.display = 'none';
}

// 배치 기준 확인 함수 (외부에서 호출 가능)
function showDeploymentCriteria() {
    closeAllModals();
    document.getElementById('deploymentModal').style.display = 'block';
}

// SMS 모달 열기 함수 (외부에서 호출 가능)
function showSMSModal() {
    closeAllModals();
    document.getElementById('smsModal').style.display = 'block';
}