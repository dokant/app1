/* ===========================
   행정사사무소 - 공통 JavaScript
   =========================== */

// ===== API Helpers (Google Sheets Backend) =====
const GAS_WEBHOOK_URL = (() => {
  try {
    const stored = localStorage.getItem('cheongsol_gas_webhook_url');
    if (stored && stored.startsWith('https://script.google.com/macros/')) return stored;
  } catch(e) {}
  return '';
})();

const API = {
  async get(table, params = {}) {
    if (!GAS_WEBHOOK_URL) return { data: [] };
    try {
      const url = new URL(GAS_WEBHOOK_URL);
      url.searchParams.append('table', table);
      const res = await fetch(url.toString());
      const json = await res.json();
      return { data: json.data || [] };
    } catch(e) {
      console.error(e);
      return { data: [] };
    }
  },

  async getOne(table, id) {
    const all = await this.get(table);
    const item = all.data.find(x => x.id === id);
    if (!item) throw new Error('Not found');
    return item;
  },

  async create(table, payload) {
    if (!GAS_WEBHOOK_URL) {
      console.warn('GAS_WEBHOOK_URL 미설정 - 저장 안됨');
      return payload;
    }
    try {
      const url = new URL(GAS_WEBHOOK_URL);
      url.searchParams.append('action', 'create');
      url.searchParams.append('table', table);
      url.searchParams.append('data', JSON.stringify(payload));

      const res = await fetch(url.toString(), { method: 'GET' });
      const json = await res.json();
      
      if (json.status === 'error') {
        throw new Error('GAS 서버 오류: ' + json.message);
      }
      return payload;
    } catch(e) {
      console.error(e);
      window.alert("상세 에러 원인: " + e.message); 
      throw e;
    }
  },

  async update(table, id, payload) {
    if (!GAS_WEBHOOK_URL) return payload;
    try {
      const url = new URL(GAS_WEBHOOK_URL);
      url.searchParams.append('action', 'update');
      url.searchParams.append('table', table);
      url.searchParams.append('id', id);
      url.searchParams.append('data', JSON.stringify(payload));

      const res = await fetch(url.toString(), { method: 'GET' });
      const json = await res.json();
      
      if (json.status === 'error') {
        throw new Error('GAS 서버 오류: ' + json.message);
      }
      return payload;
    } catch(e) {
      console.error(e);
      window.alert("상세 에러 원인: " + e.message);
      throw e;
    }
  },

  async delete(table, id) {
    return true;
  }
};

// ===== Header (드로어 메뉴 방식) =====
function initHeader() {
  const header   = document.getElementById('header');
  const toggle   = document.getElementById('navToggle');
  const drawer   = document.getElementById('mobileMenu');

  if (!header) return;

  // 스크롤 효과
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  if (!toggle || !drawer) return;

  // 오버레이 생성 (없으면)
  let overlay = document.getElementById('drawerOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'drawerOverlay';
    overlay.className = 'drawer-overlay';
    document.body.appendChild(overlay);
  }

  // 드로어 헤더 동적 삽입 (없으면)
  if (!drawer.querySelector('.drawer-header')) {
    const drawerHeader = document.createElement('div');
    drawerHeader.className = 'drawer-header';
    drawerHeader.innerHTML = `
      <div class="drawer-logo">
        <div class="drawer-logo-icon"><i class="fas fa-balance-scale"></i></div>
        <div>
          <div class="drawer-logo-name">청솔행정사사무소</div>
          <div class="drawer-logo-sub">기업민원·행정대행 전문</div>
        </div>
      </div>
      <button class="drawer-close" id="drawerClose" aria-label="메뉴 닫기">
        <i class="fas fa-times"></i>
      </button>`;
    drawer.insertBefore(drawerHeader, drawer.firstChild);
  }

  let menuOpen = false;

  function openDrawer() {
    menuOpen = true;
    drawer.classList.add('open');
    overlay.classList.add('open');
    toggle.classList.add('open');
    document.body.style.overflow = 'hidden';
    // display 보장
    drawer.style.removeProperty('display');
  }

  function closeDrawer() {
    menuOpen = false;
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    toggle.classList.remove('open');
    document.body.style.overflow = '';
  }

  // 햄버거 버튼
  toggle.addEventListener('click', () => {
    menuOpen ? closeDrawer() : openDrawer();
  });

  // 닫기(X) 버튼
  document.addEventListener('click', (e) => {
    if (e.target.closest('#drawerClose')) closeDrawer();
  });

  // 오버레이 클릭 시 닫기
  overlay.addEventListener('click', closeDrawer);

  // 메뉴 링크 클릭 시 닫기
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

  // ESC 키 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) closeDrawer();
  });

  // 현재 페이지 활성 링크 표시
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  drawer.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ===== Toast =====
function showToast(message, type = 'default', duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', default: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.default}"></i><span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(120%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ===== Modal =====
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (e.target.closest('.modal-close')) {
    e.target.closest('.modal-overlay')?.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ===== FAQ Toggle =====
function initFaq() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ===== Acceptance Number Generator =====
function generateAppNumber() {
  const now = new Date();
  const date = now.getFullYear().toString().slice(2)
    + String(now.getMonth() + 1).padStart(2, '0')
    + String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `APP-${date}-${rand}`;
}

// ===== Format Date =====
function formatDate(timestamp) {
  if (!timestamp) return '-';
  const d = new Date(timestamp);
  return d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0');
}

function formatDateTime(timestamp) {
  if (!timestamp) return '-';
  const d = new Date(timestamp);
  return formatDate(timestamp) + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

// ===== Form Validation =====
function validateRequired(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(el => {
    const group = el.closest('.form-group');
    const existing = group?.querySelector('.form-error');
    if (!el.value.trim()) {
      valid = false;
      el.style.borderColor = 'var(--danger)';
      if (group && !existing) {
        const err = document.createElement('p');
        err.className = 'form-error';
        err.textContent = '필수 입력 항목입니다.';
        group.appendChild(err);
      }
    } else {
      el.style.borderColor = '';
      if (existing) existing.remove();
    }
  });
  return valid;
}

// ===== Scroll Animation =====
// CSS @keyframes 방식으로 처리 - JS는 클래스 추가만 담당
function initScrollAnimate() {
  if (!('IntersectionObserver' in window)) {
    // 미지원 브라우저: 모든 요소 즉시 표시
    document.querySelectorAll('.anim').forEach(el => el.classList.add('anim-done'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('anim-done');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.anim').forEach(el => {
    const rect = el.getBoundingClientRect();
    // 이미 화면 안에 있으면 즉시 표시
    if (rect.top < window.innerHeight) {
      el.classList.add('anim-done');
    } else {
      observer.observe(el);
    }
  });
}

// ===== Category Data =====
const CATEGORIES = [
  {
    id: 'license',
    name: '인허가·등록·변경신고',
    icon: '📋',
    iconClass: 'service-icon-1',
    desc: '사업 운영에 필요한 행정 인허가 및 각종 등록·변경 업무 지원',
    tags: ['영업등록', '변경신고', '갱신', '공사업'],
    subServices: ['신규 인허가·등록', '변경·갱신 신고', '공사업 행정서류', '통신판매업 신고', '공장등록·영업신고', '시설 관련 민원']
  },
  {
    id: 'procurement',
    name: '조달·입찰·공공기관 서류',
    icon: '🏛️',
    iconClass: 'service-icon-2',
    desc: '나라장터 입찰 및 공공기관 제출용 서류 정리·작성 대행',
    tags: ['나라장터', '입찰서류', '실적확인서', '공공기관'],
    subServices: ['나라장터 관련 서류', '입찰참가용 기업서류', '실적자료·확인서류', '공공기관 제출용 민원서류', '기업현황 서류 정리']
  },
  {
    id: 'certification',
    name: '기업인증·기술행정',
    icon: '🏅',
    iconClass: 'service-icon-3',
    desc: '벤처·이노비즈·기업부설연구소 등 기업인증 행정 대행',
    tags: ['기업부설연구소', '벤처인증', '이노비즈', '메인비즈'],
    subServices: ['기업부설연구소 설립', '벤처기업 확인', '이노비즈·메인비즈 인증', '제품·기술 관련 행정', '시험성적서 대응']
  },
  {
    id: 'document',
    name: '계약서·내용증명·사실확인',
    icon: '📝',
    iconClass: 'service-icon-4',
    desc: '거래계약서, 내용증명, 사실확인서 등 문서 작성 대행',
    tags: ['계약서', '내용증명', '사실확인서', '경위서'],
    subServices: ['거래계약서 작성', '납품 관련 문서', '내용증명 발송', '경위서·사실확인서', '확약서·진술서']
  },
  {
    id: 'appeal',
    name: '행정처분 대응·행정심판',
    icon: '⚖️',
    iconClass: 'service-icon-5',
    desc: '행정처분에 대한 의견서 작성 및 행정심판 청구 대행',
    tags: ['행정처분', '행정심판', '의견서', '소명서'],
    subServices: ['과태료·영업정지 대응', '보완요구·반려 대응', '의견서·소명서 작성', '행정심판 청구 서류', '처분취소 절차 지원']
  },
  {
    id: 'immigration',
    name: '출입국·비자·해외문서',
    icon: '✈️',
    iconClass: 'service-icon-6',
    desc: '외국인 초청·체류 연장·비자 및 해외 제출용 문서 대행',
    tags: ['비자', '체류연장', '아포스티유', '해외문서'],
    subServices: ['외국인 초청장 작성', '체류 연장·변경', '비자 관련 서류', '번역문·아포스티유', '해외제출 위임장·사실확인']
  }
];

// ===== Status Config =====
const STATUS_CONFIG = {
  '접수완료': { color: 'badge-접수완료', icon: 'fa-inbox' },
  '검토중': { color: 'badge-검토중', icon: 'fa-search' },
  '보완요청': { color: 'badge-보완요청', icon: 'fa-exclamation' },
  '상담진행': { color: 'badge-상담진행', icon: 'fa-comments' },
  '수임확정': { color: 'badge-수임확정', icon: 'fa-handshake' },
  '진행중': { color: 'badge-진행중', icon: 'fa-spinner' },
  '완료': { color: 'badge-완료', icon: 'fa-check' },
  '종결': { color: 'badge-종결', icon: 'fa-times' }
};

function statusBadge(status) {
  const cfg = STATUS_CONFIG[status] || { color: '', icon: 'fa-circle' };
  return `<span class="badge ${cfg.color}"><i class="fas ${cfg.icon}"></i> ${status}</span>`;
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFaq();
  initScrollAnimate();

  // Service Worker Registration for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.error('Service Worker registration failed', err));
  }
});
