import './globals.css';

export const metadata = {
  title: 'Job Scheduler',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-blue-600 text-white px-6 py-4 text-xl font-semibold">
        </header>

        <main className="max-w-6xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
