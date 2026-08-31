import type { Metadata } from "next";
import PageBanner from "../../components/PageBanner";
import AboutValues from "../../components/about/Values";
import AboutStory from "../../components/about/Story";
import AboutTeam from "../../components/about/Team";
// import AboutTimeline from "../../components/about/Timeline";
import VisionMission from "../../components/VisionMission";
// import CTA from "../../components/CTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "NextGen Mahatech is a full-service IT solutions company in Nashik, Maharashtra, delivering custom software, cloud, security and support.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        kicker="About NextGen Mahatech"
        title="The team behind"
        highlight="smart technology"
        subtitle="A modern IT partner built on engineering excellence, honest advice and a genuine commitment to your business outcomes."
      />
      <AboutStory />
      <VisionMission/>
      <AboutValues />
      {/* <AboutTimeline /> */}
      <AboutTeam />
    </>
  );
}
