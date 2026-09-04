// Admin panel — manage Services, Portfolio items and AMS product features.
// Passcode gate (default "admin123", override with NEXT_PUBLIC_ADMIN_KEY).
// NOTE: edits are stored in-memory in this preview, so they apply instantly
// to the live site but reset on server restart. For permanent storage, set
// DATABASE_URL and run the Prisma migration (see prisma/schema.prisma).

"use client";

import { useCallback, useEffect, useState } from "react";

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || "admin123";
const SESSION_FLAG = "ngmt-admin-auth";

type Tab = "services" | "portfolio" | "ams";

const TABS: { id: Tab; label: string; endpoint: string }[] = [
  { id: "services", label: "Services", endpoint: "/api/services" },
  { id: "portfolio", label: "Portfolio", endpoint: "/api/portfolio" },
  { id: "ams", label: "AMS Features", endpoint: "/api/ams-features" },
];

const TONES = [
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-red-600",
  "from-lime-500 to-green-600",
];

const SERVICE_ICONS = ["code", "monitor", "phone", "cloud", "shield", "grid", "chart", "wrench"];

const AMS_ICONS = [
  "file", "server", "users", "calendar", "mail", "rupee", "shop", "renew",
  "megaphone", "committee", "badge", "bell", "image", "chart", "settings",
  "database", "medal", "devices", "headset", "shield",
];

type Field =
  | { name: string; label: string; kind: "text"; required?: boolean; placeholder?: string }
  | { name: string; label: string; kind: "textarea"; rows?: number; hint?: string }
  | { name: string; label: string; kind: "number" }
  | { name: string; label: string; kind: "checkbox" }
  | { name: string; label: string; kind: "select"; options: string[] };

const FIELDS: Record<Tab, Field[]> = {
  services: [
    { name: "title", label: "Title", kind: "text", required: true, placeholder: "e.g. Cloud & DevOps" },
    { name: "tagline", label: "Tagline", kind: "text", placeholder: "Short highlight" },
    { name: "description", label: "Short description", kind: "textarea", rows: 2 },
    { name: "longDescription", label: "Full description", kind: "textarea", rows: 4 },
    { name: "icon", label: "Icon", kind: "select", options: SERVICE_ICONS },
    { name: "tone", label: "Colour theme", kind: "select", options: TONES },
    { name: "features", label: "Key capabilities (one per line)", kind: "textarea", rows: 4 },
    { name: "deliverables", label: "What you get (one per line)", kind: "textarea", rows: 4 },
    { name: "sortOrder", label: "Sort order", kind: "number" },
    { name: "active", label: "Visible on site", kind: "checkbox" },
  ],
  portfolio: [
    { name: "title", label: "Project title", kind: "text", required: true, placeholder: "e.g. Retail ERP Suite" },
    { name: "category", label: "Category", kind: "text", placeholder: "e.g. ERP / CRM" },
    { name: "description", label: "Description", kind: "textarea", rows: 4 },
    { name: "image", label: "Image URL (optional)", kind: "text", placeholder: "https://… or /image.png" },
    { name: "link", label: "Project link (optional)", kind: "text", placeholder: "https://…" },
    { name: "sortOrder", label: "Sort order", kind: "number" },
    { name: "active", label: "Visible on site", kind: "checkbox" },
  ],
  ams: [
    { name: "title", label: "Feature title", kind: "text", required: true, placeholder: "e.g. Member Management" },
    { name: "description", label: "Description", kind: "textarea", rows: 3 },
    { name: "icon", label: "Icon", kind: "select", options: AMS_ICONS },
    { name: "tone", label: "Colour theme", kind: "select", options: TONES },
    { name: "sortOrder", label: "Sort order", kind: "number" },
  ],
};

const toForm = (tab: Tab, item?: any): Record<string, any> => {
  const form: Record<string, any> = {};
  for (const f of FIELDS[tab]) {
    if (f.kind === "checkbox") form[f.name] = item ? item[f.name] !== false : true;
    else if (f.kind === "number") form[f.name] = item?.[f.name] ?? "";
    else if (f.kind === "select")
      form[f.name] = item?.[f.name] ?? (f.name === "icon" ? f.options[0] : f.options[0]);
    else if (f.name === "features" || f.name === "deliverables")
      form[f.name] = Array.isArray(item?.[f.name]) ? item[f.name].join("\n") : item?.[f.name] ?? "";
    else form[f.name] = item?.[f.name] ?? "";
  }
  return form;
};

async function api(endpoint: string, method: string, id?: string, body?: any) {
  const res = await fetch(id ? `${endpoint}/${id}` : endpoint, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<Tab>("services");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Record<string, any>>(() => toForm("services"));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_FLAG) === "1") setAuthed(true);
    } catch {}
  }, []);

  const endpoint = TABS.find((t) => t.id === tab)!.endpoint;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api(`${endpoint}?all=1`, "GET");
      setItems(Array.isArray(res?.data) ? res.data : []);
    } catch {
      setItems([]);
    }
    setLoading(false);
  }, [endpoint]);

  useEffect(() => {
    if (authed) {
      setShowForm(false);
      setEditingId(null);
      setMessage(null);
      load();
    }
  }, [authed, load]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_KEY) {
      try {
        sessionStorage.setItem(SESSION_FLAG, "1");
      } catch {}
      setAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Wrong passcode. Try again.");
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_FLAG);
    } catch {}
    setAuthed(false);
    setPasscode("");
  };

  const openAdd = () => {
    setEditingId(null);
    const defaults = toForm(tab);
    if (tab !== "ams") defaults.active = true;
    if (tab === "services") {
      defaults.icon = SERVICE_ICONS[0];
      defaults.tone = TONES[items.length % TONES.length];
    }
    if (tab === "ams") {
      defaults.icon = AMS_ICONS[0];
      defaults.tone = TONES[items.length % TONES.length];
    }
    setForm(defaults);
    setShowForm(true);
    setMessage(null);
  };

  const openEdit = (item: any) => {
    setEditingId(item.id);
    setForm(toForm(tab, item));
    setShowForm(true);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const payload: Record<string, any> = { ...form };
      if (payload.sortOrder === "" || payload.sortOrder === undefined) delete payload.sortOrder;
      else payload.sortOrder = Number(payload.sortOrder);
      const res = editingId
        ? await api(endpoint, "PATCH", editingId, payload)
        : await api(endpoint, "POST", undefined, payload);
      if (res?.success) {
        setMessage({ ok: true, text: editingId ? "Saved successfully." : "Added successfully." });
        setShowForm(false);
        setEditingId(null);
        load();
      } else {
        setMessage({ ok: false, text: res?.error ?? "Could not save. Check the fields." });
      }
    } catch {
      setMessage({ ok: false, text: "Server unreachable. Try again." });
    }
    setSaving(false);
  };

  const remove = async (item: any) => {
    const label = item.title ?? "this item";
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
    try {
      const res = await api(endpoint, "DELETE", item.id);
      if (res?.success) {
        setMessage({ ok: true, text: "Deleted." });
        load();
      } else {
        setMessage({ ok: false, text: res?.error ?? "Could not delete." });
      }
    } catch {
      setMessage({ ok: false, text: "Server unreachable. Try again." });
    }
  };

  const set = (name: string, value: any) => setForm((f) => ({ ...f, [name]: value }));

  if (!authed) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-5 pt-24 pb-16">
        <form onSubmit={login} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="mt-5 text-center text-2xl font-bold text-slate-900">Admin Panel</h1>
          <p className="mt-1 text-center text-sm text-slate-500">Enter the admin passcode to continue.</p>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Passcode"
            className="mt-6 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            autoFocus
          />
          {authError && <p className="mt-3 text-sm text-rose-600">{authError}</p>}
          <button type="submit" className="mt-4 w-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg">
            Unlock
          </button>
          <p className="mt-4 text-center text-xs text-slate-400">Default passcode: admin123</p>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 pt-28 md:pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Admin Panel</h1>
            <p className="mt-1 text-sm text-slate-500">Add, edit or delete site content. Changes go live instantly.</p>
          </div>
          <div className="flex gap-3">
            <a href="/" className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition">
              View Site
            </a>
            <button onClick={logout} className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition">
              Lock
            </button>
          </div>
        </div>

        <div className="mt-8 flex gap-2 border-b border-slate-200">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition ${
                tab === t.id ? "border-indigo-600 text-indigo-700" : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {t.label}
              <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600">{tab === t.id ? items.length : ""}</span>
            </button>
          ))}
        </div>

        {message && (
          <div className={`mt-6 rounded-xl border px-4 py-3 text-sm ${message.ok ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-rose-50 border-rose-200 text-rose-700"}`}>
            {message.text}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {TABS.find((t) => t.id === tab)!.label} ({items.length})
          </h2>
          {!showForm && (
            <button onClick={openAdd} className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg">
              + Add New
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={save} className="mt-6 rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">{editingId ? "Edit" : "Add new"} {TABS.find((t) => t.id === tab)!.label.toLowerCase().replace(/s$/, "")}</h3>
            <div className="mt-5 grid md:grid-cols-2 gap-5">
              {FIELDS[tab].map((f) => (
                <div key={f.name} className={f.kind === "textarea" ? "md:col-span-2" : ""}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    {f.label} {f.kind === "text" && (f as any).required && <span className="text-rose-500">*</span>}
                  </label>
                  {f.kind === "text" && (
                    <input
                      value={form[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                      required={(f as any).required}
                      placeholder={(f as any).placeholder}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white"
                    />
                  )}
                  {f.kind === "textarea" && (
                    <>
                      <textarea
                        value={form[f.name] ?? ""}
                        onChange={(e) => set(f.name, e.target.value)}
                        rows={(f as any).rows ?? 3}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white resize-y"
                      />
                      {(f as any).hint && <p className="mt-1 text-xs text-slate-400">{(f as any).hint}</p>}
                    </>
                  )}
                  {f.kind === "number" && (
                    <input
                      type="number"
                      value={form[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                      placeholder="Order on page"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white"
                    />
                  )}
                  {f.kind === "select" && (
                    <select
                      value={form[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white"
                    >
                      {(f as any).options.map((o: string) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  )}
                  {f.kind === "checkbox" && (
                    <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!form[f.name]}
                        onChange={(e) => set(f.name, e.target.checked)}
                        className="h-4 w-4 rounded accent-indigo-600"
                      />
                      Show on website
                    </label>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button type="submit" disabled={saving} className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg disabled:opacity-60">
                {saving ? "Saving…" : editingId ? "Save Changes" : "Add"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-400 transition">
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-8 text-center text-sm text-slate-500">Loading…</p>
          ) : items.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">Nothing here yet. Click “Add New”.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 p-4 md:px-6 hover:bg-slate-50 transition">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900 truncate">{item.title}</span>
                      {tab !== "ams" && (
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${item.active !== false ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
                          {item.active !== false ? "Live" : "Hidden"}
                        </span>
                      )}
                      {item.category && <span className="text-[11px] text-slate-500">{item.category}</span>}
                    </div>
                    {(item.tagline || item.description) && (
                      <p className="mt-0.5 text-sm text-slate-500 truncate">{item.tagline || item.description}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => openEdit(item)} className="rounded-full border border-indigo-200 px-4 py-1.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition">
                      Edit
                    </button>
                    <button onClick={() => remove(item)} className="rounded-full border border-rose-200 px-4 py-1.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Preview note: content is stored in server memory, so edits vanish if the server restarts. Connect PostgreSQL via DATABASE_URL for permanent storage.
        </p>
      </div>
    </main>
  );
}
