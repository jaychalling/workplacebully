-- CreateTable
CREATE TABLE "AnalysisResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inputText" TEXT NOT NULL,
    "maskedText" TEXT NOT NULL,
    "score1" INTEGER NOT NULL,
    "score2" INTEGER NOT NULL,
    "score3" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "confidence" INTEGER NOT NULL,
    "verdict" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CaseRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "court" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "fullText" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
