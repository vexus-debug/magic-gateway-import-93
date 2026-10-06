import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  HiSignal,
  HiUsers,
  HiChartBar,
  HiArrowTrendingUp,
  HiClock,
  HiExclamationTriangle,
} from "react-icons/hi2";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const panelShadow =
  "shadow-[0px_3px_8px_-1px_rgba(0,0,0,0.03),0px_1px_2px_-1px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)]";

const WorkflowPanel = () => (
  <div
    className={`bg-background dark:bg-background/60 flex min-h-[350px] flex-col justify-between rounded-[2rem] p-4 ${panelShadow}`}
  >
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground flex items-center gap-1 text-sm">
        <HiSignal className="text-primary h-4 w-4" />
        Today's schedule
      </span>
      <span className="text-primary text-xs">● live</span>
    </div>

    <div className="flex items-end justify-between">
      <div className="text-foreground text-4xl font-semibold">24 visits</div>
      <div className="text-primary text-sm">+12%</div>
    </div>

    <div className="flex h-24 items-end gap-2">
      {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
        <div
          key={i}
          className="bg-primary/80 w-full rounded-md"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>

    <div className="grid grid-cols-2 gap-3 text-sm">
      <div className="bg-muted rounded-lg p-3">
        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          <HiClock className="h-3 w-3" />
          Charting
        </div>
        <div className="text-foreground text-lg font-medium">3.2 min</div>
      </div>
      <div className="bg-muted rounded-lg p-3">
        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          <HiExclamationTriangle className="h-3 w-3" />
          Wait time
        </div>
        <div className="text-primary text-lg font-medium">4 min</div>
      </div>
    </div>
  </div>
);

const OperationsPanel = () => (
  <div
    className={`bg-background dark:bg-background/60 flex min-h-[350px] flex-col justify-between rounded-[2rem] p-4 ${panelShadow}`}
  >
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground flex items-center gap-1 text-sm">
        <HiUsers className="text-primary h-4 w-4" />
        Specialty ops
      </span>
      <span className="text-muted-foreground text-xs">3 workflows</span>
    </div>

    <div className="flex items-center justify-center">
      <div className="border-primary/20 relative flex h-28 w-28 items-center justify-center rounded-full border-8">
        <div className="border-primary absolute h-full w-full rotate-45 rounded-full border-8 border-t-transparent" />
        <span className="text-foreground text-xl font-semibold">92%</span>
      </div>
    </div>

    <div className="space-y-3">
      {[
        { name: "Dental billing", value: "98%" },
        { name: "Lab case tracking", value: "91%" },
        { name: "Optical inventory", value: "87%" },
      ].map((item) => (
        <div key={item.name} className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{item.name}</span>
          <span className="text-foreground font-medium">{item.value}</span>
        </div>
      ))}
    </div>

    <div className="flex gap-2">
      <div className="bg-primary h-2 flex-1 rounded-full" />
      <div className="bg-primary/60 h-2 flex-1 rounded-full" />
      <div className="bg-primary/30 h-2 flex-1 rounded-full" />
    </div>
  </div>
);

const SystemsPanel = () => (
  <div
    className={`bg-background dark:bg-background/60 flex min-h-[350px] flex-col justify-between rounded-[2rem] p-4 ${panelShadow}`}
  >
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground flex items-center gap-1 text-sm">
        <HiChartBar className="text-primary h-4 w-4" />
        Systems live
      </span>
      <span className="text-primary border-primary/20 bg-primary/5 rounded-3xl border px-2 text-xs">
        +6.2%
      </span>
    </div>

    <div className="text-foreground text-5xl font-semibold">9</div>

    <div className="space-y-4">
      {[
        { label: "Dentistry", value: 96 },
        { label: "Eye care", value: 94 },
        { label: "Diagnostics", value: 90 },
      ].map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </div>
          <div className="bg-muted h-2 w-full rounded-full">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="bg-muted flex justify-between rounded-lg p-3 text-sm">
      <span className="text-muted-foreground flex items-center gap-1">
        <HiArrowTrendingUp className="h-4 w-4" />
        Coverage
      </span>
      <span className="text-primary font-medium">Expanding</span>
    </div>
  </div>
);

const pillars = [
  {
    title: "Native Clinical Workflows",
    sub: "Perio charting for dental. Refraction and lens orders for eye care. Real clinical tools, not blank notes.",
    panel: <WorkflowPanel />,
  },
  {
    title: "Specialty Operations",
    sub: "Multi visit treatment billing, specialized lab tracking and optical inventory, handled the way your field handles them.",
    panel: <OperationsPanel />,
  },
  {
    title: "One Platform, Distinct Systems",
    sub: "Every specialty gets its own dedicated system. No forced compromises.",
    panel: <SystemsPanel />,
  },
];

const PillarCard = ({ pillar, index }: { pillar: (typeof pillars)[number]; index: number }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.06 }}
      className="h-full"
    >
      <Card className="bg-muted/40 flex h-full flex-col rounded-[40px] p-0 border-border/60">
        <CardContent className="flex h-full flex-col gap-8 p-4">
          <div className="text-center">
            <h3 className="text-foreground text-2xl font-semibold">{pillar.title}</h3>
            <p className="text-muted-foreground mt-1.5 text-sm/6 leading-relaxed">
              {pillar.sub}
            </p>
          </div>
          {pillar.panel}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const SolutionSection = () => {
  return (
    <section className="site-section-light relative overflow-hidden py-20 md:py-28">
      <div className="container relative z-10 flex w-full flex-col items-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary"
        >
          The Problem We Solve
        </motion.span>
        <motion.h2
          initial={useReducedMotion() ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-foreground max-w-2xl text-center text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
        >
          When Healthcare Software Is Built for Everyone, It Works for No One
        </motion.h2>

        <p className="text-muted-foreground mt-4 max-w-2xl text-center text-base leading-relaxed">
          A dental practice, an eye clinic, a diagnostic lab and a fertility
          centre work completely differently. Generic software forces your
          specialty's core clinical processes into text boxes, plugins and
          manual workarounds. Clinexus delivers a dedicated system built for
          the realities of your field.
        </p>

        <div className="mt-12 grid w-full max-w-6xl items-stretch gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <Link to="/industries">
            <Button className="gap-2 rounded-lg bg-primary px-8 text-primary-foreground shadow-md hover:opacity-90">
              See How We Do It <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
