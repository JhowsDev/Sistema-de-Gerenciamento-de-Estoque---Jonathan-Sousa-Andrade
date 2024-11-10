-- CreateEnum
CREATE TYPE "AccountRole" AS ENUM ('MANEGER', 'STOCKIST', 'USER');

-- CreateEnum
CREATE TYPE "ProductStreets" AS ENUM ('A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3');

-- CreateEnum
CREATE TYPE "Moviments" AS ENUM ('ENTRIE', 'EXIT');

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "full-name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "AccountRole" NOT NULL DEFAULT 'USER',
    "created-at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated-at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managers" (
    "id" SERIAL NOT NULL,
    "full-name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "AccountRole" NOT NULL DEFAULT 'MANEGER',
    "created-at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated-at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category-id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "street" "ProductStreets" NOT NULL,
    "min-limit-itens" INTEGER NOT NULL,
    "max-limit-itens" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "created-at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated-at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "nameCategory" VARCHAR(100) NOT NULL,
    "created-at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated-at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moviments-history" (
    "id" SERIAL NOT NULL,
    "moviment-type" "Moviments" NOT NULL,
    "account-id" INTEGER NOT NULL,
    "product-id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "current-quantity" INTEGER NOT NULL,
    "moviment-time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moviments-history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopings" (
    "id" SERIAL NOT NULL,
    "product-id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "moviment-type" "Moviments" NOT NULL,
    "requestTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user-id" INTEGER NOT NULL,
    "manager-id" INTEGER NOT NULL,
    "aproved" BOOLEAN NOT NULL DEFAULT false,
    "rejected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "shopings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "managers_email_key" ON "managers"("email");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category-id_fkey" FOREIGN KEY ("category-id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moviments-history" ADD CONSTRAINT "moviments-history_product-id_fkey" FOREIGN KEY ("product-id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moviments-history" ADD CONSTRAINT "moviments-history_account-id_fkey" FOREIGN KEY ("account-id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopings" ADD CONSTRAINT "shopings_product-id_fkey" FOREIGN KEY ("product-id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopings" ADD CONSTRAINT "shopings_user-id_fkey" FOREIGN KEY ("user-id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopings" ADD CONSTRAINT "shopings_manager-id_fkey" FOREIGN KEY ("manager-id") REFERENCES "managers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
