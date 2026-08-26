import type { Metadata } from "next";
import PageBanner from "../../components/PageBanner";
import IndustriesGrid from "../../components/industries/Grid";
import IndustriesWhy from "../../components/industries/Why";
// import CTA from "../../components/CTA";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "NextGen Mahatech serves manufacturing, retail, healthcare, education, real estate, logistics, hospitality and finance with domain-specific IT solutions.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageBanner
        kicker="Industries we serve"
        title="Domain expertise across"
        highlight="every vertical"
        subtitle="We combine technical skill with deep sector knowledge to deliver solutions that fit the way your industry operates."
      />
      <IndustriesGrid />
      <IndustriesWhy />
      
    </>
  );
}
