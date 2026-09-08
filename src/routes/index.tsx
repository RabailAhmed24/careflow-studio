import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarPlus,
  ClipboardList,
  CreditCard,
  FilePlus2,
  Stethoscope,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, Section } from "@/components/hms/page-header";
import { StatusBadge } from "@/components/hms/status-badge";
import { useAppState } from "@/lib/app-state";
import {
  appointments,
  auditLog,
  bills,
  CURRENT_USERS,
  money,
  patients,
  pendingTasks,
  ROLE_LABEL,
  visits,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard — Atrium Health HMS" },
      { name: "description", content: "Today's queue, appointments, pending tasks and quick actions for hospital staff." },
      { property: "og:title", content: "Operations Dashboard — Atrium Health HMS" },
      { property: "og:description", content: "Today's queue, appointments, pending tasks and quick actions." },
    ],
  }),
  component: Dashboard,
});

const QUICK: { label: string; to: string; icon: typeof UserPlus; roles: string[] }[] = [
  { label: "Register patient", to: "/patients", icon: UserPlus, roles: ["admin", "receptionist"] },
  { label: "Book appointment", to: "/appointments", icon: CalendarPlus, roles: ["admin", "receptionist", "doctor"] },
  { label: "Start visit", to: "/visits", icon: Stethoscope, roles: ["admin", "receptionist", "doctor"] },
  { label: "Open consultation", to: "/clinical", icon: FilePlus2, roles: ["admin", "doctor"] },
  { label: "Place order", to: "/orders", icon: ClipboardList, roles: ["admin", "doctor"] },
  { label: "Create bill", to: "/billing", icon: CreditCard, roles: ["admin", "billing", "receptionist"] },
];

function Dashboard() {
  const { role } = useAppState();
  const user = CURRENT_USERS[role];
  const today = appointments.filter((a) => a.date === "2026-09-08");
  const queue = visits.filter((v) => v.status !== "Closed");
  const tasks = pendingTasks.filter((t) => t.role.includes(role));
  const outstanding = bills.reduce((s, b) => s + (b.total - b.paid), 0);

  const summary = [
    { label: "In queue now", value: queue.length, sub: "avg wait 11 min", tone: "teal" },
    { label: "Appointments today", value: today.length, sub: `${today.filter((a) => a.status === "Completed").length} completed`, tone: "navy" },
    { label: "Open orders", value: 5, sub: "2 results ready", tone: "teal" },
    { label: "Unbilled visits", value: 3, sub: money(outstanding) + " outstanding", tone: "navy" },
  ];

  return (
    <>
      <PageHeader
        title={`Good morning, ${user.name.replace("Dr. ", "Dr ")}`}
        subtitle={`${ROLE_LABEL[role]} · ${user.dept} · Tuesday, 08 September 2026`}
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/reports">View reports</Link>
            </Button>
            <Button asChild>
              <Link to="/patients">
                <UserPlus className="size-4" /> Register patient
              </Link>
            </Button>
          </>
        }
      />

      <div className="space-y-6 p-8">
        {/* quick actions */}
        <div className="flex flex-wrap gap-2.5">
          {QUICK.filter((q) => q.roles.includes(role)).map((q) => (
            <Link
              key={q.label}
              to={q.to}
              className="group flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-sm"
            >
              <q.icon className="size-4 text-teal" />
              {q.label}
              <ArrowRight className="size-3.5 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        {/* summaries */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map((s) => (
            <div key={s.label} className="card-surface flex items-center gap-4 p-4">
              <span className={`h-10 w-1 rounded-full ${s.tone === "teal" ? "bg-teal" : "bg-navy"}`} />
              <div>
                <p className="num font-display text-2xl font-bold text-navy">{s.value}</p>
                <p className="text-xs font-medium">{s.label}</p>
                <p className="text-[11px] text-muted-foreground">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <Section
              title="Live patient queue"
              description="Visits currently open across departments"
              actions={
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/visits">Open queue board</Link>
                </Button>
              }
            >
              <ul className="divide-y divide-border">
                {queue.map((v) => (
                  <li key={v.id} className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-muted/50">
                    <span className="num grid size-11 shrink-0 place-items-center rounded-md bg-teal-soft text-xs font-bold text-teal">
                      {v.token}
                    </span>
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/patients/$id"
                        params={{ id: v.patientId }}
                        className="truncate text-sm font-semibold hover:text-teal"
                      >
                        {v.patient}
                      </Link>
                      <p className="num truncate text-xs text-muted-foreground">
                        {v.mrn} · {v.visitNo} · {v.dept}
                      </p>
                    </div>
                    <div className="hidden text-right md:block">
                      <p className="text-xs font-medium">{v.doctor}</p>
                      <p className="text-[11px] text-muted-foreground">
                        Started {v.startedAt} · waited {v.waited}
                      </p>
                    </div>
                    <StatusBadge status={v.status} />
                  </li>
                ))}
              </ul>
            </Section>

            <Section
              title="Today's appointments"
              description="08 September 2026"
              actions={
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/appointments">Full schedule</Link>
                </Button>
              }
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-left text-[11px] tracking-wider text-muted-foreground uppercase">
                    <th className="px-5 py-2.5 font-semibold">Time</th>
                    <th className="px-3 py-2.5 font-semibold">Patient</th>
                    <th className="px-3 py-2.5 font-semibold">Provider</th>
                    <th className="px-3 py-2.5 font-semibold">Type</th>
                    <th className="px-5 py-2.5 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {today.slice(0, 7).map((a) => (
                    <tr key={a.id} className="transition-colors hover:bg-muted/40">
                      <td className="num px-5 py-2.5 font-semibold text-navy">{a.time}</td>
                      <td className="px-3 py-2.5">
                        <Link to="/patients/$id" params={{ id: a.patientId }} className="hover:text-teal">
                          {a.patient}
                        </Link>
                        <span className="num block text-[11px] text-muted-foreground">{a.mrn}</span>
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground">{a.doctor}</td>
                      <td className="px-3 py-2.5 text-muted-foreground">{a.type}</td>
                      <td className="px-5 py-2.5 text-right">
                        <StatusBadge status={a.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          </div>

          <div className="space-y-6">
            <Section title="Pending tasks" description={`${tasks.length} items need attention`}>
              <ul className="divide-y divide-border">
                {tasks.map((t) => (
                  <li key={t.id} className="flex gap-3 px-5 py-3">
                    <span
                      className={`mt-1.5 size-2 shrink-0 rounded-full ${
                        t.severity === "high" ? "bg-danger" : t.severity === "medium" ? "bg-warning" : "bg-teal"
                      }`}
                    />
                    <div>
                      <p className="text-sm leading-snug font-medium">{t.label}</p>
                      <p className="text-[11px] text-muted-foreground">{t.meta}</p>
                    </div>
                  </li>
                ))}
                {!tasks.length && (
                  <li className="px-5 py-6 text-center text-sm text-muted-foreground">Nothing pending. </li>
                )}
              </ul>
            </Section>

            <Section
              title="Recent patients"
              actions={
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/patients">All patients</Link>
                </Button>
              }
            >
              <ul className="divide-y divide-border">
                {patients.slice(0, 5).map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/patients/$id"
                      params={{ id: p.id }}
                      className="flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-muted/50"
                    >
                      <span className="grid size-8 place-items-center rounded-full bg-navy-soft text-[11px] font-bold text-navy">
                        {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{p.name}</p>
                        <p className="num truncate text-[11px] text-muted-foreground">
                          {p.mrn} · {p.gender}, {p.age}y
                        </p>
                      </div>
                      <span className="ml-auto text-[11px] text-muted-foreground">{p.lastVisit}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Activity log" description="Latest actions on this workstation">
              <ul className="divide-y divide-border">
                {auditLog.map((a) => (
                  <li key={a.id} className="flex gap-3 px-5 py-2.5 text-xs">
                    <span className="num shrink-0 text-muted-foreground">{a.time}</span>
                    <span>
                      <span className="font-medium">{a.user}</span> {a.action}{" "}
                      <span className="num text-teal">{a.target}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}
