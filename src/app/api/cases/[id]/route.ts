import { NextRequest, NextResponse } from "next/server";
import { sampleCases } from "@/lib/data/cases";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const index = parseInt(params.id, 10);
    const caseRecord = sampleCases[index];

    if (!caseRecord) {
      return NextResponse.json(
        { error: "해당 판례를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ...caseRecord, id: params.id });
  } catch (error) {
    console.error("Case detail fetch error:", error);
    return NextResponse.json(
      { error: "판례를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
