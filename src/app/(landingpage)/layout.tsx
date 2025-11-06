import Footer from "@/components/landing_page/footer";
import Navbar from "@/components/navbar";



export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
