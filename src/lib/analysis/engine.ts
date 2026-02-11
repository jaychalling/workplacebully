import {
  statusAdvantageKeywords,
  workScopeKeywords,
  sufferingKeywords,
  frequencyKeywords,
  durationKeywords,
  type KeywordPattern,
} from "./keywords";
import { maskPersonalInfo } from "./masking";

export interface AnalysisInput {
  text: string;
  perpetratorRelation?: string; // 가해자 관계 (상사, 동료, 부하직원)
  frequency?: string; // 빈도 (매일, 주1-2회, 월1-2회, 가끔)
  duration?: string; // 기간 (1개월 미만, 1-3개월, 3-6개월, 6개월-1년, 1년 이상)
}

export interface MatchedKeyword {
  keyword: string;
  weight: number;
  category: string;
}

export interface RequirementResult {
  score: number; // 0-100
  matchedKeywords: MatchedKeyword[];
  description: string;
}

export interface AnalysisResult {
  maskedText: string;
  requirement1: RequirementResult; // 지위·관계 우위 이용
  requirement2: RequirementResult; // 업무상 적정범위 초과
  requirement3: RequirementResult; // 신체적·정신적 고통
  totalScore: number; // 0-100
  confidence: number; // 0-100
  verdict: "해당" | "미해당" | "판단불가";
  recommendations: string[];
  relatedCaseIds: string[];
}

function matchKeywords(text: string, patterns: KeywordPattern[]): MatchedKeyword[] {
  const matched: MatchedKeyword[] = [];
  const seen = new Set<string>();

  for (const pattern of patterns) {
    if (text.includes(pattern.keyword) && !seen.has(pattern.keyword)) {
      seen.add(pattern.keyword);
      matched.push({
        keyword: pattern.keyword,
        weight: pattern.weight,
        category: pattern.category ?? "기타",
      });
    }
  }

  return matched;
}

function calculateScore(matched: MatchedKeyword[], maxScore: number = 100): number {
  if (matched.length === 0) return 0;

  const totalWeight = matched.reduce((sum, m) => sum + m.weight, 0);
  const uniqueCategories = new Set(matched.map((m) => m.category)).size;

  // 기본 점수: 가중치 합산 (최대 60점)
  const weightScore = Math.min(60, totalWeight * 2);

  // 다양성 보너스: 여러 카테고리에서 매칭될수록 높은 점수 (최대 25점)
  const diversityScore = Math.min(25, uniqueCategories * 8);

  // 매칭 수 보너스: 많이 매칭될수록 (최대 15점)
  const countScore = Math.min(15, matched.length * 3);

  return Math.min(maxScore, weightScore + diversityScore + countScore);
}

function getFrequencyMultiplier(frequency?: string): number {
  switch (frequency) {
    case "매일": return 1.3;
    case "주1-2회": return 1.15;
    case "월1-2회": return 1.05;
    case "가끔": return 1.0;
    default: return 1.0;
  }
}

function getDurationMultiplier(duration?: string): number {
  switch (duration) {
    case "1년 이상": return 1.3;
    case "6개월-1년": return 1.2;
    case "3-6개월": return 1.1;
    case "1-3개월": return 1.05;
    case "1개월 미만": return 1.0;
    default: return 1.0;
  }
}

function getRelationBonus(relation?: string): number {
  switch (relation) {
    case "상사": return 15;
    case "임원": return 20;
    case "동료(다수)": return 12;
    case "동료": return 5;
    case "부하직원": return 3;
    default: return 0;
  }
}

function getRecommendations(result: {
  score1: number;
  score2: number;
  score3: number;
  totalScore: number;
}): string[] {
  const recs: string[] = [];

  if (result.totalScore >= 70) {
    recs.push("직장내 괴롭힘에 해당할 가능성이 높습니다. 전문가 상담을 권장합니다.");
    recs.push("증거를 체계적으로 수집하세요 (녹음, 문자, 메일, 목격자 진술 등).");
    recs.push("회사 내 고충처리위원회에 신고를 고려하세요.");
    recs.push("고용노동부 (국번없이 1350) 또는 국가인권위원회에 상담/진정이 가능합니다.");
  } else if (result.totalScore >= 40) {
    recs.push("괴롭힘의 일부 요소가 확인됩니다. 상황을 주의깊게 기록해두세요.");
    recs.push("관련 증거 (대화 기록, 이메일, 메신저 등)를 보관하세요.");
    recs.push("무료 법률 상담을 통해 전문가 의견을 들어보시길 권장합니다.");
    recs.push("직장내 괴롭힘 상담센터 (1522-9000)에 문의해보세요.");
  } else {
    recs.push("현재 입력된 정보로는 괴롭힘 해당 여부를 판단하기 어렵습니다.");
    recs.push("더 구체적인 상황을 기록하시면 정확도가 높아집니다.");
    recs.push("불편한 상황이 지속된다면 증거를 수집하고 전문 상담을 받아보세요.");
  }

  if (result.score3 >= 60) {
    recs.push("정신적/신체적 고통이 심한 것으로 보입니다. 전문의 상담을 받아보세요.");
  }

  return recs;
}

export function analyzeText(input: AnalysisInput): AnalysisResult {
  const { text, perpetratorRelation, frequency, duration } = input;
  const maskedText = maskPersonalInfo(text);

  // 요건 1: 지위·관계 우위 이용
  const statusMatched = matchKeywords(text, statusAdvantageKeywords);
  let score1 = calculateScore(statusMatched);
  score1 = Math.min(100, score1 + getRelationBonus(perpetratorRelation));

  // 요건 2: 업무상 적정범위 초과
  const workMatched = matchKeywords(text, workScopeKeywords);
  let score2 = calculateScore(workMatched);

  // 빈도/기간에 따른 보정
  const freqMultiplier = getFrequencyMultiplier(frequency);
  const durMultiplier = getDurationMultiplier(duration);
  score2 = Math.min(100, Math.round(score2 * freqMultiplier * durMultiplier));

  // 텍스트 내 빈도 키워드 추가 체크
  const freqMatched = matchKeywords(text, frequencyKeywords);
  if (freqMatched.length > 0) {
    score2 = Math.min(100, score2 + freqMatched.length * 3);
  }

  // 기간 키워드 추가 체크
  const durMatched = matchKeywords(text, durationKeywords);
  if (durMatched.length > 0) {
    score2 = Math.min(100, score2 + durMatched.length * 3);
  }

  // 요건 3: 신체적·정신적 고통
  const sufferingMatched = matchKeywords(text, sufferingKeywords);
  const score3 = calculateScore(sufferingMatched);

  // 종합 점수 (가중 평균 — 요건2에 약간 더 가중)
  const totalScore = Math.round(score1 * 0.3 + score2 * 0.4 + score3 * 0.3);

  // 신뢰도 계산 (매칭된 전체 패턴 수 기반)
  const totalMatched = statusMatched.length + workMatched.length + sufferingMatched.length + freqMatched.length + durMatched.length;
  const totalCategories = new Set([
    ...statusMatched.map((m) => m.category),
    ...workMatched.map((m) => m.category),
    ...sufferingMatched.map((m) => m.category),
  ]).size;

  let confidence: number;
  if (totalMatched >= 15 && totalCategories >= 5) {
    confidence = Math.min(95, 60 + totalMatched * 2 + totalCategories * 3);
  } else if (totalMatched >= 8 && totalCategories >= 3) {
    confidence = Math.min(80, 40 + totalMatched * 2 + totalCategories * 3);
  } else if (totalMatched >= 3) {
    confidence = Math.min(60, 20 + totalMatched * 4);
  } else {
    confidence = Math.max(10, totalMatched * 8);
  }

  // 텍스트 길이에 따른 신뢰도 보정
  if (text.length < 50) {
    confidence = Math.min(confidence, 30);
  } else if (text.length < 100) {
    confidence = Math.min(confidence, 50);
  }

  // 후속 질문 응답이 있으면 신뢰도 보너스
  if (perpetratorRelation) confidence = Math.min(95, confidence + 5);
  if (frequency) confidence = Math.min(95, confidence + 5);
  if (duration) confidence = Math.min(95, confidence + 5);

  // 판정
  let verdict: "해당" | "미해당" | "판단불가";
  if (confidence < 30) {
    verdict = "판단불가";
  } else if (totalScore >= 50 && score1 >= 30 && score2 >= 30) {
    verdict = "해당";
  } else if (totalScore < 30) {
    verdict = "미해당";
  } else {
    verdict = "판단불가";
  }

  const recommendations = getRecommendations({
    score1,
    score2,
    score3,
    totalScore,
  });

  return {
    maskedText,
    requirement1: {
      score: score1,
      matchedKeywords: statusMatched,
      description: "지위 또는 관계 등의 우위를 이용하였는가",
    },
    requirement2: {
      score: score2,
      matchedKeywords: workMatched,
      description: "업무상 적정범위를 넘었는가",
    },
    requirement3: {
      score: score3,
      matchedKeywords: sufferingMatched,
      description: "신체적·정신적 고통을 주거나 근무환경을 악화시켰는가",
    },
    totalScore,
    confidence,
    verdict,
    recommendations,
    relatedCaseIds: [],
  };
}
