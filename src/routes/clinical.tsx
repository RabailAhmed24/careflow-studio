import { createFileRoute, Link } from "@tanstack/react-router";
import { FileSignature, Pill, Stethoscope } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, Section } from "@/components/hms/page-header";
import { StatusBadge } from "@/components/hms/status-badge";
import { Cell, DataTable, Row } from "@/components/hms/table";
import { LocalSaveNotice } from "@/components/hms/sync-indicator";
import { clinicalHistory, medications, visits, vitalsHistory } from "@/lib/mock-data";

export const Route = createFileRoute("/clinical")({
  head: () => ({
    meta: [
      { title: "Clinical Records — Atrium Health HMS" },
      {
        name: "description",
        content: "Consultation notes, diagnoses, prescriptions and vitals history for the doctor workstation.",
      },
      { property: "og:title", content: "Clinical Records — Atrium Health HMS" },
      { property: "og:description", content: "Write consultation notes and prescriptions." },
    ],
  }),
  component: ClinicalPage,
});

function ClinicalPage() {
  const inConsult = visits.find((v) => v.status === "With doctor") ?? visits[0];
  const [note, setNote] = useState(
    "Presenting complaint: routine follow-up for hypertension. No chest pain, no dyspnoea.",
  );

  return (
    <>
      <PageHeader
        title="Clinical Records"
        subtitle={`Active consultation · ${inConsult.patient} · ${inConsult.visitNo}`}
        actions={
          <Button onClick={() => toast.success("Consultation note signed", { description: "Locked and added to the record." })}>
            <FileSignature className="size-4" /> Sign & close note
          </Button>
        }
      />

      <div className="grid gap-6 p-8 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Tabs defaultValue="note">
            <TabsList className="mb-4">
              <TabsTrigger value="note">Consultation note</TabsTrigger>
              <TabsTrigger value="rx">Prescription</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
            </TabsList>

            <TabsContent value="note">
              <Section title="SOAP note" description={`${inConsult.doctor} · ${inConsult.dept}`}>
                <div className="grid gap-4 p-5">
                  <div>
                    <Label className="text-xs">Subjective</Label>
                    <Textarea rows={3} className="mt-1.5" value={note} onChange={(e) => setNote(e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-xs">Objective / examination</Label>
                    <Textarea
                      rows={3}
                      className="mt-1.5"
                      defaultValue="BP 128/82, pulse 78 regular. Chest clear. Heart sounds normal, no murmurs. No pedal oedema."
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="text-xs">Assessment / diagnosis</Label>
                      <Input className="mt-1.5" defaultValue="Essential hypertension — controlled" />
                    </div>
                    <div>
                      <Label className="text-xs">ICD-10 code</Label>
                      <Input className="mt-1.5" defaultValue="I10" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Plan</Label>
                    <Textarea
                      rows={3}
                      className="mt-1.5"
                      defaultValue="Continue Amlodipine 5mg OD. HbA1c and fasting lipids ordered. Review in 4 weeks."
                    />
                  </div>
                  <LocalSaveNotice />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => toast.success("Draft saved locally")}>
                      Save draft
                    </Button>
                    <Button onClick={() => toast.success("Consultation note signed")}>Sign note</Button>
                  </div>
                </div>
              </Section>
            </TabsContent>

            <TabsContent value="rx">
              <Section
                title="Current prescription"
                actions={
                  <Button size="sm" variant="outline" onClick={() => toast.info("Medication picker would open here")}>
                    <Pill className="size-4" /> Add medicine
                  </Button>
                }
              >
                <DataTable head={["Medicine", "Dose", "Frequency", "Route", "Duration", "Instructions"]}>
                  {medications.map((m) => (
                    <Row key={m.id}>
                      <Cell className="font-medium">{m.drug}</Cell>
                      <Cell>{m.dose}</Cell>
                      <Cell>{m.freq}</Cell>
                      <Cell>{m.route}</Cell>
                      <Cell mono className="text-muted-foreground">{m.duration}</Cell>
                      <Cell className="text-muted-foreground">{m.note}</Cell>
                    </Row>
                  ))}
                </DataTable>
              </Section>
            </TabsContent>

            <TabsContent value="history">
              <Section title="Previous consultations">
                <ol className="space-y-4 p-5">
                  {clinicalHistory.map((h) => (
                    <li key={h.id} className="relative border-l-2 border-teal/30 pl-5">
                      <span className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-card bg-teal" />
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-navy">{h.diagnosis}</p>
                        <StatusBadge status="Completed" dot={false} />
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {h.date} · {h.doctor} · {h.dept}
                      </p>
                      <p className="mt-1.5 text-sm text-muted-foreground">{h.note}</p>
                    </li>
                  ))}
                </ol>
              </Section>
            </TabsContent>

            <TabsContent value="vitals">
              <Section title="Vitals trend">
                <DataTable head={["Date", "BP", "Pulse", "Temp (°C)", "SpO₂", "Weight (kg)", "BMI"]}>
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
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-6">
          <Section title="Patients with doctor">
            <ul className="divide-y divide-border">
              {visits
                .filter((v) => v.status !== "Closed")
                .map((v) => (
                  <li key={v.id} className="flex items-center gap-3 px-4 py-3">
                    <span className="num rounded bg-teal-soft px-1.5 py-0.5 text-[10px] font-bold text-teal">
                      {v.token}
                    </span>
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/patients/$id"
                        params={{ id: v.patientId }}
                        className="block truncate text-sm font-medium hover:text-teal"
                      >
                        {v.patient}
                      </Link>
                      <p className="truncate text-[11px] text-muted-foreground">{v.dept}</p>
                    </div>
                    <Stethoscope className="size-4 text-muted-foreground" />
                  </li>
                ))}
            </ul>
          </Section>

          <Section title="Clinical alerts">
            <div className="space-y-2 p-4 text-xs">
              <p className="rounded-md bg-danger-soft px-3 py-2 text-danger">Allergy: Penicillin — avoid beta-lactams.</p>
              <p className="rounded-md bg-warning-soft px-3 py-2 text-warning">HbA1c pending from 09:12 order.</p>
              <p className="rounded-md bg-teal-soft px-3 py-2 text-teal">Last BP reading within target range.</p>
            </div>
          </Section>
        </aside>
      </div>
    </>
  );
}
