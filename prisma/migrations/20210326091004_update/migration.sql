/*
  Warnings:

  - Added the required column `imageFileId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `User` required. The migration will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ChatMessageType" AS ENUM ('TEXT', 'IMAGE');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageFileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL;

-- CreateTable
CREATE TABLE "ImageFile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" BYTEA NOT NULL,
    "contentType" TEXT,
    "status" "EntityStatusConstant" NOT NULL DEFAULT E'INACTIVE',
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "textContent" TEXT,
    "imageContent" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ChatMessageType" NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conversation" ADD FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD FOREIGN KEY ("imageContent") REFERENCES "ImageFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("imageFileId") REFERENCES "ImageFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
