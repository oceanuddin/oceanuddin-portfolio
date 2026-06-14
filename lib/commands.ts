import { profile, projects, skills, certifications, CTF_FLAG } from "./content";
import { strum } from "./guitar";

export type CommandResult = {
  lines: string[];
  /** special side-effects the terminal UI handles */
  effect?: "clear" | "matrix" | "close";
};

const RECIPES = [
  {
    name: "Thai Curry Meatballs",
    steps: [
      "Blend pork, lemongrass, garlic, fish sauce → roll into balls.",
      "Sear, then simmer in coconut milk + red curry paste.",
      "Finish with lime, basil. Serve over jasmine rice.",
    ],
  },
  {
    name: "Lomo Saltado",
    steps: [
      "Sear marinated beef strips screaming hot.",
      "Stir-fry red onion, tomato, ají amarillo; deglaze with soy + vinegar.",
      "Toss with fries. Serve with rice. Peruvian-Chinese magic.",
    ],
  },
  {
    name: "Korean Dakgalbi",
    steps: [
      "Marinate chicken in gochujang, soy, garlic, ginger.",
      "Stir-fry with cabbage, sweet potato, rice cakes on high heat.",
      "Top with melty cheese + scallion. Optional sous-vide chicken first.",
    ],
  },
];

const ASCII = [
  "   ___   _   _ ",
  "  / _ \\ | | | |",
  " | | | || | | |",
  " | |_| || |_| |",
  "  \\___/  \\___/ ",
];

export const HELP_LINES = [
  "available commands:",
  "  help        this menu",
  "  whoami      who is ocean?",
  "  ls          list sections",
  "  cat <file>  read about.txt | skills | certs | flag",
  "  nmap        scan the host",
  "  projects    list shipped & in-progress work",
  "  recipe      a random globally-inspired recipe  🍳",
  "  strum       play an acoustic chord            🎸",
  "  contact     how to reach me",
  "  sudo        (don't)",
  "  matrix      enter the matrix",
  "  clear       clear the screen",
  "  exit        close terminal",
];

export function runCommand(raw: string): CommandResult {
  const input = raw.trim();
  const [cmd, ...args] = input.split(/\s+/);
  const arg = args.join(" ").toLowerCase();

  switch (cmd.toLowerCase()) {
    case "":
      return { lines: [] };

    case "help":
    case "?":
      return { lines: HELP_LINES };

    case "whoami":
      return {
        lines: [
          ...ASCII,
          "",
          `${profile.name} — ${profile.roles.join(" · ")}`,
          `📍 ${profile.location}`,
          profile.tagline,
        ],
      };

    case "ls":
      return {
        lines: [
          "about/      experience/   projects/   skills/",
          "education/  interests/    contact/    .secrets/",
        ],
      };

    case "cat": {
      if (arg === "about.txt" || arg === "about")
        return {
          lines: [
            "Recent UCF IT grad & self-starter. IT support, Apple repair,",
            "cybersecurity, and full-stack IoT. I build things end to end.",
          ],
        };
      if (arg === "skills" || arg === "stack.json")
        return { lines: skills.map((s) => `${s.label.padEnd(16)} ${s.items.join(", ")}`) };
      if (arg === "certs" || arg === "certifications")
        return { lines: certifications.map((c) => `✓ ${c.name} (${c.issuer})`) };
      if (arg === "flag" || arg === ".secrets/flag")
        return { lines: ["🚩 you found it:", CTF_FLAG, "(mention this in your message — let's talk)"] };
      if (!arg) return { lines: ["usage: cat <file> — try about.txt, skills, certs, flag"] };
      return { lines: [`cat: ${arg}: No such file or directory`] };
    }

    case "nmap":
      return {
        lines: [
          "Starting Nmap scan against oceanuddin.com ...",
          "Host is up (0.00042s latency).",
          "PORT     STATE  SERVICE",
          "22/tcp   open   ssh        (curiosity welcome)",
          "80/tcp   open   http",
          "443/tcp  open   https",
          "1337/tcp open   easter-eggs",
          "Scan done: 1 host up — try `cat flag`.",
        ],
      };

    case "projects":
      return {
        lines: projects.map((p) => `• ${p.name.padEnd(20)} ${p.status}`),
      };

    case "recipe":
    case "chef": {
      const r = RECIPES[Math.floor(Math.random() * RECIPES.length)];
      return { lines: [`🍳 ${r.name}`, ...r.steps.map((s, i) => `  ${i + 1}. ${s}`)] };
    }

    case "strum":
    case "play": {
      strum();
      return { lines: ["🎸 *strums a G chord* — Ocean plays acoustic guitar."] };
    }

    case "contact":
      return {
        lines: [
          `email     ${profile.email}`,
          `github    ${profile.links.github}`,
          `linkedin  ${profile.links.linkedin}`,
        ],
      };

    case "sudo":
      return { lines: ["nice try. ocean is not in the sudoers file. this incident will be reported. 🚓"] };

    case "matrix":
      return { lines: ["entering the matrix... (esc to exit)"], effect: "matrix" };

    case "clear":
    case "cls":
      return { lines: [], effect: "clear" };

    case "exit":
    case "quit":
      return { lines: ["connection closed."], effect: "close" };

    default:
      return { lines: [`command not found: ${cmd} — type 'help'`] };
  }
}
