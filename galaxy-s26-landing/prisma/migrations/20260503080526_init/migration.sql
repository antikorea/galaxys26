-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "timestamp" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_prefix" TEXT NOT NULL,
    "phone_middle" TEXT NOT NULL,
    "phone_last" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "carrier" TEXT NOT NULL,
    "inquiry" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);
