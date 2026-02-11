// 키워드 사전: 직장내 괴롭힘 3요건 판단용

export interface KeywordPattern {
  keyword: string;
  weight: number; // 1-10, 매칭 시 가중치
  category?: string;
}

// 요건 1: 지위·관계 우위 이용
export const statusAdvantageKeywords: KeywordPattern[] = [
  // 직급 관련
  { keyword: "상사", weight: 8, category: "직급" },
  { keyword: "팀장", weight: 8, category: "직급" },
  { keyword: "부장", weight: 8, category: "직급" },
  { keyword: "과장", weight: 7, category: "직급" },
  { keyword: "차장", weight: 7, category: "직급" },
  { keyword: "대리", weight: 5, category: "직급" },
  { keyword: "사장", weight: 9, category: "직급" },
  { keyword: "이사", weight: 9, category: "직급" },
  { keyword: "본부장", weight: 9, category: "직급" },
  { keyword: "실장", weight: 8, category: "직급" },
  { keyword: "센터장", weight: 8, category: "직급" },
  { keyword: "지점장", weight: 8, category: "직급" },
  { keyword: "선임", weight: 6, category: "직급" },
  { keyword: "임원", weight: 9, category: "직급" },
  { keyword: "경영진", weight: 9, category: "직급" },
  { keyword: "직속상관", weight: 8, category: "직급" },
  { keyword: "윗사람", weight: 7, category: "직급" },

  // 관계적 우위
  { keyword: "다수", weight: 7, category: "관계우위" },
  { keyword: "여러 명", weight: 7, category: "관계우위" },
  { keyword: "단체로", weight: 8, category: "관계우위" },
  { keyword: "집단", weight: 8, category: "관계우위" },
  { keyword: "조직적", weight: 8, category: "관계우위" },
  { keyword: "파벌", weight: 7, category: "관계우위" },
  { keyword: "뭉쳐서", weight: 7, category: "관계우위" },

  // 고용 형태 우위
  { keyword: "계약직", weight: 6, category: "고용형태" },
  { keyword: "비정규직", weight: 6, category: "고용형태" },
  { keyword: "정규직", weight: 5, category: "고용형태" },
  { keyword: "파견직", weight: 6, category: "고용형태" },
  { keyword: "인턴", weight: 6, category: "고용형태" },
  { keyword: "수습", weight: 5, category: "고용형태" },
  { keyword: "신입", weight: 5, category: "고용형태" },

  // 우위 이용 표현
  { keyword: "지위를 이용", weight: 9, category: "우위이용" },
  { keyword: "직급을 이용", weight: 9, category: "우위이용" },
  { keyword: "권한을 남용", weight: 9, category: "우위이용" },
  { keyword: "인사권", weight: 8, category: "우위이용" },
  { keyword: "평가권", weight: 8, category: "우위이용" },
  { keyword: "보복", weight: 8, category: "우위이용" },
  { keyword: "불이익", weight: 7, category: "우위이용" },
];

// 요건 2: 업무상 적정범위 초과
export const workScopeKeywords: KeywordPattern[] = [
  // 폭언/모욕
  { keyword: "폭언", weight: 9, category: "언어폭력" },
  { keyword: "욕설", weight: 9, category: "언어폭력" },
  { keyword: "모욕", weight: 9, category: "언어폭력" },
  { keyword: "인격모독", weight: 10, category: "언어폭력" },
  { keyword: "인격", weight: 6, category: "언어폭력" },
  { keyword: "비하", weight: 8, category: "언어폭력" },
  { keyword: "무시", weight: 6, category: "언어폭력" },
  { keyword: "조롱", weight: 8, category: "언어폭력" },
  { keyword: "비꼬", weight: 7, category: "언어폭력" },
  { keyword: "소리를 지르", weight: 8, category: "언어폭력" },
  { keyword: "소리지르", weight: 8, category: "언어폭력" },
  { keyword: "고함", weight: 8, category: "언어폭력" },
  { keyword: "막말", weight: 9, category: "언어폭력" },
  { keyword: "험담", weight: 7, category: "언어폭력" },
  { keyword: "악담", weight: 8, category: "언어폭력" },

  // 따돌림/배제
  { keyword: "따돌림", weight: 9, category: "따돌림" },
  { keyword: "왕따", weight: 9, category: "따돌림" },
  { keyword: "무시", weight: 6, category: "따돌림" },
  { keyword: "배제", weight: 8, category: "따돌림" },
  { keyword: "소외", weight: 7, category: "따돌림" },
  { keyword: "대화를 안", weight: 7, category: "따돌림" },
  { keyword: "말을 안", weight: 6, category: "따돌림" },
  { keyword: "끼워주지 않", weight: 7, category: "따돌림" },
  { keyword: "회식에서 제외", weight: 7, category: "따돌림" },
  { keyword: "회의에서 제외", weight: 8, category: "따돌림" },
  { keyword: "정보 차단", weight: 8, category: "따돌림" },

  // 부당한 업무 지시
  { keyword: "사적 용무", weight: 9, category: "부당업무" },
  { keyword: "개인 심부름", weight: 9, category: "부당업무" },
  { keyword: "업무 외", weight: 7, category: "부당업무" },
  { keyword: "과도한 업무", weight: 8, category: "부당업무" },
  { keyword: "업무 과중", weight: 7, category: "부당업무" },
  { keyword: "업무 배제", weight: 9, category: "부당업무" },
  { keyword: "일을 안 줌", weight: 8, category: "부당업무" },
  { keyword: "허드렛일", weight: 7, category: "부당업무" },
  { keyword: "부당한 지시", weight: 9, category: "부당업무" },
  { keyword: "불합리한", weight: 7, category: "부당업무" },
  { keyword: "능력 밖", weight: 6, category: "부당업무" },
  { keyword: "야근 강요", weight: 8, category: "부당업무" },
  { keyword: "휴가 불허", weight: 8, category: "부당업무" },
  { keyword: "연차 반려", weight: 8, category: "부당업무" },

  // 신체적 폭력
  { keyword: "폭행", weight: 10, category: "신체폭력" },
  { keyword: "때리", weight: 10, category: "신체폭력" },
  { keyword: "맞았", weight: 10, category: "신체폭력" },
  { keyword: "물건을 던지", weight: 9, category: "신체폭력" },
  { keyword: "밀치", weight: 9, category: "신체폭력" },
  { keyword: "위협", weight: 8, category: "신체폭력" },
  { keyword: "협박", weight: 9, category: "신체폭력" },

  // 사생활 침해
  { keyword: "사생활", weight: 8, category: "사생활침해" },
  { keyword: "감시", weight: 8, category: "사생활침해" },
  { keyword: "사적인 질문", weight: 7, category: "사생활침해" },
  { keyword: "외모 지적", weight: 8, category: "사생활침해" },
  { keyword: "성적 발언", weight: 10, category: "사생활침해" },
  { keyword: "성희롱", weight: 10, category: "사생활침해" },

  // 부당 인사
  { keyword: "부당 전보", weight: 9, category: "부당인사" },
  { keyword: "부당 배치", weight: 9, category: "부당인사" },
  { keyword: "좌천", weight: 9, category: "부당인사" },
  { keyword: "퇴사 강요", weight: 10, category: "부당인사" },
  { keyword: "사직서", weight: 8, category: "부당인사" },
  { keyword: "권고사직", weight: 8, category: "부당인사" },
];

// 요건 3: 신체적·정신적 고통
export const sufferingKeywords: KeywordPattern[] = [
  // 정신적 고통
  { keyword: "스트레스", weight: 6, category: "정신적고통" },
  { keyword: "우울", weight: 8, category: "정신적고통" },
  { keyword: "우울증", weight: 9, category: "정신적고통" },
  { keyword: "불안", weight: 7, category: "정신적고통" },
  { keyword: "불안장애", weight: 9, category: "정신적고통" },
  { keyword: "공황", weight: 9, category: "정신적고통" },
  { keyword: "공황장애", weight: 10, category: "정신적고통" },
  { keyword: "트라우마", weight: 9, category: "정신적고통" },
  { keyword: "PTSD", weight: 10, category: "정신적고통" },
  { keyword: "자살", weight: 10, category: "정신적고통" },
  { keyword: "극단적 선택", weight: 10, category: "정신적고통" },
  { keyword: "자해", weight: 10, category: "정신적고통" },
  { keyword: "두려움", weight: 7, category: "정신적고통" },
  { keyword: "무기력", weight: 7, category: "정신적고통" },
  { keyword: "무력감", weight: 7, category: "정신적고통" },
  { keyword: "수치심", weight: 8, category: "정신적고통" },
  { keyword: "분노", weight: 6, category: "정신적고통" },
  { keyword: "눈물", weight: 6, category: "정신적고통" },
  { keyword: "울었", weight: 6, category: "정신적고통" },
  { keyword: "울음", weight: 6, category: "정신적고통" },

  // 신체적 고통
  { keyword: "수면장애", weight: 8, category: "신체적고통" },
  { keyword: "잠을 못", weight: 7, category: "신체적고통" },
  { keyword: "불면", weight: 8, category: "신체적고통" },
  { keyword: "두통", weight: 6, category: "신체적고통" },
  { keyword: "소화불량", weight: 5, category: "신체적고통" },
  { keyword: "구토", weight: 7, category: "신체적고통" },
  { keyword: "체중 감소", weight: 7, category: "신체적고통" },
  { keyword: "탈모", weight: 6, category: "신체적고통" },
  { keyword: "병원", weight: 5, category: "신체적고통" },
  { keyword: "진단", weight: 6, category: "신체적고통" },
  { keyword: "약을 먹", weight: 7, category: "신체적고통" },
  { keyword: "치료", weight: 6, category: "신체적고통" },
  { keyword: "입원", weight: 8, category: "신체적고통" },

  // 직장 생활 영향
  { keyword: "퇴사 고민", weight: 7, category: "직장영향" },
  { keyword: "퇴사하고 싶", weight: 7, category: "직장영향" },
  { keyword: "출근이 두렵", weight: 8, category: "직장영향" },
  { keyword: "출근 공포", weight: 9, category: "직장영향" },
  { keyword: "출근하기 싫", weight: 6, category: "직장영향" },
  { keyword: "회사 가기 싫", weight: 6, category: "직장영향" },
  { keyword: "근무환경", weight: 5, category: "직장영향" },
  { keyword: "업무 능력 저하", weight: 6, category: "직장영향" },
  { keyword: "집중이 안", weight: 5, category: "직장영향" },
  { keyword: "실수가 늘", weight: 5, category: "직장영향" },

  // 일상 영향
  { keyword: "일상생활", weight: 6, category: "일상영향" },
  { keyword: "대인기피", weight: 8, category: "일상영향" },
  { keyword: "사람이 무서", weight: 8, category: "일상영향" },
  { keyword: "가족에게", weight: 5, category: "일상영향" },
  { keyword: "관계 악화", weight: 6, category: "일상영향" },
];

// 빈도 관련 키워드 (가중치 증가용)
export const frequencyKeywords: KeywordPattern[] = [
  { keyword: "매일", weight: 9, category: "빈도" },
  { keyword: "매번", weight: 8, category: "빈도" },
  { keyword: "항상", weight: 8, category: "빈도" },
  { keyword: "반복적", weight: 9, category: "빈도" },
  { keyword: "지속적", weight: 9, category: "빈도" },
  { keyword: "계속", weight: 7, category: "빈도" },
  { keyword: "자주", weight: 7, category: "빈도" },
  { keyword: "수시로", weight: 8, category: "빈도" },
  { keyword: "상습적", weight: 9, category: "빈도" },
  { keyword: "몇 달", weight: 7, category: "빈도" },
  { keyword: "몇 년", weight: 9, category: "빈도" },
  { keyword: "오랫동안", weight: 8, category: "빈도" },
];

// 기간 관련 키워드
export const durationKeywords: KeywordPattern[] = [
  { keyword: "1개월", weight: 4, category: "기간" },
  { keyword: "2개월", weight: 5, category: "기간" },
  { keyword: "3개월", weight: 6, category: "기간" },
  { keyword: "6개월", weight: 7, category: "기간" },
  { keyword: "1년", weight: 8, category: "기간" },
  { keyword: "2년", weight: 9, category: "기간" },
  { keyword: "3년", weight: 10, category: "기간" },
  { keyword: "오래", weight: 6, category: "기간" },
  { keyword: "처음부터", weight: 7, category: "기간" },
  { keyword: "입사 때부터", weight: 8, category: "기간" },
];
