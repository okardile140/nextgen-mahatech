import type { Metadata } from "next";
import PageBanner from "../../components/PageBanner";
import PortfolioShowcase from "../../components/portfolio/Showcase";
import PortfolioGrid from "../../components/portfolio/Grid";
import PortfolioWhy from "../../components/portfolio/Why";
// import CTA from "../../components/CTA";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore NextGen Mahatech's portfolio: association management systems, web & mobile apps, cloud and IT solutions delivered for clients across sectors.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageBanner
        kicker="Our portfolio"
        title="Work that delivers"
        highlight="real results"
        subtitle="A look at the platforms and solutions we've built — and the clients growing on them."
      />
      <PortfolioShowcase />
      <PortfolioGrid />
      <PortfolioWhy />
      
    </>
  );
}
