import { cn } from "@/lib/utils";

const TONES = {
  neutral: "bg-muted text-muted-foreground border-border",
  teal: "bg-teal-soft text-teal border-teal/25",
  navy: "bg-navy-soft text-navy border-navy/20",
  success: "bg-success-soft text-success border-success/25",
  warning: "bg-warning-soft text-warning border-warning/30",
  danger: "bg-danger-soft text-danger border-danger/25",
} as const;

export type Tone = keyof typeof TONES;

const MAP: Record<string, Tone> = {
  // appointments
  Scheduled: "navy",
  "Checked in": "teal",
  "In consultation": "warning",
  Completed: "success",
  Cancelled: "neutral",
  "No show": "danger",
  // visits
  Waiting: "warning",
  "Vitals done": "teal",
  "With doctor": "navy",
  "Awaiting results": "warning",
  "Ready for billing": "teal",
  Closed: "neutral",
  // orders
  Ordered: "navy",
  "Sample collected": "teal",
  "In progress": "warning",
  Resulted: "success",
  // billing
  Paid: "success",
  "Partially paid": "warning",
  Unpaid: "danger",
  Draft: "neutral",
  // users
  Active: "success",
  Inactive: "neutral",
  Suspended: "danger",
  Invited: "teal",
  // priority
  Routine: "neutral",
  Urgent: "warning",
  STAT: "danger",
  Available: "success",
  "On leave": "neutral",
};

export function StatusBadge({
  status,
  tone,
  className,
  dot = true,
}: {
  status: string;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  const t = tone ?? MAP[status] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        TONES[t],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current opacity-70" />}
      {status}
    </span>
  );
}
