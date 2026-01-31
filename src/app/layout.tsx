import Sidebar from "@/src/components/Sidebar";
import Header from "@/src/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka">
      <body className="font-tkt bg-surface-bg antialiased flex justify-center">
        {/* Sidebar-ში შიგნით უნდა გეწეროს hidden lg:flex ან მსგავსი კლასი */}
        <div className="flex min-h-screen w-full max-w-[2560px] relative">
          <Sidebar />

          <div className="flex-1 flex flex-col pl-0 lg:pl-64 transition-all duration-300">
            <Header />
            <main className="pt-24 p-4 w-full overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
