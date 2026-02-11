import { NextRequest, NextResponse } from "next/server";
import { analyzeText, type AnalysisInput } from "@/lib/analysis/engine";
import { prisma } from "@/lib/prisma";

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

    // Find related cases based on matched keywords
    const allKeywords = [
      ...result.requirement1.matchedKeywords,
      ...result.requirement2.matchedKeywords,
      ...result.requirement3.matchedKeywords,
    ].map((k) => k.keyword);

    if (allKeywords.length > 0) {
      const cases = await prisma.caseRecord.findMany();
      const relatedCases = cases
        .map((c) => {
          const caseKeywords = c.keywords.split(",");
          const matchCount = caseKeywords.filter((ck) =>
            allKeywords.some((ak) => ck.includes(ak) || ak.includes(ck))
          ).length;
          return { id: c.id, matchCount };
        })
        .filter((c) => c.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount)
        .slice(0, 5)
        .map((c) => c.id);

      result.relatedCaseIds = relatedCases;
    }

    // Save analysis result
    await prisma.analysisResult.create({
      data: {
        inputText: body.text,
        maskedText: result.maskedText,
        score1: result.requirement1.score,
        score2: result.requirement2.score,
        score3: result.requirement3.score,
        totalScore: result.totalScore,
        confidence: result.confidence,
        verdict: result.verdict,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "분석 중 오류가 발생했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
