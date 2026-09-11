import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Image as ImageIcon, Search, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Cell, DataTable, Row } from "@/components/hms/table";
import { LocalSaveNotice } from "@/components/hms/sync-indicator";
import { documents, patients } from "@/lib/mock-data";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Patient Documents — Atrium Health HMS" },
      {
        name: "description",
        content: "Upload and browse lab reports, imaging, consents, insurance cards and discharge summaries.",
      },
      { property: "og:title", content: "Patient Documents — Atrium Health HMS" },
      { property: "og:description", content: "Central document library for every patient record." },
    ],
  }),
  component: DocumentsPage,
});

const CATEGORIES = ["Lab report", "Radiology", "Consent", "Insurance", "Referral", "Discharge"];

function DocumentsPage() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const list = documents.filter(
    (d) =>
      (cat === "all" || d.category === cat) &&
      (d.name.toLowerCase().includes(q.toLowerCase()) || d.patient.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <>
      <PageHeader
        title="Patient Documents"
        subtitle="Scanned reports, consents and insurance paperwork"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="size-4" /> Upload document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload document</DialogTitle>
                <DialogDescription>Attach a file to a patient record.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div>
                  <Label className="text-xs">Patient</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Select patient" />
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
                  <Label className="text-xs">Category</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <label className="grid cursor-pointer place-items-center gap-2 rounded-lg border border-dashed border-border bg-surface px-4 py-8 text-center text-xs text-muted-foreground transition-colors hover:border-teal hover:text-teal">
                  <Upload className="size-5" />
                  Drag a file here or click to browse (PDF, JPG, PNG — max 20 MB)
                  <input type="file" className="hidden" />
                </label>
                <LocalSaveNotice />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                    toast.success("Document queued for upload");
                  }}
                >
                  Upload
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="space-y-6 p-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-64 flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by file name or patient"
              className="pl-9"
            />
          </div>
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Section title={`${list.length} documents`} description="Sorted by upload date">
          <DataTable head={["File", "Patient", "Category", "Type", "Size", "Uploaded by", "Uploaded", ""]}>
            {list.map((d) => (
              <Row key={d.id}>
                <Cell>
                  <span className="flex items-center gap-2 font-medium">
                    {d.type === "Image" ? (
                      <ImageIcon className="size-4 text-teal" />
                    ) : (
                      <FileText className="size-4 text-navy" />
                    )}
                    {d.name}
                  </span>
                </Cell>
                <Cell>
                  {d.patient}
                  <span className="num block text-[11px] text-muted-foreground">{d.mrn}</span>
                </Cell>
                <Cell className="text-muted-foreground">{d.category}</Cell>
                <Cell>{d.type}</Cell>
                <Cell mono className="text-muted-foreground">{d.size}</Cell>
                <Cell>{d.uploadedBy}</Cell>
                <Cell className="text-muted-foreground">{d.uploaded}</Cell>
                <Cell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => toast.info("Preview would open here")}>
                    Preview
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toast.success("Download started")}>
                    <Download className="size-4" />
                  </Button>
                </Cell>
              </Row>
            ))}
            {!list.length && (
              <Row>
                <Cell className="py-10 text-center text-muted-foreground">No documents match this filter.</Cell>
              </Row>
            )}
          </DataTable>
        </Section>
      </div>
    </>
  );
}
