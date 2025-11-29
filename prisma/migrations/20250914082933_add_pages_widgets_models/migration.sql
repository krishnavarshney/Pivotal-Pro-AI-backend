/*
  Warnings:

  - Added the required column `ownerId` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Widget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Page" ADD COLUMN     "configuration" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "widgetsData" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "public"."Widget" ADD COLUMN     "layouts" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "ownerId" TEXT NOT NULL,
ALTER COLUMN "configuration" SET DEFAULT '{}';

-- AddForeignKey
ALTER TABLE "public"."Page" ADD CONSTRAINT "Page_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Widget" ADD CONSTRAINT "Widget_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
