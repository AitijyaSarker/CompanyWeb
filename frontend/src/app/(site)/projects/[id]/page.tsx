"use client";

import { useParams } from "next/navigation";

import { ProjectDetail } from "@/components/site/project-detail";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : undefined;

  return <ProjectDetail id={id} />;
}
