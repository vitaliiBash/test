-- AlterTable
ALTER TABLE "SectionSchedule" ALTER COLUMN "classroomId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SectionSchedule" ADD CONSTRAINT "SectionSchedule_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "ClassRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
