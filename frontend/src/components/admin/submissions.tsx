"use client";

import * as React from "react";
import { toast } from "sonner";
import { Check, Mail, MapPin, MessageSquare, Phone, Star, Trash2, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConfirmDelete, EmptyState, LoadingRows, PanelHeader } from "@/components/admin/shared";

/* ============ Reviews Moderation ============ */

interface Review {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  rating: number;
  message: string;
  avatarUrl?: string | null;
  approved: boolean;
  createdAt: string;
}

export function ReviewsPanel() {
  const [items, setItems] = React.useState<Review[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState<"all" | "pending" | "approved">("all");
  const [viewing, setViewing] = React.useState<Review | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reviews", { credentials: "same-origin" });
      if (!res.ok) throw new Error();
      setItems(await res.json());
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  async function toggleApproval(r: Review) {
    try {
      const res = await fetch(`/api/admin/reviews/${r.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ approved: !r.approved }),
      });
      if (!res.ok) throw new Error();
      toast.success(r.approved ? "Review hidden" : "Review approved & published");
      await load();
    } catch {
      toast.error("Failed to update");
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/reviews/${deleteId}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (!res.ok) throw new Error();
      toast.success("Review deleted");
      await load();
    } catch {
      toast.error("Failed to delete");
    }
  }

  const filtered = items.filter((r) =>
    filter === "all" ? true : filter === "pending" ? !r.approved : r.approved
  );

  return (
    <div>
      <PanelHeader
        title="Reviews"
        description="Moderate reviews submitted by clients. Pending reviews need approval before going live."
        action={
          <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      {loading ? (
        <LoadingRows />
      ) : filtered.length === 0 ? (
        <EmptyState message="No reviews in this filter." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((r) => {
            const initials = r.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
            return (
              <Card key={r.id} className={`border-border/60 shadow-sm ${!r.approved ? "ring-1 ring-amber-400/40" : ""}`}>
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        {r.avatarUrl ? <AvatarImage src={r.avatarUrl} alt={r.name} /> : null}
                        <AvatarFallback className="gradient-amber text-xs font-bold text-primary-foreground">{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.role}{r.company ? ` @ ${r.company}` : ""}</div>
                      </div>
                    </div>
                    {r.approved ? (
                      <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">Approved</Badge>
                    ) : (
                      <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300">Pending</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`size-4 ${i < r.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/40"}`} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">"{r.message}"</p>
                  <div className="flex items-center gap-2 pt-1">
                    <Button size="sm" variant={r.approved ? "outline" : "default"} className="gap-1.5" onClick={() => toggleApproval(r)}>
                      {r.approved ? <><X className="size-3.5" /> Unpublish</> : <><Check className="size-3.5" /> Approve</>}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setViewing(r)}>
                      View
                    </Button>
                    <Button size="sm" variant="ghost" className="ml-auto text-destructive" onClick={() => setDeleteId(r.id)}>
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={!!viewing} onOpenChange={(v) => !v && setViewing(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Review by {viewing?.name}</DialogTitle>
          </DialogHeader>
          {viewing ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-5 ${i < viewing.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/40"}`} />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground">"{viewing.message}"</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span>{viewing.email}</span>
                <span>{viewing.role}{viewing.company ? ` @ ${viewing.company}` : ""}</span>
                <span>{new Date(viewing.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmDelete open={deleteId !== null} onOpenChange={(v) => !v && setDeleteId(null)} onConfirm={handleDelete} title="Delete this review?" />
    </div>
  );
}

/* ============ Scheduled Calls ============ */

interface Call {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  topic: string;
  date: string;
  timeSlot: string;
  message?: string | null;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  confirmed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  cancelled: "bg-red-500/15 text-red-700 dark:text-red-300",
  completed: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
};

export function CallsPanel() {
  const [items, setItems] = React.useState<Call[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/calls", { credentials: "same-origin" });
      if (!res.ok) throw new Error();
      setItems(await res.json());
    } catch {
      toast.error("Failed to load calls");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/calls/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      toast.success("Status updated");
      await load();
    } catch {
      toast.error("Failed to update");
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/calls/${deleteId}`, { method: "DELETE", credentials: "same-origin" });
      if (!res.ok) throw new Error();
      toast.success("Call deleted");
      await load();
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <div>
      <PanelHeader title="Scheduled Calls" description="Meeting requests submitted via the /schedule page." />
      {loading ? (
        <LoadingRows />
      ) : items.length === 0 ? (
        <EmptyState message="No scheduled calls yet." />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {items.map((c) => (
            <Card key={c.id} className="border-border/60 shadow-sm">
              <CardContent className="flex flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-foreground">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.company || "No company"}</div>
                  </div>
                  <Badge className={STATUS_COLORS[c.status] ?? ""}>{c.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Mail className="size-3.5" /> {c.email}</span>
                  <span className="flex items-center gap-1.5"><Phone className="size-3.5" /> {c.phone}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="size-3.5" /> {c.date}</span>
                  <span className="flex items-center gap-1.5"><MessageSquare className="size-3.5" /> {c.timeSlot}</span>
                </div>
                <div className="rounded-lg bg-muted/60 p-2.5 text-xs">
                  <span className="font-medium text-foreground">Topic: </span>
                  <span className="text-muted-foreground">{c.topic}</span>
                </div>
                {c.message ? <p className="text-xs text-muted-foreground">"{c.message}"</p> : null}
                <div className="flex items-center gap-2 pt-1">
                  <Select value={c.status} onValueChange={(v) => updateStatus(c.id, v)}>
                    <SelectTrigger className="h-8 w-[140px] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">pending</SelectItem>
                      <SelectItem value="confirmed">confirmed</SelectItem>
                      <SelectItem value="cancelled">cancelled</SelectItem>
                      <SelectItem value="completed">completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="ghost" className="ml-auto text-destructive" onClick={() => setDeleteId(c.id)}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <ConfirmDelete open={deleteId !== null} onOpenChange={(v) => !v && setDeleteId(null)} onConfirm={handleDelete} title="Delete this scheduled call?" />
    </div>
  );
}

/* ============ Contact Messages ============ */

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function MessagesPanel() {
  const [items, setItems] = React.useState<Message[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [viewing, setViewing] = React.useState<Message | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages", { credentials: "same-origin" });
      if (!res.ok) throw new Error();
      setItems(await res.json());
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  async function toggleRead(m: Message) {
    try {
      const res = await fetch(`/api/admin/messages/${m.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ read: !m.read }),
      });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      toast.error("Failed to update");
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/messages/${deleteId}`, { method: "DELETE", credentials: "same-origin" });
      if (!res.ok) throw new Error();
      toast.success("Message deleted");
      await load();
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <div>
      <PanelHeader title="Messages" description="Contact form submissions from the website." />
      {loading ? (
        <LoadingRows />
      ) : items.length === 0 ? (
        <EmptyState message="No messages yet." />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((m) => (
                <TableRow key={m.id} className={!m.read ? "bg-amber-50/50 dark:bg-amber-950/10" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {!m.read ? <span className="size-2 rounded-full bg-amber-500" /> : null}
                      <div>
                        <div className="text-sm font-medium text-foreground">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-foreground">{m.subject}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{m.message}</div>
                  </TableCell>
                  <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" className="size-8" onClick={() => { setViewing(m); if (!m.read) toggleRead(m); }}>
                        <MessageSquare className="size-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="size-8 text-destructive" onClick={() => setDeleteId(m.id)}>
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

      <Dialog open={!!viewing} onOpenChange={(v) => !v && setViewing(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewing?.subject}</DialogTitle>
          </DialogHeader>
          {viewing ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span><strong className="text-foreground">{viewing.name}</strong></span>
                <span>{viewing.email}</span>
                {viewing.phone ? <span>{viewing.phone}</span> : null}
                <span>{new Date(viewing.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{viewing.message}</p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmDelete open={deleteId !== null} onOpenChange={(v) => !v && setDeleteId(null)} onConfirm={handleDelete} title="Delete this message?" />
    </div>
  );
}
