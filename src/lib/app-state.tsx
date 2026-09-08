import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Role } from "./mock-data";

export type SyncState = "online" | "offline" | "syncing" | "synced" | "failed";

type AppState = {
  role: Role;
  setRole: (r: Role) => void;
  sync: SyncState;
  setSync: (s: SyncState) => void;
  pending: number;
  setPending: (n: number) => void;
  queueLocal: (n?: number) => void;
  retrySync: () => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("receptionist");
  const [sync, setSync] = useState<SyncState>("online");
  const [pending, setPending] = useState(3);

  const queueLocal = useCallback((n = 1) => setPending((p) => p + n), []);

  const retrySync = useCallback(() => {
    setSync("syncing");
    window.setTimeout(() => {
      setPending(0);
      setSync("synced");
      window.setTimeout(() => setSync("online"), 2500);
    }, 1600);
  }, []);

  const value = useMemo(
    () => ({ role, setRole, sync, setSync, pending, setPending, queueLocal, retrySync }),
    [role, sync, pending, queueLocal, retrySync],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
