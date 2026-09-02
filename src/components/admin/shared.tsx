"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2, PackageOpen } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

/* ---------------- Panel header ---------------- */
export function PanelHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

/* ---------------- Empty state ---------------- */
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/50 px-6 py-16 text-center">
      <PackageOpen className="size-10 text-muted-foreground/60" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

/* ---------------- Loading grid ---------------- */
export function LoadingRows({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  );
}

/* ---------------- Confirm delete dialog ---------------- */
export function ConfirmDelete({
  open,
  onOpenChange,
  onConfirm,
  title = "Delete this item?",
  description = "This action cannot be undone.",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Field config for generic CRUD ---------------- */
export type FieldType = "text" | "textarea" | "number" | "switch" | "url";

export interface FieldConfig {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  placeholder?: string;
  full?: boolean; // span full width in grid
}

/* ---------------- Generic CRUD dialog (create + edit) ---------------- */
export function CrudDialog({
  open,
  onOpenChange,
  title,
  fields,
  initial,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  fields: FieldConfig[];
  initial?: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => Promise<void>;
}) {
  const [values, setValues] = React.useState<Record<string, unknown>>({});
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      const init: Record<string, unknown> = {};
      for (const f of fields) {
        init[f.name] = initial?.[f.name] ?? (f.type === "switch" ? false : f.type === "number" ? 0 : "");
      }
      setValues(init);
    }
  }, [open, initial, fields]);

  function set(name: string, v: unknown) {
    setValues((prev) => ({ ...prev, [name]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && (values[f.name] === "" || values[f.name] === undefined || values[f.name] === null)) {
        toast.error(`${f.label} is required`);
        return;
      }
    }
    setSaving(true);
    try {
      await onSubmit(values);
      onOpenChange(false);
    } catch {
      // toast handled by caller
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
          {fields.map((f) => {
            const colSpan = f.full ? "sm:col-span-2" : "";
            const val = values[f.name];
            if (f.type === "switch") {
              return (
                <div key={f.name} className={`flex items-center justify-between gap-3 rounded-lg border border-border/60 p-3 ${colSpan}`}>
                  <Label htmlFor={f.name} className="text-sm font-medium">{f.label}</Label>
                  <Switch id={f.name} checked={!!val} onCheckedChange={(v) => set(f.name, v)} />
                </div>
              );
            }
            if (f.type === "textarea") {
              return (
                <div key={f.name} className={`flex flex-col gap-1.5 ${colSpan}`}>
                  <Label htmlFor={f.name} className="text-sm font-medium">
                    {f.label} {f.required ? <span className="text-destructive">*</span> : null}
                  </Label>
                  <Textarea
                    id={f.name}
                    value={(val as string) ?? ""}
                    onChange={(e) => set(f.name, e.target.value)}
                    placeholder={f.placeholder}
                    rows={4}
                  />
                </div>
              );
            }
            return (
              <div key={f.name} className={`flex flex-col gap-1.5 ${colSpan}`}>
                <Label htmlFor={f.name} className="text-sm font-medium">
                  {f.label} {f.required ? <span className="text-destructive">*</span> : null}
                </Label>
                <Input
                  id={f.name}
                  type={f.type === "number" ? "number" : "text"}
                  value={(val as string) ?? ""}
                  onChange={(e) => set(f.name, f.type === "number" ? Number(e.target.value) : e.target.value)}
                  placeholder={f.placeholder}
                />
              </div>
            );
          })}
          <DialogFooter className="gap-2 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="gap-2">
              {saving ? <Loader2 className="size-4 animate-spin" /> : null}
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Fade-in wrapper ---------------- */
export function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
