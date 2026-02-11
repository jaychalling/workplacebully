import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "서비스 소개",
  description: "직장내 괴롭힘 판단기 서비스 소개 및 법적 고지",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">서비스 소개</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          직장내 괴롭힘 판단기는 근로기준법 제76조의2에 기반하여
          직장내 괴롭힘 여부를 자가 판단할 수 있도록 돕는 무료 서비스입니다.
        </p>
      </div>

      {/* Service Purpose */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>서비스 목적</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            2019년 7월 직장내 괴롭힘 금지법이 시행된 이후에도, 많은 직장인들이
            자신이 겪는 상황이 법적 의미의 &quot;직장내 괴롭힘&quot;에 해당하는지
            판단하기 어려워합니다.
          </p>
          <p className="text-sm leading-relaxed">
            본 서비스는 사용자가 입력한 상황을 근로기준법 제76조의2에서 규정한
            3가지 요건에 비추어 분석하고, 객관적인 참고 정보를 제공합니다.
            이를 통해 적절한 대응 시기를 놓치지 않도록 돕는 것이 목적입니다.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              자가 판단을 통한 초기 인식 지원
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              증거 수집 및 대응 방법 안내
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              관련 판례를 통한 기준 이해
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              상담/신고 기관 연결 안내
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Law Article */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>근로기준법 제76조의2 (직장 내 괴롭힘의 금지)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-4 text-sm leading-relaxed">
            <p className="font-medium mb-3">
              사용자 또는 근로자는 직장에서의 지위 또는 관계 등의 우위를 이용하여
              업무상 적정범위를 넘어 다른 근로자에게 신체적, 정신적 고통을 주거나
              근무환경을 악화시키는 행위(이하 &quot;직장 내 괴롭힘&quot;이라 한다)를
              하여서는 아니 된다.
            </p>
            <Separator className="my-3" />
            <div className="space-y-3 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">요건 1 - 지위/관계의 우위:</span>{" "}
                직급, 인사권, 다수의 관계 등을 이용한 것인지
              </p>
              <p>
                <span className="font-medium text-foreground">요건 2 - 업무상 적정범위 초과:</span>{" "}
                통상적인 업무 지시나 관리 범위를 넘어선 것인지
              </p>
              <p>
                <span className="font-medium text-foreground">요건 3 - 신체적/정신적 고통:</span>{" "}
                실제로 고통을 받았거나 근무환경이 악화되었는지
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How it works */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>분석 방법</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            본 서비스는 사용자가 입력한 텍스트에서 <span className="font-medium">키워드 매칭</span>과{" "}
            <span className="font-medium">패턴 분석</span>을 통해 3요건 각각의 해당 정도를 점수화합니다.
          </p>
          <ul className="space-y-2 list-disc list-inside text-muted-foreground">
            <li>200개 이상의 괴롭힘 관련 키워드 데이터베이스 활용</li>
            <li>카테고리별 가중치 적용 (직급, 언어폭력, 따돌림, 부당업무 등)</li>
            <li>빈도와 기간에 따른 보정</li>
            <li>20건의 참고 판례와 매칭</li>
            <li>개인정보 자동 마스킹 (이름, 전화번호, 회사명)</li>
          </ul>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>자주 묻는 질문</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            {
              q: "분석 결과가 법적 효력이 있나요?",
              a: "아닙니다. 본 서비스의 분석 결과는 참고용이며, 법적 효력이 없습니다. 정확한 법적 판단은 반드시 전문가(변호사, 노무사 등)의 상담을 받으시기 바랍니다.",
            },
            {
              q: "입력한 내용은 안전한가요?",
              a: "입력된 텍스트의 개인정보(이름, 전화번호, 회사명)는 자동으로 마스킹 처리됩니다. 다만, 민감한 정보는 입력하지 않는 것을 권장합니다.",
            },
            {
              q: "분석 점수가 높으면 반드시 괴롭힘인가요?",
              a: "높은 점수는 괴롭힘에 해당할 가능성이 높다는 것을 의미하지만, 실제 법적 판단은 구체적인 상황, 맥락, 증거 등을 종합적으로 고려해야 합니다.",
            },
            {
              q: "이 서비스는 무료인가요?",
              a: "네, 완전 무료 서비스입니다. 별도의 가입이나 결제 없이 이용할 수 있습니다.",
            },
            {
              q: "괴롭힘이 의심되면 어떻게 해야 하나요?",
              a: "증거를 수집하고, 대응 가이드를 참고하여 내부 또는 외부 신고를 고려하세요. 고용노동부(1350), 괴롭힘 상담센터(1522-9000)에서 전문 상담을 받을 수 있습니다.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h4 className="text-sm font-semibold mb-1">Q. {faq.q}</h4>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Legal Disclaimer */}
      <Card className="mb-8 border-amber-200 bg-amber-50/50">
        <CardHeader>
          <CardTitle className="text-amber-800">법적 고지</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-amber-800/80 space-y-2">
          <p>
            1. 본 서비스는 법률 자문이 아닌 참고용 정보 제공 서비스입니다.
          </p>
          <p>
            2. 분석 결과는 키워드 기반 규칙에 의한 것이며, 법적 효력이 없습니다.
          </p>
          <p>
            3. 정확한 법적 판단을 위해서는 반드시 변호사, 노무사 등 전문가의 상담을 받으시기 바랍니다.
          </p>
          <p>
            4. 본 서비스의 이용으로 발생하는 어떠한 법적 책임도 지지 않습니다.
          </p>
          <p>
            5. 긴급한 상황(폭행, 위협 등)에서는 즉시 112에 신고하시기 바랍니다.
          </p>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Link href="/analyze">
          <Button size="lg" className="text-base px-8">
            내 상황 판단하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
