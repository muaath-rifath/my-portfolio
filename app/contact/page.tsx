import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Mohamed Muaath Rifath for any inquiries or collaborations. Fill out the contact form or reach out via email or phone.",
  keywords: ["Contact", "Mohamed Muaath Rifath", "inquiries", "collaborations", "email", "phone"],
  openGraph: {
    title: "Contact",
    description: "Get in touch with Mohamed Muaath Rifath for any inquiries or collaborations. Fill out the contact form or reach out via email or phone.",
    images: ["/assets/contact.png"],
    url: "https://muaathrifath.tech/contact",
    type: "website"
  }
};

export default function Contact() {
  return (
    <section className="relative container mx-auto pt-20 lg:pt-16 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      {/* Circuit trace decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-40 left-12 h-[1px] w-16 dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
        <div className="absolute bottom-1/4 right-10 h-[1px] w-24 dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
        <div className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
        <div className="absolute bottom-1/3 left-1/4 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
      </div>
      
      {/* Circuit overlay for enhanced tech aesthetic */}
      <div className="absolute inset-0 bg-[url('/assets/circuit-overlay.svg')] bg-no-repeat bg-cover opacity-10 mix-blend-overlay z-0 pointer-events-none"></div>

      {/* Header with circuit-inspired styling */}
      <div className="relative z-10 mb-4 lg:px-8 mx-10 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter relative inline-block">
          <span className="dark:text-white text-[#006b42]">Get in Touch</span>
          <span className="absolute left-0 bottom-0 h-[2px] w-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Have a question or want to work together? Feel free to reach out using the form below or through my contact details.
        </p>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full lg:px-40 justify-center items-stretch gap-0 mt-8 group">
        <ContactInfo />
        <ContactForm />
      </div>
      
      {/* Bottom circuit decoration */}
      <div className="relative z-10 w-full mt-16 hidden md:block">
        <div className="absolute left-1/4 bottom-0 w-16 h-[1px] dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
        <div className="absolute right-1/4 bottom-0 w-16 h-[1px] dark:bg-[#8fffaa]/20 bg-[#006b42]/20"></div>
      </div>
    </section>
  );
}
