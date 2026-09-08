import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DataTable({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left text-[11px] tracking-wider text-muted-foreground uppercase">
            {head.map((h, i) => (
              <th
                key={h + i}
                className={cn("px-4 py-2.5 font-semibold whitespace-nowrap", h === "" && "text-right")}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>
  );
}

export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return <tr className={cn("transition-colors hover:bg-muted/40", className)}>{children}</tr>;
}

export function Cell({
  children,
  className,
  mono,
}: {
  children: ReactNode;
  className?: string;
  mono?: boolean;
}) {
  return <td className={cn("px-4 py-3 align-middle", mono && "num", className)}>{children}</td>;
}
