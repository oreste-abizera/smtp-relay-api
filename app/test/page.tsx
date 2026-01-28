"use client";

import { useState } from "react";
import {
  Send,
  Shield,
  Server,
  Mail,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    secretKey: "",
    host: "",
    port: 465,
    secure: true,
    user: "",
    pass: "",
    to: "",
    from: "",
    subject: "Test Email from Universal Mailer",
    html: "<p>This is a test email sent via <strong>Universal Mailer Service</strong>.</p>",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      // @ts-ignore
      [name]:
        type === "checkbox"
          ? e.target.checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": formData.secretKey,
        },
        body: JSON.stringify({
          smtp: {
            host: formData.host,
            port: formData.port,
            secure: formData.secure,
            user: formData.user,
            pass: formData.pass,
          },
          email: {
            from: formData.from,
            to: formData.to,
            subject: formData.subject,
            html: formData.html,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setResponse(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 flex justify-center selection:bg-cyan-500/30">
      <div className="w-full max-w-4xl">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xl mb-2">
            <Server className="w-6 h-6" />
            <span>Universal Mailer Test Bench</span>
          </div>
          <p className="text-slate-400">
            Validate your SMTP credentials and Relay setup.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Secret Key Section */}
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 mb-4 text-emerald-400 font-semibold">
                  <Shield className="w-5 h-5" />
                  <h2>Authentication</h2>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Secret Key (x-secret-key)
                  </label>
                  <input
                    type="password"
                    name="secretKey"
                    required
                    placeholder="Your Vercel Environment Variable Key"
                    value={formData.secretKey}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600"
                  />
                  <p className="text-[10px] text-slate-500 mt-2">
                    Must match{" "}
                    <code className="bg-slate-800 px-1 rounded">
                      process.env.MY_SECRET_KEY
                    </code>
                  </p>
                </div>
              </div>

              {/* SMTP Config Section */}
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 mb-4 text-cyan-400 font-semibold">
                  <Server className="w-5 h-5" />
                  <h2>SMTP Configuration</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Host
                    </label>
                    <input
                      type="text"
                      name="host"
                      required
                      placeholder="smtp.gmail.com"
                      value={formData.host}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Port
                    </label>
                    <input
                      type="number"
                      name="port"
                      required
                      value={formData.port}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>
                  <div className="flex items-end pb-3">
                    <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        name="secure"
                        // @ts-ignore
                        checked={formData.secure}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            secure: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 rounded border-slate-600 bg-slate-950 text-cyan-500 focus:ring-offset-slate-900"
                      />
                      Secure (SSL/TLS)
                    </label>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      User / Email
                    </label>
                    <input
                      type="text"
                      name="user"
                      required
                      placeholder="me@gmail.com"
                      value={formData.user}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Password / App Password
                    </label>
                    <input
                      type="password"
                      name="pass"
                      required
                      placeholder="••••••••••••"
                      value={formData.pass}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Email Content Section */}
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 mb-4 text-purple-400 font-semibold">
                  <Mail className="w-5 h-5" />
                  <h2>Email Content</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      To
                    </label>
                    <input
                      type="email"
                      name="to"
                      required
                      placeholder="recipient@example.com"
                      value={formData.to}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {loading ? "Sending..." : "Send Test Email"}
              </button>
            </form>
          </div>

          {/* Output Log Column */}
          <div className="space-y-6">
            <div
              className={`h-full bg-slate-950 rounded-2xl border ${error ? "border-red-900/50" : response ? "border-green-900/50" : "border-slate-800"} p-6 relative overflow-hidden flex flex-col`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                  Console Output
                </h3>
                {response && (
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <CheckCircle className="w-3 h-3" /> Success
                  </span>
                )}
                {error && (
                  <span className="flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle className="w-3 h-3" /> Error
                  </span>
                )}
              </div>

              <div className="flex-1 font-mono text-xs overflow-auto bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                {!response && !error && !loading && (
                  <div className="text-slate-600 flex flex-col items-center justify-center h-full gap-2">
                    <TerminalIcon />
                    <p>Waiting for request...</p>
                  </div>
                )}

                {loading && (
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                  </div>
                )}

                {error && (
                  <pre className="text-red-400 whitespace-pre-wrap break-all">
                    {error}
                  </pre>
                )}

                {response && (
                  <pre className="text-green-400 whitespace-pre-wrap break-all">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                )}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <h4 className="text-xs font-semibold text-slate-400 mb-2 uppercase">
                  How it works
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  This form sends a real POST request to{" "}
                  <code className="text-cyan-400">/api/send-email</code>.
                  <br />
                  <br />
                  1. The browser sends credentials & content to the API.
                  <br />
                  2. The API uses Nodemailer to create a transporter.
                  <br />
                  3. The email is relayed through your SMTP provider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminalIcon() {
  return (
    <svg
      className="w-8 h-8 opacity-20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
