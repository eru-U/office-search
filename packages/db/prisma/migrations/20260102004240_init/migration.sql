-- CreateEnum
CREATE TYPE "SeidoKibun" AS ENUM ('年収', '月収', '裁量労働制');

-- CreateTable
CREATE TABLE "ユーザー" (
    "ユーザーID" TEXT NOT NULL,
    "名前" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "アイコン" TEXT,
    "作成日" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "更新日" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ユーザー_pkey" PRIMARY KEY ("ユーザーID")
);

-- CreateTable
CREATE TABLE "企業" (
    "企業ID" TEXT NOT NULL,
    "ユーザーID" TEXT NOT NULL,
    "会社名" TEXT NOT NULL,
    "設立年月日" TIMESTAMP(3) NOT NULL,
    "資本金" BIGINT,
    "公式サイトURL" TEXT,
    "電話番号" TEXT,
    "総合評価スコア" INTEGER,
    "作成日時" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "更新日時" TIMESTAMP(3) NOT NULL,
    "志望度" INTEGER,
    "お気に入りフラグ" BOOLEAN NOT NULL,
    "閲覧回数" INTEGER NOT NULL,

    CONSTRAINT "企業_pkey" PRIMARY KEY ("企業ID")
);

-- CreateTable
CREATE TABLE "業界マスタ" (
    "業界ID" TEXT NOT NULL,
    "ユーザーID" TEXT,
    "業界名" TEXT,

    CONSTRAINT "業界マスタ_pkey" PRIMARY KEY ("業界ID")
);

-- CreateTable
CREATE TABLE "年代別企業テーブル" (
    "年代ID" TEXT NOT NULL,
    "企業ID" TEXT NOT NULL,
    "採用サイトURL" TEXT,
    "データの日" TIMESTAMP(3) NOT NULL,
    "社員数" INTEGER,
    "代表者名" TEXT NOT NULL,
    "売上高" BIGINT,
    "副業可否" BOOLEAN,
    "時短勤務有無" BOOLEAN,
    "服装自由" BOOLEAN,

    CONSTRAINT "年代別企業テーブル_pkey" PRIMARY KEY ("年代ID")
);

-- CreateTable
CREATE TABLE "拠点・支店" (
    "拠点ID" TEXT NOT NULL,
    "年代ID" TEXT,
    "拠点住所" TEXT NOT NULL,

    CONSTRAINT "拠点・支店_pkey" PRIMARY KEY ("拠点ID")
);

-- CreateTable
CREATE TABLE "募集職種" (
    "募集職種ID" TEXT NOT NULL,
    "年代ID" TEXT NOT NULL,
    "募集職種名" TEXT NOT NULL,
    "試用期間（月）" DOUBLE PRECISION,
    "雇用形態ID" TEXT,
    "労働区分ID" TEXT NOT NULL,
    "リモートワーク可否" BOOLEAN NOT NULL,
    "備考" TEXT,

    CONSTRAINT "募集職種_pkey" PRIMARY KEY ("募集職種ID")
);

-- CreateTable
CREATE TABLE "給与" (
    "給与ID" TEXT NOT NULL,
    "募集職種ID" TEXT NOT NULL,
    "制度区分" "SeidoKibun" NOT NULL,
    "給与" INTEGER,
    "基本給" INTEGER,

    CONSTRAINT "給与_pkey" PRIMARY KEY ("給与ID")
);

-- CreateTable
CREATE TABLE "メモ" (
    "メモID" TEXT NOT NULL,
    "企業ID" TEXT NOT NULL,
    "メモ内容" TEXT NOT NULL,
    "作成日時" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "メモ_pkey" PRIMARY KEY ("メモID")
);

-- CreateTable
CREATE TABLE "重要人物・連絡先" (
    "重要人物ID" TEXT NOT NULL,
    "年代ID" TEXT NOT NULL,
    "氏名" TEXT NOT NULL,
    "役職" TEXT NOT NULL,
    "特徴メモ" TEXT,

    CONSTRAINT "重要人物・連絡先_pkey" PRIMARY KEY ("重要人物ID")
);

-- CreateTable
CREATE TABLE "選考スケジュール" (
    "選考スケジュールID" TEXT NOT NULL,
    "親選考スケジュールID" TEXT,
    "募集職種ID" TEXT NOT NULL,
    "タイトル" TEXT NOT NULL,
    "選考日時" TIMESTAMP(3),
    "詳細メモ" TEXT,
    "完了フラグ" BOOLEAN NOT NULL,
    "合否結果" BOOLEAN,
    "ステータス更新日" TIMESTAMP(3),
    "場所・URL" TEXT,

    CONSTRAINT "選考スケジュール_pkey" PRIMARY KEY ("選考スケジュールID")
);

-- CreateTable
CREATE TABLE "TODO" (
    "TODOID" TEXT NOT NULL,
    "ユーザーID" TEXT NOT NULL,
    "タイトル" TEXT NOT NULL,
    "開始日" TIMESTAMP(3),
    "終了日" TIMESTAMP(3),
    "備考" TEXT,
    "完了フラグ" BOOLEAN NOT NULL,

    CONSTRAINT "TODO_pkey" PRIMARY KEY ("TODOID")
);

-- CreateTable
CREATE TABLE "タグマスタ" (
    "タグID" TEXT NOT NULL,
    "タグ名" TEXT NOT NULL,
    "ユーザーID" TEXT NOT NULL,

    CONSTRAINT "タグマスタ_pkey" PRIMARY KEY ("タグID")
);

-- CreateTable
CREATE TABLE "就活軸" (
    "就活軸ID" TEXT NOT NULL,
    "ユーザーID" TEXT NOT NULL,
    "軸の内容" TEXT,
    "優先度種別" INTEGER,
    "表示順序" INTEGER,
    "作成日時" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "就活軸_pkey" PRIMARY KEY ("就活軸ID")
);

-- CreateTable
CREATE TABLE "企業就活軸マッチング" (
    "企業ID" TEXT NOT NULL,
    "就活軸ID" TEXT NOT NULL,
    "適合スコア" INTEGER,

    CONSTRAINT "企業就活軸マッチング_pkey" PRIMARY KEY ("企業ID","就活軸ID")
);

-- CreateTable
CREATE TABLE "タスク" (
    "タスクID" TEXT NOT NULL,
    "スケジュールID" TEXT NOT NULL,
    "タイトル" TEXT NOT NULL,
    "説明" TEXT,
    "完了フラグ" BOOLEAN NOT NULL,
    "優先度" INTEGER NOT NULL,
    "期限" TIMESTAMP(3),
    "作成日時" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "タスク_pkey" PRIMARY KEY ("タスクID")
);

-- CreateTable
CREATE TABLE "保有資格" (
    "保有資格ID" TEXT NOT NULL,
    "ユーザーID" TEXT NOT NULL,
    "資格名" TEXT,
    "取得年月" TIMESTAMP(3),

    CONSTRAINT "保有資格_pkey" PRIMARY KEY ("保有資格ID")
);

-- CreateTable
CREATE TABLE "QA" (
    "QAID" TEXT NOT NULL,
    "選考スケジュールID" TEXT NOT NULL,
    "質問内容" TEXT NOT NULL,
    "回答内容" TEXT,

    CONSTRAINT "QA_pkey" PRIMARY KEY ("QAID")
);

-- CreateTable
CREATE TABLE "技術スタックマスタ" (
    "技術スタックID" TEXT NOT NULL,
    "ユーザーID" TEXT,
    "技術スタック名" TEXT,

    CONSTRAINT "技術スタックマスタ_pkey" PRIMARY KEY ("技術スタックID")
);

-- CreateTable
CREATE TABLE "企業理念テーブル" (
    "企業理念ID" TEXT NOT NULL,
    "企業ID" TEXT NOT NULL,
    "企業理念内容" TEXT,

    CONSTRAINT "企業理念テーブル_pkey" PRIMARY KEY ("企業理念ID")
);

-- CreateTable
CREATE TABLE "事業内容" (
    "事業内容ID" TEXT NOT NULL,
    "年代ID" TEXT NOT NULL,
    "事業内容タイトル" TEXT NOT NULL,
    "事業内容詳細" TEXT,

    CONSTRAINT "事業内容_pkey" PRIMARY KEY ("事業内容ID")
);

-- CreateTable
CREATE TABLE "手当" (
    "手当ID" TEXT NOT NULL,
    "給与ID" TEXT NOT NULL,
    "手当名" TEXT NOT NULL,
    "金額" INTEGER NOT NULL,

    CONSTRAINT "手当_pkey" PRIMARY KEY ("手当ID")
);

-- CreateTable
CREATE TABLE "賞与" (
    "賞与ID" TEXT NOT NULL,
    "給与ID" TEXT NOT NULL,
    "賞与回数" INTEGER,
    "か月分" DOUBLE PRECISION,

    CONSTRAINT "賞与_pkey" PRIMARY KEY ("賞与ID")
);

-- CreateTable
CREATE TABLE "労働時間" (
    "労働時間ID" TEXT NOT NULL,
    "募集職種ID" TEXT NOT NULL,
    "始業時間" TIME,
    "就業時間" TIME,
    "コアタイム開始時間" TIME,
    "コアタイム終了時間" TIME,

    CONSTRAINT "労働時間_pkey" PRIMARY KEY ("労働時間ID")
);

-- CreateTable
CREATE TABLE "労働区分マスタ" (
    "労働区分ID" TEXT NOT NULL,
    "ユーザーID" TEXT NOT NULL,
    "区分名" TEXT NOT NULL,

    CONSTRAINT "労働区分マスタ_pkey" PRIMARY KEY ("労働区分ID")
);

-- CreateTable
CREATE TABLE "休日制度" (
    "休日制度ID" TEXT NOT NULL,
    "年代ID" TEXT NOT NULL,
    "休日制度名" TEXT NOT NULL,

    CONSTRAINT "休日制度_pkey" PRIMARY KEY ("休日制度ID")
);

-- CreateTable
CREATE TABLE "福利厚生" (
    "福利厚生ID" TEXT NOT NULL,
    "年代ID" TEXT NOT NULL,
    "福利厚生名" TEXT NOT NULL,
    "福利厚生内容" TEXT,

    CONSTRAINT "福利厚生_pkey" PRIMARY KEY ("福利厚生ID")
);

-- CreateTable
CREATE TABLE "研修制度" (
    "研修制度ID" TEXT NOT NULL,
    "年代ID" TEXT NOT NULL,
    "期間（月）" DOUBLE PRECISION NOT NULL,
    "内容" TEXT,

    CONSTRAINT "研修制度_pkey" PRIMARY KEY ("研修制度ID")
);

-- CreateTable
CREATE TABLE "雇用形態マスタ" (
    "雇用形態ID" TEXT NOT NULL,
    "ユーザーID" TEXT NOT NULL,
    "雇用形態名" TEXT,

    CONSTRAINT "雇用形態マスタ_pkey" PRIMARY KEY ("雇用形態ID")
);

-- CreateTable
CREATE TABLE "キャリアビジョン" (
    "キャリアビジョンID" TEXT NOT NULL,
    "ユーザーID" TEXT NOT NULL,
    "キャリア名" TEXT NOT NULL,
    "達成する年" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "キャリアビジョン_pkey" PRIMARY KEY ("キャリアビジョンID")
);

-- CreateTable
CREATE TABLE "連携用" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "連携用_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "セッション" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "セッション_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "メール認証用" (
    "identified" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "メール認証用_pkey" PRIMARY KEY ("identified")
);

-- CreateTable
CREATE TABLE "_CompanyToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CompanyToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CompanyToIndustry" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CompanyToIndustry_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_JobToTechStack" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_JobToTechStack_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CompanyToTag_B_index" ON "_CompanyToTag"("B");

-- CreateIndex
CREATE INDEX "_CompanyToIndustry_B_index" ON "_CompanyToIndustry"("B");

-- CreateIndex
CREATE INDEX "_JobToTechStack_B_index" ON "_JobToTechStack"("B");

-- AddForeignKey
ALTER TABLE "企業" ADD CONSTRAINT "企業_ユーザーID_fkey" FOREIGN KEY ("ユーザーID") REFERENCES "ユーザー"("ユーザーID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "業界マスタ" ADD CONSTRAINT "業界マスタ_ユーザーID_fkey" FOREIGN KEY ("ユーザーID") REFERENCES "ユーザー"("ユーザーID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "年代別企業テーブル" ADD CONSTRAINT "年代別企業テーブル_企業ID_fkey" FOREIGN KEY ("企業ID") REFERENCES "企業"("企業ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "拠点・支店" ADD CONSTRAINT "拠点・支店_年代ID_fkey" FOREIGN KEY ("年代ID") REFERENCES "年代別企業テーブル"("年代ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "募集職種" ADD CONSTRAINT "募集職種_年代ID_fkey" FOREIGN KEY ("年代ID") REFERENCES "年代別企業テーブル"("年代ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "募集職種" ADD CONSTRAINT "募集職種_雇用形態ID_fkey" FOREIGN KEY ("雇用形態ID") REFERENCES "雇用形態マスタ"("雇用形態ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "募集職種" ADD CONSTRAINT "募集職種_労働区分ID_fkey" FOREIGN KEY ("労働区分ID") REFERENCES "労働区分マスタ"("労働区分ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "給与" ADD CONSTRAINT "給与_募集職種ID_fkey" FOREIGN KEY ("募集職種ID") REFERENCES "募集職種"("募集職種ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "メモ" ADD CONSTRAINT "メモ_企業ID_fkey" FOREIGN KEY ("企業ID") REFERENCES "企業"("企業ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "重要人物・連絡先" ADD CONSTRAINT "重要人物・連絡先_年代ID_fkey" FOREIGN KEY ("年代ID") REFERENCES "年代別企業テーブル"("年代ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "選考スケジュール" ADD CONSTRAINT "選考スケジュール_募集職種ID_fkey" FOREIGN KEY ("募集職種ID") REFERENCES "募集職種"("募集職種ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TODO" ADD CONSTRAINT "TODO_ユーザーID_fkey" FOREIGN KEY ("ユーザーID") REFERENCES "ユーザー"("ユーザーID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "タグマスタ" ADD CONSTRAINT "タグマスタ_ユーザーID_fkey" FOREIGN KEY ("ユーザーID") REFERENCES "ユーザー"("ユーザーID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "就活軸" ADD CONSTRAINT "就活軸_ユーザーID_fkey" FOREIGN KEY ("ユーザーID") REFERENCES "ユーザー"("ユーザーID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "企業就活軸マッチング" ADD CONSTRAINT "企業就活軸マッチング_企業ID_fkey" FOREIGN KEY ("企業ID") REFERENCES "企業"("企業ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "企業就活軸マッチング" ADD CONSTRAINT "企業就活軸マッチング_就活軸ID_fkey" FOREIGN KEY ("就活軸ID") REFERENCES "就活軸"("就活軸ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "タスク" ADD CONSTRAINT "タスク_スケジュールID_fkey" FOREIGN KEY ("スケジュールID") REFERENCES "選考スケジュール"("選考スケジュールID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "保有資格" ADD CONSTRAINT "保有資格_ユーザーID_fkey" FOREIGN KEY ("ユーザーID") REFERENCES "ユーザー"("ユーザーID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QA" ADD CONSTRAINT "QA_選考スケジュールID_fkey" FOREIGN KEY ("選考スケジュールID") REFERENCES "選考スケジュール"("選考スケジュールID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "技術スタックマスタ" ADD CONSTRAINT "技術スタックマスタ_ユーザーID_fkey" FOREIGN KEY ("ユーザーID") REFERENCES "ユーザー"("ユーザーID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "企業理念テーブル" ADD CONSTRAINT "企業理念テーブル_企業ID_fkey" FOREIGN KEY ("企業ID") REFERENCES "企業"("企業ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "事業内容" ADD CONSTRAINT "事業内容_年代ID_fkey" FOREIGN KEY ("年代ID") REFERENCES "年代別企業テーブル"("年代ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "手当" ADD CONSTRAINT "手当_給与ID_fkey" FOREIGN KEY ("給与ID") REFERENCES "給与"("給与ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "賞与" ADD CONSTRAINT "賞与_給与ID_fkey" FOREIGN KEY ("給与ID") REFERENCES "給与"("給与ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "労働時間" ADD CONSTRAINT "労働時間_募集職種ID_fkey" FOREIGN KEY ("募集職種ID") REFERENCES "募集職種"("募集職種ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "労働区分マスタ" ADD CONSTRAINT "労働区分マスタ_ユーザーID_fkey" FOREIGN KEY ("ユーザーID") REFERENCES "ユーザー"("ユーザーID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "休日制度" ADD CONSTRAINT "休日制度_年代ID_fkey" FOREIGN KEY ("年代ID") REFERENCES "年代別企業テーブル"("年代ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "福利厚生" ADD CONSTRAINT "福利厚生_年代ID_fkey" FOREIGN KEY ("年代ID") REFERENCES "年代別企業テーブル"("年代ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "研修制度" ADD CONSTRAINT "研修制度_年代ID_fkey" FOREIGN KEY ("年代ID") REFERENCES "年代別企業テーブル"("年代ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "雇用形態マスタ" ADD CONSTRAINT "雇用形態マスタ_ユーザーID_fkey" FOREIGN KEY ("ユーザーID") REFERENCES "ユーザー"("ユーザーID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "キャリアビジョン" ADD CONSTRAINT "キャリアビジョン_ユーザーID_fkey" FOREIGN KEY ("ユーザーID") REFERENCES "ユーザー"("ユーザーID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "連携用" ADD CONSTRAINT "連携用_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ユーザー"("ユーザーID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "セッション" ADD CONSTRAINT "セッション_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ユーザー"("ユーザーID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToTag" ADD CONSTRAINT "_CompanyToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "企業"("企業ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToTag" ADD CONSTRAINT "_CompanyToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "タグマスタ"("タグID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToIndustry" ADD CONSTRAINT "_CompanyToIndustry_A_fkey" FOREIGN KEY ("A") REFERENCES "企業"("企業ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToIndustry" ADD CONSTRAINT "_CompanyToIndustry_B_fkey" FOREIGN KEY ("B") REFERENCES "業界マスタ"("業界ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToTechStack" ADD CONSTRAINT "_JobToTechStack_A_fkey" FOREIGN KEY ("A") REFERENCES "募集職種"("募集職種ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToTechStack" ADD CONSTRAINT "_JobToTechStack_B_fkey" FOREIGN KEY ("B") REFERENCES "技術スタックマスタ"("技術スタックID") ON DELETE CASCADE ON UPDATE CASCADE;
