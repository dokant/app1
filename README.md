# 청솔행정사사무소 홈페이지

> **기업민원·행정대행 전문 실무 접수형 홈페이지 (MVP)**

---

## 📌 프로젝트 개요

**목적**: 행정사 서비스 소개 + 카테고리별 민원대행 신청 온라인 접수  
**컨셉**: 홍보형이 아닌 **실무 접수형** 홈페이지  
**디자인**: 네이비/화이트 기반 신뢰감 있는 기업지원/민원센터 톤, 모바일 우선

---

## 🗂 파일 구조

```
/
├── index.html          # 메인 홈페이지
├── about.html          # 행정사 소개
├── services.html       # 서비스 안내 (6개 카테고리)
├── apply.html          # 민원대행 신청 (4단계 스텝폼)
├── process.html        # 업무 진행 절차
├── faq.html            # 자주 묻는 질문
├── notice.html         # 공지사항 · 자료실
├── contact.html        # 문의하기
├── admin.html          # 관리자 페이지
├── gas-setup.html      # Google Apps Script 이메일 알림 설정 가이드
├── css/
│   └── style.css       # 메인 스타일시트 (모바일 퍼스트)
└── js/
    └── common.js       # 공통 JS (API, 헤더, 유틸)
```

---

## ✅ 구현된 기능

### 🏠 메인 페이지 (index.html)
- 히어로 섹션 (CTA 버튼 2개)
- 6개 서비스 카테고리 카드 (클릭 시 신청 페이지 이동)
- 대상 업종 안내 (9개 업종)
- 5단계 업무 진행 절차
- 행정사 신뢰 정보 (프로필, 연락처)
- FAQ 미리보기 (최신 4개)
- 공지사항 미리보기 (최신 3개)
- 플로팅 신청하기/전화 버튼

### 📋 서비스 안내 (services.html)
- 6개 카테고리 상세 소개
  1. 인허가·등록·변경신고
  2. 조달·입찰·공공기관 서류
  3. 기업인증·기술행정
  4. 계약서·내용증명·사실확인
  5. 행정처분 대응·행정심판
  6. 출입국·비자·해외문서
- 각 카테고리별: 업무 개요, 대상 고객, 대행 범위, 준비서류 예시, 소요기간
- 사이드바에 신청 버튼 고정 (데스크탑)
- 스크롤 스파이 네비게이션

### 📝 민원대행 신청 (apply.html)
- **4단계 스텝폼 구현**:
  1. 카테고리 선택 (6개 카테고리 카드)
  2. 신청서 작성 (필수/선택 항목)
  3. 파일 첨부 (드래그&드롭, 확장자 제한)
  4. 개인정보 동의 + 입력 내용 확인
  5. 접수 완료 (접수번호 발급)
- URL 파라미터로 카테고리 자동 선택 (`?category=license`)
- 카테고리별 세부 업무 동적 변경
- 자동 접수번호 생성 (APP-YYMMDD-XXXX)
- API를 통한 실제 데이터 저장
- **Google Apps Script 이메일 자동 알림** (신청 접수 시 cirrus01@naver.com 발송)

### 👤 행정사 소개 (about.html)
- 대표 행정사 프로필
- 경력 및 자격 정보
- 핵심 가치 (신속·정확·소통)
- 처리 실적 통계

### ⚙️ 진행절차 (process.html)
- 5단계 상세 프로세스 설명
- 처리 상태값 안내 (8가지 상태)

### ❓ FAQ (faq.html)
- 카테고리 탭 필터 (전체/접수문의/비용/서류/진행/업무범위)
- API 연동 (동적 렌더링)
- 아코디언 UI

### 📢 공지사항 (notice.html)
- 공지/자료실 탭 필터
- 제목 검색
- 페이지네이션 (8건씩)
- 상세 보기 모달
- 조회수 자동 증가

### 📞 문의하기 (contact.html)
- 온라인 문의 폼 (API 저장)
- 연락처 정보
- 오시는 길 (지도 placeholder)

### 🔧 관리자 페이지 (admin.html)
- 로그인 (admin / 1234)
- **대시보드**: 통계 카드, 최근 접수 10건, 카테고리별 현황
- **전체 접수 목록**: 검색, 상태·카테고리 필터, 페이지네이션
- **검토 대기**: 접수완료·검토중 상태 목록
- **진행 중**: 상담진행·수임확정·진행중 목록
- **완료**: 완료·종결 목록
- **접수 상세**: 전체 정보 확인, 상태 변경, 관리자 메모 저장
- **공지사항 관리**: CRUD
- **FAQ 관리**: CRUD

---

## 🛣 주요 URL (페이지)

| 경로 | 설명 |
|------|------|
| `/index.html` | 메인 홈페이지 |
| `/about.html` | 행정사 소개 |
| `/services.html` | 서비스 안내 |
| `/apply.html` | 민원대행 신청 |
| `/apply.html?category=license` | 인허가 신청 직접 이동 |
| `/apply.html?category=procurement` | 조달·입찰 신청 |
| `/apply.html?category=certification` | 기업인증 신청 |
| `/apply.html?category=document` | 계약·내용증명 신청 |
| `/apply.html?category=appeal` | 행정처분 대응 신청 |
| `/apply.html?category=immigration` | 출입국·비자 신청 |
| `/process.html` | 진행절차 |
| `/faq.html` | FAQ |
| `/notice.html` | 공지사항 |
| `/contact.html` | 문의하기 |
| `/admin.html` | 관리자 (admin/1234) |
| `/gas-setup.html` | GAS 이메일 알림 설정 가이드 |

---

## 🗄 데이터 모델

### applications (민원대행 신청)
| 필드 | 타입 | 설명 |
|------|------|------|
| id | text | 고유 ID |
| app_number | text | 접수번호 (APP-YYMMDD-XXXX) |
| applicant_type | text | 개인/개인사업자/법인 |
| company_name | text | 회사명 또는 성명 |
| manager_name | text | 담당자명 |
| phone | text | 연락처 |
| email | text | 이메일 |
| business_type | text | 업종 |
| category | text | 신청 카테고리 |
| sub_service | text | 세부 업무명 |
| content | rich_text | 의뢰 내용 |
| current_status | text | 현재 상황 |
| reply_method | text | 희망 회신 방법 |
| is_urgent | bool | 긴급 여부 |
| deadline | text | 마감기한 |
| status | text | 처리 상태 (접수완료~종결) |
| admin_memo | rich_text | 관리자 메모 |
| privacy_agreed | bool | 개인정보 동의 |

### notices (공지사항)
| 필드 | 타입 | 설명 |
|------|------|------|
| title | text | 제목 |
| content | rich_text | 내용 |
| type | text | 공지/자료실 |
| author | text | 작성자 |
| post_date | text | 게시 날짜 |
| views | number | 조회수 |
| file_name | text | 첨부파일명 |

### faqs (자주 묻는 질문)
| 필드 | 타입 | 설명 |
|------|------|------|
| question | text | 질문 |
| answer | rich_text | 답변 |
| category | text | 카테고리 |
| sort_order | number | 정렬 순서 |

---

## 🎨 디자인 시스템

- **Primary**: `#1a3a5c` (네이비)
- **Accent**: `#e85d2a` (오렌지-레드)
- **폰트**: Noto Sans KR
- **반응형**: 모바일 우선 (480px / 640px / 900px / 1024px breakpoints)

---

## 🚧 미구현 (2단계 권장)

- [ ] 업종별 전용 랜딩페이지
- [ ] 접수현황 고객 조회 시스템
- [ ] 로그인 기반 마이페이지
- [x] **이메일 자동 알림** (Google Apps Script 웹훅 방식 구현, gas-setup.html 참조)
- [ ] 결제 기능 연동
- [ ] 카카오 채널 상담 연동
- [ ] 보완 서류 제출 전용 페이지
- [ ] CRM 연동
- [ ] 네이버 지도 연동
- [ ] 블로그/칼럼 섹션

---

## 📌 수정 필요 항목 (실제 운영 시)

1. **사무소 정보**: 전화번호, 이메일, 주소, 행정사 이름 및 등록번호 실제 값으로 교체
2. **관리자 계정**: admin.html의 비밀번호를 실제 강력한 비밀번호로 변경
3. **지도**: 실제 네이버 지도 또는 카카오 지도 API 연동
4. **개인정보처리방침**: 실제 법률 문서로 교체
5. **SEO**: meta description, og tags 실제 내용으로 보강

---

## 📧 이메일 자동 알림 시스템

신청서 접수 시 `cirrus01@naver.com`으로 자동 이메일이 발송됩니다.

### 동작 원리
```
사용자 신청 → apply.html → GAS 웹훅(POST) → Gmail 발송 → cirrus01@naver.com 수신
```

### 설정 방법
1. `gas-setup.html` 페이지를 열어 안내 순서에 따라 설정합니다.
2. GAS 코드를 복사해 Google Apps Script에 붙여넣고 웹 앱으로 배포합니다.
3. 생성된 URL을 `apply.html`의 `GAS_WEBHOOK_URL_HARDCODED` 상수에 입력합니다.

### 이메일 포함 정보
- 접수번호, 접수일시, 긴급 여부
- 서비스 분류/세부 서비스
- 신청인 정보 (회사명, 담당자, 연락처, 이메일)
- 신청 내용, 처리기한, 회신 방법
- 긴급 건은 제목에 🚨 [긴급] 태그 자동 부착

---

*최종 업데이트: 2025-04-23*
