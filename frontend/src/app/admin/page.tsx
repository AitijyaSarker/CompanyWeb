"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Bell,
  Box,
  Briefcase,
  Calendar,
  Clock,
  FileText,
  Images,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Star,
  Sun,
  Tags,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Award as AwardRecord, GalleryImage, Product, ServiceCategory, Vacancy } from "@/hooks/use-site-data";

import { CollectionPanel } from "@/components/admin/collection-panel";
import { ContentEditor } from "@/components/admin/content-editor";
import { Overview } from "@/components/admin/overview";
import { CallsPanel, MessagesPanel, ReviewsPanel } from "@/components/admin/submissions";

/* ---------------- Theme toggle ---------------- */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="size-9" />;
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9 rounded-full"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}

/* ---------------- Login ---------------- */
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (res.status === 429) {
          throw new Error("Too many login attempts. Wait 15 minutes or restart the Render service, then try again.");
        }
        throw new Error(err.error || "Invalid credentials");
      }
      toast.success("Welcome back!");
      onLogin();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--brand-cyan)/50 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <Card className="technical-border border-border/60 shadow-xl">
          <CardContent className="flex flex-col gap-6 p-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <img src="/UltrabulbLogoLight.png" alt="ULTRABULB IT" className="size-20 object-contain block dark:hidden" />
              <img src="/UltrabulbLogoDark.png" alt="ULTRABULB IT" className="size-20 object-contain hidden dark:block" />
              <div>
                <h1 className="text-xl font-bold text-foreground">ULTRABULB IT Admin</h1>
                <p className="text-sm text-muted-foreground">Sign in to manage your website</p>
              </div>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ultrabulb.com"
                  autoComplete="username"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" disabled={loading} className="mt-2 gap-2">
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="rounded-lg border border-dashed border-border/60 bg-muted/40 p-3 text-center text-xs text-muted-foreground">
              Demo credentials: <strong className="text-foreground">admin@ultrabulb.com</strong> / <strong className="text-foreground">admin123</strong>
            </div>

            <Link href="/" className="text-center text-xs text-muted-foreground transition-colors hover:text-foreground">
              ← Back to website
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

type AdminNotification = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

function Notifications({ onOpenMessages }: { onOpenMessages: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<AdminNotification[]>([]);

  React.useEffect(() => {
    const refresh = () => {
      void fetch("/api/admin/messages", { credentials: "same-origin" })
        .then((response) => (response.ok ? response.json() : []))
        .then((messages: AdminNotification[]) => setItems(messages));
    };
    refresh();
    const timer = window.setInterval(refresh, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const unread = items.filter((item) => !item.read).length;

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative size-9" aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`} onClick={() => setOpen((value) => !value)}>
        <Bell className="size-4" />
        {unread > 0 ? <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-(--brand-cyan) text-[10px] font-bold text-(--brand-navy-dark)">{unread > 9 ? "9+" : unread}</span> : null}
      </Button>
      {open ? (
        <div className="absolute right-0 top-11 z-50 w-80 rounded-xl border border-border/70 bg-popover p-3 text-popover-foreground shadow-xl">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-sm font-semibold">Notifications</span>
            <span className="text-xs text-muted-foreground">{unread} unread</span>
          </div>
          <div className="max-h-72 space-y-1 overflow-y-auto">
            {items.slice(0, 5).map((item) => (
              <button key={item.id} type="button" className="w-full rounded-lg p-2 text-left transition-colors hover:bg-accent" onClick={() => { setOpen(false); onOpenMessages(); }}>
                <div className="flex items-start gap-2">
                  {!item.read ? <span className="mt-1.5 size-2 shrink-0 rounded-full bg-(--brand-cyan)" /> : <span className="mt-1.5 size-2 shrink-0" />}
                  <span className="min-w-0"><span className="block truncate text-sm font-medium">{item.subject}</span><span className="block truncate text-xs text-muted-foreground">{item.name} · {new Date(item.createdAt).toLocaleDateString()}</span></span>
                </div>
              </button>
            ))}
            {items.length === 0 ? <p className="px-2 py-6 text-center text-xs text-muted-foreground">No notifications yet.</p> : null}
          </div>
          <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => { setOpen(false); onOpenMessages(); }}>View all messages</Button>
        </div>
      ) : null}
    </div>
  );
}

/* ---------------- Sidebar config ---------------- */
interface NavItem {
  id: string;
  label: string;
  icon: typeof Award;
  group: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, group: "Main" },
  { id: "content", label: "Site Content", icon: FileText, group: "Main" },
  { id: "products", label: "Products", icon: Box, group: "Collections" },
    { id: "service-categories", label: "Service Categories", icon: Tags, group: "Collections" },
  { id: "vacancies", label: "Vacancies", icon: Briefcase, group: "Collections" },
  { id: "gallery", label: "Gallery", icon: Images, group: "Collections" },
  { id: "awards", label: "Awards", icon: Award, group: "Collections" },
  { id: "time-slots", label: "Time Slots", icon: Clock, group: "Collections" },
  { id: "reviews", label: "Reviews", icon: Star, group: "Submissions" },
  { id: "calls", label: "Scheduled Calls", icon: Calendar, group: "Submissions" },
  { id: "messages", label: "Messages", icon: MessageSquare, group: "Submissions" },
];

/* ---------------- Dashboard ---------------- */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = React.useState("overview");
  const [mobileNav, setMobileNav] = React.useState(false);
  const [adminEmail, setAdminEmail] = React.useState("");

  React.useEffect(() => {
    fetch("/api/admin/session", { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.admin?.email) setAdminEmail(d.admin.email);
      })
      .catch(() => {});
  }, []);

  const groups = Array.from(new Set(NAV_ITEMS.map((n) => n.group)));

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b border-sidebar-border p-4">
        <img src="/UltrabulbLogoLight.png" alt="ULTRABULB IT" className="size-10 object-contain block dark:hidden" />
        <img src="/UltrabulbLogoDark.png" alt="ULTRABULB IT" className="size-10 object-contain hidden dark:block" />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-sidebar-foreground">ULTRABULB IT</span>
          <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">Admin Panel</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((g) => (
          <div key={g} className="mb-4">
            <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
              {g}
            </div>
            <div className="flex flex-col gap-0.5">
              {NAV_ITEMS.filter((n) => n.group === g).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setTab(item.id);
                    setMobileNav(false);
                  }}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    tab === item.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        {adminEmail ? (
          <div className="mb-2 px-3 text-xs text-sidebar-foreground/50">
            Signed in as<br />
            <span className="font-medium text-sidebar-foreground/80">{adminEmail}</span>
          </div>
        ) : null}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="flex-1 gap-1.5">
            <Link href="/" target="_blank">
              View Site
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive" onClick={onLogout} aria-label="Logout">
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border/60 bg-sidebar md:block">
        {sidebar}
      </aside>

      <Sheet open={mobileNav} onOpenChange={setMobileNav}>
        <SheetContent side="left" className="w-64 p-0">
          {sidebar}
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur">
          <Button variant="ghost" size="icon" onClick={() => setMobileNav(true)} aria-label="Open menu" className="md:hidden">
            <Menu className="size-5" />
          </Button>
          <span className="text-sm font-bold">ULTRABULB IT Admin</span>
          <div className="flex items-center gap-1"><Notifications onOpenMessages={() => { setTab("messages"); setMobileNav(false); }} /><ThemeToggle /></div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "overview" && <Overview onNavigate={setTab} />}
            {tab === "content" && <ContentEditor />}
            {tab === "products" && (
              <CollectionPanel<Product>
                title="Products"
                description="Showcase of projects you've built."
                endpoint="/api/admin/products"
                fields={[
                  { name: "title", label: "Title", required: true },
                  { name: "categoryId", label: "Service Category", type: "select", optionsEndpoint: "/api/admin/service-categories" },
                  { name: "imageUrl", label: "Image URL", type: "url", required: true, full: true },
                  { name: "galleryUrls", label: "Additional Picture URLs (one per line)", type: "textarea", full: true },
                  { name: "description", label: "Description", type: "textarea", required: true, full: true },
                  { name: "techStack", label: "Tech Stack (comma-separated)", full: true },
                  { name: "review", label: "Client Review", type: "textarea", full: true },
                  { name: "awards", label: "Awards & Recognition", type: "textarea", full: true },
                  { name: "accessFeatures", label: "Access Features (one per line)", type: "textarea", full: true },
                  { name: "serviceOwners", label: "Service Owners", type: "textarea", full: true, placeholder: "Name - Role (one per line)" },
                  { name: "tags", label: "Tags (comma-separated)", full: true },
                  { name: "link", label: "Project Link", type: "url", full: true },
                  { name: "order", label: "Order", type: "number" },
                  { name: "featured", label: "Featured", type: "switch" },
                ]}
                renderRow={(p) => (
                  <>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={p.imageUrl} alt="" className="size-10 rounded-lg object-cover" />
                        <div>
                          <div className="text-sm font-medium text-foreground">{p.title}</div>
                          <div className="text-xs text-muted-foreground">{p.category}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate text-xs text-muted-foreground">{p.description}</p>
                    </TableCell>
                    <TableCell>
                      {p.featured ? <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300">Featured</Badge> : <span className="text-xs text-muted-foreground">—</span>}
                    </TableCell>
                  </>
                )}
              />
            )}
            {tab === "service-categories" && (
              <CollectionPanel<ServiceCategory>
                title="Service Categories"
                description="Categories shown in the Services navbar menu and assigned to projects."
                endpoint="/api/admin/service-categories"
                fields={[
                  { name: "name", label: "Name", required: true },
                  { name: "slug", label: "Slug", required: true },
                  { name: "description", label: "Description", type: "textarea", full: true },
                  { name: "order", label: "Order", type: "number" },
                  { name: "active", label: "Visible in navbar", type: "switch" },
                ]}
                renderRow={(category) => (
                  <>
                    <TableCell className="text-sm font-medium">{category.name}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{category.slug}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{category.active ? "Visible" : "Hidden"}</TableCell>
                  </>
                )}
              />
            )}
            {tab === "vacancies" && (
              <CollectionPanel<Vacancy>
                title="Vacancies"
                description="Job openings with hiring status."
                endpoint="/api/admin/vacancies"
                fields={[
                  { name: "title", label: "Job Title", required: true },
                  { name: "department", label: "Department", required: true },
                  { name: "type", label: "Type (Full-time/Contract...)", required: true },
                  { name: "location", label: "Location", required: true },
                  { name: "description", label: "Description", type: "textarea", required: true, full: true },
                  { name: "requirements", label: "Requirements (comma or newline separated)", type: "textarea", full: true },
                  { name: "order", label: "Order", type: "number" },
                  { name: "hiring", label: "We're Hiring", type: "switch" },
                ]}
                renderRow={(v) => (
                  <>
                    <TableCell>
                      <div className="text-sm font-medium text-foreground">{v.title}</div>
                      <div className="text-xs text-muted-foreground">{v.department} · {v.location}</div>
                    </TableCell>
                    <TableCell className="text-xs">{v.type}</TableCell>
                    <TableCell>
                      {v.hiring ? (
                        <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">Hiring</Badge>
                      ) : (
                        <Badge variant="secondary">Closed</Badge>
                      )}
                    </TableCell>
                  </>
                )}
              />
            )}
            {tab === "gallery" && (
              <CollectionPanel<GalleryImage>
                title="Gallery"
                description="Photos from your journey."
                endpoint="/api/admin/gallery"
                cardView
                addLabel="Upload Image"
                fields={[
                  { name: "title", label: "Title", required: true },
                  { name: "category", label: "Category", required: true },
                  { name: "imageUrl", label: "Image URL", type: "url", required: true, full: true },
                  { name: "order", label: "Order", type: "number" },
                ]}
                renderRow={() => null}
                renderCard={(g) => (
                  <CardContent className="p-0">
                    <div className="aspect-square w-full overflow-hidden bg-muted">
                      <img src={g.imageUrl} alt={g.title} className="size-full object-cover" />
                    </div>
                    <div className="p-3">
                      <Badge variant="outline" className="mb-1 text-[10px]">{g.category}</Badge>
                      <div className="text-sm font-medium text-foreground">{g.title}</div>
                    </div>
                  </CardContent>
                )}
              />
            )}
            {tab === "awards" && (
              <CollectionPanel<AwardRecord>
                title="Awards"
                description="Recognition and achievements."
                endpoint="/api/admin/awards"
                cardView
                fields={[
                  { name: "title", label: "Title", required: true },
                  { name: "issuer", label: "Issuer", required: true },
                  { name: "year", label: "Year", required: true },
                  { name: "imageUrl", label: "Image URL", type: "url", required: true, full: true },
                  { name: "description", label: "Description", type: "textarea", required: true, full: true },
                  { name: "order", label: "Order", type: "number" },
                ]}
                renderRow={() => null}
                renderCard={(a) => (
                  <CardContent className="p-0">
                    <div className="aspect-4/3 w-full overflow-hidden bg-muted">
                      <img src={a.imageUrl} alt={a.title} className="size-full object-cover" />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[10px]">{a.year}</Badge>
                        <span className="text-[10px] text-muted-foreground">{a.issuer}</span>
                      </div>
                      <div className="mt-1 text-sm font-medium text-foreground">{a.title}</div>
                    </div>
                  </CardContent>
                )}
              />
            )}
            {tab === "time-slots" && (
              <CollectionPanel<{ id: string; label: string; value: string; active: boolean }>
                title="Time Slots"
                description="Available booking slots for the /schedule page."
                endpoint="/api/admin/time-slots"
                fields={[
                  { name: "label", label: "Display Label", required: true, full: true, placeholder: "09:00 AM — 09:30 AM" },
                  { name: "value", label: "Value (HH:MM)", required: true, placeholder: "09:00" },
                  { name: "order", label: "Order", type: "number" },
                  { name: "active", label: "Active", type: "switch" },
                ]}
                renderRow={(t) => (
                  <>
                    <TableCell className="text-sm font-medium text-foreground">{t.label}</TableCell>
                    <TableCell className="font-mono text-xs">{t.value}</TableCell>
                    <TableCell>
                      {t.active ? (
                        <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </TableCell>
                  </>
                )}
              />
            )}
            {tab === "reviews" && <ReviewsPanel />}
            {tab === "calls" && <CallsPanel />}
            {tab === "messages" && <MessagesPanel />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */
export default function AdminPage() {
  const [authed, setAuthed] = React.useState<boolean | null>(null);

  const checkSession = React.useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session", { credentials: "same-origin" });
      setAuthed(res.ok);
    } catch {
      setAuthed(false);
    }
  }, []);

  React.useEffect(() => {
    checkSession();
  }, [checkSession]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    toast.success("Signed out");
    setAuthed(false);
  }

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return authed ? <Dashboard onLogout={handleLogout} /> : <LoginForm onLogin={checkSession} />;
}
