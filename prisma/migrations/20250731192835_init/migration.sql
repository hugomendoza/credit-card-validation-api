-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('CARD');

-- CreateEnum
CREATE TYPE "public"."TransactionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."tokens" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "card_holder" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "last_four" TEXT NOT NULL,
    "exp_month" TEXT NOT NULL,
    "exp_year" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transactions" (
    "id" TEXT NOT NULL,
    "amount_in_cents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "status" "public"."TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "failure_code" TEXT,
    "failure_message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_method" (
    "id" TEXT NOT NULL,
    "type" "public"."PaymentType" NOT NULL DEFAULT 'CARD',
    "installments" INTEGER NOT NULL,
    "transactionId" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,

    CONSTRAINT "payment_method_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tokens_value_key" ON "public"."tokens"("value");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_reference_key" ON "public"."transactions"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "payment_method_transactionId_key" ON "public"."payment_method"("transactionId");

-- AddForeignKey
ALTER TABLE "public"."payment_method" ADD CONSTRAINT "payment_method_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "public"."transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment_method" ADD CONSTRAINT "payment_method_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "public"."tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
