-- CreateTable
CREATE TABLE "UserTech" (
    "userId" TEXT NOT NULL,
    "techStackId" TEXT NOT NULL,
    "years" DOUBLE PRECISION,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTech_pkey" PRIMARY KEY ("userId","techStackId")
);

-- AddForeignKey
ALTER TABLE "UserTech" ADD CONSTRAINT "UserTech_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTech" ADD CONSTRAINT "UserTech_techStackId_fkey" FOREIGN KEY ("techStackId") REFERENCES "TechStack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
