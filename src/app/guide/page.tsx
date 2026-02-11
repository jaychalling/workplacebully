import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { guideSteps, contactInfos, evidenceChecklist } from "@/lib/data/guide";

export const metadata: Metadata = {
  title: "대응 가이드",
  description: "직장내 괴롭힘 피해 시 단계별 대응 방법과 신고 채널 안내",
};

export default function GuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">대응 가이드</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          직장내 괴롭힘 피해를 겪고 있다면, 아래 단계별 가이드를 참고하세요.
          체계적으로 대응하면 더 효과적입니다.
        </p>
      </div>

      {/* Step-by-step Guide */}
      <div className="space-y-6 mb-12">
        {guideSteps.map((step) => (
          <Card key={step.step} className="overflow-hidden">
            <CardHeader className="bg-primary/5 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                  {step.step}
                </div>
                <div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg
                      className="w-4 h-4 text-primary mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
              {step.important && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">중요: </span>
                    {step.important}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Evidence Checklist */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">증거 수집 체크리스트</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {evidenceChecklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="h-5 w-5 rounded border-2 border-primary/30 shrink-0" />
                  <div>
                    <span className="text-sm">{item.label}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-8" />

      {/* Contact Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">상담 및 신고 기관</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactInfos.map((contact) => (
            <Card key={contact.name} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-5 pb-5">
                <h3 className="font-semibold mb-1">{contact.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {contact.description}
                </p>
                <div className="space-y-1">
                  {contact.phone && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-primary">
                        {contact.phone}
                      </span>
                    </div>
                  )}
                  {contact.note && (
                    <p className="text-xs text-muted-foreground pl-6">
                      {contact.note}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-muted/50 rounded-lg p-4 text-center">
        <p className="text-xs text-muted-foreground">
          위 가이드는 일반적인 정보 제공을 목적으로 하며, 법률 자문을 대체하지 않습니다.
          구체적인 상황에 대한 법적 판단은 전문가 상담을 받으시기 바랍니다.
        </p>
      </div>
    </div>
  );
}
