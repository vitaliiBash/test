-- CreateTable
CREATE TABLE "ClassRoom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,

    CONSTRAINT "ClassRoom_pkey" PRIMARY KEY ("id")
);
