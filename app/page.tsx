"use client"
import Footer from "@/src/components/landingPage/Footer";
import SecondSection from "@/src/components/landingPage/SecondSection";
import TopSection from "@/src/components/landingPage/TopSection";
// import { Metadata } from "next";
import { useSession } from "next-auth/react";

// export const metadata: Metadata = {
//   title: "laRental",
//   description:
//     "laRental is a specialized software solution designed to streamline the driver recruitment and onboarding process for YEGO, addressing the unique needs of the transportation industry in Rwanda. The platform focuses on efficiently recruiting qualified drivers, conducting necessary background checks, and facilitating comprehensive training programs to ensure a safe and reliable transportation service.",
// };
const LandingPage = () => {
  
  const { data: session } = useSession();
  return (
    <div className="bg-backgroundColor">
      <TopSection user={session?.user} />
      <SecondSection user={session?.user} />
      <Footer />
    </div>
  );
};

export default LandingPage;
