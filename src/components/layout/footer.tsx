import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                법
              </div>
              <span className="font-bold text-primary">직장내 괴롭힘 판단기</span>
            </div>
            <p className="text-sm text-muted-foreground">
              근로기준법 제76조의2에 기반한<br />
              직장내 괴롭힘 자가 판단 서비스
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/analyze" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  상황 판단하기
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  대응 가이드
                </Link>
              </li>
              <li>
                <Link href="/cases" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  판례 모음
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  서비스 소개
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">긴급 연락처</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>고용노동부: 1350</li>
              <li>국가인권위원회: 1331</li>
              <li>괴롭힘 상담센터: 1522-9000</li>
              <li>정신건강 위기상담: 1577-0199</li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            본 서비스는 법률 자문이 아닌 참고용 정보 제공 서비스입니다.
            정확한 법적 판단을 위해서는 반드시 전문가 상담을 받으시기 바랍니다.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            &copy; {new Date().getFullYear()} 직장내 괴롭힘 판단기. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
