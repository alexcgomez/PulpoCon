/*
  Warnings:

  - You are about to drop the column `cv_id` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the `cv` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `looper_recommendations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loopers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."cv" DROP CONSTRAINT "cv_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."looper_recommendations" DROP CONSTRAINT "looper_recommendations_profile_id_fkey";

-- DropIndex
DROP INDEX "public"."profiles_cv_id_key";

-- AlterTable
ALTER TABLE "public"."profiles" DROP COLUMN "cv_id",
DROP COLUMN "full_name",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "extra" TEXT,
ADD COLUMN     "interests" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."cv";

-- DropTable
DROP TABLE "public"."looper_recommendations";

-- DropTable
DROP TABLE "public"."loopers";
