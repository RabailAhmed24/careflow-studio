import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CalendarPlus, ChevronLeft, ChevronRight, List, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { appointments, departments, doctors, patients } from "@/lib/mock-data";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — Atrium Health HMS" },
      { name: "description", content: "Daily appointment schedule, provider calendar, booking, rescheduling and cancellation." },
      { property: "og:title", content: "Appointments — Atrium Health HMS" },
      { property: "og:description", content: "Schedule, reschedule and manage hospital appointments." },
    ],
  }),
  component: AppointmentsPage,
});

const SLOTS = ["08:30", "09:00", "09:20", "09:40", "10:00", "10:30", "11:00", "11:30", "12:00"];

function AppointmentsPage() {
  const [date, setDate] = useState("2026-09-08");
  const [dept, setDept] = useState("all");
  const [open, setOpen] = useState(false);

  const list = appointments.filter(
    (a) => a.date === date && (dept === "all" || a.dept === dept),
  );

  return (
    <>
      <PageHeader
        title="Appointments"
        subtitle="Provider schedule and booking desk"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <CalendarPlus className="size-4" /> New appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create appointment</DialogTitle>
                <DialogDescription>Link an existing patient to a provider slot.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label className="text-xs">Patient</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Search patient by name or MRN…" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name} — {p.mrn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Department / service</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => (
                        <SelectItem key={d.id} value={d.name}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Provider</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name} — {d.room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Date</Label>
                  <Input type="date" defaultValue="2026-09-09" className="mt-1.5" />
                </div>
                <div>
                  <Label className="text-xs">Time slot</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Available slots" />
                    </SelectTrigger>
                    <SelectContent>
                      {SLOTS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">Reason for visit</Label>
                  <Textarea rows={2} className="mt-1.5" placeholder="Brief reason / referral note" />
                </div>
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
                    toast.success("Appointment booked", { description: "Slot confirmed and SMS queued for the patient." });
                  }}
                >
                  Book appointment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="space-y-6 p-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 rounded-md border border-border bg-card p-1">
            <Button variant="ghost" size="icon" onClick={() => setDate("2026-09-08")}>
              <ChevronLeft className="size-4" />
            </Button>
            <span className="px-2 text-sm font-semibold text-navy">
              {date === "2026-09-08" ? "Tue, 08 Sep 2026" : date === "2026-09-09" ? "Wed, 09 Sep 2026" : "Thu, 10 Sep 2026"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDate(date === "2026-09-08" ? "2026-09-09" : "2026-09-10")}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger className="w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d.id} value={d.name}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative min-w-64 flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Filter by patient or provider" className="pl-9" />
          </div>
        </div>

        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list">
              <List className="size-4" /> List
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarDays className="size-4" /> Schedule grid
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Section title={`${list.length} appointments`} description="Ordered by start time">
              <DataTable head={["Time", "Patient", "Provider", "Department", "Room", "Type", "Status", ""]}>
                {list.map((a) => (
                  <Row key={a.id}>
                    <Cell mono className="font-semibold text-navy">
                      {a.time}
                    </Cell>
                    <Cell>
                      <Link to="/patients/$id" params={{ id: a.patientId }} className="font-medium hover:text-teal">
                        {a.patient}
                      </Link>
                      <span className="num block text-[11px] text-muted-foreground">{a.mrn}</span>
                    </Cell>
                    <Cell>{a.doctor}</Cell>
                    <Cell className="text-muted-foreground">{a.dept}</Cell>
                    <Cell mono className="text-muted-foreground">
                      {a.room}
                    </Cell>
                    <Cell>{a.type}</Cell>
                    <Cell>
                      <StatusBadge status={a.status} />
                    </Cell>
                    <Cell className="text-right whitespace-nowrap">
                      <Button variant="ghost" size="sm" onClick={() => toast.info("Reschedule drawer would open here")}>
                        Reschedule
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-danger"
                        onClick={() => toast.warning("Appointment cancelled", { description: `${a.patient} · ${a.time}` })}
                      >
                        Cancel
                      </Button>
                    </Cell>
                  </Row>
                ))}
                {!list.length && (
                  <Row>
                    <Cell className="py-10 text-center text-muted-foreground" >
                      No appointments for this filter.
                    </Cell>
                  </Row>
                )}
              </DataTable>
            </Section>
          </TabsContent>

          <TabsContent value="calendar">
            <Section title="Provider schedule grid" description={`Day view · ${list.length} booked slots`}>
              <div className="overflow-x-auto p-5">
                <div className="grid min-w-[900px] grid-cols-[80px_repeat(5,1fr)] gap-px rounded-lg bg-border">
                  <div className="bg-muted/60 px-3 py-2 text-[11px] font-semibold text-muted-foreground uppercase">
                    Time
                  </div>
                  {doctors.map((d) => (
                    <div key={d.id} className="bg-muted/60 px-3 py-2">
                      <p className="text-xs font-semibold text-navy">{d.name}</p>
                      <p className="text-[11px] text-muted-foreground">{d.dept}</p>
                    </div>
                  ))}
                  {SLOTS.map((slot) => (
                    <div key={slot} className="contents">
                      <div className="num bg-card px-3 py-3 text-xs text-muted-foreground">{slot}</div>
                      {doctors.map((d) => {
                        const appt = list.find((a) => a.time === slot && a.doctor === d.name);
                        return (
                          <div key={d.id + slot} className="min-h-14 bg-card p-1.5">
                            {appt ? (
                              <div
                                className={`h-full rounded-md border-l-2 px-2 py-1.5 text-[11px] ${
                                  appt.status === "Cancelled"
                                    ? "border-border bg-muted text-muted-foreground line-through"
                                    : "border-teal bg-teal-soft"
                                }`}
                              >
                                <p className="truncate font-semibold">{appt.patient}</p>
                                <p className="truncate opacity-75">{appt.type}</p>
                              </div>
                            ) : (
                              <button className="h-full w-full rounded-md border border-dashed border-border text-[11px] text-muted-foreground transition-colors hover:border-teal hover:text-teal">
                                Free
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
