// 현장 데이터
const siteData = [
    {
        name: '서울 아파트 건설현장',
        location: '서울시 강남구',
        progress: '85%',
        manager: '김철수',
        status: '정상',
        weather: '맑음, 23°C, 습도 45%, 바람 2m/s'
    },
    {
        name: '부산 오피스텔 현장',
        location: '부산시 해운대구',
        progress: '72%',
        manager: '이영희',
        status: '주의',
        weather: '흐림, 19°C, 습도 65%, 바람 4m/s'
    },
    {
        name: '대구 상가건물 현장',
        location: '대구시 중구',
        progress: '90%',
        manager: '박민수',
        status: '정상',
        weather: '맑음, 21°C, 습도 40%, 바람 1m/s'
    },
    {
        name: '인천 물류센터 현장',
        location: '인천시 연수구',
        progress: '65%',
        manager: '최수진',
        status: '정상',
        weather: '소나기, 18°C, 습도 80%, 바람 6m/s'
    },
    {
        name: '광주 문화센터 현장',
        location: '광주시 북구',
        progress: '78%',
        manager: '정하늘',
        status: '정상',
        weather: '맑음, 22°C, 습도 50%, 바람 3m/s'
    },
    {
        name: '대전 연구소 현장',
        location: '대전시 유성구',
        progress: '55%',
        manager: '한별이',
        status: '주의',
        weather: '흐림, 20°C, 습도 60%, 바람 2m/s'
    }
];

// 품질등급 데이터
const gradeData = {
    labels: ['우수', '양호', '보통', '미흡'],
    datasets: [{
        data: [40, 35, 20, 5],
        backgroundColor: [
            '#28a745',
            '#17a2b8', 
            '#ffc107',
            '#dc3545'
        ],
        borderWidth: 0
    }]
};

// 품질검사 결과 데이터
const inspectionData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    datasets: [{
        label: '합격',
        data: [85, 88, 92, 89, 94, 91],
        backgroundColor: 'rgba(40, 167, 69, 0.8)',
        borderColor: '#28a745',
        borderWidth: 2
    }, {
        label: '불합격',
        data: [15, 12, 8, 11, 6, 9],
        backgroundColor: 'rgba(220, 53, 69, 0.8)',
        borderColor: '#dc3545',
        borderWidth: 2
    }]
};

// 구조물 데이터
const structureData = [
    { name: '기초', completed: 145, pending: 12, failed: 3 },
    { name: '기둥', completed: 230, pending: 8, failed: 2 },
    { name: '보', completed: 180, pending: 15, failed: 5 },
    { name: '슬래브', completed: 95, pending: 20, failed: 1 },
    { name: '벽체', completed: 160, pending: 18, failed: 4 }
];

// 자재 데이터 (새로 추가)
const materialData = [
    { name: '상수관', completed: 85, pending: 5, failed: 2 },
    { name: '오수관', completed: 120, pending: 8, failed: 1 },
    { name: '우수관', completed: 95, pending: 12, failed: 3 },
    { name: '경계석', completed: 200, pending: 15, failed: 5 },
    { name: '기타', completed: 75, pending: 10, failed: 2 }
];

// 챗봇 응답 데이터
const chatbotResponses = {
    '안녕': '안녕하세요! 품질관리 관련해서 도움이 필요하시면 언제든 말씀해주세요.',
    '현장': '현재 총 6개 현장이 진행 중입니다. 구체적인 현장 정보가 필요하시면 현장명을 말씀해주세요.',
    '검사': '품질검사는 매주 정기적으로 실시되며, 현재 합격률은 91%입니다.',
    '관리자': '현재 12개 현장에 품질관리자가 배치되어 있으며, 3개 현장에 추가 배치가 필요합니다.',
    '기준': '품질관리자 배치기준은 공사비에 따라 결정됩니다. 자세한 내용은 배치기준 버튼을 클릭해주세요.',
    '등급': '현장 품질등급 현황: 우수 40%, 양호 35%, 보통 20%, 미흡 5%입니다.',
    '도움': '품질관리 시스템 사용법, 검사 절차, 관리자 배치 등에 대해 문의하실 수 있습니다.',
    '감사': '천만에요! 더 궁금한 것이 있으시면 언제든 물어보세요.',
    'default': '죄송합니다. 질문을 이해하지 못했습니다. 품질관리, 현장, 검사, 관리자, 등급 등의 키워드로 질문해보세요.'
};