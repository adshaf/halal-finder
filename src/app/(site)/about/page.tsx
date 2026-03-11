import {
  ShieldCheck,
  Users,
  Wand2,
  ArrowRight,
  Globe,
  User,
  Code2,
  Terminal,
  Compass,
  MessageCircle,
} from "lucide-react";
import Container from "@/components/ui/container";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | HalalBites",
  description:
    "HalalBites was born from a simple need: to make finding halal restaurants in Sydney easy, transparent, and trustworthy.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Transparent Information",
    description:
      "We aim to provide clear and transparent information about each restaurant so that users can make informed decisions based on their own level of halal observance.",
  },
  {
    icon: Users,
    title: "Community Contributions",
    description:
      "HalalBites grows through community input. Users can suggest restaurants and share information, helping build a directory that reflects the diverse needs of Muslims across Australia.",
  },
  {
    icon: Wand2,
    title: "Simple & Accessible",
    description:
      "Built with modern technology to provide a fast, intuitive experience that makes discovering halal dining options easy across both web and mobile devices.",
  },
];

const team = [
  {
    name: "Omar Farooq",
    role: "CEO & Founder",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGuIYnUB-etBKq74Ya4YPUgp3Ela1seFl5-lvaNNrgdZYPvT75SIZUDzrSAK8_WQrWTR3TVurOtqN6a90yjcm4W0xYUwZqRq44lD8RVDKgdkXfhy_4Kx3fVkH9mGZebhogg-tC6UUsp4rqL9Q4CV5BuEUhuWEUyMzVucyNP15lrC4cWpidxWmdHghVwSJvEKyTATIf5I0Db8VJ9Pik5hS5y0uhKq8vb_Vp_Y4gaeuvdomqDr4Hazb-FD3DCL_xrNOB_SZRLygml9_C",
    imageAlt: "Professional headshot of a smiling man in business casual",
    icons: [Globe, User],
  },
  {
    name: "Sara Al-Ahmed",
    role: "Chief Tech Officer",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIkXntdInOty_VHKa7JggwhgB8e2mBVUQ87OyXIoDlU8xT0eqeDET0Lt3UM-9p5ZLGKtG6V7OciRb3JttMxFaBksl390mOXByzYD_0z9_kyYuo4nG883OMqp3KohWRipEKxBb07cW1oR8tw8VFi2Y_CunNGGIK_TpiTNulkCa2ryraOG6XVCsXdg2NwFlwQxhyGvA7z71VicLB4lm7rcbmJ3Zla6mnvz1Dbkbb1U4VQQqHiAzX4S2Ik6tNgbCa5gL2ylXjMsx4RsX",
    imageAlt: "Professional headshot of a confident woman in a tech office",
    icons: [Code2, Terminal],
  },
  {
    name: "Zaid Kareem",
    role: "Head of Operations",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCz9n50tSGxLBfPmdit6Pt1yUZI240_2AlgP1izt2LtC6ml5eGPrEliV0eW8onXBb1ooJa9lmwYy-BMfVRogxRg15pTAMXdarUCUTK3qtc5KcglJE1k3xBQGrDszWKbme748eiAQAX9Jz4tllQ30dAbl001y3wSXg7hckhv_XxIBK100C3tdN8NGUQXMUt8HEbOGRjSsL9GDDJy400eEtWCdyBR_mHlk1xfr2dTY5PPtRL0Jov-G4nP8vWxBrPmCZmfdt1WnDD9kr0_",
    imageAlt: "Close up portrait of a young professional man",
    icons: [Compass, Globe],
  },
  {
    name: "Lina Mansour",
    role: "Community Outreach",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9SKwTKYgGRgJ38VEKYTF5PBSmZSSRTeGff03p1lrF-rtJU0n9eE2uQSHg6_DLrbWiDJb1hGlz5fvHCA5NLer4raT-aA6roI1NujzD2Dutn5hvdCOoslHohYuFdjAPEKaKSZLq2ifOMdszwuivzuHecAZ53r8bJKaZ7T8LgeWhaiFQDV0laMS1RafBVCk5O-FJMbb_7ZOa3RNYLN21TU46Om4-fXyZz_nzitSBnwHRNmIyGk8LpzC5Vh-nvbb3anlLGh6zVr863i2R",
    imageAlt: "Professional portrait of a middle eastern woman in office",
    icons: [Globe, MessageCircle],
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* ── Hero ── */}
      <section className="py-20 overflow-hidden">
        <Container size="lg" className="px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div className="space-y-8">
              <h1 className="font-display text-5xl md:text-7xl font-black leading-[1.1] text-slate-100">
                Nourishing the <span className="text-gold italic">Muslim</span>{" "}
                Community.
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                HalalBites was created to help Muslims in Australia easily
                discover halal dining options. We recognise that halal
                observance can vary from person to person, so our goal is to
                provide transparent information that allows everyone to decide
                for themselves what they are comfortable with.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/searchResults"
                  className="bg-gold text-dark-bg font-bold px-8 py-4 rounded-xl hover:brightness-110 hover:shadow-lg hover:shadow-gold/20 transition-all"
                >
                  Find Restaurants
                </Link>
              </div>
            </div>

            {/* Right: arch image + floating circle */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-4/5 overflow-hidden rounded-t-full border-12 border-gold/10 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_KhMo10okPkdxmQjW50ozlrADLUS8WpcVMPAT-hkYy11CZ3I3TqeowOyRrmdWppZWeP3lizYn7Vm7Vc1WWAznYOXHztnsvLkWNkg9Q-P2c4UvhbaFq283f_lAICURkB2opPTuAPeR1tGKihQQq9EnOp4ajwLGZ_EmWLrkMj6UM9ArJiHuIV2nse1szLiIYJLKqvx0NPt3msOPLP8lHHp00t_nYbuXOqXDaBQdnVuaprp91yfSBY79M2z_CNByNpOLRV9ShnjsZVEA"
                  alt="Modern Islamic arched doorway architecture in sunset light"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark-bg/60 to-transparent" />
              </div>
              {/* Floating accent circle */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full border-8 border-dark-bg overflow-hidden shadow-xl hidden md:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkKAe3MsExgLPURiJEYJCmzOn7ro52ExOlkK5kK-o13vO5RLICIKYminDMXZvvUOK4pa-STMdHQ3fhmDhtQyQiHTHNQvi7-oEgD-QOOIbTkh7v3QgqIVPFxG0k6yKwDrLPdb1bZaAD5ZD0_jLlPiqXIF_Iw9hDcQOIlzTIxO2hWUOz5mtyPSvb0Axto2oWeuwVUBIGyNC-ExhSG2fI3mAZEjthPzIuP49gagZsZDNrfvP1Qejm0zPsVtsGKyPraxV4u0Fvq6u08Xl3"
                  alt="Exquisite plating of gourmet halal Mediterranean cuisine"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Mission & Values ── */}
      <section className="py-24 bg-dark-surface/30">
        <Container size="lg" className="px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="font-display text-4xl font-bold text-slate-100">
              Our Mission
            </h2>
            <div className="h-1 w-20 bg-gold mx-auto rounded-full" />
            <p className="text-slate-400 text-lg">
              Our mission is to make halal dining easier to navigate by
              providing transparent and accessible information, empowering
              Muslims to decide for themselves what aligns with their own level
              of halal observance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-dark-surface/60 p-10 rounded-2xl border border-gold/15 hover:border-gold/40 transition-colors group"
              >
                <Icon
                  size={44}
                  className="text-gold mb-6 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                <h3 className="font-display text-xl font-bold mb-4 text-slate-100">
                  {title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Team ── */}
      <section className="py-24">
        <Container size="lg" className="px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-bold mb-4 text-slate-100">
                Meet the Visionaries
              </h2>
              <p className="text-slate-400">
                A diverse group of developers, food critics, and community
                leaders united by a single purpose.
              </p>
            </div>
            <button className="text-gold font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Join Our Team <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(({ name, role, imageUrl, imageAlt, icons }) => (
              <div key={name} className="text-center group">
                <div className="relative mb-6 mx-auto w-full aspect-square max-w-60 rounded-t-full overflow-hidden border-4 border-gold/20 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full h-full object-cover rounded-t-full grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="font-display text-xl font-bold text-slate-100">
                  {name}
                </h4>
                <p className="text-gold text-sm font-medium mb-3">{role}</p>
                <div className="flex justify-center gap-4 text-slate-500">
                  {icons.map((Icon, i) => (
                    <Icon
                      key={i}
                      size={18}
                      className="cursor-pointer hover:text-gold transition-colors"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <Container size="lg">
          <div className="bg-gold rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-dark-bg/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-4 border-dark-bg/10 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <h2 className="font-display text-4xl md:text-5xl font-black text-dark-bg">
                Ready to find your next meal?
              </h2>
              <p className="text-dark-bg/80 text-lg font-medium max-w-xl mx-auto">
                Join over 500,000 community members discovering certified halal
                options worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/searchResults"
                  className="bg-dark-bg text-gold font-bold px-10 py-4 rounded-xl hover:scale-105 transition-transform"
                >
                  Explore Now
                </Link>
                <Link
                  href="/searchResults"
                  className="bg-dark-bg/20 text-dark-bg font-bold px-10 py-4 rounded-xl backdrop-blur-sm border border-dark-bg/10 hover:bg-dark-bg/30 transition-all"
                >
                  Explore Maps
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
