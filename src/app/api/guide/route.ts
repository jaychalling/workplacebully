import { NextResponse } from "next/server";
import { guideSteps, contactInfos, evidenceChecklist } from "@/lib/data/guide";

export async function GET() {
  return NextResponse.json({
    steps: guideSteps,
    contacts: contactInfos,
    evidenceChecklist,
  });
}
