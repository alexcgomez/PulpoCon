-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cv_id" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv" (
    "id" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,

    CONSTRAINT "cv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loopers" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "loopers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "looper_recommendations" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "looper_ids" TEXT[],
    "text" TEXT NOT NULL,

    CONSTRAINT "looper_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_cv_id_key" ON "profiles"("cv_id");

-- CreateIndex
CREATE UNIQUE INDEX "loopers_email_key" ON "loopers"("email");

-- AddForeignKey
ALTER TABLE "cv" ADD CONSTRAINT "cv_id_fkey" FOREIGN KEY ("id") REFERENCES "profiles"("cv_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "looper_recommendations" ADD CONSTRAINT "looper_recommendations_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
