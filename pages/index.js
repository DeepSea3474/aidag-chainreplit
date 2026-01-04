import { useTranslation } from "react-i18next";
import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout>
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4">
        Autonomous, transparent and AI-powered DAO.
        Presale, liquidity, staking and bonus operations.
      </p>
      <div className="mt-6 space-x-4">
        <Link href="/presale" className="text-blue-600 underline">
          Presale
        </Link>
        <Link href="/dao" className="text-blue-600 underline">
          DAO
        </Link>
        <Link href="/docs" className="text-blue-600 underline">
          Docs
        </Link>
        <Link href="/panel" className="text-blue-600 underline">
          Panel
        </Link>
      </div>
    </Layout>
  );
}
