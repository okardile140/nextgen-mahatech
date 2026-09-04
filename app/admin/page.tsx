// Admin panel — manage Services, Portfolio items and AMS product features.
// Passcode gate (default "admin123", override with NEXT_PUBLIC_ADMIN_KEY).
// Lists always show live API data; forms validate on the client AND the
// server (field-level errors). Public cards are clamp/fallback-hardened, so
// any saved content keeps the site layout identical.
// NOTE: this preview stores data in server memory — edits vanish on restart.
// Connect PostgreSQL via DATABASE_URL for permanent storage.

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || "admin123";
const SESSION_FLAG = "ngmt-admin-auth";

type Tab = "services" | "portfolio" | "ams";

const TABS: { id: Tab; label: string; endpoint: string; singular: string; viewAll: string }[] = [
  { id: "services", label: "Services", endpoint: "/api/services", singular: "service", viewAll: "/services" },
  { id: "portfolio", label: "Portfolio", endpoint: "/api/portfolio", singular: "portfolio item", viewAll: "/portfolio" },
  { id: "ams", label: "AMS Features", endpoint: "/api/ams-features", singular: "feature", viewAll: "/solutions/ams#ams-features" },
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
  | { name: string; label: string; kind: "text"; required?: boolean; max?: number; placeholder?: string }
  | { name: string; label: string; kind: "textarea"; rows?: number; max?: number }
  | { name: string; label: string; kind: "number" }
  | { name: string; label: string; kind: "checkbox" }
  | { name: string; label: string; kind: "select"; options: string[] };

const FIELDS: Record<Tab, Field[]> = {
  services: [
    { name: "title", label: "Title", kind: "text", required: true, max: 120, placeholder: "e.g. Cloud & DevOps" },
    { name: "tagline", label: "Tagline", kind: "text", max: 160, placeholder: "Short highlight" },
    { name: "description", label: "Short description", kind: "textarea", rows: 2, max: 2000 },
    { name: "longDescription", label: "Full description", kind: "textarea", rows: 4, max: 6000 },
    { name: "icon", label: "Icon", kind: "select", options: SERVICE_ICONS },
    { name: "tone", label: "Colour theme", kind: "select", options: TONES },
    { name: "features", label: "Key capabilities (one per line)", kind: "textarea", rows: 4 },
    { name: "deliverables", label: "What you get (one per line)", kind: "textarea", rows: 4 },
    { name: "sortOrder", label: "Sort order", kind: "number" },
    { name: "active", label: "Visible on site", kind: "checkbox" },
  ],
  portfolio: [
    { name: "title", label: "Project title", kind: "text", required: true, max: 140, placeholder: "e.g. Retail ERP Suite" },
    { name: "category", label: "Category", kind: "text", max: 120, placeholder: "e.g. ERP / CRM" },
    { name: "description", label: "Description", kind: "textarea", rows: 4, max: 4000 },
    { name: "image", label: "Image URL (optional)", kind: "text", max: 500, placeholder: "https://… or /image.png" },
    { name: "link", label: "Project link (optional)", kind: "text", max: 500, placeholder: "https://…" },
    { name: "sortOrder", label: "Sort order", kind: "number" },
    { name: "active", label: "Visible on site", kind: "checkbox" },
  ],
  ams: [
    { name: "title", label: "Feature title", kind: "text", required: true, max: 140, placeholder: "e.g. Member Management" },
    { name: "description", label: "Description", kind: "textarea", rows: 3, max: 2000 },
    { name: "icon", label: "Icon", kind: "select", options: AMS_ICONS },
    { name: "tone", label: "Colour theme", kind: "select", options: TONES },
    { name: "sortOrder", label: "Sort order", kind: "number" },
  ],
};

const TITLE_MAX: Record<Tab, number> = { services: 120, portfolio: 140, ams: 140 };

const isUrlOrPath = (v: string) => !v || v.startsWith("/") || /^https?:\/\/.+\..+/.test(v);

function validateForm(tab: Tab, form: Record<string, any>): Record<string, string> {
  const errs: Record<string, string> = {};
  const title = String(form.title ?? "").trim();
  if (!title) errs.title = "Title is required.";
  else if (title.length < 2) errs.title = "Title needs at least 2 characters.";
  else if (title.length > TITLE_MAX[tab]) errs.title = `Title must be under ${TITLE_MAX[tab]} characters.`;

  for (const f of FIELDS[tab]) {
    const v = String(form[f.name] ?? "");
    if ((f.kind === "text" || f.kind === "textarea") && f.max && v.length > f.max) {
      errs[f.name] = `${f.label} must be under ${f.max} characters (now ${v.length}).`;
    }
  }
  if (tab === "services" && form.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(form.slug).trim())) {
    errs.slug = "Slug may only contain lowercase letters, numbers and hyphens.";
  }
  if (tab === "portfolio") {
    if (!isUrlOrPath(String(form.image ?? "").trim())) errs.image = "Use a full https:// URL or a site path like /image.png.";
    if (!isUrlOrPath(String(form.link ?? "").trim())) errs.link = "Use a full https:// URL or a site path like /contact.";
  }
  const so = String(form.sortOrder ?? "").trim();
  if (so && (!/^\d+$/.test(so) || Number(so) > 9999)) errs.sortOrder = "Order must be a whole number between 0 and 9999.";
  return errs;
}

const toForm = (tab: Tab, item?: any): Record<string, any> => {
  const form: Record<string, any> = {};
  for (const f of FIELDS[tab]) {
    if (f.kind === "checkbox") form[f.name] = item ? item[f.name] !== false : true;
    else if (f.kind === "number") form[f.name] = item?.[f.name] ?? "";
    else if (f.kind === "select") form[f.name] = item?.[f.name] ?? f.options[0];
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

const fmtDate = (v: any) => {
  try {
    return new Date(v).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
};

function Toasts({ toasts }: { toasts: { id: number; ok: boolean; text: string }[] }) {
  return (
    <div className="fixed top-24 right-5 z-[100] space-y-2 w-[calc(100%-2.5rem)] max-w-sm">
      {toasts.map((t) => (
        <div key={t.id} className={`rounded-xl border px-4 py-3 text-sm shadow-xl ${t.ok ? "bg-emerald-600 border-emerald-500 text-white" : "bg-rose-600 border-rose-500 text-white"}`}>
          {t.text}
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<Tab>("services");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncedAt, setSyncedAt] = useState<string>("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Record<string, any>>(() => toForm("services"));
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; ok: boolean; text: string }[]>([]);
  const [deleting, setDeleting] = useState<any | null>(null);
  const [deletingBusy, setDeletingBusy] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_FLAG) === "1") setAuthed(true);
    } catch {}
  }, []);

  const meta = TABS.find((t) => t.id === tab)!;
  const endpoint = meta.endpoint;

  const toast = (ok: boolean, text: string) => {
    const id = Date.now() + Math.random();
    setToasts((ts) => [...ts.slice(-2), { id, ok, text }]);
    setTimeout(() => setToasts((ts) => ts.filter((t) => t.id !== id)), 4000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api(`${endpoint}?all=1`, "GET");
      if (Array.isArray(res?.data)) {
        setItems(res.data);
        setSyncedAt(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      } else {
        setItems([]);
      }
    } catch {
      setItems([]);
    }
    setLoading(false);
  }, [endpoint]);

  useEffect(() => {
    if (authed) {
      setShowForm(false);
      setEditingId(null);
      setFieldErrors({});
      setSearch("");
      load();
    }
  }, [authed, load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      [it.title, it.category, it.tagline, it.description].filter(Boolean).join(" ").toLowerCase().includes(q)
    );
  }, [items, search]);

  const liveCount = items.filter((i) => i.active !== false || tab === "ams").length;
  const hiddenCount = tab === "ams" ? 0 : items.length - liveCount;

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
    defaults.tone = TONES[items.length % TONES.length];
    setForm(defaults);
    setFieldErrors({});
    setShowForm(true);
  };

  const openEdit = (item: any) => {
    setEditingId(item.id);
    setForm(toForm(tab, item));
    setFieldErrors({});
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const set = (name: string, value: any) => {
    setForm((f) => ({ ...f, [name]: value }));
    setFieldErrors((e) => {
      if (!e[name]) return e;
      const next = { ...e };
      delete next[name];
      return next;
    });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientErrs = validateForm(tab, form);
    if (Object.keys(clientErrs).length > 0) {
      setFieldErrors(clientErrs);
      toast(false, "Please fix the highlighted fields.");
      return;
    }
    setSaving(true);
    try {
      const payload: Record<string, any> = { ...form };
      if (payload.sortOrder === "" || payload.sortOrder === undefined) delete payload.sortOrder;
      else payload.sortOrder = Number(payload.sortOrder);
      const res = editingId
        ? await api(endpoint, "PATCH", editingId, payload)
        : await api(endpoint, "POST", undefined, payload);
      if (res?.success) {
        toast(true, editingId ? "Changes saved — live on the site now." : "Added — live on the site now.");
        setShowForm(false);
        setEditingId(null);
        load();
      } else {
        const serverErrs: Record<string, string> = {};
        if (Array.isArray(res?.issues)) {
          for (const i of res.issues) if (i?.field) serverErrs[i.field] = i.message;
        }
        setFieldErrors(serverErrs);
        toast(false, res?.error ?? "Could not save. Check the fields.");
      }
    } catch {
      toast(false, "Server unreachable. Try again.");
    }
    setSaving(false);
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setDeletingBusy(true);
    try {
      const res = await api(endpoint, "DELETE", deleting.id);
      if (res?.success) {
        toast(true, "Deleted. The site updated instantly.");
        setDeleting(null);
        load();
      } else {
        toast(false, res?.error ?? "Could not delete.");
      }
    } catch {
      toast(false, "Server unreachable. Try again.");
    }
    setDeletingBusy(false);
  };

  const inputCls = (bad?: string) =>
    `w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:bg-white ${
      bad ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100" : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
    }`;

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
      <Toasts toasts={toasts} />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Admin Panel</h1>
            <p className="mt-1 text-sm text-slate-500">
              {syncedAt ? `Live site data · synced at ${syncedAt}` : "Loading live site data…"}
            </p>
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

        <div className="mt-8 flex gap-2 border-b border-slate-200 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition whitespace-nowrap ${
                tab === t.id ? "border-indigo-600 text-indigo-700" : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-slate-900">{meta.label}</h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">Live: {liveCount}</span>
            {tab !== "ams" && hiddenCount > 0 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-600">Hidden: {hiddenCount}</span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-indigo-500 w-40"
            />
            <button onClick={load} disabled={loading} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition disabled:opacity-50">
              {loading ? "…" : "↻ Refresh"}
            </button>
            {!showForm && (
              <button onClick={openAdd} className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg">
                + Add New
              </button>
            )}
          </div>
        </div>

        {showForm && (
          <form onSubmit={save} noValidate className="mt-6 rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">{editingId ? "Edit" : `Add new`} {meta.singular}</h3>
            <div className="mt-5 grid md:grid-cols-2 gap-5">
              {FIELDS[tab].map((f) => (
                <div key={f.name} className={f.kind === "textarea" ? "md:col-span-2" : ""}>
                  <label className="flex items-baseline justify-between text-xs font-semibold text-slate-600 mb-1.5">
                    <span>{f.label} {f.kind === "text" && (f as any).required && <span className="text-rose-500">*</span>}</span>
                    {(f.kind === "text" || f.kind === "textarea") && (f as any).max && (
                      <span className={`font-normal ${String(form[f.name] ?? "").length > (f as any).max ? "text-rose-500" : "text-slate-400"}`}>
                        {String(form[f.name] ?? "").length}/{(f as any).max}
                      </span>
                    )}
                  </label>
                  {f.kind === "text" && (
                    <input
                      value={form[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                      placeholder={(f as any).placeholder}
                      maxLength={(f as any).max ? (f as any).max + 10 : undefined}
                      className={inputCls(fieldErrors[f.name])}
                    />
                  )}
                  {f.kind === "textarea" && (
                    <textarea
                      value={form[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                      rows={(f as any).rows ?? 3}
                      className={`${inputCls(fieldErrors[f.name])} resize-y`}
                    />
                  )}
                  {f.kind === "number" && (
                    <input
                      type="number" min={0} max={9999}
                      value={form[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                      placeholder="Order on page (lowest first)"
                      className={inputCls(fieldErrors[f.name])}
                    />
                  )}
                  {f.kind === "select" && (
                    <select value={form[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} className={inputCls(fieldErrors[f.name])}>
                      {(f as any).options.map((o: string) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  )}
                  {f.kind === "checkbox" && (
                    <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input type="checkbox" checked={!!form[f.name]} onChange={(e) => set(f.name, e.target.checked)} className="h-4 w-4 rounded accent-indigo-600" />
                      Show on website
                    </label>
                  )}
                  {f.name === "tone" && form.tone && (
                    <div className={`mt-2 h-6 rounded-lg bg-gradient-to-r ${form.tone}`} />
                  )}
                  {f.name === "image" && isUrlOrPath(String(form.image ?? "").trim()) && String(form.image ?? "").trim() && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={String(form.image).trim()} alt="preview" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} className="mt-2 h-24 w-full object-cover rounded-xl border border-slate-200" />
                  )}
                  {fieldErrors[f.name] && <p className="mt-1.5 text-xs font-medium text-rose-600">{fieldErrors[f.name]}</p>}
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button type="submit" disabled={saving} className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg disabled:opacity-60">
                {saving ? "Saving…" : editingId ? "Save Changes" : "Add"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFieldErrors({}); }} className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-400 transition">
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-8 text-center text-sm text-slate-500">Loading live data…</p>
          ) : filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">
              {items.length === 0 ? "Nothing here yet. Click “Add New”." : `No matches for “${search}”.`}
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 p-4 md:px-6 hover:bg-slate-50 transition">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900 truncate max-w-[40vw]">{item.title}</span>
                      {tab !== "ams" && (
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${item.active !== false ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
                          {item.active !== false ? "Live" : "Hidden"}
                        </span>
                      )}
                      {item.category && <span className="text-[11px] text-slate-500 truncate">{item.category}</span>}
                    </div>
                    {(item.tagline || item.description) && (
                      <p className="mt-0.5 text-sm text-slate-500 truncate max-w-[60vw]">{item.tagline || item.description}</p>
                    )}
                    {item.updatedAt && <p className="mt-0.5 text-[11px] text-slate-400">Updated {fmtDate(item.updatedAt)}</p>}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <a
                      href={tab === "portfolio" && item.link ? item.link : meta.viewAll}
                      target={tab === "portfolio" && item.link ? "_blank" : undefined}
                      rel="noreferrer"
                      className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition"
                    >
                      View
                    </a>
                    <button onClick={() => openEdit(item)} className="rounded-full border border-indigo-200 px-4 py-1.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition">
                      Edit
                    </button>
                    <button onClick={() => setDeleting(item)} className="rounded-full border border-rose-200 px-4 py-1.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition">
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

      {deleting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-5" onClick={() => !deletingBusy && setDeleting(null)}>
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900">Delete this {meta.singular}?</h3>
            <p className="mt-2 text-sm text-slate-600 break-words">
              “{deleting.title}” will be removed from the website immediately. This cannot be undone.
            </p>
            <div className="mt-5 flex gap-3 justify-end">
              <button onClick={() => setDeleting(null)} disabled={deletingBusy} className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400 transition disabled:opacity-50">
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={deletingBusy} className="rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-700 transition disabled:opacity-60">
                {deletingBusy ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
