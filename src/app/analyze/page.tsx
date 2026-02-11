"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import type { AnalysisResult } from "@/lib/analysis/engine";

const perpetratorOptions = [
  { value: "임원", label: "임원 (이사급 이상)" },
  { value: "상사", label: "직속 상사 (팀장/부장 등)" },
  { value: "동료(다수)", label: "동료 (여러 명)" },
  { value: "동료", label: "동료 (1인)" },
  { value: "부하직원", label: "부하 직원" },
];

const frequencyOptions = [
  { value: "매일", label: "매일" },
  { value: "주1-2회", label: "주 1-2회" },
  { value: "월1-2회", label: "월 1-2회" },
  { value: "가끔", label: "가끔" },
];

const durationOptions = [
  { value: "1개월 미만", label: "1개월 미만" },
  { value: "1-3개월", label: "1-3개월" },
  { value: "3-6개월", label: "3-6개월" },
  { value: "6개월-1년", label: "6개월 ~ 1년" },
  { value: "1년 이상", label: "1년 이상" },
];

function getScoreColor(score: number): string {
  if (score >= 70) return "text-red-600";
  if (score >= 40) return "text-amber-600";
  return "text-emerald-600";
}

function getScoreBarColor(score: number): string {
  if (score >= 70) return "bg-red-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-emerald-500";
}

function getVerdictStyle(verdict: string) {
  switch (verdict) {
    case "해당":
      return { bg: "bg-red-50 border-red-200", text: "text-red-700", badge: "destructive" as const };
    case "미해당":
      return { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", badge: "secondary" as const };
    default:
      return { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", badge: "outline" as const };
  }
}

export default function AnalyzePage() {
  const [step, setStep] = useState(1);
  const [text, setText] = useState("");
  const [perpetratorRelation, setPerpetratorRelation] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (text.trim().length < 10) {
      setError("상황을 10자 이상 입력해주세요.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          perpetratorRelation: perpetratorRelation || undefined,
          frequency: frequency || undefined,
          duration: duration || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json() as { error: string };
        throw new Error(errorData.error || "분석 중 오류가 발생했습니다.");
      }

      const data = (await response.json()) as AnalysisResult;
      setResult(data);
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setText("");
    setPerpetratorRelation("");
    setFrequency("");
    setDuration("");
    setResult(null);
    setError("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step >= s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {s === 4 && step >= 4 ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                s
              )}
            </div>
            {s < 4 && (
              <div className={`w-8 md:w-16 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Text Input */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">상황을 알려주세요</CardTitle>
            <p className="text-sm text-muted-foreground">
              직장에서 겪고 있는 상황을 자유롭게 적어주세요. 구체적일수록 정확한 분석이 가능합니다.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="예: 팀장이 매일 회의 시간에 저만 지목해서 업무 능력을 비하하고, '너 같은 사람은 처음 본다'며 다른 직원들 앞에서 공개적으로 망신을 줍니다. 이런 상황이 6개월째 계속되고 있어 출근이 두렵고 우울증 진단을 받았습니다."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] text-base"
              maxLength={5000}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {text.length}/5000자 (최소 10자)
              </span>
              {error && <span className="text-xs text-red-500">{error}</span>}
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">
                입력된 내용의 이름, 전화번호, 회사명 등 개인정보는 자동으로 마스킹 처리됩니다.
              </p>
            </div>
            <Button
              onClick={() => {
                if (text.trim().length < 10) {
                  setError("상황을 10자 이상 입력해주세요.");
                  return;
                }
                setError("");
                setStep(2);
              }}
              className="w-full"
              size="lg"
            >
              다음 단계로
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Follow-up Questions */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">추가 정보</CardTitle>
            <p className="text-sm text-muted-foreground">
              더 정확한 분석을 위해 추가 정보를 선택해주세요. (선택사항)
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Perpetrator Relation */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                가해자와의 관계
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {perpetratorOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setPerpetratorRelation(
                        perpetratorRelation === opt.value ? "" : opt.value
                      )
                    }
                    className={`px-3 py-2 rounded-md border text-sm text-left transition-colors ${
                      perpetratorRelation === opt.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                발생 빈도
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {frequencyOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setFrequency(frequency === opt.value ? "" : opt.value)
                    }
                    className={`px-3 py-2 rounded-md border text-sm transition-colors ${
                      frequency === opt.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                지속 기간
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {durationOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setDuration(duration === opt.value ? "" : opt.value)
                    }
                    className={`px-3 py-2 rounded-md border text-sm transition-colors ${
                      duration === opt.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                이전
              </Button>
              <Button onClick={() => { setStep(3); handleAnalyze(); }} className="flex-1">
                분석하기
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Loading */}
      {step === 3 && loading && (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <svg
                className="w-8 h-8 text-primary animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">분석 중입니다</h3>
            <p className="text-sm text-muted-foreground">
              근로기준법 제76조의2의 3요건을 기준으로 분석하고 있습니다...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Error */}
      {step === 3 && !loading && error && (
        <Card>
          <CardContent className="py-16 text-center">
            <h3 className="text-lg font-semibold mb-2 text-red-600">오류 발생</h3>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={handleReset} variant="outline">
              다시 시도하기
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Results */}
      {step === 4 && result && (
        <div className="space-y-6">
          {/* Verdict */}
          {(() => {
            const verdictStyle = getVerdictStyle(result.verdict);
            return (
              <Card className={`border-2 ${verdictStyle.bg}`}>
                <CardContent className="py-6 text-center">
                  <Badge variant={verdictStyle.badge} className="mb-3 text-base px-4 py-1">
                    {result.verdict === "해당"
                      ? "직장내 괴롭힘 해당 가능성 높음"
                      : result.verdict === "미해당"
                      ? "직장내 괴롭힘 해당 가능성 낮음"
                      : "추가 정보 필요"}
                  </Badge>
                  <div className="flex items-center justify-center gap-6 mt-4">
                    <div>
                      <div className={`text-3xl font-bold ${verdictStyle.text}`}>
                        {result.totalScore}점
                      </div>
                      <div className="text-xs text-muted-foreground">종합 점수</div>
                    </div>
                    <Separator orientation="vertical" className="h-12" />
                    <div>
                      <div className={`text-3xl font-bold ${verdictStyle.text}`}>
                        {result.confidence}%
                      </div>
                      <div className="text-xs text-muted-foreground">분석 신뢰도</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* 3 Requirements Detail */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3요건 분석 결과</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Requirement 1 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-medium">요건 1: 지위/관계 우위 이용</span>
                    <p className="text-xs text-muted-foreground">{result.requirement1.description}</p>
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(result.requirement1.score)}`}>
                    {result.requirement1.score}점
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getScoreBarColor(result.requirement1.score)}`}
                    style={{ width: `${result.requirement1.score}%` }}
                  />
                </div>
                {result.requirement1.matchedKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {result.requirement1.matchedKeywords.map((k) => (
                      <Badge key={k.keyword} variant="outline" className="text-xs">
                        {k.keyword}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Requirement 2 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-medium">요건 2: 업무상 적정범위 초과</span>
                    <p className="text-xs text-muted-foreground">{result.requirement2.description}</p>
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(result.requirement2.score)}`}>
                    {result.requirement2.score}점
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getScoreBarColor(result.requirement2.score)}`}
                    style={{ width: `${result.requirement2.score}%` }}
                  />
                </div>
                {result.requirement2.matchedKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {result.requirement2.matchedKeywords.map((k) => (
                      <Badge key={k.keyword} variant="outline" className="text-xs">
                        {k.keyword}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Requirement 3 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-medium">요건 3: 신체적/정신적 고통</span>
                    <p className="text-xs text-muted-foreground">{result.requirement3.description}</p>
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(result.requirement3.score)}`}>
                    {result.requirement3.score}점
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getScoreBarColor(result.requirement3.score)}`}
                    style={{ width: `${result.requirement3.score}%` }}
                  />
                </div>
                {result.requirement3.matchedKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {result.requirement3.matchedKeywords.map((k) => (
                      <Badge key={k.keyword} variant="outline" className="text-xs">
                        {k.keyword}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">대응 권고사항</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleReset} variant="outline" className="flex-1">
              다시 분석하기
            </Button>
            <Link href="/guide" className="flex-1">
              <Button className="w-full">대응 가이드 보기</Button>
            </Link>
            <Link href="/cases" className="flex-1">
              <Button variant="outline" className="w-full">
                유사 판례 찾기
              </Button>
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground text-center">
              본 분석 결과는 입력된 텍스트의 키워드 매칭을 기반으로 한 참고용 판단이며,
              법적 효력이 없습니다. 정확한 법적 판단은 반드시 전문가 상담을 받으시기 바랍니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
