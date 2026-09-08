import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarPlus,
  CreditCard,
  FileText,
  Pencil,
  Phone,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, Section } from "@/components/hms/page-header";
import { StatusBadge } from "@/components/hms/status-badge";
import { Cell, DataTable, Row } from "@/components/hms/table";
import {
  appointments,
  bills,
  clinicalHistory,
  documents,
  money,
  orders,
  patientById,
  visits,
  vitalsHistory,
} from "@/lib/mock-data";

export const Route = createFileRoute("/patients/$id")({
  loader: ({ params }) => {
    const patient = patientById(params.id);
    if (!patient) throw notFound();
    return { patient };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Patient not found — Atrium Health HMS" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.patient.name} — Patient record`;
    return {
      meta: [
        { title: t },
        { name: "description", content: `Clinical and administrative record for ${loaderData.patient.name}.` },
        { property: "og:title", content: t },
        { property: "og:description", content: "Patient record in Atrium Health HMS." },
      ],
    };
  },
  component: PatientProfile,
});

function PatientProfile() {
  const { patient: p } = Route.useLoaderData();
  const pAppts = appointments.filter((a) => a.patientId === p.id);
  const pVisits = visits.filter((v) => v.patientId === p.id);
  const pOrders = orders.filter((o) => o.mrn === p.mrn);
  const pDocs = documents.filter((d) => d.mrn === p.mrn);
  const pBills = bills.filter((b) => b.mrn === p.mrn);

  return (
    <>
      <PageHeader
        title={p.name}
        subtitle={`${p.mrn} · ${p.gender}, ${p.age} years · Registered ${p.registered}`}
        actions={
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/patients">
                <ArrowLeft className="size-4" /> All patients
              </Link>
            </Button>
            <Button variant="outline">
              <Pencil className="size-4" /> Edit patient
            </Button>
            <Button variant="outline" asChild>
              <Link to="/appointments">
                <CalendarPlus className="size-4" /> Book appointment
              </Link>
            </Button>
            <Button asChild>
              <Link to="/visits">
                <Stethoscope className="size-4" /> Start visit
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-6 p-8 xl:grid-cols-[300px_1fr]">
        <aside className="space-y-4">
          <div className="card-surface p-5 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-teal-soft font-display text-xl font-bold text-teal">
              {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </span>
            <h2 className="mt-3 text-base font-bold text-navy">{p.name}</h2>
            <p className="num text-xs text-muted-foreground">{p.mrn}</p>
            <div className="mt-3 flex justify-center gap-2">
              <StatusBadge status={p.bloodGroup} tone="danger" dot={false} />
              <StatusBadge status={p.insurance === "Self-pay" ? "Self-pay" : "Insured"} tone="navy" dot={false} />
            </div>
          </div>

          {p.allergies.length > 0 && (
            <div className="rounded-lg border border-danger/25 bg-danger-soft p-4">
              <p className="flex items-center gap-2 text-xs font-bold text-danger">
                <TriangleAlert className="size-4" /> Allergies
              </p>
              <ul className="mt-2 space-y-1 text-xs text-danger">
                {p.allergies.map((a) => (
                  <li key={a}>• {a}</li>
                ))}
              </ul>
            </div>
          )}

          <Section title="Demographics">
            <dl className="divide-y divide-border text-xs">
              {[
                ["Date of birth", p.dob],
                ["CNIC / B-Form", p.cnic],
                ["Mobile", p.phone],
                ["City", p.city],
                ["Address", p.address],
                ["Payer", p.insurance],
                ["Last visit", p.lastVisit],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 px-4 py-2.5">
                  <dt className="w-24 shrink-0 text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Account">
            <div className="space-y-3 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">Outstanding balance</span>
                <span className={`num text-lg font-bold ${p.balance > 0 ? "text-danger" : "text-success"}`}>
                  {money(p.balance)}
                </span>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/billing">
                  <CreditCard className="size-3.5" /> Open billing
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="w-full">
                <Phone className="size-3.5" /> Call patient
              </Button>
            </div>
          </Section>
        </aside>

        <div>
          <Tabs defaultValue="summary">
            <TabsList className="mb-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="visits">Visits ({pVisits.length})</TabsTrigger>
              <TabsTrigger value="appointments">Appointments ({pAppts.length})</TabsTrigger>
              <TabsTrigger value="clinical">Clinical history</TabsTrigger>
              <TabsTrigger value="orders">Orders ({pOrders.length})</TabsTrigger>
              <TabsTrigger value="documents">Documents ({pDocs.length})</TabsTrigger>
              <TabsTrigger value="billing">Billing ({pBills.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { l: "Chronic conditions", v: p.conditions.length ? p.conditions.join(", ") : "None recorded" },
                  { l: "Active medications", v: "2 ongoing prescriptions" },
                  { l: "Next appointment", v: pAppts.find((a) => a.status === "Scheduled")?.date ?? "Not scheduled" },
                ].map((x) => (
                  <div key={x.l} className="card-surface p-4">
                    <p className="text-[11px] tracking-wider text-muted-foreground uppercase">{x.l}</p>
                    <p className="mt-1 text-sm font-semibold">{x.v}</p>
                  </div>
                ))}
              </div>

              <Section title="Recorded vitals" description="Last three encounters">
                <DataTable head={["Date", "BP", "Pulse", "Temp °C", "SpO₂", "Weight kg", "BMI"]}>
                  {vitalsHistory.map((v) => (
                    <Row key={v.date}>
                      <Cell className="font-medium">{v.date}</Cell>
                      <Cell mono>{v.bp}</Cell>
                      <Cell mono>{v.pulse}</Cell>
                      <Cell mono>{v.temp}</Cell>
                      <Cell mono>{v.spo2}%</Cell>
                      <Cell mono>{v.weight}</Cell>
                      <Cell mono>{v.bmi}</Cell>
                    </Row>
                  ))}
                </DataTable>
              </Section>

              <Section title="Care timeline">
                <ol className="relative space-y-5 px-6 py-5">
                  {clinicalHistory.map((c) => (
                    <li key={c.id} className="relative border-l border-border pb-1 pl-6">
                      <span className="absolute top-1 -left-[5px] size-2.5 rounded-full bg-teal ring-4 ring-card" />
                      <p className="text-xs text-muted-foreground">
                        {c.date} · {c.doctor} · {c.dept}
                      </p>
                      <p className="text-sm font-semibold text-navy">{c.diagnosis}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{c.note}</p>
                    </li>
                  ))}
                </ol>
              </Section>
            </TabsContent>

            <TabsContent value="visits">
              <Section title="Visits / encounters">
                <DataTable head={["Visit no", "Date / time", "Department", "Provider", "Type", "Status"]}>
                  {pVisits.map((v) => (
                    <Row key={v.id}>
                      <Cell mono className="font-medium text-teal">
                        {v.visitNo}
                      </Cell>
                      <Cell>{v.startedAt}</Cell>
                      <Cell>{v.dept}</Cell>
                      <Cell className="text-muted-foreground">{v.doctor}</Cell>
                      <Cell>{v.type}</Cell>
                      <Cell>
                        <StatusBadge status={v.status} />
                      </Cell>
                    </Row>
                  ))}
                </DataTable>
              </Section>
            </TabsContent>

            <TabsContent value="appointments">
              <Section title="Appointments">
                <DataTable head={["Date", "Time", "Provider", "Department", "Type", "Status", ""]}>
                  {pAppts.map((a) => (
                    <Row key={a.id}>
                      <Cell mono>{a.date}</Cell>
                      <Cell mono className="font-semibold text-navy">
                        {a.time}
                      </Cell>
                      <Cell>{a.doctor}</Cell>
                      <Cell className="text-muted-foreground">{a.dept}</Cell>
                      <Cell>{a.type}</Cell>
                      <Cell>
                        <StatusBadge status={a.status} />
                      </Cell>
                      <Cell className="text-right">
                        <Button variant="ghost" size="sm">
                          Reschedule
                        </Button>
                      </Cell>
                    </Row>
                  ))}
                </DataTable>
              </Section>
            </TabsContent>

            <TabsContent value="clinical" className="space-y-4">
              {clinicalHistory.map((c) => (
                <Section key={c.id} title={c.diagnosis} description={`${c.date} · ${c.doctor} · ${c.dept}`}>
                  <p className="px-5 py-4 text-sm text-muted-foreground">{c.note}</p>
                </Section>
              ))}
              <Button variant="outline" asChild>
                <Link to="/clinical">
                  <FileText className="size-4" /> Open consultation workspace
                </Link>
              </Button>
            </TabsContent>

            <TabsContent value="orders">
              <Section title="Orders & investigations">
                <DataTable head={["Order", "Category", "Investigation", "Priority", "Status", "Result"]}>
                  {pOrders.map((o) => (
                    <Row key={o.id}>
                      <Cell mono className="text-teal">
                        {o.orderNo}
                      </Cell>
                      <Cell>{o.category}</Cell>
                      <Cell className="font-medium">{o.item}</Cell>
                      <Cell>
                        <StatusBadge status={o.priority} />
                      </Cell>
                      <Cell>
                        <StatusBadge status={o.status} />
                      </Cell>
                      <Cell className="text-muted-foreground">{o.result ?? "—"}</Cell>
                    </Row>
                  ))}
                </DataTable>
              </Section>
            </TabsContent>

            <TabsContent value="documents">
              <Section title="Patient documents">
                <DataTable head={["Document", "Category", "Type", "Size", "Uploaded by", "Date"]}>
                  {pDocs.map((d) => (
                    <Row key={d.id}>
                      <Cell className="font-medium">{d.name}</Cell>
                      <Cell>
                        <StatusBadge status={d.category} tone="teal" dot={false} />
                      </Cell>
                      <Cell>{d.type}</Cell>
                      <Cell mono className="text-muted-foreground">
                        {d.size}
                      </Cell>
                      <Cell className="text-muted-foreground">{d.uploadedBy}</Cell>
                      <Cell className="text-muted-foreground">{d.uploaded}</Cell>
                    </Row>
                  ))}
                </DataTable>
              </Section>
            </TabsContent>

            <TabsContent value="billing">
              <Section title="Billing history">
                <DataTable head={["Invoice", "Visit", "Date", "Total", "Paid", "Balance", "Status"]}>
                  {pBills.map((b) => (
                    <Row key={b.id}>
                      <Cell mono className="text-teal">
                        {b.invoice}
                      </Cell>
                      <Cell mono className="text-muted-foreground">
                        {b.visitNo}
                      </Cell>
                      <Cell>{b.date}</Cell>
                      <Cell mono>{money(b.total)}</Cell>
                      <Cell mono>{money(b.paid)}</Cell>
                      <Cell mono className={b.total - b.paid > 0 ? "font-semibold text-danger" : ""}>
                        {money(b.total - b.paid)}
                      </Cell>
                      <Cell>
                        <StatusBadge status={b.status} />
                      </Cell>
                    </Row>
                  ))}
                </DataTable>
              </Section>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
