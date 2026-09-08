import { CheckCircle2, CloudOff, RefreshCw, TriangleAlert, Wifi } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function SyncIndicator() {
  const { sync, setSync, pending, retrySync } = useAppState();

  const map = {
    online: { icon: Wifi, label: "Online", cls: "text-success", ring: "bg-success" },
    offline: { icon: CloudOff, label: "Offline", cls: "text-warning", ring: "bg-warning" },
    syncing: { icon: RefreshCw, label: "Syncing…", cls: "text-teal", ring: "bg-teal" },
    synced: { icon: CheckCircle2, label: "Sync complete", cls: "text-success", ring: "bg-success" },
    failed: { icon: TriangleAlert, label: "Sync failed", cls: "text-danger", ring: "bg-danger" },
  } as const;

  const s = map[sync];
  const Icon = s.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted">
          <span className="relative flex size-2">
            <span className={`absolute inline-flex size-2 rounded-full opacity-60 ${s.ring}`} />
            <span className={`relative inline-flex size-2 rounded-full ${s.ring}`} />
          </span>
          <span className={s.cls}>{s.label}</span>
          {pending > 0 && sync !== "synced" && (
            <span className="num rounded-full bg-navy-soft px-1.5 py-0.5 text-[10px] font-semibold text-navy">
              {pending} pending
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Icon className={`size-4 ${s.cls} ${sync === "syncing" ? "animate-spin" : ""}`} />
          Workstation connectivity
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="space-y-2 px-2 py-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Status</span>
            <span className={`font-medium ${s.cls}`}>{s.label}</span>
          </div>
          <div className="flex justify-between">
            <span>Records waiting to sync</span>
            <span className="num font-medium text-foreground">{pending}</span>
          </div>
          <div className="flex justify-between">
            <span>Last successful sync</span>
            <span className="font-medium text-foreground">08 Sep 2026, 09:26</span>
          </div>
          {sync === "offline" && (
            <p className="rounded-md bg-warning-soft px-2 py-2 text-warning">
              Saved locally. These records will sync automatically when the connection is restored.
            </p>
          )}
          {sync === "failed" && (
            <p className="rounded-md bg-danger-soft px-2 py-2 text-danger">
              Sync failed — the server rejected 1 record. Nothing was lost; retry when ready.
            </p>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="flex gap-2 p-2">
          <Button size="sm" className="flex-1" onClick={retrySync}>
            <RefreshCw className="size-3.5" /> Sync now
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => setSync(sync === "offline" ? "online" : "offline")}
          >
            {sync === "offline" ? "Simulate online" : "Simulate offline"}
          </Button>
        </div>
        <DropdownMenuItem className="text-xs text-muted-foreground" onClick={() => setSync("failed")}>
          Simulate a failed sync
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LocalSaveNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`flex items-start gap-2 rounded-md bg-teal-soft px-3 py-2 text-xs text-teal ${className}`}>
      <CloudOff className="mt-0.5 size-3.5 shrink-0" />
      Saved locally. This record will sync automatically when the connection is restored.
    </p>
  );
}
