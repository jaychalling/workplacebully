import { NextRequest, NextResponse } from "next/server";
import { analyzeText, type AnalysisInput } from "@/lib/analysis/engine";
import { sampleCases } from "@/lib/data/cases";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalysisInput;

    if (!body.text || body.text.trim().length < 10) {
      return NextResponse.json(
        { error: "분석할 텍스트를 10자 이상 입력해주세요." },
        { status: 400 }
      );
    }

    if (body.text.length > 5000) {
      return NextResponse.json(
        { error: "텍스트는 5000자 이하로 입력해주세요." },
        { status: 400 }
      );
    }

    const result = analyzeText(body);

    // Find related cases based on matched keywords using in-memory data
    const allKeywords = [
      ...result.requirement1.matchedKeywords,
      ...result.requirement2.matchedKeywords,
      ...result.requirement3.matchedKeywords,
    ].map((k) => k.keyword);

    interface RelatedCase {
      id: string;
      title: string;
      result: string;
    }

    let relatedCasesData: RelatedCase[] = [];

    if (allKeywords.length > 0) {
      const matched = sampleCases
        .map((c, i) => {
          const caseKeywords = c.keywords.split(",");
          const matchCount = caseKeywords.filter((ck) =>
            allKeywords.some((ak) => ck.includes(ak) || ak.includes(ck))
          ).length;
          return { id: String(i), title: c.title, result: c.result, matchCount };
        })
        .filter((c) => c.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount)
        .slice(0, 5);

      result.relatedCaseIds = matched.map((c) => c.id);
      relatedCasesData = matched.map((c) => ({
        id: c.id,
        title: c.title,
        result: c.result,
      }));
    }

    return NextResponse.json({ ...result, relatedCases: relatedCasesData });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "분석 중 오류가 발생했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
