import { motion } from "motion/react";

interface StepProgressBarProps {
  steps: string[];
  currentStep: number;
}

export function StepProgressBar({ steps, currentStep }: StepProgressBarProps) {
  return (
    <div className="no-print mb-8">
      <div className="flex items-center gap-2">
        {steps.map((label, i) => {
          const index = i + 1;
          const done = index < currentStep;
          const active = index === currentStep;
          return (
            <div key={label} className="flex flex-1 flex-col gap-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
                <motion.div
                  initial={false}
                  animate={{ width: done || active ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full bg-gradient-ember"
                />
              </div>
              <span
                className={`hidden text-xs sm:block ${active ? "font-semibold text-foreground" : "text-muted-foreground"
                  }`}
              >
                {index}. {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}