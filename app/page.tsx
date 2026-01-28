import { Terminal, Shield, Zap, Globe, Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-white">
            <Zap className="h-5 w-5 text-cyan-400" />
            <span>Universal Mailer</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="https://github.com/oreste-abizera/smtp-relay-api"
              target="_blank"
              className="group flex items-center gap-2 rounded-full bg-slate-800 px-4 py-1.5 text-sm font-medium transition-all hover:bg-slate-700 hover:text-white"
            >
              <Github className="h-4 w-4 text-slate-400 transition-colors group-hover:text-white" />
              GitHub
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" />

          <div className="container relative mx-auto px-6 text-center">
            <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
              Stateless Email Microservice
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-6">
              Bypass Port{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Restrictions
              </span>
              .
              <br />
              Relay Anywhere.
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-slate-400 mb-10">
              A secure bridge to relay transactional emails from HTTP clients to
              SMTP servers. Perfect for hosting on Vercel to bypass port 465/587
              blocks on platforms like Render.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#docs"
                className="rounded-lg bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                href="https://github.com/oreste-abizera/smtp-relay-api"
                target="_blank"
                className="rounded-lg border border-slate-700 bg-slate-800/50 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:border-slate-600"
              >
                View Source
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="border-y border-slate-800 bg-slate-900/50 py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-sm transition-colors hover:border-slate-700">
                <Globe className="mb-4 h-10 w-10 text-cyan-400" />
                <h3 className="mb-2 text-xl font-bold text-white">
                  Universal & Stateless
                </h3>
                <p className="text-slate-400">
                  Connect any app to any SMTP provider. The service blindly
                  relays credentials, implementing zero logic of its own.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-sm transition-colors hover:border-slate-700">
                <Shield className="mb-4 h-10 w-10 text-emerald-400" />
                <h3 className="mb-2 text-xl font-bold text-white">
                  Secure Relay
                </h3>
                <p className="text-slate-400">
                  Protected by a secret key. Credentials are encrypted in
                  transit via HTTPS. No data is stored.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-sm transition-colors hover:border-slate-700">
                <Terminal className="mb-4 h-10 w-10 text-indigo-400" />
                <h3 className="mb-2 text-xl font-bold text-white">
                  Developer First
                </h3>
                <p className="text-slate-400">
                  Simple REST API using JSON. Easy to integrate with Node.js,
                  Python, Go, or any HTTP client.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Code Preview Section */}
        <section id="docs" className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                How to use
              </h2>
              <p className="mt-4 text-slate-400">
                One simple request to send emails from anywhere.
              </p>
            </div>

            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/50 px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="ml-4 text-xs font-mono text-slate-500">
                  email-service.ts
                </div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed text-slate-300">
                  <span className="text-purple-400">await</span>{" "}
                  <span className="text-blue-400">fetch</span>(
                  <span className="text-emerald-400">
                    'https://your-app.vercel.app/api/send-email'
                  </span>
                  , &#123;{"\n"}
                  {"  "}method: <span className="text-emerald-400">'POST'</span>
                  ,{"\n"}
                  {"  "}headers: &#123;{"\n"}
                  {"    "}
                  <span className="text-emerald-400">'Content-Type'</span>:{" "}
                  <span className="text-emerald-400">'application/json'</span>,
                  {"\n"}
                  {"    "}
                  <span className="text-emerald-400">'x-secret-key'</span>:
                  process.env.RELAY_SECRET_KEY{"\n"}
                  {"  "}&#125;,{"\n"}
                  {"  "}body: JSON.
                  <span className="text-blue-400">stringify</span>(&#123;{"\n"}
                  {"    "}smtp: &#123;{"\n"}
                  {"      "}host:{" "}
                  <span className="text-emerald-400">'smtp.gmail.com'</span>,
                  {"\n"}
                  {"      "}port: <span className="text-orange-400">465</span>,
                  {"\n"}
                  {"      "}secure:{" "}
                  <span className="text-orange-400">true</span>,{"\n"}
                  {"      "}auth: &#123; user:{" "}
                  <span className="text-emerald-400">'...'</span>, pass:{" "}
                  <span className="text-emerald-400">'...'</span> &#125;{"\n"}
                  {"    "}&#125;,{"\n"}
                  {"    "}email: &#123;{"\n"}
                  {"      "}to:{" "}
                  <span className="text-emerald-400">'client@example.com'</span>
                  ,{"\n"}
                  {"      "}subject:{" "}
                  <span className="text-emerald-400">'Hello!'</span>,{"\n"}
                  {"      "}html:{" "}
                  <span className="text-emerald-400">
                    '&lt;h1&gt;It Works!&lt;/h1&gt;'
                  </span>
                  {"\n"}
                  {"    "}&#125;{"\n"}
                  {"  "}&#125;){"\n"}
                  &#125;);
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="container mx-auto px-6 text-center text-slate-500">
          <p>
            © {new Date().getFullYear()} Universal Mailer Service. MIT License.
          </p>
        </div>
      </footer>
    </div>
  );
}
