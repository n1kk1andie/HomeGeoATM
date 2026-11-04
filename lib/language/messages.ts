import { DEFAULT_LANGUAGE } from "./languages";

// Messages: each product keeps one file per language, keyed the same as its
// English file. A message is plain text with ICU-style arguments:
//   "Hello {name}"
//   "{count, plural, =0 {No ATMs} one {# ATM} other {# ATMs}}"
//   "{status, select, open {Open} other {Closed}}"
// `#` inside a plural is the count, formatted for the language. A literal
// brace or # is not supported in messages (none of ours need one).

export type Messages = { [key: string]: string | Messages };
export type Flat = Record<string, string>;
export type Vars = Record<string, string | number | null | undefined>;

type Node =
  | { t: "text"; v: string }
  | { t: "arg"; name: string }
  | { t: "hash" }
  | { t: "plural" | "select"; name: string; options: Record<string, Node[]> };

export class MessageSyntaxError extends Error {}

export function parse(src: string): Node[] {
  let i = 0;
  const err = (m: string) => new MessageSyntaxError(`${m} at ${i} in "${src.slice(0, 80)}"`);
  const ws = () => {
    while (i < src.length && /\s/.test(src[i])) i++;
  };
  const word = () => {
    const s = i;
    while (i < src.length && /[^\s{},]/.test(src[i])) i++;
    return src.slice(s, i);
  };
  function seq(inPlural: boolean, nested: boolean): Node[] {
    const out: Node[] = [];
    let buf = "";
    const flush = () => {
      if (buf) out.push({ t: "text", v: buf });
      buf = "";
    };
    while (i < src.length) {
      const c = src[i];
      if (c === "{") {
        flush();
        i++;
        out.push(arg());
      } else if (c === "}") {
        if (!nested) throw err("Unexpected }");
        break;
      } else if (c === "#" && inPlural) {
        flush();
        out.push({ t: "hash" });
        i++;
      } else {
        buf += c;
        i++;
      }
    }
    flush();
    return out;
  }
  function arg(): Node {
    ws();
    const name = word();
    if (!name) throw err("Missing argument name");
    ws();
    if (src[i] === "}") {
      i++;
      return { t: "arg", name };
    }
    if (src[i] !== ",") throw err("Expected , or }");
    i++;
    ws();
    const type = word();
    if (type !== "plural" && type !== "select") throw err(`Unsupported argument type "${type}"`);
    ws();
    if (src[i] !== ",") throw err("Expected ,");
    i++;
    const options: Record<string, Node[]> = {};
    for (;;) {
      ws();
      if (src[i] === "}") {
        i++;
        break;
      }
      const key = word();
      if (!key) throw err("Missing option key");
      ws();
      if (src[i] !== "{") throw err("Expected {");
      i++;
      options[key] = seq(type === "plural", true);
      if (src[i] !== "}") throw err("Unclosed option");
      i++;
    }
    if (!options.other) throw err(`${type} needs an "other" option`);
    return { t: type, name, options };
  }
  const out = seq(false, false);
  return out;
}

export function serialize(nodes: Node[]): string {
  return nodes
    .map((n) => {
      if (n.t === "text") return n.v;
      if (n.t === "hash") return "#";
      if (n.t === "arg") return `{${n.name}}`;
      const opts = Object.entries(n.options).map(([k, v]) => `${k} {${serialize(v)}}`).join(" ");
      return `{${n.name}, ${n.t}, ${opts}}`;
    })
    .join("");
}

const pluralRules = new Map<string, Intl.PluralRules>();
const numberFormats = new Map<string, Intl.NumberFormat>();
const rulesFor = (lang: string) => pluralRules.get(lang) ?? pluralRules.set(lang, new Intl.PluralRules(lang)).get(lang)!;
const numFor = (lang: string) => numberFormats.get(lang) ?? numberFormats.set(lang, new Intl.NumberFormat(lang)).get(lang)!;

function render(nodes: Node[], lang: string, vars: Vars, hash: string | null): string {
  let out = "";
  for (const n of nodes) {
    if (n.t === "text") out += n.v;
    else if (n.t === "hash") out += hash ?? "#";
    else if (n.t === "arg") {
      const v = vars[n.name];
      out += v === undefined || v === null ? `{${n.name}}` : typeof v === "number" ? numFor(lang).format(v) : String(v);
    } else if (n.t === "plural") {
      const count = Number(vars[n.name]);
      if (!Number.isFinite(count)) {
        out += render(n.options.other, lang, vars, `{${n.name}}`);
        continue;
      }
      const branch = n.options[`=${count}`] ?? n.options[rulesFor(lang).select(count)] ?? n.options.other;
      out += render(branch, lang, vars, numFor(lang).format(count));
    } else {
      const branch = n.options[String(vars[n.name])] ?? n.options.other;
      out += render(branch, lang, vars, hash);
    }
  }
  return out;
}

const parsed = new Map<string, Node[]>();
function ast(src: string): Node[] {
  let a = parsed.get(src);
  if (!a) {
    a = parse(src);
    if (parsed.size > 5000) parsed.clear();
    parsed.set(src, a);
  }
  return a;
}

/** Format one message in a language. A message that doesn't parse is shown as written. */
export function formatMessage(src: string, lang: string, vars: Vars = {}): string {
  try {
    return render(ast(src), lang, vars, null);
  } catch {
    return src;
  }
}

/** Nested message files -> "a.b.c" keys. */
export function flatten(m: Messages, prefix = "", out: Flat = {}): Flat {
  for (const [k, v] of Object.entries(m)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string") out[key] = v;
    else if (v && typeof v === "object") flatten(v, key, out);
  }
  return out;
}

/** "a.b.c" keys -> nested, in the order of `order` (the English file) where given. */
export function unflatten(flat: Flat, order?: string[]): Messages {
  const out: Messages = {};
  const keys = order ? [...order.filter((k) => k in flat), ...Object.keys(flat).filter((k) => !order.includes(k))] : Object.keys(flat);
  for (const key of keys) {
    const parts = key.split(".");
    let cur = out;
    for (const p of parts.slice(0, -1)) cur = (cur[p] = typeof cur[p] === "object" ? cur[p] : {}) as Messages;
    cur[parts[parts.length - 1]] = flat[key];
  }
  return out;
}

/** The argument names a message uses (including plural/select arguments). */
export function argumentsOf(src: string): string[] {
  const names = new Set<string>();
  const walk = (nodes: Node[]) => {
    for (const n of nodes) {
      if (n.t === "arg") names.add(n.name);
      else if (n.t === "plural" || n.t === "select") {
        names.add(n.name);
        Object.values(n.options).forEach(walk);
      }
    }
  };
  walk(ast(src));
  return [...names].sort();
}

export interface MessageProblems {
  missing: string[];
  extra: string[];
  /** Keys whose arguments differ from English (a translation dropped or renamed {name}). */
  arguments: string[];
  /** Keys that don't parse. */
  syntax: string[];
}

/** Check a translation file against the English one. */
export function checkMessages(english: Messages, other: Messages): MessageProblems {
  const en = flatten(english);
  const tr = flatten(other);
  const p: MessageProblems = { missing: [], extra: [], arguments: [], syntax: [] };
  for (const k of Object.keys(en)) {
    if (!(k in tr)) {
      p.missing.push(k);
      continue;
    }
    try {
      if (argumentsOf(en[k]).join() !== argumentsOf(tr[k]).join()) p.arguments.push(k);
    } catch {
      p.syntax.push(k);
    }
  }
  for (const k of Object.keys(tr)) if (!(k in en)) p.extra.push(k);
  return p;
}

export type Translate = (key: string, vars?: Vars) => string;

/**
 * t(key, vars) for one language: its own message, else English, else the key
 * itself (so a missing message is visible, never blank). `onMissing` hears of
 * keys that fell back, for logging.
 */
export function createTranslator(opts: {
  lang: string;
  messages: Messages | Flat;
  fallback?: Messages | Flat;
  onMissing?: (key: string, lang: string) => void;
}): Translate {
  const own = flatten(opts.messages as Messages);
  const en = opts.fallback ? flatten(opts.fallback as Messages) : {};
  return (key, vars = {}) => {
    if (key in own) return formatMessage(own[key], opts.lang, vars);
    opts.onMissing?.(key, opts.lang);
    if (key in en) return formatMessage(en[key], DEFAULT_LANGUAGE, vars);
    return key;
  };
}

// ---- Machine translation of a message -------------------------------------
// A message is translated as "units": the top-level text and each plural or
// select branch. Arguments, #, and nested plurals/selects inside a unit are
// replaced by tokens (n) the engine must not touch; afterwards the
// translated units are put back into the same structure. Branch keys (one,
// other, =0, open...) are never translated.

export const TOKEN = (n: number) => `${n}`;
const TOKEN_RE = /(\d+)/g;

export function splitForTranslation(src: string): { units: string[]; join: (translated: string[]) => string } {
  const nodes = parse(src);
  const units: string[] = [];
  type Plan = { unit: number; tokens: Node[]; children: Map<Node, Map<string, Plan>> };

  function plan(seq: Node[]): Plan {
    const tokens: Node[] = [];
    const children = new Map<Node, Map<string, Plan>>();
    let text = "";
    for (const n of seq) {
      if (n.t === "text") text += n.v;
      else {
        text += TOKEN(tokens.length);
        tokens.push(n);
        if (n.t === "plural" || n.t === "select") {
          const m = new Map<string, Plan>();
          for (const [k, v] of Object.entries(n.options)) m.set(k, plan(v));
          children.set(n, m);
        }
      }
    }
    units.push(text);
    return { unit: units.length - 1, tokens, children };
  }
  const root = plan(nodes);

  function rebuild(p: Plan, translated: string[]): Node[] {
    const out: Node[] = [];
    const text = translated[p.unit] ?? units[p.unit];
    let last = 0;
    const used = new Set<number>();
    for (const m of text.matchAll(TOKEN_RE)) {
      if (m.index! > last) out.push({ t: "text", v: text.slice(last, m.index) });
      const k = Number(m[1]);
      const tok = p.tokens[k];
      if (tok && !used.has(k)) {
        used.add(k);
        if (tok.t === "plural" || tok.t === "select") {
          const opts: Record<string, Node[]> = {};
          for (const [key, child] of p.children.get(tok)!) opts[key] = rebuild(child, translated);
          out.push({ t: tok.t, name: tok.name, options: opts });
        } else out.push(tok);
      }
      last = m.index! + m[0].length;
    }
    if (last < text.length) out.push({ t: "text", v: text.slice(last) });
    // A token the engine dropped is put back at the end rather than lost.
    p.tokens.forEach((tok, k) => {
      if (used.has(k)) return;
      if (tok.t === "plural" || tok.t === "select") {
        const opts: Record<string, Node[]> = {};
        for (const [key, child] of p.children.get(tok)!) opts[key] = rebuild(child, translated);
        out.push({ t: "text", v: " " }, { t: tok.t, name: tok.name, options: opts });
      } else out.push({ t: "text", v: " " }, tok);
    });
    return out;
  }

  return { units, join: (translated) => serialize(rebuild(root, translated)) };
}
