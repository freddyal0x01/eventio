/*
  Warnings:

  - You are about to drop the `LemonSqueezySubcription` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LemonSqueezySubscriptionStatus" AS ENUM ('on_trial', 'active', 'paused', 'past_due', 'unpaid', 'cancelled', 'expired');

-- DropForeignKey
ALTER TABLE "LemonSqueezyPayment" DROP CONSTRAINT "LemonSqueezyPayment_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "LemonSqueezySubcription" DROP CONSTRAINT "LemonSqueezySubcription_productId_fkey";

-- DropForeignKey
ALTER TABLE "LemonSqueezySubcription" DROP CONSTRAINT "LemonSqueezySubcription_userId_fkey";

-- DropForeignKey
ALTER TABLE "LemonSqueezySubcription" DROP CONSTRAINT "LemonSqueezySubcription_variantId_fkey";

-- DropTable
DROP TABLE "LemonSqueezySubcription";

-- DropEnum
DROP TYPE "LemonSqueezySubcriptionStatus";

-- CreateTable
CREATE TABLE "LemonSqueezySubscription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subscriptionId" TEXT,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "attributes" JSONB,
    "status" "LemonSqueezySubscriptionStatus" NOT NULL,

    CONSTRAINT "LemonSqueezySubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LemonSqueezySubscription_subscriptionId_key" ON "LemonSqueezySubscription"("subscriptionId");

-- AddForeignKey
ALTER TABLE "LemonSqueezyPayment" ADD CONSTRAINT "LemonSqueezyPayment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "LemonSqueezySubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LemonSqueezySubscription" ADD CONSTRAINT "LemonSqueezySubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LemonSqueezySubscription" ADD CONSTRAINT "LemonSqueezySubscription_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LemonSqueezyProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LemonSqueezySubscription" ADD CONSTRAINT "LemonSqueezySubscription_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "LemonSqueezyVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
