/*
  Warnings:

  - You are about to drop the column `wishlist` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User.wishlist_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "wishlist";

-- CreateTable
CREATE TABLE "WishlistItem" (
    "wishlistItem" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem.wishlistItem_unique" ON "WishlistItem"("wishlistItem");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem.userId_unique" ON "WishlistItem"("userId");

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
