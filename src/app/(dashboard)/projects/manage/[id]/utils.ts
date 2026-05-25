import type { Metadata } from "next";

export async function getManageProjectMetadata(params: Promise<{ id: string }>): Promise<Metadata> {
  const { id } = await params;

  return {
    title: "Manage Project",
    description: `Manage settings and analytics for project ${id}.`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  return getManageProjectMetadata(params);
}
