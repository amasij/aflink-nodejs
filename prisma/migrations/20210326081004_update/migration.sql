/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[phoneNumber]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[username]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - Added the required column `datePosted` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textContent` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateCreated` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDrinker` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSmoker` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVerified` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('CHRISTIAN', 'MUSLIM');

-- CreateEnum
CREATE TYPE "EntityStatusConstant" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "GenderConstant" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "SexualityConstant" AS ENUM ('GAY', 'STRAIGHT', 'BI_SEXUAL');

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "title",
DROP COLUMN "published",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "datePosted" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "textContent" VARCHAR(255) NOT NULL,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "EntityStatusConstant" NOT NULL DEFAULT E'INACTIVE';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "biography" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "height" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "isDrinker" BOOLEAN NOT NULL,
ADD COLUMN     "isSmoker" BOOLEAN NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL,
ADD COLUMN     "religion" "Religion",
ADD COLUMN     "status" "EntityStatusConstant" NOT NULL DEFAULT E'INACTIVE',
ADD COLUMN     "gender" "GenderConstant",
ADD COLUMN     "sexuality" "SexualityConstant";

-- DropTable
DROP TABLE "Profile";

-- CreateIndex
CREATE UNIQUE INDEX "User.phoneNumber_unique" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
