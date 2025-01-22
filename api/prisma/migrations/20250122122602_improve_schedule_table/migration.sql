/*
  Warnings:

  - You are about to drop the column `endDateTime` on the `SectionSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `startDateTime` on the `SectionSchedule` table. All the data in the column will be lost.
  - Added the required column `day` to the `SectionSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `SectionSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `SectionSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday');

-- AlterTable
ALTER TABLE "SectionSchedule" DROP COLUMN "endDateTime",
DROP COLUMN "startDateTime",
ADD COLUMN     "day" "Day" NOT NULL,
ADD COLUMN     "endTime" TIME NOT NULL,
ADD COLUMN     "startTime" TIME NOT NULL;
