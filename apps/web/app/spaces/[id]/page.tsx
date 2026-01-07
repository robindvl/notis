import { redirect } from "next/navigation"

export default async function SpacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  redirect(`/spaces/${id}/notes`)
}

