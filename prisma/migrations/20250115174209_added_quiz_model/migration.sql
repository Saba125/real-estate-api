-- CreateTable
CREATE TABLE "quizes" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "correct_answer" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,

    CONSTRAINT "quizes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quizes" ADD CONSTRAINT "quizes_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
