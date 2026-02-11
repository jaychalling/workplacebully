import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const requirements = [
  {
    number: "1",
    title: "지위 또는 관계의 우위",
    description: "직장에서의 지위 또는 관계 등의 우위를 이용하여",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-1.997M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "업무상 적정범위 초과",
    description: "업무상 적정범위를 넘는 행위로",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "신체적 / 정신적 고통",
    description: "신체적, 정신적 고통을 주거나 근무환경을 악화시키는 행위",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              근로기준법 제76조의2 기반 분석
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
              직장내 괴롭힘,
              <br />
              <span className="text-primary">나도 해당될까?</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              겪고 있는 상황을 입력하면 근로기준법 제76조의2의 3가지 요건을 분석하고,
              신뢰도 점수와 함께 구체적인 대응 방법을 안내합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/analyze">
                <Button size="lg" className="text-base px-8 w-full sm:w-auto">
                  내 상황 판단하기
                </Button>
              </Link>
              <Link href="/guide">
                <Button variant="outline" size="lg" className="text-base px-8 w-full sm:w-auto">
                  대응 가이드 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Requirements Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">직장내 괴롭힘 판단 3요건</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            근로기준법 제76조의2에 따르면, 아래 3가지 요건이 모두 충족되어야 직장내 괴롭힘으로 인정됩니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {requirements.map((req) => (
            <Card key={req.number} className="relative overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    {req.icon}
                  </div>
                  <span className="text-xs font-bold text-primary/60 uppercase tracking-wider">
                    요건 {req.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{req.title}</h3>
                <p className="text-sm text-muted-foreground">{req.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">이용 방법</h2>
            <p className="text-muted-foreground">간단한 3단계로 상황을 판단할 수 있습니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "상황 입력", desc: "겪고 있는 상황을 자유롭게 텍스트로 입력하세요." },
              { step: "2", title: "추가 정보", desc: "가해자 관계, 빈도, 기간 등 후속 질문에 답변하세요." },
              { step: "3", title: "결과 확인", desc: "3요건 분석 결과와 대응 방법을 확인하세요." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          {[
            { value: "20+", label: "참고 판례" },
            { value: "3요건", label: "법적 기준 분석" },
            { value: "100%", label: "무료 서비스" },
            { value: "24/7", label: "언제든 이용" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">혼자 고민하지 마세요</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            직장에서 불편한 상황을 겪고 있다면, 먼저 객관적으로 판단해보세요. 당신의 권리를 지키는 첫 걸음입니다.
          </p>
          <Link href="/analyze">
            <Button size="lg" variant="secondary" className="text-base px-8">
              지금 바로 판단하기
            </Button>
          </Link>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            본 서비스는 참고용 정보 제공을 목적으로 하며, 법률 자문을 대체하지 않습니다.
            정확한 법적 판단이 필요한 경우 변호사 또는 관련 기관에 상담하시기 바랍니다.
            입력된 내용은 분석 목적으로만 사용되며, 개인정보는 자동으로 마스킹 처리됩니다.
          </p>
        </div>
      </section>
    </>
  );
}
