import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Search, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, Section } from "@/components/hms/page-header";
import { StatusBadge } from "@/components/hms/status-badge";
import { Cell, DataTable, Row } from "@/components/hms/table";
import { LocalSaveNotice } from "@/components/hms/sync-indicator";
import { money, patients } from "@/lib/mock-data";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/patients/")({
  head: () => ({
    meta: [
      { title: "Patients — Atrium Health HMS" },
      { name: "description", content: "Search, register and manage the hospital patient register." },
      { property: "og:title", content: "Patients — Atrium Health HMS" },
      { property: "og:description", content: "Search, register and manage hospital patients." },
    ],
  }),
  component: PatientsPage,
});

function PatientsPage() {
  const [q, setQ] = useState("");
  const [gender, setGender] = useState("all");
  const [open, setOpen] = useState(false);
  const { queueLocal } = useAppState();

  const rows = useMemo(
    () =>
      patients.filter(
        (p) =>
          (gender === "all" || p.gender.toLowerCase() === gender) &&
          (q === "" ||
            [p.name, p.mrn, p.phone, p.cnic].join(" ").toLowerCase().includes(q.toLowerCase())),
      ),
    [q, gender],
  );

  return (
    <>
      <PageHeader
        title="Patient register"
        subtitle={`${patients.length} registered patients · 12 registered this week`}
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="size-4" /> Register patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Register new patient</DialogTitle>
                <DialogDescription>
                  A hospital MRN is generated automatically once the record is saved.
                </DialogDescription>
              </DialogHeader>
              <div className="grid max-h-[60vh] gap-5 overflow-y-auto pr-1">
                <FormGrid title="Demographics">
                  <Field label="Full name" placeholder="e.g. Ayesha Rahman" required />
                  <Field label="Father / husband name" placeholder="Guardian name" />
                  <SelectField label="Gender" options={["Male", "Female", "Other"]} />
                  <Field label="Date of birth" type="date" required />
                  <Field label="CNIC / B-Form" placeholder="42101-0000000-0" />
                  <SelectField label="Blood group" options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />
                </FormGrid>
                <FormGrid title="Contact">
                  <Field label="Mobile number" placeholder="+92 3xx xxxxxxx" required />
                  <Field label="Alternate number" placeholder="Optional" />
                  <Field label="City" placeholder="Karachi" />
                  <SelectField label="Payer" options={["Self-pay", "State Life", "EFU Health", "Jubilee Health", "Adamjee Health"]} />
                  <div className="sm:col-span-2">
                    <Label className="text-xs">Address</Label>
                    <Textarea rows={2} placeholder="House / street / area" className="mt-1.5" />
                  </div>
                </FormGrid>
                <FormGrid title="Clinical flags">
                  <Field label="Known allergies" placeholder="e.g. Penicillin" />
                  <Field label="Chronic conditions" placeholder="e.g. Hypertension" />
                </FormGrid>
                <LocalSaveNotice />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                    queueLocal();
                    toast.success("Patient saved locally", {
                      description: "This record will sync automatically when the connection is restored.",
                    });
                  }}
                >
                  Save patient
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="space-y-6 p-8">
        <Section
          title="Search patients"
          description="Search by name, MRN, mobile number or CNIC"
          actions={
            <Button variant="outline" size="sm">
              <Filter className="size-3.5" /> More filters
            </Button>
          }
        >
          <div className="flex flex-wrap items-center gap-3 px-5 py-4">
            <div className="relative min-w-72 flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Start typing a name, MRN or phone number…"
                className="pl-9"
              />
            </div>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All payers</SelectItem>
                <SelectItem value="self">Self-pay</SelectItem>
                <SelectItem value="ins">Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DataTable head={["Patient", "MRN", "Age / Gender", "Contact", "Payer", "Last visit", "Balance", ""]}>
            {rows.map((p) => (
              <Row key={p.id}>
                <Cell>
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-teal-soft text-xs font-bold text-teal">
                      {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </span>
                    <div>
                      <Link
                        to="/patients/$id"
                        params={{ id: p.id }}
                        className="font-medium hover:text-teal hover:underline"
                      >
                        {p.name}
                      </Link>
                      <p className="text-[11px] text-muted-foreground">
                        {p.conditions.length ? p.conditions.join(", ") : "No chronic conditions"}
                      </p>
                    </div>
                  </div>
                </Cell>
                <Cell mono className="text-muted-foreground">
                  {p.mrn}
                </Cell>
                <Cell>
                  {p.age}y · {p.gender}
                </Cell>
                <Cell mono className="text-muted-foreground">
                  {p.phone}
                </Cell>
                <Cell className="text-muted-foreground">{p.insurance}</Cell>
                <Cell mono className="text-muted-foreground">
                  {p.lastVisit}
                </Cell>
                <Cell>
                  {p.balance > 0 ? (
                    <StatusBadge status={money(p.balance)} tone="warning" dot={false} />
                  ) : (
                    <StatusBadge status="Settled" tone="success" dot={false} />
                  )}
                </Cell>
                <Cell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/patients/$id" params={{ id: p.id }}>
                      Open
                    </Link>
                  </Button>
                </Cell>
              </Row>
            ))}
          </DataTable>
          <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
            <span>
              Showing {rows.length} of {patients.length} patients
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

function FormGrid({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-[11px] font-semibold tracking-wider text-teal uppercase">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label className="text-xs">
        {label} {required && <span className="text-danger">*</span>}
      </Label>
      <Input type={type} placeholder={placeholder} className="mt-1.5" />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <Select>
        <SelectTrigger className="mt-1.5 w-full">
          <SelectValue placeholder="Select…" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
