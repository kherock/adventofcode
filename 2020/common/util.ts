import {
  decodeString,
  encodeToString,
} from "https://deno.land/std@0.80.0/encoding/hex.ts";

const AOC_URL = new URL("https://adventofcode.com/2020/");
const ROOT_DIR = new URL("..", import.meta.url);

export async function authenticate(force = false): Promise<string> {
  const sessionPath = new URL("session.bin", ROOT_DIR);
  try {
    if (force) throw new Error();
    return encodeToString(await Deno.readFile(sessionPath));
  } catch {
    let session: string;
    do {
      session = prompt("Enter your Advent of Code cookie string:") ?? "";
    } while (!session);
    await Deno.writeFile(sessionPath, decodeString(session));
    return session;
  }
}

async function generateReadme(input: string): Promise<string> {
  const { DOMParser } = await import("./deno-dom.ts");
  const { default: TurndownService } = await import("./turndown.js");
  const document = new DOMParser().parseFromString(input, "text/html")!;
  const turndownService = new TurndownService({ headingStyle: "atx" });
  turndownService.keep("span");
  return [...document.querySelectorAll(".day-desc")]
    .map((node) => turndownService.turndown(node) + "\n")
    .join("\n");
}

export const commands: Record<string, (...args: string[]) => Promise<void>> = {
  async login() {
    await authenticate(true);
  },
  async init(day) {
    const n = Number(day);
    if (!Number.isInteger(n)) {
      throw new Error(`Invalid day number: ${day}`);
    }

    const init: RequestInit = {
      headers: { Cookie: `session=${await authenticate()}` },
    };

    const dayDir = new URL(
      `../day${n.toString().padStart(2, "0")}/`,
      import.meta.url,
    );

    const dayHtmlRes = await fetch(new URL(`day/${n}`, AOC_URL), init);
    const dayInputRes = await fetch(new URL(`day/${n}/input`, AOC_URL), init);

    const readme = await generateReadme(await dayHtmlRes.text());
    const input = await dayInputRes.text();
    const encoder = new TextEncoder();
    await Deno.mkdir(dayDir, { recursive: true });
    await Promise.all([
      Deno.writeFile(new URL("input.txt", dayDir), encoder.encode(input)),
      Deno.writeFile(new URL("README.md", dayDir), encoder.encode(readme)),
    ]);
  },
};

if (import.meta.main) {
  try {
    const command = commands[Deno.args[0]];
    if (command) {
      await command(...Deno.args.slice(1));
    } else {
      console.info(`Valid subcommands: ${Object.keys(commands).join(", ")}`);
    }
  } catch (err) {
    console.error(err);
    Deno.exit(1);
  }
}
