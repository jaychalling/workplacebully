export interface GuideStep {
  step: number;
  title: string;
  description: string;
  details: string[];
  important?: string;
}

export interface ContactInfo {
  name: string;
  description: string;
  phone?: string;
  website?: string;
  note?: string;
}

export const guideSteps: GuideStep[] = [
  {
    step: 1,
    title: "상황 인식 및 기록",
    description: "괴롭힘이 의심되면 가장 먼저 구체적인 상황을 기록하세요.",
    details: [
      "일시, 장소, 가해자, 행위 내용을 구체적으로 기록",
      "목격자가 있다면 누구인지 함께 메모",
      "육하원칙(누가, 언제, 어디서, 무엇을, 어떻게, 왜)에 따라 작성",
      "감정적 표현보다 사실 위주로 기록",
      "날짜별로 체계적으로 정리 (엑셀이나 노트 앱 활용)",
    ],
    important: "기록은 나중에 가장 중요한 증거가 됩니다. 사소한 것도 빠짐없이 기록하세요.",
  },
  {
    step: 2,
    title: "증거 수집",
    description: "객관적인 증거를 체계적으로 수집하세요.",
    details: [
      "카카오톡, 문자, 이메일 등 메시지 캡처 및 백업",
      "녹음 (근로기준법상 당사자 녹음은 합법)",
      "CCTV 영상이 있다면 보존 요청",
      "목격자 진술서 확보 (서면으로 받으면 더 좋음)",
      "진단서, 처방전 등 의료 기록 확보",
      "업무 지시서, 인사평가서 등 관련 문서 보관",
      "SNS 게시물, 사내 게시판 글 등 캡처",
    ],
    important: "증거는 원본을 보관하고, 반드시 별도 백업을 해두세요. 회사 시스템에만 저장하면 삭제될 수 있습니다.",
  },
  {
    step: 3,
    title: "내부 신고",
    description: "회사 내 고충처리 채널을 통해 신고할 수 있습니다.",
    details: [
      "회사 고충처리위원회에 서면으로 신고",
      "인사팀 또는 감사팀에 직접 신고",
      "노동조합이 있다면 노조를 통한 신고도 가능",
      "신고 시 증거 자료를 함께 제출",
      "신고 접수증이나 확인서를 반드시 받아둘 것",
      "근로기준법 제76조의3에 따라 회사는 조사 의무가 있음",
    ],
    important: "회사는 신고 접수 후 지체 없이 조사해야 하며, 신고자에게 불이익을 줄 수 없습니다 (위반 시 3년 이하 징역 또는 3천만원 이하 벌금).",
  },
  {
    step: 4,
    title: "외부 신고 및 상담",
    description: "내부 해결이 어려운 경우 외부 기관에 도움을 요청하세요.",
    details: [
      "고용노동부 신고 (국번없이 1350)",
      "국가인권위원회 진정 (국번없이 1331)",
      "직장내 괴롭힘 상담센터 (1522-9000)",
      "대한법률구조공단 무료 법률 상담 (132)",
      "각 지역 노동청에 직접 방문 신고 가능",
      "온라인: 고용노동부 민원마당 (minwon.moel.go.kr)",
    ],
    important: "외부 신고 시에도 증거 자료가 핵심입니다. 미리 준비해서 가세요.",
  },
  {
    step: 5,
    title: "법적 대응",
    description: "심각한 경우 법적 대응을 고려할 수 있습니다.",
    details: [
      "민사소송: 손해배상 청구 (정신적 피해 위자료 포함)",
      "형사고소: 폭행, 협박, 모욕죄 등 해당 시",
      "근로기준법 위반 신고: 회사의 조사 의무 위반 등",
      "산재 신청: 괴롭힘으로 인한 질병 발생 시",
      "노동위원회: 부당해고, 부당 인사조치 시 구제신청",
      "변호사 상담 권장 (초기 상담 무료인 곳 많음)",
    ],
    important: "법적 대응은 전문가와 상담 후 진행하는 것이 좋습니다. 시효가 있으므로 너무 늦지 않게 행동하세요.",
  },
  {
    step: 6,
    title: "자기 보호 및 회복",
    description: "괴롭힘 상황에서 자신을 보호하고 회복하는 것이 가장 중요합니다.",
    details: [
      "전문 상담사 또는 정신건강의학과 방문",
      "근로복지공단 근로자 심리상담 서비스 이용 (무료)",
      "스트레스 관리 및 자기 케어",
      "신뢰할 수 있는 주변인에게 상황 공유",
      "직장내 괴롭힘 피해자 커뮤니티 참여",
      "필요시 휴직 또는 병가 활용",
      "자책하지 말 것 — 괴롭힘은 피해자의 잘못이 아닙니다",
    ],
    important: "당신은 혼자가 아닙니다. 도움을 요청하는 것은 약한 것이 아니라 용기 있는 행동입니다.",
  },
];

export const contactInfos: ContactInfo[] = [
  {
    name: "고용노동부",
    description: "직장내 괴롭힘 신고 및 상담",
    phone: "1350",
    website: "https://www.moel.go.kr",
    note: "평일 09:00-18:00",
  },
  {
    name: "국가인권위원회",
    description: "인권침해 진정",
    phone: "1331",
    website: "https://www.humanrights.go.kr",
    note: "평일 09:00-18:00",
  },
  {
    name: "직장내 괴롭힘 상담센터",
    description: "전문 상담 및 법률 지원",
    phone: "1522-9000",
    note: "평일 09:00-18:00",
  },
  {
    name: "대한법률구조공단",
    description: "무료 법률 상담",
    phone: "132",
    website: "https://www.klac.or.kr",
    note: "평일 09:00-18:00",
  },
  {
    name: "근로복지공단",
    description: "산재 신청, 근로자 심리상담",
    phone: "1588-0075",
    website: "https://www.comwel.or.kr",
  },
  {
    name: "정신건강위기상담전화",
    description: "정신건강 위기 시 24시간 상담",
    phone: "1577-0199",
    note: "24시간 운영",
  },
];

export const evidenceChecklist = [
  { id: "messages", label: "카카오톡/문자/이메일 캡처", category: "디지털" },
  { id: "recording", label: "녹음 파일", category: "디지털" },
  { id: "cctv", label: "CCTV 영상 보존 요청", category: "디지털" },
  { id: "witness", label: "목격자 진술서", category: "인적" },
  { id: "diary", label: "피해 상황 기록 일지", category: "기록" },
  { id: "medical", label: "진단서/처방전", category: "의료" },
  { id: "work_order", label: "업무 지시서/메일", category: "업무" },
  { id: "evaluation", label: "인사평가 결과", category: "업무" },
  { id: "sns", label: "SNS/사내 게시판 캡처", category: "디지털" },
  { id: "photo", label: "관련 사진", category: "디지털" },
];
