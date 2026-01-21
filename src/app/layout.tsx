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
      <body className="font-tkt bg-surface-bg antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col pl-64">
            <Header />
            <main className="pt-24 p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
