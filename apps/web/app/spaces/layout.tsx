export default function SpacesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-svh overflow-hidden w-full">
      {children}
    </div>
  )
}
