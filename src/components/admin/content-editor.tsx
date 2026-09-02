"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Save, Search } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PanelHeader } from "@/components/admin/shared";

interface ContentItem {
  id: string;
  value: string;
}

const GROUPS: { name: string; match: (key: string) => boolean }[] = [
  { name: "Navigation", match: (k) => k.startsWith("nav_") },
  { name: "Hero", match: (k) => k.startsWith("hero_") || k.startsWith("stat_") || k === "stats_label" },
  { name: "About", match: (k) => k.startsWith("about_") || k === "fields" },
  { name: "Products", match: (k) => k.startsWith("products_") },
  { name: "Career", match: (k) => k.startsWith("career_") },
  { name: "Gallery", match: (k) => k.startsWith("gallery_") },
  { name: "Reviews & Awards", match: (k) => k.startsWith("reviews_") || k.startsWith("review_") || k.startsWith("awards_") },
  { name: "Contact", match: (k) => k.startsWith("contact_") },
  { name: "Schedule", match: (k) => k.startsWith("schedule_") },
  { name: "Footer", match: (k) => k.startsWith("footer_") },
];

const JSON_KEYS = ["fields", "career_how_we_hire", "career_what_we_need", "schedule_topics"];

function groupOf(key: string): string {
  for (const g of GROUPS) {
    if (g.match(key)) return g.name;
  }
  return "Other";
}

function isValidJson(s: string): boolean {
  try {
    JSON.parse(s);
    return true;
  } catch {
    return false;
  }
}

export function ContentEditor() {
  const [items, setItems] = React.useState<ContentItem[]>([]);
  const [original, setOriginal] = React.useState<Record<string, string>>({});
  const [draft, setDraft] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content", { credentials: "same-origin" });
      if (!res.ok) throw new Error("Failed");
      const data: ContentItem[] = await res.json();
      setItems(data);
      const orig: Record<string, string> = {};
      for (const it of data) orig[it.id] = it.value;
      setOriginal(orig);
      setDraft(orig);
    } catch {
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const dirtyCount = React.useMemo(() => {
    let n = 0;
    for (const it of items) {
      if ((draft[it.id] ?? "") !== (original[it.id] ?? "")) n++;
    }
    return n;
  }, [items, draft, original]);

  const filtered = React.useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((it) => it.id.toLowerCase().includes(q) || it.value.toLowerCase().includes(q));
  }, [items, search]);

  const grouped = React.useMemo(() => {
    const map: Record<string, ContentItem[]> = {};
    for (const it of filtered) {
      const g = groupOf(it.id);
      if (!map[g]) map[g] = [];
      map[g].push(it);
    }
    return GROUPS.map((g) => ({ name: g.name, items: map[g.name] ?? [] })).filter((g) => g.items.length > 0);
  }, [filtered]);

  async function save() {
    const changed: { id: string; value: string }[] = [];
    for (const it of items) {
      if ((draft[it.id] ?? "") !== (original[it.id] ?? "")) {
        changed.push({ id: it.id, value: draft[it.id] ?? "" });
      }
    }
    if (changed.length === 0) {
      toast.info("Nothing to save");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ items: changed }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(`Saved ${changed.length} change${changed.length > 1 ? "s" : ""}`);
      const orig: Record<string, string> = { ...original };
      for (const c of changed) orig[c.id] = c.value;
      setOriginal(orig);
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div>
        <PanelHeader title="Site Content" description="Edit every text on the website." />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PanelHeader
        title="Site Content"
        description="Edit every text on the website. Changes go live immediately after saving."
        action={
          <div className="flex items-center gap-3">
            {dirtyCount > 0 ? (
              <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300">
                {dirtyCount} unsaved
              </Badge>
            ) : null}
            <Button onClick={save} disabled={saving || dirtyCount === 0} className="gap-2">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        }
      />

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search content keys..."
          className="pl-9"
        />
      </div>

      <div className="flex flex-col gap-8">
        {grouped.map((group) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{group.name}</h2>
              <Badge variant="outline" className="text-xs">{group.items.length}</Badge>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {group.items.map((it) => {
                const isJson = JSON_KEYS.includes(it.id);
                const val = draft[it.id] ?? "";
                const dirty = val !== (original[it.id] ?? "");
                const valid = !isJson || isValidJson(val);
                const long = val.length > 80 || val.includes("\n") || isJson;
                return (
                  <div
                    key={it.id}
                    className={`flex flex-col gap-1.5 rounded-xl border p-4 transition-colors ${
                      dirty ? "border-amber-400/50 bg-amber-50/40 dark:bg-amber-950/10" : "border-border/60 bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Label htmlFor={it.id} className="font-mono text-xs text-muted-foreground">
                        {it.id}
                      </Label>
                      <div className="flex items-center gap-1.5">
                        {isJson ? (
                          <Badge variant="outline" className="text-[10px]">JSON</Badge>
                        ) : null}
                        {dirty ? (
                          <Badge className="bg-amber-500/15 text-[10px] text-amber-700 dark:text-amber-300">edited</Badge>
                        ) : (
                          <Check className="size-3.5 text-emerald-500" />
                        )}
                      </div>
                    </div>
                    {long ? (
                      <Textarea
                        id={it.id}
                        value={val}
                        onChange={(e) => setDraft((p) => ({ ...p, [it.id]: e.target.value }))}
                        rows={isJson ? 6 : 3}
                        className={`font-mono text-xs ${!valid ? "border-destructive" : ""}`}
                      />
                    ) : (
                      <Input
                        id={it.id}
                        value={val}
                        onChange={(e) => setDraft((p) => ({ ...p, [it.id]: e.target.value }))}
                      />
                    )}
                    {isJson && !valid ? (
                      <span className="text-xs text-destructive">Invalid JSON — fix before saving</span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sticky save bar */}
      {dirtyCount > 0 ? (
        <div className="sticky bottom-4 mt-8 flex items-center justify-between gap-4 rounded-full border border-border/60 bg-card/95 px-5 py-3 shadow-lg backdrop-blur">
          <span className="text-sm font-medium text-foreground">
            {dirtyCount} unsaved change{dirtyCount > 1 ? "s" : ""}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setDraft(original)}>
              Discard
            </Button>
            <Button size="sm" onClick={save} disabled={saving} className="gap-2">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save Now
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
