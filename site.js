document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const yearNodes = document.querySelectorAll("[data-year]");
  const year = new Date().getFullYear();
  const applyTheme = (theme) => {
    const isLight = theme === "light";

    root.dataset.theme = theme;
    root.style.colorScheme = isLight ? "light" : "dark";

    if (themeColor) {
      themeColor.setAttribute("content", isLight ? "#ececed" : "#080808");
    }

    if (themeToggle) {
      themeToggle.textContent = isLight ? "Dark" : "Light";
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} mode`);
    }
  };

  const savedTheme = window.localStorage.getItem("shahed-theme") || "dark";

  applyTheme(savedTheme);

  yearNodes.forEach((node) => {
    node.textContent = String(year);
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "light" ? "dark" : "light";

      window.localStorage.setItem("shahed-theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  const createTerminal = () => {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
      <button class="terminal-toggle" type="button" aria-label="Toggle portfolio terminal" aria-expanded="false" data-terminal-toggle>
        <span>&gt;_</span>
      </button>

      <aside class="portfolio-terminal" data-terminal hidden aria-label="Interactive portfolio terminal">
        <div class="terminal-window-bar">
          <div class="terminal-title">
            <div class="terminal-lights" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>GHOSTTY - SHAHED@BUP</p>
          </div>
          <button class="terminal-close" type="button" aria-label="Close terminal">x</button>
        </div>
        <div class="terminal-screen" role="application" aria-label="Interactive portfolio terminal">
          <div class="terminal-output" data-terminal-output aria-live="polite"></div>
          <form class="terminal-form" data-terminal-form>
            <label class="terminal-prompt" for="terminal-command">shahed@bup ~/portfolio &gt;</label>
            <input id="terminal-command" name="command" type="text" autocomplete="off" autocorrect="off" spellcheck="false" data-terminal-input aria-label="Terminal command" />
          </form>
        </div>
      </aside>
    `;

    document.body.append(...wrapper.children);
  };

  if (!document.querySelector("[data-terminal]") || !document.querySelector("[data-terminal-toggle]")) {
    createTerminal();
  }

  const terminal = document.querySelector("[data-terminal]");
  const terminalToggle = document.querySelector("[data-terminal-toggle]");

  if (terminal && terminalToggle) {
    const output = terminal.querySelector("[data-terminal-output]");
    const form = terminal.querySelector("[data-terminal-form]");
    const input = terminal.querySelector("[data-terminal-input]");
    const closeButton = terminal.querySelector(".terminal-close");
    const screen = terminal.querySelector(".terminal-screen");
    const commandHistory = [];
    let historyIndex = -1;
    let hasBooted = false;
    const commands = {
      help: [
        "Available commands:",
        "about      short identity note",
        "skills     current technical stack",
        "fastfetch  quick profile summary",
        "projects   open the projects page",
        "contact    show contact links",
        "history    show command history",
        "clear      clear terminal output",
        "exit       close terminal"
      ],
      about: [
        "I am a CSE undergraduate at BUP, based in Dhaka and raised in Rangpur.",
        "I work on cybersecurity, software development, academic research, and CTF practice."
      ],
      skills: [
        "Languages: C, C++, Java, Python, JavaScript, TypeScript, Bash, PHP",
        "Tools: Node.js, PostgreSQL, Supabase, MySQL, Git, Burp Suite, Wireshark, Nmap"
      ],
      fastfetch: [
        "Name: Shahed Shahrier",
        "Location: Dhaka, Bangladesh",
        "Education: CSE undergraduate at BUP",
        "Team: Founding member, Team RAB",
        "Focus: cybersecurity, research, product development"
      ],
      contact: [
        "Email: shahrier.work2000@gmail.com",
        "GitHub: https://github.com/Shahed-Shahrier",
        "LinkedIn: https://www.linkedin.com/in/shahed-shahrier/"
      ]
    };

    const bootLines = [
      "shahed@bup ~ portfolio terminal v1.0",
      "BUP CSE / Dhaka, Bangladesh",
      'Type "help" for commands. Type "fastfetch" for a quick profile.',
      ""
    ];

    const appendLine = (text, className = "") => {
      const line = document.createElement("p");
      line.className = `terminal-line${className ? ` ${className}` : ""}`;

      if (text.startsWith("GitHub: ") || text.startsWith("LinkedIn: ")) {
        const [label, url] = text.split(": ");
        const link = document.createElement("a");
        link.href = url;
        link.textContent = url;
        link.target = "_blank";
        link.rel = "noreferrer";
        line.append(`${label}: `, link);
      } else if (text.startsWith("Email: ")) {
        const email = text.replace("Email: ", "");
        const link = document.createElement("a");
        link.href = `mailto:${email}`;
        link.textContent = email;
        line.append("Email: ", link);
      } else {
        line.textContent = text;
      }

      output.append(line);
      screen.scrollTop = screen.scrollHeight;
    };

    const openTerminal = () => {
      terminal.removeAttribute("hidden");
      terminalToggle.setAttribute("aria-expanded", "true");

      if (!hasBooted) {
        bootLines.forEach((line, index) => appendLine(line, index === 0 ? "command" : ""));
        hasBooted = true;
      }

      requestAnimationFrame(() => {
        input.focus();
      });
    };

    const closeTerminal = () => {
      terminal.setAttribute("hidden", "");
      terminalToggle.setAttribute("aria-expanded", "false");
      terminalToggle.focus();
    };

    const runCommand = (rawCommand) => {
      const command = rawCommand.trim().toLowerCase();

      if (!command) {
        return;
      }

      appendLine(`shahed@bup ~/portfolio > ${rawCommand}`, "command");
      commandHistory.unshift(rawCommand);
      historyIndex = -1;

      if (command === "clear") {
        output.replaceChildren();
        return;
      }

      if (command === "exit") {
        appendLine("logout");
        window.setTimeout(closeTerminal, 350);
        return;
      }

      if (command === "history") {
        if (commandHistory.length === 0) {
          appendLine("No commands yet.");
          return;
        }

        commandHistory.forEach((item, index) => {
          appendLine(`${commandHistory.length - index}  ${item}`);
        });
        return;
      }

      if (command === "projects") {
        appendLine("Opening projects.html...");
        window.location.href = "projects.html";
        return;
      }

      const response = commands[command];

      if (response) {
        response.forEach((line) => appendLine(line));
      } else {
        appendLine(`Command not found: ${rawCommand}`);
        appendLine('Type "help" for available commands.');
      }
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      runCommand(input.value);
      input.value = "";
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        input.value = commandHistory[historyIndex] || "";
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        historyIndex = Math.max(historyIndex - 1, -1);
        input.value = historyIndex === -1 ? "" : commandHistory[historyIndex] || "";
      }
    });

    terminalToggle.addEventListener("click", () => {
      if (terminal.hasAttribute("hidden")) {
        openTerminal();
      } else {
        closeTerminal();
      }
    });

    terminal.addEventListener("click", () => {
      input.focus();
    });

    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      closeTerminal();
    });
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // Silent fallback for unsupported or blocked registrations.
    });
  });
}
