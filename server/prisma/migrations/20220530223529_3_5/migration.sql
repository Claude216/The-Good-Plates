/*
  Warnings:

  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Restaurant";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Restaurants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Restaurants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Restaurants" ("address", "city", "id", "image", "name", "state", "zip") SELECT "address", "city", "id", "image", "name", "state", "zip" FROM "Restaurants";
DROP TABLE "Restaurants";
ALTER TABLE "new_Restaurants" RENAME TO "Restaurants";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
