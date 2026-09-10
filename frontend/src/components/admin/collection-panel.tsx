"use client";

import * as React from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ConfirmDelete,
  CrudDialog,
  EmptyState,
  LoadingRows,
  PanelHeader,
  type FieldConfig,
} from "@/components/admin/shared";

interface CollectionPanelProps<T extends { id: string }> {
  title: string;
  description?: string;
  endpoint: string; // e.g. "/api/admin/products"
  fields: FieldConfig[];
  renderRow: (item: T) => React.ReactNode;
  renderCard?: (item: T) => React.ReactNode; // for image-based collections
  cardView?: boolean;
  addLabel?: string;
}

export function CollectionPanel<T extends { id: string }>({
  title,
  description,
  endpoint,
  fields,
  renderRow,
  renderCard,
  cardView,
  addLabel = "Add New",
}: CollectionPanelProps<T>) {
  const [items, setItems] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<T | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(endpoint, { credentials: "same-origin" });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  React.useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(values: Record<string, unknown>) {
    const isEdit = !!editing;
    const url = isEdit ? `${endpoint}/${editing!.id}` : endpoint;
    const method = isEdit ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save");
      }
      toast.success(isEdit ? "Updated successfully" : "Created successfully");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
      throw e;
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const res = await fetch(`${endpoint}/${deleteId}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Deleted");
      await load();
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <div>
      <PanelHeader
        title={title}
        description={description}
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
            className="gap-2"
          >
            <Plus className="size-4" />
            {addLabel}
          </Button>
        }
      />

      {loading ? (
        <LoadingRows />
      ) : items.length === 0 ? (
        <EmptyState message={`No items yet. Click "${addLabel}" to add your first one.`} />
      ) : cardView && renderCard ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="group relative border-border/60 bg-card shadow-sm">
              {renderCard(item)}
              <CardContent className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  className="size-8"
                  onClick={() => {
                    setEditing(item);
                    setDialogOpen(true);
                  }}
                >
                  <Pencil className="size-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="size-8"
                  onClick={() => setDeleteId(item.id)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                {fields.slice(0, 4).map((f) => (
                  <TableHead key={f.name}>{f.label}</TableHead>
                ))}
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  {renderRow(item)}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8"
                        onClick={() => {
                          setEditing(item);
                          setDialogOpen(true);
                        }}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8 text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(item.id)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <CrudDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editing ? `Edit ${title}` : `Add ${title}`}
        fields={fields}
        initial={editing ?? undefined}
        onSubmit={handleSubmit}
      />

      <ConfirmDelete open={deleteId !== null} onOpenChange={(v) => !v && setDeleteId(null)} onConfirm={handleDelete} />
    </div>
  );
}

/* Helper to render a truncated cell */
export function Cell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <TableCell className={className}>{children}</TableCell>;
}

export { Badge };
