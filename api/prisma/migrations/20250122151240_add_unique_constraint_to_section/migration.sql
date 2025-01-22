/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,subjectId]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Section_teacherId_subjectId_key" ON "Section"("teacherId", "subjectId");
