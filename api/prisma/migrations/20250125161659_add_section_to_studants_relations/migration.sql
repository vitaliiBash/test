-- CreateTable
CREATE TABLE "_StudentsRelation" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_StudentsRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StudentsRelation_B_index" ON "_StudentsRelation"("B");

-- AddForeignKey
ALTER TABLE "_StudentsRelation" ADD CONSTRAINT "_StudentsRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentsRelation" ADD CONSTRAINT "_StudentsRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
