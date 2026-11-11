import { Banner } from "@/components/home/banner";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { Cta } from "@/components/home/cta";

export default function HomePage() {
  return (
    <main>
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <Cta />
    </main>
  );
}
