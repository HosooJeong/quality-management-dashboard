// 차트 관련 함수들

// 날씨 툴팁 동적 생성 및 관리
function initWeatherTooltip() {
    const weatherIcon = document.getElementById('weatherIcon');
    let tooltip = null;

    function createTooltip() {
        if (tooltip) return tooltip;
        
        tooltip = document.createElement('div');
        tooltip.className = 'weather-tooltip';
        document.body.appendChild(tooltip);
        return tooltip;
    }

    function showTooltip(e) {
        const currentSite = siteData[0]; // 첫 번째 현장의 날씨 정보 사용
        if (!currentSite) return;

        const tooltip = createTooltip();
        tooltip.textContent = currentSite.weather;
        
        const rect = weatherIcon.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // 화면 경계를 고려한 위치 계산
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 10;
        
        // 화면 밖으로 나가지 않도록 조정
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) top = rect.bottom + 10;
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.classList.add('show');
    }

    function hideTooltip() {
        if (tooltip) {
            tooltip.classList.remove('show');
        }
    }

    function removeTooltip() {
        if (tooltip) {
            tooltip.remove();
            tooltip = null;
        }
    }

    weatherIcon.addEventListener('mouseenter', showTooltip);
    weatherIcon.addEventListener('mouseleave', hideTooltip);
    
    // 페이지를 벗어날 때 툴팁 제거
    window.addEventListener('beforeunload', removeTooltip);
}

// 품질등급 원형 차트 생성
function createGradeChart() {
    const ctx = document.getElementById('gradeChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: gradeData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false // 범례는 별도로 만들 예정
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value}개 (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '60%',
            elements: {
                arc: {
                    borderWidth: 0
                }
            }
        }
    });

    // 커스텀 범례 생성
    createCustomLegend();
}

// 커스텀 범례 생성
function createCustomLegend() {
    const legendContainer = document.getElementById('gradeLegend');
    legendContainer.innerHTML = '';

    gradeData.labels.forEach((label, index) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        
        const colorBox = document.createElement('div');
        colorBox.className = 'legend-color';
        colorBox.style.backgroundColor = gradeData.datasets[0].backgroundColor[index];
        
        const labelText = document.createElement('span');
        labelText.textContent = `${label} (${gradeData.datasets[0].data[index]}%)`;
        
        legendItem.appendChild(colorBox);
        legendItem.appendChild(labelText);
        legendContainer.appendChild(legendItem);
    });
}

// 품질검사 결과 차트 생성
function createInspectionChart() {
    const ctx = document.getElementById('inspectionChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: inspectionData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            size: 11
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// 현장 카드 렌더링
function renderSiteCards() {
    const siteGrid = document.getElementById('siteGrid');
    siteGrid.innerHTML = '';

    siteData.forEach(site => {
        const siteCard = document.createElement('div');
        siteCard.className = 'site-item';
        
        const statusClass = site.status === '정상' ? 'status-normal' : 'status-warning';
        
        siteCard.innerHTML = `
            <h4>${site.name}</h4>
            <div class="site-details">
                <p><strong>위치:</strong> ${site.location}</p>
                <p><strong>진행률:</strong> ${site.progress}</p>
                <p><strong>관리자:</strong> ${site.manager}</p>
                <p><strong>상태:</strong> <span class="${statusClass}">${site.status}</span></p>
            </div>
        `;
        
        siteGrid.appendChild(siteCard);
    });
}

// 구조물 테이블 렌더링
function renderStructureTable() {
    const tableBody = document.getElementById('structureTableBody');
    tableBody.innerHTML = '';

    structureData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.completed}</td>
            <td>${item.pending}</td>
            <td>${item.failed}</td>
        `;
        tableBody.appendChild(row);
    });
}

// 자재 테이블 렌더링
function renderMaterialTable() {
    const tableBody = document.getElementById('materialTableBody');
    tableBody.innerHTML = '';

    materialData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.completed}</td>
            <td>${item.pending}</td>
            <td>${item.failed}</td>
        `;
        tableBody.appendChild(row);
    });
}

// 모든 차트 초기화
function initCharts() {
    // 날씨 툴팁 초기화
    initWeatherTooltip();
    
    // 차트 생성
    createGradeChart();
    createInspectionChart();
    
    // 테이블 렌더링
    renderSiteCards();
    renderStructureTable();
    renderMaterialTable();
}