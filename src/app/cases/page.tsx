"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CaseListItem {
  id: string;
  title: string;
  court: string;
  date: string;
  result: string;
  summary: string;
  keywords: string;
}

interface CaseDetail extends CaseListItem {
  fullText: string;
}

export default function CasesPage() {
  const [cases, setCases] = useState<CaseListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultFilter, setResultFilter] = useState<"" | "인정" | "불인정">("");
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CaseDetail | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchCases = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (resultFilter) params.set("result", resultFilter);

      const response = await fetch(`/api/cases?${params.toString()}`);
      const data = (await response.json()) as CaseListItem[];
      setCases(data);
    } catch (error) {
      console.error("Failed to fetch cases:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, resultFilter]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const handleCaseClick = async (id: string) => {
    try {
      const response = await fetch(`/api/cases/${id}`);
      const data = (await response.json()) as CaseDetail;
      setSelectedCase(data);
      setDialogOpen(true);
    } catch (error) {
      console.error("Failed to fetch case detail:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">판례 모음</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          직장내 괴롭힘 관련 주요 판례를 검색하고 참고할 수 있습니다.
          인정/불인정 사례를 통해 기준을 이해할 수 있습니다.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <Input
            placeholder="판례 검색 (키워드, 법원명, 내용 등)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={resultFilter === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setResultFilter("")}
          >
            전체
          </Button>
          <Button
            variant={resultFilter === "인정" ? "default" : "outline"}
            size="sm"
            onClick={() => setResultFilter("인정")}
          >
            인정
          </Button>
          <Button
            variant={resultFilter === "불인정" ? "default" : "outline"}
            size="sm"
            onClick={() => setResultFilter("불인정")}
          >
            불인정
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <span className="text-sm text-muted-foreground">
          총 {cases.length}건의 판례
        </span>
      </div>

      {/* Case List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-5 pb-5">
                <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : cases.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              검색 결과가 없습니다. 다른 키워드로 검색해보세요.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {cases.map((c) => (
            <Card
              key={c.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleCaseClick(c.id)}
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-base">{c.title}</h3>
                  <Badge
                    variant={c.result === "인정" ? "destructive" : "secondary"}
                    className="shrink-0"
                  >
                    {c.result}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {c.summary}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{c.court}</span>
                  <span>|</span>
                  <span>{c.date}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.keywords.split(",").slice(0, 4).map((kw) => (
                    <Badge key={kw} variant="outline" className="text-xs">
                      {kw.trim()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Case Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          {selectedCase && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-3">
                  <DialogTitle className="text-lg pr-4">
                    {selectedCase.title}
                  </DialogTitle>
                  <Badge
                    variant={
                      selectedCase.result === "인정" ? "destructive" : "secondary"
                    }
                    className="shrink-0"
                  >
                    {selectedCase.result}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{selectedCase.court}</span>
                  <span>|</span>
                  <span>{selectedCase.date}</span>
                </div>
              </DialogHeader>
              <ScrollArea className="max-h-[50vh]">
                <div className="space-y-4 pr-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">요약</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedCase.summary}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">상세 내용</h4>
                    <p className="text-sm leading-relaxed">
                      {selectedCase.fullText}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">키워드</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedCase.keywords.split(",").map((kw) => (
                        <Badge key={kw} variant="outline" className="text-xs">
                          {kw.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
