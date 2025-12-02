/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Page" ADD COLUMN     "globalFilters" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "aiConfig" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "public"."Widget" ADD COLUMN     "widgetsData" JSONB NOT NULL DEFAULT '{}';

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "public"."User"("phoneNumber");
