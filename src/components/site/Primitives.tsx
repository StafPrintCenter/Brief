import { motion } from "motion/react";
import { Check, Info } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function SelectCard({
  selected,
  onClick,
  emoji,
  title,
  description,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  emoji?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={cn(
        "group relative flex w-full items-start gap-3 rounded-2xl border bg-card p-4 text-left transition-colors cursor-pointer",
        selected
          ? "border-primary bg-accent/60 shadow-soft"
          : "border-border hover:border-primary/50 hover:bg-surface",
        className,
      )}
    >
      {emoji ? <span className="text-2xl leading-none">{emoji}</span> : null}
      <span className="flex-1">
        <span className="block font-display text-[0.98rem] font-semibold text-foreground">
          {title}
        </span>
        {description ? (
          <span className="mt-1 block text-sm text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-all",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border text-transparent",
        )}
      >
        <Check className="size-3.5" strokeWidth={3} />
      </span>
      {selected ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-primary/40"
        />
      ) : null}
    </motion.button>
  );
}

export function InfoTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label="Explication"
          onClick={(e) => {
            e.preventDefault();
            setOpen((prev) => !prev);
          }}
          className="inline-flex size-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary focus:outline-none"
        >
          <Info className="size-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent
        className="max-w-[16rem] text-sm"
        onPointerDownOutside={() => setOpen(false)}
      >
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

export function FieldLabel({
  children,
  tip,
}: {
  children: ReactNode;
  tip?: string;
}) {
  return (
    <div className="mb-2 flex items-center gap-1.5">
      <span className="text-sm font-medium text-foreground">{children}</span>
      {tip ? <InfoTip text={tip} /> : null}
    </div>
  );
}

export function StepHeading({
  step,
  title,
  subtitle,
}: {
  step: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        Étape {step} / 6
      </span>
      <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
