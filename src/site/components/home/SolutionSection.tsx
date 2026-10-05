import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock, TrendingUp, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import appointmentsAsset from "@/assets/current-dashboard/eye-appointments.png.asset.json";
import dashboardAsset from "@/assets/current-dashboard/dental-dashboard.png.asset.json";
import overviewAsset from "@/assets/current-dashboard/eye-overview.png.asset.json";

const appointmentsScreenshot = appointmentsAsset.url;
const dashboardScreenshot = dashboardAsset.url;
const overviewScreenshot = overviewAsset.url;

const results = [
  {
    icon: Clock,
    label: "Pillar One",
    value: "Native Clinical Workflows",
    sub: "Perio charting for dental. Refraction and lens orders for eye care. Real clinical tools, not blank notes.",
    image: appointmentsScreenshot,
    imageAlt: "Eye clinic appointments and patient schedule in Clinexus",
  },
  {
    icon: TrendingUp,
    label: "Pillar Two",
    value: "Specialty Operations",
    sub: "Multi visit treatment billing, specialized lab tracking and optical inventory, handled the way your field handles them.",
    image: dashboardScreenshot,
    imageAlt: "Eye clinic dashboard showing revenue and performance in Clinexus",
  },
  {
    icon: ShieldCheck,
    label: "Pillar Three",
    value: "One Platform, Distinct Systems",
    sub: "Every specialty gets its own dedicated system. No forced compromises.",
    image: overviewScreenshot,
    imageAlt: "Clinexus eye clinic overview with role-specific operational information",
  },
];

const PillarCard = ({
  result,
  index,
}: {
  result: (typeof results)[number];
  index: number;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="sticky"
      style={{ top: `${4 + index * 2.25}rem` }}
    >
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.06 }}
        className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl shadow-foreground/5"
      >
        {/* Framed product screenshot — padded, bordered, no overlap */}
        <div className="bg-muted/50 p-2 sm:p-3">
          <div className="aspect-[16/9] overflow-hidden rounded-lg border border-border/60 bg-background">
            <img
              src={result.image}
              alt={result.imageAlt}
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <result.icon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {result.label}
            </span>
          </div>
          <h3 className="text-lg font-bold text-foreground">{result.value}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {result.sub}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const SolutionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="site-section-light relative overflow-hidden py-24 md:py-32"
    >
      <div className="container relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Narrative column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              The Problem We Solve
            </span>
            <h2 className="mb-5 max-w-lg text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              When Healthcare Software Is Built for Everyone, It Works for No
              One
            </h2>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              A dental practice, an eye clinic, a diagnostic lab and a fertility
              centre work completely differently. Generic software forces your
              specialty's core clinical processes into text boxes, plugins and
              manual workarounds. Clinexus delivers a dedicated system built for
              the realities of your field.
            </p>
            <Link to="/industries">
              <Button className="gap-2 rounded-lg bg-primary px-8 text-primary-foreground shadow-md hover:opacity-90">
                See How We Do It <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Stacking pillar cards */}
          <div className="relative flex flex-col gap-10 pb-8">
            {results.map((result, i) => (
              <PillarCard key={result.label} result={result} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
