import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") ?? "";
    const result = searchParams.get("result") ?? ""; // "인정" or "불인정"

    const cases = await prisma.caseRecord.findMany({
      orderBy: { date: "desc" },
    });

    let filtered = cases;

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(lowerQuery) ||
          c.summary.toLowerCase().includes(lowerQuery) ||
          c.keywords.toLowerCase().includes(lowerQuery) ||
          c.fullText.toLowerCase().includes(lowerQuery)
      );
    }

    if (result === "인정" || result === "불인정") {
      filtered = filtered.filter((c) => c.result === result);
    }

    // Return without fullText for list view (lighter payload)
    const listData = filtered.map((c) => ({
      id: c.id,
      title: c.title,
      court: c.court,
      date: c.date,
      result: c.result,
      summary: c.summary,
      keywords: c.keywords,
    }));

    return NextResponse.json(listData);
  } catch (error) {
    console.error("Cases fetch error:", error);
    return NextResponse.json(
      { error: "판례를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
