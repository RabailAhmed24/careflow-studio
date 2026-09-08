import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { patients, appointments, bills } from "@/lib/mock-data";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (to: string, params?: Record<string, string>) => {
    setOpen(false);
    navigate({ to, params } as never);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-full max-w-xl items-center gap-2.5 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:border-teal/40 hover:bg-teal-soft/40"
      >
        <Search className="size-4 text-teal" />
        <span>Search patients, MRN, phone, invoice…</span>
        <kbd className="num ml-auto rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">Ctrl K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a patient name, MRN, phone number or invoice…" />
        <CommandList>
          <CommandEmpty>No matching records.</CommandEmpty>
          <CommandGroup heading="Patients">
            {patients.map((p) => (
              <CommandItem
                key={p.id}
                value={`${p.name} ${p.mrn} ${p.phone} ${p.cnic}`}
                onSelect={() => go("/patients/$id", { id: p.id })}
              >
                <span className="font-medium">{p.name}</span>
                <span className="num ml-2 text-xs text-muted-foreground">{p.mrn}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {p.gender} · {p.age}y · {p.phone}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Today's appointments">
            {appointments
              .filter((a) => a.date === "2026-09-08")
              .slice(0, 5)
              .map((a) => (
                <CommandItem key={a.id} value={`${a.patient} ${a.doctor} appointment`} onSelect={() => go("/appointments")}>
                  <span className="num text-xs">{a.time}</span>
                  <span className="ml-2">{a.patient}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{a.doctor}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Invoices">
            {bills.slice(0, 4).map((b) => (
              <CommandItem key={b.id} value={`${b.invoice} ${b.patient}`} onSelect={() => go("/billing")}>
                <span className="num">{b.invoice}</span>
                <span className="ml-2 text-xs text-muted-foreground">{b.patient}</span>
                <span className="ml-auto text-xs">{b.status}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
