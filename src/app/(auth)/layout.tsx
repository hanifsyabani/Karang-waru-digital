import Copyright from "@/components/copyright";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-5">
        
      {children}
      <Copyright />
    </main>
  );
}
