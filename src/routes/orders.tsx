import { createFileRoute } from "@tanstack/react-router";
import { ClipboardPlus, FlaskConical, Scan, Search, Syringe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { orders, patients, rateCatalogue } from "@/lib/mock-data";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Orders & Investigations — Atrium Health HMS" },
      {
        name: "description",
        content: "Laboratory, radiology and procedure orders with priority, tracking and results review.",
      },
      { property: "og:title", content: "Orders & Investigations — Atrium Health HMS" },
      { property: "og:description", content: "Place and track lab, imaging and procedure orders." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState(false);
  const list = orders.filter((o) => cat === "all" || o.category === cat);

  return (
    <>
      <PageHeader
        title="Orders & Investigations"
        subtitle="Laboratory, radiology and bedside procedures"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <ClipboardPlus className="size-4" /> New order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Place an order</DialogTitle>
                <DialogDescription>Choose the patient and the investigation to be performed.</DialogDescription>
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
                <div className="sm:col-span-2">
                  <Label className="text-xs">Investigation / service</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Select from catalogue" />
                    </SelectTrigger>
                    <SelectContent>
                      {rateCatalogue.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name} — {s.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Priority</Label>
                  <Select defaultValue="Routine">
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Routine", "Urgent", "STAT"].map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Requested for</Label>
                  <Input type="date" defaultValue="2026-09-08" className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">Clinical notes to lab</Label>
                  <Textarea rows={2} className="mt-1.5" placeholder="Relevant history, fasting status, suspected diagnosis" />
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
                    toast.success("Order placed", { description: "Sent to the department worklist." });
                  }}
                >
                  Place order
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="space-y-6 p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Laboratory", icon: FlaskConical, count: orders.filter((o) => o.category === "Laboratory").length },
            { label: "Radiology", icon: Scan, count: orders.filter((o) => o.category === "Radiology").length },
            { label: "Procedure", icon: Syringe, count: orders.filter((o) => o.category === "Procedure").length },
          ].map((c) => (
            <button
              key={c.label}
              onClick={() => setCat(cat === c.label ? "all" : c.label)}
              className={`card-surface flex items-center gap-3 p-4 text-left transition-colors ${
                cat === c.label ? "ring-2 ring-teal" : "hover:bg-muted/40"
              }`}
            >
              <span className="grid size-10 place-items-center rounded-lg bg-teal-soft">
                <c.icon className="size-5 text-teal" />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground">{c.label} orders</span>
                <span className="num block text-xl font-bold text-navy">{c.count}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-64 flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by order number, patient or test" className="pl-9" />
          </div>
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {["Laboratory", "Radiology", "Procedure"].map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Section title={`${list.length} orders`} description="Most recent first">
          <DataTable head={["Order no.", "Patient", "Investigation", "Category", "Ordered by", "Placed", "Priority", "Status", ""]}>
            {list.map((o) => (
              <Row key={o.id}>
                <Cell mono className="font-semibold text-navy">{o.orderNo}</Cell>
                <Cell>
                  <span className="font-medium">{o.patient}</span>
                  <span className="num block text-[11px] text-muted-foreground">{o.mrn}</span>
                </Cell>
                <Cell>
                  {o.item}
                  {o.result && <span className="block text-[11px] text-teal">{o.result}</span>}
                </Cell>
                <Cell className="text-muted-foreground">{o.category}</Cell>
                <Cell>{o.orderedBy}</Cell>
                <Cell mono className="text-muted-foreground">{o.placed}</Cell>
                <Cell><StatusBadge status={o.priority} /></Cell>
                <Cell><StatusBadge status={o.status} /></Cell>
                <Cell className="text-right whitespace-nowrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      o.result
                        ? toast.info("Result", { description: o.result })
                        : toast.info("Result not available yet")
                    }
                  >
                    View result
                  </Button>
                </Cell>
              </Row>
            ))}
          </DataTable>
        </Section>
      </div>
    </>
  );
}
