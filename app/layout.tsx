import "./globals.css";

export const metadata = {
  title: "⚜️『𝑷𝒉𝒂𝒏𝒕𝒐𝒎✧𝑪𝒓𝒐𝒘𝒏』⚜️",
  description: "Anime Community System",
  icons: {
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-[#0b0d14] text-white antialiased">
        {children}
      </body>
    </html>
  );
}