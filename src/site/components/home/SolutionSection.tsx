import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
    sub: "Perio charting for dental. Refraction and lens orders for eye care. Real clinical tools, not blank notes",
    color: "from-[hsl(var(--primary))] to-[hsl(var(--medical-teal))]",
    image: appointmentsScreenshot,
    imageAlt: "Eye clinic appointments and patient schedule in Clinexus",
  },
  {
    icon: TrendingUp,
    label: "Pillar Two",
    value: "Specialty Operations",
    sub: "Multi visit treatment billing, specialized lab tracking and optical inventory, handled the way your field handles them",
    color: "from-[hsl(var(--primary))] to-[hsl(var(--primary))]/60",
    image: dashboardScreenshot,
    imageAlt: "Eye clinic dashboard showing revenue and performance in Clinexus",
  },
  {
    icon: ShieldCheck,
    label: "Pillar Three",
    value: "One Platform, Distinct Systems",
    sub: "Every specialty gets its own dedicated system. No forced compromises",
    color: "from-[hsl(var(--medical-teal))] to-[hsl(var(--primary))]",
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
  const cardRef = useRef<HTMLDivElement>(null);

  // Image drifts inside its frame as the card scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : -24, reduceMotion ? 0 : 24]);

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{ top: `${5.5 + index * 1.75}rem` }}
    >
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 48, rotate: 1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.08 }}
        className="group w-full overflow-hidden rounded-3xl border border-border/50 bg-card shadow-2xl shadow-foreground/5"
      >
        <div className="relative aspect-[16/7] overflow-hidden border-b border-border/50 bg-muted/50">
          <motion.img
            src={result.image}
            alt={result.imageAlt}
            loading="lazy"
            style={{ y: imageY, scale: 1.12 }}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="p-6">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-muted/20">
            <result.icon className="h-5 w-5 text-primary" />
          </div>
          <div className="mb-1 text-sm text-muted-foreground">{result.label}</div>
          <div className={`bg-gradient-to-r ${result.color} bg-clip-text text-2xl font-extrabold text-transparent`}>
            {result.value}
          </div>
          <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{result.sub}</div>
        </div>
      </motion.div>
    </div>
  );
};

const SolutionSection = () => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 80, reduceMotion ? 0 : -80]);

  return (
    <section ref={sectionRef} className="relative site-section-light overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-background" />
      {/* Drifting glow accents */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute -left-24 bottom-24 h-72 w-72 rounded-full bg-[hsl(var(--medical-teal))]/10 blur-3xl"
      />

      <div className="container relative z-10">
        <div className="grid gap-16 lg:grid-cols-2">
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
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              When Healthcare Software Is Built for Everyone,{" "}
              <span className="text-muted-foreground">
                It Works for No One
              </span>
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground">
              A dental practice, an eye clinic, a diagnostic lab and a fertility centre work completely differently. Generic software forces your specialty's core clinical processes into text boxes, plugins and manual workarounds. Clinexus delivers a dedicated system built for the realities of your field.
            </p>
            <Link to="/industries">
              <Button className="gap-2 rounded-md bg-primary px-8 text-white shadow-md hover:opacity-90">
                See How We Do It <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Sticky-stacking pillar cards */}
          <div className="relative flex flex-col gap-6 pb-8">
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
