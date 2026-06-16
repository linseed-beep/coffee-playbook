"use client";

import { useState } from "react";
import { drinks, TEMP_COLORS, MACHINE_LABELS, Temp, Machine, Prep } from "@/data/drinks";

type MilkFilter = "alle" | "ohne" | "mit";
type TempFilter = "alle" | Temp;
type MachineFilter = "alle" | Machine;
type PrepFilter = "alle" | Prep;

interface Filters {
  temp: TempFilter;
  milk: MilkFilter;
  machine: MachineFilter;
  prep: PrepFilter;
}

const INITIAL_FILTERS: Filters = { temp: "alle", milk: "alle", machine: "alle", prep: "alle" };

export default function CoffeePlaybook() {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [expanded, setExpanded] = useState<number | null>(null);

  const setFilter = <K extends keyof Filters>(key: K, val: Filters[K]) => {
    setExpanded(null);
    setFilters(f => ({ ...f, [key]: f[key] === val ? "alle" : val }));
  };

  const filtered = drinks.filter(d => {
    if (filters.temp !== "alle" && d.temp !== filters.temp) return false;
    if (filters.milk !== "alle") {
      if (filters.milk === "ohne" && d.milk) return false;
      if (filters.milk === "mit" && !d.milk) return false;
    }
    if (filters.machine !== "alle" && !d.machines.includes(filters.machine)) return false;
    if (filters.prep !== "alle" && d.prep !== filters.prep) return false;
    return true;
  });

  const hasFilters = Object.values(filters).some(v => v !== "alle");

  // Group drinks by group label when no filters active
  const showGroups = !hasFilters;
  const groups = showGroups
    ? [...new Set(drinks.map(d => d.group))].map(g => ({
        label: g as string | null,
        items: filtered.filter(d => d.group === g),
      })).filter(g => g.items.length > 0)
    : [{ label: null as string | null, items: filtered }];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#EDEBE6", minHeight: "100vh", color: "#1A1917" }}>

      {/* ── HEADER ── */}
      <div style={{ background: "#1A1917", color: "#EDEBE6", padding: "36px 24px 28px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(28px, 6vw, 44px)", fontWeight: 800, margin: "0 0 10px", letterSpacing: "-0.03em", lineHeight: 1.0 }}>
            Coffee Playbook
          </h1>
          <p style={{ margin: 0, color: "#8A8781", fontSize: 14 }}>
            {filtered.length} von {drinks.length} Drinks
          </p>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div style={{ background: "#EDEBE6", borderBottom: "1px solid #D8D5D0", padding: "14px 24px", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>

          {/* Row 1: Temp + Milk */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9A9793", textTransform: "uppercase", letterSpacing: "0.08em", marginRight: 2 }}>Temp</span>
            {[
              { val: "heiss" as const, label: "☀ Heiß" },
              { val: "kalt" as const,  label: "❄ Kalt" },
            ].map(o => <FilterBtn key={o.val} active={filters.temp === o.val} onClick={() => setFilter("temp", o.val)}>{o.label}</FilterBtn>)}
            <div style={{ width: 1, height: 18, background: "#C8C5C0", margin: "0 4px" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9A9793", textTransform: "uppercase", letterSpacing: "0.08em", marginRight: 2 }}>Milch</span>
            {[
              { val: "ohne" as const, label: "Schwarz" },
              { val: "mit" as const,  label: "Mit Milch" },
            ].map(o => <FilterBtn key={o.val} active={filters.milk === o.val} onClick={() => setFilter("milk", o.val)}>{o.label}</FilterBtn>)}
          </div>

          {/* Row 2: Machine + Prep */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9A9793", textTransform: "uppercase", letterSpacing: "0.08em", marginRight: 2 }}>Gerät</span>
            {[
              { val: "siebträger" as const, label: "Siebträger" },
              { val: "switch" as const,     label: "V60 Switch" },
              { val: "instant" as const,    label: "Instant" },
              { val: "bialetti" as const,   label: "Bialetti" },
            ].map(o => <FilterBtn key={o.val} active={filters.machine === o.val} onClick={() => setFilter("machine", o.val)}>{o.label}</FilterBtn>)}
            <div style={{ width: 1, height: 18, background: "#C8C5C0", margin: "0 4px" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9A9793", textTransform: "uppercase", letterSpacing: "0.08em", marginRight: 2 }}>Zeit</span>
            {[
              { val: "sofort" as const,       label: "Sofort" },
              { val: "vorbereitung" as const, label: "Vorbereitung" },
            ].map(o => <FilterBtn key={o.val} active={filters.prep === o.val} onClick={() => setFilter("prep", o.val)}>{o.label}</FilterBtn>)}
            {hasFilters && (
              <button
                onClick={() => { setFilters(INITIAL_FILTERS); setExpanded(null); }}
                style={{ marginLeft: 6, fontSize: 12, color: "#9A9793", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: "4px 0" }}
              >
                zurücksetzen
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── DRINK LIST ── */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 24px 48px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9A9793", fontSize: 15 }}>
            Keine Drinks für diese Kombination.
          </div>
        ) : (
          groups.map(group => (
            <div key={group.label ?? "all"} style={{ marginBottom: 8 }}>
              {group.label && (
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#9A9793", padding: "16px 0 8px", borderBottom: "1px solid #D8D5D0", marginBottom: 6 }}>
                  {group.label}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {group.items.map(drink => {
                  const isOpen = expanded === drink.id;
                  const tc = TEMP_COLORS[drink.temp];
                  return (
                    <div
                      key={drink.id}
                      onClick={() => setExpanded(isOpen ? null : drink.id)}
                      style={{
                        background: "#FFFFFF",
                        borderRadius: 10,
                        border: `1px solid ${isOpen ? "#CCCAC6" : "#E5E2DC"}`,
                        borderLeft: `3px solid ${tc.dot}`,
                        overflow: "hidden",
                        cursor: "pointer",
                        boxShadow: isOpen ? "0 3px 14px rgba(0,0,0,0.07)" : "none",
                        transition: "box-shadow 0.15s",
                      }}
                    >
                      {/* Card header */}
                      <div style={{ padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: "-0.01em" }}>{drink.name}</span>
                            {/* Machine tags */}
                            {drink.machines.map(m => (
                              <span key={m} style={{ fontSize: 10.5, padding: "2px 7px", borderRadius: 5, background: "#F0EEEA", color: "#6B6866", border: "1px solid #DDD9D3", fontWeight: 500 }}>
                                {MACHINE_LABELS[m]}
                              </span>
                            ))}
                            {drink.prep === "vorbereitung" && (
                              <span style={{ fontSize: 10.5, padding: "2px 7px", borderRadius: 5, background: "#FEF3C7", color: "#92400E", border: "1px solid #FCD34D", fontWeight: 500 }}>
                                ⏱ Vorbereitung
                              </span>
                            )}
                          </div>
                        </div>
                        <span style={{ color: "#B8B5B0", fontSize: 11, flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</span>
                      </div>

                      {/* Expanded recipe */}
                      {isOpen && (
                        <div style={{ borderTop: "1px solid #F0EDE8", padding: "13px 16px", background: "#FAFAF8" }}>
                          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9A9793", marginBottom: 6 }}>Zubereitung</div>
                          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "#2E2C2A" }}>{drink.howto}</p>
                          {showGroups && (
                            <div style={{ marginTop: 10, fontSize: 11, color: "#B8B5B0" }}>{drink.group}</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}


      </div>
    </div>
  );
}

// ── Sub-component ──────────────────────────────────────────────────────────────

function FilterBtn({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 12px",
        borderRadius: 20,
        border: active ? "1.5px solid #1A1917" : "1.5px solid #C8C5C0",
        background: active ? "#1A1917" : "transparent",
        color: active ? "#EDEBE6" : "#6B6866",
        fontSize: 12.5,
        fontWeight: 500,
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.12s",
      }}
    >
      {children}
    </button>
  );
}
