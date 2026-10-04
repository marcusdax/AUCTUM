import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Button, Eyebrow, FieldRow, Sheet, Stamp, buttonClass } from "@/components/ui";
import {
  AGREEMENT_VERSION,
  agreementClauses,
  formatLabel,
  parseCatalog,
  type IntegrationModel,
} from "@/lib/exchange";
import { useExchange } from "@/lib/exchange-store";
import { formatCents, formatDate } from "@/lib/format";
import { useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/partners")({ component: PartnersPage });

const sampleCsv = `sku,lot,format,grams,priceCents
NORTH-084,AL-VN-26-084,roasted-bag,340,1899
NORTH-018,AL-CO-26-018,green-kilo,1000,1124`;

function PartnersPage() {
  const sellers = useExchange((s) => s.sellers);
  const listings = useExchange((s) => s.listings);
  const registerPartner = useExchange((s) => s.registerPartner);
  const verifySeller = useExchange((s) => s.verifySeller);
  const lots = useLedger((s) => s.lots);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [model, setModel] = useState<IntegrationModel>("affiliate");
  const [catalog, setCatalog] = useState("");
  const [agree, setAgree] = useState(false);
  const [signature, setSignature] = useState("");
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const parsed = useMemo(() => parseCatalog(catalog, lots), [catalog, lots]);
  const created = sellers.find((s) => s.id === createdId);
  const createdListings = created ? listings.filter((l) => l.sellerId === created.id) : [];

  function nextIdentity(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (name.trim().length < 2 || !email.includes("@") || !storeUrl.trim().startsWith("http")) {
      setErr("Name, a working email, and a store URL are the partnership minimum.");
      return;
    }
    setStep(2);
  }

  function nextCatalog(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!catalog.trim()) {
      setErr("Paste lot codes or a CSV. A partnership without lots does not go on the sheet.");
      return;
    }
    if (parsed.errors.length) {
      setErr("The catalog has rows the ledger will not accept.");
      return;
    }
    if (!parsed.lines.length) {
      setErr("No listings survived intake.");
      return;
    }
    setStep(3);
  }

  function sign(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!agree || signature.trim().length < 2) {
      setErr("The agreement is signed with a name, not a checkbox alone.");
      return;
    }
    const id = registerPartner({
      name,
      email,
      webhookUrl,
      storeUrl,
      integrationModel: model,
      signedName: signature.trim(),
      catalog: parsed.lines,
    });
    setCreatedId(id);
  }

  return (
    <div className="space-y-6">
      <Sheet>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Eyebrow>Partners · {AGREEMENT_VERSION}</Eyebrow>
            <h1 className="mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl">
              You keep the customer. We keep the proof.
            </h1>
            <p className="mt-3 max-w-xl text-slate">
              Affiliate-first. No fees. Buyers discover named lots on Auctum Exchange. You are notified
              in under a second. Fulfillment never leaves your store.
            </p>
          </div>
          <Stamp className="-rotate-3">No extraction</Stamp>
        </div>
        <ol className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {(["Identity", "Catalog", "Agreement"] as const).map((label, i) => (
            <li
              key={label}
              className={cn(
                "font-mono text-[11px] tracking-[0.16em] uppercase",
                step === i + 1 ? "text-stamp" : step > i + 1 ? "text-ink" : "text-slate",
              )}
            >
              0{i + 1} {label}
            </li>
          ))}
        </ol>
        <Link to="/partners/desk" className={`mt-4 ${buttonClass("ghost")}`}>
          Seller desk
        </Link>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Sheet>
          <Eyebrow>Join the Exchange</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">
            {step === 1 ? "Who is signing" : step === 2 ? "What goes live" : "The partnership"}
          </h2>

          {step === 1 ? (
            <form className="mt-6 space-y-4" onSubmit={nextIdentity}>
              <Field label="Business name">
                <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
              </Field>
              <Field label="Contact email">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
              </Field>
              <Field label="Store URL">
                <input
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  placeholder="https://yourstore.com/coffee"
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Webhook URL · optional">
                <input
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://hooks.yours.com/auctum"
                  className={inputClass}
                />
              </Field>
              <fieldset>
                <legend className="meta">Integration model</legend>
                <div className="mt-2 flex flex-wrap gap-4">
                  {(["affiliate", "dropship"] as const).map((m) => (
                    <label key={m} className="flex min-h-11 items-center gap-2 text-sm">
                      <input type="radio" name="model" checked={model === m} onChange={() => setModel(m)} />
                      {m}
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate">
                  {model === "affiliate"
                    ? "Launch path. Buyer is sent to your store. Auctum records intent."
                    : "Reserved. Same notice, fulfillment still yours until a later door."}
                </p>
              </fieldset>
              {err ? <p className="text-sm text-stamp">{err}</p> : null}
              <Button type="submit" tone="stamp">
                Continue to catalog
              </Button>
            </form>
          ) : null}

          {step === 2 ? (
            <form className="mt-6 space-y-4" onSubmit={nextCatalog}>
              <Field label="CSV or one lot code per line">
                <textarea
                  value={catalog}
                  onChange={(e) => setCatalog(e.target.value)}
                  rows={7}
                  placeholder={sampleCsv}
                  className={`${inputClass} font-mono text-[12px]`}
                />
              </Field>
              <label className="block">
                <span className="meta">Or load a CSV</span>
                <input
                  type="file"
                  accept=".csv,text/csv,text/plain"
                  className="mt-2 block w-full text-sm"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => setCatalog(String(reader.result ?? ""));
                    reader.readAsText(file);
                  }}
                />
              </label>
              <p className="text-xs text-slate">
                Columns: sku, lot, format, grams, priceCents. A bare lot code becomes a green kilo at 900¢
                until you price it.
              </p>
              {parsed.lines.length ? (
                <ul className="divide-y divide-hair border-y border-hair">
                  {parsed.lines.map((line) => {
                    const lot = lots.find((l) => l.id === line.lotId);
                    return (
                      <li key={line.sku} className="flex flex-wrap justify-between gap-2 py-2 text-sm">
                        <span>
                          {line.sku} · {lot?.code} · {formatLabel(line.format)} · {line.bagGrams} g
                        </span>
                        <span className="font-mono tabular">{formatCents(line.priceCents)}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
              {parsed.errors.length ? (
                <ul className="space-y-1">
                  {parsed.errors.map((message) => (
                    <li key={message} className="text-sm text-stamp">
                      {message}
                    </li>
                  ))}
                </ul>
              ) : null}
              {err ? <p className="text-sm text-stamp">{err}</p> : null}
              <div className="flex flex-wrap gap-3">
                <Button type="submit" tone="stamp">
                  Review agreement
                </Button>
                <Button type="button" tone="quiet" onClick={() => setStep(1)}>
                  Back
                </Button>
              </div>
            </form>
          ) : null}

          {step === 3 && !created ? (
            <form className="mt-6 space-y-4" onSubmit={sign}>
              <ol className="space-y-4">
                {agreementClauses.map((clause) => (
                  <li key={clause.id}>
                    <p className="meta">
                      {clause.id} · {clause.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">{clause.body}</p>
                  </li>
                ))}
              </ol>
              <label className="flex min-h-11 items-start gap-3 text-sm">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
                <span>I have authority to bind {name || "this business"} to {AGREEMENT_VERSION}.</span>
              </label>
              <Field label="Signature · type the name that binds">
                <input value={signature} onChange={(e) => setSignature(e.target.value)} className={inputClass} />
              </Field>
              {err ? <p className="text-sm text-stamp">{err}</p> : null}
              <div className="flex flex-wrap gap-3">
                <Button type="submit" tone="stamp">
                  Sign & submit
                </Button>
                <Button type="button" tone="quiet" onClick={() => setStep(2)}>
                  Back
                </Button>
              </div>
            </form>
          ) : null}

          {created ? (
            <div className="mt-6 border-t border-hair pt-5">
              <p className="meta">Signed {created.signedAt ? formatDate(created.signedAt) : ""}</p>
              <p className="mt-1 font-display text-2xl">{created.name}</p>
              <p className="mt-1 text-sm text-slate">
                {created.signedName} · {created.agreementVersion} · {createdListings.length} listing
                {createdListings.length === 1 ? "" : "s"} held until origin is verified.
              </p>
              <dl className="mt-3">
                <FieldRow label="API key" value={created.apiKey} />
                <FieldRow label="Notice" value={created.webhookUrl ? "Webhook, email if silent" : "Email only"} />
                <FieldRow label="Status" value={created.verifiedAt ? "Verified" : "Pending verification"} />
              </dl>
              {!created.verifiedAt ? (
                <Button type="button" tone="ghost" className="mt-4" onClick={() => verifySeller(created.id)}>
                  Verify origin & go live
                </Button>
              ) : (
                <p className="mt-3 text-sm text-sage">Listings are live with the verified-origin badge.</p>
              )}
              <Link to="/partners/desk" className={`mt-4 ${buttonClass("stamp")}`}>
                Open the desk
              </Link>
            </div>
          ) : null}
        </Sheet>

        <div className="space-y-6">
          <Sheet>
            <Eyebrow>Anchor set</Eyebrow>
            <h2 className="mt-2 font-display text-2xl">Sellers already on the sheet</h2>
            <ul className="mt-5 divide-y divide-hair">
              {sellers.map((s) => {
                const n = listings.filter((l) => l.sellerId === s.id && l.live).length;
                return (
                  <li key={s.id} className="py-3">
                    <Link to="/exchange/seller/$sellerId" params={{ sellerId: s.id }} className="font-display text-xl hover:text-stamp">
                      {s.name}
                    </Link>
                    <p className="text-sm text-slate">{s.pitch}</p>
                    <p className="mt-1 meta">
                      {s.verifiedAt ? `Verified ${formatDate(s.verifiedAt)}` : "Pending"} · {n} live ·{" "}
                      {s.webhookUrl ? "webhook" : "email only"}
                      {s.agreementVersion ? ` · ${s.agreementVersion}` : ""}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Sheet>
          <Sheet>
            <Eyebrow>Sample catalog</Eyebrow>
            <pre className="mt-3 overflow-x-auto font-mono text-[11px] leading-relaxed text-slate">{sampleCsv}</pre>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "mt-2 w-full border border-hair-strong bg-sheet px-3 py-3 text-sm text-ink placeholder:text-slate";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="meta">{label}</span>
      {children}
    </label>
  );
}
