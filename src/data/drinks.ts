// ─── DATA ─────────────────────────────────────────────────────────────────────
// This is the single source of truth — add/edit drinks only here.

export type Temp = "heiss" | "kalt" | "sonder";
export type Machine = "siebträger" | "switch" | "instant" | "glas" | "bialetti";
export type Prep = "sofort" | "vorbereitung";

export interface Drink {
  id: number;
  name: string;
  group: string;
  temp: Temp;
  milk: boolean;
  machines: Machine[];
  prep: Prep;
  howto: string;
}

export const drinks: Drink[] = [
  // ── HEISS · OHNE MILCH ──────────────────────────────────────────────────────
  {
    id: 1, name: "Espresso", group: "Heiß · Schwarz",
    temp: "heiss", milk: false, machines: ["siebträger"], prep: "sofort",
    howto: "7–9g fein gemahlen, 25–30 Sek., 25–30ml Ausbeute. Grundlage für alles.",
  },
  {
    id: 2, name: "Ristretto", group: "Heiß · Schwarz",
    temp: "heiss", milk: false, machines: ["siebträger"], prep: "sofort",
    howto: "Gleiche Dosis wie Espresso, nur 15ml Ausbeute. Konzentrierter, weniger bitter, mehr Süße.",
  },
  {
    id: 3, name: "Americano", group: "Heiß · Schwarz",
    temp: "heiss", milk: false, machines: ["siebträger", "bialetti"], prep: "sofort",
    howto: "Heißes Wasser in die Tasse, Espresso langsam drüber gießen. Nicht andersrum — die Crema bleibt oben.",
  },
  {
    id: 4, name: "Aerocano", group: "Heiß · Schwarz",
    temp: "heiss", milk: false, machines: ["siebträger", "bialetti"], prep: "sofort",
    howto: "Wasser mit der Dampflanze erhitzen und dabei leicht texturieren, dann mit dem Espresso kombinieren. Die Dampflanze erzeugt feine Mikrobläschen im Wasser — das Ergebnis ist seidiger und runder als wenn man einfach heißes Wasser dazugießt.",
  },
  {
    id: 5, name: "Pour Over", group: "Heiß · Schwarz",
    temp: "heiss", milk: false, machines: ["switch"], prep: "sofort",
    howto: "Switch offen lassen, normales V60-Rezept. 1:15–1:16 Verhältnis, Bloom 30 Sek., gesamt 3–4 Min.",
  },
  {
    id: 6, name: "Switch Immersion", group: "Heiß · Schwarz",
    temp: "heiss", milk: false, machines: ["switch"], prep: "sofort",
    howto: "Schalter zu, Wasser drauf, 3–4 Min. ziehen lassen, dann aufmachen. Vollmundiger als Pour Over, gleichmäßigere Extraktion.",
  },
  // ── HEISS · MIT MILCH ───────────────────────────────────────────────────────
  {
    id: 7, name: "Cappuccino", group: "Heiß · Mit Milch",
    temp: "heiss", milk: true, machines: ["siebträger", "bialetti"], prep: "sofort",
    howto: "Espresso + gleichviel Milchschaum. Dampflanze: kalte Milch, erst Textur aufbauen, dann Temperatur. 55–65 °C.",
  },
  {
    id: 8, name: "Flat White", group: "Heiß · Mit Milch",
    temp: "heiss", milk: true, machines: ["siebträger"], prep: "sofort",
    howto: "Doppelter Ristretto + wenig Milch, kaum Schaum. Konzentrierter als Latte, kleiner als Cappuccino. Ursprünglich aus Australien.",
  },
  {
    id: 9, name: "Latte", group: "Heiß · Mit Milch",
    temp: "heiss", milk: true, machines: ["siebträger", "bialetti"], prep: "sofort",
    howto: "Espresso + 150–200ml aufgeschäumte Milch. Mild, groß. Klassiker für Latte Art.",
  },
  {
    id: 10, name: "Macchiato", group: "Heiß · Mit Milch",
    temp: "heiss", milk: true, machines: ["siebträger", "bialetti"], prep: "sofort",
    howto: "Espresso mit einem Löffel Milchschaum obendrauf. «Gefleckt» — mehr Markierung als Milchdrink.",
  },
  {
    id: 11, name: "Filter Latte", group: "Heiß · Mit Milch",
    temp: "heiss", milk: true, machines: ["switch", "siebträger"], prep: "sofort",
    howto: "V60 Pour Over + aufgeschäumte Milch via Dampflanze. Helle Röstungen mit Cremigkeit — Nerd-Pflicht. The Barn / Five Elephant empfohlen.",
  },
  // ── KALT · OHNE MILCH ───────────────────────────────────────────────────────
  {
    id: 12, name: "Freddo Espresso", group: "Kalt · Schwarz",
    temp: "kalt", milk: false, machines: ["siebträger"], prep: "sofort",
    howto: "Doppio ziehen, sofort in hohes Glas mit Eis, 20 Sek. schütteln. Dichter Espresso-Schaum entsteht oben. Der griechisch-zypriotische Standard.",
  },
  {
    id: 13, name: "Iced Americano", group: "Kalt · Schwarz",
    temp: "kalt", milk: false, machines: ["siebträger", "bialetti"], prep: "sofort",
    howto: "Glas mit Eis füllen, kaltes Wasser rein, Doppio langsam drüber gießen. Simpelster Cold Drink, oft unterschätzt.",
  },
  {
    id: 14, name: "Japanese Iced Coffee", group: "Kalt · Schwarz",
    temp: "kalt", milk: false, machines: ["switch"], prep: "sofort",
    howto: "40% des Wassers als Eis in den Krug geben. Normales Rezept, direkt auf Eis brühen. Helle Röstungen brillieren — fruchtig, klar, sofort trinkbar.",
  },
  {
    id: 15, name: "Cold Brew", group: "Kalt · Schwarz",
    temp: "kalt", milk: false, machines: ["switch", "glas"], prep: "vorbereitung",
    howto: "Kaffee grob mahlen (gröber als Pour Over), 1:8 mit kaltem Wasser in ein Einmachglas. Deckel drauf, 12–16h im Kühlschrank. Danach durch den Switch mit Papierfilter filtern — gibt einen sauberen Cold Brew ohne Fines und Öle.",
  },
  {
    id: 16, name: "Espresso Tonic", group: "Kalt · Schwarz",
    temp: "kalt", milk: false, machines: ["siebträger"], prep: "sofort",
    howto: "Tonic Water über Eis ins Glas, Espresso langsam und hoch drüber laufen lassen. Nicht umrühren — der Gradient ist der Drink.",
  },
  {
    id: 17, name: "Cold Brew Tonic", group: "Kalt · Schwarz",
    temp: "kalt", milk: false, machines: ["switch"], prep: "vorbereitung",
    howto: "Cold Brew 1:1 mit Tonic Water über Eis. Sanfter als Espresso Tonic, mehr Komplexität durch die lange Extraktion.",
  },
  {
    id: 18, name: "Black Frappé", group: "Kalt · Schwarz",
    temp: "kalt", milk: false, machines: ["instant"], prep: "sofort",
    howto: "1–2 TL Instant + 2 TL Zucker + Spritzer Wasser, Frappé-Mixer bis dichter, stabiler Schaum entsteht (~30 Sek.). Eis dazu. Nur mit Instant möglich.",
  },
  // ── KALT · MIT MILCH ────────────────────────────────────────────────────────
  {
    id: 19, name: "Freddo Cappuccino", group: "Kalt · Mit Milch",
    temp: "kalt", milk: true, machines: ["siebträger"], prep: "sofort",
    howto: "Freddo Espresso als Basis (shaken), Cold Foam separat via Doppelsieb-Aufschäumer oder Frother aufschäumen, drauflöffeln.",
  },
  {
    id: 20, name: "Iced Latte", group: "Kalt · Mit Milch",
    temp: "kalt", milk: true, machines: ["siebträger", "bialetti"], prep: "sofort",
    howto: "Glas mit Eis, kalte Milch rein, Espresso langsam drüber gießen. Das Fundament aller Milch-Cold-Drinks.",
  },
  {
    id: 21, name: "Cold Brew Latte", group: "Kalt · Mit Milch",
    temp: "kalt", milk: true, machines: ["switch"], prep: "vorbereitung",
    howto: "Cold Brew 1:1 mit kalter Milch über Eis. Sehr mild und smooth — ideal für heiße Tage.",
  },
  {
    id: 22, name: "Cold Foam Cold Brew", group: "Kalt · Mit Milch",
    temp: "kalt", milk: true, machines: ["switch"], prep: "vorbereitung",
    howto: "Cold Brew auf Eis. Separat 1,5%-Milch kalt aufschäumen, drauflöffeln. Zwei Schichten, nicht einrühren.",
  },
  {
    id: 23, name: "White Frappé", group: "Kalt · Mit Milch",
    temp: "kalt", milk: true, machines: ["instant"], prep: "sofort",
    howto: "Wie Black Frappé, am Ende 100–150ml Milch langsam dazugießen. Schaum bleibt oben, nicht umrühren.",
  },
  {
    id: 24, name: "Dalgona", group: "Kalt · Mit Milch",
    temp: "kalt", milk: true, machines: ["instant"], prep: "sofort",
    howto: "2 EL Instant + 2 EL Zucker + 2 EL heißes Wasser aufschlagen bis cremige, glänzende Masse entsteht. Über kalter Milch und Eis servieren.",
  },
  // ── BIALETTI ────────────────────────────────────────────────────────────────
  {
    id: 26, name: "Moka", group: "Heiß · Schwarz",
    temp: "heiss", milk: false, machines: ["bialetti"], prep: "sofort",
    howto: "Bialetti mit Wasser bis zum Ventil füllen, Siebeinsatz mit mittelfein gemahlenem Kaffee füllen, nicht pressen. Auf mittlerer Hitze erhitzen bis es gluckert, sofort von der Platte nehmen.",
  },
  {
    id: 27, name: "Caffè Corretto", group: "Heiß · Schwarz",
    temp: "heiss", milk: false, machines: ["bialetti"], prep: "sofort",
    howto: "Heißen Moka mit einem Schuss Grappa, Sambuca oder Cognac «korrigieren». Klassischer italienischer Absacker nach dem Essen.",
  },
  {
    id: 28, name: "Moka Shakerato", group: "Kalt · Schwarz",
    temp: "kalt", milk: false, machines: ["bialetti"], prep: "sofort",
    howto: "Moka brühen, sofort in ein Glas mit viel Eis geben, 15–20 Sek. schütteln. Gleiche Idee wie Freddo Espresso, nur mit Moka als Basis — weniger Schaum, dafür rundere Süße.",
  },
  // ── SONDER ──────────────────────────────────────────────────────────────────
  {
    id: 25, name: "Affogato", group: "Sonder",
    temp: "sonder", milk: false, machines: ["siebträger", "bialetti"], prep: "sofort",
    howto: "Kugel Vanilleeis in ein Glas, heißen Espresso direkt drüber gießen. Nicht umrühren — heiß trifft kalt trifft bitter trifft süß.",
  },
];

// ─── CONFIG ───────────────────────────────────────────────────────────────────

export const TEMP_COLORS: Record<Temp, { dot: string; border: string; label: string }> = {
  heiss: { dot: "#D4522A", border: "#FDDFD6", label: "Heiß" },
  kalt:  { dot: "#2D7BA5", border: "#D6EAF5", label: "Kalt" },
  sonder:{ dot: "#7C5CBF", border: "#EBE4F8", label: "Sonder" },
};

export const MACHINE_LABELS: Record<Machine, string> = {
  "siebträger": "Siebträger",
  "switch":     "V60 Switch",
  "instant":    "Instant",
  "glas":       "Einmachglas",
  "bialetti":   "Bialetti",
};
