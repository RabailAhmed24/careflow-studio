import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowRight, HeartPulse, PlayCircle, Timer } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageHeader, Section } from "@/components/hms/page-header";
import { StatusBadge } from "@/components/hms/status-badge";
import { Cell, DataTable, Row } from "@/components/hms/table";
import { LocalSaveNotice } from "@/components/hms/sync-indicator";
import { visits, type VisitStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/visits")({
  head: () => ({
    meta: [
      { title: "Visits & Queue — Atrium Health HMS" },
      {
        name: "description",
        content: "Live OPD queue, visit tokens, vitals capture and patient flow across departments.",
      },
      { property: "og:title", content: "Visits & Queue — Atrium Health HMS" },
      { property: "og:description", content: "Track live patient flow from check-in to billing." },
    ],
  }),
  component: VisitsPage,
});

const STAGES: VisitStatus[] = [
  "Waiting",
  "Vitals done",
  "With doctor",
  "Awaiting results",
  "Ready for billing",
];

function VisitsPage() {
  const [open, setOpen] = useState(false);
  const active = visits.filter((v) => v.status !== "Closed");
  const closed = visits.filter((v) => v.status === "Closed");

  return (
    <>
      <PageHeader
        title="Visits & Queue"
        subtitle="Live patient flow — 08 Sep 2026"
        actions={
          <div className="flex gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <HeartPulse className="size-4" /> Record vitals
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Record vitals</DialogTitle>
                  <DialogDescription>Triage measurements for the selected token.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["Blood pressure", "128/82 mmHg"],
                    ["Pulse", "78 bpm"],
                    ["Temperature", "36.8 °C"],
                    ["SpO₂", "98 %"],
                    ["Weight", "68.4 kg"],
                    ["Height", "168 cm"],
                  ].map(([l, ph]) => (
                    <div key={l}>
                      <Label className="text-xs">{l}</Label>
                      <Input className="mt-1.5" placeholder={ph} />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <LocalSaveNotice />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      toast.success("Vitals recorded", { description: "Queue status moved to Vitals done." });
                    }}
                  >
                    Save vitals
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={() => toast.success("Walk-in visit started", { description: "Token A-14 issued." })}>
              <PlayCircle className="size-4" /> Start walk-in visit
            </Button>
          </div>
        }
      />

      <div className="space-y-6 p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "In queue now", value: active.length, icon: Activity, hint: "Across 4 departments" },
            { label: "Average wait", value: "13 min", icon: Timer, hint: "Target under 20 min" },
            { label: "Longest wait", value: "22 min", icon: Timer, hint: "Mariam Shah · A-13" },
            { label: "Closed today", value: closed.length, icon: ArrowRight, hint: "Sent to billing" },
          ].map((k) => (
            <div key={k.label} className="card-surface p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{k.label}</p>
                <k.icon className="size-4 text-teal" />
              </div>
              <p className="num mt-2 text-2xl font-bold text-navy">{k.value}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{k.hint}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="board">
          <TabsList className="mb-4">
            <TabsTrigger value="board">Queue board</TabsTrigger>
            <TabsTrigger value="list">All visits</TabsTrigger>
          </TabsList>

          <TabsContent value="board">
            <div className="grid gap-4 lg:grid-cols-5">
              {STAGES.map((stage) => {
                const items = visits.filter((v) => v.status === stage);
                return (
                  <div key={stage} className="card-surface flex flex-col overflow-hidden">
                    <header className="flex items-center justify-between border-b border-border px-3 py-2.5">
                      <span className="text-xs font-semibold text-navy">{stage}</span>
                      <span className="num rounded-full bg-muted px-1.5 text-[10px] font-semibold text-muted-foreground">
                        {items.length}
                      </span>
                    </header>
                    <div className="flex-1 space-y-2 p-2.5">
                      {items.map((v) => (
                        <div key={v.id} className="rounded-md border border-border bg-surface p-2.5">
                          <div className="flex items-center justify-between">
                            <span className="num rounded bg-teal-soft px-1.5 py-0.5 text-[10px] font-bold text-teal">
                              {v.token}
                            </span>
                            <span className="num text-[10px] text-muted-foreground">{v.waited}</span>
                          </div>
                          <Link
                            to="/patients/$id"
                            params={{ id: v.patientId }}
                            className="mt-1.5 block text-sm font-medium hover:text-teal"
                          >
                            {v.patient}
                          </Link>
                          <p className="text-[11px] text-muted-foreground">{v.doctor}</p>
                          <p className="text-[11px] text-muted-foreground">{v.dept}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-1.5 h-7 w-full justify-center text-[11px] text-teal"
                            onClick={() => toast.success("Moved to next stage", { description: `${v.patient} · ${v.token}` })}
                          >
                            Advance <ArrowRight className="size-3" />
                          </Button>
                        </div>
                      ))}
                      {!items.length && (
                        <p className="py-6 text-center text-[11px] text-muted-foreground">Empty</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <Section title={`${visits.length} visits`} description="Includes closed visits from previous days">
              <DataTable head={["Token", "Visit no.", "Patient", "Provider", "Department", "Type", "Started", "Waited", "Status", ""]}>
                {visits.map((v) => (
                  <Row key={v.id}>
                    <Cell mono className="font-semibold text-teal">{v.token}</Cell>
                    <Cell mono className="text-muted-foreground">{v.visitNo}</Cell>
                    <Cell>
                      <Link to="/patients/$id" params={{ id: v.patientId }} className="font-medium hover:text-teal">
                        {v.patient}
                      </Link>
                      <span className="num block text-[11px] text-muted-foreground">{v.mrn}</span>
                    </Cell>
                    <Cell>{v.doctor}</Cell>
                    <Cell className="text-muted-foreground">{v.dept}</Cell>
                    <Cell>{v.type}</Cell>
                    <Cell mono className="text-muted-foreground">{v.startedAt}</Cell>
                    <Cell mono className="text-muted-foreground">{v.waited}</Cell>
                    <Cell><StatusBadge status={v.status} /></Cell>
                    <Cell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => toast.info("Visit summary would open here")}>
                        Open
                      </Button>
                    </Cell>
                  </Row>
                ))}
              </DataTable>
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
