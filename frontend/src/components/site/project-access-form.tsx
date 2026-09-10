"use client";

import * as React from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ProjectAccessForm({ projectId }: { projectId: string }) {
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch(`/api/projects/${projectId}/access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="rounded-xl border border-(--brand-cyan)/30 bg-(--brand-cyan)/10 p-5 text-sm text-foreground">Thanks. Your project access request has been sent to our team.</p>;
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <Input required placeholder="Your name" value={form.name} onChange={(event) => update("name", event.target.value)} />
      <Input required type="email" placeholder="Email address" value={form.email} onChange={(event) => update("email", event.target.value)} />
      <Input placeholder="Phone number" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
      <Input placeholder="Company" value={form.company} onChange={(event) => update("company", event.target.value)} />
      <Textarea className="sm:col-span-2" placeholder="What would you like to know about this project?" value={form.message} onChange={(event) => update("message", event.target.value)} />
      {status === "error" ? <p className="text-sm text-destructive sm:col-span-2">We could not send your request. Please try again.</p> : null}
      <Button type="submit" disabled={status === "sending"} className="w-fit gap-2 rounded-full bg-(--brand-navy) text-white hover:bg-(--brand-navy-dark)">
        {status === "sending" ? <Loader2 className="size-4 animate-spin" /> : null}
        Request Access <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}
