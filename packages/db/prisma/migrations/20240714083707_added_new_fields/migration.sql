/*
  Warnings:

  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ADD COLUMN     "age" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";
