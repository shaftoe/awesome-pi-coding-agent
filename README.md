# Awesome Pi Coding Agent

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

An auto-discovered, LLM curated directory of resources for the [Pi Coding Agent](https://pi.dev/) ecosystem. Updated daily.

Content available as Markdown here and as website (with search feature) live at <https://awesome-pi.site>.

> Last updated: 2026-05-26 00:05 UTC


## How it works

A **four-stage data pipeline** runs [daily on CI](.github/workflows/pipeline.yml) — discover from various sources → filter for Pi relevance → deduplicate & classify → render this list.

→ [Full architecture docs](./docs/ARCHITECTURE.md)


## Stats

**3999 resources** indexed · [Updated daily.](./.github/workflows/pipeline.yml)

## Contents

- [Extensions](#extensions) — 3528
- [Themes](#themes) — 46
- [Videos & Tutorials](#videos--tutorials) — 64
- [Articles](#articles) — 27
- [Miscellaneous](#miscellaneous) — 334

## Extensions

*Extend pi's capabilities -- custom tools, hooks, integrations, and UI modifications.*

| Name | Description | Popularity | Updated |
|------|-------------|----------:|--------:|
| [pi-subagents](https://www.npmjs.com/package/pi-subagents) | Pi extension for delegating tasks to subagents with chains, parallel execution, and TUI clarification | ⬇ 99.8k/mo | 4d ago |
| [@plannotator/pi-extension](https://www.npmjs.com/package/@plannotator/pi-extension) | Plannotator Pi extension - interactive plan review with annotations, annotate agent messages, and review code/PRs | ⬇ 29.7k/mo | today |
| [@ollama/pi-web-search](https://www.npmjs.com/package/@ollama/pi-web-search) | Web search and fetch tools for Pi agent - uses Ollama's web search and fetch APIs | ⬇ 24.9k/mo | ~1mo ago |
| [pi-lens](https://www.npmjs.com/package/pi-lens) | Real-time code feedback for pi — LSP, linters, formatters, type-checking, structural analysis & booboo | ⬇ 21.0k/mo | 5d ago |
| [@a5c-ai/babysitter-pi](https://www.npmjs.com/package/@a5c-ai/babysitter-pi) | Babysitter package for Pi Coding Agent | ⬇ 18.8k/mo | ~1mo ago |
| [@juicesharp/rpiv-advisor](https://www.npmjs.com/package/@juicesharp/rpiv-advisor) | Pi extension. The /btw slash command, for putting a one-off side question to the same primary model without polluting the main conversation. | ⬇ 14.4k/mo | today |
| [pi-crew](https://www.npmjs.com/package/pi-crew) | Pi extension for coordinated AI teams, workflows, worktrees, and async task orchestration | ⬇ 13.0k/mo | today |
| [pi-markdown-preview](https://www.npmjs.com/package/pi-markdown-preview) | Rendered markdown + LaTeX preview for pi, with terminal, browser, and PDF output | ⬇ 12.5k/mo | 10d ago |
| [@vigolium/piolium](https://www.npmjs.com/package/@vigolium/piolium) | Multi-phase security audits with specialist sub-agents, isolated context windows, capped concurrency, and resumable state — packaged as a Pi extension. | ⬇ 12.3k/mo | 2d ago |
| [pi-chrome](https://www.npmjs.com/package/pi-chrome) | Let Pi use your existing signed-in Chrome profile after explicit authorization. | ⬇ 10.7k/mo | 8d ago |
| [pi-studio](https://www.npmjs.com/package/pi-studio) | Two-pane browser workspace for pi with prompt/response editing, annotations, critiques, active quiz, prompt/response history, live previews, and tmux-backed REPL/literate REPL workflows | ⬇ 10.1k/mo | today |
| [pi-btw](https://www.npmjs.com/package/pi-btw) | A pi extension for parallel side conversations with /btw | ⬇ 10.1k/mo | 18d ago |
| [@howaboua/pi-codex-conversion](https://www.npmjs.com/package/@howaboua/pi-codex-conversion) | Codex-oriented tool and prompt adapter for pi coding agent | ⬇ 9.9k/mo | 2d ago |
| [pi-lean-ctx](https://www.npmjs.com/package/pi-lean-ctx) | Pi Coding Agent extension (CLI-first) — routes bash/read/grep/find/ls through lean-ctx CLI for strong token savings. Optional MCP bridge can register advanced tools. | ⬇ 9.7k/mo | today |
| [@gotgenes/pi-subagents](https://www.npmjs.com/package/@gotgenes/pi-subagents) | A pi extension that brings Claude Code-style autonomous sub-agents to pi. Friendly fork of @tintinweb/pi-subagents. | ⬇ 9.3k/mo | today |
| [pi-intercom](https://www.npmjs.com/package/pi-intercom) |  | ⬇ 8.8k/mo | 23d ago |
| [@llblab/pi-telegram](https://www.npmjs.com/package/@llblab/pi-telegram) | Telegram runtime adapter for π | ⬇ 8.2k/mo | today |
| [adaptive-memory-multi-model-router](https://www.npmjs.com/package/adaptive-memory-multi-model-router) | LLM router & AI gateway — 99.5% routing accuracy, 47 providers (DeepSeek, Kimi/Moonshot, Qwen, Zhipu GLM, Yi + more). Semantic cache, guardrails, cost analytics. Built on 30+ arXiv papers (SGLang, Med | ⬇ 8.1k/mo | 3d ago |
| [@ff-labs/pi-fff](https://www.npmjs.com/package/@ff-labs/pi-fff) | pi extension: FFF-powered fuzzy file and content search | ⬇ 7.7k/mo | today |
| [pi-smart-fetch](https://www.npmjs.com/package/pi-smart-fetch) | Smart web_fetch with desktop-browser TLS impersonation and defuddle extraction. | ⬇ 7.7k/mo | 4d ago |
| [@linimin/pi-letscook](https://www.npmjs.com/package/@linimin/pi-letscook) | Pi package for long-running completion workflows with canonical .agent state, role-based subagents, continuity, and verification helpers. | ⬇ 6.8k/mo | today |
| [pi-prompt-template-model](https://www.npmjs.com/package/pi-prompt-template-model) | Prompt template model selector extension for pi coding agent | ⬇ 6.6k/mo | 27d ago |
| [taskplane](https://www.npmjs.com/package/taskplane) | AI agent orchestration for pi — parallel task execution with checkpoint discipline | ⬇ 6.1k/mo | 13d ago |
| [@aliou/pi-processes](https://www.npmjs.com/package/@aliou/pi-processes) | ![banner](https://assets.aliou.me/github/aliou/pi-processes/banner.png) | ⬇ 6.0k/mo | 5d ago |
| [pi-depo](https://www.npmjs.com/package/pi-depo) | Declarative package manager for Pi Coding Agent - skills, extensions, hooks, MCP servers | ⬇ 6.0k/mo | 18d ago |
| [@aliou/pi-guardrails](https://www.npmjs.com/package/@aliou/pi-guardrails) | ![banner](https://assets.aliou.me/github/aliou/pi-guardrails/banner.png) | ⬇ 5.8k/mo | 2d ago |
| [@astrofoundry/pi-astro](https://www.npmjs.com/package/@astrofoundry/pi-astro) | Personal pi customizations (extensions, skills, prompts, themes) for the pi coding agent. | ⬇ 5.7k/mo | 12d ago |
| [@cryptolibertus/pi-peer](https://www.npmjs.com/package/@cryptolibertus/pi-peer) | Pi package for local Pi-to-Pi peer messaging, slash commands, tools, and runtime transport. | ⬇ 5.7k/mo | today |
| [pi-bar](https://www.npmjs.com/package/pi-bar) | Pi footer/statusline showing active model, thinking level, context pressure, live progress updates, and extension statuses. | ⬇ 5.7k/mo | 7d ago |
| [ultimate-pi](https://www.npmjs.com/package/ultimate-pi) | Ultimate AI coding harness for pi.dev — extensible skills, Obsidian wiki knowledge layer, compressed context, deterministic output | ⬇ 5.6k/mo | yesterday |
| [pi-multiagent](https://www.npmjs.com/package/pi-multiagent) | Adds the agent_team delegation tool and pi-multiagent skill to Pi. | ⬇ 5.3k/mo | today |
| [@llblab/pi-actors](https://www.npmjs.com/package/@llblab/pi-actors) | Local Actor Kernel for Pi | ⬇ 5.2k/mo | today |
| [pi-total-recall](https://www.npmjs.com/package/pi-total-recall) | Complete context stack for pi — persistent memory, session history search, and local knowledge search in one install. | ⬇ 4.9k/mo | 13d ago |
| [gentle-engram](https://www.npmjs.com/package/gentle-engram) | Persistent memory for Pi agents — one local-or-cloud brain shared across sessions, compactions, and MCP agents | ⬇ 4.8k/mo | 7d ago |
| [@raindrop-ai/pi-agent](https://www.npmjs.com/package/@raindrop-ai/pi-agent) | Raindrop observability for Pi Agent — automatic tracing via subscriber or pi-coding-agent extension | ⬇ 4.6k/mo | 14d ago |
| [pi-docparser](https://www.npmjs.com/package/pi-docparser) | Pi package that adds a document_parse tool and companion skill for parsing PDFs, Office documents, spreadsheets, and images with LiteParse. | ⬇ 4.5k/mo | 12d ago |
| [@dotdotgod/pi](https://www.npmjs.com/package/@dotdotgod/pi) | Pi adapter for dotdotgod: project-initializer skill, shared docs scaffold, plan/archive workflow, and project loading extensions. | ⬇ 4.3k/mo | yesterday |
| [pi-continue](https://www.npmjs.com/package/pi-continue) | Mid-turn continuation for long Pi tool runs: compact safely before context overflow, then resume the same session from a structured handoff ledger. | ⬇ 4.1k/mo | today |
| [pi-convex](https://www.npmjs.com/package/pi-convex) | Pi extension for Convex Cloud - queries, mutations, project management, and best practices validation | ⬇ 4.0k/mo | 29d ago |
| [pi-loadout](https://www.npmjs.com/package/pi-loadout) | Interactive tool and skill loadouts for Pi sessions. | ⬇ 4.0k/mo | 7d ago |
| [@narumitw/pi-retry](https://www.npmjs.com/package/@narumitw/pi-retry) | Public pi extension that retries empty-detail provider errors and stalled streams. | ⬇ 3.8k/mo | yesterday |
| [@narumitw/pi-chrome-devtools](https://www.npmjs.com/package/@narumitw/pi-chrome-devtools) | Pi extension that exposes Chrome DevTools Protocol tools. | ⬇ 3.8k/mo | yesterday |
| [@narumitw/pi-btw](https://www.npmjs.com/package/@narumitw/pi-btw) | Pi extension that adds a /btw side-question command. | ⬇ 3.7k/mo | yesterday |
| [@nahuelcio/opencode-ado](https://www.npmjs.com/package/@nahuelcio/opencode-ado) | Azure DevOps plugin for OpenCode — PR reviews, profiles, sidebar panel | ⬇ 3.6k/mo | 13d ago |
| [pi-caveman](https://www.npmjs.com/package/pi-caveman) | Why use many token when few do trick. Caveman mode for pi — cuts ~75% output tokens while keeping full technical accuracy. | ⬇ 3.6k/mo | 13d ago |
| [whatsapp-pi](https://www.npmjs.com/package/whatsapp-pi) | WhatsApp integration extension for Pi | ⬇ 3.6k/mo | 5d ago |
| [pi-context-prune](https://www.npmjs.com/package/pi-context-prune) | Pi extension package for pruning future context while preserving original tool-call history. | ⬇ 3.5k/mo | 14d ago |
| [pi-llama-cpp](https://www.npmjs.com/package/pi-llama-cpp) | Pi extension for llama.cpp integration. Supports both router and single modes. | ⬇ 3.4k/mo | 3d ago |
| [oira666_pi-subagent](https://www.npmjs.com/package/oira666_pi-subagent) | Subagent extension for Pi coding agent. Delegate tasks to specialized agents. | ⬇ 3.3k/mo | today |
| [pi-autoresearch](https://www.npmjs.com/package/pi-autoresearch) | Autonomous experiment loop for pi — run, measure, keep or discard. Inspired by karpathy/autoresearch. | ⬇ 3.2k/mo | 19d ago |
| [@arshan-dev/pi-ideas](https://www.npmjs.com/package/@arshan-dev/pi-ideas) | Idea garden extension for pi: capture, browse, expand, combine, and ship ideas from slash commands. | ⬇ 3.2k/mo | ~1mo ago |
| [@boofpackdev/pi-morph](https://www.npmjs.com/package/@boofpackdev/pi-morph) | Agent orchestration layer for pi — guided 5-stage pipeline: spark → plan → work → review → ship. Mission-control TUI, browser approval gates, autonomous autorecovery, and final handoff reports. | ⬇ 3.2k/mo | 7d ago |
| [@loreai/pi](https://www.npmjs.com/package/@loreai/pi) | Lore memory engine as a Pi (@mariozechner/pi-coding-agent) extension | ⬇ 3.1k/mo | 3d ago |
| [@bdsqqq/pi](https://www.npmjs.com/package/@bdsqqq/pi) | extensions and core utilities for pi-coding-agent | ⬇ 3.1k/mo | 4d ago |
| [@posthog/pi](https://www.npmjs.com/package/@posthog/pi) | PostHog LLM Analytics extension for pi coding agent | ⬇ 3.1k/mo | 2mo ago |
| [pi-xai-oauth](https://www.npmjs.com/package/pi-xai-oauth) | One-command installer for xAI (Grok) OAuth provider + Grok 4.3 in pi | ⬇ 3.0k/mo | 8d ago |
| [pi-orq](https://www.npmjs.com/package/pi-orq) | CLI multi-agent refactoring orchestrator powered by Pi Coding Agent and OpenRouter | ⬇ 3.0k/mo | ~1mo ago |
| [pi-mcp-extension](https://www.npmjs.com/package/pi-mcp-extension) | MCP (Model Context Protocol) client extension for the Pi coding agent — connect Pi to any MCP server | ⬇ 3.0k/mo | 23d ago |
| [@zosmaai/pi-llm-wiki](https://www.npmjs.com/package/@zosmaai/pi-llm-wiki) | Self-maintaining LLM Wiki for Pi — Karpathy-pattern knowledge base with immutable source capture, automated ingestion, search, linting, and Obsidian-compatible vault. auto-updating personal & company  | ⬇ 2.9k/mo | 3d ago |
| [@ygncode/pi-web](https://www.npmjs.com/package/@ygncode/pi-web) | Remote control your pi coding agent from any browser on your network | ⬇ 2.8k/mo | 2d ago |
| [pi-claude-style-tools](https://www.npmjs.com/package/pi-claude-style-tools) | Claude Code-style tool rows for pi with Ctrl+O image previews and consistent built-in, MCP, and custom tool rendering | ⬇ 2.8k/mo | 13d ago |
| [pi-free](https://www.npmjs.com/package/pi-free) | AI model providers for Pi with free model filtering and dynamic model fetching | ⬇ 2.8k/mo | 4d ago |
| [pi-tldr](https://www.npmjs.com/package/pi-tldr) | A pi coding-agent extension that shows live TLDRs above the input bar. | ⬇ 2.8k/mo | 10d ago |
| [pi-better-openai](https://www.npmjs.com/package/pi-better-openai) | Personal pi extension that improves OpenAI with fast mode, usage stats, and footer polish. | ⬇ 2.7k/mo | 15d ago |
| [pi-code-previews](https://www.npmjs.com/package/pi-code-previews) | Syntax-highlighted previews for pi tool calls. | ⬇ 2.7k/mo | 14d ago |
| [pi-extmgr](https://www.npmjs.com/package/pi-extmgr) | Enhanced UX for managing local Pi extensions and community packages | ⬇ 2.7k/mo | 14d ago |
| [pi-cyber-ui](https://www.npmjs.com/package/pi-cyber-ui) | Standalone Pi UI package with a cyber-inspired theme, custom editor, footer, and lightweight working indicator. | ⬇ 2.7k/mo | 8d ago |
| [pi-json-tools](https://www.npmjs.com/package/pi-json-tools) | Smart Recovery for Qwen Coder - Auto hallucination detection, auto reminder, smart recovery for qwen2.5-coder family | ⬇ 2.7k/mo | 23d ago |
| [@sting8k/pi-vcc](https://www.npmjs.com/package/@sting8k/pi-vcc) | Algorithmic conversation compactor for pi - transcript-preserving structured summaries, no LLM calls | ⬇ 2.6k/mo | 8d ago |
| [@khimaros/pi-omni](https://www.npmjs.com/package/@khimaros/pi-omni) | realtime voice chat with pi.dev | ⬇ 2.6k/mo | yesterday |
| [@0xkobold/pi-codebase-wiki](https://www.npmjs.com/package/@0xkobold/pi-codebase-wiki) | Keeps a wiki for your code that updates itself — reads your git history and docs so you can ask questions about your codebase | ⬇ 2.6k/mo | 8d ago |
| [@apolosan/idea-refinement](https://www.npmjs.com/package/@apolosan/idea-refinement) | Pi Coding Agent extension that runs a forced iterative idea-refinement workflow via the /idea-refine command. | ⬇ 2.6k/mo | 6d ago |
| [@marckrenn/pi-sub-core](https://www.npmjs.com/package/@marckrenn/pi-sub-core) | Shared usage data core for pi extensions | ⬇ 2.6k/mo | 2mo ago |
| [pi-fff](https://www.npmjs.com/package/pi-fff) | FFF-powered fuzzy file resolution, autocomplete, and content search extension for pi | ⬇ 2.6k/mo | 13d ago |
| [@cortexkit/pi-magic-context](https://www.npmjs.com/package/@cortexkit/pi-magic-context) | Pi coding agent extension for Magic Context — cross-session memory and context management | ⬇ 2.5k/mo | 3d ago |
| [@eforge-build/pi-eforge](https://www.npmjs.com/package/@eforge-build/pi-eforge) | eforge integration for Pi - enqueue, run, and monitor builds from within Pi | ⬇ 2.5k/mo | 5d ago |
| [@arche-sh/piflow](https://www.npmjs.com/package/@arche-sh/piflow) | Unified pi extension. Autonomous engineering skill framework (do, taste, where, mario, matt + 12 support skills) plus the `delegate` role primitive (scout, researcher, navigator, scribe, session-miner | ⬇ 2.5k/mo | today |
| [pi-scraper](https://www.npmjs.com/package/pi-scraper) | Crawl, map, and structured extraction for Pi — scraper-first, Pi-native, and local-first. | ⬇ 2.5k/mo | 2d ago |
| [pi-cider](https://www.npmjs.com/package/pi-cider) | Pi extension for Cider Apple Music client - control playback, queue management, and more via RPC | ⬇ 2.4k/mo | 28d ago |
| [pi-rnd](https://www.npmjs.com/package/pi-rnd) | Scientific-method R&D orchestration for PI Coding Agent — methodology skills, subagent definitions, /rnd-start pipeline, /rnd-doctor, and a composable tool_call gate registry | ⬇ 2.4k/mo | 7d ago |
| [pi-memory](https://www.npmjs.com/package/pi-memory) | Pi coding agent extension for memory with qmd-powered semantic search across daily logs, long-term memory, and scratchpad | ⬇ 2.4k/mo | 3d ago |
| [pi-voice-input](https://www.npmjs.com/package/pi-voice-input) | Press Ctrl+Shift+R to dictate prompts into Pi using VolcEngine ASR | ⬇ 2.4k/mo | today |
| [@capyup/pi-goal](https://www.npmjs.com/package/@capyup/pi-goal) | Goal mode extension for pi: persistent long-running objectives, /goal-set drafting, Sisyphus prompt style, autoContinue, and an above-editor status overlay. | ⬇ 2.4k/mo | 12d ago |
| [pi-powerline](https://www.npmjs.com/package/pi-powerline) | Powerline-style UI extensions for pi coding agent (custom editor, breadcrumb, footer, header) | ⬇ 2.3k/mo | 2d ago |
| [pi-qq](https://www.npmjs.com/package/pi-qq) | Ask side questions in pi without polluting the main transcript — /qq or alt+q. | ⬇ 2.3k/mo | 8d ago |
| [pi-gsd](https://www.npmjs.com/package/pi-gsd) | Get Shit Done - Unofficial port of the renowned AI-native project-planning spec-driven toolkit | ⬇ 2.3k/mo | 29d ago |
| [pi-cache-optimizer](https://www.npmjs.com/package/pi-cache-optimizer) | Pi extension that improves provider-side KV/prompt cache hit rates (DeepSeek, OpenAI, Claude, Gemini) by reordering the system prompt, requesting long retention, and showing footer cache stats. Rename | ⬇ 2.3k/mo | yesterday |
| [pi-clawbay](https://www.npmjs.com/package/pi-clawbay) | TheClawBay provider extension for Pi Coding Agent - access GPT-5 and Codex models | ⬇ 2.3k/mo | 7d ago |
| [@firstpick/pi-extension-release-npm](https://www.npmjs.com/package/@firstpick/pi-extension-release-npm) | Pi command to run npm package release workflow with publish confirmation. | ⬇ 2.3k/mo | 5d ago |
| [pi-fast-subagent](https://www.npmjs.com/package/pi-fast-subagent) | In-process subagent delegation for pi with single, parallel, and background modes | ⬇ 2.3k/mo | 27d ago |
| [@kaiserlich-dev/pi-session-search](https://www.npmjs.com/package/@kaiserlich-dev/pi-session-search) | Full-text search across pi sessions with FTS5 index and overlay UI | ⬇ 2.2k/mo | 22d ago |
| [pi-graphite](https://www.npmjs.com/package/pi-graphite) | Opinionated pi tools + skill for stacked PR workflows with the Graphite (gt) CLI. | ⬇ 2.2k/mo | 8d ago |
| [@vtstech/pi-shared](https://www.npmjs.com/package/@vtstech/pi-shared) | Shared utilities for Pi Coding Agent extensions | ⬇ 2.1k/mo | 10d ago |
| [pi-extensions](https://www.npmjs.com/package/pi-extensions) | Personal extensions for the [Pi coding agent](https://github.com/badlogic/pi-mono). | ⬇ 2.1k/mo | 13d ago |
| [pi-bridge](https://www.npmjs.com/package/pi-bridge) | Transparent filesystem bridge that makes pi run natively on a remote machine over SSH | ⬇ 2.1k/mo | 14d ago |
| [@open-plan-annotator/pi-extension](https://www.npmjs.com/package/@open-plan-annotator/pi-extension) | Pi extension for open-plan-annotator that adds plan review tools and commands | ⬇ 2.1k/mo | 2d ago |
| [@jmfederico/pi-web](https://www.npmjs.com/package/@jmfederico/pi-web) | Remote web UI and browser control plane for persistent Pi Coding Agent sessions. | ⬇ 2.1k/mo | today |
| [pi-memory-md](https://www.npmjs.com/package/pi-memory-md) | Letta-like memory management for pi using structured markdown files in a git repository | ⬇ 2.1k/mo | today |
| [pi-compound-engineering](https://www.npmjs.com/package/pi-compound-engineering) | Pi-native Compound Engineering package for iterative development workflows | ⬇ 2.0k/mo | ~1mo ago |
| [@sentiolabs/pi-arc](https://www.npmjs.com/package/@sentiolabs/pi-arc) | Arc issue tracker integration for Pi. | ⬇ 2.0k/mo | 12d ago |
| [@aliou/pi-synthetic](https://www.npmjs.com/package/@aliou/pi-synthetic) | ![banner](https://assets.aliou.me/github/aliou/pi-synthetic/banner.png) | ⬇ 2.0k/mo | 2d ago |
| [@tungthedev/pi-extensions](https://www.npmjs.com/package/@tungthedev/pi-extensions) | A Pi package containing editor, mermaid, workspace, web, skill, boomerang, goal, pi-modes, and ext-manager extensions. | ⬇ 2.0k/mo | 10d ago |
| [pi-autocontext-lean-verify](https://www.npmjs.com/package/pi-autocontext-lean-verify) | Experimental Pi package for Lean-verified proof repair using autocontext and Pi. | ⬇ 2.0k/mo | 11d ago |
| [pi-glance](https://www.npmjs.com/package/pi-glance) | A polished input surface extension for pi, with a rounded multiline editor and inline model/context/status glance. | ⬇ 2.0k/mo | 5d ago |
| [pi-packs](https://www.npmjs.com/package/pi-packs) | Umbrella Pi package: /install picker for a curated set of pi extensions (pi-qq, pi-chrome, pi-intercom, pi-linter, pi-bar, pi-prompt-shelf, pi-caveman, pi-graphite, pi-gh-cli, pi-loadout). | ⬇ 2.0k/mo | 8d ago |
| [pi-tau](https://www.npmjs.com/package/pi-tau) | τ (tau = 2π): Quality-of-Life Extension for pi. Background tasks, notifications, pill-bar status, task management, and web browsing. | ⬇ 2.0k/mo | today |
| [@gogomi/pi-glsl-shader-vision](https://www.npmjs.com/package/@gogomi/pi-glsl-shader-vision) | GLSL fragment shader viewer for Pi Agent — live WebGL preview, Tweakpane uniform controls, presets, probe sheets & video export | ⬇ 2.0k/mo | 11d ago |
| [pi-boomerang](https://www.npmjs.com/package/pi-boomerang) | Token-efficient autonomous task execution with context collapse | ⬇ 1.9k/mo | 5d ago |
| [@m4xx101/vibeshack](https://www.npmjs.com/package/@m4xx101/vibeshack) | Autonomous security testing harness for pi-mono. Expert hacker persona, hypothesis-tree REPL, tool auto-install, pipeline chaining, 30+ bug-bounty tools, self-evolving skills. Find vulnerabilities, ch | ⬇ 1.9k/mo | 19d ago |
| [@narumitw/pi-caffeinate](https://www.npmjs.com/package/@narumitw/pi-caffeinate) | Pi extension that exposes configurable, language-agnostic LSP tools through a shared runner. | ⬇ 1.9k/mo | yesterday |
| [@narumitw/pi-python-lsp](https://www.npmjs.com/package/@narumitw/pi-python-lsp) | Pi extension that exposes ty and Ruff language-server tools for Python. | ⬇ 1.9k/mo | 8d ago |
| [pi-context](https://www.npmjs.com/package/pi-context) | Agentic Context Management for the Pi | ⬇ 1.9k/mo | 16d ago |
| [@lnilluv/pi-ralph-loop](https://www.npmjs.com/package/@lnilluv/pi-ralph-loop) | Pi-native ralph loop — autonomous coding iterations with mid-turn supervision | ⬇ 1.9k/mo | 18d ago |
| [@micuintus/llm-wiki](https://www.npmjs.com/package/@micuintus/llm-wiki) | As minimal as Pi. Karpathy's LLM Wiki pattern as a minimal, agent-agnostic skill. | ⬇ 1.9k/mo | 15d ago |
| [pi-observational-memory](https://www.npmjs.com/package/pi-observational-memory) | Observational memory extension for pi — cache-friendly tiered compaction with observations and reflections. | ⬇ 1.9k/mo | 11d ago |
| [@npm-ken/pi-bar](https://www.npmjs.com/package/@npm-ken/pi-bar) | Configurable status bar extension for the pi coding agent. | ⬇ 1.9k/mo | 2d ago |
| [@capyup/pi-basic-tools](https://www.npmjs.com/package/@capyup/pi-basic-tools) | Standalone core productivity tools for pi: repo_map, read_block, symbol_outline, apply_patch, exec_command, write_stdin, grouped basic-tool UI, work_checkpoint, ask_user, ask_question, ask_questionnai | ⬇ 1.9k/mo | 8d ago |
| [pi-thinking-steps](https://www.npmjs.com/package/pi-thinking-steps) | Professional three-mode thinking-step rendering for Pi's TUI. | ⬇ 1.9k/mo | 13d ago |
| [@majorgilles/pi-learning-tutor](https://www.npmjs.com/package/@majorgilles/pi-learning-tutor) | Learning-mode tutoring, review loops, and definition overlays for pi. | ⬇ 1.8k/mo | today |
| [pi-xai](https://www.npmjs.com/package/pi-xai) | Pi extension for xAI text generation via Responses API — reasoning, multi-agent, structured outputs, tools | ⬇ 1.8k/mo | 4d ago |
| [@syntesseraai/pi-feature-factory](https://www.npmjs.com/package/@syntesseraai/pi-feature-factory) | Pi extension package for Feature Factory sub-agents, skills, and workflow orchestration | ⬇ 1.8k/mo | 3d ago |
| [pi-prompt-composer](https://www.npmjs.com/package/pi-prompt-composer) | Build multi-option slash commands from plain prompts — variable expansion, arg collection & interactive selectors for Pi | ⬇ 1.8k/mo | 14d ago |
| [claude-code-tmux](https://www.npmjs.com/package/claude-code-tmux) | Durable tmux controller for interactive Claude Code sessions, with a Pi extension and skill. | ⬇ 1.8k/mo | 9d ago |
| [@casualjim/pi-heimdall](https://www.npmjs.com/package/@casualjim/pi-heimdall) | Guardian extension for pi — security guards that block accidental secret exposure, enforce command policies, protect .env files, and sandbox bash commands | ⬇ 1.8k/mo | 11d ago |
| [pi-diff-review](https://www.npmjs.com/package/pi-diff-review) | Local diff review TUI extension for pi | ⬇ 1.8k/mo | 5d ago |
| [@heyhuynhgiabuu/pi-pretty](https://www.npmjs.com/package/@heyhuynhgiabuu/pi-pretty) | Pretty terminal output for pi — syntax-highlighted file reads, colored bash output, tree-view directory listings, and more. | ⬇ 1.7k/mo | 8d ago |
| [pi-discord-remote](https://www.npmjs.com/package/pi-discord-remote) | Control your Pi coding-agent session from Discord — each session gets its own auto-created channel | ⬇ 1.7k/mo | 5d ago |
| [@narumitw/pi-goal](https://www.npmjs.com/package/@narumitw/pi-goal) | Pi extension that exposes Biome language-server tools for diagnostics, formatting, and fixes. | ⬇ 1.7k/mo | 8d ago |
| [pi-twincat-ads](https://www.npmjs.com/package/pi-twincat-ads) | Pi extension for reading and writing TwinCAT runtime values over ADS. | ⬇ 1.7k/mo | 14d ago |
| [@unbrained/pm-cli](https://www.npmjs.com/package/@unbrained/pm-cli) | Git-native project management CLI for humans and agents. | ⬇ 1.6k/mo | 15d ago |
| [@ghyper9023/pi-dev-workflow](https://www.npmjs.com/package/@ghyper9023/pi-dev-workflow) | Developer workflow toolkit for pi: git agents, code review, Karpathy guidelines, themes | ⬇ 1.6k/mo | today |
| [pi-token-burden](https://www.npmjs.com/package/pi-token-burden) | Pi extension that shows a token-budget breakdown of the assembled system prompt | ⬇ 1.6k/mo | 9d ago |
| [@zcouncil/pi](https://www.npmjs.com/package/@zcouncil/pi) | Pi package exposing one /chat-style zcouncil tool backed by the zcouncil SDK and bridge-aware backend. | ⬇ 1.6k/mo | 7d ago |
| [@pi-unipi/web-api](https://www.npmjs.com/package/@pi-unipi/web-api) | Persistent status bar for Unipi — subscribes to UNIPI_EVENTS and renders key stats from all unipi packages | ⬇ 1.6k/mo | today |
| [pi-hud](https://www.npmjs.com/package/pi-hud) | Persistent HUD extension for Pi showing project, context, MCP, git, and subagent status. | ⬇ 1.6k/mo | yesterday |
| [pi-teams](https://www.npmjs.com/package/pi-teams) | Agent teams for pi, ported from claude-code-teams-mcp | ⬇ 1.6k/mo | ~1mo ago |
| [pi-simocracy](https://www.npmjs.com/package/pi-simocracy) | Pi extension: load a Simocracy sim into your chat — see its pixel-art sprite render inline in the terminal and roleplay with it. | ⬇ 1.6k/mo | 17d ago |
| [pi-snap-edit](https://www.npmjs.com/package/pi-snap-edit) | Fast, precise, script-free edits for Pi agents | ⬇ 1.6k/mo | 9d ago |
| [@oppiai/pi-package](https://www.npmjs.com/package/@oppiai/pi-package) | OPPi Pi package: extensions, skills, prompts, and themes. | ⬇ 1.6k/mo | 21d ago |
| [pi-webaio](https://www.npmjs.com/package/pi-webaio) | All-in-one web tools for pi with search (Google, Brave, DDG) and fetch with headless browser AI summarization | ⬇ 1.6k/mo | 2d ago |
| [pi-gh-my-starred](https://www.npmjs.com/package/pi-gh-my-starred) | PI extension for browsing GitHub starred repositories and star lists | ⬇ 1.6k/mo | 8d ago |
| [@tianhai/pi-workflow-kit](https://www.npmjs.com/package/@tianhai/pi-workflow-kit) | Enforce structured brainstorm→plan→execute→finalize workflow with TDD discipline in AI coding agents | ⬇ 1.6k/mo | today |
| [gedpi](https://www.npmjs.com/package/gedpi) | Single-agent Pi package that clarifies requests, documents the spec, and implements work in bounded slices. | ⬇ 1.6k/mo | 2d ago |
| [pi-codex-image-gen](https://www.npmjs.com/package/pi-codex-image-gen) | Image generation for Pi using the ChatGPT Images 2.0 model. | ⬇ 1.6k/mo | 5d ago |
| [pi-agent-mode](https://www.npmjs.com/package/pi-agent-mode) | OpenCode-style default agent mode for PI. Markdown agents with YAML frontmatter. Ctrl+Shift+M to cycle, Alt+S to search. Inline execution with full streaming visibility. | ⬇ 1.5k/mo | 27d ago |
| [@devkade/pi-plan](https://www.npmjs.com/package/@devkade/pi-plan) | Plan command extension for Pi: read-only planning mode with approval-based execution | ⬇ 1.5k/mo | 3mo ago |
| [@edxeth/pi-fff](https://www.npmjs.com/package/@edxeth/pi-fff) | pi extension: FFF-powered fuzzy file and content search | ⬇ 1.5k/mo | 17d ago |
| [@aholbreich/agent-skills](https://www.npmjs.com/package/@aholbreich/agent-skills) | Handcrafted Agent Skills for browser-authenticated Jira and Confluence ingestion, LLM wiki workflows, and developer automation. | ⬇ 1.5k/mo | 14d ago |
| [@kinarajv/pi-tps-extensions](https://www.npmjs.com/package/@kinarajv/pi-tps-extensions) | Token-per-sec extensions — real-time token throughput and TTFT (Time To First Token) display for pi coding agent | ⬇ 1.5k/mo | 24d ago |
| [@vanillagreen/pi-caveman](https://www.npmjs.com/package/@vanillagreen/pi-caveman) | Pi provider bridge that runs Claude Code through the Claude Agent SDK, with opt-in forwarding for Pi prompt context. | ⬇ 1.5k/mo | 2d ago |
| [pi-lmstudio](https://www.npmjs.com/package/pi-lmstudio) | LM Studio and llama-server model provider extensions for Pi coding agent | ⬇ 1.5k/mo | 29d ago |
| [@darkhorseprojects/pi-gnosis](https://www.npmjs.com/package/@darkhorseprojects/pi-gnosis) | Circuitry-first Pi package for source-grounded research, non-linear tutoring, Obsidian learning memory, and Manim lecture generation. | ⬇ 1.5k/mo | 8d ago |
| [pi-committer](https://www.npmjs.com/package/pi-committer) | Conventional commit automation for the pi coding agent — auto-commits on goal completion with intelligent, subagent-generated messages | ⬇ 1.5k/mo | 4d ago |
| [@0xkobold/pi-ollama](https://www.npmjs.com/package/@0xkobold/pi-ollama) | Ollama extension for pi-coding-agent. Unified local + cloud Ollama support with model management | ⬇ 1.5k/mo | 13d ago |
| [@codewithkenzo/pi-blitz](https://www.npmjs.com/package/@codewithkenzo/pi-blitz) | Pi extension for Blitz: fast, token-efficient code edits using the Zig Blitz CLI. | ⬇ 1.5k/mo | 28d ago |
| [@firstpick/pi-utils](https://www.npmjs.com/package/@firstpick/pi-utils) | Shared utilities for Firstpick Pi extension packages. | ⬇ 1.5k/mo | 7d ago |
| [@heart-of-gold/toolkit](https://www.npmjs.com/package/@heart-of-gold/toolkit) | Cross-platform installer for Heart of Gold skills — works with Codex, OpenCode, Pi, Claude Code, and more | ⬇ 1.5k/mo | 29d ago |
| [titan-pi-memory](https://www.npmjs.com/package/titan-pi-memory) | Persistent evolutionary memory for the Pi coding agent | ⬇ 1.5k/mo | 5d ago |
| [pi-lsp-bridge](https://www.npmjs.com/package/pi-lsp-bridge) | A config-driven Pi extension that connects language servers over stdio and exposes them as Pi tools | ⬇ 1.5k/mo | 7d ago |
| [@jaggerxtrm/pi-extensions](https://www.npmjs.com/package/@jaggerxtrm/pi-extensions) | Unified Pi extension entrypoint for xtrm-managed extensions | ⬇ 1.4k/mo | 2d ago |
| [pi-agent-permissions](https://www.npmjs.com/package/pi-agent-permissions) | Pi CLI extension — configurable permission policy from .agents/permissions.json and native agent configs | ⬇ 1.4k/mo | 13d ago |
| [pi-runline](https://www.npmjs.com/package/pi-runline) | Code mode for pi | ⬇ 1.4k/mo | yesterday |
| [pi-goal](https://www.npmjs.com/package/pi-goal) | Persistent autonomous goals for pi — /goal loops until complete, paused, or budget-limited | ⬇ 1.4k/mo | yesterday |
| [pi-claude-bridge](https://www.npmjs.com/package/pi-claude-bridge) | Pi extension that uses Claude Code (via Agent SDK) as a model provider and adds an AskClaude tool. | ⬇ 1.4k/mo | 18d ago |
| [@ersintarhan/pi-auto-context](https://www.npmjs.com/package/@ersintarhan/pi-auto-context) | Automatic context management for pi sessions: anchors, pivots, and cross-session recall — with a status line and auto-truncation of stale tool results. | ⬇ 1.4k/mo | 8d ago |
| [pi-banana](https://www.npmjs.com/package/pi-banana) | Generate, edit, and analyze images in pi using Google Nano Banana (image gen) and Gemini Vision (analysis). Inline terminal preview, reference-image editing, auto-save. | ⬇ 1.4k/mo | 3d ago |
| [@firstpick/pi-extension-git-footer-status](https://www.npmjs.com/package/@firstpick/pi-extension-git-footer-status) | Enhanced Pi footer with git status, token usage, context usage, and model telemetry. | ⬇ 1.4k/mo | 7d ago |
| [@howaboua/pi-markdown-workflows](https://www.npmjs.com/package/@howaboua/pi-markdown-workflows) | Pi extension with workflows tools and embedded subdirectory AGENTS.md context loading | ⬇ 1.4k/mo | 2d ago |
| [@mrclrchtr/supi](https://www.npmjs.com/package/@mrclrchtr/supi) | SuPi bash-timeout extension — injects default timeout on bash tool calls | ⬇ 1.4k/mo | yesterday |
| [pi-hindsight](https://www.npmjs.com/package/pi-hindsight) | Hindsight self-hosted memory extension for Pi | ⬇ 1.4k/mo | 25d ago |
| [pi-research](https://www.npmjs.com/package/pi-research) | Zero-setup grounded web research for AI coding agents. | ⬇ 1.4k/mo | 3d ago |
| [@vtstech/pi-openrouter-sync](https://www.npmjs.com/package/@vtstech/pi-openrouter-sync) | Ollama model sync extension for Pi Coding Agent | ⬇ 1.4k/mo | 12d ago |
| [@0xkobold/pi-whitelist](https://www.npmjs.com/package/@0xkobold/pi-whitelist) | Tri-state tool permission system (allow/deny/ask) for AI agent tool invocations | ⬇ 1.4k/mo | 11d ago |
| [@codexstar/pi-pompom](https://www.npmjs.com/package/@codexstar/pi-pompom) | Pi-Pompom — A 3D raymarched virtual pet with voice, ambient weather sounds, AI side chat, agent tracking, and 23 layered sound effects for Pi CLI | ⬇ 1.4k/mo | ~1mo ago |
| [@curio-data/pi-intelli-search](https://www.npmjs.com/package/@curio-data/pi-intelli-search) | Intelligent web research for Pi: search, extract, collate, and cache grounded web context in one tool call. | ⬇ 1.3k/mo | today |
| [@walodayeet/hindsight-pi](https://www.npmjs.com/package/@walodayeet/hindsight-pi) | Hindsight-backed persistent memory extension for pi | ⬇ 1.3k/mo | 26d ago |
| [pi-add-dir](https://www.npmjs.com/package/pi-add-dir) | Add external directories to your pi session — loads their AGENTS.md, CLAUDE.md, and skills into context. | ⬇ 1.3k/mo | ~1mo ago |
| [@firstpick/pi-extension-notes](https://www.npmjs.com/package/@firstpick/pi-extension-notes) | Local notes CRUD extension for Pi with optional rule-note prompt injection. | ⬇ 1.3k/mo | 6d ago |
| [@jayjanii/pi-minimax-mcp](https://www.npmjs.com/package/@jayjanii/pi-minimax-mcp) | MiniMax MCP tools for pi - Web search and image understanding via MiniMax's Model Context Protocol | ⬇ 1.3k/mo | 8d ago |
| [rynfar-meridian](https://github.com/rynfar/meridian) | Use your Claude Max subscription with OpenCode, Pi, Droid, Aider, Crush, Cline. Proxy that bridges Anthropic's official SDK to enable Claude Max in third-party tools. | ⭐1.3k | 14d ago |
| [nightmanager](https://www.npmjs.com/package/nightmanager) | Finder, Oracle, Manager, and Worker tools for Pi's Nightmanager workflow | ⬇ 1.3k/mo | 14d ago |
| [@awebai/pi](https://www.npmjs.com/package/@awebai/pi) | Aweb for Pi: real-time channel awakenings, aw CLI onboarding, and aweb skills. | ⬇ 1.3k/mo | today |
| [@the-forge-flow/lumen](https://www.npmjs.com/package/@the-forge-flow/lumen) | Illuminate code: skills for diagrams, charts, mermaid, slides, galleries, guides, project recaps, and fact-checks. Works in Claude Code and PI coding agent. | ⬇ 1.3k/mo | 13d ago |
| [pi-tidy-mcp-adapter](https://www.npmjs.com/package/pi-tidy-mcp-adapter) | MCP (Model Context Protocol) adapter extension for Pi coding agent fork form https://github.com/nicobailon/pi-mcp-adapter | ⬇ 1.3k/mo | 24d ago |
| [@patimweb/pi-azure-devops](https://www.npmjs.com/package/@patimweb/pi-azure-devops) | Azure DevOps integration for pi coding agent — work items, boards, repos, pull requests, pipelines, and test plans | ⬇ 1.3k/mo | 6d ago |
| [pi-themes](https://www.npmjs.com/package/pi-themes) | A collection of major color themes for pi with a theme switcher extension | ⬇ 1.3k/mo | 7d ago |
| [@timtekno/agentic-template](https://www.npmjs.com/package/@timtekno/agentic-template) | Reusable pi package for company workflows | ⬇ 1.3k/mo | 14d ago |
| [pi-mempalace-extension](https://www.npmjs.com/package/pi-mempalace-extension) | Lean MemPalace integration for the Pi coding agent | ⬇ 1.3k/mo | ~1mo ago |
| [osdy-pi](https://www.npmjs.com/package/osdy-pi) | Osdy Pi package: themes, header, and custom editor for Pi. | ⬇ 1.3k/mo | 5d ago |
| [pi-goals](https://www.npmjs.com/package/pi-goals) | Persistent goal tracking for Pi with /tree-compatible state, budgets, reusable prompts, and churn monitoring. | ⬇ 1.3k/mo | 10d ago |
| [@vtstech/pi-diag](https://www.npmjs.com/package/@vtstech/pi-diag) | Security extension for Pi Coding Agent | ⬇ 1.2k/mo | 12d ago |
| [@fgladisch/pi-welcome-message](https://www.npmjs.com/package/@fgladisch/pi-welcome-message) | Configurable compact footer extension for Pi | ⬇ 1.2k/mo | 4d ago |
| [pi-vim](https://www.npmjs.com/package/pi-vim) | Vim-style modal editing for Pi's TUI editor | ⬇ 1.2k/mo | 3d ago |
| [@firstpick/pi-extension-safety-guard](https://www.npmjs.com/package/@firstpick/pi-extension-safety-guard) | Interactive guardrails for dangerous bash commands and protected file edits in Pi. | ⬇ 1.2k/mo | 3d ago |
| [@outlit/pi](https://www.npmjs.com/package/@outlit/pi) | Pi package for Outlit customer intelligence tools | ⬇ 1.2k/mo | 24d ago |
| [@neuralpartners/pi-yo](https://www.npmjs.com/package/@neuralpartners/pi-yo) | Inter-terminal messaging for Pi agents and Claude Code sessions. | ⬇ 1.2k/mo | 13d ago |
| [pi-island](https://www.npmjs.com/package/pi-island) | Dynamic-Island-style status capsule for the pi coding agent on macOS and Windows. Shows what pi is doing in real time, at the very top of your screen — with native notch-wrap support for MacBooks. | ⬇ 1.2k/mo | ~1mo ago |
| [pi-orch-extension](https://www.npmjs.com/package/pi-orch-extension) | Orch multi-agent orchestration extension for Pi | ⬇ 1.2k/mo | 5d ago |
| [@firstpick/pi-extension-memory-helper](https://www.npmjs.com/package/@firstpick/pi-extension-memory-helper) | Memory helper commands and remember_note tool for Pi. | ⬇ 1.2k/mo | 8d ago |
| [composio-x-pi](https://www.npmjs.com/package/composio-x-pi) | Pi extension that exposes Composio-backed runtime and authoring tools. | ⬇ 1.2k/mo | 11d ago |
| [pi-agents-team](https://www.npmjs.com/package/pi-agents-team) | Pi extension that turns one coding session into a multi-agent team with background RPC worker agents. | ⬇ 1.2k/mo | 5d ago |
| [@mediadatafusion/pi-workflow-suite](https://www.npmjs.com/package/@mediadatafusion/pi-workflow-suite) | Structured workflow orchestration suite for Pi with Standard, Plan, Mission, compaction, diagrams, web access, repo lock, and safety gates. | ⬇ 1.2k/mo | yesterday |
| [@firstpick/pi-extension-plan-executor](https://www.npmjs.com/package/@firstpick/pi-extension-plan-executor) | Autonomous PLAN.md execution loop for Pi that continues until all checklist items are complete. | ⬇ 1.2k/mo | 8d ago |
| [@marcfargas/pi-test-harness](https://www.npmjs.com/package/@marcfargas/pi-test-harness) | Test harness for pi extensions — in-process session testing, package install verification, and subprocess mocking | ⬇ 1.2k/mo | 3d ago |
| [@bitcraft-apps/pi-web-tools](https://www.npmjs.com/package/@bitcraft-apps/pi-web-tools) | Shell-only web search and fetch tools for pi.dev. No API keys. | ⬇ 1.2k/mo | 11d ago |
| [pi-ui-hephaestus](https://www.npmjs.com/package/pi-ui-hephaestus) | Muted thinking blocks, framed editor, animated header, response time, rich footer, and clipboard image paste for pi | ⬇ 1.2k/mo | 14d ago |
| [@ramarivera/pi-goal](https://www.npmjs.com/package/@ramarivera/pi-goal) | Pi extension that adds Codex-style persisted goals and hidden continuation pressure. | ⬇ 1.2k/mo | yesterday |
| [@ramarivera/pi-supermemory](https://www.npmjs.com/package/@ramarivera/pi-supermemory) | Pi coding-agent extension that recalls and captures session memory through Supermemory. | ⬇ 1.1k/mo | 12d ago |
| [pi-provider-litellm](https://www.npmjs.com/package/pi-provider-litellm) | LiteLLM proxy provider extension for Pi | ⬇ 1.1k/mo | 6d ago |
| [pi-zentui](https://www.npmjs.com/package/pi-zentui) | A Starship-inspired statusline and Opencode-style TUI for Pi. | ⬇ 1.1k/mo | 2d ago |
| [@porche/pi-usage](https://www.npmjs.com/package/@porche/pi-usage) | Pi Coding Agent extension for tracking session token usage, provider account limits, and historical local consumption. | ⬇ 1.1k/mo | 14d ago |
| [pi-context-usage](https://www.npmjs.com/package/pi-context-usage) | Pi extension that shows context window usage visualization | ⬇ 1.1k/mo | 22d ago |
| [pi-ilo-lang](https://www.npmjs.com/package/pi-ilo-lang) | Pi extension for the ilo programming language: run programs, hold an interactive ilo serv session, and load the ilo skill so the agent knows the syntax. | ⬇ 1.1k/mo | 6d ago |
| [@firstpick/pi-extension-brave-search](https://www.npmjs.com/package/@firstpick/pi-extension-brave-search) | Brave Search tool for Pi with API key resolution from env and .env files. | ⬇ 1.1k/mo | 6d ago |
| [pi-byteplus-modelark](https://www.npmjs.com/package/pi-byteplus-modelark) | Pi extension for BytePlus ModelArk Coding Plan — registers ModelArk as a custom OpenAI-compatible provider with all supported coding models. | ⬇ 1.1k/mo | 25d ago |
| [@pi-unipi/cocoindex](https://www.npmjs.com/package/@pi-unipi/cocoindex) | CocoIndex integration for Pi — AST-aware content indexing, semantic vector search, and incremental pipeline management | ⬇ 1.1k/mo | today |
| [pi-odoo-workflow](https://www.npmjs.com/package/pi-odoo-workflow) | Odoo 18/19 module development for pi and Claude Code — auto-detects your modules and injects context, finds XML IDs in local source or GitHub, and scaffolds models, views, wizards, reports, tests and  | ⬇ 1.1k/mo | today |
| [@anh-chu/pi-subagents](https://www.npmjs.com/package/@anh-chu/pi-subagents) | A pi extension extension that brings smart Claude Code-style autonomous sub-agents to pi. | ⬇ 1.1k/mo | 18d ago |
| [visual-explainer](https://www.npmjs.com/package/visual-explainer) | Agent skill that generates beautiful HTML pages for diagrams, diff reviews, plan reviews, slide decks, and data tables | ⬇ 1.1k/mo | 28d ago |
| [more-pi](https://www.npmjs.com/package/more-pi) | OpenClaw-flavored pi wrapper that registers OpenClaw Codex models without patching pi packages | ⬇ 1.1k/mo | today |
| [pi-powerline-melbourne](https://www.npmjs.com/package/pi-powerline-melbourne) | Custom pi extensions, including a nerd-style powerline footer with context token count | ⬇ 1.1k/mo | 12d ago |
| [graphify-pi](https://www.npmjs.com/package/graphify-pi) | Pi extension and skill package that makes graphify knowledge graphs always-on during coding sessions. | ⬇ 1.1k/mo | ~1mo ago |
| [pi-memorix](https://www.npmjs.com/package/pi-memorix) | Pi extension that bridges Memorix memory hooks into Pi's session lifecycle | ⬇ 1.1k/mo | 7d ago |
| [pi-obsidian-vault](https://www.npmjs.com/package/pi-obsidian-vault) | Agent-safe Obsidian vault access for Pi: auto-detect, retrieve, validate, plan, write, edit, manage, and explicitly destroy Markdown with human approval. | ⬇ 1.1k/mo | 18d ago |
| [@jeonghyeon.net/pi-supervisor](https://www.npmjs.com/package/@jeonghyeon.net/pi-supervisor) | A pi extension that supervises the chat and steers it towards a defined outcome | ⬇ 1.1k/mo | 19d ago |
| [pi-token-speed](https://www.npmjs.com/package/pi-token-speed) | Pi extension to measure tokens per second via sliding window. | ⬇ 1.1k/mo | 16d ago |
| [@grafana/sigil-pi](https://www.npmjs.com/package/@grafana/sigil-pi) | Pi agent extension for Grafana Sigil AI telemetry | ⬇ 1.1k/mo | 9d ago |
| [@nteract/pi](https://www.npmjs.com/package/@nteract/pi) | Persistent notebook-backed Python REPL for Pi coding agents. Stateful execution, hot dependency sync, zero cold starts. | ⬇ 1.1k/mo | 11d ago |
| [pi-arxiv](https://www.npmjs.com/package/pi-arxiv) | Zotero library search, citation export, and PDF annotation tools for pi via Better BibTeX | ⬇ 1.1k/mo | 3mo ago |
| [mitsupi](https://www.npmjs.com/package/mitsupi) | Armin's pi coding agent commands, skills, extensions, and themes | ⬇ 1.1k/mo | ~1mo ago |
| [@howaboua/pi-vent](https://www.npmjs.com/package/@howaboua/pi-vent) | Pi extension for logging repeated workflow friction to VENT.md. | ⬇ 1.1k/mo | 8d ago |
| [pi-msgpack-rpc](https://www.npmjs.com/package/pi-msgpack-rpc) | A MessagePack RPC tool for Pi | ⬇ 1.1k/mo | 8d ago |
| [pi-thread-engine](https://www.npmjs.com/package/pi-thread-engine) | Thread-Based Engineering for pi — all 7 thread types + stories + fusion + zero-touch + TUI dashboard. Based on @IndyDevDan framework from agenticengineer.com. | ⬇ 1.1k/mo | 10d ago |
| [@capyup/pi-specs](https://www.npmjs.com/package/@capyup/pi-specs) | Pi package for spec-driven development workflows: PRODUCT.md, TECH.md, implementation, and audits. | ⬇ 1.1k/mo | 12d ago |
| [pi-lsp-lite](https://www.npmjs.com/package/pi-lsp-lite) | LSP diagnostics for pi — errors and warnings on every edit, same turn. Go, Rust, TypeScript, Python, C/C++. | ⬇ 1.1k/mo | 12d ago |
| [pi-annotate](https://www.npmjs.com/package/pi-annotate) | Visual annotation tool for Pi coding agent with inline note cards | ⬇ 1.1k/mo | ~1mo ago |
| [pi-auggie-router](https://www.npmjs.com/package/pi-auggie-router) | Opinionated sub-agent router for Pi: tightly couples SKILL.md execution with the Augment Code (auggie) Context Engine. | ⬇ 1.0k/mo | 15d ago |
| [@firstpick/pi-extension-stats](https://www.npmjs.com/package/@firstpick/pi-extension-stats) | Token and cost usage analytics command for Pi session history. | ⬇ 1.0k/mo | 6d ago |
| [pi-chatgpt-limit](https://www.npmjs.com/package/pi-chatgpt-limit) | Show ChatGPT Codex subscription usage in pi's footer | ⬇ 1.0k/mo | 9d ago |
| [pi-crof](https://www.npmjs.com/package/pi-crof) | CrofAI provider extension for pi | ⬇ 1.0k/mo | 5d ago |
| [@firstpick/pi-extension-fish-user-bash](https://www.npmjs.com/package/@firstpick/pi-extension-fish-user-bash) | Use fish shell backend for Pi user bash commands (! and !!). | ⬇ 1.0k/mo | 13d ago |
| [@khimaros/pi-webui](https://www.npmjs.com/package/@khimaros/pi-webui) | a simple, standalone webui for pi.dev | ⬇ 1.0k/mo | 8d ago |
| [moonpi](https://www.npmjs.com/package/moonpi) | Opinionated set of extensions for pi | ⬇ 1.0k/mo | yesterday |
| [claude-agent-sdk-pi](https://www.npmjs.com/package/claude-agent-sdk-pi) | This extension registers a custom provider that routes LLM calls through the **Claude Agent SDK** while **pi executes tools** and renders tool results in the TUI. | ⬇ 1.0k/mo | 9d ago |
| [@dmille56/openvibes](https://www.npmjs.com/package/@dmille56/openvibes) | OpenVibes Pi extension for milli-powered terminal overlays. | ⬇ 1.0k/mo | 11d ago |
| [@johnnywu/pi-filechanges](https://www.npmjs.com/package/@johnnywu/pi-filechanges) | Tracks files changed by pi via edit and write tools, with a toggleable file changes widget | ⬇ 1.0k/mo | 13d ago |
| [codecartographer-pi](https://www.npmjs.com/package/codecartographer-pi) | CodeCartographer packaged for Pi as an extension-driven workflow wrapper. | ⬇ 1.0k/mo | today |
| [pi-linter](https://www.npmjs.com/package/pi-linter) | Inline session linter for Pi — flags vague openers, pronoun soup, scope creep, and other input anti-patterns above the editor. | ⬇ 1.0k/mo | 7d ago |
| [pi-show-diffs](https://www.npmjs.com/package/pi-show-diffs) | Pi package that adds a diff approval viewer before edit and write tools change files. | ⬇ 1.0k/mo | 3d ago |
| [@firstpick/pi-extension-plan-mode-toggle](https://www.npmjs.com/package/@firstpick/pi-extension-plan-mode-toggle) | Toggleable planning mode extension for Pi with model switching, mandatory planning survey, and PLAN.md quality guards. | ⬇ 1k/mo | 10d ago |
| [@leing2021/pi-search](https://www.npmjs.com/package/@leing2021/pi-search) | Minimal Secure Evidence Gateway for Pi Coding Agent — search, web_search, web_fetch, research_search. Intent-based provider routing, quota fallback, dual-LLM research, 4-layer abuse prevention. | ⬇ 998/mo | 18d ago |
| [@frmhd/pi-sdk-acp-adapter](https://www.npmjs.com/package/@frmhd/pi-sdk-acp-adapter) | ACP adapter for Pi Coding Agent SDK - bridges Pi to ACP-compatible clients like Zed, JetBrains IDEs, Obsidian with Agent Client plugin, etc. | ⬇ 987/mo | 26d ago |
| [pi-doc-injector](https://www.npmjs.com/package/pi-doc-injector) | Auto-inject relevant project documentation into Pi's LLM context based on keyword matching | ⬇ 984/mo | 4d ago |
| [@gotgenes/pi-autoformat](https://www.npmjs.com/package/@gotgenes/pi-autoformat) | Pi extension that integrates ColGrep semantic code search as an agent tool. | ⬇ 978/mo | yesterday |
| [@xl0/show-sysprompt](https://www.npmjs.com/package/@xl0/show-sysprompt) | Tiny Pi extension that shows the rendered system prompt and active tool schemas at startup. | ⬇ 977/mo | 19d ago |
| [pi-simple-memory](https://www.npmjs.com/package/pi-simple-memory) | Simple persistent file-based memory for pi agents. | ⬇ 974/mo | ~1mo ago |
| [pi-mono-all](https://www.npmjs.com/package/pi-mono-all) | All pi-mono extensions and bundled skills | ⬇ 967/mo | 4d ago |
| [pi-idle](https://www.npmjs.com/package/pi-idle) | Pi extension: shows ✓ in terminal title when idle, spinner (◰◳◲◱) while working, with context-usage percentage beside the checkmark | ⬇ 963/mo | 5d ago |
| [@ramarivera/pi-skill-selector](https://www.npmjs.com/package/@ramarivera/pi-skill-selector) | Pi extension that lets you type $ to fuzzy-pick skills and insert /skill:name into the prompt. | ⬇ 961/mo | 16d ago |
| [pi-posh-git](https://www.npmjs.com/package/pi-posh-git) | posh-git style persistent git status for pi. Displays branch, ahead/behind, staged/unstaged counts, and stash count — always visible in the footer. | ⬇ 957/mo | 15d ago |
| [awto-pi-lot](https://www.npmjs.com/package/awto-pi-lot) | pi-coding-agent extension that adds PPQ.ai provider and their AutoClaw model | ⬇ 950/mo | 17d ago |
| [@ocodista/pi-token-bloat](https://www.npmjs.com/package/@ocodista/pi-token-bloat) | Pi extension that estimates model-facing context footprint by resource. | ⬇ 947/mo | ~1mo ago |
| [@majorgilles/pi-grill-me](https://www.npmjs.com/package/@majorgilles/pi-grill-me) | Socratic planning and shared-understanding sessions for pi. | ⬇ 944/mo | 7d ago |
| [@kuyavinny/pi-muninn-mem](https://www.npmjs.com/package/@kuyavinny/pi-muninn-mem) | MuninnDB memory provider for Pi — SSE subscription, context injection, vault bridge | ⬇ 943/mo | 14d ago |
| [@firstpick/pi-extension-tech-news](https://www.npmjs.com/package/@firstpick/pi-extension-tech-news) | Tech news tools and commands for Pi using Hacker News, Reddit, Socket.dev, and daily.dev sources. | ⬇ 937/mo | 7d ago |
| [@leonardorick/pi-web-search](https://www.npmjs.com/package/@leonardorick/pi-web-search) | Web search tool for pi — Exa MCP search with DuckDuckGo fallback via wreq-js. | ⬇ 935/mo | 7d ago |
| [pi-tool-search](https://www.npmjs.com/package/pi-tool-search) | Hide all tools behind a manifest-aware tool_search — LLM enables tools by name on demand | ⬇ 924/mo | ~1mo ago |
| [pi-skill-guard](https://www.npmjs.com/package/pi-skill-guard) | Pi extension that guards against common LLM tool call mistakes: missing skill documentation injection, unknown tool bash fallback, and edit/write/read field name normalization | ⬇ 921/mo | 2d ago |
| [pi-searxng-suite](https://www.npmjs.com/package/pi-searxng-suite) | SearxNG-based web search with category filtering and multi-format URL extraction for pi. | ⬇ 920/mo | 9d ago |
| [@matheusbbarni/pi-message-queue](https://www.npmjs.com/package/@matheusbbarni/pi-message-queue) | A Pi extension for queueing user messages and sending them one after another. | ⬇ 919/mo | 13d ago |
| [@mrclrchtr/supi-flow](https://www.npmjs.com/package/@mrclrchtr/supi-flow) | PI extension for spec-driven workflow (brainstorm → plan → apply → archive) with TNDM ticket coordination, 7 custom tools, and 5 auto-discovered skills | ⬇ 916/mo | today |
| [pi-jingle](https://www.npmjs.com/package/pi-jingle) | Play sounds on pi events like agent_start and agent_end | ⬇ 915/mo | ~1mo ago |
| [@santiago-r/pi-ml-intern](https://www.npmjs.com/package/@santiago-r/pi-ml-intern) | ML Intern extension for Pi — autonomous ML research & implementation with literature-backed recipes. Inspired by Hugging Face's ml-intern. | ⬇ 913/mo | 6d ago |
| [@cortexkit/pi-anthropic-auth](https://www.npmjs.com/package/@cortexkit/pi-anthropic-auth) | Pi package for CortexKit Anthropic OAuth support. It overrides Pi's built-in `anthropic` provider with a CortexKit provider extension backed by the shared `@cortexkit/anthropic-auth-core` package. | ⬇ 911/mo | 4d ago |
| [@firstpick/pi-extension-bang-command-autocomplete](https://www.npmjs.com/package/@firstpick/pi-extension-bang-command-autocomplete) | Autocomplete for ! in Pi, with optional shell-history indexing. | ⬇ 906/mo | 13d ago |
| [@vtstech/pi-react-fallback](https://www.npmjs.com/package/@vtstech/pi-react-fallback) | ReAct fallback extension for Pi Coding Agent | ⬇ 906/mo | 12d ago |
| [@zackify/pi-claude-permissions](https://www.npmjs.com/package/@zackify/pi-claude-permissions) | Claude-style permissions for pi with an opinionated small mode set and built-in plan mode. | ⬇ 903/mo | 18d ago |
| [@firstpick/pi-extension-reverse-last](https://www.npmjs.com/package/@firstpick/pi-extension-reverse-last) | Session-aware undo for Pi write/edit tool changes via /reverse-last. | ⬇ 901/mo | 8d ago |
| [@heyhuynhgiabuu/pi-diff](https://www.npmjs.com/package/@heyhuynhgiabuu/pi-diff) | Shiki-powered terminal diff renderer for pi — syntax-highlighted, word-level diffs in split and unified views. | ⬇ 884/mo | 8d ago |
| [pi-notifi](https://www.npmjs.com/package/pi-notifi) | Pi extension that sends focus-aware desktop notifications when pi finishes a task. | ⬇ 878/mo | 2d ago |
| [@jeonghyeon.net/pi-subagents](https://www.npmjs.com/package/@jeonghyeon.net/pi-subagents) | A pi extension extension that brings smart Claude Code-style autonomous sub-agents to pi. | ⬇ 868/mo | ~1mo ago |
| [pi-bench](https://www.npmjs.com/package/pi-bench) | LLM benchmark toolkit for pi coding agent. Probes every available model with real streaming API calls and ranks by latency, cost, and output quality. Provides curated model chain and blacklist for sma | ⬇ 867/mo | 12d ago |
| [@firstpick/pi-extension-todo-progress](https://www.npmjs.com/package/@firstpick/pi-extension-todo-progress) | Aggressive automatic todo progress widget for multi-goal prompts in Pi. | ⬇ 866/mo | 10d ago |
| [@aslamplr/pi-safe-shell](https://www.npmjs.com/package/@aslamplr/pi-safe-shell) | Protect your production assets from dangerous bash commands. Default no-bash mode with user approval gates and whitelist support. | ⬇ 865/mo | 6d ago |
| [pi-sub-agent](https://www.npmjs.com/package/pi-sub-agent) | A Pi package extension that provides sub-agent functionality. | ⬇ 863/mo | 7d ago |
| [@narumitw/pi-skillforge](https://www.npmjs.com/package/@narumitw/pi-skillforge) | Pi package for improving agent skills through verified project memory. | ⬇ 862/mo | 15d ago |
| [@ramarivera/pi-grok-build](https://www.npmjs.com/package/@ramarivera/pi-grok-build) | Pi extension providing Grok Build / Grok CLI integration. | ⬇ 852/mo | today |
| [@ramarivera/pi-kimi-for-coding](https://www.npmjs.com/package/@ramarivera/pi-kimi-for-coding) | Pi extension that adds Kimi For Coding OAuth support using the official device flow and Kimi-specific request behavior. | ⬇ 852/mo | 16d ago |
| [pi-subagentura](https://www.npmjs.com/package/pi-subagentura) | Public Pi package that adds in-process sub-agents via the SDK | ⬇ 852/mo | 3d ago |
| [pi-claude-sandbox](https://www.npmjs.com/package/pi-claude-sandbox) | Claude-style OS-level sandboxing for pi with interactive permission prompts. Coexists with pi-tool-display and other bash-overriding extensions. Forked from carderne/pi-sandbox. | ⬇ 848/mo | ~1mo ago |
| [pi-repo-baby](https://www.npmjs.com/package/pi-repo-baby) | Repository map generator for Pi — gives the agent structural awareness of any codebase via Tree-sitter | ⬇ 847/mo | 10d ago |
| [pi-cc](https://www.npmjs.com/package/pi-cc) | pi extension that auto-publishes autoresearch.jsonl updates to community.computer. | ⬇ 845/mo | ~1mo ago |
| [pi-edgee-proxy](https://www.npmjs.com/package/pi-edgee-proxy) | Route Pi coding agent through Edgee AI Gateway for lossless token compression — any provider, any model | ⬇ 839/mo | 26d ago |
| [pi-mcporter](https://www.npmjs.com/package/pi-mcporter) | Single-tool MCPorter bridge extension for pi and Model Context Protocol (MCP) servers. | ⬇ 834/mo | 11d ago |
| [pi-conventions](https://www.npmjs.com/package/pi-conventions) | Pi package for enforcing codebase conventions through structure and naming policies. | ⬇ 832/mo | 18d ago |
| [pi-emote](https://www.npmjs.com/package/pi-emote) | Animated pixel-art emote widget for pi TUI | ⬇ 829/mo | 6d ago |
| [pi-gh-cli](https://www.npmjs.com/package/pi-gh-cli) | Structured GitHub CLI tools for Pi agents | ⬇ 828/mo | 8d ago |
| [pi-local-agents-only](https://www.npmjs.com/package/pi-local-agents-only) | Pi extension that strips global AGENTS.md and CLAUDE.md from the effective prompt for selected projects. | ⬇ 828/mo | 2d ago |
| [pi-agent-codebase-workflows](https://www.npmjs.com/package/pi-agent-codebase-workflows) | Pi skills and prompt templates for structured YAML artifact workflows: safe-start, codebase-recon, safe-change, architecture review, and legacy docs migration. | ⬇ 827/mo | yesterday |
| [@talesofai/neta-skills](https://www.npmjs.com/package/@talesofai/neta-skills) | Neta API pi coding agent skills for interacting with Neta API to generate images, videos, songs, and manage characters/elements. | ⬇ 822/mo | 13d ago |
| [pi-board](https://www.npmjs.com/package/pi-board) | AI-first local task/sprint manager | ⬇ 819/mo | 26d ago |
| [pi-search-hub](https://www.npmjs.com/package/pi-search-hub) | Unified web search + content extraction extension for pi with 12 backends (DuckDuckGo, Jina AI, Tavily, Brave, Exa, Serper, Firecrawl, Marginalia, LangSearch, WebSearchAPI, Perplexity Sonar, SearXNG). | ⬇ 818/mo | yesterday |
| [@gaodes/pi-lens](https://www.npmjs.com/package/@gaodes/pi-lens) | Real-time code feedback for pi — LSP, linters, formatters, type-checking, structural analysis & booboo | ⬇ 817/mo | 12d ago |
| [pi-thinking-box](https://www.npmjs.com/package/pi-thinking-box) | Wrap Pi agent thinking blocks in a styled background box. | ⬇ 817/mo | 9d ago |
| [pi-kimi-coder](https://www.npmjs.com/package/pi-kimi-coder) | Pi extension for Kimi K2 Coding plan — OAuth-based provider with kimi-for-coding model | ⬇ 814/mo | 21d ago |
| [@lpirito/pi-diffloop](https://www.npmjs.com/package/@lpirito/pi-diffloop) | Pair programming with Pi, be aware of every change made to the codebase. | ⬇ 812/mo | today |
| [@howaboua/pi-subagent-review](https://www.npmjs.com/package/@howaboua/pi-subagent-review) | Pi extension that adds /review via an isolated review subagent. | ⬇ 808/mo | 7d ago |
| [pi-multiloop](https://www.npmjs.com/package/pi-multiloop) | Autoloop/autoresearch extension for Pi with multi-lane isolation | ⬇ 807/mo | 11d ago |
| [@termdraw/pi](https://www.npmjs.com/package/@termdraw/pi) | Pi extension package that embeds termDRAW inside Pi via opentui-island. | ⬇ 804/mo | 7d ago |
| [pi-alibaba-models](https://www.npmjs.com/package/pi-alibaba-models) | The complete Alibaba provider for pi — Plan subscription + Cloud pay-per-token, International + China endpoints, Anthropic + OpenAI shapes, native thinking levels. Qwen 3.6 Max, Qwen 3.6 Plus, DeepSee | ⬇ 800/mo | 2d ago |
| [@code-fixer-23/create-pi-package](https://www.npmjs.com/package/@code-fixer-23/create-pi-package) | Scaffold PI packages with prompts, skills, and extensions. | ⬇ 795/mo | 5d ago |
| [@vtstech/pi-soul](https://www.npmjs.com/package/@vtstech/pi-soul) | Long-term memory extension for Pi - persistent memory across sessions | ⬇ 791/mo | yesterday |
| [pi-autocontext](https://www.npmjs.com/package/pi-autocontext) | autocontext extension for Pi coding agent — iterative strategy generation, LLM judging, and evaluation tools | ⬇ 785/mo | 10d ago |
| [pi-finder-subagent](https://www.npmjs.com/package/pi-finder-subagent) | Read-only local workspace scout subagent package for pi agents (code + personal files) | ⬇ 785/mo | 18d ago |
| [@firstpick/pi-extension-upgrade-extensions](https://www.npmjs.com/package/@firstpick/pi-extension-upgrade-extensions) | Upgrade npm-installed Pi extensions with up-to-date checks. | ⬇ 775/mo | 7d ago |
| [@gaodes/pi-graphify](https://www.npmjs.com/package/@gaodes/pi-graphify) | Turn any folder into a queryable knowledge graph — build, query, explore, and update graphs from inside Pi | ⬇ 773/mo | yesterday |
| [@mcowger/pi-better-messages-cache](https://www.npmjs.com/package/@mcowger/pi-better-messages-cache) | Pi extension: dual cache-breakpoint strategy for Anthropic models — marks both the last assistant tool_use block and the last user message block with cache_control, dramatically improving cache hit ra | ⬇ 771/mo | 10d ago |
| [@cirthan/pi-cirthan-provider](https://www.npmjs.com/package/@cirthan/pi-cirthan-provider) | Pi provider package for the Cirthan API. | ⬇ 767/mo | 16d ago |
| [@nielpattin/pi-caveman](https://www.npmjs.com/package/@nielpattin/pi-caveman) | Station bar status extension for pi coding agent | ⬇ 767/mo | 6d ago |
| [lsp-pi](https://www.npmjs.com/package/lsp-pi) | LSP extension for pi-coding-agent - provides language server tool and diagnostics feedback for Dart/Flutter, TypeScript, Vue, Svelte, Python, Go, Kotlin, Swift, Rust | ⬇ 765/mo | 9d ago |
| [decorated-pi](https://www.npmjs.com/package/decorated-pi) | A pi extension with better work-flow: patch tool, safety gates, secret redaction, smart @ completion, dynamic AGENTS loading, image fallback, and LSP tools | ⬇ 760/mo | today |
| [pi-jj-auto](https://www.npmjs.com/package/pi-jj-auto) | Automatic jj revision management — guards file edits to keep Jujutsu revisions focused | ⬇ 759/mo | 20d ago |
| [@capyup/pi-exa](https://www.npmjs.com/package/@capyup/pi-exa) | Exa web research for pi via five first-class tools + skill + local CLI. Uses the official exa-js SDK directly — no MCP server, no adapter. Tools: exa_search, exa_similar, exa_fetch, exa_answer, exa_re | ⬇ 755/mo | 15d ago |
| [pi-agentteam](https://www.npmjs.com/package/pi-agentteam) | Multi-agent team orchestration for pi — leader-coordinator pattern with researcher, planner, and implementer teammates in tmux panes | ⬇ 751/mo | 14d ago |
| [tau-all-agent](https://www.npmjs.com/package/tau-all-agent) | Opinionated Pi package with web search, review workflows, sandboxing, memory, usage reporting, skills, and a theme | ⬇ 751/mo | 16d ago |
| [@davehardy20/pi-compact-plus](https://www.npmjs.com/package/@davehardy20/pi-compact-plus) | Pi package for advanced context compaction with mode-aware triggers, structured summaries, current-focus extraction, content classification, and lightweight checkpoints. | ⬇ 750/mo | 4d ago |
| [pi-vitals](https://www.npmjs.com/package/pi-vitals) | A customizable powerline-style footer for pi | ⬇ 750/mo | 9d ago |
| [@llblab/pi-wakeup](https://www.npmjs.com/package/@llblab/pi-wakeup) | Singleton wake-up scheduler extension for pi | ⬇ 748/mo | 20d ago |
| [@majorgilles/pi-permissions](https://www.npmjs.com/package/@majorgilles/pi-permissions) | Simplified auto/ask guardrails for pi tool calls. | ⬇ 748/mo | 5d ago |
| [pi-paster](https://www.npmjs.com/package/pi-paster) | Pi extension that turns pasted image paths into first-class image attachments. | ⬇ 740/mo | 2d ago |
| [@davidorex/pi-behavior-monitors](https://www.npmjs.com/package/@davidorex/pi-behavior-monitors) | Schema-driven project state management for Pi | ⬇ 739/mo | 28d ago |
| [@micka33/pi-karpathy-skill](https://www.npmjs.com/package/@micka33/pi-karpathy-skill) | Pi package providing the Karpathy Guidelines skill for safer, simpler coding-agent behavior. | ⬇ 737/mo | 10d ago |
| [pi-easy-footer](https://www.npmjs.com/package/pi-easy-footer) | A footer extension and session banner for pi | ⬇ 735/mo | ~1mo ago |
| [@uadgj/pi-superpowers-support](https://www.npmjs.com/package/@uadgj/pi-superpowers-support) | Pi extension providing TodoWrite, Task, and Skill tools for official superpowers compatibility | ⬇ 729/mo | 27d ago |
| [pi-provider-umans](https://www.npmjs.com/package/pi-provider-umans) | Umans.ai provider for pi — OpenAI-compatible endpoint with dynamic model discovery | ⬇ 728/mo | 17d ago |
| [pi-web-fetch](https://www.npmjs.com/package/pi-web-fetch) | Pi extension: fetch web pages via headless Chrome, extract content with trafilatura, and optionally process with an LLM | ⬇ 728/mo | 3mo ago |
| [pi-double-paste](https://www.npmjs.com/package/pi-double-paste) | Paste a long block once to collapse it, paste it again to expand it in the editor. | ⬇ 725/mo | 13d ago |
| [@josephyoung/pi-file-reference](https://www.npmjs.com/package/@josephyoung/pi-file-reference) | Pi extension: resolve @filepath (files & directories) in AGENTS.md, inject into system prompt | ⬇ 724/mo | yesterday |
| [pi-gograph](https://www.npmjs.com/package/pi-gograph) | Gograph integration for pi — AST-aware Go code navigation | ⬇ 723/mo | 7d ago |
| [pi-claude-permissions](https://www.npmjs.com/package/pi-claude-permissions) | Claude-style allow/deny/ask permission lists for Pi tool calls | ⬇ 720/mo | ~1mo ago |
| [@gaodes/pi-dev-kit](https://www.npmjs.com/package/@gaodes/pi-dev-kit) | Developer toolkit for Pi — modular skills for authoring extensions, skills, prompt templates, themes, packages, and context files. Includes introspection tools for version, docs, changelog, benchmarki | ⬇ 718/mo | 10d ago |
| [pi-telegram](https://www.npmjs.com/package/pi-telegram) | Pi-Telegram: Bridge Telegram bots to pi coding agent via RPC | ⬇ 717/mo | 14d ago |
| [pi-exit](https://www.npmjs.com/package/pi-exit) | Minimal pi package that adds a /exit command. | ⬇ 716/mo | 25d ago |
| [@qhn/pi-goal](https://www.npmjs.com/package/@qhn/pi-goal) | Setup-first autonomous goal mode extension for Pi. | ⬇ 713/mo | 15d ago |
| [role-persona](https://www.npmjs.com/package/role-persona) | Role-based persona system for AI agents — memory, knowledge, embedding. CLI, MCP, daemon, Pi extension. | ⬇ 708/mo | 11d ago |
| [glm-buddy](https://www.npmjs.com/package/glm-buddy) | Pi extension: Rate-limits GLM model usage during z.ai peak hours (14:00-18:00 UTC+8) to prevent token burn | ⬇ 707/mo | 9d ago |
| [pi-web-kit](https://www.npmjs.com/package/pi-web-kit) | Context-efficient web search and fetch tools for Pi. | ⬇ 706/mo | 5d ago |
| [@deevus/pi-zmx](https://www.npmjs.com/package/@deevus/pi-zmx) | Execute shell commands in persistent zmx sessions from pi | ⬇ 705/mo | 5d ago |
| [pi-crofai](https://www.npmjs.com/package/pi-crofai) | CrofAI provider for Pi — self-contained, auto-discovers models, supports env var or /login paste | ⬇ 704/mo | 13d ago |
| [pi-ca-leash](https://www.npmjs.com/package/pi-ca-leash) | Harness-aware Claude Code and Codex CLI extension for pi | ⬇ 700/mo | 22d ago |
| [@sherif-fanous/pi-presets-plus](https://www.npmjs.com/package/@sherif-fanous/pi-presets-plus) | Pi extension: model + thinking + tools + system-prompt presets, with a UI on top. | ⬇ 699/mo | 13d ago |
| [pi-recap](https://www.npmjs.com/package/pi-recap) | Session recap panel for pi coding agent. Always-visible widget showing the current goal and last few conversation turns with live streaming updates. Auto-selects the fastest, cheapest summarization mo | ⬇ 698/mo | 14d ago |
| [omp-openai-provider-tools](https://www.npmjs.com/package/omp-openai-provider-tools) | Provider-native OpenAI Responses tools for OMP and Pi-family runtimes. | ⬇ 696/mo | 5d ago |
| [@aliou/pi-neuralwatt](https://www.npmjs.com/package/@aliou/pi-neuralwatt) | ![banner](https://assets.aliou.me/github/aliou/pi-neuralwatt/banner.png) | ⬇ 695/mo | today |
| [oh-my-open-pi](https://www.npmjs.com/package/oh-my-open-pi) | Pi Coding Agent extension package for model routing, tools, background tasks, and safety hooks. | ⬇ 695/mo | 19d ago |
| [pi-tavily-tools](https://www.npmjs.com/package/pi-tavily-tools) | Tavily tools and status panel for pi | ⬇ 691/mo | 18d ago |
| [pi-jarvis](https://www.npmjs.com/package/pi-jarvis) | A /jarvis side-conversation overlay extension for Pi. | ⬇ 690/mo | 27d ago |
| [@mackor/pi-tasks](https://www.npmjs.com/package/@mackor/pi-tasks) | Persistent shared task lists for Pi agents and MCP clients. | ⬇ 685/mo | 4d ago |
| [pi-ask-lite](https://www.npmjs.com/package/pi-ask-lite) | A tiny, pleasant Markdown ask tool for Pi. | ⬇ 684/mo | 7d ago |
| [pi-wiki](https://www.npmjs.com/package/pi-wiki) | LLM Wiki - compounding knowledge base for pi + Obsidian. Based on Karpathy's pattern + Ar9av's obsidian-wiki framework. | ⬇ 683/mo | 15d ago |
| [pi-footer](https://www.npmjs.com/package/pi-footer) | Configurable, Ultimate multi-line footer/statusline extension for pi | ⬇ 682/mo | 16d ago |
| [pi-obsidian-preview](https://www.npmjs.com/package/pi-obsidian-preview) | Open the last Pi assistant response in Obsidian — /preview command and configurable keyboard shortcut | ⬇ 679/mo | 23d ago |
| [pi-read-map](https://www.npmjs.com/package/pi-read-map) | Pi extension that adds structural file maps for large files | ⬇ 675/mo | 3mo ago |
| [pi-cache-graph](https://www.npmjs.com/package/pi-cache-graph) | Pi extension for visualizing context cache distribution and statistics | ⬇ 674/mo | 23d ago |
| [@pukljak/pi-memory](https://www.npmjs.com/package/@pukljak/pi-memory) | Persistent memory and observation timeline extension for Pi coding agent | ⬇ 671/mo | 15d ago |
| [cortexkit-magic-context](https://github.com/cortexkit/magic-context) | Magic Context cache-aware infinite context, cross-session memory, and background history compression | ⭐671 | 5d ago |
| [pi-balance](https://www.npmjs.com/package/pi-balance) | Pi extension that displays provider account balance in the status bar. | ⬇ 670/mo | today |
| [pi-wiggum](https://www.npmjs.com/package/pi-wiggum) | Ralph Wiggum loop for pi — autonomous agentic software development workflow. Agents clarify, plan, implement, review, fix, and iterate. | ⬇ 670/mo | 11d ago |
| [pi-kiro](https://www.npmjs.com/package/pi-kiro) | [Kiro](https://kiro.dev) provider for [pi](https://github.com/badlogic/pi-mono). | ⬇ 668/mo | 23d ago |
| [pi-zellij-tools](https://www.npmjs.com/package/pi-zellij-tools) | Pi extension tools for running shell commands and independent Pi sessions in terminal targets. | ⬇ 665/mo | 10d ago |
| [@capyup/pi-auto-compact](https://www.npmjs.com/package/@capyup/pi-auto-compact) | Pre-turn auto-compaction for pi | ⬇ 663/mo | 16d ago |
| [omp-notify-tool](https://www.npmjs.com/package/omp-notify-tool) | Model-callable non-blocking notify tool for OMP and Pi-family runtimes. | ⬇ 663/mo | 15d ago |
| [@aliou/pi-dev-kit](https://www.npmjs.com/package/@aliou/pi-dev-kit) | ![banner](https://assets.aliou.me/github/aliou/pi-dev-kit/banner.png) | ⬇ 661/mo | 2d ago |
| [pi-searxng-aggregator](https://www.npmjs.com/package/pi-searxng-aggregator) | Search via a local SearXNG instance and aggregate results into per-topic JSON files | ⬇ 659/mo | 14d ago |
| [@zenobius/pi-worktrees](https://www.npmjs.com/package/@zenobius/pi-worktrees) | Worktrees extension for Pi Coding Agent | ⬇ 657/mo | ~1mo ago |
| [pi-screenshots-picker](https://www.npmjs.com/package/pi-screenshots-picker) | Screenshot picker extension for pi coding agent - quickly select and attach screenshots to your prompts | ⬇ 656/mo | 27d ago |
| [pi-code-quality](https://www.npmjs.com/package/pi-code-quality) | Declarative Pi extension that automatically formats and lints files after write/edit. | ⬇ 655/mo | 14d ago |
| [@ghoseb/pi-damage-control](https://www.npmjs.com/package/@ghoseb/pi-damage-control) | AST-based Damage Control extension for Pi | ⬇ 654/mo | 13d ago |
| [pi-mono-figma](https://www.npmjs.com/package/pi-mono-figma) | Pi extension and skill for Figma design context tools | ⬇ 652/mo | 17d ago |
| [@alexleekt/pi-ask-user-glimpse](https://www.npmjs.com/package/@alexleekt/pi-ask-user-glimpse) | Ask better questions. Get better answers. Rich native WebView dialogs for the Pi agent. | ⬇ 651/mo | yesterday |
| [pi-casefile](https://www.npmjs.com/package/pi-casefile) | Offensive security case tracker for pi — bug bounties, CTFs, security audits | ⬇ 649/mo | 6d ago |
| [@carze/pi-vertex-claude](https://www.npmjs.com/package/@carze/pi-vertex-claude) | Google Vertex AI Claude provider for Pi coding agent | ⬇ 648/mo | 13d ago |
| [@qmxme/pi-lametric-notify](https://www.npmjs.com/package/@qmxme/pi-lametric-notify) | LaMetric Time notifications for pi when the agent finishes and waits for input | ⬇ 644/mo | 7d ago |
| [@calesennett/pi-codex-usage](https://www.npmjs.com/package/@calesennett/pi-codex-usage) | Codex usage footer extension for pi | ⬇ 642/mo | 13d ago |
| [@richardgill/pi-preset](https://www.npmjs.com/package/@richardgill/pi-preset) | Pi extension for collecting file/line evidence seen or cited during a session. | ⬇ 641/mo | yesterday |
| [pi-gods](https://www.npmjs.com/package/pi-gods) | Pantheon SDD Agent System — fully autonomous multi-agent pipeline with tool boundary enforcement, file-based handoff, and 13 Roman/Greek deities | ⬇ 640/mo | 4d ago |
| [pi-engram](https://www.npmjs.com/package/pi-engram) | Standalone shareable Engram extension package for pi-coding-agent | ⬇ 638/mo | ~1mo ago |
| [oh-my-opencode-pi](https://www.npmjs.com/package/oh-my-opencode-pi) | Pantheon-style multi-agent orchestration for pi, inspired by oh-my-opencode-slim | ⬇ 635/mo | ~1mo ago |
| [@marckrenn/pi-sub-bar](https://www.npmjs.com/package/@marckrenn/pi-sub-bar) | Usage widget extension for pi-coding-agent - shows current provider usage above the editor | ⬇ 633/mo | 2mo ago |
| [pi-telemetry-minimal](https://www.npmjs.com/package/pi-telemetry-minimal) | Minimal token usage telemetry for Pi | ⬇ 632/mo | 27d ago |
| [mempalace-pi](https://www.npmjs.com/package/mempalace-pi) | MemPalace extension package for pi, adding commands, tools, and save reminders for memory workflows. | ⬇ 629/mo | 10d ago |
| [@blackbelt-technology/pi-agent-dashboard](https://www.npmjs.com/package/@blackbelt-technology/pi-agent-dashboard) | Pi skill that scaffolds new dashboard plugins or augments existing pi-extension projects with dashboard plugin contributions | ⬇ 628/mo | 14d ago |
| [@eamode/pi-commit](https://www.npmjs.com/package/@eamode/pi-commit) | pi extension for automatic changelog-friendly Conventional Commits with submodule support. | ⬇ 628/mo | 4d ago |
| [@rohirik/pi-ltm](https://www.npmjs.com/package/@rohirik/pi-ltm) | LTM (Long-Term Memory) native extension for Pi — share memories with Claude Code and OpenCode | ⬇ 625/mo | 6d ago |
| [pi-plan-mode](https://www.npmjs.com/package/pi-plan-mode) | Plan mode extension for pi - read-only exploration with plan file editing | ⬇ 625/mo | ~1mo ago |
| [@thinkscape/pi-status](https://www.npmjs.com/package/@thinkscape/pi-status) | Configurable, auto-updating terminal title and Ghostty native progress bar for pi coding agent. | ⬇ 624/mo | 12d ago |
| [@pi-lab/permissions](https://www.npmjs.com/package/@pi-lab/permissions) | Permission system extension for pi coding agent | ⬇ 623/mo | 18d ago |
| [@victor-software-house/pi-openai-proxy](https://www.npmjs.com/package/@victor-software-house/pi-openai-proxy) | OpenAI-compatible HTTP proxy for pi's multi-provider model registry | ⬇ 618/mo | 19d ago |
| [@parallel-web/pi-extension](https://www.npmjs.com/package/@parallel-web/pi-extension) | Add web search and web fetch to your pi agent | ⬇ 615/mo | 17d ago |
| [pi-zstack](https://www.npmjs.com/package/pi-zstack) | Rob Zolkos' personal Pi stack as an installable meta package. | ⬇ 615/mo | 18d ago |
| [pi-mono-linear](https://www.npmjs.com/package/pi-mono-linear) | Pi extension and skill for Linear GraphQL tools | ⬇ 608/mo | 4d ago |
| [@wind_mask/aw-watcher-agent-pi](https://www.npmjs.com/package/@wind_mask/aw-watcher-agent-pi) | Pi extension for ActivityWatch session tracking — records code agent sessions, models, token usage, and costs | ⬇ 607/mo | 4d ago |
| [pi-code-nav](https://www.npmjs.com/package/pi-code-nav) | Exact symbol navigation companion for Pi, built to sit between pi-codesight discovery and pi-lens raw LSP operations. | ⬇ 607/mo | 15d ago |
| [pi-lifeline](https://www.npmjs.com/package/pi-lifeline) | Pi extension that lets smaller models phone a stronger advisor model when autoresearch gets stuck. | ⬇ 607/mo | 8d ago |
| [pi-live-terminal](https://www.npmjs.com/package/pi-live-terminal) | Pi extension that runs commands in tmux and displays a live terminal widget. | ⬇ 607/mo | 13d ago |
| [pi-supersafety](https://www.npmjs.com/package/pi-supersafety) | When the example safety extensions don't cover what you need, this should! Simple with approval flow and windows sandbox capability (with Sandboxie) | ⬇ 606/mo | 26d ago |
| [@ameno/pi-minimax-mcp](https://www.npmjs.com/package/@ameno/pi-minimax-mcp) | MiniMax MCP tools for pi - Web search and image understanding via MiniMax's Model Context Protocol | ⬇ 605/mo | 4mo ago |
| [pi-handoff](https://www.npmjs.com/package/pi-handoff) | Handoff command extension package for pi coding agent | ⬇ 605/mo | 18d ago |
| [@artale/pi-skills](https://www.npmjs.com/package/@artale/pi-skills) | Production-grade engineering skills for Pi | ⬇ 603/mo | 23d ago |
| [@krzyzanowskim/pi-profiles](https://www.npmjs.com/package/@krzyzanowskim/pi-profiles) | Run Pi with isolated auth profiles while sharing the standard session store. | ⬇ 602/mo | 19d ago |
| [pi-sync-extension](https://www.npmjs.com/package/pi-sync-extension) | Secure sync for Pi configuration (settings, extensions, skills) | ⬇ 602/mo | 13d ago |
| [@gogomi/pi-windows-shell](https://www.npmjs.com/package/@gogomi/pi-windows-shell) | Windows PowerShell and process-management tools for Pi coding agent. | ⬇ 600/mo | 7d ago |
| [pi-tmux-window-name](https://www.npmjs.com/package/pi-tmux-window-name) | Automatically name tmux windows for pi coding sessions | ⬇ 600/mo | 18d ago |
| [pi-fzf](https://www.npmjs.com/package/pi-fzf) | A [Pi](https://github.com/badlogic/pi) extension for fuzzy finding. Define commands that list candidates from any shell command, then perform actions on the selected item—fill the editor, send to the  | ⬇ 599/mo | ~1mo ago |
| [@dhruv2mars/pi-queue](https://www.npmjs.com/package/@dhruv2mars/pi-queue) | Advanced FIFO message queue and steering for pi — queue follow-ups while the agent works | ⬇ 598/mo | 20d ago |
| [pi-kanban](https://www.npmjs.com/package/pi-kanban) | Workspace for the pi coding agent — sessions, todos, subagents, and more. | ⬇ 598/mo | 12d ago |
| [@mcowger/pi-plexus](https://www.npmjs.com/package/@mcowger/pi-plexus) | Plexus AI provider extension package for pi | ⬇ 595/mo | 4d ago |
| [pi-psql](https://www.npmjs.com/package/pi-psql) | Secure PostgreSQL client skill for pi - query databases with encrypted credentials | ⬇ 594/mo | ~1mo ago |
| [pi-playwright](https://www.npmjs.com/package/pi-playwright) | Playwright browser automation skill package for pi | ⬇ 589/mo | 3mo ago |
| [pi-hooks](https://www.npmjs.com/package/pi-hooks) | Collection of pi extensions (checkpoint, lsp, permission, ralph-loop, repeat) | ⬇ 583/mo | 9d ago |
| [pi-openrouter-realtime](https://www.npmjs.com/package/pi-openrouter-realtime) | OpenRouter extension for pi — real-time model sync, provider/quantization enrichment, endpoint health, credit balance, and interactive model picker | ⬇ 583/mo | 5d ago |
| [@howaboua/pi-auto-reasoning-tool](https://www.npmjs.com/package/@howaboua/pi-auto-reasoning-tool) | Pi package that gives agents a change_reasoning tool for adjusting reasoning level when substantial work is likely. | ⬇ 582/mo | 8d ago |
| [opencode-pi](https://www.npmjs.com/package/opencode-pi) | Pi extension: OpenCode Zen free models provider for Pi agent | ⬇ 581/mo | 10d ago |
| [pi-phoenix](https://www.npmjs.com/package/pi-phoenix) | Phoenix tracing extension for pi | ⬇ 580/mo | ~1mo ago |
| [@mcowger/pi-suppress-providers](https://www.npmjs.com/package/@mcowger/pi-suppress-providers) | Pi extension that limits which providers appear in model selection by suppressing env vars for non-enabled providers | ⬇ 577/mo | 4d ago |
| [@codingcoffee/pi-readonly-ssh](https://www.npmjs.com/package/@codingcoffee/pi-readonly-ssh) | a pi extension for safely running allow-listed, read-only commands on remote hosts over SSH | ⬇ 575/mo | ~1mo ago |
| [@fgladisch/pi-persistent-history](https://www.npmjs.com/package/@fgladisch/pi-persistent-history) | Per-project persistent prompt input history for Pi | ⬇ 573/mo | 6d ago |
| [pi-ralplan](https://www.npmjs.com/package/pi-ralplan) | Consensus-driven planning extension for Pi | ⬇ 572/mo | 22d ago |
| [@the-forge-flow/pi-token-saver](https://www.npmjs.com/package/@the-forge-flow/pi-token-saver) | Token-saving proxy for the PI coding agent — intercepts and compresses API calls to reduce token consumption | ⬇ 571/mo | ~1mo ago |
| [pi-guard-sandbox](https://www.npmjs.com/package/pi-guard-sandbox) | A lightweight OS-level guard for Pi: agents stay useful, sensitive paths stay blocked, and writes stay inside the workspace you allow. No container overhead. No workflow drama. | ⬇ 571/mo | 19d ago |
| [@the-forge-flow/ultra-compress-pi](https://www.npmjs.com/package/@the-forge-flow/ultra-compress-pi) | PI extension for token-efficient prose — level-based runtime output compression and markdown file compression | ⬇ 570/mo | 10d ago |
| [pi-sticky-usermessage](https://www.npmjs.com/package/pi-sticky-usermessage) | Sticky header showing your last user message above the editor in Pi coding agent | ⬇ 569/mo | 14d ago |
| [pi-bangla-news](https://www.npmjs.com/package/pi-bangla-news) | Pi extension for scraping latest Bangladeshi news headlines via Scrapling MCP server | ⬇ 567/mo | 22d ago |
| [pi-minimal-permission-system](https://www.npmjs.com/package/pi-minimal-permission-system) | Minimal permission enforcement extension for the Pi coding agent. | ⬇ 566/mo | 11d ago |
| [pi-mlx-models](https://www.npmjs.com/package/pi-mlx-models) | Local MLX model launcher extension for Pi | ⬇ 566/mo | 19d ago |
| [pi-models](https://www.npmjs.com/package/pi-models) | Quality-of-life Pi extension for browsing models by provider or family | ⬇ 563/mo | 3d ago |
| [pi-skills-sync](https://www.npmjs.com/package/pi-skills-sync) | Manage pi skills via GitHub Gists | ⬇ 563/mo | 18d ago |
| [pi-dj](https://www.npmjs.com/package/pi-dj) | AI music suite for pi — YouTube, global radio (30k+ stations), Suno, Lyria AI, SoundCloud/Bandcamp, mix, trim, BPM. Windows + macOS + Linux + Termux. | ⬇ 562/mo | 19d ago |
| [@howaboua/pi-explore-subagents](https://www.npmjs.com/package/@howaboua/pi-explore-subagents) | Isolated discovery-only explore subagents for Pi. | ⬇ 560/mo | 2d ago |
| [@igormaka/pi-sandbox](https://www.npmjs.com/package/@igormaka/pi-sandbox) | A proper sandbox extension for pi, using the Anthropic Sandbox Runtime | ⬇ 560/mo | 3d ago |
| [@fink-andreas/pi-linear-tools](https://www.npmjs.com/package/@fink-andreas/pi-linear-tools) | Pi extension with Linear SDK tools and configuration commands | ⬇ 559/mo | 20d ago |
| [pi-persistent-intelligence](https://www.npmjs.com/package/pi-persistent-intelligence) | Governed long-term memory, built-in session search, and Obsidian vault integration for the pi coding agent. | ⬇ 554/mo | 5d ago |
| [pi-review](https://www.npmjs.com/package/pi-review) | Review current pi work in a new branch with conversation context | ⬇ 552/mo | 4d ago |
| [@kylebrodeur/pi-model-router](https://www.npmjs.com/package/@kylebrodeur/pi-model-router) | Intelligent per-turn model router extension for the pi coding agent (Enhanced Fork) | ⬇ 550/mo | 8d ago |
| [pi-amplike](https://www.npmjs.com/package/pi-amplike) | Pi skills and extensions that provide Amp Code-like workflows (handoff, permissions, mode selector, web access). | ⬇ 550/mo | ~1mo ago |
| [@narumitw/pi-nyaa](https://www.npmjs.com/package/@narumitw/pi-nyaa) | Pi extension for querying public metadata from nyaa.si and sukebei.nyaa.si. | ⬇ 548/mo | 20d ago |
| [pi-gstack](https://www.npmjs.com/package/pi-gstack) | Pi package that adapts Garry Tan's gstack skills and workflows for Pi. | ⬇ 548/mo | ~1mo ago |
| [pi-opencode-provider](https://www.npmjs.com/package/pi-opencode-provider) | A pi provider extension that adds OpenCode Zen & OpenCode Go support. | ⬇ 548/mo | 17d ago |
| [pi-notify](https://www.npmjs.com/package/pi-notify) | Desktop notifications for Pi agent via OSC 777/99/9 and Windows toast | ⬇ 547/mo | 3mo ago |
| [@patimweb/pi-email](https://www.npmjs.com/package/@patimweb/pi-email) | IMAP/SMTP email client extension for pi coding agent. Read, search, send, move, and delete emails from your inbox. | ⬇ 544/mo | 6d ago |
| [pi-wtf](https://www.npmjs.com/package/pi-wtf) | Recover, rewind, or undo the last user prompt in pi after you realize you messed up. | ⬇ 539/mo | 18d ago |
| [@dreki-gg/pi-subagent](https://www.npmjs.com/package/@dreki-gg/pi-subagent) | Tool-first questionnaire flow for pi with shared tabbed TUI and custom rendering | ⬇ 537/mo | 12d ago |
| [pi-promptsmith](https://www.npmjs.com/package/pi-promptsmith) | Intent-aware prompt rewriter and execution-contract compiler for Pi | ⬇ 536/mo | 13d ago |
| [@carlosgtrz/pi-codex-aliases](https://www.npmjs.com/package/@carlosgtrz/pi-codex-aliases) | Pi extension that shows elapsed, previous, and longest agent run times in the footer. | ⬇ 535/mo | 15d ago |
| [@asermax/pi-cc-plugins](https://www.npmjs.com/package/@asermax/pi-cc-plugins) | Use Claude Code plugins (skills) directly in Pi | ⬇ 533/mo | yesterday |
| [@melihmucuk/pi-crew](https://www.npmjs.com/package/@melihmucuk/pi-crew) | Non-blocking subagent orchestration for pi coding agent | ⬇ 533/mo | 2d ago |
| [@zackify/pi-bg-tasks](https://www.npmjs.com/package/@zackify/pi-bg-tasks) | A pi extension that runs and manages background commands in tmux. | ⬇ 533/mo | 13d ago |
| [pi-superpowers-plus](https://www.npmjs.com/package/pi-superpowers-plus) | Superpowers workflow skills adapted for pi | ⬇ 532/mo | 3mo ago |
| [@fiale-plus/repo-arch](https://www.npmjs.com/package/@fiale-plus/repo-arch) | Project archaeology and repo memory tooling — CLI-first project-memory engine | ⬇ 531/mo | 10d ago |
| [omni-pi](https://www.npmjs.com/package/omni-pi) | Single-agent Pi package that interviews the user, documents the spec, and implements work in bounded slices. | ⬇ 526/mo | 28d ago |
| [glimpse-changes](https://www.npmjs.com/package/glimpse-changes) | A CLI tool that renders Markdown with inline diffs into a native [Glimpse](https://glimpse.app) window, using a Critique-like theme. | ⬇ 525/mo | ~1mo ago |
| [pi-codex-limit](https://www.npmjs.com/package/pi-codex-limit) | Web search (Exa + Brave) and content extraction for Pi | ⬇ 525/mo | 14d ago |
| [pi-prompt-translate](https://www.npmjs.com/package/pi-prompt-translate) | Translate user prompts to a configurable target language in the Pi coding agent | ⬇ 524/mo | 19d ago |
| [@ahkohd/pi-yagami-search](https://www.npmjs.com/package/@ahkohd/pi-yagami-search) | Pi package providing Yagami web search tools | ⬇ 523/mo | ~1mo ago |
| [pi-delete-session](https://www.npmjs.com/package/pi-delete-session) | Powerful session deletion tool for Pi. Delete multiple sessions at once, grouped by project, with safety confirmations. | ⬇ 523/mo | 21d ago |
| [@davecodes/pi-dcp](https://www.npmjs.com/package/@davecodes/pi-dcp) | Dynamic Context Pruning for Pi — port of opencode-dcp. Deduplication, error-input purge, and an LLM-callable compress tool to keep long sessions cheap. | ⬇ 518/mo | 6d ago |
| [@josephyoung/pi-exit](https://www.npmjs.com/package/@josephyoung/pi-exit) | Type 'exit' to quit or use the /exit command. | ⬇ 518/mo | 21d ago |
| [pi-model-effort-coloring](https://www.npmjs.com/package/pi-model-effort-coloring) | Pi extension that colors the current model name and thinking/effort level in the footer without changing layout. | ⬇ 518/mo | 17d ago |
| [@fgladisch/pi-bash-approval](https://www.npmjs.com/package/@fgladisch/pi-bash-approval) | Interactive allow-list guard for Pi bash tool calls | ⬇ 516/mo | 7d ago |
| [@asnd/skill-creator](https://www.npmjs.com/package/@asnd/skill-creator) | Turn any MCP server, OpenAPI spec, or GraphQL endpoint into a CLI at runtime. | ⬇ 515/mo | yesterday |
| [@nhalm/pi-specd](https://www.npmjs.com/package/@nhalm/pi-specd) | Spec-driven development workflow for pi | ⬇ 514/mo | 21d ago |
| [@pi-lab/webfetch](https://www.npmjs.com/package/@pi-lab/webfetch) | WebFetch tool extension for pi coding agent | ⬇ 514/mo | 15d ago |
| [@agentapprove/pi](https://www.npmjs.com/package/@agentapprove/pi) | Agent Approve extension for Pi - approve or deny AI agent tool calls from your iPhone and Apple Watch | ⬇ 513/mo | 3d ago |
| [pi-quick-perms](https://www.npmjs.com/package/pi-quick-perms) | Permission enforcement and quick policy commands for the Pi coding agent. | ⬇ 513/mo | 10d ago |
| [@bergetai/pi-provider](https://www.npmjs.com/package/@bergetai/pi-provider) | Run [Berget AI](https://berget.ai) models inside [Pi](https://pi.dev). | ⬇ 512/mo | 3d ago |
| [pi-prompt-shelf](https://www.npmjs.com/package/pi-prompt-shelf) | Pi extension: stash prompts into a persistent shelf with keyboard shortcuts and interactive picker | ⬇ 512/mo | 18d ago |
| [remote-pi](https://www.npmjs.com/package/remote-pi) | Mobile remote control and local agent mesh for the Pi coding agent. Pair your phone via QR over a relay, watch tool calls in real time, run multi-Pi sessions over a local Unix Domain Socket broker, an | ⬇ 512/mo | yesterday |
| [pi-show](https://www.npmjs.com/package/pi-show) | Display pi-coding-agent state: commands, skills, prompts, tools, themes, and model info | ⬇ 511/mo | 24d ago |
| [@tangle-network/tcloud-agent](https://www.npmjs.com/package/@tangle-network/tcloud-agent) | Agent run-loop primitive over the Tangle sandbox bridge — runs an AgentProfile against a brief with criterion gates, budget caps, and streaming events. Includes TangleToolProvider for Pi tool integrat | ⬇ 508/mo | ~1mo ago |
| [pi-slop-review](https://www.npmjs.com/package/pi-slop-review) | Native diff review window for AI coding agents (pi, Claude Code, Codex CLI). Opens a Monaco-powered review UI in a Glimpse window so you can leave inline / file-level / overall comments on the agent's | ⬇ 508/mo | 10d ago |
| [pi-exa-tools](https://www.npmjs.com/package/pi-exa-tools) | Adds Exa-backed web search and page fetching tools to Pi. | ⬇ 506/mo | 18d ago |
| [@eissar/pi-openrouter-session](https://www.npmjs.com/package/@eissar/pi-openrouter-session) | highly minimal extension to send pi agent session ID to OpenRouter | ⬇ 504/mo | 11d ago |
| [@aliou/pi-linkup](https://www.npmjs.com/package/@aliou/pi-linkup) | ![banner](https://assets.aliou.me/pi-extensions/banners/pi-linkup.png) | ⬇ 503/mo | 18d ago |
| [@javiayala/ai-workers](https://www.npmjs.com/package/@javiayala/ai-workers) | Portable Pi/GLM worker tools for offloading low-risk agent work from premium coding agents. | ⬇ 503/mo | 21d ago |
| [@pi-orca/tasks](https://www.npmjs.com/package/@pi-orca/tasks) | Team templates and orchestrated spinup | ⬇ 503/mo | 8d ago |
| [@cansiny0320/pi-mcp-adapter](https://www.npmjs.com/package/@cansiny0320/pi-mcp-adapter) | MCP (Model Context Protocol) adapter extension for Pi coding agent | ⬇ 502/mo | 14d ago |
| [@pavlokrykh/strip-search](https://www.npmjs.com/package/@pavlokrykh/strip-search) | A pi extension for compact DuckDuckGo search results. | ⬇ 501/mo | 5d ago |
| [pi-codesight](https://www.npmjs.com/package/pi-codesight) | CodeSight repository-context tools for Pi. | ⬇ 501/mo | 15d ago |
| [pi-searxng](https://www.npmjs.com/package/pi-searxng) | SearXNG web search extension for Pi with automatic GitHub repo cloning | ⬇ 498/mo | 3mo ago |
| [@ineersa/my-pi-scheduler](https://www.npmjs.com/package/@ineersa/my-pi-scheduler) | Scheduler extension for pi: recurring checks, one-time reminders, and the LLM-callable schedule_prompt tool. | ⬇ 497/mo | 2d ago |
| [pi-manage-dirs](https://www.npmjs.com/package/pi-manage-dirs) | Add external directories to Pi's workspace context with interactive path autocompletion, AGENTS.md loading, and skill registration | ⬇ 497/mo | 24d ago |
| [vite-plugin-agent-presence](https://www.npmjs.com/package/vite-plugin-agent-presence) | Vite dev overlay for Pi agent presence | ⬇ 495/mo | 7d ago |
| [@feniix/pi-conductor](https://www.npmjs.com/package/@feniix/pi-conductor) | Code Reasoning tools for pi and MCP — reflective sequential thinking with branching and revision support | ⬇ 493/mo | 2d ago |
| [pi-byterover](https://www.npmjs.com/package/pi-byterover) | Pi ByteRover extension | ⬇ 493/mo | 5d ago |
| [@cad0p/pi-napkin](https://www.npmjs.com/package/@cad0p/pi-napkin) | 📜 Napkin integration for pi — vault context, knowledge tools, and automatic distillation with git-worktree concurrency safety | ⬇ 492/mo | today |
| [pi-maven](https://www.npmjs.com/package/pi-maven) | Maven extension for pi — structured test execution, project info, and version lookup | ⬇ 488/mo | 2d ago |
| [pi-cocoindex](https://www.npmjs.com/package/pi-cocoindex) | Pi extension that exposes CocoIndex Code as a simple semantic search tool. | ⬇ 486/mo | 29d ago |
| [pi-openrouter-session](https://www.npmjs.com/package/pi-openrouter-session) | OpenRouter session tracking for pi - adds session_id to API requests for OpenRouter console visibility | ⬇ 483/mo | 19d ago |
| [desktop-notify-kitty](https://www.npmjs.com/package/desktop-notify-kitty) | Pi extension that sends desktop notifications via kitten notify (kitty) or notify-send when a kitty terminal session needs attention. | ⬇ 481/mo | 26d ago |
| [@gtheys/pi-per-commit-spend](https://www.npmjs.com/package/@gtheys/pi-per-commit-spend) | Pi extension that tracks AI spend per git commit across sessions | ⬇ 480/mo | 7d ago |
| [pi-frontend-create](https://www.npmjs.com/package/pi-frontend-create) | A Pi skill that creates distinctive, production-grade frontend interfaces that avoid common AI design patterns. Generates authentic, contextually-aware designs with real craft. | ⬇ 479/mo | 10d ago |
| [pi-unified-exec](https://www.npmjs.com/package/pi-unified-exec) | Codex-style unified_exec for pi: long-lived shell sessions the LLM polls and drives with write_stdin (Ctrl-C, arrow keys, PTY, REPLs, ssh, dev servers). Full output logged to disk. | ⬇ 479/mo | 29d ago |
| [@zhangweiii/skills](https://www.npmjs.com/package/@zhangweiii/skills) | Personal agent skills collection for pi, Claude Code, Codex, Cursor, etc. | ⬇ 478/mo | 24d ago |
| [@aliou/pi-toolchain](https://www.npmjs.com/package/@aliou/pi-toolchain) | ![banner](https://assets.aliou.me/pi-extensions/banners/pi-toolchain.png) | ⬇ 476/mo | 18d ago |
| [@ineersa/my-pi-extensions](https://www.npmjs.com/package/@ineersa/my-pi-extensions) | Personal extension bundle for pi-coding-agent | ⬇ 476/mo | 2d ago |
| [pi-hash-anchored-edit](https://www.npmjs.com/package/pi-hash-anchored-edit) | Hash-anchored read/edit replacement tools for Pi coding agent. | ⬇ 476/mo | 18d ago |
| [@aexol/pi-wizard](https://www.npmjs.com/package/@aexol/pi-wizard) | Independent Pi package that exposes backend-backed Wizard tools and prompt context. | ⬇ 474/mo | 4d ago |
| [@entelligentsia/pi-claude-compat](https://www.npmjs.com/package/@entelligentsia/pi-claude-compat) | Claude CLI compatibility layer for pi — loads .claude/commands and .claude/skills as native pi resources | ⬇ 474/mo | 8d ago |
| [@jwayong/pi-azure-devops](https://www.npmjs.com/package/@jwayong/pi-azure-devops) | Azure DevOps integration for Pi coding agent — work items, pipelines, repos, test plans, and more | ⬇ 474/mo | 10d ago |
| [@matheusbbarni/pi-goal-extension](https://www.npmjs.com/package/@matheusbbarni/pi-goal-extension) | Interactive Codex /goal sessions for Pi with persistent start/resume/status commands. | ⬇ 473/mo | 13d ago |
| [pi-model-provider-native-prompting](https://www.npmjs.com/package/pi-model-provider-native-prompting) | Provider-informed, harness-neutral native prompting guidance for Pi Coding Agent. | ⬇ 472/mo | 22d ago |
| [@thurstonsand/pi-powerline-footer](https://www.npmjs.com/package/@thurstonsand/pi-powerline-footer) | Powerline-style status bar extension for pi coding agent | ⬇ 470/mo | 12d ago |
| [pi-favorites-commands](https://www.npmjs.com/package/pi-favorites-commands) | Star and reorder your favorite slash commands in pi. Favorites appear at the top of the / autocomplete dropdown with a ★ glyph, in the order you choose. | ⬇ 468/mo | 11d ago |
| [pi-go-bars](https://www.npmjs.com/package/pi-go-bars) | Opencode Go plan usage bars for pi — rolling, weekly, and monthly windows in the footer | ⬇ 467/mo | 17d ago |
| [@dangayle/applepi](https://www.npmjs.com/package/@dangayle/applepi) | On-device Apple Intelligence as a Pi tool and model provider | ⬇ 464/mo | 7d ago |
| [@0xkobold/pi-kobold](https://www.npmjs.com/package/@0xkobold/pi-kobold) | Meta-extension for 0xKobold that bundles pi-orchestration, pi-gateway, pi-ollama, pi-learn, pi-persona, and development tools | ⬇ 459/mo | ~1mo ago |
| [@asermax/pi-save](https://www.npmjs.com/package/@asermax/pi-save) | Stash and restore your Pi prompt via alt+s | ⬇ 459/mo | 15d ago |
| [@narumitw/pi-statusline](https://www.npmjs.com/package/@narumitw/pi-statusline) | Pi extension that syncs Pi configuration through Cloudflare R2 or S3-compatible storage. | ⬇ 458/mo | yesterday |
| [@m4riok/pi-ide-bridge](https://www.npmjs.com/package/@m4riok/pi-ide-bridge) | Pi extension for VS Code diff approval workflows and editor context bridging. | ⬇ 457/mo | 6d ago |
| [@0xkobold/pi-gateway](https://www.npmjs.com/package/@0xkobold/pi-gateway) | Hermes-style messaging gateway for pi - multi-platform agent with sessions, security, and background tasks | ⬇ 456/mo | ~1mo ago |
| [pi-provider-cc-sdk](https://www.npmjs.com/package/pi-provider-cc-sdk) | Use your Claude subscription with pi using their official Claude Code SDK. | ⬇ 456/mo | 12d ago |
| [pi-secret-guard](https://www.npmjs.com/package/pi-secret-guard) | A pi extension that guards against committing secrets, API keys, and credentials to git repositories using hybrid regex + LLM review. | ⬇ 456/mo | ~1mo ago |
| [pi-sessions](https://www.npmjs.com/package/pi-sessions) | Pi session search, ask, handoff, auto-titling, and indexing tools | ⬇ 456/mo | 16d ago |
| [@braintrust/pi-extension](https://www.npmjs.com/package/@braintrust/pi-extension) | Braintrust extension for pi. Includes automatic tracing for pi sessions, turns, LLM calls, and tool executions to Braintrust. | ⬇ 455/mo | 17d ago |
| [@m4riok/pi-openai-tweaks](https://www.npmjs.com/package/@m4riok/pi-openai-tweaks) | Pi extension for Codex usage visibility and fast-mode control | ⬇ 454/mo | 9d ago |
| [pi-tuturu](https://www.npmjs.com/package/pi-tuturu) | Completion sound notifications for pi with selectable sound and volume. | ⬇ 452/mo | 28d ago |
| [pi-hosts](https://www.npmjs.com/package/pi-hosts) | Run commands on remote hosts from Pi. | ⬇ 451/mo | 27d ago |
| [pi-system-prompt](https://www.npmjs.com/package/pi-system-prompt) | Display the full pi coding agent system prompt with injected tools, guidelines, context files, and skills in a scrollable overlay | ⬇ 451/mo | 21d ago |
| [pi-moonshot](https://www.npmjs.com/package/pi-moonshot) | Pi extension adding Moonshot AI provider with Kimi K2.6, K2.5 and other models | ⬇ 449/mo | 18d ago |
| [pi-neuralwatt](https://www.npmjs.com/package/pi-neuralwatt) | Neuralwatt provider for pi — auto-discovers models, energy usage tracking, and account quota in your status bar | ⬇ 448/mo | 26d ago |
| [@sttronn/pi-sheets](https://www.npmjs.com/package/@sttronn/pi-sheets) | Spreadsheet-editing skill for agentic coding hosts (Claude Code, Codex, Pi). openpyxl + formualizer + a unified CLI; works as a portable skill bundle or as a pi extension. | ⬇ 447/mo | 11d ago |
| [sift-web-tools](https://www.npmjs.com/package/sift-web-tools) | Pi agent web search, fetch, and save tools powered by the local sift CLI. | ⬇ 447/mo | 19d ago |
| [@cltec/pi-ollama-web-search](https://www.npmjs.com/package/@cltec/pi-ollama-web-search) | A local-first, context-safe pi extension package for Ollama web search and fetch. | ⬇ 445/mo | 13d ago |
| [pi-remote-control](https://www.npmjs.com/package/pi-remote-control) | Authenticated remote control for Pi sessions. | ⬇ 445/mo | 8d ago |
| [pi-memd](https://www.npmjs.com/package/pi-memd) | Project-level session memory for the pi coding agent — a single MEMD.md file per project | ⬇ 440/mo | yesterday |
| [@rwese/pi-question](https://www.npmjs.com/package/@rwese/pi-question) | Unified question tool for pi coding agent - single or multi-question interactions with optional notes and custom input support | ⬇ 439/mo | 28d ago |
| [@tianzong48/pi-doctor-extension](https://www.npmjs.com/package/@tianzong48/pi-doctor-extension) | Pi diagnostics extension package, starting with startup timing probes. | ⬇ 439/mo | 18d ago |
| [@venthezone/picord](https://www.npmjs.com/package/@venthezone/picord) | Discord integration extension for pi that maps project channels to workspaces and threads to native pi sessions. | ⬇ 439/mo | ~1mo ago |
| [@badliveware/pi-compaction-continue](https://www.npmjs.com/package/@badliveware/pi-compaction-continue) | Expose Pi model listings and selection guidance as an agent tool. | ⬇ 437/mo | 9d ago |
| [pi-account-switcher](https://www.npmjs.com/package/pi-account-switcher) | Pi extension for quickly switching between multiple accounts/API keys per provider. | ⬇ 436/mo | 15d ago |
| [pi-goal-x](https://www.npmjs.com/package/pi-goal-x) | Goal mode extension for pi: persistent long-running objectives, /goal-set drafting, Sisyphus prompt style, autoContinue, and an above-editor status overlay. Fork of @capyup/pi-goal. | ⬇ 436/mo | 7d ago |
| [pi-openai-codex-fast](https://www.npmjs.com/package/pi-openai-codex-fast) | Pi package that adds an openai-codex-fast provider backed by openai-codex with priority service tier | ⬇ 436/mo | 9d ago |
| [pi-crawl4ai](https://www.npmjs.com/package/pi-crawl4ai) | Crawl4AI extension for pi — web crawling and structured extraction | ⬇ 435/mo | ~1mo ago |
| [pi-stop](https://www.npmjs.com/package/pi-stop) | Adds /stop command to pi: aborts the current agent and reloads your last message for resending | ⬇ 433/mo | yesterday |
| [pi-git-commands](https://www.npmjs.com/package/pi-git-commands) | Pi agent extension: /git-commit, /git-push, and /git-tag for commits, pushes, and tag management | ⬇ 432/mo | 9d ago |
| [pi-model-suitable-tools](https://www.npmjs.com/package/pi-model-suitable-tools) | Pi extension package that adapts tool names to the active model family. | ⬇ 431/mo | 19d ago |
| [pi-prompt-reviewer](https://www.npmjs.com/package/pi-prompt-reviewer) | Review prompts before sending them to the main pi session. | ⬇ 431/mo | 15d ago |
| [pi-telegram-tool-status](https://www.npmjs.com/package/pi-telegram-tool-status) | Companion extension for pi-telegram (by llblab) — posts a compact live-updating service message listing tools used by the agent during Telegram-originated turns only. | ⬇ 427/mo | 12d ago |
| [@aliou/pi-ts-aperture](https://www.npmjs.com/package/@aliou/pi-ts-aperture) | Route Pi LLM providers through Tailscale Aperture | ⬇ 426/mo | 28d ago |
| [pi-proxy-models](https://www.npmjs.com/package/pi-proxy-models) | Pi coding-agent extension that exposes CLIProxyAPIPlus models (Claude, Gemini, OpenAI/Codex, Copilot, Kiro, GLM, Qwen, ...) to pi's model picker, routing each family through its native streaming API ( | ⬇ 426/mo | 29d ago |
| [@lesetong/pi-mimo](https://www.npmjs.com/package/@lesetong/pi-mimo) | Pi extension for Xiaomi MiMo AI models with multi-region & auth.json support | ⬇ 425/mo | 25d ago |
| [@unfixed3854/pi-usage](https://www.npmjs.com/package/@unfixed3854/pi-usage) | A pi extension that displays active model provider subscription quota usage in the status bar. Supports z.ai (GLM) and OpenAI Codex with provider-specific quota percentages, plan levels, and reset tim | ⬇ 423/mo | yesterday |
| [pi-fxxk](https://www.npmjs.com/package/pi-fxxk) | Pi extension that turns /fxxk into a two-stage handoff command. | ⬇ 422/mo | ~1mo ago |
| [pi-generate-commit-message](https://www.npmjs.com/package/pi-generate-commit-message) | Pi extension for generating commit messages from staged diffs | ⬇ 422/mo | 28d ago |
| [platypus-pi](https://www.npmjs.com/package/platypus-pi) | Pi package for first-class Platypus MCP project-management integration | ⬇ 422/mo | 2d ago |
| [browse97](https://www.npmjs.com/package/browse97) | Chrome browser automation for pi coding agent via CDP. Open tabs, snapshot, click, fill forms, upload files, evaluate JS. | ⬇ 421/mo | 5d ago |
| [pi-flow-skills](https://www.npmjs.com/package/pi-flow-skills) | BMAD-inspired sprint workflow for Pi with parent + parallel sub-agent orchestration and long-term memory. Story/dev/review phases fan out ephemeral Pi sub-agents (research, prior-art, coupling, tests, | ⬇ 421/mo | 9d ago |
| [pi-tscg](https://www.npmjs.com/package/pi-tscg) | Drop-in tool-schema and tool-result compression for the Pi coding-agent. Built on TSCG by Furkan Sakizli (SKZL-AI) — wraps @tscg/core and adds tool-result compression plus provider-aware prompt-cache  | ⬇ 421/mo | 26d ago |
| [@remnic/plugin-pi](https://www.npmjs.com/package/@remnic/plugin-pi) | Remnic memory extension for Pi Coding Agent | ⬇ 420/mo | 2d ago |
| [@narumitw/pi-web-search](https://www.npmjs.com/package/@narumitw/pi-web-search) | Pi package that adds a web_search tool backed by Brave Search or DuckDuckGo HTML. | ⬇ 417/mo | 21d ago |
| [pi-elevenlabs-tts](https://www.npmjs.com/package/pi-elevenlabs-tts) | Pi extension that reads assistant text responses aloud with ElevenLabs text-to-speech. | ⬇ 417/mo | 27d ago |
| [pi-theme-switcher](https://www.npmjs.com/package/pi-theme-switcher) | Pi extension that automatically sets the theme to dark or light based on env vars, THEME_MODE, or time of day. | ⬇ 416/mo | 11d ago |
| [@paulmupeters/pi-brainstorm](https://www.npmjs.com/package/@paulmupeters/pi-brainstorm) | A conversation-only brainstorm mode extension for pi | ⬇ 414/mo | 20d ago |
| [pi-thinking-level](https://www.npmjs.com/package/pi-thinking-level) | A tiny pi package that adds a /thinking command to set and persist pi's default thinking level. | ⬇ 414/mo | 17d ago |
| [@aotarola/pi-exit](https://www.npmjs.com/package/@aotarola/pi-exit) | pi package that adds /exit as an alias for /quit | ⬇ 411/mo | ~1mo ago |
| [@nqbao/pi-sandbox](https://www.npmjs.com/package/@nqbao/pi-sandbox) | OS-level sandbox for pi coding agent — macOS sandbox-exec / Linux bubblewrap kernel-enforced isolation | ⬇ 411/mo | 10d ago |
| [pi-langfuse](https://www.npmjs.com/package/pi-langfuse) | Langfuse extension for Pi coding agent | ⬇ 411/mo | 5d ago |
| [pi-workbench](https://www.npmjs.com/package/pi-workbench) | Terminal workbench for switching between live Pi sessions using tmux. | ⬇ 411/mo | 19d ago |
| [@adamjen/pi-compact-fast](https://www.npmjs.com/package/@adamjen/pi-compact-fast) | /compact-fast command for Pi — compacts sessions with a fast local model instead of your main conversation model. | ⬇ 410/mo | 18d ago |
| [@dmallory42/pi-read-url](https://www.npmjs.com/package/@dmallory42/pi-read-url) | Pi extension for extracting public HTML page URLs into clean markdown via system curl. | ⬇ 410/mo | ~1mo ago |
| [better-custom](https://www.npmjs.com/package/better-custom) | Pi extension package for adding and deleting custom providers through an interactive wizard. | ⬇ 410/mo | 24d ago |
| [pi-fizzy](https://www.npmjs.com/package/pi-fizzy) | Pi extension for fetching Fizzy.do cards and turning them into build or plan prompts. | ⬇ 410/mo | 7d ago |
| [pi-pubmed](https://www.npmjs.com/package/pi-pubmed) | Search PubMed and fetch article abstracts directly from Pi using NCBI E-utilities | ⬇ 409/mo | 24d ago |
| [pi-cymbal](https://www.npmjs.com/package/pi-cymbal) | Pi extension exposing Cymbal as an agent-native code navigation layer. | ⬇ 408/mo | today |
| [pi-omlx-picker](https://www.npmjs.com/package/pi-omlx-picker) | Pi extension that discovers models from a local OMLX server and registers them as a native Pi provider. | ⬇ 407/mo | today |
| [pi-session-merge](https://www.npmjs.com/package/pi-session-merge) | Pi Coding Agent Extension to import summarized context from another session. | ⬇ 407/mo | 18d ago |
| [pi-youtube-transcript](https://www.npmjs.com/package/pi-youtube-transcript) | Pi extension to fetch YouTube video transcripts | ⬇ 407/mo | 12d ago |
| [@pi-lab/websearch](https://www.npmjs.com/package/@pi-lab/websearch) | Exa-powered web search tool extension for pi coding agent | ⬇ 406/mo | 15d ago |
| [pi-collapse-tools](https://www.npmjs.com/package/pi-collapse-tools) | Pi extension that hides tool output by default (expand with Cmd+O / Ctrl+O). | ⬇ 405/mo | 15d ago |
| [pi-ask-mode](https://www.npmjs.com/package/pi-ask-mode) | Read-only mode for safe code analysis in pi | ⬇ 404/mo | 7d ago |
| [pi-inspect](https://www.npmjs.com/package/pi-inspect) | Introspection dashboard for the pi coding agent — tools, slash commands, skills, and the system prompt injected on init. | ⬇ 404/mo | 5d ago |
| [@kky42/pi-sandbox](https://www.npmjs.com/package/@kky42/pi-sandbox) | Pi-compatible sandbox extension for filesystem-aware bash and tool enforcement | ⬇ 402/mo | 12d ago |
| [@akepka/pi-cursor-cli-provider](https://www.npmjs.com/package/@akepka/pi-cursor-cli-provider) | Cursor CLI provider extension for Pi | ⬇ 401/mo | 4d ago |
| [rad-pi](https://www.npmjs.com/package/rad-pi) | Default Radicle package for pi: core deterministic tooling | ⬇ 401/mo | 26d ago |
| [minghinmatthewlam-pi-gui](https://github.com/minghinmatthewlam/pi-gui) | Electron GUI app for the pi coding agent runtime | ⭐400 | 18d ago |
| [pi-skill-test-subagent](https://www.npmjs.com/package/pi-skill-test-subagent) | Pi extension for isolated skill pressure testing with baseline and skill-present subagents. | ⬇ 400/mo | 14d ago |
| [@jackice/pi-annotate](https://www.npmjs.com/package/@jackice/pi-annotate) | Visual annotation extension for pi coding agent - annotate context messages and markdown documents | ⬇ 399/mo | 8d ago |
| [pi-effort](https://www.npmjs.com/package/pi-effort) | Pi extension for controlling thinking effort with model-adaptive min/max aliases | ⬇ 399/mo | 21d ago |
| [pi-package-template](https://www.npmjs.com/package/pi-package-template) | A minimal starter template for building pi packages | ⬇ 399/mo | 21d ago |
| [@boti-ormandi/pi-web](https://www.npmjs.com/package/@boti-ormandi/pi-web) | web_search and web_fetch tools for the pi coding agent. Runs on your Anthropic Claude subscription, the way Claude Code does, with more freedom. | ⬇ 396/mo | 8d ago |
| [pi-headless-subagent](https://www.npmjs.com/package/pi-headless-subagent) | Pi extension for spawning isolated subagents in separate pi --mode rpc subprocesses | ⬇ 396/mo | 12d ago |
| [pi-safety-modes](https://www.npmjs.com/package/pi-safety-modes) | Pi package providing safety modes for tool-call guardrails | ⬇ 396/mo | 14d ago |
| [@burneikis/pi-fzfp](https://www.npmjs.com/package/@burneikis/pi-fzfp) | Fuzzy file picker for pi – fzf-powered @file autocomplete | ⬇ 395/mo | 25d ago |
| [@gotgenes/pi-permission-system](https://www.npmjs.com/package/@gotgenes/pi-permission-system) | Pi extension providing session metadata tools (naming, context) for multi-session workflows | ⬇ 394/mo | today |
| [pi-monofold](https://www.npmjs.com/package/pi-monofold) | Pi extension that folds multiple repositories and folders into a guarded virtual monorepo for AI agents. | ⬇ 394/mo | today |
| [@pi-lab/xsearch](https://www.npmjs.com/package/@pi-lab/xsearch) | xAI-powered X search tool extension for pi coding agent | ⬇ 392/mo | 15d ago |
| [pi-caffeinated](https://www.npmjs.com/package/pi-caffeinated) | Pi extension that toggles a cross-platform keep-awake process with a centered coffee break modal. | ⬇ 392/mo | 18d ago |
| [@0xkobold/pi-learn](https://www.npmjs.com/package/@0xkobold/pi-learn) | Open-source memory infrastructure for pi agents - inspired by Honcho. Provides peer representations, reasoning, and context assembly for stateful AI agents. | ⬇ 391/mo | ~1mo ago |
| [@mystilleef/pi-subagent](https://www.npmjs.com/package/@mystilleef/pi-subagent) | Pi subagent for the SPAE Framework | ⬇ 391/mo | 4d ago |
| [@ryan_nookpi/pi-extension-memory-layer](https://www.npmjs.com/package/@ryan_nookpi/pi-extension-memory-layer) | Clipboard copy and paste tools for pi (OSC52 copy + pbpaste/xclip/wl-paste/Get-Clipboard paste). | ⬇ 391/mo | 3d ago |
| [pi-catppuccin-footer](https://www.npmjs.com/package/pi-catppuccin-footer) | A Catppuccin/tmux-style configurable footer extension for Pi. | ⬇ 391/mo | 14d ago |
| [pi-edit-last-message](https://www.npmjs.com/package/pi-edit-last-message) | Pi extension that adds /last to restore the most recent user message into the editor | ⬇ 391/mo | 26d ago |
| [@zackify/pi-port-forward](https://www.npmjs.com/package/@zackify/pi-port-forward) | A pi extension that adds an interactive SSH local port forwarding command. | ⬇ 390/mo | 26d ago |
| [pi-discord-activity](https://www.npmjs.com/package/pi-discord-activity) | Discord activity extension and helper for the Pi coding agent. | ⬇ 390/mo | 15d ago |
| [@jrryfn/pi-retune](https://www.npmjs.com/package/@jrryfn/pi-retune) | One-command session renamer toggle for pi (retune/restore). | ⬇ 389/mo | ~1mo ago |
| [@firstpick/pi-skill-tauri-django-react](https://www.npmjs.com/package/@firstpick/pi-skill-tauri-django-react) | Agents should invoke this skill for Tauri + Django + React desktop apps, especially backend lifecycle, CORS/auth, frontend integration, build packaging, dual desktop/web deployment, Rust commands, and | ⬇ 388/mo | 7d ago |
| [pi-multi-pass](https://www.npmjs.com/package/pi-multi-pass) | Multi-subscription extension for pi -- use multiple OAuth accounts per provider (Anthropic, Codex, Copilot, Gemini, Antigravity) | ⬇ 388/mo | ~1mo ago |
| [pi-obsidian](https://www.npmjs.com/package/pi-obsidian) | Pi package for Obsidian vaults — read, write, search, visualize (Mermaid, Canvas), and plan projects (Kanban, dashboards, daily notes). 13 tools. | ⬇ 388/mo | 12d ago |
| [pi-shipit](https://www.npmjs.com/package/pi-shipit) | Quality gates for shipping code with the Pi coding agent. Iterative review loops and fork-to-upstream PR workflows with AI review + CI gating. | ⬇ 388/mo | 26d ago |
| [@codingcoffee/pi-websearch-crawl4ai](https://www.npmjs.com/package/@codingcoffee/pi-websearch-crawl4ai) | a pi extension to let your LLM crawl & see the web | ⬇ 387/mo | 29d ago |
| [@felipefontoura/pi-sdd-kit](https://www.npmjs.com/package/@felipefontoura/pi-sdd-kit) | Pi skill pack for practical Specification-Driven Development workflows | ⬇ 386/mo | 10d ago |
| [@m64/nats-pi-channel](https://www.npmjs.com/package/@m64/nats-pi-channel) | NATS Agent Protocol channel for PI Agent. Makes every PI session a discoverable, spec-compliant agent on NATS. | ⬇ 386/mo | ~1mo ago |
| [@pi-lab/env](https://www.npmjs.com/package/@pi-lab/env) | Global environment loader extension for pi coding agent | ⬇ 386/mo | 18d ago |
| [pi-skillrefs](https://www.npmjs.com/package/pi-skillrefs) | Pi extension package that autocompletes $skill refs and injects referenced skill bodies as visible environment context. | ⬇ 384/mo | 9d ago |
| [pi-adaptive-finder](https://www.npmjs.com/package/pi-adaptive-finder) | Fast local workspace Finder for Pi using rg retrieval plus configurable OpenAI-compatible rerankers | ⬇ 383/mo | 13d ago |
| [pi-git-context](https://www.npmjs.com/package/pi-git-context) | Opinionated git state context injection for pi | ⬇ 383/mo | ~1mo ago |
| [pi-ralph-loop](https://www.npmjs.com/package/pi-ralph-loop) | Pi extension that reruns a prompt from a clean session checkpoint for bounded Ralph loops. | ⬇ 383/mo | 6d ago |
| [pi-stock-ticker](https://www.npmjs.com/package/pi-stock-ticker) | Real-time stock watchlist & scrolling ticker for pi coding agent. Supports US stocks and A-shares. | ⬇ 383/mo | 3mo ago |
| [pi-agent-memory](https://www.npmjs.com/package/pi-agent-memory) | Persistent memory for pi-agents, powered by claude-mem (55k+ stars). Cross-session, cross-engine memory with hybrid search. | ⬇ 382/mo | ~1mo ago |
| [pi-starship](https://www.npmjs.com/package/pi-starship) | Starship-powered footer for pi — with PR number, model info, token counts, and thinking level | ⬇ 382/mo | 19d ago |
| [@artale/pi-hatch](https://www.npmjs.com/package/@artale/pi-hatch) | Digital pet companion for Pi. Hatch, feed, play with your pixel pet! | ⬇ 379/mo | 23d ago |
| [@devilnside/pi-auto-improve](https://www.npmjs.com/package/@devilnside/pi-auto-improve) | Auto-improvement skill for Pi Coding Agent — feedback analysis, lesson generation and consolidation | ⬇ 379/mo | 13d ago |
| [@catdaemon/pi-cmux](https://www.npmjs.com/package/@catdaemon/pi-cmux) | Shared status-card sidebar helpers for Pi extensions. | ⬇ 377/mo | 15d ago |
| [@firstpick/pi-skill-repo-explorer](https://www.npmjs.com/package/@firstpick/pi-skill-repo-explorer) | Agents should invoke this skill before modifying unfamiliar codebases, answering where/how something is implemented, tracing dependencies, mapping repo structure, or planning changes. Explores a repos | ⬇ 377/mo | 7d ago |
| [@j6e/pi-md-web-surfer](https://www.npmjs.com/package/@j6e/pi-md-web-surfer) | Pi extension: fetch web pages as markdown and search the web, powered by Jina AI | ⬇ 377/mo | 9d ago |
| [pi-openrouter-fallback](https://www.npmjs.com/package/pi-openrouter-fallback) | Pi extension for OpenRouter model scoping and automatic switch to openrouter/free on HTTP 403 with auto-resubmit | ⬇ 377/mo | 25d ago |
| [pi-setup-custom-providers](https://www.npmjs.com/package/pi-setup-custom-providers) | Interactive wizard to manage custom LLM providers and models for pi coding agent | ⬇ 377/mo | 22d ago |
| [pi-cost](https://www.npmjs.com/package/pi-cost) | Cost dashboard for the pi coding agent | ⬇ 376/mo | 8d ago |
| [@firstpick/pi-skill-research-orchestration](https://www.npmjs.com/package/@firstpick/pi-skill-research-orchestration) | Agents should invoke this skill for broad multi-claim research projects needing planning, parallel investigation, source merging, gap closure, citation audit, and final synthesis when narrower researc | ⬇ 375/mo | 7d ago |
| [pi-mom](https://www.npmjs.com/package/pi-mom) | MOM native Pi extension — registers MOM tools directly in the Pi coding agent | ⬇ 374/mo | 6d ago |
| [@sinamtz/pi-mempalace](https://www.npmjs.com/package/@sinamtz/pi-mempalace) | hasslefree and self-contained mempalace port for pi-coding-agent with SurrealDB-backed vector search, layered retrieval, and multi-process auto-server runtime | ⬇ 373/mo | ~1mo ago |
| [pi-poster](https://www.npmjs.com/package/pi-poster) | 🎨 Poster integration for pi — render React posters to PNG/SVG/PDF/JPG/WebP from an agent session. | ⬇ 373/mo | ~1mo ago |
| [pi-mimo-provider](https://www.npmjs.com/package/pi-mimo-provider) | Xiaomi MiMo LLM provider extension for pi coding agent | ⬇ 371/mo | 25d ago |
| [@s1dashu/pi-feishu](https://www.npmjs.com/package/@s1dashu/pi-feishu) | Pi Coding Agent channel for Feishu (Lark): WebSocket bot and IM sessions. | ⬇ 369/mo | 28d ago |
| [pi-skill-model-effort](https://www.npmjs.com/package/pi-skill-model-effort) | Pi extension that honors model, effort, and thinking frontmatter on skills. | ⬇ 368/mo | 18d ago |
| [@tifan/pi-copy-all](https://www.npmjs.com/package/@tifan/pi-copy-all) | Inline $skill autocomplete in the pi editor. | ⬇ 367/mo | 9d ago |
| [pi-goal-driven](https://www.npmjs.com/package/pi-goal-driven) | Goal-Driven template workflow for pi | ⬇ 367/mo | ~1mo ago |
| [@rpollard00/pi-materia](https://www.npmjs.com/package/@rpollard00/pi-materia) | A Pi extension for configurable, materia-themed agent pipelines. | ⬇ 366/mo | 27d ago |
| [@victor-software-house/pi-multicodex](https://www.npmjs.com/package/@victor-software-house/pi-multicodex) | Codex account rotation extension for pi | ⬇ 366/mo | ~1mo ago |
| [@rejot-dev/pi-openai-search](https://www.npmjs.com/package/@rejot-dev/pi-openai-search) | A pi package that injects OpenAI's native web_search tool into the provider request payload. | ⬇ 364/mo | 21d ago |
| [pi-shield](https://www.npmjs.com/package/pi-shield) | Pi extension that shields your files and system from accidental destructive operations | ⬇ 364/mo | 11d ago |
| [@kata-sh/pi-symphony-extension](https://www.npmjs.com/package/@kata-sh/pi-symphony-extension) | Pi extension for launching, attaching to, and monitoring Kata Symphony | ⬇ 363/mo | 7d ago |
| [pi-extension-installer](https://www.npmjs.com/package/pi-extension-installer) | Browse and install Pi community packages — interactive TUI browser with arrow-key navigation, search, previews, install, and uninstall support. | ⬇ 363/mo | 29d ago |
| [@0xkobold/pi-web](https://www.npmjs.com/package/@0xkobold/pi-web) | Web search and content extraction for pi agents — DuckDuckGo/SearX search, cascade fetching (fast → readability → Playwright), deep research | ⬇ 359/mo | ~1mo ago |
| [@the-forge-flow/pi-rules](https://www.npmjs.com/package/@the-forge-flow/pi-rules) | PI extension that auto-loads path-scoped rule files from .pi/rules and .claude/rules | ⬇ 359/mo | 13d ago |
| [@artale/pi-procs](https://www.npmjs.com/package/@artale/pi-procs) | Background process manager for Pi. Start dev servers, watch builds, tail logs — without blocking the agent. | ⬇ 358/mo | ~1mo ago |
| [@ineersa/my-pi-jetbrains-index](https://www.npmjs.com/package/@ineersa/my-pi-jetbrains-index) | MCP (Model Context Protocol) adapter extension for Pi coding agent — bridges any MCP server into Pi as first-class tools | ⬇ 358/mo | 2d ago |
| [pi-peek](https://www.npmjs.com/package/pi-peek) | A pi extension for browsing current session scrollback in an overlay. | ⬇ 358/mo | 20d ago |
| [@firstpick/pi-skill-deep-research](https://www.npmjs.com/package/@firstpick/pi-skill-deep-research) | Agents should invoke this skill for high-stakes or complex research needing multi-source evidence, scientific/technical fact-checking, decision traces, or rigorous verification. Runs deterministic two | ⬇ 356/mo | 7d ago |
| [@gaodes/pi-test-harness](https://www.npmjs.com/package/@gaodes/pi-test-harness) | Test harness for pi extensions — in-process session testing, package install verification, and subprocess mocking | ⬇ 356/mo | 3d ago |
| [pi-acm](https://www.npmjs.com/package/pi-acm) | Active Context Management for pi — sliding window context management as a distributable pi extension | ⬇ 356/mo | 7d ago |
| [@bumpyclock/pi-statusbar](https://www.npmjs.com/package/@bumpyclock/pi-statusbar) | Status bar extension for pi coding agent | ⬇ 355/mo | 7d ago |
| [pi-codex-web-search](https://www.npmjs.com/package/pi-codex-web-search) | Pi extension that exposes web search through the local Codex CLI | ⬇ 355/mo | 14d ago |
| [pi-model-staging](https://www.npmjs.com/package/pi-model-staging) | A pi extension that adds plan-then-implement mode with a single model ladder. Steps the model and thinking level down as the LLM grinds autonomously, snaps back to the snappy tier when control returns | ⬇ 355/mo | 12d ago |
| [pi-modes](https://www.npmjs.com/package/pi-modes) | Switchable agent modes for pi-coding-agent (ask, edit, plan, reviewer) | ⬇ 354/mo | 29d ago |
| [pi-model-switch](https://www.npmjs.com/package/pi-model-switch) | Model switching extension for pi coding agent | ⬇ 352/mo | ~1mo ago |
| [@nonplanarslicer/pi-save-output](https://www.npmjs.com/package/@nonplanarslicer/pi-save-output) | Save the last assistant message to a markdown file via /save-output | ⬇ 351/mo | 26d ago |
| [larsderidder-context-lens](https://github.com/larsderidder/context-lens) | See what your AI sees. Framework-agnostic LLM context window visualizer. | ⭐351 | 6d ago |
| [pi-piqo](https://www.npmjs.com/package/pi-piqo) | Piqo - a pi extension which allows user to interact with llm agents directly from files, without the need to use any chat UI. | ⬇ 349/mo | 2d ago |
| [@usememra/pi-extension](https://www.npmjs.com/package/@usememra/pi-extension) | Persistent memory for pi coding agent. Hybrid cloud + local backend (Memra). | ⬇ 345/mo | ~1mo ago |
| [pi-meridian-extension](https://www.npmjs.com/package/pi-meridian-extension) | Meridian proxy provider for pi — use your Claude Max subscription through the Meridian local proxy | ⬇ 345/mo | 23d ago |
| [pi-opencode-bridge](https://www.npmjs.com/package/pi-opencode-bridge) | OpenCode provider for Pi Agent. Auto-discovers models from OpenCode registry and uses Pi's native OpenAI-compatible handler. | ⬇ 345/mo | 16d ago |
| [pi-comment-checker](https://www.npmjs.com/package/pi-comment-checker) | Pi extension that enforces self-documenting code by detecting and blocking unnecessary comments | ⬇ 344/mo | 6d ago |
| [saasufy-agent-skills](https://www.npmjs.com/package/saasufy-agent-skills) | Saasufy skills for AI | ⬇ 343/mo | 17d ago |
| [pi-currency](https://www.npmjs.com/package/pi-currency) | Real-time currency conversion for the pi TUI footer cost display | ⬇ 342/mo | 21d ago |
| [pi-thinking](https://www.npmjs.com/package/pi-thinking) | Muted, themed rendering for thinking blocks in pi. | ⬇ 341/mo | 23d ago |
| [pi-desktop-ui](https://www.npmjs.com/package/pi-desktop-ui) | A native desktop GUI for pi — full chat window with real-time streaming, markdown rendering, and workspace management | ⬇ 340/mo | ~1mo ago |
| [@odradekk/vera-session-tools](https://www.npmjs.com/package/@odradekk/vera-session-tools) | Session lifecycle tools for Vera agent (ask-user, todo, output-guard, compaction, prompt-rules, system-time, diagnostics) | ⬇ 339/mo | 17d ago |
| [pi-thinking-translator](https://www.npmjs.com/package/pi-thinking-translator) | Pi extension package for translating configured visible assistant content blocks. | ⬇ 338/mo | 4d ago |
| [@mattrobenolt/pi-acp](https://www.npmjs.com/package/@mattrobenolt/pi-acp) | ACP adapter for pi coding agent | ⬇ 336/mo | 10d ago |
| [pi-buddy](https://www.npmjs.com/package/pi-buddy) | An animated ASCII companion that lives beside your Pi input box. Hatches buddies with unique species, stats, and personalities. Reacts to what you're coding. | ⬇ 336/mo | 28d ago |
| [@zackify/pi-wafer](https://www.npmjs.com/package/@zackify/pi-wafer) | A pi extension that adds the Wafer Pass (wafer.ai) provider with paste-token OAuth and a footer that shows your live request quota and time until the next quota window. | ⬇ 335/mo | 13d ago |
| [@ontomics/ontomics](https://www.npmjs.com/package/@ontomics/ontomics) | MCP server that extracts domain ontologies from Python codebases | ⬇ 334/mo | ~1mo ago |
| [glm-vision](https://www.npmjs.com/package/glm-vision) | Pi extension that gives non-vision GLM models (z.ai) image understanding via GLM-4.6V | ⬇ 334/mo | today |
| [pi-poolside](https://www.npmjs.com/package/pi-poolside) | Poolside AI provider extension for Pi - registers Poolside models as OpenAI-compatible provider | ⬇ 334/mo | 8d ago |
| [pi-generative-ui](https://www.npmjs.com/package/pi-generative-ui) | Generative UI for pi — render interactive HTML/SVG widgets in native macOS windows via Glimpse | ⬇ 332/mo | 2mo ago |
| [tap-skill](https://www.npmjs.com/package/tap-skill) | thalix-auto — multi-agent orchestration skill for Claude Code, Codex CLI, and Pi (pi.dev). Forked from oh-my-claudecode. | ⬇ 332/mo | 12d ago |
| [pi-fireworks](https://www.npmjs.com/package/pi-fireworks) | Fireworks AI provider extension package for pi | ⬇ 330/mo | ~1mo ago |
| [pi-perplexity](https://www.npmjs.com/package/pi-perplexity) | Perplexity web search for pi — uses your Pro/Max subscription, no API credits needed | ⬇ 330/mo | 14d ago |
| [@nvaughn/pi-asu-provider](https://www.npmjs.com/package/@nvaughn/pi-asu-provider) | ASU provider extension for pi coding agent | ⬇ 329/mo | 11d ago |
| [@seqyuan/pimodel](https://www.npmjs.com/package/@seqyuan/pimodel) | Import OpenAI-compatible model providers into PI models.json | ⬇ 329/mo | yesterday |
| [pi-nyaa](https://www.npmjs.com/package/pi-nyaa) | Pi extension for querying public metadata from nyaa.si and sukebei.nyaa.si. | ⬇ 328/mo | 20d ago |
| [@0xkobold/pi-mcp](https://www.npmjs.com/package/@0xkobold/pi-mcp) | Model Context Protocol (MCP) integration for pi-coding-agent. Connect to any MCP server (stdio, SSE, StreamableHTTP, WebSocket) and use its tools, resources, and prompts natively. | ⬇ 327/mo | ~1mo ago |
| [pi-claude-oauth-adapter](https://www.npmjs.com/package/pi-claude-oauth-adapter) | Anthropic OAuth / Claude Code compatibility adapter for Pi. | ⬇ 327/mo | ~1mo ago |
| [@awtotty/pi-missions](https://www.npmjs.com/package/@awtotty/pi-missions) | Pi extension for long-running, milestone-based coding missions. | ⬇ 325/mo | 7d ago |
| [@qmxme/pi-stats](https://www.npmjs.com/package/@qmxme/pi-stats) | Stats widget extension for pi - shows token throughput, usage, and duration | ⬇ 325/mo | 8d ago |
| [@sherif-fanous/pi-catppuccin](https://www.npmjs.com/package/@sherif-fanous/pi-catppuccin) | Catppuccin themes for the Pi Coding Agent | ⬇ 325/mo | ~1mo ago |
| [pi-kapso-whatsapp](https://www.npmjs.com/package/pi-kapso-whatsapp) | Pi extension for WhatsApp via Kapso AI — contacts access control with SQLite | ⬇ 324/mo | 19d ago |
| [@leing2021/pi-image-gen](https://www.npmjs.com/package/@leing2021/pi-image-gen) | Pi Extension — generate images via gpt-image-2, with runtime config override for API key, base URL, model, and output directory. | ⬇ 322/mo | 9d ago |
| [pi-codexbar](https://www.npmjs.com/package/pi-codexbar) | Pi extension wrapper for CodexBar provider state and controls | ⬇ 321/mo | 28d ago |
| [@jeonghyeon.net/pi-web-access](https://www.npmjs.com/package/@jeonghyeon.net/pi-web-access) | Web search, URL fetching, GitHub repo cloning, PDF extraction, YouTube video understanding, and local video analysis for Pi coding agent | ⬇ 320/mo | ~1mo ago |
| [@khmuhtadin/pi-clickup-mcp](https://www.npmjs.com/package/@khmuhtadin/pi-clickup-mcp) | Pi extension that bridges pi to the official ClickUp remote MCP server. | ⬇ 320/mo | 20d ago |
| [@artale/pi-sentinel](https://www.npmjs.com/package/@artale/pi-sentinel) | Agent security framework. Immutable audit trail, permission policies, self-modification detection, destructive command guard. | ⬇ 319/mo | 23d ago |
| [@dustydonkey/pi-spinner](https://www.npmjs.com/package/@dustydonkey/pi-spinner) | Smooth working spinner with shimmering verbs for Pi — inspired by Claude Code | ⬇ 319/mo | 13d ago |
| [HazAT-pi-config](https://github.com/HazAT/pi-config) | My personal pi coding agent configuration - skills and extensions | ⭐319 | ~1mo ago |
| [pi-review-mode](https://www.npmjs.com/package/pi-review-mode) | Pi extension that opens a native review surface for frozen Git diffs. | ⬇ 319/mo | 5d ago |
| [pi-apex-companion-coding](https://www.npmjs.com/package/pi-apex-companion-coding) | Apex Companion Coding extension package for pi / pi-mono with companion review, negotiation contracts, and mutation guardrails. | ⬇ 318/mo | ~1mo ago |
| [pi-guard](https://www.npmjs.com/package/pi-guard) | General-purpose permission system for pi tools, handling permissions for bash and file tools with extensible matchers for custom tools. | ⬇ 318/mo | ~1mo ago |
| [pi-opinionated-zenmux](https://www.npmjs.com/package/pi-opinionated-zenmux) | Provider-only Pi package that registers the curated ZenMux model set used by pi-excalibur. | ⬇ 318/mo | 24d ago |
| [@rwese/minimax-web-search](https://www.npmjs.com/package/@rwese/minimax-web-search) | MiniMax extension for pi coding agent | ⬇ 317/mo | ~1mo ago |
| [@saadjs/pi-status](https://www.npmjs.com/package/@saadjs/pi-status) | Non-interactive /status command for pi (Codex) | ⬇ 317/mo | 23d ago |
| [pi-claude-plugins](https://www.npmjs.com/package/pi-claude-plugins) | Pi extension that exposes Claude marketplace plugin skills from ~/.claude/plugins/marketplaces into the current pi session. | ⬇ 317/mo | 18d ago |
| [pi-skill-toggle](https://www.npmjs.com/package/pi-skill-toggle) | Enable/disable skills from loading into pi context at startup | ⬇ 317/mo | 27d ago |
| [pi-cursor-provider](https://www.npmjs.com/package/pi-cursor-provider) | Pi extension providing access to Cursor models via OAuth and a local OpenAI-compatible gRPC proxy | ⬇ 316/mo | ~1mo ago |
| [pi-obsidian-context](https://www.npmjs.com/package/pi-obsidian-context) | Pi extension that surfaces Obsidian vault context (active file and open tabs) as an editor widget and injects it as hidden LLM context | ⬇ 316/mo | 24d ago |
| [pi-html-long-answer-extension](https://www.npmjs.com/package/pi-html-long-answer-extension) | Long-answer HTML export extension for Oh My Pi and Pi. | ⬇ 315/mo | ~1mo ago |
| [@oddsjam/pi-sandbox](https://www.npmjs.com/package/@oddsjam/pi-sandbox) | OS-level sandbox for pi using @anthropic-ai/sandbox-runtime, with an in-pi configure wizard, shift+tab toggle, and longest-prefix project configs. | ⬇ 314/mo | 13d ago |
| [@rhinos0608/pi-subagents](https://www.npmjs.com/package/@rhinos0608/pi-subagents) | A pi extension that brings Claude Code-style autonomous sub-agents to pi. Fork of @tintinweb/pi-subagents. | ⬇ 314/mo | 13d ago |
| [pi-aliases](https://www.npmjs.com/package/pi-aliases) | Pi extension that adds command aliases: /clear → /new, /exit → /quit | ⬇ 314/mo | 15d ago |
| [pi-export-config](https://www.npmjs.com/package/pi-export-config) | Pi extension to export, import, SSH-transfer, and GitHub-sync pi configuration including extension secrets. | ⬇ 314/mo | 7d ago |
| [@vtstech/pi-tgz-installer](https://www.npmjs.com/package/@vtstech/pi-tgz-installer) | Pi extension that does one thing and does it well. Installs pi-packages from .tgz archives. Adds /tgz-install command for installing Pi packages from .tgz URLs or local files | ⬇ 313/mo | 19d ago |
| [@jayteelabs/pi-nous-portal-provider](https://www.npmjs.com/package/@jayteelabs/pi-nous-portal-provider) | Pi provider package for Nous Research Portal inference. | ⬇ 312/mo | 15d ago |
| [pi-extension-toolkit](https://www.npmjs.com/package/pi-extension-toolkit) | A Pi Coding Agent extension to create, retrofit, and verify other extensions. | ⬇ 311/mo | 8d ago |
| [pi-skillshare](https://www.npmjs.com/package/pi-skillshare) | Search, install, and manage skillshare AI agent skills from within Pi | ⬇ 311/mo | 15d ago |
| [@ineersa/my-pi](https://www.npmjs.com/package/@ineersa/my-pi) | One-command installer for my pi extension bundle | ⬇ 310/mo | 2d ago |
| [pi-nvim](https://www.npmjs.com/package/pi-nvim) | Bridge between pi coding agent and Neovim | ⬇ 310/mo | 2mo ago |
| [pi-ollama-cloud-provider](https://www.npmjs.com/package/pi-ollama-cloud-provider) | Ollama Cloud provider extension for pi coding agent with dynamic model discovery | ⬇ 309/mo | 20d ago |
| [@offbynan/pi-cursor-provider](https://www.npmjs.com/package/@offbynan/pi-cursor-provider) | Pi extension providing access to Cursor models via OAuth and a local OpenAI-compatible gRPC proxy | ⬇ 308/mo | yesterday |
| [pi-qwen-mode-proxy](https://www.npmjs.com/package/pi-qwen-mode-proxy) | Sampling mode proxy for Qwen models served via llama.cpp — switch between thinking, coding, and instruct modes | ⬇ 308/mo | ~1mo ago |
| [pi-agent-colony](https://www.npmjs.com/package/pi-agent-colony) | Agent Colony for Pi — bootstrap and package distribution for a multi-agent Pi plugin for complex coding tasks. | ⬇ 307/mo | 25d ago |
| [token-rate-pi](https://www.npmjs.com/package/token-rate-pi) | Token rate status extension for pi-coding-agent - shows average output tokens per second | ⬇ 307/mo | 9d ago |
| [@gnoviawan/pi-setup-providers](https://www.npmjs.com/package/@gnoviawan/pi-setup-providers) | Overlay wizard for custom providers and model setup. | ⬇ 306/mo | 26d ago |
| [@tmustier/pi-session-hud](https://www.npmjs.com/package/@tmustier/pi-session-hud) | Persistent session HUD widget for Pi (below-editor bar with git/context/model/activity). | ⬇ 306/mo | 18d ago |
| [pi-openrouter-native](https://www.npmjs.com/package/pi-openrouter-native) | Native OpenRouter model sync for pi using built-in provider routing support | ⬇ 306/mo | 20d ago |
| [pi-skill-palette](https://www.npmjs.com/package/pi-skill-palette) | VS Code-style command palette for selecting and applying skills in pi | ⬇ 306/mo | 4mo ago |
| [pi-tps](https://www.npmjs.com/package/pi-tps) | TPS stats widget with waterfall trace visualization for pi coding agent | ⬇ 306/mo | 16d ago |
| [@rxreyn3/pi-azure-devops](https://www.npmjs.com/package/@rxreyn3/pi-azure-devops) | Azure DevOps diagnostics extension and CLI for Pi/OMP | ⬇ 305/mo | 18d ago |
| [pi-agenticoding](https://www.npmjs.com/package/pi-agenticoding) | Context management primitives for the pi coding agent — spawn, ledger, handoff | ⬇ 305/mo | 2d ago |
| [pi-codex-image](https://www.npmjs.com/package/pi-codex-image) | Pi extension that exposes Codex CLI image generation as a smoother codex_image tool. | ⬇ 305/mo | 18d ago |
| [symphony-pi](https://www.npmjs.com/package/symphony-pi) | Generic Symphony autonomous issue orchestration extension for pi. | ⬇ 305/mo | 22d ago |
| [@gnoviawan/pi-compact-tool-preview](https://www.npmjs.com/package/@gnoviawan/pi-compact-tool-preview) | Compact single-line renderers for Pi built-in tools. | ⬇ 304/mo | 25d ago |
| [@narumitw/pi-jupyter](https://www.npmjs.com/package/@narumitw/pi-jupyter) | Pi extension: right-side Jupyter notebook preview while editing .ipynb files. | ⬇ 304/mo | 19d ago |
| [pi-tinyfish](https://www.npmjs.com/package/pi-tinyfish) | TinyFish Search and Fetch tools for Pi | ⬇ 304/mo | 10d ago |
| [pi-warp](https://www.npmjs.com/package/pi-warp) | Pi <> Warp. Multi-task to your heart's content and get notified the moment your agent finishes. | ⬇ 304/mo | 9d ago |
| [@artale/pi-arena](https://www.npmjs.com/package/@artale/pi-arena) | Model benchmarking with domain-aware hallucination tracking, per-model leaderboards, and task templates. Track speed, quality, and pass rate across coding, reasoning, and general knowledge. | ⬇ 303/mo | 23d ago |
| [pi-cache-ttl-config](https://www.npmjs.com/package/pi-cache-ttl-config) | Dynamically switch the Anthropic prompt-cache TTL between 5m and 1h mid-conversation in the pi coding agent | ⬇ 303/mo | ~1mo ago |
| [@capyup/pi-codex-image](https://www.npmjs.com/package/@capyup/pi-codex-image) | Pi package that exposes Codex-style image_generation and view_image tools with dynamic model routing. | ⬇ 302/mo | 14d ago |
| [@lnilluv/pi-opencode-go-rotation](https://www.npmjs.com/package/@lnilluv/pi-opencode-go-rotation) | Rotate between multiple OpenCode Go API keys with best-effort reactive key rotation | ⬇ 302/mo | 23d ago |
| [@opperai/pi-provider](https://www.npmjs.com/package/@opperai/pi-provider) | Opper AI gateway provider and tools for the pi coding agent | ⬇ 302/mo | 13d ago |
| [@0xkobold/pi-task](https://www.npmjs.com/package/@0xkobold/pi-task) | Kanban-style task management for pi agents — backlog, in-progress, review, blocked, done with SQLite persistence | ⬇ 301/mo | ~1mo ago |
| [pi-bib](https://www.npmjs.com/package/pi-bib) | A pi extension for bibliography and BibTeX review workflows. | ⬇ 301/mo | 27d ago |
| [pi-semble](https://www.npmjs.com/package/pi-semble) | Pi extension that exposes Semble code search as a tool. | ⬇ 299/mo | 7d ago |
| [@haispeed/pi-obsidian](https://www.npmjs.com/package/@haispeed/pi-obsidian) | Pi extension + skill for managing Obsidian vaults via Obsidian CLI | ⬇ 297/mo | 2mo ago |
| [pi-context-breadcrumbs](https://www.npmjs.com/package/pi-context-breadcrumbs) | Nested path-sensitive context loading for Pi coding agent. | ⬇ 297/mo | 9d ago |
| [@superwhisper/pi](https://www.npmjs.com/package/@superwhisper/pi) | Superwhisper voice integration extension for Pi - get voice notifications when tasks complete | ⬇ 296/mo | 25d ago |
| [pi-xiaomi-mimo-provider](https://www.npmjs.com/package/pi-xiaomi-mimo-provider) | Xiaomi Mimo provider extension for pi coding agent — registers mimo-v2-pro, mimo-v2-omni, and mimo-v2-tts models | ⬇ 296/mo | ~1mo ago |
| [pi-treex](https://www.npmjs.com/package/pi-treex) | Enhances pi's native /tree with sticky-left view and a detail pane | ⬇ 294/mo | 6d ago |
| [@artale/pi-telegram](https://www.npmjs.com/package/@artale/pi-telegram) | Control Pi from Telegram. Run commands, check status, get notifications remotely. | ⬇ 293/mo | 23d ago |
| [pi-git-guardrails](https://www.npmjs.com/package/pi-git-guardrails) | Native Pi extension that blocks dangerous git operations, including git calls hidden inside scripts. | ⬇ 293/mo | 27d ago |
| [pi-portia](https://www.npmjs.com/package/pi-portia) | Pi-native spatial project memory extension backed by SQLite. | ⬇ 293/mo | 3d ago |
| [@justestif/wiki-agent](https://www.npmjs.com/package/@justestif/wiki-agent) | AI-powered personal wiki with agent hooks for Pi, Claude Code, Cursor, and OpenCode | ⬇ 292/mo | ~1mo ago |
| [@wiechsa/pi-ruby-lsp](https://www.npmjs.com/package/@wiechsa/pi-ruby-lsp) | Ruby LSP integration for pi coding agent | ⬇ 292/mo | 16d ago |
| [@fingerskier/pi-skidl](https://www.npmjs.com/package/@fingerskier/pi-skidl) | SKiDL circuit-design MCP plugin for Pi with a self-bootstrapping Python server | ⬇ 291/mo | 14d ago |
| [@smallbatchcode/pi-slash-command-guard](https://www.npmjs.com/package/@smallbatchcode/pi-slash-command-guard) | Pi extension that blocks mistyped or unknown slash commands from being sent as messages. | ⬇ 291/mo | 7d ago |
| [@anistark/iconify](https://www.npmjs.com/package/@anistark/iconify) | Turn a logo into a full favicon set from your terminal — pi extension + CLI | ⬇ 290/mo | 20d ago |
| [@haphazarddev/pi-interactive-code-review](https://www.npmjs.com/package/@haphazarddev/pi-interactive-code-review) | A tiny pi extension that quits when you type :q, :qa, or :wq. | ⬇ 290/mo | 5d ago |
| [pi-slim](https://www.npmjs.com/package/pi-slim) | Slim Pi's default system prompt by making Pi documentation guidance opt-in via /pi. | ⬇ 289/mo | 9d ago |
| [pi-snake-timepass](https://www.npmjs.com/package/pi-snake-timepass) | A centered Snake game that pops up automatically while Pi is working. Features 'Hard' and 'Easy' modes, adjustable speed, and wall wrap-around. | ⬇ 289/mo | 28d ago |
| [pi-thinking-timer](https://www.npmjs.com/package/pi-thinking-timer) | Pi extension that shows a live timer next to collapsed Thinking blocks. | ⬇ 287/mo | 15d ago |
| [pi-yaml-hooks](https://www.npmjs.com/package/pi-yaml-hooks) | YAML hook automation for the PI coding agent: tool guards, session hooks, prompts, notifications, and bash actions. | ⬇ 287/mo | 13d ago |
| [@artale/pi-test](https://www.npmjs.com/package/@artale/pi-test) | Test runner dashboard — run tests, show pass/fail in TUI, track results | ⬇ 286/mo | ~1mo ago |
| [pi-llama-server](https://www.npmjs.com/package/pi-llama-server) | Pi extension for llama-server router — live model listing, load/unload, per-project config | ⬇ 286/mo | 16d ago |
| [pi-sync-suite](https://www.npmjs.com/package/pi-sync-suite) | Cross-platform Pi extension for config sync, chat exports, safe cleanup, and native TUI controls. | ⬇ 286/mo | 27d ago |
| [pi-verify](https://www.npmjs.com/package/pi-verify) | Pi extension that runs configurable, staged code verification checks. | ⬇ 286/mo | 10d ago |
| [@the-forge-flow/pi-verifier](https://www.npmjs.com/package/@the-forge-flow/pi-verifier) | PI extension that runs a verifier subagent to observe and correct builder sessions | ⬇ 285/mo | 11d ago |
| [pi-pledit](https://www.npmjs.com/package/pi-pledit) | Plan mode and Accept-Edits mode for Pi, inspired by Claude Code. | ⬇ 285/mo | 22d ago |
| [@micka33/pi-npm-version-release-skill](https://www.npmjs.com/package/@micka33/pi-npm-version-release-skill) | Pi package providing skills and scripts for versioned GitHub release workflows. | ⬇ 284/mo | 8d ago |
| [pi-import-claude-history](https://www.npmjs.com/package/pi-import-claude-history) | Pi coding agent extension: import Claude Code JSONL sessions into Pi session format | ⬇ 284/mo | 23d ago |
| [pi-multifix](https://www.npmjs.com/package/pi-multifix) | Pi extension for multi-repo bugfixing — ClickUp to MR in one command | ⬇ 284/mo | 27d ago |
| [pi-ui-minimal](https://www.npmjs.com/package/pi-ui-minimal) | Minimal UI extension for Pi that hides footer info and removes dashed borders around the user input for a cleaner TUI experience. | ⬇ 284/mo | ~1mo ago |
| [pi-agent-booster-pack](https://www.npmjs.com/package/pi-agent-booster-pack) | ABP Pi whiteboarding guard plus whiteboarding skill: one user-facing question at a time. | ⬇ 283/mo | 17d ago |
| [pi-glm-usage](https://www.npmjs.com/package/pi-glm-usage) | A pi extension that displays z.ai (GLM Coding Plan) subscription quota usage in the status bar. Shows 5-hour and weekly quota percentages, plan level, and reset times. Updates every 60 seconds during  | ⬇ 283/mo | 20d ago |
| [pi-mimo](https://www.npmjs.com/package/pi-mimo) | Pi extension for Xiaomi MiMo AI models provider | ⬇ 283/mo | 27d ago |
| [pi-subagent-in-memory](https://www.npmjs.com/package/pi-subagent-in-memory) | In-process subagent tool for pi with live TUI card widgets, JSONL session logging, and zero system-prompt overhead. | ⬇ 283/mo | ~1mo ago |
| [@neilurk12/pi-clean-footer](https://www.npmjs.com/package/@neilurk12/pi-clean-footer) | Open lazygit in popup terminal via /lazygit or Ctrl+Shift+G | ⬇ 282/mo | 7d ago |
| [@ramarivera/pi-ts-aperture-provider](https://www.npmjs.com/package/@ramarivera/pi-ts-aperture-provider) | Config-driven aperture provider extraction for Pi-compatible extensions. | ⬇ 282/mo | 16d ago |
| [pi-markitdown](https://www.npmjs.com/package/pi-markitdown) | pi extension wrapping markitdown CLI | ⬇ 282/mo | 29d ago |
| [pi-tmux-branch](https://www.npmjs.com/package/pi-tmux-branch) | Pi extension for branching the current session into a new tmux pane. | ⬇ 282/mo | 14d ago |
| [@artale/pi-git-graph](https://www.npmjs.com/package/@artale/pi-git-graph) | Visual git history — ASCII commit graph, branch map, contributor stats | ⬇ 281/mo | ~1mo ago |
| [@mcowger/pi-strip-volatile](https://www.npmjs.com/package/@mcowger/pi-strip-volatile) | A pi extension that prevents volatile runtime data from being persisted to settings.json | ⬇ 281/mo | 27d ago |
| [@oleg_tarasov/pi-compaction-fix](https://www.npmjs.com/package/@oleg_tarasov/pi-compaction-fix) | Pi extension that waits for overflow auto-compaction retry before headless prompt completion. | ⬇ 281/mo | 20d ago |
| [pi-precognition](https://www.npmjs.com/package/pi-precognition) | Validated tool futures for low-latency Pi coding agents. Predict the wait, not the answer. | ⬇ 281/mo | 7d ago |
| [@fgladisch/pi-caveman](https://www.npmjs.com/package/@fgladisch/pi-caveman) | Run Pi user bash commands through zsh with Pi-specific functions | ⬇ 280/mo | 7d ago |
| [pi-exit-resume](https://www.npmjs.com/package/pi-exit-resume) | Pi extension that copies the resume command when Pi exits. | ⬇ 280/mo | 9d ago |
| [pi-quiet-tools](https://www.npmjs.com/package/pi-quiet-tools) | Pi extension that automatically compacts large tool outputs before they enter the model context window, saving tokens while preserving full output as recoverable local artifacts. | ⬇ 280/mo | 17d ago |
| [pi-hodor](https://www.npmjs.com/package/pi-hodor) | A pi extension that automatically continues after transient stream and connection errors. | ⬇ 279/mo | ~1mo ago |
| [@arcanemachine/pi-notify-marker](https://www.npmjs.com/package/@arcanemachine/pi-notify-marker) | Marker file plugin for Pi coding agent - create files when events occur | ⬇ 278/mo | 22d ago |
| [pi-auto-mode](https://www.npmjs.com/package/pi-auto-mode) | A pi extension that re-implements Claude Code style auto mode with a two-stage tool-call classifier. | ⬇ 278/mo | 9d ago |
| [pi-bash-live-view](https://www.npmjs.com/package/pi-bash-live-view) | A pi extension that adds optional PTY-backed live terminal rendering to the bash tool via usePTY=true. | ⬇ 278/mo | 2mo ago |
| [pi-vision-proxy](https://www.npmjs.com/package/pi-vision-proxy) | Automatic image, video and audio description for any model in Pi. Routes media to a multimodal model and injects descriptions into context. | ⬇ 278/mo | 14d ago |
| [anchor-edit](https://www.npmjs.com/package/anchor-edit) | Stateful single-token anchored file editing (Dirac-style). MCP server via `anchor-edit mcp`. | ⬇ 277/mo | 18d ago |
| [pi-cny-cost](https://www.npmjs.com/package/pi-cny-cost) | Pi extension to display model costs in CNY (Chinese Yuan) | ⬇ 277/mo | yesterday |
| [pi-fancy-loader](https://www.npmjs.com/package/pi-fancy-loader) | A fancy loader extension for Pi | ⬇ 277/mo | 15d ago |
| [@firstpick/pi-skill-paper-summarizer](https://www.npmjs.com/package/@firstpick/pi-skill-paper-summarizer) | Agents should invoke this skill for academic or technical papers, arXiv/PubMed/IEEE/ACM links, PDFs, methodology review, limitations, practical implications, or extracting findings for engineering dec | ⬇ 276/mo | 7d ago |
| [@howaboua/pi-auto-trees](https://www.npmjs.com/package/@howaboua/pi-auto-trees) | A Pi package that adds /marker and /end commands for incremental long-running coding sessions. | ⬇ 276/mo | 8d ago |
| [pi-resume-hint](https://www.npmjs.com/package/pi-resume-hint) | Pi extension that prints a quirky resume command for the current session when Pi exits. | ⬇ 276/mo | 24d ago |
| [@eovidiu/pi-extensions](https://www.npmjs.com/package/@eovidiu/pi-extensions) | Pi extensions, including an opt-in MCP bridge. | ⬇ 275/mo | 10d ago |
| [@fancyrobot/agent-vault](https://www.npmjs.com/package/@fancyrobot/agent-vault) | Durable project memory for coding agents. Obsidian-compatible vault with MCP server, pi package, and workflow support for Claude Code, OpenCode, pi, and Codex. | ⬇ 275/mo | 29d ago |
| [pi-copilot-queue](https://www.npmjs.com/package/pi-copilot-queue) | Pi extension that queues ask_user responses for Copilot-style workflows | ⬇ 275/mo | ~1mo ago |
| [@firstpick/pi-skill-tech-debt-tracker](https://www.npmjs.com/package/@firstpick/pi-skill-tech-debt-tracker) | Agents should invoke this skill when identifying, categorizing, prioritizing, or planning technical debt work, debt sprints, cleanup backlogs, TODO consolidation, or long-term maintainability risks. T | ⬇ 274/mo | 7d ago |
| [@rexkit/pi-lazygit](https://www.npmjs.com/package/@rexkit/pi-lazygit) | Pi package that opens Lazygit in a floating overlay window. | ⬇ 274/mo | ~1mo ago |
| [pi-ghost-autocomplete](https://www.npmjs.com/package/pi-ghost-autocomplete) | Inline ghost-text autocomplete extension for the Pi coding agent (pi.dev). Cloud and local LLM providers, zero-flicker rendering, no popup interference. | ⬇ 274/mo | 7d ago |
| [@akshaykarle/pi-tools](https://www.npmjs.com/package/@akshaykarle/pi-tools) | Pi coding agent extensions — security hardening, agent teams and more | ⬇ 273/mo | 18d ago |
| [@odradekk/vera-web-tools](https://www.npmjs.com/package/@odradekk/vera-web-tools) | Web search, web read, docs search, academic search, and PDF parsing tools for Vera agent | ⬇ 273/mo | 20d ago |
| [@victormilk/pi-vibeproxy](https://www.npmjs.com/package/@victormilk/pi-vibeproxy) | Pi Coding Agent extension that registers Factory.AI Droid models as a custom-streamSimple provider backed by a long-lived `droid exec` subprocess. | ⬇ 273/mo | 10d ago |
| [pi-secure-env-collect](https://www.npmjs.com/package/pi-secure-env-collect) | Secure env var collection tool for Pi with masked input and destination writers | ⬇ 273/mo | ~1mo ago |
| [pi-solo](https://www.npmjs.com/package/pi-solo) | Pi package for the Solo task tracker — tool, commands, auto-init, and TUI widget. | ⬇ 273/mo | 15d ago |
| [pi-suggest](https://www.npmjs.com/package/pi-suggest) | LLM-generated next-step suggestions for Pi autocomplete, chips, and picker UI. | ⬇ 273/mo | 18d ago |
| [pi-sticky-prompt](https://www.npmjs.com/package/pi-sticky-prompt) | Always-on-top, full-width macOS prompt bar for pi. A floating native window that survives terminal scrollback and lets you keep typing while you read scrollback history. | ⬇ 272/mo | 14d ago |
| [@andriimartynov/pi-ollama-model-switcher](https://www.npmjs.com/package/@andriimartynov/pi-ollama-model-switcher) | Monitors and manages Ollama model instances within the pi coding agent harness. | ⬇ 271/mo | 9d ago |
| [@firstpick/pi-skill-test-plan-generator](https://www.npmjs.com/package/@firstpick/pi-skill-test-plan-generator) | Agents should invoke this skill when planning tests from specs, architecture docs, PRs, risky changes, new features, bug fixes, or release work. Generates prioritized unit, integration, E2E, regressio | ⬇ 271/mo | 7d ago |
| [@anhkhoa2109/pi-you-search](https://www.npmjs.com/package/@anhkhoa2109/pi-you-search) | Pi extension for web_you_search and web_you_fetch tools powered by You.com | ⬇ 270/mo | 12d ago |
| [pi-linear](https://www.npmjs.com/package/pi-linear) | Pi extension for Linear issue tracking — search, create, update issues, manage teams, and track work from your terminal. | ⬇ 270/mo | ~1mo ago |
| [pi-working-phrase](https://www.npmjs.com/package/pi-working-phrase) | A tiny Pi extension that replaces Pi's working status with shuffled phrases, a colored spinner, and an animated shine gradient. | ⬇ 270/mo | 7d ago |
| [safe-coder](https://www.npmjs.com/package/safe-coder) | Safe Coder is a configuration package for the [`pi` coding agent](https://www.npmjs.com/package/@mariozechner/pi-coding-agent) that adds **safety guardrails** and **project-specific** extensions to re | ⬇ 270/mo | 26d ago |
| [pi-openai-service-tier](https://www.npmjs.com/package/pi-openai-service-tier) | Cost-correct OpenAI service tier / fast mode extension for pi | ⬇ 269/mo | 22d ago |
| [pi-figma-remote-auth](https://www.npmjs.com/package/pi-figma-remote-auth) | Pi extension that authenticates and configures Figma Remote MCP for pi-mcp-adapter. | ⬇ 268/mo | 18d ago |
| [pi-onecli-extension](https://www.npmjs.com/package/pi-onecli-extension) | OneCLI gateway integration for pi | ⬇ 268/mo | 25d ago |
| [pi-root-grant](https://www.npmjs.com/package/pi-root-grant) | Pi extension that lets agents request temporary sudo-backed root access with explicit user approval. | ⬇ 267/mo | 13d ago |
| [pi-xai-voice](https://www.npmjs.com/package/pi-xai-voice) | Pi extension for xAI voice and audio workflows | ⬇ 267/mo | 8d ago |
| [@arcadia64/pi-ddgs](https://www.npmjs.com/package/@arcadia64/pi-ddgs) | Pi extension for web search and page fetch with curl_cffi + Chrome + Camoufox fallback chain. Backed by a local Docker service. | ⬇ 266/mo | 28d ago |
| [@artale/pi-bux](https://www.npmjs.com/package/@artale/pi-bux) | 24/7 Pi or Hermes agent on a VPS. Run your agent continuously, control via Telegram, browse the web. | ⬇ 266/mo | 23d ago |
| [@harms-haus/pi-lens](https://www.npmjs.com/package/@harms-haus/pi-lens) | Unified code quality extension for pi — auto-runs prettier, linters, LSP diagnostics, and tsc on changed files | ⬇ 266/mo | today |
| [pi-tmux-cursor-focus](https://www.npmjs.com/package/pi-tmux-cursor-focus) | Pi extension that hides the editor cursor in unfocused tmux panes without replacing other editor/status extensions | ⬇ 266/mo | 23d ago |
| [pi-annotated-reply](https://www.npmjs.com/package/pi-annotated-reply) | Annotated reply workflow for pi (model responses, file sources, and git diffs) | ⬇ 265/mo | 16d ago |
| [pi-claude-tasks](https://www.npmjs.com/package/pi-claude-tasks) | Browse and manage Claude Code tasks from Pi | ⬇ 265/mo | ~1mo ago |
| [pi-native-search](https://www.npmjs.com/package/pi-native-search) | Pi extension that adds web_search and web_fetch tools using each provider's native search backend (ZAI MCP, Anthropic, Google, OpenAI, xAI, Claude Code subscription via claude-bridge), with DuckDuckGo | ⬇ 265/mo | 23d ago |
| [@firstpick/pi-skill-performance-optimizer](https://www.npmjs.com/package/@firstpick/pi-skill-performance-optimizer) | Agents should invoke this skill for slow code, high CPU/memory, latency, large data processing, algorithmic complexity, profiling plans, benchmarks, or optimization requests. Profiles first and weighs | ⬇ 264/mo | 7d ago |
| [pi-memoir](https://www.npmjs.com/package/pi-memoir) | Persistent project memory for pi — the LLM queries the memoire instead of reading all files, saving ~95%+ tokens. | ⬇ 264/mo | 17d ago |
| [pi-provider-crofai](https://www.npmjs.com/package/pi-provider-crofai) | CrofAI model provider extension for the pi coding agent. | ⬇ 264/mo | 23d ago |
| [@amartinr/pi-searxng](https://www.npmjs.com/package/@amartinr/pi-searxng) | A minimalist SearXNG web search extension for Pi | ⬇ 263/mo | 2d ago |
| [@baggiiiie/pi-goal](https://www.npmjs.com/package/@baggiiiie/pi-goal) | Codex-style persisted goals for pi coding agent sessions. | ⬇ 263/mo | 22d ago |
| [@firstpick/pi-skill-competitor-analysis](https://www.npmjs.com/package/@firstpick/pi-skill-competitor-analysis) | Agents should invoke this skill when comparing competing products, services, libraries, tools, vendors, or approaches for market/product positioning, feature matrices, strategic trade-offs, pricing, a | ⬇ 262/mo | 7d ago |
| [@porche/pi-plan-lock](https://www.npmjs.com/package/@porche/pi-plan-lock) | Pi extension that adds strict /plan read-only planning mode with anti-jailbreak guardrails | ⬇ 262/mo | 4d ago |
| [pi-usage](https://www.npmjs.com/package/pi-usage) | /usage command for pi – shows current provider's daily & weekly limits | ⬇ 262/mo | today |
| [@firstpick/pi-extension-hyprland-wiki-local](https://www.npmjs.com/package/@firstpick/pi-extension-hyprland-wiki-local) | Local Hyprland Wiki search and retrieval tools for Pi backed by a cloned official hyprland-wiki repository. | ⬇ 261/mo | 8d ago |
| [@firstpick/pi-skill-spec-vs-impl-checker](https://www.npmjs.com/package/@firstpick/pi-skill-spec-vs-impl-checker) | Agents should invoke this skill when a spec, plan, README, issue, or requirement must be verified against implementation. Traces requirements to code, checks interface contracts, and reports gaps or m | ⬇ 261/mo | 7d ago |
| [@ruminaider/linear-cli](https://www.npmjs.com/package/@ruminaider/linear-cli) | JSON-first CLI for Linear. Wraps every authenticated Linear MCP tool: projects, issues, comments, attachments, cycles, documents, milestones, teams, users, labels, statuses, images, and docs search. | ⬇ 261/mo | 11d ago |
| [@zgltyq/pi-provider-kimi-code](https://www.npmjs.com/package/@zgltyq/pi-provider-kimi-code) | Kimi Code plan in pi-coding-agent — fork of pi-provider-kimi-code with bearer-auth fix for OAuth tokens | ⬇ 261/mo | ~1mo ago |
| [pi-enhanced-tools](https://www.npmjs.com/package/pi-enhanced-tools) | Enhanced tools extension for PI — replacements and augmentations for built-in coding agent tools | ⬇ 261/mo | 21d ago |
| [@capyup/pi-obsidian](https://www.npmjs.com/package/@capyup/pi-obsidian) | pi extension that wraps the Obsidian CLI as typed tools — read, list, search, outline, create, append, open, backlinks, tags, and daily-append against the active vault. | ⬇ 260/mo | 14d ago |
| [checkpoint-pi](https://www.npmjs.com/package/checkpoint-pi) | Git-based checkpoint extension for pi-coding-agent - creates checkpoints at each turn for code state restoration | ⬇ 260/mo | 9d ago |
| [pi-windows-path-guard](https://www.npmjs.com/package/pi-windows-path-guard) | Prevents Windows-native Pi file tools from silently writing to mangled paths when agents reuse Git Bash/MSYS paths like /c/Users/... | ⬇ 260/mo | 22d ago |
| [@aretw0/lab-skills](https://www.npmjs.com/package/@aretw0/lab-skills) | First-party web skills: native search and browser automation via CDP | ⬇ 259/mo | ~1mo ago |
| [@johnnywu/pi-terminal-signals](https://www.npmjs.com/package/@johnnywu/pi-terminal-signals) | Pi extension that communicates agent lifecycle to the terminal via OSC 9;4 (progress) and OSC 133 (semantic prompts). | ⬇ 259/mo | 13d ago |
| [@sentiolabs/pi-frontend-design](https://www.npmjs.com/package/@sentiolabs/pi-frontend-design) | Frontend design skill for distinctive, production-grade Pi UI work. | ⬇ 259/mo | 20d ago |
| [nicobailon-pi-boomerang](https://github.com/nicobailon/pi-boomerang) | Token-efficient autonomous task execution with context collapse for pi coding agent | ⭐259 | 5d ago |
| [pi-boundary](https://www.npmjs.com/package/pi-boundary) | Filesystem boundary enforcement for pi — prompts before the agent escapes your project | ⬇ 259/mo | 7d ago |
| [@fgladisch/pi-user-select](https://www.npmjs.com/package/@fgladisch/pi-user-select) | Multiple-choice user selection tool extension for Pi | ⬇ 258/mo | 25d ago |
| [@firstpick/pi-skill-architecture-review](https://www.npmjs.com/package/@firstpick/pi-skill-architecture-review) | Agents should invoke this skill for architecture reviews, module boundaries, dependency direction, coupling/cohesion, SOLID concerns, system design trade-offs, layering, service boundaries, or design  | ⬇ 258/mo | 7d ago |
| [pi-lcm-memory](https://www.npmjs.com/package/pi-lcm-memory) | Persistent cross-session semantic memory for Pi — a hybrid (FTS5 + vector) recall layer on top of pi-lcm. | ⬇ 258/mo | 26d ago |
| [pi-redline](https://www.npmjs.com/package/pi-redline) | Redline pi sessions: an overlay TUI showing every file changed in the current pi session with syntax-highlighted diffs, per-line selection, fix/explain annotations, and a one-key submit-as-prompt flow | ⬇ 258/mo | 11d ago |
| [pi-semantic](https://www.npmjs.com/package/pi-semantic) | Semantic density modes + workflow helpers for Pi (toggle via /sem). | ⬇ 258/mo | ~1mo ago |
| [pi-tmux-rename](https://www.npmjs.com/package/pi-tmux-rename) | Pi extension that automatically renames tmux windows to reflect the current conversation topic | ⬇ 258/mo | 17d ago |
| [@fingerskier/pi-cron](https://www.npmjs.com/package/@fingerskier/pi-cron) | Cron scheduler plugin for Pi, bridged from the legacy dex-claude-plugin MCP server | ⬇ 257/mo | 18d ago |
| [@fingerskier/pi-mozart](https://www.npmjs.com/package/@fingerskier/pi-mozart) | Mozart MIDI plugin for Pi, bridged from mozart-claude-plugin MCP | ⬇ 257/mo | 18d ago |
| [@firstpick/pi-skill-code-security](https://www.npmjs.com/package/@firstpick/pi-skill-code-security) | Agents should invoke this skill for code security reviews, leaked secret checks, dependency risk, unsafe shell/Python/TypeScript/Rust patterns, auth/input-validation flaws, SAST-style audits, or suppl | ⬇ 257/mo | 7d ago |
| [@firstpick/pi-skill-vulnerability-scanner](https://www.npmjs.com/package/@firstpick/pi-skill-vulnerability-scanner) | Agents should invoke this skill when checking CVEs or known vulnerabilities in installed packages, dependencies, Docker images, OS packages, exposed services, or software versions. Produces severity-r | ⬇ 257/mo | 7d ago |
| [pi-litellm](https://www.npmjs.com/package/pi-litellm) | LiteLLM integration for Pi — dynamic model sync, accurate cost tracking, and session grouping | ⬇ 257/mo | 18d ago |
| [@artale/pi-design](https://www.npmjs.com/package/@artale/pi-design) | AI design tool for Pi. Generate UIs, landing pages, slides from prompts. | ⬇ 256/mo | 27d ago |
| [@fingerskier/pi-kicad](https://www.npmjs.com/package/@fingerskier/pi-kicad) | KiCad MCP plugin for Pi | ⬇ 256/mo | 18d ago |
| [@whynothugo/pi-notify](https://www.npmjs.com/package/@whynothugo/pi-notify) | Pi extension to emit a terminal bell when the agent ends its turn. | ⬇ 256/mo | 15d ago |
| [oira666_pi-mcp-adapter](https://www.npmjs.com/package/oira666_pi-mcp-adapter) | MCP (Model Context Protocol) adapter extension for Pi coding agent | ⬇ 256/mo | 29d ago |
| [pi-session-context](https://www.npmjs.com/package/pi-session-context) | A pi coding agent extension that tracks and displays session context (worktree, Jira ticket, GitLab MR) in the footer | ⬇ 256/mo | 18d ago |
| [@firstpick/pi-skill-deployment-automation](https://www.npmjs.com/package/@firstpick/pi-skill-deployment-automation) | Agents should invoke this skill for Docker Compose deployments, container updates, stack health checks, rollbacks, compose-file changes, image upgrades, failed deploys, or service restart planning. Pr | ⬇ 255/mo | 7d ago |
| [@the-forge-flow/memory-graph](https://www.npmjs.com/package/@the-forge-flow/memory-graph) | Structured knowledge wiki: Claude Code plugin AND pi-coding-agent extension from one repo. LLM-maintained interlinked markdown vault that compounds over time. | ⬇ 255/mo | 29d ago |
| [pi-cache-timer](https://www.npmjs.com/package/pi-cache-timer) | Footer cache timer extension for Pi | ⬇ 255/mo | ~1mo ago |
| [pi-napkin](https://www.npmjs.com/package/pi-napkin) | 🧻 Napkin integration for pi — vault context, knowledge tools, and automatic distillation | ⬇ 255/mo | ~1mo ago |
| [@firstpick/pi-skill-tech-deep-dive](https://www.npmjs.com/package/@firstpick/pi-skill-tech-deep-dive) | Agents should invoke this skill when choosing or evaluating libraries, frameworks, tools, platforms, models, databases, APIs, or architectures for a use case. Produces criteria scoring, ecosystem asse | ⬇ 254/mo | 7d ago |
| [pi-venice-stats](https://www.npmjs.com/package/pi-venice-stats) | Live Venice Protocol stats dashboard for Pi Coding Agent | ⬇ 254/mo | 18d ago |
| [@firstpick/pi-skill-backup-manager](https://www.npmjs.com/package/@firstpick/pi-skill-backup-manager) | Agents should invoke this skill for backup health checks, restore testing, NAS/Gitea backup integrity, 3-2-1 strategy review, backup script audits, or verifying repositories and archives can be restor | ⬇ 253/mo | 7d ago |
| [nano-team](https://www.npmjs.com/package/nano-team) | A tiny pi.dev extension. It doesn't really do much — just runs your subagents and shows them as a compact little chip row above the editor so you can see who's working. | ⬇ 253/mo | 25d ago |
| [pi-zk](https://www.npmjs.com/package/pi-zk) | Pi extension exposing the zk note-taking CLI as agent-native tools. | ⬇ 253/mo | 15d ago |
| [@davehardy20/pi-lsp-tools](https://www.npmjs.com/package/@davehardy20/pi-lsp-tools) | Pi package for LSP-powered code navigation: goto definition, find references, diagnostics, symbols, and rename. | ⬇ 252/mo | 8d ago |
| [@firstpick/pi-skill-code-quality](https://www.npmjs.com/package/@firstpick/pi-skill-code-quality) | Agents should invoke this skill for code reviews, linting/formatting setup, maintainability checks, complexity concerns, warning cleanup, coding standards, or quality gates in Rust, TypeScript, Python | ⬇ 252/mo | 7d ago |
| [container-dashboard](https://www.npmjs.com/package/container-dashboard) | A pi coding agent extension for managing Docker, Podman, and Nerdctl containers — list, logs, prune, stats, inspect, and more. | ⬇ 252/mo | 21d ago |
| [@fingerskier/pi-fleet](https://www.npmjs.com/package/@fingerskier/pi-fleet) | Fleet AWS monitor plugin for Pi, bridged from fleet-claude-plugin MCP | ⬇ 251/mo | 18d ago |
| [@firstpick/pi-extension-archwiki-local](https://www.npmjs.com/package/@firstpick/pi-extension-archwiki-local) | Local ArchWiki search and retrieval tools for Pi using the installed arch-wiki-docs package. | ⬇ 251/mo | 8d ago |
| [@firstpick/pi-skill-design-patterns](https://www.npmjs.com/package/@firstpick/pi-skill-design-patterns) | Agents should invoke this skill when choosing patterns, designing traits/interfaces/components, deciding abstraction boundaries, evaluating dependency injection/callbacks, or comparing implementation  | ⬇ 251/mo | 7d ago |
| [pi-planning-with-files](https://www.npmjs.com/package/pi-planning-with-files) | Manus-style file-based planning for Pi Coding Agent | ⬇ 251/mo | 4mo ago |
| [pi-disable-model-skill-invocation](https://www.npmjs.com/package/pi-disable-model-skill-invocation) | Pi extension that globally hides skills from the model while preserving /skill:name. | ⬇ 249/mo | 18d ago |
| [@firstpick/pi-skill-network-diagnostics](https://www.npmjs.com/package/@firstpick/pi-skill-network-diagnostics) | Agents should invoke this skill for connectivity, DNS, Pi-hole, port reachability, routing, firewall reachability, TLS/network timeouts, or service access failures. Provides structured network trouble | ⬇ 248/mo | 7d ago |
| [@firstpick/pi-skill-refactoring-advisor](https://www.npmjs.com/package/@firstpick/pi-skill-refactoring-advisor) | Agents should invoke this skill for refactors, code smells, migrations, duplication removal, module splitting, API cleanup, or restructuring plans. Emphasizes small safe steps, behavior preservation,  | ⬇ 248/mo | 7d ago |
| [pi-capitals-context](https://www.npmjs.com/package/pi-capitals-context) | Auto-inject ALL_CAPS context files into pi's system prompt — per-file toggles, folder collapse, global ~/.pi/CAPS, search, sort, preview, file watcher | ⬇ 248/mo | 6d ago |
| [pi-load-skill](https://www.npmjs.com/package/pi-load-skill) | Pi extension for loading skills on demand from any location | ⬇ 248/mo | 5d ago |
| [pi-rtk](https://www.npmjs.com/package/pi-rtk) | RTK token reduction extension for pi-coding-agent - reduces LLM token consumption 60-90% by intelligently filtering tool output | ⬇ 248/mo | 3mo ago |
| [pi-zai-glm](https://www.npmjs.com/package/pi-zai-glm) | Extra LLM providers for pi (Z.ai GLM). | ⬇ 248/mo | ~1mo ago |
| [vendure-pi](https://www.npmjs.com/package/vendure-pi) | Pi agent extension for Vendure e-commerce management. Connect to your Vendure instance and manage products, orders, customers, and more through natural language. Requires vendure-mcp-graphql. | ⬇ 248/mo | 20d ago |
| [pi-command-history](https://www.npmjs.com/package/pi-command-history) | Folder-based persistent command history for pi. Recall previous commands with ctrl+up/down across sessions. | ⬇ 247/mo | ~1mo ago |
| [pi-fetch-markdown](https://www.npmjs.com/package/pi-fetch-markdown) | Pi skill: fetch any web page as clean markdown via Cloudflare content negotiation or Jina Reader | ⬇ 247/mo | 25d ago |
| [@davehardy20/pi-quality-gates](https://www.npmjs.com/package/@davehardy20/pi-quality-gates) | Pi quality-gates bundle: post-turn linting, LSP diagnostics, and automated code review. | ⬇ 246/mo | 8d ago |
| [@tanyouqing/pi-openviking](https://www.npmjs.com/package/@tanyouqing/pi-openviking) | OpenViking memory and indexed repository extension for pi-coding-agent | ⬇ 246/mo | 21d ago |
| [pi-resume-on-exit](https://www.npmjs.com/package/pi-resume-on-exit) | Print a copyable Pi resume command when an interactive Pi session exits. | ⬇ 246/mo | 19d ago |
| [@firstpick/pi-skill-server-audit](https://www.npmjs.com/package/@firstpick/pi-skill-server-audit) | Agents should invoke this skill for Linux server security reviews, SSH hardening, firewall/open-port audits, user/permission checks, exposed services, or host hardening requests. Produces severity-rat | ⬇ 245/mo | 7d ago |
| [eslint-plugin-lookup-table](https://www.npmjs.com/package/eslint-plugin-lookup-table) | Detect redundant conditional chains and suggest lookup tables | ⬇ 245/mo | ~1mo ago |
| [@calesennett/pi-codex-fast](https://www.npmjs.com/package/@calesennett/pi-codex-fast) | pi extension that adds service_tier=priority to OpenAI/OpenAI Codex requests when fast mode is enabled. | ⬇ 244/mo | 11d ago |
| [@evo-hq/pi-evo](https://www.npmjs.com/package/@evo-hq/pi-evo) | Evo plugin for pi-coding-agent: optimize/discover/subagent skills + mid-run inject extension. | ⬇ 244/mo | 4d ago |
| [@tmustier/pi-clean-slides](https://www.npmjs.com/package/@tmustier/pi-clean-slides) | PowerPoint CLI skill for Pi — inspect, edit, generate table slides from YAML, render to PNG. | ⬇ 244/mo | 18d ago |
| [pi-git-things](https://www.npmjs.com/package/pi-git-things) | Pi prompt templates for proposing commit messages and pull request descriptions. | ⬇ 244/mo | 17d ago |
| [pi-neovim](https://www.npmjs.com/package/pi-neovim) | A Neovim tool for Pi | ⬇ 244/mo | 4d ago |
| [pi-statusline](https://www.npmjs.com/package/pi-statusline) | Claude Code-compatible command-driven statusline extension for the Pi coding agent | ⬇ 244/mo | 18d ago |
| [pi-template-kit](https://www.npmjs.com/package/pi-template-kit) | Shared LiquidJS prompt-template engine, filters, XML tag, and file loader for Pi packages. | ⬇ 244/mo | 15d ago |
| [@firstpick/pi-skill-acceptance-tester](https://www.npmjs.com/package/@firstpick/pi-skill-acceptance-tester) | Agents should invoke this skill as the final gate before release, handoff, or claiming completion for substantial changes. Runs acceptance/readiness checks, determines pass/fail, and gives a go/no-go  | ⬇ 243/mo | 7d ago |
| [@kimuson/pi-ralph](https://www.npmjs.com/package/@kimuson/pi-ralph) | pi package | ⬇ 243/mo | today |
| [pi-cutlery](https://www.npmjs.com/package/pi-cutlery) | Multi-session workflow toolbox for Pi, centered on session forking | ⬇ 243/mo | 27d ago |
| [pi-minimax-tools](https://www.npmjs.com/package/pi-minimax-tools) | MiniMax web_search and understand_image tools for pi | ⬇ 243/mo | 4d ago |
| [pi-model-selector](https://www.npmjs.com/package/pi-model-selector) | A Pi coding agent extension that enhances model selection with pricing and cumulative usage information. | ⬇ 243/mo | ~1mo ago |
| [@fingerskier/pi-micropython](https://www.npmjs.com/package/@fingerskier/pi-micropython) | MicroPython device MCP plugin for Pi with a self-bootstrapping Python server | ⬇ 242/mo | 18d ago |
| [@firstpick/pi-extension-tools](https://www.npmjs.com/package/@firstpick/pi-extension-tools) | Interactive active-tool manager for Pi. | ⬇ 242/mo | 3d ago |
| [@nqbao/pi-json-schema](https://www.npmjs.com/package/@nqbao/pi-json-schema) | Pi extension for validating and writing structured JSON output against a JSON Schema. | ⬇ 242/mo | 10d ago |
| [pi-file-watcher](https://www.npmjs.com/package/pi-file-watcher) | Watch folders for #pi! comments in source files and send them as prompts to the LLM — aider-style watch mode for pi | ⬇ 242/mo | 5d ago |
| [pi-side-chat](https://www.npmjs.com/package/pi-side-chat) | Pi extension that forks the current conversation into a side chat | ⬇ 242/mo | ~1mo ago |
| [@artale/pi-comply](https://www.npmjs.com/package/@artale/pi-comply) | EU AI Act compliance toolkit for pi. Risk tier classification, audit trail, deadline tracking, checklist generation. The first compliance tool in the pi ecosystem. | ⬇ 241/mo | ~1mo ago |
| [@capyup/pi-jobs](https://www.npmjs.com/package/@capyup/pi-jobs) | Supervised job runtime extension for pi with isolated workers, audit artifacts, and retry-aware orchestration. | ⬇ 241/mo | 11d ago |
| [@jerryan/pi-subagent-lite](https://www.npmjs.com/package/@jerryan/pi-subagent-lite) | Minimal pi extension that delegates tasks to isolated subagent processes with optional skill loading | ⬇ 241/mo | 5d ago |
| [@sentiolabs/pi-scriptable-statusline](https://www.npmjs.com/package/@sentiolabs/pi-scriptable-statusline) | Scriptable footer and statusline UI package for Pi. | ⬇ 241/mo | 12d ago |
| [pi-nano-context](https://www.npmjs.com/package/pi-nano-context) | A tiny pi.dev extension. It replaces the default context meter with a compact segmented bar under the editor so you can see what is using the window. | ⬇ 241/mo | 19d ago |
| [@shiina18/pi-ask-user-question](https://www.npmjs.com/package/@shiina18/pi-ask-user-question) | Claude Code-like ask_user_question tool for Pi | ⬇ 240/mo | 23d ago |
| [@lukemelnik/pi-monitor](https://www.npmjs.com/package/@lukemelnik/pi-monitor) | A Pi extension and CLI for monitoring live Pi agents and jumping to their tmux panes. | ⬇ 239/mo | 13d ago |
| [@rjshrjndrn/pi-fetch](https://www.npmjs.com/package/@rjshrjndrn/pi-fetch) | Web content extraction for pi — fetch any URL as clean Markdown using Defuddle | ⬇ 239/mo | 7d ago |
| [@fingerskier/pi-build123d](https://www.npmjs.com/package/@fingerskier/pi-build123d) | build123d CAD MCP plugin for Pi with a self-bootstrapping Python server | ⬇ 238/mo | 18d ago |
| [@fingerskier/pi-dude](https://www.npmjs.com/package/@fingerskier/pi-dude) | Dude local memory plugin for Pi, bridged from dude-claude-plugin MCP | ⬇ 238/mo | 18d ago |
| [pi-chalin](https://www.npmjs.com/package/pi-chalin) | Pi Coding Agent extension for routed, memory-aware subagent workflows | ⬇ 238/mo | 2d ago |
| [pi-context-cap](https://www.npmjs.com/package/pi-context-cap) | Cap model context windows so pi's built-in auto-compaction fires earlier. Zero-config 200k default for long-context Claude models; configurable for anything else. | ⬇ 238/mo | ~1mo ago |
| [@codewithkenzo/pi-dispatch](https://www.npmjs.com/package/@codewithkenzo/pi-dispatch) | Queue and run Pi tasks with reusable profiles | ⬇ 237/mo | ~1mo ago |
| [@firstpick/pi-skill-bug-reporter](https://www.npmjs.com/package/@firstpick/pi-skill-bug-reporter) | Agents should invoke this skill when defects, regressions, failed tests, unexpected behavior, or spec mismatches are found. Produces structured reproducible bug reports with severity, evidence, enviro | ⬇ 236/mo | 7d ago |
| [@jamesjfoong/pi-ollama](https://www.npmjs.com/package/@jamesjfoong/pi-ollama) | Auto-discover and register Ollama models in pi. No more manual models.json editing. | ⬇ 236/mo | 23d ago |
| [pi-codex-image-tool](https://www.npmjs.com/package/pi-codex-image-tool) | Pi extension exposing a gpt-5.5+ image generation tool backed by gpt-image-2. | ⬇ 236/mo | 19d ago |
| [@baggiiiie/pi-rtk-rewrite](https://www.npmjs.com/package/@baggiiiie/pi-rtk-rewrite) | A pi package that rewrites `bash` tool calls through [RTK](https://github.com/rtk-ai/rtk) before execution. | ⬇ 235/mo | 22d ago |
| [@im4all/pi-jira-extension](https://www.npmjs.com/package/@im4all/pi-jira-extension) | Fetch and create jira issues | ⬇ 235/mo | 19d ago |
| [pi-hybrid-harness](https://www.npmjs.com/package/pi-hybrid-harness) | Pi package for frontier-designed, local-LLM implementation loops with frontier final gates. | ⬇ 235/mo | today |
| [pi-opinionated-mimo](https://www.npmjs.com/package/pi-opinionated-mimo) | Provider-only Pi package that registers the single MiMo model used by pi-excalibur. | ⬇ 235/mo | ~1mo ago |
| [@xl0/pi-ide-integration](https://www.npmjs.com/package/@xl0/pi-ide-integration) | Pi package template for an IDE integration extension. | ⬇ 234/mo | 10d ago |
| [@sinamtz/pi-minimax-provider](https://www.npmjs.com/package/@sinamtz/pi-minimax-provider) | Pi coding agent provider for MiniMax AI - supports MiniMax M2 series models with Anthropic API compatibility | ⬇ 233/mo | ~1mo ago |
| [@jecruz/pi-dev-workflow](https://www.npmjs.com/package/@jecruz/pi-dev-workflow) | Multi-stage development workflow for pi — automated write/test/review/fix/verify cycle with coverage gates and auto-commits | ⬇ 232/mo | 16d ago |
| [@jqwn/pi-ask-user-question](https://www.npmjs.com/package/@jqwn/pi-ask-user-question) | A Pi extension that lets the model ask rich multi-question TUI dialogs with options, descriptions, previews, multi-select, and custom answers. | ⬇ 232/mo | 18d ago |
| [@marks/pi-subagent](https://www.npmjs.com/package/@marks/pi-subagent) | Minimal Pi extension: one subagent tool that spawns role-shaped child pi processes. Roles defined as markdown in ~/.pi/agent/agents/. | ⬇ 232/mo | 11d ago |
| [@zhaopengme/pi-notify](https://www.npmjs.com/package/@zhaopengme/pi-notify) | Native macOS notifications when Pi completes tasks | ⬇ 232/mo | 27d ago |
| [pi-modal](https://www.npmjs.com/package/pi-modal) | Kakoune/Helix-like modal editor for pi prompt input - motion-first with selection markers | ⬇ 232/mo | 18d ago |
| [@whynothugo/pi-auto-theme](https://www.npmjs.com/package/@whynothugo/pi-auto-theme) | Pi extension to automatically switch theme based on terminal dark/light mode. | ⬇ 231/mo | 15d ago |
| [pi-side-preview](https://www.npmjs.com/package/pi-side-preview) | Right-side file and image preview extension for pi. | ⬇ 231/mo | 20d ago |
| [ralph-loop-pi](https://www.npmjs.com/package/ralph-loop-pi) | Ralph loop extension for pi-coding-agent - looped subagent execution | ⬇ 231/mo | 9d ago |
| [pi-xai-imagine](https://www.npmjs.com/package/pi-xai-imagine) | Pi extension for xAI image, video, and vision workflows | ⬇ 229/mo | 8d ago |
| [@aizigao/pi-proxy-fetch](https://www.npmjs.com/package/@aizigao/pi-proxy-fetch) | Pi extension package that routes globalThis.fetch through direct, proxy, or fallback behavior based on hostname rules. | ⬇ 228/mo | 4d ago |
| [@denveous/pi-mcp](https://www.npmjs.com/package/@denveous/pi-mcp) | Pi extension: MCP client for pi agent | ⬇ 228/mo | 10d ago |
| [@paulrobello/par-tts-core-ts](https://www.npmjs.com/package/@paulrobello/par-tts-core-ts) | Provider-neutral TypeScript text-to-speech library for Node, browsers via proxy, and pi extensions | ⬇ 228/mo | 28d ago |
| [pi-custom-compaction](https://www.npmjs.com/package/pi-custom-compaction) | Custom compaction for pi — swap the model, template, and trigger for context compaction | ⬇ 228/mo | ~1mo ago |
| [pi-video-transcribe](https://www.npmjs.com/package/pi-video-transcribe) | Video transcription with speaker diarization for Pi. Transcribe videos with per-speaker labels, summaries, chapters, and sentiment analysis via AssemblyAI. | ⬇ 228/mo | 15d ago |
| [@bergetai/pi-provider-berget](https://www.npmjs.com/package/@bergetai/pi-provider-berget) | Run [Berget AI](https://berget.ai) models inside [Pi](https://pi.dev). | ⬇ 227/mo | 16d ago |
| [pi-mempalace](https://www.npmjs.com/package/pi-mempalace) | Persistent agent memory for pi — raw verbatim storage with semantic search. Never lose context again. | ⬇ 227/mo | ~1mo ago |
| [@artale/pi-watch](https://www.npmjs.com/package/@artale/pi-watch) | Watch any video with Pi. Frame extraction, transcription, analysis. | ⬇ 226/mo | 20d ago |
| [@baggiiiie/pi-context-chart](https://www.npmjs.com/package/@baggiiiie/pi-context-chart) | A pi package that visualises context usage two ways: | ⬇ 226/mo | 3d ago |
| [pi-timer](https://www.npmjs.com/package/pi-timer) | Pi package that shows a per-run elapsed timer inline in the footer. | ⬇ 226/mo | 2mo ago |
| [@artale/pi-memory](https://www.npmjs.com/package/@artale/pi-memory) | Persistent memory for Pi sessions | ⬇ 225/mo | 27d ago |
| [pi-comfy-ui](https://www.npmjs.com/package/pi-comfy-ui) | Comfortable spacing and panel styling for Pi's interactive TUI. | ⬇ 225/mo | 6d ago |
| [@penumbral-labs/pi-copy-code](https://www.npmjs.com/package/@penumbral-labs/pi-copy-code) | A pi extension for ergonomic copying of assistant code blocks. | ⬇ 223/mo | 11d ago |
| [pi-smart-sessions](https://www.npmjs.com/package/pi-smart-sessions) | Auto-names Pi sessions with AI-generated summaries — no more cryptic skill tags in your session list | ⬇ 223/mo | 3mo ago |
| [pi-usage-bars](https://www.npmjs.com/package/pi-usage-bars) | Production-ready /usage bars extension for pi (Codex, Claude, Z.AI, Gemini CLI, Antigravity) | ⬇ 223/mo | ~1mo ago |
| [@kushagharahi/pi-llama-extensions](https://www.npmjs.com/package/@kushagharahi/pi-llama-extensions) | Pi extensions for llama.cpp router — auto model discovery and tokens/second display | ⬇ 222/mo | 29d ago |
| [@ersintarhan/pi-toolkit](https://www.npmjs.com/package/@ersintarhan/pi-toolkit) | pi extension that registers Kimi, MiniMax, Xiaomi MiMo, and CrofAI providers with cache fix, Anthropic OAuth adapter, and native web search with provider-override support. Search backends include ZAI  | ⬇ 221/mo | 5d ago |
| [@season179/pi-skills-status](https://www.npmjs.com/package/@season179/pi-skills-status) | Shows the skills used in the current Pi session. | ⬇ 221/mo | 14d ago |
| [pi-emacs](https://www.npmjs.com/package/pi-emacs) | A collection of Emacs related pi tools | ⬇ 221/mo | 7d ago |
| [@odradekk/vera-ui](https://www.npmjs.com/package/@odradekk/vera-ui) | Session UI extensions for Vera agent (banner, status line, thinking cycle) | ⬇ 220/mo | ~1mo ago |
| [pi-clojure](https://www.npmjs.com/package/pi-clojure) | A set of Clojure development tools implemented in pure JavaScript for the [pi-coding-agent](https://github.com/badlogic/pi-mono). | ⬇ 220/mo | 7d ago |
| [pi-universal-view](https://www.npmjs.com/package/pi-universal-view) | Pi extension that converts any file to markdown via markit | ⬇ 219/mo | ~1mo ago |
| [pi-restrict-bash](https://www.npmjs.com/package/pi-restrict-bash) | Opinionated bash tool restrictions for Pi | ⬇ 218/mo | ~1mo ago |
| [warpdot-dev-craft-agents-oss](https://github.com/warpdot-dev/craft-agents-oss) | electron anthropic claude-agent-sdk mcp bun websocket thin-client multi-llm openapi skills automations oauth desktop-ai github-copilot google-ai chatgpt devtools apache-2 headless-server pi-sdk vscode | ⭐218 | 25d ago |
| [@bakaschwarz/pi-update-adesso](https://www.npmjs.com/package/@bakaschwarz/pi-update-adesso) | pi extension for syncing providers/models from the Adesso AI Hub and viewing usage spend | ⬇ 217/mo | 18d ago |
| [pi-side-agents](https://www.npmjs.com/package/pi-side-agents) | Side-agent orchestration for Pi — spin off parallel child agents in tmux windows and git worktrees. | ⬇ 217/mo | ~1mo ago |
| [@artale/pi-hiphop](https://www.npmjs.com/package/@artale/pi-hiphop) | Hip-hop notification sounds. Drake, Cole, Ye, Kendrick. The GOATs. | ⬇ 216/mo | 19d ago |
| [pi-session-auto-rename](https://www.npmjs.com/package/pi-session-auto-rename) | Automatically names pi sessions with AI, with configurable naming model | ⬇ 216/mo | 18d ago |
| [pi-terminal-browser-search](https://www.npmjs.com/package/pi-terminal-browser-search) | Pi Harness /search extension with system-default and multi-browser support | ⬇ 216/mo | 19d ago |
| [@the-forge-flow/gh-pi](https://www.npmjs.com/package/@the-forge-flow/gh-pi) | GH-PI — PI extension for native GitHub CLI (gh) integration | ⬇ 215/mo | ~1mo ago |
| [pi-figma](https://www.npmjs.com/package/pi-figma) | Pi package for Figma integration — inspect files, components, styles, nodes, export assets, and read comments directly from Figma's REST API. | ⬇ 214/mo | 18d ago |
| [pi-worktree-tui-status](https://www.npmjs.com/package/pi-worktree-tui-status) | TUI-only worktree and experiment status indicator for Pi; detects agent tool paths without managing them | ⬇ 214/mo | 3d ago |
| [pi-deep-research](https://www.npmjs.com/package/pi-deep-research) | Deep research skill for pi — structured search, reflection, and analysis. | ⬇ 213/mo | ~1mo ago |
| [pi-end-turn](https://www.npmjs.com/package/pi-end-turn) | Pi extension for ending the agent's turn using tool | ⬇ 212/mo | 4d ago |
| [@the-forge-flow/security-harness-pi](https://www.npmjs.com/package/@the-forge-flow/security-harness-pi) | Security harness for the PI coding agent — forbids dangerous commands and gates sensitive ones behind user approval | ⬇ 211/mo | 11d ago |
| [@lukemelnik/pi-session-recap](https://www.npmjs.com/package/@lukemelnik/pi-session-recap) | A Pi extension that shows a one-line recap of what the current session has been about. | ⬇ 209/mo | 18d ago |
| [@xl0/pi-lovely-web](https://www.npmjs.com/package/@xl0/pi-lovely-web) |  | ⬇ 209/mo | 3d ago |
| [permission-pi](https://www.npmjs.com/package/permission-pi) | Layered permission control extension for pi-coding-agent | ⬇ 209/mo | 9d ago |
| [pi-pomodoro](https://www.npmjs.com/package/pi-pomodoro) | Pomodoro timer extension for pi coding agent | ⬇ 208/mo | ~1mo ago |
| [@artale/pi-weigh](https://www.npmjs.com/package/@artale/pi-weigh) | Weigh your context. Visual HTML report of system prompt token budget — per-tool breakdown, section analysis, health indicator. Zero dependencies. | ⬇ 207/mo | ~1mo ago |
| [wgnr-pi](https://www.npmjs.com/package/wgnr-pi) | A feature-rich web UI for Pi Coding Agent — by wgnr.ai | ⬇ 207/mo | ~1mo ago |
| [@fulcrum-agent-os/pi-cockpit](https://www.npmjs.com/package/@fulcrum-agent-os/pi-cockpit) | Fulcrum Cockpit — control-plane dashboard, task management, memory, lifecycle tools, and policy hook for the PI coding agent | ⬇ 206/mo | ~1mo ago |
| [pi-tps-monitor](https://www.npmjs.com/package/pi-tps-monitor) | Live tokens-per-second display next to the working indicator in pi-coding-agent | ⬇ 206/mo | ~1mo ago |
| [@heyhuynhgiabuu/pi-search](https://www.npmjs.com/package/@heyhuynhgiabuu/pi-search) | Unified search toolkit for pi — web search, code search, docs lookup, and GitHub code search in one extension. | ⬇ 205/mo | ~1mo ago |
| [pi-set-editor](https://www.npmjs.com/package/pi-set-editor) | Choose and save the external editor used by Ctrl+G in pi | ⬇ 205/mo | 16d ago |
| [pi-tokensaver](https://www.npmjs.com/package/pi-tokensaver) | Give your Pi AI agent a semantic memory — bridges tokensave's Rust-powered local graph engine into your coding workflow for token-efficient codebase exploration | ⬇ 205/mo | 17d ago |
| [@khimaros/pi-evolve](https://www.npmjs.com/package/@khimaros/pi-evolve) | self-modifying hook extension for pi-coding-agent — implements the hook protocol so opencode-evolve hooks run in pi unchanged | ⬇ 204/mo | 8d ago |
| [tmdgusya-roach-pi](https://github.com/tmdgusya/roach-pi) | Strict engineering discipline and multi-agent orchestration for the pi coding agent | ⭐204 | 4d ago |
| [@artale/pi-hotline](https://www.npmjs.com/package/@artale/pi-hotline) | Hotline Bling notification sounds. When pi finishes, the vibes hit different. 🔥 | ⬇ 203/mo | 19d ago |
| [@ssweens/pi-huddle](https://www.npmjs.com/package/@ssweens/pi-huddle) | Huddle mode for pi - safe exploration and structured elicitation before execution | ⬇ 203/mo | 11d ago |
| [pi-kimi-usage](https://www.npmjs.com/package/pi-kimi-usage) | Shows Kimi usage in the pi status bar when a Kimi model is selected | ⬇ 203/mo | 28d ago |
| [@artale/pi-bench](https://www.npmjs.com/package/@artale/pi-bench) | Microbenchmark runner. Compare code performance. | ⬇ 202/mo | ~1mo ago |
| [pi-plan](https://www.npmjs.com/package/pi-plan) | Plan mode for pi — read-only exploration with plan-then-execute workflow | ⬇ 202/mo | 18d ago |
| [@odradekk/vera-search-tools](https://www.npmjs.com/package/@odradekk/vera-search-tools) | Cross-platform rg/fd search tools for Vera agent | ⬇ 201/mo | 20d ago |
| [pi-betterdiff](https://www.npmjs.com/package/pi-betterdiff) | Tree-inspired pi extension for reviewing session and git diffs. | ⬇ 201/mo | ~1mo ago |
| [@artale/pi-wordle](https://www.npmjs.com/package/@artale/pi-wordle) | Daily Wordle in the terminal. 6 guesses, color-coded feedback, stats tracking. | ⬇ 200/mo | ~1mo ago |
| [@kaiserlich-dev/pi-queue-picker](https://www.npmjs.com/package/@kaiserlich-dev/pi-queue-picker) | Pick between steering and follow-up when queuing messages in pi | ⬇ 200/mo | 22d ago |
| [pi-critique](https://www.npmjs.com/package/pi-critique) | Structured AI critique for writing and code. Pairs well with annotated-reply and markdown-preview but works standalone. | ⬇ 200/mo | 16d ago |
| [pi-drawio](https://www.npmjs.com/package/pi-drawio) | Pi skill for generating native draw.io diagrams and exports | ⬇ 199/mo | 24d ago |
| [@artale/pi-scaffold](https://www.npmjs.com/package/@artale/pi-scaffold) | Generate new pi extension projects from a template. /scaffold my-extension 'Description here' | ⬇ 197/mo | ~1mo ago |
| [@oleg_tarasov/pi-zmx-status](https://www.npmjs.com/package/@oleg_tarasov/pi-zmx-status) | Show the current zmx session name in Pi's status bar. | ⬇ 197/mo | 20d ago |
| [pi-cortecs](https://www.npmjs.com/package/pi-cortecs) | Cortecs provider extension for pi coding agent. Install with `pi install npm:pi-cortecs`. | ⬇ 197/mo | 17d ago |
| [@gnoviawan/pi-auto-session-name](https://www.npmjs.com/package/@gnoviawan/pi-auto-session-name) | Automatically titles sessions using a custom name_session tool. | ⬇ 196/mo | 26d ago |
| [@complexthings/pi-dynamic-context-pruning](https://www.npmjs.com/package/@complexthings/pi-dynamic-context-pruning) | PI coding agent extension — Dynamic Context Pruning (DCP) | ⬇ 195/mo | ~1mo ago |
| [@neuron-mr-white/pi-zenmux](https://www.npmjs.com/package/@neuron-mr-white/pi-zenmux) | ZenMux provider extension for Pi — dynamic model discovery with caching | ⬇ 195/mo | ~1mo ago |
| [@artale/pi-cost](https://www.npmjs.com/package/@artale/pi-cost) | LLM cost tracker — track spend per session, model, and project | ⬇ 194/mo | ~1mo ago |
| [pi-agent-selector](https://www.npmjs.com/package/pi-agent-selector) | Pi extension that lets users activate local agent markdown files as the current session profile. | ⬇ 194/mo | 11d ago |
| [pi-provider-tama](https://www.npmjs.com/package/pi-provider-tama) | Pi agent extension for tama local AI server auto-discovery and model configuration | ⬇ 194/mo | yesterday |
| [@artale/pi-eval](https://www.npmjs.com/package/@artale/pi-eval) | Agent evaluation harness. Judge sessions on success, tool usage, efficiency, methodology. Inspired by opencc. | ⬇ 193/mo | ~1mo ago |
| [pi-evaluate](https://www.npmjs.com/package/pi-evaluate) | Adversarial post-execute evaluation skill for pi — verifies implementation against contract, GAN-inspired | ⬇ 193/mo | 5d ago |
| [pi-screenshots](https://www.npmjs.com/package/pi-screenshots) | Screenshot picker for pi — browse, select, and attach screenshots to your prompts | ⬇ 193/mo | 2mo ago |
| [@kaiserlich-dev/pi-skill-picker](https://www.npmjs.com/package/@kaiserlich-dev/pi-skill-picker) | Namespace-aware skill palette for pi — groups skills by category folder | ⬇ 192/mo | 22d ago |
| [pi-threads](https://www.npmjs.com/package/pi-threads) | Pi extension that adds native shell completions (fish/zsh/bash) to ! and !! bash mode commands | ⬇ 192/mo | 28d ago |
| [@artale/pi-changelog](https://www.npmjs.com/package/@artale/pi-changelog) | Auto-generate changelogs from git history. | ⬇ 191/mo | ~1mo ago |
| [@artale/pi-diff](https://www.npmjs.com/package/@artale/pi-diff) | Beautiful side-by-side and inline diffs. File compare and git diff. | ⬇ 191/mo | ~1mo ago |
| [@artale/pi-fi](https://www.npmjs.com/package/@artale/pi-fi) | Call free LLMs using fi CLI — Gemini, Groq, Cerebras, OpenRouter free pool, Pollinations | ⬇ 191/mo | ~1mo ago |
| [@johnnywu/pi-webfetch](https://www.npmjs.com/package/@johnnywu/pi-webfetch) | Fetch web pages and URLs from pi with readable text, Markdown, HTML, or JSON output. | ⬇ 191/mo | 4d ago |
| [@zhangweiii/pi-status-line](https://www.npmjs.com/package/@zhangweiii/pi-status-line) | Natural-language configurable status line extension for pi. | ⬇ 191/mo | ~1mo ago |
| [@gnoviawan/pi-session-usage](https://www.npmjs.com/package/@gnoviawan/pi-session-usage) | Tracks time usage, prompts, turns, and tool calls in a session. | ⬇ 190/mo | 26d ago |
| [@sztlink/pi-ensemble](https://www.npmjs.com/package/@sztlink/pi-ensemble) | Shared workspace coordination for parallel coding agents | ⬇ 190/mo | 19d ago |
| [pi-extension-e2b](https://www.npmjs.com/package/pi-extension-e2b) | E2B cloud sandbox integration for pi — redirects all tool execution to a remote E2B sandbox | ⬇ 190/mo | 18d ago |
| [@artale/pi-deps](https://www.npmjs.com/package/@artale/pi-deps) | Dependency health scanner. Outdated, heavy, licenses, dupes, tree. | ⬇ 189/mo | ~1mo ago |
| [@artale/pi-http](https://www.npmjs.com/package/@artale/pi-http) | Quick HTTP client for API testing. /http GET url \| POST url -d body | ⬇ 189/mo | ~1mo ago |
| [@artale/pi-pong](https://www.npmjs.com/package/@artale/pi-pong) | Terminal Pong + Breakout for pi — vs AI with difficulty scaling, ball trails, and power-ups | ⬇ 189/mo | ~1mo ago |
| [@artale/pi-intel](https://www.npmjs.com/package/@artale/pi-intel) | Competitor intelligence. Track GitHub repos, npm packages, download trends, weekly digests. | ⬇ 188/mo | ~1mo ago |
| [@odradekk/vera-ccc-tools](https://www.npmjs.com/package/@odradekk/vera-ccc-tools) | CocoIndex Code semantic search tools for Vera agent | ⬇ 188/mo | 20d ago |
| [@ssweens/pi-vertex](https://www.npmjs.com/package/@ssweens/pi-vertex) | Google Vertex AI provider for Pi coding agent - supports Gemini, Claude, and all MaaS models | ⬇ 188/mo | 6d ago |
| [@the-forge-flow/fff-pi](https://www.npmjs.com/package/@the-forge-flow/fff-pi) | PI extension for fff | ⬇ 188/mo | ~1mo ago |
| [@ctogg/pi-stash](https://www.npmjs.com/package/@ctogg/pi-stash) | Git-style prompt stashing for pi — save what you're typing, clear the editor, and come back to it later. | ⬇ 187/mo | 17d ago |
| [@gnoviawan/pi-tokens-per-second](https://www.npmjs.com/package/@gnoviawan/pi-tokens-per-second) | Shows rolling tokens-per-second in the Pi status bar. | ⬇ 187/mo | 26d ago |
| [pi-agent-config](https://www.npmjs.com/package/pi-agent-config) | Personal [pi](https://pi.dev) coding agent configuration: safety extensions, subagent definitions, skills, and prompt templates for a more powerful AI-assisted development workflow. | ⬇ 187/mo | 28d ago |
| [@artale/pi-hex](https://www.npmjs.com/package/@artale/pi-hex) | Hex viewer, binary inspector, magic byte detection, string extraction. | ⬇ 186/mo | ~1mo ago |
| [pi-cmux-theme-picker](https://www.npmjs.com/package/pi-cmux-theme-picker) | Live cmux terminal theme picker for Pi with synchronized pi + cmux theme switching and debounced preview. | ⬇ 186/mo | ~1mo ago |
| [@gnoviawan/pi-token-usage](https://www.npmjs.com/package/@gnoviawan/pi-token-usage) | Displays session and project token usage across Pi sessions. | ⬇ 184/mo | 26d ago |
| [@jerryan/pi-pyvenv](https://www.npmjs.com/package/@jerryan/pi-pyvenv) | Automatically activate a Python virtual environment for pi coding agents | ⬇ 184/mo | 2d ago |
| [pi-parallel-web-search](https://www.npmjs.com/package/pi-parallel-web-search) | A pi extension that adds a web_search tool powered by Parallel AI | ⬇ 184/mo | 3mo ago |
| [pi-superpowers](https://www.npmjs.com/package/pi-superpowers) | Superpowers workflow skills adapted for pi | ⬇ 184/mo | 3mo ago |
| [pi-zenmux](https://www.npmjs.com/package/pi-zenmux) | ZenMux provider extension for pi-mono | ⬇ 184/mo | 14d ago |
| [@s1m0n38/pi-html](https://www.npmjs.com/package/@s1m0n38/pi-html) | Convert agent markdown output to beautiful self-contained HTML | ⬇ 183/mo | 8d ago |
| [@codexstar/pi-side-chat](https://www.npmjs.com/package/@codexstar/pi-side-chat) | Standalone side chat for Pi CLI — parallel AI agent with read-only tools | ⬇ 182/mo | 27d ago |
| [pi-banner](https://www.npmjs.com/package/pi-banner) | A rainbow pi banner extension for pi | ⬇ 182/mo | 6d ago |
| [pi-clinical-trial-finder](https://www.npmjs.com/package/pi-clinical-trial-finder) | Native Pi package for searching WHO clinical trials. For informational and research use only; not medical advice. | ⬇ 182/mo | 17d ago |
| [pi-ghostty](https://www.npmjs.com/package/pi-ghostty) | Ghostty terminal integration for Pi — dynamic title bar, progress indicators, and error states | ⬇ 182/mo | 3mo ago |
| [@baggiiiie/pi-codex-usage](https://www.npmjs.com/package/@baggiiiie/pi-codex-usage) | A pi package that adds the `/codex-usage` command and status widget. | ⬇ 181/mo | 22d ago |
| [@artale/pi-typing](https://www.npmjs.com/package/@artale/pi-typing) | Typing speed test with WPM tracking. Code snippets and quotes. | ⬇ 180/mo | ~1mo ago |
| [pi-branch-agent](https://www.npmjs.com/package/pi-branch-agent) | Branch agent extension for Pi Coding Agent. | ⬇ 180/mo | 8d ago |
| [pi-otel](https://www.npmjs.com/package/pi-otel) | OpenTelemetry traces for pi-coding-agent — per-prompt span tree (interaction → llm_request, tool.) exported via OTLP. Aspire-dashboard ready. | ⬇ 180/mo | 9d ago |
| [repeat-pi](https://www.npmjs.com/package/repeat-pi) | Repeat tool calls in pi-coding-agent | ⬇ 180/mo | 9d ago |
| [@artale/pi-port](https://www.npmjs.com/package/@artale/pi-port) | Find what's using a port, kill it. /port 3000 | ⬇ 178/mo | ~1mo ago |
| [@the-forge-flow/camoufox-pi](https://www.npmjs.com/package/@the-forge-flow/camoufox-pi) | PI extension for stealth web search and URL fetching via Camoufox | ⬇ 178/mo | ~1mo ago |
| [pi-budget-guard](https://www.npmjs.com/package/pi-budget-guard) | An extension for Pi coding agent that tracks session spend and enforces budget limits. | ⬇ 177/mo | ~1mo ago |
| [@e9n/pi-myfinance](https://www.npmjs.com/package/@e9n/pi-myfinance) | Personal CRM extension for pi — contacts, companies, interactions, and reminders | ⬇ 176/mo | 29d ago |
| [@noahsaso/pi-remote](https://www.npmjs.com/package/@noahsaso/pi-remote) | Remote terminal access for pi via WebSocket and browser, with Tailscale integration | ⬇ 176/mo | 3mo ago |
| [nicobailon-pi-intercom](https://github.com/nicobailon/pi-intercom) | Inter-session communication extension for pi coding agent | ⭐176 | 23d ago |
| [pi-agentation](https://www.npmjs.com/package/pi-agentation) | Pi extension that receives Agentation webhooks and turns them into queued user messages | ⬇ 176/mo | 7d ago |
| [pi-connect](https://www.npmjs.com/package/pi-connect) | Unified OAuth and API key login for pi with an OpenCode-inspired UI. Connect 15+ providers with one /connect command. | ⬇ 176/mo | ~1mo ago |
| [pi-logo](https://www.npmjs.com/package/pi-logo) | Pi extension logo | ⬇ 176/mo | 14d ago |
| [@codersbrew/pi-tools](https://www.npmjs.com/package/@codersbrew/pi-tools) | A pi package bundling CodersBrew pi extensions and skills. | ⬇ 175/mo | ~1mo ago |
| [pi-mpc](https://www.npmjs.com/package/pi-mpc) | MPC (Mental Preview & Correction) extension for pi coding agent — rehearse and verify before any code is written | ⬇ 175/mo | ~1mo ago |
| [@artale/pi-verify](https://www.npmjs.com/package/@artale/pi-verify) | Auto-verify Pi agent output. Two-agent system: builder runs, verifier checks, auto-corrects. | ⬇ 174/mo | 20d ago |
| [pi-cavekit](https://www.npmjs.com/package/pi-cavekit) | Cavekit spec-driven development skills and spec tracker widget for pi | ⬇ 174/mo | ~1mo ago |
| [pi-llm-debugging](https://www.npmjs.com/package/pi-llm-debugging) | Saves LLM provider request payloads to the project's .pi folder for per-project debugging | ⬇ 174/mo | 17d ago |
| [@kmiyh/pi-plan-mode](https://www.npmjs.com/package/@kmiyh/pi-plan-mode) | Pi extension that adds a read-only plan mode for safe code analysis, plan extraction, and execution progress tracking. | ⬇ 173/mo | 17d ago |
| [pi-fastboot](https://www.npmjs.com/package/pi-fastboot) | Make Pi startup feel close to PI_OFFLINE=1 while still letting npm-based extensions update | ⬇ 173/mo | ~1mo ago |
| [@pfeodrippe/repling-pi](https://www.npmjs.com/package/@pfeodrippe/repling-pi) | Pi extension that runs Repling as the agent runtime/tool loop. | ⬇ 172/mo | 29d ago |
| [@aliou/pi-extension-dev](https://www.npmjs.com/package/@aliou/pi-extension-dev) | Tools and commands for developing and updating Pi extensions. | ⬇ 171/mo | 2mo ago |
| [pi-bash-image](https://www.npmjs.com/package/pi-bash-image) | Inject images into bash tool results | ⬇ 171/mo | 27d ago |
| [pi-flare](https://www.npmjs.com/package/pi-flare) | Pi custom provider extension for Cloudflare Workers AI. | ⬇ 171/mo | ~1mo ago |
| [pi-open-here](https://www.npmjs.com/package/pi-open-here) | Open current directory (or a path) in external editor from pi | ⬇ 171/mo | 16d ago |
| [pi-plankton](https://www.npmjs.com/package/pi-plankton) | A fork of alexfazio/plankton that provides a Pi-exclusive extension for root-aware code quality enforcement. | ⬇ 171/mo | 29d ago |
| [@i-language/mem-forever](https://www.npmjs.com/package/@i-language/mem-forever) | Every AI tool forgets you. This one doesn't. Ever. Persistent memory across sessions and tools. Auto-generates profile, saves decisions and lessons to .ilang/, applies preferences forever. | ⬇ 170/mo | 28d ago |
| [pi-free-web-search](https://www.npmjs.com/package/pi-free-web-search) | Free, hybrid, browser-aware web search and content extraction package for Pi coding agent | ⬇ 169/mo | 2mo ago |
| [pi-token-meter](https://www.npmjs.com/package/pi-token-meter) | Display tokens per second in Pi. | ⬇ 169/mo | 21d ago |
| [pi-treequest-parallel-processing](https://www.npmjs.com/package/pi-treequest-parallel-processing) | TreeQuest Parallel Processing - multi-provider AI orchestration for pi with parallel queries, smart routing, and agent coordination | ⬇ 169/mo | 29d ago |
| [pi-typst-skill](https://www.npmjs.com/package/pi-typst-skill) | Pi Coding Agent skill that makes Typst the preferred format for document artifacts. | ⬇ 169/mo | 28d ago |
| [pi-simple](https://www.npmjs.com/package/pi-simple) | UI and tool rendering customizations to make Pi simpler. | ⬇ 168/mo | 28d ago |
| [@kmalkenneth/pi-watch](https://www.npmjs.com/package/@kmalkenneth/pi-watch) | Pi extension that watches for AI comments in your code and sends them to the agent | ⬇ 167/mo | 9d ago |
| [@swairshah/pi-canvas](https://www.npmjs.com/package/@swairshah/pi-canvas) | Use any Tailscale-connected phone/tablet/browser as a drawing or photo input surface for Pi. | ⬇ 167/mo | ~1mo ago |
| [telegram-pi](https://www.npmjs.com/package/telegram-pi) | Telegram Bot integration for Pi Coding Agent | ⬇ 167/mo | 22d ago |
| [@i-language/autocode](https://www.npmjs.com/package/@i-language/autocode) | You say it, AutoCode ships it. 47 I-Lang skills covering understanding, planning, building, quality, debugging, deployment, progress, and learning. Code to deployment in one session. | ⬇ 166/mo | 28d ago |
| [ai-call](https://www.npmjs.com/package/ai-call) | AI-driven structured interview skill for coding agents. The agent asks questions one by one, follows up naturally, and produces a clean markdown transcript. | ⬇ 166/mo | ~1mo ago |
| [pi-onnx](https://www.npmjs.com/package/pi-onnx) | Run Hugging Face onnx-community models locally inside pi: registers a chat provider for ONNX text-generation models and a set of tools (embeddings, classification, ASR) backed by @huggingface/transfor | ⬇ 166/mo | 10d ago |
| [@gnoviawan/pi-biome-lsp](https://www.npmjs.com/package/@gnoviawan/pi-biome-lsp) | Biome lint/format/check integration for Pi, including daemon startup and post-edit checks. | ⬇ 165/mo | 26d ago |
| [@pi-lab/input-history](https://www.npmjs.com/package/@pi-lab/input-history) | Cross-session input history navigation for pi coding agent | ⬇ 165/mo | 18d ago |
| [pi-ffmpeg](https://www.npmjs.com/package/pi-ffmpeg) | ffmpeg Swiss Army knife for pi — probe, transcode, trim, concat, GIF, frames, audio extract/mux, thumbnail, compress, speedup/slowdown | ⬇ 165/mo | 3mo ago |
| [pi-permission-layers](https://www.npmjs.com/package/pi-permission-layers) | Pi extension to handle permissions using a layered approach | ⬇ 165/mo | 9d ago |
| [pi-chrome-dev-tools](https://www.npmjs.com/package/pi-chrome-dev-tools) | Pi extension — lazy-launch Chrome with Playwright, persistent profile, stealth patches, simple browser tools | ⬇ 164/mo | 18d ago |
| [pi-cycle](https://www.npmjs.com/package/pi-cycle) | Pi extension: /cycle + hotkey cycles model+thinking profiles (OpenAI-focused) with a menu-based config UI for Pi coding agent. | ⬇ 163/mo | ~1mo ago |
| [pi-mac-tools](https://www.npmjs.com/package/pi-mac-tools) | macOS automation tools for Pi via Accessibility APIs and screenshots | ⬇ 163/mo | ~1mo ago |
| [pi-spec](https://www.npmjs.com/package/pi-spec) | Spec-driven development extension and resource package for Pi. | ⬇ 163/mo | 28d ago |
| [@gnoviawan/pi-session-delete](https://www.npmjs.com/package/@gnoviawan/pi-session-delete) | Interactive session deletion command for Pi. | ⬇ 162/mo | 26d ago |
| [@harlley/todomd](https://www.npmjs.com/package/@harlley/todomd) | todo.md — agentic task manager | ⬇ 161/mo | 26d ago |
| [@justestif/nb-agent](https://www.npmjs.com/package/@justestif/nb-agent) | nb-native personal wiki plugin with agent-powered ask and distill commands | ⬇ 161/mo | 29d ago |
| [pi-bmad-flow](https://www.npmjs.com/package/pi-bmad-flow) | Pi-native orchestration overlay for BMAD workflows | ⬇ 161/mo | ~1mo ago |
| [pi-mono-web-search](https://www.npmjs.com/package/pi-mono-web-search) | Pi extension for web search and page reading using DuckDuckGo and readability extraction | ⬇ 161/mo | 15d ago |
| [pi-permissions](https://www.npmjs.com/package/pi-permissions) | Configurable allow/deny permission rules for pi tool calls — control which bash commands, file reads, writes, and edits the agent can perform. | ⬇ 161/mo | 2mo ago |
| [pi-effect-harness](https://www.npmjs.com/package/pi-effect-harness) | a harness specifically for writing Effect v4 code | ⬇ 160/mo | 24d ago |
| [pi-model-selector-x](https://www.npmjs.com/package/pi-model-selector-x) | Enhances pi's /model selector with context window, cost, input modalities, protocol, and reasoning info | ⬇ 160/mo | 26d ago |
| [pi-session-name](https://www.npmjs.com/package/pi-session-name) | pi extension package that auto-generates a concise session title from the first user prompt. | ⬇ 160/mo | 7d ago |
| [@artale/pi-bundle](https://www.npmjs.com/package/@artale/pi-bundle) | The essential Pi extension bundle by artale. One install, 10 best extensions. Context management, memory, safety, productivity. | ⬇ 159/mo | ~1mo ago |
| [pi-igotchu](https://www.npmjs.com/package/pi-igotchu) | Cheap-first drift monitor for pi (command: /yo). Nudges only at 95+ confidence. | ⬇ 159/mo | ~1mo ago |
| [pi-oneliner](https://www.npmjs.com/package/pi-oneliner) | One-line sticky footer extension for pi coding agent. | ⬇ 157/mo | ~1mo ago |
| [pi-window-title](https://www.npmjs.com/package/pi-window-title) | Automatically manage pi session titles and tmux window titles for coding sessions | ⬇ 157/mo | ~1mo ago |
| [@adidoes/pi-meep](https://www.npmjs.com/package/@adidoes/pi-meep) | Play a short notification sound when pi finishes responding. | ⬇ 155/mo | 20d ago |
| [@sysid/pi-vim](https://www.npmjs.com/package/@sysid/pi-vim) | OS + app sandboxing extension for the pi coding agent | ⬇ 154/mo | ~1mo ago |
| [pi-chucknorris](https://www.npmjs.com/package/pi-chucknorris) | Latency-gated Chuck Norris jokes while pi is thinking (before the first token). | ⬇ 154/mo | ~1mo ago |
| [pi-pilot](https://www.npmjs.com/package/pi-pilot) | A Copilot Autopilot-inspired workflow: research, subagent exploration, questions, plan and execute. | ⬇ 154/mo | 25d ago |
| [pi-verifier-agent](https://www.npmjs.com/package/pi-verifier-agent) | Pi Verifier Agent — a second read-only Pi agent that verifies builder output and feeds back concrete corrections. | ⬇ 154/mo | 16d ago |
| [@harrypan-12138/pi-superpower](https://www.npmjs.com/package/@harrypan-12138/pi-superpower) | Superpower workflow extension for pi coding agent — Scout→Think→Plan→Implement→Review→Debug pipeline with 8 specialized subagent tools and 15 skills | ⬇ 153/mo | 15d ago |
| [@rhedbull/pi-permissions](https://www.npmjs.com/package/@rhedbull/pi-permissions) | Claude Code-style permission modes for pi. Controls approval for file writes, edits, and bash commands with four modes: default, acceptEdits, fullAuto, and bypassPermissions. | ⬇ 153/mo | 3mo ago |
| [askweb](https://www.npmjs.com/package/askweb) | Unified web search and read provider for agents and CLI. | ⬇ 153/mo | 3d ago |
| [pi-autoskills](https://www.npmjs.com/package/pi-autoskills) | Audited autoskills-style installer for pi. Detect stack, discover vetted skills, audit upstream bundles, cache locally, install safely. | ⬇ 153/mo | 22d ago |
| [pi-turn-limit](https://www.npmjs.com/package/pi-turn-limit) | Pi coding agent extension to limit number of turns taken by a model | ⬇ 153/mo | 28d ago |
| [@manojlds/ralphi](https://www.npmjs.com/package/@manojlds/ralphi) | Pi-native ralph extension with skill commands and fresh-context loop sessions. | ⬇ 152/mo | 3mo ago |
| [@artale/pi-stocks](https://www.npmjs.com/package/@artale/pi-stocks) | Stock market utilities | ⬇ 151/mo | ~1mo ago |
| [@bonsai-ai/pi-extension](https://www.npmjs.com/package/@bonsai-ai/pi-extension) | Bonsai provider extension for pi-coding-agent | ⬇ 151/mo | 3mo ago |
| [@ssweens/pi-leash](https://www.npmjs.com/package/@ssweens/pi-leash) | Security hooks for Pi to reduce accidental destructive actions and secret-file access. | ⬇ 151/mo | 6d ago |
| [pi-chatgpt-usage-status](https://www.npmjs.com/package/pi-chatgpt-usage-status) | Pi extension that shows ChatGPT 5h and weekly rate-limit usage in the status bar. | ⬇ 151/mo | 27d ago |
| [pi-diff](https://www.npmjs.com/package/pi-diff) | Tree-inspired pi extension for reviewing session and git diffs. | ⬇ 151/mo | 26d ago |
| [pi-git-worktrees](https://www.npmjs.com/package/pi-git-worktrees) | Parallel AI agent sessions using git worktrees for Pi — spawn, orchestrate, and gather results across multiple coding agents | ⬇ 151/mo | ~1mo ago |
| [@arcanemachine/pi-read](https://www.npmjs.com/package/@arcanemachine/pi-read) | Customizable read tool for Pi coding agent - configure default line/byte limits | ⬇ 150/mo | 22d ago |
| [@datspike/pi-runtime-info-extension](https://www.npmjs.com/package/@datspike/pi-runtime-info-extension) | Pi extension exposing verified runtime model, thinking level, and artifact metadata to agents. | ⬇ 150/mo | 5d ago |
| [@originintelligence/pi-figma](https://www.npmjs.com/package/@originintelligence/pi-figma) | pi extension: token-efficient Figma file access via REST. Never returns raw Figma JSON — every tool transforms to a compact, LLM-friendly shape and caches by file version. | ⬇ 150/mo | ~1mo ago |
| [pi-block-unknown-command](https://www.npmjs.com/package/pi-block-unknown-command) | A pi extension that blocks unknown slash commands before they reach the LLM. | ⬇ 150/mo | ~1mo ago |
| [pi-scroll](https://www.npmjs.com/package/pi-scroll) | Fast keyboard-driven Pi session history search with rich previews. | ⬇ 150/mo | today |
| [pi-sumopod-connector](https://www.npmjs.com/package/pi-sumopod-connector) | SumoPod AI models for Pi coding agent - One-command setup for all SumoPod models | ⬇ 150/mo | 22d ago |
| [@studiosunnyfield/pimagotchi](https://www.npmjs.com/package/@studiosunnyfield/pimagotchi) | Pimagotchi — tamagotchi virtual pet for pi coding agent. 18 animated species, behavior-based evolution, rarity system, and more. | ⬇ 149/mo | ~1mo ago |
| [fito-plugin](https://www.npmjs.com/package/fito-plugin) | Fito Plugin — fetch web content, extract knowledge components (execution facts, domain concepts, usage scenarios) from API/tool documentation, and generate content for social networks. | ⬇ 149/mo | 13d ago |
| [pi-code-reviewer](https://www.npmjs.com/package/pi-code-reviewer) | Pi-installable code review skill package. | ⬇ 149/mo | ~1mo ago |
| [pi-modalmotion](https://www.npmjs.com/package/pi-modalmotion) | Vim-inspired modal editing and motion experiments for pi's input editor. | ⬇ 149/mo | 26d ago |
| [@lukemelnik/pi-model-prompt](https://www.npmjs.com/package/@lukemelnik/pi-model-prompt) | A Pi extension for global per-model prompt addenda and model prompt tools. | ⬇ 148/mo | ~1mo ago |
| [@lumendigitaldev/pi-wsl-images](https://www.npmjs.com/package/@lumendigitaldev/pi-wsl-images) | [Alt+V] WSL image paste support for pi using the Windows clipboard | ⬇ 148/mo | 4d ago |
| [devkit-pi](https://www.npmjs.com/package/devkit-pi) | Personal all-in-one pi coding toolkit: subagents, web research, LSP code intelligence, and developer commands | ⬇ 148/mo | 14d ago |
| [@ctogg/pi-cost-counter](https://www.npmjs.com/package/@ctogg/pi-cost-counter) | Pi extension that tracks LLM API costs across all sessions with daily JSONL logging and a /cost command | ⬇ 147/mo | 17d ago |
| [pi-annotated-review](https://www.npmjs.com/package/pi-annotated-review) | Pi extension that creates annotated HTML code-review pages for git changes. | ⬇ 146/mo | 14d ago |
| [@robhowley/pi-spinner-verbs](https://www.npmjs.com/package/@robhowley/pi-spinner-verbs) | > "Thinking..." is the most boring thing a genius could say. | ⬇ 145/mo | 26d ago |
| [omniroute-pi-ext-integration](https://www.npmjs.com/package/omniroute-pi-ext-integration) | Pi Coding Agent extension for OmniRoute — view combos, browse providers, and sync models with enriched metadata (context windows, max tokens, reasoning, and vision) to the Ctrl+P picker | ⬇ 145/mo | 13d ago |
| [pi-retune](https://www.npmjs.com/package/pi-retune) | One-command session renamer toggle for pi (retune/restore). | ⬇ 145/mo | ~1mo ago |
| [pi-prefer-rg](https://www.npmjs.com/package/pi-prefer-rg) | A pi extension that teaches the agent to prefer ripgrep over grep. | ⬇ 144/mo | ~1mo ago |
| [pi-shit](https://www.npmjs.com/package/pi-shit) | Personal Pi package bundling extensions, skills, and Rose Pine themes | ⬇ 144/mo | ~1mo ago |
| [@artale/pi-budget](https://www.npmjs.com/package/@artale/pi-budget) | LLM budget alerts: track spend, alert limits, prevent bill shock | ⬇ 143/mo | ~1mo ago |
| [@marcfargas/pi-powershell](https://www.npmjs.com/package/@marcfargas/pi-powershell) | PowerShell tool for pi agents - Windows system integration and background processes | ⬇ 143/mo | 3mo ago |
| [pi-codex-5.5](https://www.npmjs.com/package/pi-codex-5.5) | Extra LLM models for pi (OpenAI Codex GPT-5.5). | ⬇ 143/mo | ~1mo ago |
| [pi-doom](https://www.npmjs.com/package/pi-doom) | Play DOOM in your terminal with pi | ⬇ 143/mo | 4mo ago |
| [@fingerskier/pi-theology](https://www.npmjs.com/package/@fingerskier/pi-theology) | Exegetical theology research skills for Pi | ⬇ 142/mo | 18d ago |
| [@supierior/pi-rules](https://www.npmjs.com/package/@supierior/pi-rules) | Pi package for generating, injecting, and maintaining path-scoped project rules in .pi/rules. | ⬇ 142/mo | 14d ago |
| [pi-julia](https://www.npmjs.com/package/pi-julia) | Julia TTFX eliminator for pi — persistent DaemonMode server + exec tools | ⬇ 142/mo | 15d ago |
| [pi-lcm](https://www.npmjs.com/package/pi-lcm) | Lossless Context Management for Pi — DAG-based summarization with full history recovery | ⬇ 142/mo | ~1mo ago |
| [pi-lightpanda-extension](https://www.npmjs.com/package/pi-lightpanda-extension) | Pi extension exposing Lightpanda web tools plus Playwright-backed real visual screenshots. | ⬇ 142/mo | 14d ago |
| [pi-symphony](https://www.npmjs.com/package/pi-symphony) | Unattended issue orchestration for Pi — polls Linear, spawns workers, manages PRs | ⬇ 142/mo | 2mo ago |
| [@artale/pi-git-guard](https://www.npmjs.com/package/@artale/pi-git-guard) | Git safety guard: protect branches, scan secrets, prevent mistakes | ⬇ 141/mo | ~1mo ago |
| [@jd-erreape/pi-questionnaire](https://www.npmjs.com/package/@jd-erreape/pi-questionnaire) | Pi package providing an interactive questionnaire extension/tool. | ⬇ 141/mo | ~1mo ago |
| [@marcfargas/skills](https://www.npmjs.com/package/@marcfargas/skills) | Reusable AI agent skills for pi, Claude Code, Cursor, and any Agent Skills compatible agent | ⬇ 141/mo | 3mo ago |
| [pi-clawd](https://www.npmjs.com/package/pi-clawd) | Clawd on Desk integration for the pi coding agent | ⬇ 141/mo | 27d ago |
| [pi-proxy](https://www.npmjs.com/package/pi-proxy) | Smart proxy routing extension for pi - rule-based direct/proxy/fallback per domain | ⬇ 141/mo | 11d ago |
| [tokenfactory-pi](https://www.npmjs.com/package/tokenfactory-pi) | Nebius Token Factory provider extension for pi coding agent. Requires `npm install -g @mariozechner/pi-coding-agent`. Install with `pi install npm:tokenfactory-pi` | ⬇ 141/mo | 3mo ago |
| [@dreadedzombie/pi-init](https://www.npmjs.com/package/@dreadedzombie/pi-init) | Generates a typed AGENTS.md for your project — /init, /init research, /init debug, /init code | ⬇ 140/mo | ~1mo ago |
| [@sage-protocol/pi-adapter](https://www.npmjs.com/package/@sage-protocol/pi-adapter) | Sage Protocol MCP integration for pi coding agent | ⬇ 140/mo | ~1mo ago |
| [pi-brain](https://www.npmjs.com/package/pi-brain) | Versioned memory extension for the pi coding agent | ⬇ 140/mo | 3mo ago |
| [pi-extension-too-dumb](https://www.npmjs.com/package/pi-extension-too-dumb) | A pi extension that warns when session reasoning ability may be compromised | ⬇ 140/mo | 11d ago |
| [pi-replay](https://www.npmjs.com/package/pi-replay) | Replay Pi session JSONL files in terminal using Pi's TUI rendering style | ⬇ 140/mo | 24d ago |
| [pi-live](https://www.npmjs.com/package/pi-live) | Expose the current Pi Coding Agent session through a protected live web app. | ⬇ 139/mo | 14d ago |
| [pi-session-router](https://www.npmjs.com/package/pi-session-router) | Pi extension that lets the model present two visual variants and collect a user preference through an interactive A/B picker | ⬇ 139/mo | 25d ago |
| [pi-thinking-hotkeys](https://www.npmjs.com/package/pi-thinking-hotkeys) | Pi extension for Codex-style directional thinking effort hotkeys | ⬇ 138/mo | 21d ago |
| [pi-vim-motions](https://www.npmjs.com/package/pi-vim-motions) | Vim-style motion extension for Pi. | ⬇ 138/mo | today |
| [think-tags](https://www.npmjs.com/package/think-tags) | Pi extension that splits tags into collapsible thinking blocks in assistant messages | ⬇ 138/mo | ~1mo ago |
| [pi-image-preview](https://www.npmjs.com/package/pi-image-preview) | Image preview extension for pi coding agent — renders inline image thumbnails above the editor using kitty graphics protocol with tmux support | ⬇ 137/mo | ~1mo ago |
| [@wissem_hajbi/pi-nointl](https://www.npmjs.com/package/@wissem_hajbi/pi-nointl) | pi package for scanning Next.js projects for untranslated strings with nointl | ⬇ 136/mo | 12d ago |
| [pi-chroma](https://www.npmjs.com/package/pi-chroma) | A Pi extension that indexes your local TypeScript/TSX codebase into Chroma Cloud, enabling semantic and symbol-based code retrieval directly within Pi's agent loop. | ⬇ 136/mo | 15d ago |
| [pi-wakatime](https://www.npmjs.com/package/pi-wakatime) | WakaTime plugin for Pi Coding Agent | ⬇ 136/mo | 2d ago |
| [risette](https://www.npmjs.com/package/risette) | Opinionated pi-coding-agent CLI: financial news + safety extensions + playwright skill, one install. | ⬇ 136/mo | 20d ago |
| [@reqall/pi-plugin](https://www.npmjs.com/package/@reqall/pi-plugin) | Reqall plugin for Pi — persistent semantic memory for AI agents | ⬇ 135/mo | 17d ago |
| [pi-agents-local](https://www.npmjs.com/package/pi-agents-local) | Pi extension that loads AGENTS.local.md as private project instructions. | ⬇ 135/mo | 23d ago |
| [pi-edit-replace-all](https://www.npmjs.com/package/pi-edit-replace-all) | Pi package that overrides the edit tool with replaceAll support. | ⬇ 135/mo | 2mo ago |
| [pi-gpt-cache](https://www.npmjs.com/package/pi-gpt-cache) | Pi extension that adds prompt_cache_key to OpenAI Responses API requests for better prompt caching. | ⬇ 135/mo | 14d ago |
| [pi-processes-git-bash](https://www.npmjs.com/package/pi-processes-git-bash) | ![banner](https://assets.aliou.me/pi-extensions/banners/pi-processes.png) | ⬇ 135/mo | 8d ago |
| [@tomooshi/caveman-milk-pi](https://www.npmjs.com/package/@tomooshi/caveman-milk-pi) | pi extension that injects caveman terseness rules into the system prompt. Cache-safe, opt-in, plays nicely with condensed-milk and pi-vcc. | ⬇ 134/mo | ~1mo ago |
| [pi-questions-helper](https://www.npmjs.com/package/pi-questions-helper) | Answer questions from lengthy pi agent responses in an interactive widget. | ⬇ 134/mo | 16d ago |
| [@fingerskier/pi-email](https://www.npmjs.com/package/@fingerskier/pi-email) | Planning skill for the legacy Claude email extension concept, ported as a Pi skill placeholder | ⬇ 133/mo | 18d ago |
| [@marcfargas/odoo-skills](https://www.npmjs.com/package/@marcfargas/odoo-skills) | Battle-tested Odoo knowledge modules for AI agents — 5,200+ lines validated against Odoo v17 in CI | ⬇ 133/mo | 2mo ago |
| [@pi-lab/notify](https://www.npmjs.com/package/@pi-lab/notify) | Desktop notification extension for pi coding agent | ⬇ 133/mo | 17d ago |
| [@zackify/pi-sambanova](https://www.npmjs.com/package/@zackify/pi-sambanova) | A pi extension that adds SambaNova as an OpenAI-compatible model provider. | ⬇ 133/mo | 20d ago |
| [pi-discord-presence](https://www.npmjs.com/package/pi-discord-presence) | Discord Rich Presence extension for pi coding agent. | ⬇ 133/mo | 15d ago |
| [pi-minimax-pack](https://www.npmjs.com/package/pi-minimax-pack) | Pi agent harness with policy gates, project detection, verification loop, drift protection, artifact validation, and runtime enforcement for weak models | ⬇ 133/mo | 10d ago |
| [@nonplanarslicer/pi-tps](https://www.npmjs.com/package/@nonplanarslicer/pi-tps) | Show live TPS in the pi-coding-agent status bar without overwriting it | ⬇ 132/mo | 25d ago |
| [pi-blue-minimal-header](https://www.npmjs.com/package/pi-blue-minimal-header) | A blue minimal custom header and footer for pi | ⬇ 132/mo | 8d ago |
| [pi-in-zellij](https://www.npmjs.com/package/pi-in-zellij) | Pi extension for zellij — multi-pane communication, delegate, editor | ⬇ 132/mo | yesterday |
| [pi-soccer-widget](https://www.npmjs.com/package/pi-soccer-widget) | Pi widget for tracking a favorite soccer team with standings, recent results, and upcoming matches. | ⬇ 132/mo | today |
| [@artale/pi-ye](https://www.npmjs.com/package/@artale/pi-ye) | Ye notification sounds. Its almost like they cant tell that I got money. Pablo. | ⬇ 131/mo | 19d ago |
| [@code-fixer-23/pi-bash-tooljack-nu](https://www.npmjs.com/package/@code-fixer-23/pi-bash-tooljack-nu) | Pi extension that hijacks the bash tool and routes it through Nushell | ⬇ 131/mo | today |
| [@the-forge-flow/visual-explainer-pi](https://www.npmjs.com/package/@the-forge-flow/visual-explainer-pi) | PI extension for generating beautiful HTML visualizations of diagrams, architecture, and data | ⬇ 131/mo | ~1mo ago |
| [pi-skill-dollar](https://www.npmjs.com/package/pi-skill-dollar) | Dollar-sign autocomplete shortcut for pi Agent Skills | ⬇ 131/mo | 18d ago |
| [pi-browser-debug](https://www.npmjs.com/package/pi-browser-debug) | Pi extension for debugging active browser sessions via Chrome DevTools Protocol | ⬇ 130/mo | 20d ago |
| [pi-initiatives](https://www.npmjs.com/package/pi-initiatives) | Initiative and project tracker for pi — manage initiatives, todos, and PRs with a split-panel TUI and LLM-callable tools. | ⬇ 130/mo | ~1mo ago |
| [pi-prompt-enhancer](https://www.npmjs.com/package/pi-prompt-enhancer) | Enhance prompts with a configurable dedicated model — fork of @danchamorro/pi-prompt-enhancer | ⬇ 130/mo | ~1mo ago |
| [@artale/pi-music](https://www.npmjs.com/package/@artale/pi-music) | Music notification sounds. Rock, Pop, Jazz, Country, EDM. | ⬇ 129/mo | 19d ago |
| [pi-container-sandbox](https://www.npmjs.com/package/pi-container-sandbox) | AI-powered web search using Tavily API for pi coding-agent | ⬇ 129/mo | 26d ago |
| [pi-headroom](https://www.npmjs.com/package/pi-headroom) | Transparent LLM context compression for Pi using Headroom | ⬇ 129/mo | ~1mo ago |
| [pi-shell-autocomplete](https://www.npmjs.com/package/pi-shell-autocomplete) | Shell command autocomplete extension for pi with zsh native completions and local AI ghost text. | ⬇ 129/mo | 23d ago |
| [9router-pi-ext-integration](https://www.npmjs.com/package/9router-pi-ext-integration) | Pi Coding Agent extension for 9router — manage combos, browse providers, track limits, and see which model actually served each response in the status bar | ⬇ 128/mo | 14d ago |
| [pi-bash-to-ps](https://www.npmjs.com/package/pi-bash-to-ps) | pi extension that transpiles LLM-generated bash commands to PowerShell on Windows | ⬇ 128/mo | 7d ago |
| [pi-icompact](https://www.npmjs.com/package/pi-icompact) | Interactive compaction extension for pi — sort session context into categories and choose how to summarize each one | ⬇ 128/mo | ~1mo ago |
| [pi-local-rag](https://www.npmjs.com/package/pi-local-rag) | Hybrid RAG pipeline for the Pi coding agent. BM25 + local vector embeddings (Transformers.js) + auto-injection into LLM context. Zero cloud dependency. | ⬇ 128/mo | ~1mo ago |
| [pi-spawn](https://www.npmjs.com/package/pi-spawn) | Minimal subagent extension for pi — one tool, one prompt, orchestrator-driven concurrency | ⬇ 128/mo | 16d ago |
| [pi-gitnexus-plus](https://www.npmjs.com/package/pi-gitnexus-plus) | GitNexus knowledge graph integration for pi — enriches searches with call chains, execution flows, and blast radius. Supports stdio and HTTP transports. | ⬇ 127/mo | 8d ago |
| [@thesethrose/pi-zai-provider](https://www.npmjs.com/package/@thesethrose/pi-zai-provider) | Z.AI (GLM models) provider extension for pi coding agent with API key authentication | ⬇ 126/mo | ~1mo ago |
| [pi-skills-sh](https://www.npmjs.com/package/pi-skills-sh) | Browse, install & manage skills.sh skills from inside pi | ⬇ 126/mo | 2mo ago |
| [pi-telegram-group-topic](https://www.npmjs.com/package/pi-telegram-group-topic) | Control multiple pi sessions from Telegram forum topics | ⬇ 126/mo | 20d ago |
| [@fingerskier/pi-terse](https://www.npmjs.com/package/@fingerskier/pi-terse) | Ultra-compressed terse communication mode for Pi | ⬇ 125/mo | 18d ago |
| [@jonghyun/pi-playwright-browser](https://www.npmjs.com/package/@jonghyun/pi-playwright-browser) | Playwright browser automation extension for pi - runs Chromium in Microsoft Docker container in headless mode | ⬇ 125/mo | 12d ago |
| [pi-agent-shell](https://www.npmjs.com/package/pi-agent-shell) | High-performance interactive shell extension for pi — OS-level read-block detection gives agents a single turn() primitive with no polling or timing heuristics | ⬇ 125/mo | 18d ago |
| [pi-augment](https://www.npmjs.com/package/pi-augment) | Augment-style prompt rewriter for Pi — one command, stronger prompts | ⬇ 125/mo | ~1mo ago |
| [pi-done](https://www.npmjs.com/package/pi-done) | Pi package that adds a /done command to reset to the default git branch, pull, and start a new session. | ⬇ 125/mo | 17d ago |
| [pi-epic-pipeline](https://www.npmjs.com/package/pi-epic-pipeline) | BMAD Epic Pipeline orchestrator for pi — autonomous story execution through create, dev, review, and gate phases | ⬇ 125/mo | 25d ago |
| [@ntimpano/pi-flint](https://www.npmjs.com/package/@ntimpano/pi-flint) | flint memory tools for Pi coding agent — save, recall, get, and list notes via local SQLite | ⬇ 124/mo | 2d ago |
| [@pborck/pi-de](https://www.npmjs.com/package/@pborck/pi-de) | IDE integration for pi coding agent - shows current file/selection from VS Code, JetBrains, etc. | ⬇ 124/mo | 3mo ago |
| [pi-daily-cost](https://www.npmjs.com/package/pi-daily-cost) | Daily spend tracker for the Pi coding agent — shows total API cost across all of today's sessions in the footer status bar | ⬇ 124/mo | 12d ago |
| [pi-quarkus](https://www.npmjs.com/package/pi-quarkus) | Quarkus extension for pi — dev-mode management via quarkus-agent-mcp | ⬇ 124/mo | 2d ago |
| [pi-remote](https://www.npmjs.com/package/pi-remote) | Remote control extension for pi coding agent with HTTP/WebSocket API | ⬇ 124/mo | yesterday |
| [pi-role](https://www.npmjs.com/package/pi-role) | Role primitive extension for the pi coding agent. Registers a single `delegate` tool that hands a task off to an in-process child AgentSession configured by a roles/*.md profile (scout, researcher, na | ⬇ 124/mo | 6d ago |
| [pi-tmux-harness](https://www.npmjs.com/package/pi-tmux-harness) | Pi extension exposing tmux as native tools — drive other TUIs (pi, claude, copilot CLI, lazygit, etc.) for adversarial testing without fragile sleep+grep loops. | ⬇ 124/mo | 21d ago |
| [pi-tmux-subagents](https://www.npmjs.com/package/pi-tmux-subagents) | Pi extension for Markdown-defined, tmux-backed subagents and parallel coding-agent delegation | ⬇ 124/mo | 12d ago |
| [@artale/pi-workflow](https://www.npmjs.com/package/@artale/pi-workflow) | Simple workflow/task chaining | ⬇ 123/mo | ~1mo ago |
| [pi-faithless-subagents](https://www.npmjs.com/package/pi-faithless-subagents) | PI-native constrained subagent orchestration library | ⬇ 123/mo | ~1mo ago |
| [pi-fetch](https://www.npmjs.com/package/pi-fetch) | Efficient web fetch tool for Pi | ⬇ 123/mo | ~1mo ago |
| [pi-prior](https://www.npmjs.com/package/pi-prior) | Pi extension for project-local learned context priors. | ⬇ 123/mo | 20d ago |
| [pi-provider-quota](https://www.npmjs.com/package/pi-provider-quota) | Track Z.Ai, Kimi Code, Ollama Cloud, and DeepSeek quota in pi's status bar | ⬇ 123/mo | 19d ago |
| [pi-skills-manager](https://www.npmjs.com/package/pi-skills-manager) | Interactive skill manager for Pi — enable/disable skills with a pi-config-style UI | ⬇ 123/mo | ~1mo ago |
| [@amb007/deep-wiki](https://www.npmjs.com/package/@amb007/deep-wiki) | AI-powered wiki generator for code repositories - Pi Coding Agent skill | ⬇ 122/mo | today |
| [@artale/pi-marketing](https://www.npmjs.com/package/@artale/pi-marketing) | SEO tools, social posting, analytics | ⬇ 122/mo | ~1mo ago |
| [@artale/pi-quant](https://www.npmjs.com/package/@artale/pi-quant) | Trading data, portfolio analysis, backtesting | ⬇ 122/mo | ~1mo ago |
| [pi-konjac](https://www.npmjs.com/package/pi-konjac) | Pi coding agent input translation extension using Bergamot language pair models. | ⬇ 122/mo | 9d ago |
| [pi-macos-cua](https://www.npmjs.com/package/pi-macos-cua) | Pi extension that lets Pi drive local macOS apps through cua-driver. | ⬇ 122/mo | 18d ago |
| [pi-see](https://www.npmjs.com/package/pi-see) | Vision proxy extension for pi — lets any model describe images, screenshots, diagrams and more | ⬇ 121/mo | 16d ago |
| [@artale/pi-browser](https://www.npmjs.com/package/@artale/pi-browser) | Browser automation for Pi using browser-use patterns | ⬇ 120/mo | ~1mo ago |
| [@artale/pi-cole](https://www.npmjs.com/package/@artale/pi-cole) | J. Cole notification sounds. Love yourz, no role modelz. Dreamville. | ⬇ 120/mo | 19d ago |
| [@the-forge-flow/hippo-memory-pi](https://www.npmjs.com/package/@the-forge-flow/hippo-memory-pi) | PI extension for biologically-inspired long-term memory, powered by hippo-memory | ⬇ 120/mo | ~1mo ago |
| [pi-init](https://www.npmjs.com/package/pi-init) | A pi agent skill to initialize or update AGENTS.md context files. | ⬇ 120/mo | 3mo ago |
| [pi-remote-agent](https://www.npmjs.com/package/pi-remote-agent) | Secure remote agent bridge for pi — delegate tasks to another pi instance over Tailscale. Includes /ask-agent command and ask_remote_agent tool for LLM-driven delegation. | ⬇ 120/mo | 20d ago |
| [@fingerskier/pi-collab-ext](https://www.npmjs.com/package/@fingerskier/pi-collab-ext) | Sequential multi-model collaboration workflows for Pi | ⬇ 119/mo | 13d ago |
| [@grayolson/pi-treebase](https://www.npmjs.com/package/@grayolson/pi-treebase) | Interactive-rebase style tree navigation for pi sessions. | ⬇ 119/mo | 15d ago |
| [@hmg_ai/pi-agent](https://www.npmjs.com/package/@hmg_ai/pi-agent) | HMG memory adapter for the pi coding agent | ⬇ 119/mo | 2d ago |
| [@tryinget/pi-extensions-package-template](https://www.npmjs.com/package/@tryinget/pi-extensions-package-template) | Copier template + CLI for bootstrapping production-ready pi extension packages inside a monorepo | ⬇ 119/mo | 3mo ago |
| [pi-executor](https://www.npmjs.com/package/pi-executor) | Pi extension to run executor | ⬇ 119/mo | ~1mo ago |
| [pi-grok-oauth](https://www.npmjs.com/package/pi-grok-oauth) | Pi extension that adds xAI Grok OAuth provider and xAI utility tools. | ⬇ 118/mo | 8d ago |
| [pi-model-flash](https://www.npmjs.com/package/pi-model-flash) | Pi extension that flashes the current model name in BIG block letters when you cycle models with Ctrl+P. | ⬇ 118/mo | 7d ago |
| [pi-multirepo](https://www.npmjs.com/package/pi-multirepo) | Pi extension for multi-repo tasks — worktrees, MRs, and tracker integration in one command | ⬇ 118/mo | 24d ago |
| [pi-pai-lite](https://www.npmjs.com/package/pi-pai-lite) | Structured thinking modes and lightweight persistent memory for pi | ⬇ 118/mo | 4mo ago |
| [@aaronmaturen/pi-context7](https://www.npmjs.com/package/@aaronmaturen/pi-context7) | Context7 extension for pi - fetches up-to-date library documentation via context7.com | ⬇ 117/mo | 3mo ago |
| [pi-excalidraw](https://www.npmjs.com/package/pi-excalidraw) | A pi package that provides a locally hosted Excalidraw canvas plus AI-callable diagramming tools. | ⬇ 117/mo | 2mo ago |
| [pi-file-permissions](https://www.npmjs.com/package/pi-file-permissions) | Pi extension that enforces file-level permissions via a YAML config. Controls which paths each tool (read, write, edit, find, grep, ls) can access. | ⬇ 117/mo | ~1mo ago |
| [@artale/pi-anthropic](https://www.npmjs.com/package/@artale/pi-anthropic) | Anthropic API utilities | ⬇ 116/mo | ~1mo ago |
| [@artale/pi-continuous](https://www.npmjs.com/package/@artale/pi-continuous) | Learn from session history | ⬇ 116/mo | ~1mo ago |
| [pi-token-usage](https://www.npmjs.com/package/pi-token-usage) | Pi extension for lifetime token usage tracking and cost analytics across all sessions | ⬇ 116/mo | ~1mo ago |
| [pi-verbosity-control](https://www.npmjs.com/package/pi-verbosity-control) | Per-model OpenAI verbosity control for Pi with optional inline footer display | ⬇ 116/mo | ~1mo ago |
| [@artale/pi-video](https://www.npmjs.com/package/@artale/pi-video) | Generate videos programmatically with Pi. React-based video generation. | ⬇ 115/mo | 20d ago |
| [@m64/pi-screenshot-tools](https://www.npmjs.com/package/@m64/pi-screenshot-tools) | Screenshot skill and inline screenshot extension for pi | ⬇ 115/mo | ~1mo ago |
| [@vaayne/pi-rules](https://www.npmjs.com/package/@vaayne/pi-rules) | Reusable skills and extensions for Pi coding agent | ⬇ 115/mo | 4mo ago |
| [pi-figma-mcp](https://www.npmjs.com/package/pi-figma-mcp) | Pi package that connects Pi to the Figma desktop MCP server and exposes Figma design tools inside Pi. | ⬇ 115/mo | ~1mo ago |
| [pi-todo-md](https://www.npmjs.com/package/pi-todo-md) | A shareable pi extension for managing a repo-local TODO.md file. | ⬇ 115/mo | ~1mo ago |
| [observal-pi](https://www.npmjs.com/package/observal-pi) | Observal session telemetry for Pi — zero-dependency extension that pushes session traces to your Observal server | ⬇ 114/mo | today |
| [pi-cavallo](https://www.npmjs.com/package/pi-cavallo) | Generate and edit video in pi using Alibaba HappyHorse models (I2V, T2V, R2V, Video-Edit). | ⬇ 114/mo | 3d ago |
| [pi-openai-switcher](https://www.npmjs.com/package/pi-openai-switcher) | pi extension that switches ChatGPT Codex accounts when 5h or 1w usage limits are exhausted | ⬇ 114/mo | ~1mo ago |
| [pi-session-name-border](https://www.npmjs.com/package/pi-session-name-border) | Show the current Pi session name on the prompt editor border. | ⬇ 114/mo | 14d ago |
| [pi-system-theme](https://www.npmjs.com/package/pi-system-theme) | Sync Pi theme with macOS light/dark appearance | ⬇ 114/mo | 3mo ago |
| [pi-toolbox](https://www.npmjs.com/package/pi-toolbox) | A comprehensive extension toolkit for the Pi Coding Agent — 17 extensions, 11 themes, skills, agents, and team orchestration templates | ⬇ 114/mo | ~1mo ago |
| [pi-voice-loop](https://www.npmjs.com/package/pi-voice-loop) | Pi extension package for voice-loop operation with provider-backed speech in Pi. | ⬇ 114/mo | 18d ago |
| [pi-worktree](https://www.npmjs.com/package/pi-worktree) | Git worktree management for Pi — create isolated workspaces with one command, optionally launch in cmux/tmux. | ⬇ 114/mo | 2mo ago |
| [@artale/pi-pentest](https://www.npmjs.com/package/@artale/pi-pentest) | Security scanning: nmap wrapper, vulnerability checks | ⬇ 113/mo | ~1mo ago |
| [pi-beads-extension](https://www.npmjs.com/package/pi-beads-extension) | Pi package that brings Beads-style task tracking commands and workflow context to pi. | ⬇ 113/mo | ~1mo ago |
| [pi-copy-response](https://www.npmjs.com/package/pi-copy-response) | Pi package for copying the latest assistant response with a code-block picker, live preview, and optional /copy override | ⬇ 113/mo | ~1mo ago |
| [pi-glossary](https://www.npmjs.com/package/pi-glossary) | Pi extension that lazy-loads glossary definitions into the system prompt when prompts mention matching terms | ⬇ 113/mo | 25d ago |
| [pi-hero](https://www.npmjs.com/package/pi-hero) | Pi Agent Suite, providing a series of functional modules out of the box. | ⬇ 113/mo | yesterday |
| [pi-rules](https://www.npmjs.com/package/pi-rules) | PI extension that injects markdown rules for any pi tool, including custom registered tools | ⬇ 113/mo | 13d ago |
| [pi-ssh](https://www.npmjs.com/package/pi-ssh) | pi extension for local-model plus remote SSH workspace tool execution | ⬇ 113/mo | ~1mo ago |
| [@artale/pi-swarm](https://www.npmjs.com/package/@artale/pi-swarm) | Simple parallel task execution | ⬇ 112/mo | ~1mo ago |
| [@hewliyang/pi-codex-image](https://www.npmjs.com/package/@hewliyang/pi-codex-image) | Pi extension that exposes OpenAI's hosted image_generation tool to any model, authenticated via the openai-codex (ChatGPT Plus/Pro) OAuth credential. | ⬇ 112/mo | 23d ago |
| [pi-session-name-editor](https://www.npmjs.com/package/pi-session-name-editor) | Pi extension that shows a context-aware label in the editor border and a custom footer with token stats | ⬇ 112/mo | 25d ago |
| [@artale/pi-web-search](https://www.npmjs.com/package/@artale/pi-web-search) | Simple web search | ⬇ 111/mo | ~1mo ago |
| [pi-realtime](https://www.npmjs.com/package/pi-realtime) | Pi extension for pi-realtime. | ⬇ 111/mo | 5d ago |
| [pi-rustdex](https://www.npmjs.com/package/pi-rustdex) | Pi extension for RustDex - universal code indexer and semantic search | ⬇ 111/mo | ~1mo ago |
| [pi-theme-flip](https://www.npmjs.com/package/pi-theme-flip) | Pi package adding a non-blocking command to toggle light and dark themes | ⬇ 111/mo | 13d ago |
| [pithings-pi-vscode](https://github.com/pithings/pi-vscode) | Minimal VS Code extension for PI Coding Agent. | ⭐111 | ~1mo ago |
| [pi-bash-confirm](https://www.npmjs.com/package/pi-bash-confirm) | Pi package for confirming bash commands before execution with Telegram notifications | ⬇ 110/mo | ~1mo ago |
| [pi-llm-wiki](https://www.npmjs.com/package/pi-llm-wiki) | A Pi package for persistent markdown wikis with source capture, generated metadata, linting, and an LLM wiki-maintainer skill. | ⬇ 110/mo | ~1mo ago |
| [@artale/pi-agentic](https://www.npmjs.com/package/@artale/pi-agentic) | Portable agent patterns from agentic-stack: memory, skills, protocols | ⬇ 109/mo | ~1mo ago |
| [@firstpick/pi-extension-setup-skills](https://www.npmjs.com/package/@firstpick/pi-extension-setup-skills) | Interactive Pi command to enable or disable local skills from a multi-selection list. | ⬇ 109/mo | 3d ago |
| [@georgetsouvaltzis/pi-gpt-image](https://www.npmjs.com/package/@georgetsouvaltzis/pi-gpt-image) | Pi extension for GPT image generation using Pi's existing ChatGPT/Codex login. | ⬇ 109/mo | 23d ago |
| [pi-compaction-i18n](https://www.npmjs.com/package/pi-compaction-i18n) | Locale-aware compaction and branch summarization for pi | ⬇ 109/mo | today |
| [pi-deadloop](https://www.npmjs.com/package/pi-deadloop) | Detect and alert on agentic reasoning loops and tool call repetition in pi-coding-agent | ⬇ 109/mo | 5d ago |
| [@artale/pi-triage](https://www.npmjs.com/package/@artale/pi-triage) | Issue triage: auto-categorize, prioritize, route to labels | ⬇ 108/mo | ~1mo ago |
| [@artale/pi-fixes](https://www.npmjs.com/package/@artale/pi-fixes) | Auto-fix common errors: lint, format, type errors | ⬇ 107/mo | ~1mo ago |
| [@the-forge-flow/lightpanda-pi](https://www.npmjs.com/package/@the-forge-flow/lightpanda-pi) | PI extension for web search using Lightpanda headless browser | ⬇ 107/mo | ~1mo ago |
| [pi-cline-free-models](https://www.npmjs.com/package/pi-cline-free-models) | A Pi extension to use Cline models as a provider. | ⬇ 107/mo | 3mo ago |
| [pi-fallback-provider](https://www.npmjs.com/package/pi-fallback-provider) | Model fallback chain extension for pi — automatic retry and failover across AI providers | ⬇ 107/mo | ~1mo ago |
| [pi-github-identity](https://www.npmjs.com/package/pi-github-identity) | Run selected GitHub CLI actions from Pi through a separate bot identity. | ⬇ 107/mo | 17d ago |
| [@aemonculaba/pi-search](https://www.npmjs.com/package/@aemonculaba/pi-search) | Web search + fetch extension for pi (OpenAI search + Readability extraction) | ⬇ 106/mo | 3mo ago |
| [@artale/pi-infer](https://www.npmjs.com/package/@artale/pi-infer) | Minimum viable free-LLM gateway — stdlib-only Python, no Docker, ~700 LOC | ⬇ 105/mo | ~1mo ago |
| [@artale/pi-openai](https://www.npmjs.com/package/@artale/pi-openai) | OpenAI API utilities | ⬇ 105/mo | ~1mo ago |
| [@mjakl/pi-kagi-search](https://www.npmjs.com/package/@mjakl/pi-kagi-search) | Kagi search tool for Pi coding agent | ⬇ 105/mo | 3d ago |
| [pi-token-killer](https://www.npmjs.com/package/pi-token-killer) | Token Killer for Pi -- reduce LLM token consumption by 60-90% on common dev commands | ⬇ 105/mo | ~1mo ago |
| [@cglab/pi-rtk](https://www.npmjs.com/package/@cglab/pi-rtk) | RTK (Rust Token Killer) integration for pi — transparent bash command rewriting for 60-90% token savings | ⬇ 104/mo | 25d ago |
| [@artale/pi-huggingface](https://www.npmjs.com/package/@artale/pi-huggingface) | HuggingFace utilities | ⬇ 103/mo | ~1mo ago |
| [@firstpick/pi-extension-grill-me](https://www.npmjs.com/package/@firstpick/pi-extension-grill-me) | Deterministic design interview command and tools for Pi. | ⬇ 103/mo | 7d ago |
| [pi-skill-glab](https://www.npmjs.com/package/pi-skill-glab) | Pi skill for interacting with GitLab via the glab CLI | ⬇ 103/mo | 2mo ago |
| [pi-roasts](https://www.npmjs.com/package/pi-roasts) | A pi extension that roasts you while you code. | ⬇ 102/mo | 2d ago |
| [pi-shadow-git](https://www.npmjs.com/package/pi-shadow-git) | Git-based orchestration logging for pi subagents with Mission Control dashboard | ⬇ 102/mo | 4mo ago |
| [@artale/pi-email](https://www.npmjs.com/package/@artale/pi-email) | Email utilities | ⬇ 101/mo | ~1mo ago |
| [@artale/pi-seo](https://www.npmjs.com/package/@artale/pi-seo) | SEO utilities | ⬇ 101/mo | ~1mo ago |
| [@devkade/pi-opentelemetry](https://www.npmjs.com/package/@devkade/pi-opentelemetry) | OpenTelemetry trace + metrics + diagnostics extension for Pi Coding Agent | ⬇ 101/mo | 3mo ago |
| [@eigenwert/pi-gatekeeper](https://www.npmjs.com/package/@eigenwert/pi-gatekeeper) | Pi extension that gates file-mutating tool calls behind user approval with AST-based bash command analysis | ⬇ 101/mo | ~1mo ago |
| [FailproofAI-failproofai](https://github.com/FailproofAI/failproofai) | Runtime failure resolution for coding agents. Hooks into Claude Code and Codex. Catches loops, dangerous actions, and secret leaks before they become incidents. Zero latency. Runs locally. | ⭐101 | today |
| [pi-web-extension](https://www.npmjs.com/package/pi-web-extension) | A pi extension that adds web search and web fetch tools to the coding agent. | ⬇ 101/mo | 2mo ago |
| [@aboutlo/pi-smart-edit](https://www.npmjs.com/package/@aboutlo/pi-smart-edit) | A [pi](https://github.com/badlogic/pi) extension that overrides the built-in `edit` tool with whitespace-tolerant matching, designed for local/quantized LLMs. | ⬇ 100/mo | ~1mo ago |
| [@alexgorbatchev/pi-agentation](https://www.npmjs.com/package/@alexgorbatchev/pi-agentation) | pi extension launcher for Agentation Fork | ⬇ 100/mo | 2mo ago |
| [@blackbelt-technology/pi-anthropic-messages](https://www.npmjs.com/package/@blackbelt-technology/pi-anthropic-messages) | Anthropic-messages protocol bridge for pi. Activates for any anthropic-messages API session (Anthropic OAuth/API-key + proxy providers): canonicalizes lowercase pi core tools (read/write/bash/grep → R | ⬇ 100/mo | 9d ago |
| [@krone9/pi-superpowers](https://www.npmjs.com/package/@krone9/pi-superpowers) | Process-discipline skills bundle for pi (brainstorming, systematic debugging, TDD, plans, verification, worktrees, parallel agents). Inspired by Claude Code's superpowers plugin. | ⬇ 100/mo | 18d ago |
| [@rad-pi/core](https://www.npmjs.com/package/@rad-pi/core) | Deterministic Radicle agent tooling for pi | ⬇ 100/mo | 27d ago |
| [pi-notify-agent](https://www.npmjs.com/package/pi-notify-agent) | Cross-platform desktop notifications and sounds for pi-coding-agent | ⬇ 100/mo | ~1mo ago |
| [@banon-labs/pi-inline-format-extensions](https://www.npmjs.com/package/@banon-labs/pi-inline-format-extensions) | Host/plugin Pi package for inline heredoc formatting and semantic inspection. | ⬇ 99/mo | ~1mo ago |
| [@dxvapor/pi-prompt-enhancer](https://www.npmjs.com/package/@dxvapor/pi-prompt-enhancer) | Prompt enhancer with comparison popup, version history, searchable model picker, and quick-enhance mode | ⬇ 99/mo | 22d ago |
| [@jademind/pi-bridge](https://www.npmjs.com/package/@jademind/pi-bridge) | Minimal secure inbox bridge for Pi: reliable queued/steering message delivery to running sessions. | ⬇ 99/mo | 3mo ago |
| [@lustepe/pi-elixir](https://www.npmjs.com/package/@lustepe/pi-elixir) | Pi package for Elixir projects: Mix post-edit checks, Expert LSP bridge, commands, LLM tools, and Elixir/Phoenix/Ecto/OTP skills. | ⬇ 99/mo | 28d ago |
| [@artale/pi-voice](https://www.npmjs.com/package/@artale/pi-voice) | Voice input for Pi. Multi-provider STT with Deepgram streaming, Groq Whisper, OpenAI Whisper. 56+ languages. | ⬇ 98/mo | 2mo ago |
| [pi-dunnet](https://www.npmjs.com/package/pi-dunnet) | Play classic Emacs Dunnet text adventure inside pi — /dunnet | ⬇ 98/mo | ~1mo ago |
| [pi-serena-tools](https://www.npmjs.com/package/pi-serena-tools) | Pi now gains IDE-like editing capabilities by bridging Serena’s semantic code tools into native Pi tools. | ⬇ 98/mo | 3mo ago |
| [prateekmedia-claude-agent-sdk-pi](https://github.com/prateekmedia/claude-agent-sdk-pi) | Claude agent sdk as a provider for pi | ⭐98 | 9d ago |
| [@artale/pi-docker](https://www.npmjs.com/package/@artale/pi-docker) | Docker utilities | ⬇ 97/mo | ~1mo ago |
| [@capyup/pi-rtk](https://www.npmjs.com/package/@capyup/pi-rtk) | pi integration for rtk (Rust Token Killer) — transparently rewrites bash tool calls to rtk equivalents for 60-90% token savings. | ⬇ 97/mo | 14d ago |
| [@firstpick/pi-extension-nixos-wiki-local](https://www.npmjs.com/package/@firstpick/pi-extension-nixos-wiki-local) | Local NixOS/Nix documentation search and retrieval tools for Pi backed by minimal sparse clones of official repositories. | ⬇ 97/mo | 8d ago |
| [@furbyhaxx/pi-fancy-editor](https://www.npmjs.com/package/@furbyhaxx/pi-fancy-editor) | Pi extension that replaces the input editor with a responsive status-border editor and compact footer using the active pi theme. | ⬇ 97/mo | 12d ago |
| [@judepayne/picode](https://www.npmjs.com/package/@judepayne/picode) | A Pi package for disciplined, role-based coding workflows with mode switching, permissions, subagents, and prompt vars. | ⬇ 97/mo | 23d ago |
| [@prinova/pi-github-tools](https://www.npmjs.com/package/@prinova/pi-github-tools) | GitHub repository tools extension for pi-coding-agent | ⬇ 97/mo | 3mo ago |
| [pi-dex](https://www.npmjs.com/package/pi-dex) | Pi, but with Codex's UI — or at least as far as I can go before forking it. | ⬇ 97/mo | 3mo ago |
| [pi-git-status-line](https://www.npmjs.com/package/pi-git-status-line) | Shareable Pi package that extends the status line with git branch, uncommitted files, and ahead/behind counts. | ⬇ 97/mo | ~1mo ago |
| [pi-pai](https://www.npmjs.com/package/pi-pai) | Personal AI Infrastructure extension for Pi — full v4.0.3 sync: ISC splitting test, count gates, anti-criteria, capability tracking, time budgets, enhanced observability, agent personas, sentiment tra | ⬇ 97/mo | 3mo ago |
| [@artale/pi-excel](https://www.npmjs.com/package/@artale/pi-excel) | Excel file handling | ⬇ 96/mo | ~1mo ago |
| [@artale/pi-hermes](https://www.npmjs.com/package/@artale/pi-hermes) | Self-improving agent for Pi with memory and skills | ⬇ 96/mo | ~1mo ago |
| [@robhowley/py-pit-skills](https://www.npmjs.com/package/@robhowley/py-pit-skills) | Opinionated Python API development skills for AI coding agents (Pi, Claude Code). | ⬇ 96/mo | 2mo ago |
| [@zgltyq/pi-ask-user](https://www.npmjs.com/package/@zgltyq/pi-ask-user) | Interactive ask_user tool for pi-coding-agent with searchable split-pane selection UI, multi-select, and freeform input | ⬇ 96/mo | 28d ago |
| [pi-tilth](https://www.npmjs.com/package/pi-tilth) | AST-aware code reading via tilth — replaces read/grep/find/ls tools | ⬇ 96/mo | ~1mo ago |
| [@artale/pi-deploy](https://www.npmjs.com/package/@artale/pi-deploy) | Deployment tools | ⬇ 95/mo | ~1mo ago |
| [@artale/pi-kdot](https://www.npmjs.com/package/@artale/pi-kdot) | K.Dot notification sounds. Be humble, stack money trees. | ⬇ 95/mo | 19d ago |
| [@artale/pi-test-gen](https://www.npmjs.com/package/@artale/pi-test-gen) | Auto-generate tests from code using AI | ⬇ 95/mo | ~1mo ago |
| [@wkronmiller/pi-subagent-extension](https://www.npmjs.com/package/@wkronmiller/pi-subagent-extension) | Durable async Pi subagent as a standalone Pi package | ⬇ 95/mo | 15d ago |
| [pi-llm-as-verifier](https://www.npmjs.com/package/pi-llm-as-verifier) | Pi skill + extension for llm-as-verifier style pairwise, repeated, criteria-decomposed candidate selection. | ⬇ 95/mo | ~1mo ago |
| [pi-missions](https://www.npmjs.com/package/pi-missions) | Orchestrated multi-phase development missions for pi — architect, implement, test, audit, verify | ⬇ 95/mo | ~1mo ago |
| [@artale/pi-flutter](https://www.npmjs.com/package/@artale/pi-flutter) | Flutter utilities | ⬇ 94/mo | ~1mo ago |
| [@artale/pi-social](https://www.npmjs.com/package/@artale/pi-social) | Social media utilities | ⬇ 94/mo | ~1mo ago |
| [@artale/pi-terraform](https://www.npmjs.com/package/@artale/pi-terraform) | Terraform utilities | ⬇ 94/mo | ~1mo ago |
| [@artale/pi-wordpress](https://www.npmjs.com/package/@artale/pi-wordpress) | WordPress integration for Pi: WP-CLI wrapper, plugin scaffolding, theme tools | ⬇ 94/mo | ~1mo ago |
| [@e9n/pi-mobile](https://www.npmjs.com/package/@e9n/pi-mobile) | PWA mobile app for Pi agents — mounts on pi-webserver at /mobile | ⬇ 94/mo | 29d ago |
| [@the-forge-flow/gitnexus-pi](https://www.npmjs.com/package/@the-forge-flow/gitnexus-pi) | PI extension for native GitNexus code-intelligence integration | ⬇ 94/mo | ~1mo ago |
| [@artale/pi-crypto](https://www.npmjs.com/package/@artale/pi-crypto) | Cryptocurrency utilities | ⬇ 93/mo | ~1mo ago |
| [@nathanhuh/pi-ko](https://www.npmjs.com/package/@nathanhuh/pi-ko) | Korean-first prompts and skills for Pi Coding Agent. | ⬇ 93/mo | 19d ago |
| [pi-auto-prompt](https://www.npmjs.com/package/pi-auto-prompt) | Pi extension that injects project-local model-specific system prompt Markdown before each agent run. | ⬇ 93/mo | 5d ago |
| [@agentlogs/pi](https://www.npmjs.com/package/@agentlogs/pi) | AgentLogs extension for Pi - automatically captures and uploads AI coding session transcripts | ⬇ 92/mo | 3mo ago |
| [@artale/pi-alerts](https://www.npmjs.com/package/@artale/pi-alerts) | Alert management | ⬇ 92/mo | ~1mo ago |
| [@artale/pi-pdf](https://www.npmjs.com/package/@artale/pi-pdf) | PDF generation and parsing | ⬇ 92/mo | ~1mo ago |
| [@gnoviawan/pi-litellm-auto-detect](https://www.npmjs.com/package/@gnoviawan/pi-litellm-auto-detect) | Loads LiteLLM models from a remote /model/info endpoint on startup. | ⬇ 92/mo | 26d ago |
| [@samfp/pi-meeting-copilot](https://www.npmjs.com/package/@samfp/pi-meeting-copilot) | Live meeting transcription copilot for pi — captures audio via whisper-cpp on Mac, streams transcripts to your dev machine, and gives pi real-time meeting context. | ⬇ 92/mo | ~1mo ago |
| [@artale/pi-discord](https://www.npmjs.com/package/@artale/pi-discord) | Discord integration | ⬇ 91/mo | ~1mo ago |
| [@baggiiiie/pi-no-ansi](https://www.npmjs.com/package/@baggiiiie/pi-no-ansi) | A minimal pi package that keeps `bash` tool output cleaner for the model by: | ⬇ 91/mo | 22d ago |
| [@nicknisi/pi-ideation](https://www.npmjs.com/package/@nicknisi/pi-ideation) | Transform brain dumps into structured implementation specs with confidence-gated workflows, codebase exploration, and automated review cycles. | ⬇ 91/mo | 2mo ago |
| [@wayaans/ramean](https://www.npmjs.com/package/@wayaans/ramean) | Ramean pi package collections | ⬇ 91/mo | ~1mo ago |
| [benedict2310-TelePi](https://github.com/benedict2310/TelePi) | Telegram bridge for the Pi coding agent — continue sessions from your phone with voice, images, and handback | ⭐91 | 10d ago |
| [pi-sentry-monitor](https://www.npmjs.com/package/pi-sentry-monitor) | Sentry AI Monitoring extension for pi coding agent sessions and tool calls | ⬇ 91/mo | ~1mo ago |
| [@artale/pi-azure](https://www.npmjs.com/package/@artale/pi-azure) | Azure utilities | ⬇ 90/mo | ~1mo ago |
| [@artale/pi-cms](https://www.npmjs.com/package/@artale/pi-cms) | CMS utilities | ⬇ 90/mo | ~1mo ago |
| [@artale/pi-gcp](https://www.npmjs.com/package/@artale/pi-gcp) | GCP utilities | ⬇ 90/mo | ~1mo ago |
| [@ferologics/pi-skills](https://www.npmjs.com/package/@ferologics/pi-skills) | Custom skills for Pi coding agent | ⬇ 90/mo | 3mo ago |
| [@winds-ai/pi-native-codex-web-search](https://www.npmjs.com/package/@winds-ai/pi-native-codex-web-search) | Native web search for Pi using OpenAI's Responses API via Codex backend (same as Codex CLI) | ⬇ 90/mo | ~1mo ago |
| [pi-captain](https://www.npmjs.com/package/pi-captain) | Captain — multi-agent pipeline orchestrator for pi. Define specialized agents, wire them into sequential/parallel/pool pipelines with quality gates, and run complex workflows. | ⬇ 90/mo | 2mo ago |
| [pi-high-availability](https://www.npmjs.com/package/pi-high-availability) | High Availability extension for pi - automatic failover when quota or capacity is exhausted | ⬇ 90/mo | 2mo ago |
| [@artale/pi-logs](https://www.npmjs.com/package/@artale/pi-logs) | Log parsing utilities | ⬇ 89/mo | ~1mo ago |
| [@casualjim/pi-taskplane-planner](https://www.npmjs.com/package/@casualjim/pi-taskplane-planner) | Planner-native pi extension and CLI companion to Taskplane | ⬇ 89/mo | ~1mo ago |
| [@code-fixer-23/pi-agent-resource](https://www.npmjs.com/package/@code-fixer-23/pi-agent-resource) | This extension is useful for making agent skills, propmts and subagents | ⬇ 89/mo | today |
| [exospherehost-failproofai](https://github.com/exospherehost/failproofai) | Runtime failure resolution for coding agents. Hooks into Claude Code and Codex. Catches loops, dangerous actions, and secret leaks before they become incidents. Zero latency. Runs locally. | ⭐89 | 6d ago |
| [pi-dashscope](https://www.npmjs.com/package/pi-dashscope) | Alibaba DashScope (ModelStudio) provider for oh my pi — Qwen3, GLM-5, MiniMax M2.5, Kimi K2.5 via OpenAI-compatible coding API | ⬇ 89/mo | 3mo ago |
| [pi-upgrade](https://www.npmjs.com/package/pi-upgrade) | Pi extension that adds a /upgrade command to self-upgrade pi | ⬇ 89/mo | 2mo ago |
| [@artale/pi-monitor](https://www.npmjs.com/package/@artale/pi-monitor) | Real-time system resource monitoring for Pi | ⬇ 88/mo | ~1mo ago |
| [@artale/pi-slack](https://www.npmjs.com/package/@artale/pi-slack) | Slack integration | ⬇ 88/mo | ~1mo ago |
| [@artale/pi-sms](https://www.npmjs.com/package/@artale/pi-sms) | SMS utilities | ⬇ 88/mo | ~1mo ago |
| [@baggiiiie/pi-computer-use](https://www.npmjs.com/package/@baggiiiie/pi-computer-use) |  | ⬇ 88/mo | 22d ago |
| [@rad-pi/cob](https://www.npmjs.com/package/@rad-pi/cob) | Optional Radicle COB integrations for pi (plan and context) | ⬇ 88/mo | 27d ago |
| [@sahebjot94/pi-goal](https://www.npmjs.com/package/@sahebjot94/pi-goal) | Codex-like /goal command for pi — autonomous goal tracking with continuation loops | ⬇ 88/mo | 17d ago |
| [agent-xlsx](https://www.npmjs.com/package/agent-xlsx) | Agent-friendly CLI for reading and editing xlsx files (skill package) | ⬇ 88/mo | ~1mo ago |
| [pi-copilot-usage](https://www.npmjs.com/package/pi-copilot-usage) | GitHub Copilot premium request usage in the pi status bar | ⬇ 88/mo | ~1mo ago |
| [@artale/pi-ansible](https://www.npmjs.com/package/@artale/pi-ansible) | Ansible utilities | ⬇ 87/mo | ~1mo ago |
| [@blackbelt-technology/pi-flows](https://www.npmjs.com/package/@blackbelt-technology/pi-flows) | Flow engine, dashboard, and orchestration extensions for pi | ⬇ 87/mo | 9d ago |
| [@codewithkenzo/pi-theme-switcher](https://www.npmjs.com/package/@codewithkenzo/pi-theme-switcher) | Switch and preview Pi themes during live sessions | ⬇ 87/mo | ~1mo ago |
| [pi-context-pruning](https://www.npmjs.com/package/pi-context-pruning) | OpenCode-style proactive tool output pruning for pi — reduce token usage by pruning stale tool outputs before each LLM call | ⬇ 87/mo | ~1mo ago |
| [@artale/pi-csv](https://www.npmjs.com/package/@artale/pi-csv) | CSV parsing and generation | ⬇ 86/mo | ~1mo ago |
| [@artale/pi-e2e](https://www.npmjs.com/package/@artale/pi-e2e) | E2E test utilities | ⬇ 86/mo | ~1mo ago |
| [@artale/pi-format](https://www.npmjs.com/package/@artale/pi-format) | Code formatting | ⬇ 86/mo | ~1mo ago |
| [@artale/pi-lint](https://www.npmjs.com/package/@artale/pi-lint) | Code linting and fixing | ⬇ 86/mo | ~1mo ago |
| [@artale/pi-type-check](https://www.npmjs.com/package/@artale/pi-type-check) | TypeScript type checking | ⬇ 86/mo | ~1mo ago |
| [@ruliana/pi-insights](https://www.npmjs.com/package/@ruliana/pi-insights) | Pi skill: analyze session history and generate an interactive HTML report with usage patterns and suggestions | ⬇ 86/mo | 25d ago |
| [@rwese/pi-hooks](https://www.npmjs.com/package/@rwese/pi-hooks) | Run user-defined hooks on pi events (input, agent_end) | ⬇ 86/mo | ~1mo ago |
| [pi-turtle-rlm](https://www.npmjs.com/package/pi-turtle-rlm) | pi-turtle-rlm — RLM for Pi: persistent runtime, llmQuery recursion (it's models all the way down) | ⬇ 86/mo | ~1mo ago |
| [@artale/pi-analytics](https://www.npmjs.com/package/@artale/pi-analytics) | Analytics utilities | ⬇ 85/mo | ~1mo ago |
| [@artale/pi-curl](https://www.npmjs.com/package/@artale/pi-curl) | cURL wrapper | ⬇ 85/mo | ~1mo ago |
| [@jeffkafka/pi-nobody](https://www.npmjs.com/package/@jeffkafka/pi-nobody) | Starter Pi package for building and publishing your own Pi agent | ⬇ 85/mo | ~1mo ago |
| [@juanibiapina/pi-gob](https://www.npmjs.com/package/@juanibiapina/pi-gob) | Pi extension for managing gob background jobs | ⬇ 85/mo | 5d ago |
| [@ruizrica/agent-pi](https://www.npmjs.com/package/@ruizrica/agent-pi) | Multi-agent orchestration suite for Pi — 6 modes, 43 extensions, 11 themes | ⬇ 85/mo | ~1mo ago |
| [pi-nasty-verbs](https://www.npmjs.com/package/pi-nasty-verbs) | Replaces Pi's default 'Working...' message with some better words. | ⬇ 85/mo | ~1mo ago |
| [pi-per-model-prompt](https://www.npmjs.com/package/pi-per-model-prompt) | Model-scoped system prompt correction layers for pi-coding-agent | ⬇ 85/mo | ~1mo ago |
| [pi-worktrunk](https://www.npmjs.com/package/pi-worktrunk) | A Worktrunk extension for pi | ⬇ 85/mo | ~1mo ago |
| [@0xkobold/pi-suggest](https://www.npmjs.com/package/@0xkobold/pi-suggest) | Context-aware suggestion engine for pi-coding-agent | ⬇ 84/mo | 2mo ago |
| [@artale/pi-blog](https://www.npmjs.com/package/@artale/pi-blog) | Blog utilities | ⬇ 84/mo | ~1mo ago |
| [@artale/pi-k8s](https://www.npmjs.com/package/@artale/pi-k8s) | Kubernetes utilities | ⬇ 84/mo | ~1mo ago |
| [@georgetsouvaltzis/pi-working-time](https://www.npmjs.com/package/@georgetsouvaltzis/pi-working-time) | Pi extension that shows live elapsed working time with configurable formatting | ⬇ 84/mo | 24d ago |
| [@lustepe/elixir-pi](https://www.npmjs.com/package/@lustepe/elixir-pi) | Pi package for Elixir projects: Mix post-edit checks, Expert LSP bridge, commands, LLM tools, and Elixir/Phoenix/Ecto/OTP skills. | ⬇ 84/mo | 28d ago |
| [@mjakl/pi-interlude](https://www.npmjs.com/package/@mjakl/pi-interlude) | Pi extension for stashing the current draft, sending an interlude message, and restoring the draft. | ⬇ 84/mo | 3d ago |
| [nicobailon-pi-model-switch](https://github.com/nicobailon/pi-model-switch) | Pi coding agent extension that gives the agent the ability to switch models on its own | ⭐84 | ~1mo ago |
| [@alexgorbatchev/pi-skill-library](https://www.npmjs.com/package/@alexgorbatchev/pi-skill-library) | Pi extension that exposes skills-library roots through /library: commands. | ⬇ 83/mo | ~1mo ago |
| [@artale/pi-unit](https://www.npmjs.com/package/@artale/pi-unit) | Unit test utilities | ⬇ 83/mo | ~1mo ago |
| [@guanyilun/pi-ads](https://www.npmjs.com/package/@guanyilun/pi-ads) | pi extension for querying NASA's Astrophysics Data System (ADS) | ⬇ 83/mo | ~1mo ago |
| [@guwidoe/pi-clipboard-image](https://www.npmjs.com/package/@guwidoe/pi-clipboard-image) | pi extension: paste clipboard images into the prompt across Windows, Linux, and macOS | ⬇ 83/mo | 3mo ago |
| [@m64/browser-tools](https://www.npmjs.com/package/@m64/browser-tools) | Minimal CDP tools for collaborative site exploration | ⬇ 83/mo | ~1mo ago |
| [@mporenta/mg](https://www.npmjs.com/package/@mporenta/mg) | Agent-friendly CLI and Pi extension for memory-graph-mcp | ⬇ 83/mo | yesterday |
| [@skdev-ai/pi-gemini-cli-provider](https://www.npmjs.com/package/@skdev-ai/pi-gemini-cli-provider) | Gemini LLM provider for Pi/GSD via A2A protocol with MCP tool bridge | ⬇ 83/mo | ~1mo ago |
| [@artale/pi-load](https://www.npmjs.com/package/@artale/pi-load) | Load testing utilities | ⬇ 82/mo | ~1mo ago |
| [@clanker-extensions/web](https://www.npmjs.com/package/@clanker-extensions/web) | Adds web search and fetch tools for public web access. | ⬇ 82/mo | 27d ago |
| [@davehardy20/pi-ast-grep-tools](https://www.npmjs.com/package/@davehardy20/pi-ast-grep-tools) | Pi package for structural code search and replace using AST matching via ast-grep. | ⬇ 82/mo | 8d ago |
| [@dkod/pi](https://www.npmjs.com/package/@dkod/pi) | dkod extension for Pi — parallel agent execution with AST-level semantic merging | ⬇ 82/mo | ~1mo ago |
| [@kuzat/pi-extension-gpt-image-2](https://www.npmjs.com/package/@kuzat/pi-extension-gpt-image-2) | Pi extension that adds a gpt_image_2_generate tool | ⬇ 82/mo | ~1mo ago |
| [@peteturnbull/pi-extensions](https://www.npmjs.com/package/@peteturnbull/pi-extensions) | A pi extension pack with a local task board TUI and a deterministic docs-store with qmd-powered search. | ⬇ 82/mo | 3mo ago |
| [@rad-pi/autonomy](https://www.npmjs.com/package/@rad-pi/autonomy) | Autonomous Radicle issue, plan, and orchestration workflows for pi | ⬇ 82/mo | 27d ago |
| [@weiping/pi-superpowers](https://www.npmjs.com/package/@weiping/pi-superpowers) | Superpowers skills library for Pi: TDD, debugging, collaboration workflows with Chinese trigger support | ⬇ 82/mo | ~1mo ago |
| [pi-omni-compact](https://www.npmjs.com/package/pi-omni-compact) | Pi extension that delegates compaction to a large-context model subprocess | ⬇ 82/mo | 3mo ago |
| [@artale/pi-aws](https://www.npmjs.com/package/@artale/pi-aws) | AWS utilities | ⬇ 81/mo | ~1mo ago |
| [@firstpick/pi-package-learnings](https://www.npmjs.com/package/@firstpick/pi-package-learnings) | File-based troubleshooting LEARNINGS archive for Pi agents, with retrieval workflow, summary prompts, and sync scripts. | ⬇ 81/mo | 3d ago |
| [@matheusbbarni/pi-stitch-mcp](https://www.npmjs.com/package/@matheusbbarni/pi-stitch-mcp) | Pi extension that bridges Google Stitch MCP tools into Pi. | ⬇ 81/mo | 12d ago |
| [@wechatbot/pi-agent](https://www.npmjs.com/package/@wechatbot/pi-agent) | Pi extension — type /wechat, scan QR code, chat with Pi from WeChat | ⬇ 81/mo | 26d ago |
| [ollama-graceful](https://www.npmjs.com/package/ollama-graceful) | Pi extension that gracefully starts and stops the Ollama service on demand when switching between local and cloud models | ⬇ 81/mo | ~1mo ago |
| [pi-lsp](https://www.npmjs.com/package/pi-lsp) | Declarative Pi extension for LSP diagnostics and language-server navigation tools. | ⬇ 81/mo | 14d ago |
| [pi-websearch-tavily](https://www.npmjs.com/package/pi-websearch-tavily) | Pi web search tool powered by Tavily | ⬇ 81/mo | ~1mo ago |
| [@artale/pi-build](https://www.npmjs.com/package/@artale/pi-build) | Build orchestration | ⬇ 80/mo | ~1mo ago |
| [@claaslange/pi-progress-bar](https://www.npmjs.com/package/@claaslange/pi-progress-bar) | Native terminal progress indicator support for pi via OSC 9;4 | ⬇ 80/mo | ~1mo ago |
| [@davehardy20/pi-hashline-tools](https://www.npmjs.com/package/@davehardy20/pi-hashline-tools) | Pi package for hash-anchored file reading and editing (read_hashed / hashline_edit). | ⬇ 80/mo | 8d ago |
| [pi-image-gen-openai](https://www.npmjs.com/package/pi-image-gen-openai) | Pi image generation tool powered by OpenAI (GPT Image, DALL-E) | ⬇ 80/mo | ~1mo ago |
| [std-c99-proj-skill](https://www.npmjs.com/package/std-c99-proj-skill) | Pi skill for pure ANSI C99 projects with memory arena, containerized builds, Valgrind, and static analysis. | ⬇ 80/mo | ~1mo ago |
| [@banon-labs/pi-inline-format](https://www.npmjs.com/package/@banon-labs/pi-inline-format) | Strict Pi extension project with a Rust core subproject and a TypeScript extension wrapper. | ⬇ 79/mo | ~1mo ago |
| [@codingcoffee/pi-privacy-filter](https://www.npmjs.com/package/@codingcoffee/pi-privacy-filter) | pi extension that redacts PII/secrets before sending to the LLM and restores them in responses | ⬇ 79/mo | 16d ago |
| [@lhl/pi-vertex](https://www.npmjs.com/package/@lhl/pi-vertex) | Google Vertex AI provider for Pi coding agent - supports Gemini, Claude, and all MaaS models | ⬇ 79/mo | 5d ago |
| [@venomzen/pi-web-access-enhanced](https://www.npmjs.com/package/@venomzen/pi-web-access-enhanced) | Personal enhanced fork of pi-web-access: web search, content extraction, GitHub repo cloning, PDF extraction, YouTube and local video analysis for Pi coding agent | ⬇ 79/mo | 23d ago |
| [pi-feature-dev](https://www.npmjs.com/package/pi-feature-dev) | Portable guided feature development workflow for coding assistants, packaged as a Pi skill. | ⬇ 79/mo | 18d ago |
| [pi-reduce](https://www.npmjs.com/package/pi-reduce) | Reduce Pi session context by rebuilding the current branch with only the message types you keep. | ⬇ 79/mo | 12d ago |
| [pi-terminal-signals](https://www.npmjs.com/package/pi-terminal-signals) | Pi extension that communicates agent lifecycle to the terminal via OSC 9;4 (progress) and OSC 133 (semantic prompts). | ⬇ 79/mo | ~1mo ago |
| [@artale/pi-react-native](https://www.npmjs.com/package/@artale/pi-react-native) | React Native utilities | ⬇ 78/mo | ~1mo ago |
| [@davehardy20/pi-context7](https://www.npmjs.com/package/@davehardy20/pi-context7) | Pi package for fetching current library/framework/API docs via Context7. | ⬇ 78/mo | 8d ago |
| [@davehardy20/pi-safe-tools](https://www.npmjs.com/package/@davehardy20/pi-safe-tools) | Pi safety bundle: safe command runners, damage prevention, and secret redaction. | ⬇ 78/mo | 8d ago |
| [@joemccann/pi-pdf](https://www.npmjs.com/package/@joemccann/pi-pdf) | PDF manipulation, processing, and management toolkit for Pi coding agent — extract text/tables, merge/split, fill forms, create PDFs, OCR, watermark, encrypt/decrypt, and more | ⬇ 78/mo | 2mo ago |
| [@kyuc/pi-cat-loader](https://www.npmjs.com/package/@kyuc/pi-cat-loader) | Animated cat loading indicator for pi. | ⬇ 78/mo | 24d ago |
| [@liunuozhi/pi-vi](https://www.npmjs.com/package/@liunuozhi/pi-vi) | Minimal vi-style modal editing for Pi's TUI prompt | ⬇ 78/mo | 23d ago |
| [pi-codex-footer](https://www.npmjs.com/package/pi-codex-footer) | Pi extension that adds a 2-line footer with live OpenAI Codex 5h/7d quota usage and reset timers. | ⬇ 78/mo | ~1mo ago |
| [pi-gotify-notifier](https://www.npmjs.com/package/pi-gotify-notifier) | Send Gotify notifications for pi agent session events | ⬇ 78/mo | ~1mo ago |
| [pi-magic-docs](https://www.npmjs.com/package/pi-magic-docs) | Living documents that update themselves from your conversation — pi reads them, tracks them, and keeps them current | ⬇ 78/mo | ~1mo ago |
| [pi-multicodex](https://www.npmjs.com/package/pi-multicodex) | Rotate multiple ChatGPT Codex OAuth accounts for pi | ⬇ 78/mo | 4mo ago |
| [@artale/pi-canvas](https://www.npmjs.com/package/@artale/pi-canvas) | Visual art for your terminal. Hotline-inspired themes, neon effects, and ASCII aesthetics. | ⬇ 77/mo | 19d ago |
| [@burneikis/pi-copy-code](https://www.npmjs.com/package/@burneikis/pi-copy-code) | Pi coding-agent extension that copies fenced code blocks from recent assistant (and tool result) messages into the system clipboard. | ⬇ 77/mo | 11d ago |
| [@davehardy20/pi-web-search](https://www.npmjs.com/package/@davehardy20/pi-web-search) | Pi package for web search via Tavily API. | ⬇ 77/mo | 8d ago |
| [@dmille56/pi-piper-tts](https://www.npmjs.com/package/@dmille56/pi-piper-tts) | A Pi package that adds a /piper-tts command (and /tts alias) for speaking the latest assistant message with Piper TTS. | ⬇ 77/mo | 11d ago |
| [pi-sift](https://www.npmjs.com/package/pi-sift) | Model-scored compression of large tool results for Pi Coding Agent | ⬇ 77/mo | 2mo ago |
| [sutras](https://www.npmjs.com/package/sutras) | Skill development toolkit for pi — /sutras commands + agent skill | ⬇ 77/mo | ~1mo ago |
| [@baggiiiie/pi-context-status](https://www.npmjs.com/package/@baggiiiie/pi-context-status) | A pi package that shows current context-window usage in the status line or a custom footer. | ⬇ 76/mo | 22d ago |
| [@johnnywu/pi-default-tools](https://www.npmjs.com/package/@johnnywu/pi-default-tools) | Activate default tools from settings.json — reads project or global settings to enable built-in tools like grep, find, and ls on session start | ⬇ 76/mo | 11d ago |
| [pi-auto-agents](https://www.npmjs.com/package/pi-auto-agents) | Pi skill that automatically routes complex coding/development tasks to the sub-agents for multi-agent execution with testing and verification | ⬇ 76/mo | 2mo ago |
| [pi-langlearn](https://www.npmjs.com/package/pi-langlearn) | Duolingo-esque language learning overlay for Pi | ⬇ 76/mo | 4mo ago |
| [@alexgorbatchev/pi-env](https://www.npmjs.com/package/@alexgorbatchev/pi-env) | Pi extension that injects environment variables from project config settings. | ⬇ 75/mo | ~1mo ago |
| [@arnavpadwal/pi-skills-onboarding](https://www.npmjs.com/package/@arnavpadwal/pi-skills-onboarding) | Onboarding skill for pi — analyzes a project and produces a comprehensive context document covering architecture, dependencies, code structure, configuration, and development workflow | ⬇ 75/mo | 13d ago |
| [@boozedog/pi-codemode](https://www.npmjs.com/package/@boozedog/pi-codemode) | Pi Codemode plugin - TypeScript code execution with sandboxed tools, just-bash shell, and MCP integration | ⬇ 75/mo | 9d ago |
| [@felipefontoura/pi-strategy](https://www.npmjs.com/package/@felipefontoura/pi-strategy) | Pi Strategy skills for Pi Agent: turn ideas into market, offer, MVP, proof, messaging, and acquisition strategy. | ⬇ 75/mo | 10d ago |
| [@jdrly/pi-toolbox](https://www.npmjs.com/package/@jdrly/pi-toolbox) | Deferred tool loading for Pi: keep heavy tool schemas out of context until prompts need them. | ⬇ 75/mo | 23d ago |
| [@markoonakic/pi-working-line](https://www.npmjs.com/package/@markoonakic/pi-working-line) | Claude-style working message phrases and elapsed timer for Pi. | ⬇ 75/mo | ~1mo ago |
| [@ssweens/pi-handoff](https://www.npmjs.com/package/@ssweens/pi-handoff) | Enhanced handoff extension for pi - context management for agentic coding workflows | ⬇ 75/mo | ~1mo ago |
| [@daviriansu/agent-arena-skill](https://www.npmjs.com/package/@daviriansu/agent-arena-skill) | Agent Skill for Agent Arena — teaches AI agents how to join the decentralized task marketplace on X-Layer | ⬇ 74/mo | ~1mo ago |
| [@syedassadullahshah/pi-kilo-provider](https://www.npmjs.com/package/@syedassadullahshah/pi-kilo-provider) | Kilo AI Gateway provider extension for Pi. | ⬇ 74/mo | 18d ago |
| [@geminixiang/pi-cicd-status](https://www.npmjs.com/package/@geminixiang/pi-cicd-status) | Pi coding agent skill for checking CI/CD status from GitHub check runs, workflow runs, branches, PRs, commits, and releases | ⬇ 73/mo | 22d ago |
| [@xniffing/pi-gmail-assistant](https://www.npmjs.com/package/@xniffing/pi-gmail-assistant) | Gmail extension for Pi with OAuth setup, inbox tools, attachment downloads, and safe send confirmation. | ⬇ 73/mo | ~1mo ago |
| [pi-system-reminders](https://www.npmjs.com/package/pi-system-reminders) | Reactive system reminders for pi - steer agents with contextual nudges during long agentic flows | ⬇ 73/mo | yesterday |
| [pi-unbash](https://www.npmjs.com/package/pi-unbash) | A highly secure bash confirmation extension for pi, using the unbash AST parser to perfectly intercept subshells and logic gates. | ⬇ 73/mo | 26d ago |
| [@datspike/pi-fork-resume](https://www.npmjs.com/package/@datspike/pi-fork-resume) | Pi extension that forks a session selected through the resume-style session picker without opening the source session. | ⬇ 72/mo | 23d ago |
| [@davehardy20/pi-theme-switcher](https://www.npmjs.com/package/@davehardy20/pi-theme-switcher) | Pi package for switching TUI themes on the fly. | ⬇ 72/mo | 8d ago |
| [@hyperprior/pi-shared](https://www.npmjs.com/package/@hyperprior/pi-shared) | Shared helpers for Hyperprior pi plugins | ⬇ 72/mo | 3mo ago |
| [@rbtr/pi](https://www.npmjs.com/package/@rbtr/pi) | pi extension that surfaces rbtr's structural code index to the LLM — symbol search, source read, file outlines, dependency edges, and cross-ref diffs without raw shell commands. | ⬇ 72/mo | ~1mo ago |
| [@steel-experiments/pi-steel](https://www.npmjs.com/package/@steel-experiments/pi-steel) | Steel browser automation extension package for Pi | ⬇ 72/mo | ~1mo ago |
| [cli-pipe-provider](https://www.npmjs.com/package/cli-pipe-provider) | pi-ai provider for CLI tools that speak the stream-json format, with MCP tool bridge support | ⬇ 72/mo | 3mo ago |
| [pi-better-ctx](https://www.npmjs.com/package/pi-better-ctx) | Pi Coding Agent extension that routes bash, read, grep, find, and ls through better-ctx for 60-90% token savings | ⬇ 72/mo | ~1mo ago |
| [pi-caffeinate](https://www.npmjs.com/package/pi-caffeinate) | Pi extension that keeps the machine awake while the agent is working (macOS, Linux, Windows) | ⬇ 72/mo | 3mo ago |
| [pi-code-index](https://www.npmjs.com/package/pi-code-index) | Fast, precise codebase exploration via universal-ctags — symbol search, outlines, exact code retrieval, global index storage, and cross-project search | ⬇ 72/mo | 3mo ago |
| [pi-fast-mode](https://www.npmjs.com/package/pi-fast-mode) | Persistent fast-mode toggle for pi that injects service_tier for configured provider/model pairs. | ⬇ 72/mo | ~1mo ago |
| [@davehardy20/pi-seeds](https://www.npmjs.com/package/@davehardy20/pi-seeds) | Pi package for per-project issue management via the Seeds CLI (sd). | ⬇ 71/mo | 8d ago |
| [heyhuynhgiabuu-openpi](https://github.com/heyhuynhgiabuu/openpi) | OpenPi is a desktop workbench for the Pi coding agent. | ⭐71 | 4d ago |
| [@arnavpadwal/pi-backup](https://www.npmjs.com/package/@arnavpadwal/pi-backup) | Backup and restore your entire pi configuration — shareable zip, excludes API keys | ⬇ 70/mo | 13d ago |
| [@arnavpadwal/pi-universal-sessions](https://www.npmjs.com/package/@arnavpadwal/pi-universal-sessions) | Universal session switch for pi — browse, switch, delete, and rename sessions from ANY project | ⬇ 70/mo | 13d ago |
| [@artale/pi-agent](https://www.npmjs.com/package/@artale/pi-agent) | Agentic engineering toolkit. Token estimation, cost, patterns, templates. | ⬇ 70/mo | 3mo ago |
| [@artale/pi-params](https://www.npmjs.com/package/@artale/pi-params) | Generation parameter control for Pi. Set temperature, top_p, max_tokens, and other model params per conversation. | ⬇ 70/mo | 2mo ago |
| [@burneikis/pi-sticky](https://www.npmjs.com/package/@burneikis/pi-sticky) | Keeps the chat input and footer pinned to the bottom of the terminal while you scroll — works alongside pi-vim, pi-status, and any other extensions | ⬇ 70/mo | 11d ago |
| [@devnazim/pi-cmux](https://www.npmjs.com/package/@devnazim/pi-cmux) | cmux notifications and status integration for pi. | ⬇ 70/mo | today |
| [@whynothugo/pi-aliyun](https://www.npmjs.com/package/@whynothugo/pi-aliyun) | Aliyun CodingPlan provider extension for pi | ⬇ 70/mo | 15d ago |
| [@whynothugo/pi-subagents](https://www.npmjs.com/package/@whynothugo/pi-subagents) | Subagent extension for pi coding agent | ⬇ 70/mo | 15d ago |
| [owainlewis-pi-extensions](https://github.com/owainlewis/pi-extensions) | Context-isolated workflow automation for Pi coding agent | ⭐70 | 2d ago |
| [pi-chrome-cdp](https://www.npmjs.com/package/pi-chrome-cdp) | Give your AI agent access to your live Chrome session — works out of the box, connects to tabs you already have open | ⬇ 70/mo | 2mo ago |
| [pi-codebase-memory](https://www.npmjs.com/package/pi-codebase-memory) | A fast, lightweight codebase indexing and search extension for pi-coding-agent. | ⬇ 70/mo | ~1mo ago |
| [pi-ghostty-notifier](https://www.npmjs.com/package/pi-ghostty-notifier) | Ghostty-first notifications with smart summaries for Pi | ⬇ 70/mo | today |
| [pi-repl](https://www.npmjs.com/package/pi-repl) | Collaborative tmux-backed REPL sessions for pi | ⬇ 70/mo | 16d ago |
| [@alasano/pi-mouse](https://www.npmjs.com/package/@alasano/pi-mouse) | Responsive status panels for pi - git info, LLM context usage, and Spotify now-playing below the editor | ⬇ 69/mo | ~1mo ago |
| [@calesennett/pi-hn](https://www.npmjs.com/package/@calesennett/pi-hn) | Hacker News front-page reader extension for pi | ⬇ 69/mo | 2d ago |
| [@hugo-hsi-dev/pi-interactive-questionnaire](https://www.npmjs.com/package/@hugo-hsi-dev/pi-interactive-questionnaire) | Pi extension for asking users structured questions with choices and a custom answer path. | ⬇ 69/mo | 10d ago |
| [@the-forge-flow/sub-agents-pi](https://www.npmjs.com/package/@the-forge-flow/sub-agents-pi) | PI extension for spawning isolated sub-agents with live TUI spying | ⬇ 69/mo | ~1mo ago |
| [gustavonline-pi-desktop](https://github.com/gustavonline/pi-desktop) | Native desktop shell for Pi Coding Agent (Tauri + Lit), extension-first and multi-session aware | ⭐69 | ~1mo ago |
| [omniroute-pi-extension](https://www.npmjs.com/package/omniroute-pi-extension) | Pi Coding Agent extension for OmniRoute — manage combos, browse providers, and see which model actually served each response in the status bar | ⬇ 69/mo | ~1mo ago |
| [@andrewxhill/pi-be-kind](https://www.npmjs.com/package/@andrewxhill/pi-be-kind) | Pi agent extension that rewrites unkind prompts to be nicer | ⬇ 68/mo | ~1mo ago |
| [@skill-pack/pi](https://www.npmjs.com/package/@skill-pack/pi) | pi extension package for skill-pack: contributes the /skillpack prompt template + meta-skills. | ⬇ 68/mo | 8d ago |
| [@vadimcomanescu/pi-teams](https://www.npmjs.com/package/@vadimcomanescu/pi-teams) | Pi team orchestration extension for named teammates, shared task boards, and coordinated execution | ⬇ 68/mo | ~1mo ago |
| [nowledge-mem-pi](https://www.npmjs.com/package/nowledge-mem-pi) | Cross-tool memory for Pi. Recall past decisions, search knowledge from every AI tool, and save what matters. | ⬇ 68/mo | ~1mo ago |
| [pi-ollama-web-search](https://www.npmjs.com/package/pi-ollama-web-search) | pi extension adding Ollama web_search and web_fetch tools | ⬇ 68/mo | 3mo ago |
| [pi-sandbox-profile](https://www.npmjs.com/package/pi-sandbox-profile) | Sandbox profiles for Pi: open/intro-sec/engineering with file-tool enforcement and telemetry | ⬇ 68/mo | 3mo ago |
| [pi-tetris](https://www.npmjs.com/package/pi-tetris) | Play Tetris in pi! All 7 tetrominoes, ghost piece, wall kicks, hold piece, score, levels, and session save/restore. | ⬇ 68/mo | 3mo ago |
| [pi-use-claude-seo](https://www.npmjs.com/package/pi-use-claude-seo) | Claude SEO ported to pi runtime. 25 SEO skills, 18 subagents, and 30 Python scripts for comprehensive SEO analysis — technical audits, content quality (E-E-A-T), schema markup, GEO/AI search, local SE | ⬇ 68/mo | 12d ago |
| [pi-websearch-router](https://www.npmjs.com/package/pi-websearch-router) | Pi web search tool that auto-detects available API keys and routes to the right provider | ⬇ 68/mo | ~1mo ago |
| [@davidorex/pi-custom-compactor](https://www.npmjs.com/package/@davidorex/pi-custom-compactor) | Declarative YAML-driven structured compaction for pi coding agent — multi-pass extraction, artifact persistence, budget management, and work-mode-specific compaction specs | ⬇ 67/mo | 2mo ago |
| [@dxvapor/pi-splunk-cloud-logs](https://www.npmjs.com/package/@dxvapor/pi-splunk-cloud-logs) | Pi coding agent extension for querying Splunk Cloud logs via REST API. Supports OAuth2 client credentials and bearer token auth. | ⬇ 67/mo | ~1mo ago |
| [pi-qwen-provider](https://www.npmjs.com/package/pi-qwen-provider) | Qwen AI provider extension for Pi - OAuth authentication with qwen.ai | ⬇ 67/mo | 3mo ago |
| [@rdyson/pi-pushover](https://www.npmjs.com/package/@rdyson/pi-pushover) | Pushover notifications when Pi finishes agent tasks. | ⬇ 66/mo | 19d ago |
| [@wirebabel/pi-web-access](https://www.npmjs.com/package/@wirebabel/pi-web-access) | Web search, URL fetching, GitHub repo cloning, PDF extraction, YouTube video understanding, and local video analysis for Pi coding agent | ⬇ 66/mo | 3mo ago |
| [joelhooks-pi-tools](https://github.com/joelhooks/pi-tools) | 🔧 Power tools for pi — repo autopsy, tsgo LSP, codex background loops, session reader, and more | ⭐66 | 2d ago |
| [pi-model-fusion](https://www.npmjs.com/package/pi-model-fusion) | Pi extension for model-fusion coding tasks with automatic judging and optional merge synthesis | ⬇ 66/mo | ~1mo ago |
| [telagod-pi-agent-colony](https://github.com/telagod/pi-agent-colony) | Agent Colony for Pi — bootstrap and package distribution for a multi-agent Pi plugin for complex coding tasks. | ⭐66 | 25d ago |
| [@alexleekt/pi-bump](https://www.npmjs.com/package/@alexleekt/pi-bump) | Guards against unregistered pi packages — installed via npm but not registered in pi's settings | ⬇ 65/mo | 9d ago |
| [@eliemessiecode/pi-render](https://www.npmjs.com/package/@eliemessiecode/pi-render) | Extension for pi-coding-agent — displays interactive HTML pages in the browser and auto-saves them | ⬇ 65/mo | 2mo ago |
| [@nqbao/pi-alchemy](https://www.npmjs.com/package/@nqbao/pi-alchemy) | Turn raw data into insights — query, transform, and visualize data files from the terminal | ⬇ 65/mo | 9d ago |
| [@the-agency/pi-tokenshrink](https://www.npmjs.com/package/@the-agency/pi-tokenshrink) | Reduce token usage of a Pi agent's conversation context using TokenShrink. | ⬇ 65/mo | ~1mo ago |
| [@zenobius/pi-dcp](https://www.npmjs.com/package/@zenobius/pi-dcp) | Dynamic Context Pruning extension for pi - intelligently removes obsolete messages to optimize token usage | ⬇ 65/mo | 4mo ago |
| [pi-agent-loop](https://www.npmjs.com/package/pi-agent-loop) | General-purpose agent loop extension for pi. Supports goal loops (repeat until done), fixed-pass loops, and multi-stage pipelines via /loop goal, /loop passes, and /loop pipeline commands. | ⬇ 65/mo | 2mo ago |
| [pi-caveman-mode](https://www.npmjs.com/package/pi-caveman-mode) | Caveman Mode extension for pi. Makes assistant responses terse and blunt. | ⬇ 65/mo | ~1mo ago |
| [telagod-oh-pi](https://github.com/telagod/oh-pi) | One-click setup for pi-coding-agent with ant colony swarm. Like oh-my-zsh for pi. | ⭐65 | 3mo ago |
| [@vedssharma/pi-pet](https://www.npmjs.com/package/@vedssharma/pi-pet) | A virtual pet for your pi terminal sessions. Pick a pet, feed it tokens, and watch it grow! | ⬇ 64/mo | 15d ago |
| [pi-co-authored-by](https://www.npmjs.com/package/pi-co-authored-by) | A Pi extension that automatically appends Co-Authored-By and Generated-By git trailers to commit messages with the model name and pi version | ⬇ 64/mo | ~1mo ago |
| [pi-copy-output](https://www.npmjs.com/package/pi-copy-output) | Copy the last assistant response to clipboard — tables, code, markdown, all of it | ⬇ 64/mo | ~1mo ago |
| [pi-file-protection](https://www.npmjs.com/package/pi-file-protection) | Pi extension that confirms before delete/edit operations - protects files from accidental changes | ⬇ 64/mo | 12d ago |
| [pi-image-gen-together](https://www.npmjs.com/package/pi-image-gen-together) | Pi image generation tool powered by Together AI (Flux, Ideogram, and more) | ⬇ 64/mo | ~1mo ago |
| [pi-openresolve](https://www.npmjs.com/package/pi-openresolve) | Openresolve extension for pi (currently lists merge conflicts in TypeScript code) | ⬇ 64/mo | ~1mo ago |
| [@alchemiststudios/pi-harness-skills](https://www.npmjs.com/package/@alchemiststudios/pi-harness-skills) | Harness engineering skills package for pi | ⬇ 63/mo | 2mo ago |
| [@ayulab/pi-undoredo](https://www.npmjs.com/package/@ayulab/pi-undoredo) | Pi extension providing /undo and /redo commands | ⬇ 63/mo | today |
| [pi-computer-use](https://www.npmjs.com/package/pi-computer-use) | Pi extension for GUI computer-use on macOS | ⬇ 63/mo | ~1mo ago |
| [pi-explorer](https://www.npmjs.com/package/pi-explorer) | Pi skill + command for deep codebase exploration and HTML architecture reports. | ⬇ 63/mo | ~1mo ago |
| [pi-extension-codex-apply-patch](https://www.npmjs.com/package/pi-extension-codex-apply-patch) | Pi extension that adds Codex-style CFG constrained apply_patch with local verification | ⬇ 63/mo | 3mo ago |
| [@artale/pi-validate](https://www.npmjs.com/package/@artale/pi-validate) | Production readiness validator. Score projects on code, tests, docs, config, deploy. Inspired by MrE's system-validator-100. | ⬇ 62/mo | 3mo ago |
| [kostyay-pi-k-excalidraw](https://github.com/kostyay/pi-k-excalidraw) | Native Excalidraw diagram preview tool for pi — draw and save diagrams from the agent with a live glimpse webview. | ⭐62 | 22d ago |
| [pi-extension-observational-memory](https://www.npmjs.com/package/pi-extension-observational-memory) | Observational-memory compaction strategy for pi with observer/reflector token thresholds | ⬇ 62/mo | 3mo ago |
| [pi-freecad](https://www.npmjs.com/package/pi-freecad) | Drive FreeCAD from pi with natural language. Create 3D shapes, open and modify .FCStd files, export to STEP/IGES/STL/DXF, and batch-convert entire folders. | ⬇ 62/mo | 2mo ago |
| [@jerryan/pi-todo-lite](https://www.npmjs.com/package/@jerryan/pi-todo-lite) | A lightweight task tracker extension for the pi coding agent. | ⬇ 61/mo | 4d ago |
| [@miclivs/pi-charts](https://www.npmjs.com/package/@miclivs/pi-charts) | Pi extension for rendering charts — powered by charts-cli SDK | ⬇ 61/mo | 2mo ago |
| [pi-google-workspace](https://www.npmjs.com/package/pi-google-workspace) | Google Workspace extension for pi (Drive, Docs, Sheets, Slides with OAuth) | ⬇ 61/mo | 3mo ago |
| [pi-mem](https://www.npmjs.com/package/pi-mem) | Persistent memory extension for pi — captures observations, compresses them into searchable memories, and injects context into future sessions | ⬇ 61/mo | 3mo ago |
| [pi-persistent-term](https://www.npmjs.com/package/pi-persistent-term) | Integrated terminal panel for pi coding agent — persistent PTY shell, colored overlay, LLM tools | ⬇ 61/mo | today |
| [pi-provider-bedrock](https://www.npmjs.com/package/pi-provider-bedrock) | Bedrock provider for pi — routes to AWS Bedrock models via AWS profile auth | ⬇ 61/mo | ~1mo ago |
| [pi-skill-tavily](https://www.npmjs.com/package/pi-skill-tavily) | Tavily web search, extract, crawl, and research skills for pi coding agent | ⬇ 61/mo | 2mo ago |
| [pi-websearch-firecrawl](https://www.npmjs.com/package/pi-websearch-firecrawl) | Pi web search tool powered by Firecrawl (search + content extraction) | ⬇ 61/mo | ~1mo ago |
| [@muelsyse/pi-statusline-trellis](https://www.npmjs.com/package/@muelsyse/pi-statusline-trellis) | Fixed two-line status footer for pi with Trellis runtime task display, model, thinking, context, git, token, worktree, and skill indicators | ⬇ 60/mo | 8d ago |
| [@rakohq/pi-council](https://www.npmjs.com/package/@rakohq/pi-council) | Multi-model LLM Council for adversarial debate, cross-validation, and synthesized decision-making via pi-teams | ⬇ 60/mo | ~1mo ago |
| [pi-cursor-oauth](https://www.npmjs.com/package/pi-cursor-oauth) | Cursor OAuth provider extension for pi-coding-agent | ⬇ 60/mo | 2mo ago |
| [pi-mill](https://www.npmjs.com/package/pi-mill) | Pi extension package that routes subagent execution through mill | ⬇ 60/mo | 3mo ago |
| [@jordyvd/pi-image-attachments](https://www.npmjs.com/package/@jordyvd/pi-image-attachments) | Image attachments for Pi, including draft placeholders and screenshot tool-result promotion. | ⬇ 59/mo | 2mo ago |
| [@lehoangvu/pi-memory-extension](https://www.npmjs.com/package/@lehoangvu/pi-memory-extension) | Graphiti-lite memory extension package for Pi CLI. | ⬇ 59/mo | ~1mo ago |
| [@tryinget/pi-little-helpers](https://www.npmjs.com/package/@tryinget/pi-little-helpers) | pi extension package for little-helpers workflows in pi | ⬇ 59/mo | 3mo ago |
| [@versdotsh/reef](https://www.npmjs.com/package/@versdotsh/reef) | Self-improving fleet infrastructure — the minimum kernel agents need to build their own tools | ⬇ 59/mo | 3mo ago |
| [pi-bailian-models](https://www.npmjs.com/package/pi-bailian-models) | Adds Alibaba Cloud BaiLian Qwen models to pi with OAuth support | ⬇ 59/mo | 3mo ago |
| [pi-image-gen-google](https://www.npmjs.com/package/pi-image-gen-google) | Pi image generation tool powered by Google (Nano Banana, Imagen) | ⬇ 59/mo | ~1mo ago |
| [@artale/pi-dash](https://www.npmjs.com/package/@artale/pi-dash) | Live TUI dashboard widget for Pi. Shows tokens, cost, context %, uptime, and tool stats above the editor in real-time. | ⬇ 58/mo | 2mo ago |
| [@helle253/pi-peon](https://www.npmjs.com/package/@helle253/pi-peon) | Pi extension that forwards pi lifecycle events to peon-ping / OpenPeon. | ⬇ 58/mo | ~1mo ago |
| [@justram/pi-undo-redo](https://www.npmjs.com/package/@justram/pi-undo-redo) | Buffered undo/redo extension for Pi coding agent | ⬇ 58/mo | 4mo ago |
| [@marckrenn/pi-sub-status](https://www.npmjs.com/package/@marckrenn/pi-sub-status) | Compact status-line client for pi subscription usage | ⬇ 58/mo | 2mo ago |
| [@samfp/pi-telegram-bot](https://www.npmjs.com/package/@samfp/pi-telegram-bot) | Telegram bot exposing pi as a conversational coding agent. Chat with pi in Telegram with streaming responses, tool execution, threaded sessions, and model switching. | ⬇ 58/mo | ~1mo ago |
| [@sirsyorrz/pi-statusline](https://www.npmjs.com/package/@sirsyorrz/pi-statusline) | Pi statusline extension — clean one-line footer with context usage and Anthropic rate-limit utilization. | ⬇ 58/mo | ~1mo ago |
| [pi-session-guard](https://www.npmjs.com/package/pi-session-guard) | Session guard extension for Pi coding agent | ⬇ 58/mo | 3mo ago |
| [pi-toasty](https://www.npmjs.com/package/pi-toasty) | Pi package that shows desktop toast notifications when pi is ready for input. | ⬇ 58/mo | ~1mo ago |
| [pi-websearch-serpapi](https://www.npmjs.com/package/pi-websearch-serpapi) | Pi web search tool powered by SerpAPI | ⬇ 58/mo | ~1mo ago |
| [yukukotani-pi-voice](https://github.com/yukukotani/pi-voice) | Headless voice interface for the Pi Coding Agent | ⭐58 | 3mo ago |
| [@qmxme/pi-git-guard](https://www.npmjs.com/package/@qmxme/pi-git-guard) | Blocks destructive git operations (push, tag -d, reset --hard) in pi | ⬇ 57/mo | ~1mo ago |
| [pi-current-pr](https://www.npmjs.com/package/pi-current-pr) | Pi extension that shows the current GitHub pull request in a widget | ⬇ 57/mo | ~1mo ago |
| [@howaboua/pi-glm-via-anthropic](https://www.npmjs.com/package/@howaboua/pi-glm-via-anthropic) | Use Z.ai GLM models in pi through Z.ai's Anthropic-compatible endpoint. | ⬇ 56/mo | ~1mo ago |
| [dnopi](https://www.npmjs.com/package/dnopi) | Skills and extensions for pi-coding-agent | ⬇ 56/mo | 3mo ago |
| [pi-friday](https://www.npmjs.com/package/pi-friday) | Dedicated communications side panel for pi — routes all conversation to a separate tmux pane with typewriter effect. Optional TTS and wake word detection. User data stored in ~/.pi/agent/friday/. | ⬇ 56/mo | ~1mo ago |
| [pi-image-gen-router](https://www.npmjs.com/package/pi-image-gen-router) | Pi image generation tool that auto-detects available API keys | ⬇ 56/mo | ~1mo ago |
| [pi-openai-codex-status](https://www.npmjs.com/package/pi-openai-codex-status) | Pi extension that shows OpenAI usage for hourly and weekly subscription limits like Codex with a /status command. | ⬇ 56/mo | ~1mo ago |
| [pi-skill-martin-fowler](https://www.npmjs.com/package/pi-skill-martin-fowler) | Pi skill that thinks and advises like Martin Fowler — software design, architecture, refactoring, agile, testing, and delivery. | ⬇ 56/mo | ~1mo ago |
| [pi-yank](https://www.npmjs.com/package/pi-yank) | Lightweight /yank extension for pi that copies the last assistant message or a selected code block. | ⬇ 56/mo | ~1mo ago |
| [@artale/pi-leads](https://www.npmjs.com/package/@artale/pi-leads) | Terminal CRM and outreach pipeline. Track prospects, manage follow-ups, draft messages. | ⬇ 55/mo | 3mo ago |
| [@ayulab/pi-rewind](https://www.npmjs.com/package/@ayulab/pi-rewind) | Pi extension providing /rewind checkpoint navigation | ⬇ 55/mo | today |
| [@qmxme/pie](https://www.npmjs.com/package/@qmxme/pie) | My favorite pi extensions, all in one package. | ⬇ 55/mo | 3mo ago |
| [pi-gitlab-duo](https://www.npmjs.com/package/pi-gitlab-duo) | GitLab Duo provider extension for pi | ⬇ 55/mo | 4mo ago |
| [pi-insights](https://www.npmjs.com/package/pi-insights) | AI coding assistant session analytics and insights for Pi | ⬇ 55/mo | ~1mo ago |
| [pi-scream](https://www.npmjs.com/package/pi-scream) | Usage limits extension for pi coding agent | ⬇ 55/mo | 16d ago |
| [toenobu-agent](https://www.npmjs.com/package/toenobu-agent) | toenobu's pi coding agent skills and extensions | ⬇ 55/mo | ~1mo ago |
| [@zenobius/pi-footer](https://www.npmjs.com/package/@zenobius/pi-footer) | A customisable footer component for the Pi Coding Agent interface. | ⬇ 54/mo | 3mo ago |
| [melihmucuk-pi-crew](https://github.com/melihmucuk/pi-crew) | Non-blocking subagent orchestration for pi. Spawn isolated agents that work in parallel while your session stays interactive. | ⭐54 | 2d ago |
| [pi-auto-rename](https://www.npmjs.com/package/pi-auto-rename) | Auto-rename pi sessions with AI via a single /rename command | ⬇ 54/mo | ~1mo ago |
| [pi-go-review](https://www.npmjs.com/package/pi-go-review) | Review Go code changes against the '100 Go Mistakes and How to Avoid Them' checklist (https://100go.co/). Registers a go_review tool that analyzes git diffs against all 101 common Go mistakes. | ⬇ 54/mo | ~1mo ago |
| [pi-image-subagent](https://www.npmjs.com/package/pi-image-subagent) | Pi extension that gives non-vision models the ability to analyze images via a vision-capable subagent | ⬇ 54/mo | ~1mo ago |
| [pi-websearch-serper](https://www.npmjs.com/package/pi-websearch-serper) | Pi web search tool powered by Serper (Google Search) | ⬇ 54/mo | ~1mo ago |
| [@anthaathi/pi-companion-extensions](https://www.npmjs.com/package/@anthaathi/pi-companion-extensions) | Companion extensions for the pi coding agent — plan mode, and more | ⬇ 53/mo | ~1mo ago |
| [@victor-software-house/pi-agent-browser](https://www.npmjs.com/package/@victor-software-house/pi-agent-browser) | Browser automation tool for Pi via agent-browser CLI | ⬇ 53/mo | ~1mo ago |
| [pi-extension-raptor-mini](https://www.npmjs.com/package/pi-extension-raptor-mini) | pi extension that adds GitHub Copilot's Raptor Mini (oswe-vscode-prime) model to pi's github-copilot provider. | ⬇ 53/mo | ~1mo ago |
| [pi-image-gen-replicate](https://www.npmjs.com/package/pi-image-gen-replicate) | Pi image generation tool powered by Replicate (Flux, SD, and more) | ⬇ 53/mo | ~1mo ago |
| [pi-opensync-plugin](https://www.npmjs.com/package/pi-opensync-plugin) | Pi extension to sync sessions to OpenSync dashboards | ⬇ 53/mo | ~1mo ago |
| [pi-pr-status](https://www.npmjs.com/package/pi-pr-status) | A Pi extension that shows the current PR link, CI check status, and unresolved review comments in the footer status bar | ⬇ 53/mo | 3mo ago |
| [@georgebashi/pi-retry](https://www.npmjs.com/package/@georgebashi/pi-retry) | pi extension: auto-retry transient streaming errors + /retry command | ⬇ 52/mo | 3mo ago |
| [@m64/nats-pi-bridge](https://www.npmjs.com/package/@m64/nats-pi-bridge) | Standalone headless service that spawns and manages PI coding agent sessions on demand via NATS. Control plane / data plane split, streaming wire protocol, multi-session microservice registration. | ⬇ 52/mo | ~1mo ago |
| [@swairshah/pi-talk](https://www.npmjs.com/package/@swairshah/pi-talk) | Text-to-speech extension for Pi coding agent using Loqui | ⬇ 52/mo | 2mo ago |
| [@trq/pi-colgrep](https://www.npmjs.com/package/@trq/pi-colgrep) | pi extension that adds a colgrep tool and prioritizes semantic/hybrid ColGrep search | ⬇ 52/mo | 3mo ago |
| [@victor-software-house/pi-credential-vault](https://www.npmjs.com/package/@victor-software-house/pi-credential-vault) | Managed-provider credential vault for Pi with built-in age, keychain, and passthrough backends | ⬇ 52/mo | 2mo ago |
| [pi-airgun](https://www.npmjs.com/package/pi-airgun) | Pi extensions for LLM context compression and Anthropic prompt caching. Zero LLM inference cost. | ⬇ 52/mo | 2mo ago |
| [pi-deep-review](https://www.npmjs.com/package/pi-deep-review) | Deep PR review extension for Pi with deterministic context packing and Responses API streaming | ⬇ 52/mo | 2mo ago |
| [pi-prompt-autoresearch](https://www.npmjs.com/package/pi-prompt-autoresearch) | A pi extension that iteratively improves prompts with execution-based evaluation and keep/discard decisions. | ⬇ 52/mo | 2mo ago |
| [pi-supacode](https://www.npmjs.com/package/pi-supacode) | Pi extension that reports agent lifecycle hooks to Supacode via Unix domain socket | ⬇ 52/mo | ~1mo ago |
| [pi-websearch-valyu](https://www.npmjs.com/package/pi-websearch-valyu) | Pi web search tool powered by Valyu (academic and paywalled sources) | ⬇ 52/mo | ~1mo ago |
| [@arpagon/pi-web-providers](https://www.npmjs.com/package/@arpagon/pi-web-providers) | Configurable web access extension for pi with per-tool provider routing for search, contents, answers, and research across Claude, Cloudflare, Codex, Custom CLI, Exa, Gemini, Perplexity, Parallel, and | ⬇ 51/mo | 2mo ago |
| [@casualjim/pi-superpowers](https://www.npmjs.com/package/@casualjim/pi-superpowers) | Canonical Superpowers workflow skills and runtime guardrails for pi | ⬇ 51/mo | 29d ago |
| [@fnnm/pi-ast-grep](https://www.npmjs.com/package/@fnnm/pi-ast-grep) | ast-grep extension for Pi. | ⬇ 51/mo | 3mo ago |
| [@petechu/pi-answer-studio](https://www.npmjs.com/package/@petechu/pi-answer-studio) | Interactive Q&A extraction extension for pi | ⬇ 51/mo | 3d ago |
| [pi-clear](https://www.npmjs.com/package/pi-clear) | Adds /clear and /c commands (plus bare message interception) to wipe the conversation context and start a fresh session with a runtime reload. | ⬇ 51/mo | 2mo ago |
| [pi-context-saver](https://www.npmjs.com/package/pi-context-saver) | Pi extension that prevents context bloat by automatically sandboxing heavy tool outputs (bash, web_search, fetch_content, exa_search, read) to temp files | ⬇ 51/mo | 2mo ago |
| [pi-doctor](https://www.npmjs.com/package/pi-doctor) | Analyze Pi agent sessions for quality signals, sentiment drift, and behavioral anti-patterns. | ⬇ 51/mo | ~1mo ago |
| [pi-image-gen-recraft](https://www.npmjs.com/package/pi-image-gen-recraft) | Pi image generation tool powered by Recraft (V3, V4) | ⬇ 51/mo | ~1mo ago |
| [pi-webfetch-to-markdown](https://www.npmjs.com/package/pi-webfetch-to-markdown) | Fetch web content as clean Markdown for AI consumption. Supports Cloudflare's Markdown for Agents content negotiation with Turndown fallback. | ⬇ 51/mo | 3mo ago |
| [pigibrack](https://www.npmjs.com/package/pigibrack) | Pi extension package for structural Scheme/Guile editing with a persistent REPL sidecar | ⬇ 51/mo | ~1mo ago |
| [@carter-mcalister/pi-mise-toolchain](https://www.npmjs.com/package/@carter-mcalister/pi-mise-toolchain) | Codex-compatible request_user_input tool for Pi | ⬇ 50/mo | 16d ago |
| [@codewithkenzo/pi-rig](https://www.npmjs.com/package/@codewithkenzo/pi-rig) | One-command Pi installer for Dispatch and Theme Switcher | ⬇ 50/mo | ~1mo ago |
| [@entelligentsia/pi-ralph](https://www.npmjs.com/package/@entelligentsia/pi-ralph) | Iterative goal-achievement loop for pi — Generator→Critique→Judge, streaming output as it happens | ⬇ 50/mo | 5d ago |
| [@jordyvd/pi-mcp-adapter](https://www.npmjs.com/package/@jordyvd/pi-mcp-adapter) | MCP (Model Context Protocol) adapter extension for Pi coding agent | ⬇ 49/mo | ~1mo ago |
| [@marcfargas/pi-tramp](https://www.npmjs.com/package/@marcfargas/pi-tramp) | TRAMP-like transparent remote execution for pi — tools execute remotely, pi stays local | ⬇ 49/mo | 3mo ago |
| [@ssweens/pi-compaxxt](https://www.npmjs.com/package/@ssweens/pi-compaxxt) | Enhanced compaction for pi — session context and LLM-ranked important files | ⬇ 49/mo | ~1mo ago |
| [pi-monitor](https://www.npmjs.com/package/pi-monitor) | Pi extension for running background processes with live output in a native floating window | ⬇ 49/mo | ~1mo ago |
| [@architectit/pi-guardrails](https://www.npmjs.com/package/@architectit/pi-guardrails) | Four Laws guardrails enforcement for pi coding agent — standalone + MCP bridge | ⬇ 48/mo | 5d ago |
| [@artale/pi-gepa](https://www.npmjs.com/package/@artale/pi-gepa) | Skill scanner and quality scorer for Pi. Scans, scores, and identifies weak skills. Pairs with pi-evolve for mutation. | ⬇ 48/mo | 2mo ago |
| [@lnittman/pi-steer](https://www.npmjs.com/package/@lnittman/pi-steer) | Steering compiler for pi — turn-by-turn decision prompts, context-aware handoff synthesis, and pickup-ready prompt packaging | ⬇ 48/mo | ~1mo ago |
| [@lukebarton/pi-de-claude](https://www.npmjs.com/package/@lukebarton/pi-de-claude) | IDE integration for pi with any IDE running a Claude Code plugin-including VS Code, Neovim, IntelliJ IDEA, and other JetBrains IDEs. It lets the LLM interact with your IDE for operations like diff vie | ⬇ 48/mo | 3mo ago |
| [@rwese/pi-webfetch](https://www.npmjs.com/package/@rwese/pi-webfetch) | Webfetch extension for pi coding agent | ⬇ 48/mo | ~1mo ago |
| [pi-cli-dynamic-tools](https://www.npmjs.com/package/pi-cli-dynamic-tools) | Pi extension that manages a local toolbox of auto-generated CLI tools | ⬇ 48/mo | ~1mo ago |
| [pi-forms](https://www.npmjs.com/package/pi-forms) | Interactive TUI form overlay tool for pi agents. Collect structured input via declarative form schemas. | ⬇ 48/mo | ~1mo ago |
| [pi-notion](https://www.npmjs.com/package/pi-notion) | Notion integration for Pi Coding Agent — search, fetch, create, and update Notion pages as Markdown with a TUI config editor | ⬇ 48/mo | 2mo ago |
| [pi-stash](https://www.npmjs.com/package/pi-stash) | Pi extension that stashes the current editor draft with Alt+S | ⬇ 48/mo | 2mo ago |
| [pi-websearch-brave](https://www.npmjs.com/package/pi-websearch-brave) | Pi web search tool powered by Brave Search | ⬇ 48/mo | ~1mo ago |
| [pi-websearch-jina](https://www.npmjs.com/package/pi-websearch-jina) | Pi web search tool powered by Jina AI | ⬇ 48/mo | ~1mo ago |
| [pi-websearch-perplexity](https://www.npmjs.com/package/pi-websearch-perplexity) | Pi web search tool powered by Perplexity Sonar | ⬇ 48/mo | ~1mo ago |
| [tomsej-pi-ext](https://github.com/tomsej/pi-ext) | Extensions, skills, and themes for Pi coding agent | ⭐48 | ~1mo ago |
| [@artale/pi-stack](https://www.npmjs.com/package/@artale/pi-stack) | Local AI infrastructure generator. Docker compose for Ollama, n8n, Flowise, Supabase, Neo4j, and more. | ⬇ 47/mo | 3mo ago |
| [@gericomaverick/pi-team-orchestrator](https://www.npmjs.com/package/@gericomaverick/pi-team-orchestrator) | Pi extension for team/project orchestration with markdown-defined teams and session-backed state | ⬇ 47/mo | 2mo ago |
| [@victor-software-house/pi-context-optimizer](https://www.npmjs.com/package/@victor-software-house/pi-context-optimizer) | Pi extension for command rewriting and tool-output compaction optimization. | ⬇ 47/mo | 2mo ago |
| [@vpellegrino/pi-skills](https://www.npmjs.com/package/@vpellegrino/pi-skills) | Vitor's collection of pi coding agent skills, extensions, and themes | ⬇ 47/mo | 4mo ago |
| [@zgltyq/pi-minimax-image](https://www.npmjs.com/package/@zgltyq/pi-minimax-image) | MiniMax Image Understanding extension for pi coding agent - provides understand_image tool | ⬇ 47/mo | ~1mo ago |
| [pi-pet-hn](https://www.npmjs.com/package/pi-pet-hn) | Virtual pet that levels up with every tool call + HackerNews scrolling ticker for pi coding agent. | ⬇ 47/mo | 3mo ago |
| [pi-powerpoint](https://www.npmjs.com/package/pi-powerpoint) | Pi skill for creating and editing PowerPoint files via CLI, wrapping office-powerpoint-mcp-server | ⬇ 47/mo | 4mo ago |
| [pi-tau-mux](https://www.npmjs.com/package/pi-tau-mux) | Web UI that mirrors your Pi terminal session in the browser - tmux session aware | ⬇ 47/mo | 2mo ago |
| [pi-vscode-terminal-notification](https://www.npmjs.com/package/pi-vscode-terminal-notification) | Pi extension for VS Code terminal notifications when Pi finishes a turn. | ⬇ 47/mo | 4mo ago |
| [@guwidoe/pi-web-search](https://www.npmjs.com/package/@guwidoe/pi-web-search) | pi skill: web search via DuckDuckGo with optional page content extraction | ⬇ 46/mo | 3mo ago |
| [@ifiokjr/oh-pi-extensions](https://www.npmjs.com/package/@ifiokjr/oh-pi-extensions) | Core pi extensions: safe-guard, git-guard, auto-session, custom-footer, and more. | ⬇ 46/mo | 3mo ago |
| [@indiekitai/pi-skills](https://www.npmjs.com/package/@indiekitai/pi-skills) | IndieKit developer tools as Pi/Claude Code/Codex skills — PostgreSQL health, schema diff, type generation, rate limiting, terminal styling, and more | ⬇ 46/mo | 3mo ago |
| [@miclivs/pi-psst](https://www.npmjs.com/package/@miclivs/pi-psst) | Pi extension that injects psst vault secrets into bash and scrubs them from output | ⬇ 46/mo | ~1mo ago |
| [@rhobot-dev/pi-ralph](https://www.npmjs.com/package/@rhobot-dev/pi-ralph) | pi extension/package to manage ralph loops from within the pi TUI | ⬇ 46/mo | 4mo ago |
| [pi-confluence](https://www.npmjs.com/package/pi-confluence) | Confluence integration for Pi Coding Agent — search, fetch, and save Confluence pages as Markdown with a TUI config editor | ⬇ 46/mo | 2mo ago |
| [pi-tau-mux-server](https://www.npmjs.com/package/pi-tau-mux-server) | Standalone Tau server - aggregates multiple pi coding agent instances into one web UI with Tailscale support | ⬇ 46/mo | 2mo ago |
| [@sincspecv/pi-chutes](https://www.npmjs.com/package/@sincspecv/pi-chutes) | pi extension that adds chutes.ai as a model provider | ⬇ 45/mo | ~1mo ago |
| [pi-flow-enforcer](https://www.npmjs.com/package/pi-flow-enforcer) | Enforces a strict workflow in pi.dev sessions: | ⬇ 45/mo | 4mo ago |
| [pi-read-mode](https://www.npmjs.com/package/pi-read-mode) | Scroll through conversation history while composing a follow-up | ⬇ 45/mo | 2mo ago |
| [pi-speak-pk](https://www.npmjs.com/package/pi-speak-pk) | Voice, wake-word, Telegram, and mobile web remote extensions for Pi. | ⬇ 45/mo | 3d ago |
| [pi-yep-search](https://www.npmjs.com/package/pi-yep-search) | Yep Search API extension for pi — adds a web_search tool backed by https://platform.yep.com | ⬇ 45/mo | ~1mo ago |
| [@gigachain/pi-gigachat](https://www.npmjs.com/package/@gigachain/pi-gigachat) | GigaChat provider extension for pi-coding-agent | ⬇ 44/mo | ~1mo ago |
| [@joemccann/pi-canvas-design](https://www.npmjs.com/package/@joemccann/pi-canvas-design) | Create museum-quality visual art and design philosophies expressed as .png and .pdf canvases using pi | ⬇ 44/mo | 2mo ago |
| [pi-image-gen-xai](https://www.npmjs.com/package/pi-image-gen-xai) | Pi image generation tool powered by xAI (Grok Imagine / Aurora) | ⬇ 44/mo | ~1mo ago |
| [pi-session-summary](https://www.npmjs.com/package/pi-session-summary) | A pi extension that maintains an LLM-generated one-line session summary as the session name | ⬇ 44/mo | ~1mo ago |
| [picassio-pi-squad](https://github.com/picassio/pi-squad) | Multi-agent collaboration extension for pi — task decomposition, dependency management, parallel execution, TUI panel | ⭐44 | ~1mo ago |
| [@artale/pi-tokens](https://www.npmjs.com/package/@artale/pi-tokens) | Token cost intelligence for Pi. Per-tool cost breakdown, $/call estimates, budget alerts, expensive call finder. | ⬇ 43/mo | 2mo ago |
| [@mazli/pi-worktree](https://www.npmjs.com/package/@mazli/pi-worktree) | A Pi package extension that simplifies creating and managing git worktrees. | ⬇ 43/mo | 5d ago |
| [@wdalhaj/pi-astro-mcp](https://www.npmjs.com/package/@wdalhaj/pi-astro-mcp) | Pi extension that connects to the Astro Docs MCP server and exposes a search_astro_docs tool | ⬇ 43/mo | ~1mo ago |
| [pi-bitbucket](https://www.npmjs.com/package/pi-bitbucket) | Bitbucket Cloud integration for Pi — repos, PRs, branches, pipelines, and issues | ⬇ 43/mo | 2mo ago |
| [pi-extension-stt](https://www.npmjs.com/package/pi-extension-stt) | Pi extension package that adds local microphone speech-to-text via faster-whisper. | ⬇ 43/mo | ~1mo ago |
| [pi-quiz](https://www.npmjs.com/package/pi-quiz) | Active quiz for code and document understanding in pi | ⬇ 43/mo | 16d ago |
| [@artale/pi-clipboard](https://www.npmjs.com/package/@artale/pi-clipboard) | Clipboard manager for Pi. Copy/paste with persistent history, search, pin, and GitHub gist creation. | ⬇ 42/mo | 2mo ago |
| [@artale/pi-infra](https://www.npmjs.com/package/@artale/pi-infra) | Platform engineering audit tool (Kelsey Hightower edition). | ⬇ 42/mo | 3mo ago |
| [@ifiokjr/oh-pi-skills](https://www.npmjs.com/package/@ifiokjr/oh-pi-skills) | On-demand skill packs for pi: web-search, debug-helper, git-workflow, and more. | ⬇ 42/mo | 3mo ago |
| [@mobrienv/pi-otlp](https://www.npmjs.com/package/@mobrienv/pi-otlp) | OpenTelemetry metrics and events extension for pi-coding-agent | ⬇ 42/mo | 3mo ago |
| [@ssweens/pi-qq](https://www.npmjs.com/package/@ssweens/pi-qq) | Quick questions with /qq or /btw — ask the LLM about the current session without affecting the main conversation | ⬇ 42/mo | ~1mo ago |
| [msco-pi-lot](https://www.npmjs.com/package/msco-pi-lot) | Microsoft Copilot provider extension for pi coding agent. | ⬇ 42/mo | 2mo ago |
| [pi-codex-profile](https://www.npmjs.com/package/pi-codex-profile) | Codex profile extension for pi coding agent (Codex model presets + apply_patch tool) | ⬇ 42/mo | 4mo ago |
| [pi-qwen-fix](https://www.npmjs.com/package/pi-qwen-fix) | Fixes Qwen API compatibility issues with tool calling and developer role | ⬇ 42/mo | 3mo ago |
| [pi-stories](https://www.npmjs.com/package/pi-stories) | Multi-agent orchestration with Blueprint Engine [D]/[N] interleaving and cost routing | ⬇ 42/mo | 3mo ago |
| [pi-websearch-parallel](https://www.npmjs.com/package/pi-websearch-parallel) | Pi web search tool powered by Parallel | ⬇ 42/mo | ~1mo ago |
| [pjlee-pi-package](https://www.npmjs.com/package/pjlee-pi-package) | Peter's pi coding agent commands, skills, extensions, and themes | ⬇ 42/mo | 3mo ago |
| [@aaronmaturen/pi-config](https://www.npmjs.com/package/@aaronmaturen/pi-config) | Professional development workflow skills for pi — JIRA integration, PR review, and investigation tools | ⬇ 41/mo | 3mo ago |
| [@artale/pi-grounded](https://www.npmjs.com/package/@artale/pi-grounded) | Evidence-grounded schema discovery. Zero-shot, self-documenting, every decision cited. | ⬇ 41/mo | 3mo ago |
| [pi-claude-boost](https://www.npmjs.com/package/pi-claude-boost) | Shows whether Claude's 2x usage boost is active right now, with countdowns in both directions | ⬇ 41/mo | 2mo ago |
| [pi-rollback](https://www.npmjs.com/package/pi-rollback) | Branch-aware rollback for pi — return to the last relevant point, summarize the detour, and continue from cleaner context. | ⬇ 41/mo | ~1mo ago |
| [pi-scheduled-tasks](https://www.npmjs.com/package/pi-scheduled-tasks) | A pi extension for scheduled prompts, recurring checks, and prompt-executable slash commands | ⬇ 41/mo | ~1mo ago |
| [pi-tutor](https://www.npmjs.com/package/pi-tutor) | A stateful tutor package for pi that adds hint-first, track-aware teaching workflows. | ⬇ 41/mo | ~1mo ago |
| [pi-websearch-linkup](https://www.npmjs.com/package/pi-websearch-linkup) | Pi web search tool powered by Linkup | ⬇ 41/mo | ~1mo ago |
| [pi-websearch-you](https://www.npmjs.com/package/pi-websearch-you) | Pi web search tool powered by You.com | ⬇ 41/mo | ~1mo ago |
| [VenTheZone-pi-dots](https://github.com/VenTheZone/pi-dots) | All the skills you'll need for AI-powered development with pi-coding-agent. 60+ skills covering research, content, project management, debugging, and more. Includes external-scout for implementation p | ⭐41 | 16d ago |
| [@artale/pi-rewind](https://www.npmjs.com/package/@artale/pi-rewind) | Checkpoint and rewind for Pi. Auto-snapshot before edits, /rewind to restore with diff preview. | ⬇ 40/mo | 2mo ago |
| [@cuzfrog/pi-module-gates](https://www.npmjs.com/package/@cuzfrog/pi-module-gates) | pi extension that controls the entropy of the codebase by enforcing code module boundaries. | ⬇ 40/mo | yesterday |
| [@tribalnerd/pi-notes](https://www.npmjs.com/package/@tribalnerd/pi-notes) | A Pi extension for deterministic human notes across project and global scopes. | ⬇ 40/mo | ~1mo ago |
| [@victor-software-house/pi-terminal-env](https://www.npmjs.com/package/@victor-software-house/pi-terminal-env) | Tiny zero-dep helpers to detect the terminal emulator pi is running in (iTerm2, tmux, etc.). Pure env-var probes, no I/O. | ⬇ 40/mo | 13d ago |
| [code-submit](https://www.npmjs.com/package/code-submit) | Pi skill + TUI for generating HTML submission reports and opening GitHub draft PRs | ⬇ 40/mo | ~1mo ago |
| [pi-2048](https://www.npmjs.com/package/pi-2048) | 2048 sliding tile puzzle for pi coding agent | ⬇ 40/mo | 3mo ago |
| [pi-glm-image-summary](https://www.npmjs.com/package/pi-glm-image-summary) | Pi extension that intercepts image reads when using glm-4.7 and sends them to glm-4.6v for detailed analysis | ⬇ 40/mo | 4mo ago |
| [pi-open-sessions-files-extension](https://www.npmjs.com/package/pi-open-sessions-files-extension) | pi extension to fuzzy-pick and open files edited by the agent in the current session | ⬇ 40/mo | 3mo ago |
| [pi-rtk-noemoji](https://www.npmjs.com/package/pi-rtk-noemoji) | Fork of pi-rtk with all emoji removed from output. Same token reduction, plain text only. | ⬇ 40/mo | 2mo ago |
| [pi-telemetry-otel](https://www.npmjs.com/package/pi-telemetry-otel) | OpenTelemetry (OTLP/HTTP) telemetry extension + helper APIs for pi | ⬇ 40/mo | 4mo ago |
| [pi-websearch-exa](https://www.npmjs.com/package/pi-websearch-exa) | Pi web search tool powered by Exa | ⬇ 40/mo | ~1mo ago |
| [@alpino13/pi-ask](https://www.npmjs.com/package/@alpino13/pi-ask) | Pi package for interactive multi-question clarification flows, with a model-callable ask_questions tool and tabbed questionnaire UI. | ⬇ 39/mo | ~1mo ago |
| [@artale/pi-sysmon](https://www.npmjs.com/package/@artale/pi-sysmon) | System monitor & resource manager. RAM/disk dashboard, process audit, memory hog detection, one-click cleanup. Carmack-style: measure everything, cut the waste. | ⬇ 39/mo | 3mo ago |
| [pi-pirs](https://www.npmjs.com/package/pi-pirs) | Pi extension that tracks bash tool token usage with stats, grouping, and export | ⬇ 39/mo | 3mo ago |
| [pi-worlds](https://www.npmjs.com/package/pi-worlds) | Pi extension for generating 3D worlds via the World Labs Marble API | ⬇ 39/mo | ~1mo ago |
| [sonpiaz-hidrix-tools](https://github.com/sonpiaz/hidrix-tools) | Standalone MCP server: web search, social media search, web fetch tools for Claude Code / Pi agent | ⭐39 | ~1mo ago |
| [@0xkobold/pi-autoupdate](https://www.npmjs.com/package/@0xkobold/pi-autoupdate) | Automatically detect and install pi updates on startup | ⬇ 38/mo | 2mo ago |
| [@artale/pi-context](https://www.npmjs.com/package/@artale/pi-context) | Context window intelligence for Pi. Usage prediction, message forecast, rate trending, auto-warnings. | ⬇ 38/mo | 2mo ago |
| [@artale/pi-focus](https://www.npmjs.com/package/@artale/pi-focus) | Focus timer with productivity metrics for Pi. Tracks tok/min during focus vs break. Data-driven productivity. | ⬇ 38/mo | 2mo ago |
| [@artale/pi-gate](https://www.npmjs.com/package/@artale/pi-gate) | Conditional execution gates for Pi. Hold, approve, or block tool calls based on rules. Safety layer for dangerous operations. | ⬇ 38/mo | 2mo ago |
| [@artale/pi-json](https://www.npmjs.com/package/@artale/pi-json) | Interactive JSON viewer, query, and formatter for pi. | ⬇ 38/mo | 3mo ago |
| [@clankie/sandbox](https://www.npmjs.com/package/@clankie/sandbox) | Gondolin micro-VM sandbox for clankie — runs agent tools inside an isolated VM with network policies, secret injection, and filesystem isolation | ⬇ 38/mo | 3mo ago |
| [@guwidoe/pi-web-fetch](https://www.npmjs.com/package/@guwidoe/pi-web-fetch) | pi skill: fetch webpage content as markdown with fallback web search | ⬇ 38/mo | 3mo ago |
| [@lajarre/pi-session-ask](https://www.npmjs.com/package/@lajarre/pi-session-ask) | Ask questions about any Pi session (by path, UUID, or name) via an isolated subagent, keeping current context clean. | ⬇ 38/mo | ~1mo ago |
| [@walterra/pi-graphviz](https://www.npmjs.com/package/@walterra/pi-graphviz) | Graphviz chart extension for pi coding agent - render DOT diagrams as inline images | ⬇ 38/mo | 2mo ago |
| [pi-breaker](https://www.npmjs.com/package/pi-breaker) | Prevents macOS freezes during pi sessions. Auto-kills runaway processes when memory runs out. | ⬇ 38/mo | 2mo ago |
| [pi-episodic-memory](https://www.npmjs.com/package/pi-episodic-memory) | Episodic memory for pi – semantic search over past sessions | ⬇ 38/mo | 3mo ago |
| [pi-gemini-cli-quota](https://www.npmjs.com/package/pi-gemini-cli-quota) | Pi extension to view precise Google Cloud Code Assist (Gemini CLI) quotas. | ⬇ 38/mo | 3mo ago |
| [psm-bridge](https://www.npmjs.com/package/psm-bridge) | Bridge Pi agent sessions to Pi Session Manager — session sync, tagging, search, and live mode. | ⬇ 38/mo | ~1mo ago |
| [@4meta5/pi-zsh](https://www.npmjs.com/package/@4meta5/pi-zsh) | Allowlist-only zsh script runner extension for pi coding agents. | ⬇ 37/mo | 3mo ago |
| [@artale/pi-rag](https://www.npmjs.com/package/@artale/pi-rag) | Local RAG pipeline. BM25 keyword search over indexed files. Zero cloud, zero deps, fully offline. | ⬇ 37/mo | 3mo ago |
| [@artale/pi-sudoku](https://www.npmjs.com/package/@artale/pi-sudoku) | Classic 9x9 Sudoku puzzle with pencil marks, themes, and stats. | ⬇ 37/mo | 3mo ago |
| [@datspike/pi-ask-user](https://www.npmjs.com/package/@datspike/pi-ask-user) | Interactive ask_user tool for pi-coding-agent with wrapped selection UI, batch clarifications, and freeform input | ⬇ 37/mo | ~1mo ago |
| [@rjshrjndrn/pi-sandbox](https://www.npmjs.com/package/@rjshrjndrn/pi-sandbox) | Filesystem boundary enforcement for pi — prompts before the agent escapes your project | ⬇ 37/mo | 2mo ago |
| [@skdev-ai/pi-gemini-cli-search](https://www.npmjs.com/package/@skdev-ai/pi-gemini-cli-search) | Pi/GSD extension providing grounded web search via Gemini CLI's A2A and ACP protocols. Uses your existing Google AI Pro subscription. | ⬇ 37/mo | 2mo ago |
| [leohenon-pi-anthropic-oauth](https://github.com/leohenon/pi-anthropic-oauth) | Pi extension for Anthropic OAuth with Claude Pro/Max. | ⭐37 | 14d ago |
| [pi-dispatch](https://www.npmjs.com/package/pi-dispatch) | Dispatch requests across multiple ChatGPT Codex OAuth accounts for pi | ⬇ 37/mo | ~1mo ago |
| [pi-mdc-rules](https://www.npmjs.com/package/pi-mdc-rules) | MDC rules extension for pi-coding-agent - loads and enforces rules from Markdown files | ⬇ 37/mo | 3mo ago |
| [pi-opinionated-glm](https://www.npmjs.com/package/pi-opinionated-glm) | Provider-only Pi package that registers a dedicated glm provider backed by OpenCode Zen. | ⬇ 37/mo | ~1mo ago |
| [pi-proof](https://www.npmjs.com/package/pi-proof) | Proof-first Pi extension that uses a red-green-refactor cycle when behavior should be specified in tests first, with built-in parsing for popular test frameworks. | ⬇ 37/mo | ~1mo ago |
| [pi-scheduler](https://www.npmjs.com/package/pi-scheduler) | Simple scheduled loop/reminder extension for pi | ⬇ 37/mo | 3mo ago |
| [pi-sonar](https://www.npmjs.com/package/pi-sonar) | SonarQube integration for pi coding agent — tools, skills, and workflows for finding and fixing sonar issues | ⬇ 37/mo | ~1mo ago |
| [@0xkobold/pi-wallet](https://www.npmjs.com/package/@0xkobold/pi-wallet) | CDP Agentic Wallet + x402 payments for pi-coding-agent. Zero-setup agent wallets with Base L2 support | ⬇ 36/mo | 2mo ago |
| [@artale/pi-compact](https://www.npmjs.com/package/@artale/pi-compact) | Smart context compaction for Pi. Topic-aware summarization that preserves code context and drops chatter. Configurable strategies. | ⬇ 36/mo | 2mo ago |
| [@artale/pi-datasci](https://www.npmjs.com/package/@artale/pi-datasci) | Data science toolkit. Profile datasets, correlation matrices, outlier detection, statistical summaries. CSV/JSON/JSONL support. | ⬇ 36/mo | 3mo ago |
| [@artale/pi-maze](https://www.npmjs.com/package/@artale/pi-maze) | Procedural maze generator with BFS solver, themes, and timer. | ⬇ 36/mo | 3mo ago |
| [@hyperprior/pi-browser](https://www.npmjs.com/package/@hyperprior/pi-browser) | Lightweight browser helper tools | ⬇ 36/mo | 3mo ago |
| [pi-safety-destructive-commands](https://www.npmjs.com/package/pi-safety-destructive-commands) | Intercepts dangerous bash commands (dd, mkfs, rm -rf /, fork bombs, iptables flush, shutdown…) and hard-blocks or prompts for confirmation before execution. | ⬇ 36/mo | 2mo ago |
| [pi-search-skill](https://www.npmjs.com/package/pi-search-skill) | DuckDuckGo search skill for pi - lightweight and fast | ⬇ 36/mo | 2mo ago |
| [v2nic-pi-caveman](https://github.com/v2nic/pi-caveman) | Caveman mode for Pi coding agent - ultra-compressed communication that cuts ~75% of output tokens | ⭐36 | ~1mo ago |
| [@0xkobold/pi-erc8004](https://www.npmjs.com/package/@0xkobold/pi-erc8004) | ERC-8004 Protocol for pi-coding-agent. Agent identity, reputation, and discovery on Base L2 | ⬇ 35/mo | 2mo ago |
| [@4meta5/pi-shell-cli](https://www.npmjs.com/package/@4meta5/pi-shell-cli) | CLI for generating reproducible pi project instances from pinned manifests. | ⬇ 35/mo | 3mo ago |
| [@alexgorbatchev/pi-cmux-notify](https://www.npmjs.com/package/@alexgorbatchev/pi-cmux-notify) | pi package for cmux notifications | ⬇ 35/mo | ~1mo ago |
| [@artale/pi-health](https://www.npmjs.com/package/@artale/pi-health) | Session health with error diagnosis for Pi. Detects error patterns, warns on degradation, tracks tool reliability. | ⬇ 35/mo | 2mo ago |
| [@brain0pia/pi-notify](https://www.npmjs.com/package/@brain0pia/pi-notify) | Pi package that sends Telegram notifications after each completed agent response. | ⬇ 35/mo | 2mo ago |
| [@davehardy20/pi-mulch](https://www.npmjs.com/package/@davehardy20/pi-mulch) | Pi package that integrates Mulch priming, search, draft review, and session-aware learning workflows. | ⬇ 35/mo | 4d ago |
| [pi-almanac](https://www.npmjs.com/package/pi-almanac) | Pi extension for exporting current session JSONL files for cross-machine resume workflows | ⬇ 35/mo | 2mo ago |
| [pi-refactor-loop](https://www.npmjs.com/package/pi-refactor-loop) | Iterative refactoring pipeline for pi. Runs analyze → refactor → verify cycles with a TUI progress widget, git commit-and-push per pass, and a bundled SKILL.md guide. | ⬇ 35/mo | 2mo ago |
| [pi-surf](https://www.npmjs.com/package/pi-surf) | Surf the web from pi — clean URL fetching, pluggable search, and scout subagent that keeps noise out of your context | ⬇ 35/mo | 3mo ago |
| [@artale/pi-db](https://www.npmjs.com/package/@artale/pi-db) | Local database with SQL-like queries. JSON-backed tables with where clauses, schema, export. | ⬇ 34/mo | 3mo ago |
| [@cmcconomy/pi-qwen-tool-parser](https://www.npmjs.com/package/@cmcconomy/pi-qwen-tool-parser) | A pi-mono extension that parses Qwen XML formatted tool calls and provides a wrapper tool for execution | ⬇ 34/mo | ~1mo ago |
| [@furbyhaxx/pi-session-naming](https://www.npmjs.com/package/@furbyhaxx/pi-session-naming) | Pi extension for automatic session titles, rename, browsing, and session listing. | ⬇ 34/mo | 12d ago |
| [@umgbhalla/pi-gigaplan](https://www.npmjs.com/package/@umgbhalla/pi-gigaplan) | Structured AI planning with cross-model critique — gigaplan as a pi extension | ⬇ 34/mo | 2mo ago |
| [HashWarlock-nobody-plans-for-pi](https://github.com/HashWarlock/nobody-plans-for-pi) | Self-improving development workflows for pi coding agent. Subagent orchestration, TDD, systematic debugging. Adapted from obra/superpowers. | ⭐34 | ~1mo ago |
| [pi-context-filter](https://www.npmjs.com/package/pi-context-filter) | A pi extension that provides .gitignore-style control over which context files and skills appear in the system prompt | ⬇ 34/mo | 4mo ago |
| [pi-dumb](https://www.npmjs.com/package/pi-dumb) | Context rot indicator for Pi — shows token usage with research-backed degradation warnings | ⬇ 34/mo | ~1mo ago |
| [pi-loop-breaker](https://www.npmjs.com/package/pi-loop-breaker) | Pi extension that aborts repeated failing tool loops | ⬇ 34/mo | 2mo ago |
| [pi-overwatch](https://www.npmjs.com/package/pi-overwatch) | Minimal TUI observability for Pi sessions, with tmux session awareness and cwd fallback | ⬇ 34/mo | ~1mo ago |
| [pi-security-scanner](https://www.npmjs.com/package/pi-security-scanner) | Security scanner and runtime protection for Pi Coding Agent | ⬇ 34/mo | 3mo ago |
| [pi-session-investigator](https://www.npmjs.com/package/pi-session-investigator) | Forensic tools for Pi sessions - file recovery, subagent tracing, timeline reconstruction | ⬇ 34/mo | 3mo ago |
| [@artale/pi-doc](https://www.npmjs.com/package/@artale/pi-doc) | Documentation generator. Scan exports, check doc coverage, scaffold READMEs, generate API reference. | ⬇ 33/mo | 3mo ago |
| [@artale/pi-notify](https://www.npmjs.com/package/@artale/pi-notify) | Cross-platform notifications. Desktop toasts (Win/Mac/Linux), Slack/Discord webhooks, notification history. | ⬇ 33/mo | 3mo ago |
| [@elwinliu/pi-neapple](https://www.npmjs.com/package/@elwinliu/pi-neapple) | Custom input box with closed rectangular border | ⬇ 33/mo | 3mo ago |
| [@jademind/pi-visual](https://www.npmjs.com/package/@jademind/pi-visual) | Advanced visualization extension for Pi sessions with rich markdown, Mermaid, and chart rendering. | ⬇ 33/mo | 3mo ago |
| [@jordyvd/pi-openai-compaction](https://www.npmjs.com/package/@jordyvd/pi-openai-compaction) | OpenAI native standalone compaction replay for Pi. | ⬇ 33/mo | 2mo ago |
| [pi-auto-mode-router](https://www.npmjs.com/package/pi-auto-mode-router) | Auto Mode Router extension for Pi: route prompts between frontend, logic, and terminal models with optional mid-turn domain switching. | ⬇ 33/mo | 2mo ago |
| [@anson-no-bug/pi-pet-plus](https://www.npmjs.com/package/@anson-no-bug/pi-pet-plus) | A real-time pet companion for pi with progression, localization, and optional news delivery | ⬇ 32/mo | ~1mo ago |
| [@artale/pi-diff-guard](https://www.npmjs.com/package/@artale/pi-diff-guard) | Edit awareness for Pi. Tracks file changes, warns on large deletions, shows edit heatmap. /diffguard report for hotspot analysis. | ⬇ 32/mo | 2mo ago |
| [@artale/pi-statusbar](https://www.npmjs.com/package/@artale/pi-statusbar) | Custom status bar for Pi. Shows context %, tokens, cost estimate, git branch, and uptime in the footer. | ⬇ 32/mo | 2mo ago |
| [butttons-pi-kit](https://github.com/butttons/pi-kit) | Personal pi coding agent extensions and skills | ⭐32 | today |
| [IgorWarzocha-pi-semantic-grep](https://github.com/IgorWarzocha/pi-semantic-grep) | Pi extension that enables agents to look things up via natural language query. | ⭐32 | 8d ago |
| [pi-auth-profiles](https://www.npmjs.com/package/pi-auth-profiles) | Auth profile switching for pi — save and switch between named credential profiles via slash commands | ⬇ 32/mo | 2mo ago |
| [pi-file-change-reminder](https://www.npmjs.com/package/pi-file-change-reminder) | Pi extension that injects reminder messages when specific files are modified. | ⬇ 32/mo | ~1mo ago |
| [pi-sync-config](https://www.npmjs.com/package/pi-sync-config) | Sync your pi config (settings, extensions, themes, skills, prompts) to a remote git repository | ⬇ 32/mo | ~1mo ago |
| [@0xkobold/pi-skills](https://www.npmjs.com/package/@0xkobold/pi-skills) | Dynamic Skill Creator Extension for pi agent | ⬇ 31/mo | 2mo ago |
| [@georgebashi/pi-codemode](https://www.npmjs.com/package/@georgebashi/pi-codemode) | Code Mode extension for Pi — execute tools via TypeScript code, with type-checking, shell via zx, and MCP integration | ⬇ 31/mo | 3mo ago |
| [@hyperprior/pi-ssh](https://www.npmjs.com/package/@hyperprior/pi-ssh) | Remote command execution via SSH | ⬇ 31/mo | 3mo ago |
| [@patriceckhart/pi-todo](https://www.npmjs.com/package/@patriceckhart/pi-todo) | A pi extension for managing todos synced with Apple Reminders | ⬇ 31/mo | 2mo ago |
| [ghoseb-pi-askuserquestion](https://github.com/ghoseb/pi-askuserquestion) | A tool for pi Coding Agent to ask questions via the TUI. | ⭐31 | ~1mo ago |
| [kimicodeprovider](https://www.npmjs.com/package/kimicodeprovider) | pi-coding-agent extension for Kimi/Moonshot API with configurable base URL | ⬇ 31/mo | 4mo ago |
| [pi-ask-user-question](https://www.npmjs.com/package/pi-ask-user-question) | Adds an askUserQuestion tool that lets the model pause and ask the user a clarifying question before proceeding. | ⬇ 31/mo | 2mo ago |
| [pi-evolve](https://www.npmjs.com/package/pi-evolve) | Genetic-programming style brainstorming command for pi. /evolve generates 5 alternatives, you pick one, repeat until you finalize. | ⬇ 31/mo | ~1mo ago |
| [pi-model-hub](https://www.npmjs.com/package/pi-model-hub) | Manage LLM model providers from multiple local files and remote URLs in pi-coding-agent | ⬇ 31/mo | 2d ago |
| [pi-peacock](https://www.npmjs.com/package/pi-peacock) | Peacock-style workspace coloring, repo badges, and terminal titles for pi coding agent | ⬇ 31/mo | 2mo ago |
| [pi-prompt-stash](https://www.npmjs.com/package/pi-prompt-stash) | Git-stash for your train of thought — save prompt drafts with ctrl+s, restore with ctrl+shift+s | ⬇ 31/mo | 3mo ago |
| [pi-terminal](https://www.npmjs.com/package/pi-terminal) | Adds /terminal and /t commands to run shell commands in the current working directory and display output inline — with smart truncation and TUI notifications. | ⬇ 31/mo | 2mo ago |
| [qnaigc-llm-provider](https://www.npmjs.com/package/qnaigc-llm-provider) | QNAIGC provider extension for pi-mono - Anthropic-compatible API for Chinese LLMs | ⬇ 31/mo | 2mo ago |
| [@artale/pi-evolve](https://www.npmjs.com/package/@artale/pi-evolve) | Evolutionary self-improvement for Pi. AlphaEvolve-inspired mutation, evaluation, and selection of prompts, skills, and extensions. Open-ended agent evolution. | ⬇ 30/mo | 2mo ago |
| [@artale/pi-serial](https://www.npmjs.com/package/@artale/pi-serial) | Hardware/IoT interface. List serial ports, identify devices (Arduino, ESP32, 3D printers), send/receive data, monitor sessions. | ⬇ 30/mo | 3mo ago |
| [@brain0pia/pi-extension-times](https://www.npmjs.com/package/@brain0pia/pi-extension-times) | Profile Pi extension startup time, inspect slow extensions, and guide safe performance optimizations. | ⬇ 30/mo | 2mo ago |
| [@hyperprior/pi-ask](https://www.npmjs.com/package/@hyperprior/pi-ask) | Structured question/answer tool for pi sessions | ⬇ 30/mo | 3mo ago |
| [@lnittman/pi-prompts](https://www.npmjs.com/package/@lnittman/pi-prompts) | Tool-pack contract for pi-mono SDK consumers — composable extension factories for code, HIL, orchestration, and annotation capabilities, consumable by any product that uses @mariozechner/pi-coding-age | ⬇ 30/mo | ~1mo ago |
| [@mcowger/pi-env-var-provider](https://www.npmjs.com/package/@mcowger/pi-env-var-provider) | Pi extension: register a custom OpenAI-compatible provider from environment variables. Configure baseUrl, apiKey, and models via env vars without editing models.json. | ⬇ 30/mo | ~1mo ago |
| [git-metadata](https://www.npmjs.com/package/git-metadata) | Pi extension that provides git repository metadata — branch, remotes, commits, tags, status, and contributors | ⬇ 30/mo | 2mo ago |
| [mike-heunher-pipane](https://github.com/mike-heunher/pipane) | PIpane, a web UI for the PI agent | ⭐30 | 2mo ago |
| [pi-glitchgate](https://www.npmjs.com/package/pi-glitchgate) | Pi coding agent extension providing access to Glitchgate models via API key authentication | ⬇ 30/mo | ~1mo ago |
| [pi-meta-prompt](https://www.npmjs.com/package/pi-meta-prompt) | Pi extension that rewrites task descriptions into optimized prompts using customizable meta-prompts | ⬇ 30/mo | 2mo ago |
| [pi-models-dev-providers](https://www.npmjs.com/package/pi-models-dev-providers) | A pi-coding-agent extension to use model.dev providers | ⬇ 30/mo | ~1mo ago |
| [pi-native-web-search](https://www.npmjs.com/package/pi-native-web-search) | Adds a web_search tool powered by Anthropic's native web search — no third-party API key needed. Always runs via claude-haiku-4-5 for fast, cheap retrieval with source URLs. | ⬇ 30/mo | 2mo ago |
| [pi-planner](https://www.npmjs.com/package/pi-planner) | Planner workflow extension for Pi (questioning → implementation → summary) | ⬇ 30/mo | 3mo ago |
| [pi-readline-search](https://www.npmjs.com/package/pi-readline-search) | Pi extension for GNU Readline-style reverse search on Ctrl+R | ⬇ 30/mo | 3mo ago |
| [pi-replicant](https://www.npmjs.com/package/pi-replicant) | Codebase exploration subagent extension for pi using Offworld CLI | ⬇ 30/mo | yesterday |
| [pi-satori-bridge](https://www.npmjs.com/package/pi-satori-bridge) | Pi extension package that proxies Satori MCP tools through satori-cli | ⬇ 30/mo | 3mo ago |
| [@0xkobold/pi-alerts](https://www.npmjs.com/package/@0xkobold/pi-alerts) | Customizable chimes and notifications for pi | ⬇ 29/mo | 2mo ago |
| [@a-canary/pi-upskill](https://www.npmjs.com/package/@a-canary/pi-upskill) | Learn from failures, reduce token waste, improve automatically | ⬇ 29/mo | 2mo ago |
| [@anthnykr/pi-study-commits](https://www.npmjs.com/package/@anthnykr/pi-study-commits) | Pi extension for selecting recent git commits and injecting their diffs into the conversation. | ⬇ 29/mo | 2mo ago |
| [@q.roy/pi-remote](https://www.npmjs.com/package/@q.roy/pi-remote) | Remote terminal access for pi via WebSocket and browser | ⬇ 29/mo | 3mo ago |
| [pi-agentkernel](https://www.npmjs.com/package/pi-agentkernel) | Route Pi coding agent commands through agentkernel microVM sandboxes | ⬇ 29/mo | 4mo ago |
| [pi-minesweeper](https://www.npmjs.com/package/pi-minesweeper) | Minesweeper for pi coding agent — classic mine-clearing puzzle | ⬇ 29/mo | 3mo ago |
| [pi-zellij-tab-namer](https://www.npmjs.com/package/pi-zellij-tab-namer) | Automatically renames the active Zellij tab to a short summary of the conversation after each agent turn, using a fast model for minimal overhead. | ⬇ 29/mo | 2mo ago |
| [shitty-prompt](https://www.npmjs.com/package/shitty-prompt) | 💩 Submit your hilariously broken prompts to shitty-prompt — pi coding agent extension | ⬇ 29/mo | 3mo ago |
| [@4meta5/pi-ozcar](https://www.npmjs.com/package/@4meta5/pi-ozcar) | Pi-first audit extension package for structured security reviews and deterministic comparison exports | ⬇ 28/mo | ~1mo ago |
| [@artale/pi-lean](https://www.npmjs.com/package/@artale/pi-lean) | Lean tool output for Pi. Auto-truncate verbose bash output, collapse npm/pip noise, keep errors and results visible. | ⬇ 28/mo | 2mo ago |
| [@hjanuschka/pi-nanny](https://www.npmjs.com/package/@hjanuschka/pi-nanny) | Parental control extension for Pi - helps you go to bed instead of having 47 creative ideas at 3 AM | ⬇ 28/mo | 3mo ago |
| [@ibvhim/pi-scaffold](https://www.npmjs.com/package/@ibvhim/pi-scaffold) | Pi extension to scaffold a project-local .pi workspace | ⬇ 28/mo | ~1mo ago |
| [@oribish/brainkit](https://www.npmjs.com/package/@oribish/brainkit) | Second brain extension for pi - capture, organize, and retrieve knowledge with PARA method | ⬇ 28/mo | ~1mo ago |
| [Gliangquan-pi-ui-bridge](https://github.com/Gliangquan/pi-ui-bridge) | UI-to-code bridge for pi-coding-agent | ⭐28 | 2mo ago |
| [pi-budget-model](https://www.npmjs.com/package/pi-budget-model) | Remove the editor's reverse-video soft cursor · from yapp | ⬇ 28/mo | 2mo ago |
| [pi-editor](https://www.npmjs.com/package/pi-editor) | Pi extension to open files in your preferred editor ($VISUAL / $EDITOR) | ⬇ 28/mo | 3mo ago |
| [pi-safety-git-operations](https://www.npmjs.com/package/pi-safety-git-operations) | Guards destructive git and GitHub/GitLab CLI operations with severity-based confirmation dialogs and session memory. Covers force-push, reset --hard, branch deletion, gh/glab repo operations, and more | ⬇ 28/mo | 2mo ago |
| [pi-tmux-focus-cursor](https://www.npmjs.com/package/pi-tmux-focus-cursor) | Hide Pi's fake editor cursor when the current tmux pane loses focus | ⬇ 28/mo | 2mo ago |
| [pi-zed-shift-enter](https://www.npmjs.com/package/pi-zed-shift-enter) | Fixes Shift+Enter not creating newlines in pi when running inside Zed's terminal | ⬇ 28/mo | 3mo ago |
| [shaftoe-awesome-pi-coding-agent](https://github.com/shaftoe/awesome-pi-coding-agent) | An auto-discovered, LLM curated directory of resources for the Pi Coding Agent ecosystem. Updated daily. | ⭐28 | today |
| [@ahkohd/pi-oyo](https://www.npmjs.com/package/@ahkohd/pi-oyo) | Pi package providing oyo diff/review commands | ⬇ 27/mo | today |
| [@artale/pi-api](https://www.npmjs.com/package/@artale/pi-api) | API development toolkit. Route scanning (Express/Next/Flask/FastAPI), endpoint testing, OpenAPI spec generation. | ⬇ 27/mo | 3mo ago |
| [@artale/pi-recon](https://www.npmjs.com/package/@artale/pi-recon) | Security reconnaissance toolkit. Headers audit, SSL check, DNS, port scan, tech fingerprinting, path discovery. | ⬇ 27/mo | 3mo ago |
| [@artale/pi-todo](https://www.npmjs.com/package/@artale/pi-todo) | Persistent todo list for Pi. Track tasks across sessions with priorities, tags, and due dates. | ⬇ 27/mo | 2mo ago |
| [@furbyhaxx/pi-prompt-history](https://www.npmjs.com/package/@furbyhaxx/pi-prompt-history) | Slim Pi extension that keeps session-scoped prompt history and loads prior prompts into pi's native editor. | ⬇ 27/mo | 12d ago |
| [@hyperprior/pi-safety](https://www.npmjs.com/package/@hyperprior/pi-safety) | Confirmation and protection layer for dangerous git/bash/edit/write actions | ⬇ 27/mo | 3mo ago |
| [@rbright/pi-notify-koko](https://www.npmjs.com/package/@rbright/pi-notify-koko) | Koko voice notifications for Pi agent turn completion. | ⬇ 27/mo | 3mo ago |
| [@ssweens/pi-image-gen](https://www.npmjs.com/package/@ssweens/pi-image-gen) | Provider-agnostic image generation for Pi coding agent | ⬇ 27/mo | 3mo ago |
| [dannote-dot-pi](https://github.com/dannote/dot-pi) | Extensions, skills, and rules for Pi coding agent | ⭐27 | 3d ago |
| [pi-cc-router](https://www.npmjs.com/package/pi-cc-router) | Pi coding agent extension that routes LLM calls through Claude Code CLI | ⬇ 27/mo | ~1mo ago |
| [pi-coordinator](https://www.npmjs.com/package/pi-coordinator) | Four-phase workflow: Research → Synthesis → Implementation → Verification, based on Claude Code coordinator feature preview. | ⬇ 27/mo | ~1mo ago |
| [pi-relay](https://www.npmjs.com/package/pi-relay) | Discord bridge extension for pi — route messages, spawn sessions, stream output | ⬇ 27/mo | 2mo ago |
| [pi-reread-instructions](https://www.npmjs.com/package/pi-reread-instructions) | Pi extension that re-inserts AGENTS.md / CLAUDE.md every N completed final assistant replies | ⬇ 27/mo | ~1mo ago |
| [pi-talk](https://www.npmjs.com/package/pi-talk) | Streaming TTS extension for Pi with visible-thinking narration, hidden-thinking TLDRs, and tool announcements | ⬇ 27/mo | 3mo ago |
| [samfoy-pi-dashboard](https://github.com/samfoy/pi-dashboard) | Web dashboard for the pi coding agent — multi-session chat, file browser, doc collaboration, terminal, and more | ⭐27 | 18d ago |
| [wallhaven-random-pi-extension](https://www.npmjs.com/package/wallhaven-random-pi-extension) | Wallhaven random wallpaper extension for pi | ⬇ 27/mo | 3mo ago |
| [@artale/pi-loop](https://www.npmjs.com/package/@artale/pi-loop) | Agent loop for Pi. Goal-driven, fixed-pass, and pipeline loops with [D]/[N] gates. Inspired by pi-stories Blueprint Engine. | ⬇ 26/mo | 2mo ago |
| [@artale/pi-odu](https://www.npmjs.com/package/@artale/pi-odu) | Odu pattern engine for Pi. 256-state binary classifier based on the Ifa system. Read 8 channels, classify, act. | ⬇ 26/mo | 2mo ago |
| [@guwidoe/pi-wsl-clipboard-image](https://www.npmjs.com/package/@guwidoe/pi-wsl-clipboard-image) | pi extension: paste WSLg clipboard images into the prompt | ⬇ 26/mo | 3mo ago |
| [pi-amp](https://www.npmjs.com/package/pi-amp) | Retro CLI music player for pi — YouTube streaming, EQ, and an AI DJ | ⬇ 26/mo | 3mo ago |
| [pi-libsecret](https://www.npmjs.com/package/pi-libsecret) | Load API keys with secret-tool | ⬇ 26/mo | ~1mo ago |
| [pi-open-browser](https://www.npmjs.com/package/pi-open-browser) | A pi extension to open URLs in the user's default browser | ⬇ 26/mo | ~1mo ago |
| [pi-safety-path-protection](https://www.npmjs.com/package/pi-safety-path-protection) | Protects sensitive paths (.env files, .git internals, node_modules, SSH keys) from unauthorized reads and writes across all tools — read, write, edit, and bash. | ⬇ 26/mo | 2mo ago |
| [pi-search-agent](https://www.npmjs.com/package/pi-search-agent) | Semantic codebase search with sub-agent processing | ⬇ 26/mo | 4mo ago |
| [pi-supermemory](https://www.npmjs.com/package/pi-supermemory) | Persistent memory extension for Pi coding agent - remember context across sessions using SuperMemory | ⬇ 26/mo | ~1mo ago |
| [pirmission-bash-guard](https://www.npmjs.com/package/pirmission-bash-guard) | Pi extension that replaces the bash tool with permission-gated execution and exact-match allowlist persistence. | ⬇ 26/mo | 12d ago |
| [@a-canary/pi-director](https://www.npmjs.com/package/@a-canary/pi-director) | Autonomous project director for pi. Recommends actions (NEXT.md), clarifies intent (CHOICES.md), and executes TDD development (PLAN.md) through specialized subagents. | ⬇ 25/mo | 2mo ago |
| [@artale/pi-builder](https://www.npmjs.com/package/@artale/pi-builder) | Extension builder for Pi. Scaffold, build, test, and publish Pi extensions from a single command. The tool that built 82 packages. | ⬇ 25/mo | 2mo ago |
| [@artale/pi-envman](https://www.npmjs.com/package/@artale/pi-envman) | Environment and secrets manager. Store API tokens, scan env files, detect leaked secrets in code. | ⬇ 25/mo | 3mo ago |
| [@ibeex/pi-fetch](https://www.npmjs.com/package/@ibeex/pi-fetch) | pi extension that fetches web content into session context with Jina/raw fallback and cleaned previews | ⬇ 25/mo | ~1mo ago |
| [@linioi/pi-fast-mode](https://www.npmjs.com/package/@linioi/pi-fast-mode) | A pi extension that adds a protocol-aware /fast command with status indicator and priority service tier injection. | ⬇ 25/mo | ~1mo ago |
| [@mjakl/pi-git-research](https://www.npmjs.com/package/@mjakl/pi-git-research) | Tools for researching and exploring Git repositories with Pi agent | ⬇ 25/mo | 3d ago |
| [@rbright/pi-notify-desktop](https://www.npmjs.com/package/@rbright/pi-notify-desktop) | OSC desktop notifications for Pi agent turn completion. | ⬇ 25/mo | 3mo ago |
| [@schilderlabs/pitown-package](https://www.npmjs.com/package/@schilderlabs/pitown-package) | Pi package resources for Pi Town | ⬇ 25/mo | 2mo ago |
| [@waraq-labs/pi-notify-terminal-notifier](https://www.npmjs.com/package/@waraq-labs/pi-notify-terminal-notifier) | Pi extension: sends macOS notification-notifier notifications when agent waits for input | ⬇ 25/mo | 3mo ago |
| [kcosr-pi-extensions](https://github.com/kcosr/pi-extensions) | A collection of extensions for badlogic/pi-mono coding agent. | ⭐25 | 3mo ago |
| [pi-cryptex](https://www.npmjs.com/package/pi-cryptex) | Pi extension inspired by fastlane-plugin-cryptex for encrypted project credentials. | ⬇ 25/mo | 2mo ago |
| [pi-psst](https://www.npmjs.com/package/pi-psst) | Ephemeral side questions for pi — ask without cluttering your conversation history | ⬇ 25/mo | 2mo ago |
| [tasty-pi](https://www.npmjs.com/package/tasty-pi) | Tasty Pi: a Pi package with custom extensions, skills, and themes. | ⬇ 25/mo | ~1mo ago |
| [@artale/pi-caffeinate](https://www.npmjs.com/package/@artale/pi-caffeinate) | Keep your machine awake during long Pi sessions. Prevents sleep/screen lock on macOS, Windows, Linux. | ⬇ 24/mo | 2mo ago |
| [@artale/pi-snapshot](https://www.npmjs.com/package/@artale/pi-snapshot) | Session snapshot for Pi. Export conversation as markdown, JSON, or HTML. Share sessions, create reports. | ⬇ 24/mo | 2mo ago |
| [@hyperspaceng/pi-agent-id](https://www.npmjs.com/package/@hyperspaceng/pi-agent-id) | Ethereum wallet management tool for pi agent system - HD wallets, secure key storage, and transaction signing | ⬇ 24/mo | 2mo ago |
| [@ifiokjr/oh-pi-ant-colony](https://www.npmjs.com/package/@ifiokjr/oh-pi-ant-colony) | Autonomous multi-agent swarm extension for pi — adaptive concurrency, pheromone communication. | ⬇ 24/mo | 3mo ago |
| [@jasonish/pi-default-model](https://www.npmjs.com/package/@jasonish/pi-default-model) | Set a **real** default model | ⬇ 24/mo | 4mo ago |
| [@mmcook/pi-brainmaxx](https://www.npmjs.com/package/@mmcook/pi-brainmaxx) | A project brain for Pi: repo-local memory, reflection, and session-history rumination | ⬇ 24/mo | 2mo ago |
| [@rwese/minimax-image-understanding](https://www.npmjs.com/package/@rwese/minimax-image-understanding) | MiniMax extension for pi coding agent | ⬇ 24/mo | ~1mo ago |
| [@thesethrose/pi-minimax-provider](https://www.npmjs.com/package/@thesethrose/pi-minimax-provider) | MiniMax provider extension for pi coding agent with correct OAuth token handling | ⬇ 24/mo | ~1mo ago |
| [@treentity/pi-imessage](https://www.npmjs.com/package/@treentity/pi-imessage) | iMessage channel for Pi | ⬇ 24/mo | ~1mo ago |
| [@tridha643/pi-ask-mode](https://www.npmjs.com/package/@tridha643/pi-ask-mode) | A pi package that adds ask mode: read-only investigative tools plus read-only bash. | ⬇ 24/mo | ~1mo ago |
| [pi-local-websearch](https://www.npmjs.com/package/pi-local-websearch) | Pi web search and extraction tools backed by ddgr and trafilatura. | ⬇ 24/mo | 12d ago |
| [pi-slot-machine](https://www.npmjs.com/package/pi-slot-machine) | A pi extension that spins a slot machine overlay every time you send a prompt. Hit the jackpot for a fireworks explosion! 🎰 | ⬇ 24/mo | 3mo ago |
| [@0xkobold/pi-cursor](https://www.npmjs.com/package/@0xkobold/pi-cursor) | pi extension for Cursor AI agent via ACP protocol | ⬇ 23/mo | 2mo ago |
| [@a-canary/pi-choose-wisely](https://www.npmjs.com/package/@a-canary/pi-choose-wisely) | CHOICES.md management — clarify project vision, mission, UX, operations, architectural decisions with cascading impact review. Includes replan skill for gap analysis and PLAN.md generation. | ⬇ 23/mo | 2mo ago |
| [@artale/pi-cron](https://www.npmjs.com/package/@artale/pi-cron) | Task scheduling and reminders. Cron-like scheduling for AI agents with persistent jobs. | ⬇ 23/mo | 3mo ago |
| [@artale/pi-metrics](https://www.npmjs.com/package/@artale/pi-metrics) | Code metrics and health. Lines of code, cyclomatic complexity, tech debt indicators by language. | ⬇ 23/mo | 3mo ago |
| [@chrisbielinski/pi-searchxng](https://www.npmjs.com/package/@chrisbielinski/pi-searchxng) | Pi package exposing the searchxng CLI as a tool. | ⬇ 23/mo | 2mo ago |
| [pi-copy-last-response-extension](https://www.npmjs.com/package/pi-copy-last-response-extension) | pi extension to copy the last assistant response | ⬇ 23/mo | 3mo ago |
| [pi-dev-workflow](https://www.npmjs.com/package/pi-dev-workflow) | Developer workflow toolkit for pi: git agents, code review, Karpathy guidelines, themes | ⬇ 23/mo | 12d ago |
| [pi-nudge](https://www.npmjs.com/package/pi-nudge) | Native terminal notifications for pi. | ⬇ 23/mo | 2mo ago |
| [video-paste](https://www.npmjs.com/package/video-paste) | Pi extension that adds video paste support and video-aware inspection through the read tool. | ⬇ 23/mo | 2mo ago |
| [@claaslange/pi-directory-models](https://www.npmjs.com/package/@claaslange/pi-directory-models) | pi extension that selects a model from the nearest ancestor .pi/settings.json | ⬇ 22/mo | 2mo ago |
| [@dpaluy/shaping-skills](https://www.npmjs.com/package/@dpaluy/shaping-skills) | Cross-tool shaping, breadboarding, and transcript-to-document skills. | ⬇ 22/mo | ~1mo ago |
| [@hdh/pi-contributions-bot](https://www.npmjs.com/package/@hdh/pi-contributions-bot) | Pi extension that gates git commit on CONTRIBUTING_BOT.md compliance | ⬇ 22/mo | 2mo ago |
| [@ifiokjr/oh-pi](https://www.npmjs.com/package/@ifiokjr/oh-pi) | One-click setup for pi-coding-agent — extensions, themes, prompts, skills, and ant-colony swarm. Like oh-my-zsh for pi. | ⬇ 22/mo | 3mo ago |
| [@shuyhere/pi-discord-bot](https://www.npmjs.com/package/@shuyhere/pi-discord-bot) | A small Discord harness built around Pi primitives. | ⬇ 22/mo | ~1mo ago |
| [jjmartres-ai-coding-agents](https://github.com/jjmartres/ai-coding-agents) | Single source of truth for AI coding agent configuration — skills, commands and rules shared across OpenCode and Pi. | ⭐22 | 10d ago |
| [pi-ghcp-headers](https://www.npmjs.com/package/pi-ghcp-headers) | Pi extension to customize GitHub Copilot X-Initiator header behavior | ⬇ 22/mo | ~1mo ago |
| [pi-redteam](https://www.npmjs.com/package/pi-redteam) | Multi-agent red teaming system for Pi - 10 specialized security agents for vulnerability assessment and penetration testing | ⬇ 22/mo | 18d ago |
| [sigilmakes-spindle](https://github.com/sigilmakes/spindle) | Persistent JavaScript REPL for context manipulation, MCP integration, and focused sub-agent orchestration. A pi extension. | ⭐22 | ~1mo ago |
| [@artale/pi-picker](https://www.npmjs.com/package/@artale/pi-picker) | TUI picker for Pi. Interactive fuzzy selectors for tools, commands, sessions, and files with keyboard navigation. | ⬇ 21/mo | 2mo ago |
| [@gugu910/pi-slack-api](https://www.npmjs.com/package/@gugu910/pi-slack-api) | Typed Slack Web API client and CLI generated from Slack's OpenAPI spec | ⬇ 21/mo | ~1mo ago |
| [@hyperprior/pi-commit](https://www.npmjs.com/package/@hyperprior/pi-commit) | Git commit helper tooling for pi | ⬇ 21/mo | 3mo ago |
| [@hyperprior/pi-web](https://www.npmjs.com/package/@hyperprior/pi-web) | Web helpers for search and fetch | ⬇ 21/mo | 3mo ago |
| [@patleeman/pi-boy](https://www.npmjs.com/package/@patleeman/pi-boy) | pi-boy: embedded Game Boy emulator inside pi | ⬇ 21/mo | 3mo ago |
| [@recallnet/codecontext-pi](https://www.npmjs.com/package/@recallnet/codecontext-pi) | pi steering extension for surfacing @context annotations during reads | ⬇ 21/mo | 2mo ago |
| [@settinghead/pi-voxlert](https://www.npmjs.com/package/@settinghead/pi-voxlert) | SHODAN, the StarCraft Adjutant, and GLaDOS narrate your pi coding sessions. LLM-generated voice notifications spoken by game characters — know which agent needs you, by ear. | ⬇ 21/mo | 2mo ago |
| [@zoumo/gsd-pi-acp](https://www.npmjs.com/package/@zoumo/gsd-pi-acp) | ACP adapter for gsd and pi coding agents with dual backend support | ⬇ 21/mo | ~1mo ago |
| [marckrenn-pi-lab](https://github.com/marckrenn/pi-lab) | pi-lab lets you run tool-based A/B tests in various modes | ⭐21 | ~1mo ago |
| [rytswd-pi-agent-extensions](https://github.com/rytswd/pi-agent-extensions) |  | ⭐21 | 2d ago |
| [Soleone-pi-tasks](https://github.com/Soleone/pi-tasks) | An extension for pi coding agent to manage tasks, via beads or alternative task backends. | ⭐21 | 17d ago |
| [VTSTech-pi-coding-agent](https://github.com/VTSTech/pi-coding-agent) | Extensions I've written for Pi Coding Agent | ⭐21 | yesterday |
| [@artale/pi-git-hooks](https://www.npmjs.com/package/@artale/pi-git-hooks) | Git hook manager. Install pre-commit, commit-msg, pre-push hooks from templates. | ⬇ 20/mo | 3mo ago |
| [@artale/pi-i18n](https://www.npmjs.com/package/@artale/pi-i18n) | i18n/localization toolkit. Scan translations, find missing keys, validate formats, extract strings. Supports JSON, YAML, .po, .xliff, Android XML, iOS .strings. | ⬇ 20/mo | 3mo ago |
| [@artale/pi-migrate](https://www.npmjs.com/package/@artale/pi-migrate) | Code migration and codemods. Detect outdated patterns, check dependencies, generate migration plans. | ⬇ 20/mo | 3mo ago |
| [@artale/pi-refactor](https://www.npmjs.com/package/@artale/pi-refactor) | Iterative refactoring for Pi. Analyze → refactor → verify cycles with git commits per pass. | ⬇ 20/mo | 2mo ago |
| [@artale/pi-stash](https://www.npmjs.com/package/@artale/pi-stash) | Prompt stash for Pi. Save, list, and restore prompt drafts. Like git stash for your prompts. | ⬇ 20/mo | 2mo ago |
| [@burneikis/pi-web-search](https://www.npmjs.com/package/@burneikis/pi-web-search) | A claude native web search plugin for Pi. | ⬇ 20/mo | ~1mo ago |
| [@gswangg/duncan-pi](https://www.npmjs.com/package/@gswangg/duncan-pi) | Session memory for pi — query dormant sessions, hand off context across session boundaries | ⬇ 20/mo | ~1mo ago |
| [@hyperprior/pi-review](https://www.npmjs.com/package/@hyperprior/pi-review) | Structured review findings for code review workflows | ⬇ 20/mo | 3mo ago |
| [@jasonish/pi-prompt-history](https://www.npmjs.com/package/@jasonish/pi-prompt-history) | Pi extension: search user prompt history across all sessions with Ctrl+Alt+R | ⬇ 20/mo | 3mo ago |
| [pi-branch-ask](https://www.npmjs.com/package/pi-branch-ask) | Interactive ask tool for pi with branching questionnaire support | ⬇ 20/mo | 3mo ago |
| [pi-voxtype](https://www.npmjs.com/package/pi-voxtype) | Voxtype bridge for pi with direct session-scoped voice submission | ⬇ 20/mo | 2mo ago |
| [@alexgorbatchev/agentation-skills](https://www.npmjs.com/package/@alexgorbatchev/agentation-skills) | Shared Agentation skills for coding agents | ⬇ 19/mo | 2mo ago |
| [@artale/pi-perf](https://www.npmjs.com/package/@artale/pi-perf) | Performance profiling. Time commands, benchmark with statistics, Node.js profiling. | ⬇ 19/mo | 3mo ago |
| [@claaslange/pi-context-budget](https://www.npmjs.com/package/@claaslange/pi-context-budget) | Pi extension that warns when conversation context usage crosses configured thresholds. | ⬇ 19/mo | ~1mo ago |
| [@elianiva/pi-starship](https://www.npmjs.com/package/@elianiva/pi-starship) | Starship-style prompt for pi | ⬇ 19/mo | 3mo ago |
| [@furbyhaxx/pi-pie](https://www.npmjs.com/package/@furbyhaxx/pi-pie) | TypeScript pi environment wrapper and companion extension for named PI_CODING_AGENT_DIR environments. | ⬇ 19/mo | 12d ago |
| [@hyperprior/pi-model-roles](https://www.npmjs.com/package/@hyperprior/pi-model-roles) | Role-based model switching utility (/hyper-role) | ⬇ 19/mo | 3mo ago |
| [@hyperprior/pi-python](https://www.npmjs.com/package/@hyperprior/pi-python) | Run Python commands from within pi | ⬇ 19/mo | 3mo ago |
| [@hyperprior/pi-subagent](https://www.npmjs.com/package/@hyperprior/pi-subagent) | Delegate tasks to isolated sub-agents (pi subprocesses) | ⬇ 19/mo | 3mo ago |
| [@patriceckhart/pi-chrome-operator](https://www.npmjs.com/package/@patriceckhart/pi-chrome-operator) | Chat with pi agent to control your browser — summarize pages, fill forms, check mail, and save routines. | ⬇ 19/mo | ~1mo ago |
| [@victorhsb/pi-auto-context-files](https://www.npmjs.com/package/@victorhsb/pi-auto-context-files) | Auto-inject AGENTS.md and CLAUDE.md context files into pi read tool results | ⬇ 19/mo | 13d ago |
| [bparlan-pi-specdriven-agenticengineer](https://github.com/bparlan/pi-specdriven-agenticengineer) | My global Pi.dev / pi-coding-agent setup for Spec-Driven Agentic Engineering — extensions, skills, prompts, memory files, reflect config + one-click restore | ⭐19 | 3mo ago |
| [pi-chain](https://www.npmjs.com/package/pi-chain) | Pi extension that starts a new session seeded with recent conversation messages | ⬇ 19/mo | 2mo ago |
| [pi-watch](https://www.npmjs.com/package/pi-watch) | Pi extension that watches for AI comments in your code and sends them to the agent | ⬇ 19/mo | 4mo ago |
| [@artale/pi-knowledge](https://www.npmjs.com/package/@artale/pi-knowledge) | Local knowledge graph. User-owned entity/relationship store with search and export. Zero cloud, JSON-backed. | ⬇ 18/mo | 3mo ago |
| [@atomic-ai/msco-pi-lot](https://www.npmjs.com/package/@atomic-ai/msco-pi-lot) | Microsoft Copilot provider extension for pi coding agent. | ⬇ 18/mo | 2mo ago |
| [@furbyhaxx/pi-teardown-screen](https://www.npmjs.com/package/@furbyhaxx/pi-teardown-screen) | Slim Pi extension that prints a teardown screen with session stats when the user quits a pi session. Uses the default pi theme; no configuration. | ⬇ 18/mo | 12d ago |
| [@hyperprior/pi-todo](https://www.npmjs.com/package/@hyperprior/pi-todo) | Branch-safe todo extension for pi | ⬇ 18/mo | 3mo ago |
| [@nandithebull/pi-background](https://www.npmjs.com/package/@nandithebull/pi-background) | Background task tracker extension for pi - shows running commands and background sessions in the UI | ⬇ 18/mo | 3mo ago |
| [@sld0ant/pi-diff](https://www.npmjs.com/package/@sld0ant/pi-diff) | High-performance diff for pi-agent with Patience algorithm and WASM acceleration | ⬇ 18/mo | 4mo ago |
| [pi-ali-code](https://www.npmjs.com/package/pi-ali-code) | Alibaba Model Studio Coding Plan provider for pi — Qwen, GLM, Kimi, and MiniMax models | ⬇ 18/mo | 3mo ago |
| [pi-auto-context-files](https://www.npmjs.com/package/pi-auto-context-files) | Auto-inject AGENTS.md and CLAUDE.md context files into pi read tool results | ⬇ 18/mo | 13d ago |
| [pi-mnemosyne](https://www.npmjs.com/package/pi-mnemosyne) | Pi extension for local persistent memory using Mnemosyne — offline semantic search, no cloud required | ⬇ 18/mo | ~1mo ago |
| [zosmaai-zosma-cowork](https://github.com/zosmaai/zosma-cowork) | Desktop GUI for the pi coding agent — open-source Claude Cowork alternative | ⭐18 | today |
| [@datspike/pi-inline-slash-extension](https://www.npmjs.com/package/@datspike/pi-inline-slash-extension) | Pi extension that adds inline slash autocomplete and absolute-path submit bypass without forking core. | ⬇ 17/mo | ~1mo ago |
| [@hngye02/pi-web-tools](https://www.npmjs.com/package/@hngye02/pi-web-tools) | webfetch + websearch tools for Pi | ⬇ 17/mo | 2mo ago |
| [jmfederico-pi-web](https://github.com/jmfederico/pi-web) | Web control plane for remote, agentic software development with Pi Coding Agent | ⭐17 | 5d ago |
| [pi-dedumbify](https://www.npmjs.com/package/pi-dedumbify) | Pi extension for executable spaced repetition with FSRS scheduling | ⬇ 17/mo | 2mo ago |
| [pi-session-yank](https://www.npmjs.com/package/pi-session-yank) | Pi extension that copies assistant/user message text or fenced code blocks from the current session branch to the clipboard | ⬇ 17/mo | ~1mo ago |
| [pi-speak](https://www.npmjs.com/package/pi-speak) | Voice readback extension for Pi — reads agent responses aloud via Unreal Speech TTS | ⬇ 17/mo | ~1mo ago |
| [@rbright/pi-notify-core](https://www.npmjs.com/package/@rbright/pi-notify-core) | Shared notification primitives for Pi extensions. | ⬇ 16/mo | 3mo ago |
| [@simplellm/pi-provider](https://www.npmjs.com/package/@simplellm/pi-provider) | SimpleLLM provider setup for Pi Coding Agent — one command, EU-hosted LLM inference | ⬇ 16/mo | 3mo ago |
| [pi-safety-network-exfiltration](https://www.npmjs.com/package/pi-safety-network-exfiltration) | Blocks data exfiltration, remote code execution via piped downloads, secrets embedded in commands, and unauthorized network operations before they run. | ⬇ 16/mo | 2mo ago |
| [pi-workspace-context](https://www.npmjs.com/package/pi-workspace-context) | Pi extension for adding extra local workspace roots to the agent context. | ⬇ 16/mo | 13d ago |
| [Zetaphor-pi-vscode-extension](https://github.com/Zetaphor/pi-vscode-extension) | Pi coding agent, as a VSCode extension | ⭐16 | 18d ago |
| [@fnnm/pi-iflow-connector](https://www.npmjs.com/package/@fnnm/pi-iflow-connector) | iFlow.cn provider extension for pi-coding-agent | ⬇ 15/mo | 4mo ago |
| [@hemocode/pi-model-selector](https://www.npmjs.com/package/@hemocode/pi-model-selector) | A Pi extension that automatically selects the best model based on remaining usage quotas across various providers (Claude, OpenAI, Gemini, etc.). | ⬇ 15/mo | 3mo ago |
| [@hyperprior/dissolution](https://www.npmjs.com/package/@hyperprior/dissolution) | pi extension that wires dissolution semantic search into agent tools | ⬇ 15/mo | 3mo ago |
| [@jademind/pi-tools](https://www.npmjs.com/package/@jademind/pi-tools) | pi extension that registers additional CLI tools from local/global config files | ⬇ 15/mo | 2mo ago |
| [@mjakl/pi-ooc](https://www.npmjs.com/package/@mjakl/pi-ooc) | Pi extension that adds /ooc for out-of-context side questions using the current session context. | ⬇ 15/mo | 3d ago |
| [@victor-software-house/pi-tmux](https://www.npmjs.com/package/@victor-software-house/pi-tmux) | Pi coding agent extension: tmux session management per project | ⬇ 15/mo | ~1mo ago |
| [@yangnay/pi-mcp-bridge](https://www.npmjs.com/package/@yangnay/pi-mcp-bridge) | Standalone pi extension that bridges multiple MCP servers with on-demand connections. | ⬇ 15/mo | ~1mo ago |
| [pi-axiom](https://www.npmjs.com/package/pi-axiom) | pi extension for querying Axiom logs, monitors, and debugging alerts | ⬇ 15/mo | 13d ago |
| [pi-blindtest](https://www.npmjs.com/package/pi-blindtest) | Pi extension for blind model testing: hide model in UI and aggregate ratings across sessions. | ⬇ 15/mo | 3mo ago |
| [PSPDFKit-labs-pi-skills](https://github.com/PSPDFKit-labs/pi-skills) | A collection of skills for pi, the AI coding agent by Nutrient — extending agent capabilities with custom tools and workflows | ⭐15 | 13d ago |
| [walodayeet-hindsight-pi](https://github.com/walodayeet/hindsight-pi) | Hindsight memory extension for pi coding agent | ⭐15 | 26d ago |
| [@fnnm/pi-session-breakdown](https://www.npmjs.com/package/@fnnm/pi-session-breakdown) | Interactive TUI for Pi session analysis (usage, cost, models). | ⬇ 14/mo | 3mo ago |
| [@harigovindarajan/pi-memory-adapter](https://www.npmjs.com/package/@harigovindarajan/pi-memory-adapter) | Local-first memory subsystem for Pi | ⬇ 14/mo | 3mo ago |
| [@hjanuschka/pi-entire](https://www.npmjs.com/package/@hjanuschka/pi-entire) | Pi coding agent extension for Entire.io session tracking | ⬇ 14/mo | 3mo ago |
| [@include-tools/toolbox-pi-extension](https://www.npmjs.com/package/@include-tools/toolbox-pi-extension) | pi extension for toolbox codemode sessions | ⬇ 14/mo | ~1mo ago |
| [aebrer-dreb](https://github.com/aebrer/dreb) | Provider-agnostic agentic coding harness. Hard fork of pi-mono. | ⭐14 | 6d ago |
| [PSU3D0-pi-dcp](https://github.com/PSU3D0/pi-dcp) | Dynamic Context Pruning (DCP) extension for the Pi Coding Agent | ⭐14 | 3mo ago |
| [@hyperprior/pi-bundle](https://www.npmjs.com/package/@hyperprior/pi-bundle) | Meta package installing all Hyperprior pi plugins | ⬇ 13/mo | 3mo ago |
| [code-yeongyu-pi-goal](https://github.com/code-yeongyu/pi-goal) | Persistent Codex-style goal tracking extension for pi | ⭐13 | 8d ago |
| [lukasl-dev-pi-mono.nix](https://github.com/lukasl-dev/pi-mono.nix) | Nix flake for pi, a terminal coding agent. | ⭐13 | 26d ago |
| [ram4-dev-multi-sdd-team](https://github.com/ram4-dev/multi-sdd-team) | SDD multi agent framework for pi coding agent | ⭐13 | 24d ago |
| [@ironin/pi-cascading-skills](https://www.npmjs.com/package/@ironin/pi-cascading-skills) | Walks parent directories to collect skills from every .pi/ level, solving pi's array-replacement behavior for skills. | ⬇ 12/mo | ~1mo ago |
| [gnassro-phi](https://github.com/gnassro/phi) | Phi brings the Pi AI coding agent into VS Code as a native extension. Chat with an AI agent that can read, write, and edit your code | ⭐12 | 3d ago |
| [raunovillberg-pi-stuffed](https://github.com/raunovillberg/pi-stuffed) | Stuff for the pi coding agent | ⭐12 | ~1mo ago |
| [ronnieops-pi-search-hub](https://github.com/ronnieops/pi-search-hub) | Unified web search + content extraction extension for pi — 12 backends (DuckDuckGo, Jina AI, Tavily, Brave, Exa, Serper, Firecrawl, Marginalia, LangSearch, WebSearchAPI, Perplexity Sonar, SearXNG) wit | ⭐12 | 11d ago |
| [@fnnm/pi-raw-paste](https://www.npmjs.com/package/@fnnm/pi-raw-paste) | One-shot raw paste support for Pi (/paste). | ⬇ 11/mo | 3mo ago |
| [pi-sentry](https://www.npmjs.com/package/pi-sentry) | Permission/impact gate extension for pi coding agent | ⬇ 11/mo | 3mo ago |
| [tintinweb-vscode-pi-model-chat-provider](https://github.com/tintinweb/vscode-pi-model-chat-provider) | VSCode Language Model Chat Provider integration for Pi coding agent, making Pi models available in VS Code's model picker for use with GitHub Copilot Chat and any extension that consumes the vscode.lm | ⭐11 | 11d ago |
| [@lydst/pi-webfetch](https://www.npmjs.com/package/@lydst/pi-webfetch) | A pi package that fetches public web pages for AI agents. | ⬇ 10/mo | ~1mo ago |
| [denisshepelin-pi-fff](https://github.com/denisshepelin/pi-fff) | pi-agent extension to use fff.nvim as file-picker | ⭐10 | ~1mo ago |
| [inceptionstack-pi-hard-no](https://github.com/inceptionstack/pi-hard-no) | Pi extension that auto-reviews code changes after each agent turn | ⭐10 | 8d ago |
| [jackoske-touch-grass-pi](https://github.com/jackoske/touch-grass-pi) | Break reminder extension for pi coding agent — animated session timer so you actually eat and touch grass | ⭐10 | ~1mo ago |
| [joelhooks-pi-cmux](https://github.com/joelhooks/pi-cmux) | cmux integration extension for pi — sidebar status, notifications, live tool activity, workspace control. Standalone package for orchestrator and worker agents. | ⭐10 | yesterday |
| [metmirr-pi-peacock](https://github.com/metmirr/pi-peacock) | Peacock-style repo identity for pi agent | ⭐10 | 2mo ago |
| [pi-open-terminal](https://www.npmjs.com/package/pi-open-terminal) | Run pi remotely via Open Terminal - receive commands from remote connections with configurable port, API key, and auto-start support | ⬇ 10/mo | 2mo ago |
| [qualisero-rhubarb-pi](https://github.com/qualisero/rhubarb-pi) | A collection of small hooks and extensions for the Pi coding agent | ⭐10 | 4mo ago |
| [shekohex-dotai](https://github.com/shekohex/dotai) | My AI Agents Configuration files to be shared across my different machines (claude, gemini, opencode, codex, pi ..etc) | ⭐10 | 16d ago |
| [vanzan01-pi-agent-sdk-starter](https://github.com/vanzan01/pi-agent-sdk-starter) | A batteries-included starter for building agentic desktop apps with Pi SDK and configurable providers. | ⭐10 | 16d ago |
| [vinirabli-pi-extension-starter](https://github.com/vinirabli/pi-extension-starter) | Source-first starter template for building pi CLI extensions with TypeScript, lifecycle hooks, session state, interactive UI, and tests. | ⭐10 | ~1mo ago |
| [@howaboua/pi-todomaster](https://www.npmjs.com/package/@howaboua/pi-todomaster) | TodoMaster extension for Pi | ⬇ 9/mo | 2mo ago |
| [@yofriadi/pi-hashline-edit](https://www.npmjs.com/package/@yofriadi/pi-hashline-edit) | Interactive code review extension package for pi | ⬇ 9/mo | 3mo ago |
| [alexradunet-NixPI](https://github.com/alexradunet/NixPI) | Personal User-Centric Immutable OS Based on NixOS and Pi.Dev AI Agent, where the agent is a first class citizen of the OS, and also dictates the UX experience | ⭐9 | ~1mo ago |
| [alexradunet-ownloom](https://github.com/alexradunet/ownloom) | Personal User-Centric Immutable OS Based on NixOS and Pi.Dev AI Agent, where the agent is a first class citizen of the OS, and also dictates the UX experience | ⭐9 | 16d ago |
| [badlogic-pi-dosbox](https://github.com/badlogic/pi-dosbox) | DOSBox extension for pi - run DOS programs with agent interaction | ⭐9 | 4mo ago |
| [championswimmer-pi-auto-theme](https://github.com/championswimmer/pi-auto-theme) | pi coding agent - auto dark/light theme extension | ⭐9 | 23d ago |
| [deblasis-pi-visual](https://github.com/deblasis/pi-visual) | Visual interaction extension for pi coding agent | ⭐9 | 10d ago |
| [kiil-nupi](https://github.com/kiil/nupi) | nushell package for pi coding agent | ⭐9 | ~1mo ago |
| [kostyay-agent-stuff](https://github.com/kostyay/agent-stuff) | Extensions, skills, and themes for Pi — the coding agent. TUI tools, brainstorming, code review, planning, and workflow automation. | ⭐9 | 7d ago |
| [lawrencewzen-hero-coding](https://github.com/lawrencewzen/hero-coding) | Minimal autonomous coding agent MVP — drop user stories in inbox/, get git commits out. Built on top of pi-coding-agent. | ⭐9 | 27d ago |
| [lemonade-sdk-lemonade-pi-plugin](https://github.com/lemonade-sdk/lemonade-pi-plugin) | Lemonade Pi Agent CLI Plugin | ⭐9 | 5d ago |
| [noctuid-pi-hindsight](https://github.com/noctuid/pi-hindsight) | (beta) Hindsight integration for pi coding agent (with queueing, past session ingestion, and a focus on best practices) | ⭐9 | 7d ago |
| [viniraioli-pi-extension-starter](https://github.com/viniraioli/pi-extension-starter) | Source-first starter template for building pi CLI extensions with TypeScript, lifecycle hooks, session state, interactive UI, and tests. | ⭐9 | ~1mo ago |
| [@gordonb/pi-archive](https://www.npmjs.com/package/@gordonb/pi-archive) | SQLite searchable archive of every conversation with Pi agent | ⬇ 8/mo | 3mo ago |
| [assagman-pi-extensions](https://github.com/assagman/pi-extensions) | Collection of pi-coding-agent extensions | ⭐8 | 2mo ago |
| [Dwsy-pi-extensions-skill](https://github.com/Dwsy/pi-extensions-skill) | Progressive learning guide for Pi coding agent extensions | ⭐8 | 16d ago |
| [FoundDream-PiDesk](https://github.com/FoundDream/PiDesk) | Built on pi-mono agent engine — gets TUI, agent loop, coding tools, session persistence, compaction, multi-provider support, and model switching for free. | ⭐8 | 3mo ago |
| [hjanuschka-pi-gdocs](https://github.com/hjanuschka/pi-gdocs) | Google Docs extension for pi coding agent | ⭐8 | ~1mo ago |
| [lebonbruce-pi-hippocampus](https://github.com/lebonbruce/pi-hippocampus) | A bio-mimetic memory extension for pi-agent with Hippocampus architecture. | ⭐8 | 4mo ago |
| [steel-experiments-pi-steel](https://github.com/steel-experiments/pi-steel) | Steel browser automation tools for the Pi coding agent. | ⭐8 | ~1mo ago |
| [Zetaphor-pi-webui](https://github.com/Zetaphor/pi-webui) | A full-stack web interface for the Pi coding agent, providing browser access to a system-level Pi agent with bash, file read/write/edit, and extension tools. | ⭐8 | 24d ago |
| [code-yeongyu-pi-ast-grep](https://github.com/code-yeongyu/pi-ast-grep) | AST-aware code search and rewrite for the pi coding agent. Faithful port of the ast-grep tools from oh-my-openagent. | ⭐7 | 8d ago |
| [code-yeongyu-pi-lsp-client](https://github.com/code-yeongyu/pi-lsp-client) | Language Server Protocol integration for the pi coding agent. Faithful port of the LSP tools from oh-my-openagent: shared server pool, refCount lifecycle, idle/init reaping, typed crash retry, and a / | ⭐7 | 6d ago |
| [Fatih0234-btw](https://github.com/Fatih0234/btw) | Ephemeral side questions for Pi Coding Agent — ask /btw without interrupting the main session | ⭐7 | 25d ago |
| [jinbe-pi-remote-web](https://github.com/jinbe/pi-remote-web) | Web dashboard for Pi coding agent — browse, manage, and chat with sessions from any browser | ⭐7 | 21d ago |
| [kissgyorgy-coding-agents](https://github.com/kissgyorgy/coding-agents) | Nix packages, skills, extensions for coding-agents (Claude Code, Gemini CLI, Pi Coding Agent, Codex) | ⭐7 | today |
| [lsj5031-pi-notification-extension](https://github.com/lsj5031/pi-notification-extension) | Notifications (Telegram + bell) extension for @mariozechner/pi-coding-agent | ⭐7 | 5mo ago |
| [markokocic-pi-clojure](https://github.com/markokocic/pi-clojure) | Clojure tools for pi-coding agent | ⭐7 | 7d ago |
| [nordbyte-nordrelay](https://github.com/nordbyte/nordrelay) | NordRelay is a secure remote control bridge for coding agents, connecting Codex, Pi, Hermes, OpenClaw and Claude Code to Telegram, Discord, Slack, WebUI with streaming replies, sessions, files, voice, | ⭐7 | today |
| [ogulcancelik-pi-session-recall](https://github.com/ogulcancelik/pi-session-recall) | ⚠️ Moved to https://github.com/ogulcancelik/pi-extensions/tree/main/packages/pi-session-recall | ⭐7 | 2mo ago |
| [pasky-pi-gondolin](https://github.com/pasky/pi-gondolin) | Pi coding agent extension: run tools inside a Gondolin micro-VM sandbox | ⭐7 | 3mo ago |
| [rynfar-meridian-plugin-pi-scrub](https://github.com/rynfar/meridian-plugin-pi-scrub) | Meridian plugin: strip pi-coding-agent identity fingerprints from the system prompt before it reaches Claude | ⭐7 | 29d ago |
| [championswimmer-pi-context-prune](https://github.com/championswimmer/pi-context-prune) | Pi coding-agent extension for pruning tool-call trees | ⭐6 | ~1mo ago |
| [huggingface-pi-llama](https://github.com/huggingface/pi-llama) | Pi coding agent extension: llama.cpp provider with dynamic model + context window discovery | ⭐6 | 3d ago |
| [junghan0611-pi-shell-acp](https://github.com/junghan0611/pi-shell-acp) | ACP bridge provider for pi — use Claude Code, Codex, and Gemini via official ACP with session persistence and MCP/entwurf orchestration. | ⭐6 | 4d ago |
| [oscar-haha-omniroute-pi-extension](https://github.com/oscar-haha/omniroute-pi-extension) |  | ⭐6 | ~1mo ago |
| [sigilmakes-obsidian-pi-plugin](https://github.com/sigilmakes/obsidian-pi-plugin) | Chat with the Pi coding agent inside Obsidian | ⭐6 | 3mo ago |
| [skidvis-pi-coordinator](https://github.com/skidvis/pi-coordinator) | A pi extension that transforms the primary agent into a pure dispatcher/orchestrator. The coordinator is locked to one tools (dispatch_agent) and delegates all real work to a built-in team of three sp | ⭐6 | ~1mo ago |
| [sld0Ant-pi-trio](https://github.com/sld0Ant/pi-trio) | Trio workflow for Pi: Planner → Executor → independent Reviewer sub-agent | ⭐6 | 19d ago |
| [sunnysmol-privacy-guard](https://github.com/sunnysmol/privacy-guard) | pi coding agent extension — routes PII-containing prompts to a local model (MLX or Ollama) instead of the cloud | ⭐6 | ~1mo ago |
| [zach-source-pi-agent-extensions](https://github.com/zach-source/pi-agent-extensions) | Pi coding agent extensions (graphiti, heartbeat) | ⭐6 | 3mo ago |
| [abboskhonov-pi-desktop](https://github.com/abboskhonov/pi-desktop) | Electron GUI app for the pi coding agent | ⭐5 | 7d ago |
| [code-yeongyu-pi-nested-agents-md](https://github.com/code-yeongyu/pi-nested-agents-md) | Nested AGENTS.md context injection for pi-mono coding-agent — ported from omo (oh-my-openagent). Walks up from any read file, injects nearby AGENTS.md into the tool result, with TUI status line, optio | ⭐5 | 5d ago |
| [code-yeongyu-pi-rules](https://github.com/code-yeongyu/pi-rules) | Rule context loader extension for the pi coding agent | ⭐5 | 5d ago |
| [Dovyski-pi-recap](https://github.com/Dovyski/pi-recap) | Small extension for pi-code-agent to show a recap message at the end of each interaction, as well as a title for the current session. | ⭐5 | 17d ago |
| [ghoseb-pi-irc-messenger](https://github.com/ghoseb/pi-irc-messenger) | IRC Messenger Extension for Pi Coding Agent | ⭐5 | 4mo ago |
| [joeygibson-pi-extensions](https://github.com/joeygibson/pi-extensions) | Extensions for the pi coding agent | ⭐5 | 17d ago |
| [jongirard-pi-grove](https://github.com/jongirard/pi-grove) | Plan-aware agent orchestration for Pi. Grove reads a structured markdown plan, parses it into work streams with dependencies, and orchestrates parallel AI agents to execute them — all monitored throug | ⭐5 | ~1mo ago |
| [KristjanPikhof-Pi-Agents-Team](https://github.com/KristjanPikhof/Pi-Agents-Team) | Pi extension that turns one coding session into a multi-agent team with background RPC worker agents. | ⭐5 | 5d ago |
| [pittaya-ui-pittaya-theme](https://github.com/pittaya-ui/pittaya-theme) | vscode extension for pittaya | ⭐5 | 3mo ago |
| [skyfallsin-pi-boss](https://github.com/skyfallsin/pi-boss) | Spawn and manage sub-agents in visible tmux panes — the orchestrator that makes multi-agent boss mode work for pi coding agent. | ⭐5 | ~1mo ago |
| [aibuildersmx-dotpi](https://github.com/aibuildersmx/dotpi) | Pi Coding Agent toolkit — extensions, skills, and agents for pi | ⭐4 | ~1mo ago |
| [alpozcan-pi-triage](https://github.com/alpozcan/pi-triage) | Smart model router for pi coding agent, multi-signal triage with keyword matching, heuristic analysis, AI fallback, and auto-discovery | ⭐4 | ~1mo ago |
| [CaptCanadaMan-pi-ollama](https://github.com/CaptCanadaMan/pi-ollama) | Pi coding agent extension for native Ollama — fixes tool calling under streaming | ⭐4 | yesterday |
| [cv-pi-bd](https://github.com/cv/pi-bd) | pi-coding-agent hooks for Beads (bd) issue tracking | ⭐4 | 5mo ago |
| [Dwsy-pi-gateway](https://github.com/Dwsy/pi-gateway) | Local AI Gateway for pi agent — Telegram, Discord, WebChat, and more | ⭐4 | 2mo ago |
| [fgladisch-pi-extensions](https://github.com/fgladisch/pi-extensions) | Personal extensions for the pi coding agent. | ⭐4 | today |
| [junghan0611-agent-config](https://github.com/junghan0611/agent-config) | Contextual continuity infrastructure for AI coding agents — semantic memory across sessions and org-mode knowledge bases. Pi extension + Gemini Embedding 2 + LanceDB. | ⭐4 | 25d ago |
| [Karrq-pi-ext-opencode-zen](https://github.com/Karrq/pi-ext-opencode-zen) | Pi coding agent extension for OpenCode Zen models | ⭐4 | 3mo ago |
| [markokocic-pi-ask-mode](https://github.com/markokocic/pi-ask-mode) | Ask mode extension for pi coding agent | ⭐4 | 7d ago |
| [markokocic-pi-minimax-tools](https://github.com/markokocic/pi-minimax-tools) | pi-mone extension to enable web_search and understand_image tools from Minimax Coding Plan MCP | ⭐4 | 4d ago |
| [qualisero-pi-agent-scip](https://github.com/qualisero/pi-agent-scip) | Adds SCIP tools to pi agent | ⭐4 | 4mo ago |
| [SamuelLHuber-pi-time-tracker](https://github.com/SamuelLHuber/pi-time-tracker) | Session timing extension for pi-coding-agent | ⭐4 | 17d ago |
| [skyfallsin-pi-vertex-anthropic](https://github.com/skyfallsin/pi-vertex-anthropic) | Pi coding agent extension for Claude via Google Cloud Vertex AI | ⭐4 | ~1mo ago |
| [tshu-w-pi-control](https://github.com/tshu-w/pi-control) | pi extension + skill that gives agents runtime self-control — resume sessions, switch models, navigate history, anchor and pivot — instead of leaving it user-only | ⭐4 | 5d ago |
| [vahidkowsari-pi-persistent-term](https://github.com/vahidkowsari/pi-persistent-term) | Integrated terminal panel for pi coding agent — persistent PTY shell, colored overlay, LLM tools | ⭐4 | today |
| [xsyetopz-olympi](https://github.com/xsyetopz/olympi) | A PiCodingAgent-first framework. | ⭐4 | 5d ago |
| [acoyfellow-pai-agent](https://github.com/acoyfellow/pai-agent) | Pi Agent Core — Research & analysis agent as a Cloudflare Durable Object with shell access, tool use, and WebSocket streaming | ⭐3 | ~1mo ago |
| [annapurna-himal-pi-vim-editor](https://github.com/annapurna-himal/pi-vim-editor) | A vim-like modal editor extension for Pi coding agent | ⭐3 | 4mo ago |
| [coctostan-pi-superteam](https://github.com/coctostan/pi-superteam) | Pi coding agent extension: TDD/ATDD enforcement, specialized agent dispatch, iterative review cycles, context-aware rules | ⭐3 | 3mo ago |
| [code-B-rabbit-pi-memory-cc](https://github.com/code-B-rabbit/pi-memory-cc) | Bring Claude Code's auto memory to pi-agent | ⭐3 | 27d ago |
| [code-yeongyu-pi-webfetch](https://github.com/code-yeongyu/pi-webfetch) | Web fetch tool extension for the pi coding agent | ⭐3 | 8d ago |
| [Dwsy-psm-bridge](https://github.com/Dwsy/psm-bridge) | Bridge Pi agent sessions to Pi Session Manager | ⭐3 | ~1mo ago |
| [fgladisch-pi-skills](https://github.com/fgladisch/pi-skills) | Personal skills library for the pi coding agent, mostly adapted from Superpowers | ⭐3 | 12d ago |
| [guwidoe-pi-toolbox](https://github.com/guwidoe/pi-toolbox) | Tools and workflows and packages for the pi coding agent | ⭐3 | yesterday |
| [hintjen-pi-extensions](https://github.com/hintjen/pi-extensions) | Pi coding agent extensions — /prune, /explore, and more | ⭐3 | 4mo ago |
| [larsderidder-pi-browser](https://github.com/larsderidder/pi-browser) | Browser automation tools for the pi coding agent, backed by Playwright. Connect to your running browser via CDP. | ⭐3 | 2mo ago |
| [leandr0ck-pi-find-skills](https://github.com/leandr0ck/pi-find-skills) | Extension for Pi coding agent. Search, discover, and install AI agent skills from different providers. | ⭐3 | ~1mo ago |
| [magimetal-pi-dev-browser](https://github.com/magimetal/pi-dev-browser) | Pi package extension adding dev-browser-powered browser automation for navigation, AI snapshots, interaction, and screenshots. | ⭐3 | 11d ago |
| [marcfargas-pi-powershell](https://github.com/marcfargas/pi-powershell) | PowerShell tool for pi agents - Windows system integration and background processes | ⭐3 | 3mo ago |
| [mwolff44-pi-secured-setup](https://github.com/mwolff44/pi-secured-setup) | Secure setup and permission hardening extension for the Pi coding agent. | ⭐3 | 18d ago |
| [Qredence-fleet-pi](https://github.com/Qredence/fleet-pi) | Fleet Pi , workspace for Pi-powered coding agents, with durable plans, memory, and repo-scoped tools | ⭐3 | today |
| [SamuelLHuber-pi-agent-skills-importer](https://github.com/SamuelLHuber/pi-agent-skills-importer) |  | ⭐3 | 3mo ago |
| [ssweens-pi-packages](https://github.com/ssweens/pi-packages) | Pi coding agent extension packages | ⭐3 | yesterday |
| [tarsgate-skynot](https://github.com/tarsgate/skynot) | Install Pi on your local unixy OS without sandbox but with peace of mind | ⭐3 | 5d ago |
| [theonejb-pi-extensions](https://github.com/theonejb/pi-extensions) | Custom/user extensions I have setup for my pi-coding-agent | ⭐3 | 3mo ago |
| [1612492-pi-slim](https://github.com/1612492/pi-slim) | Minimal pi extension for my workflow | ⭐2 | 20d ago |
| [adampoit-ai](https://github.com/adampoit/ai) | Reusable assets for AI agents (instructions, prompts, and skills) with optional pi and opencode Home Manager modules | ⭐2 | 7d ago |
| [agustif-pi-mimo-provider](https://github.com/agustif/pi-mimo-provider) | Xiaomi MiMo LLM provider for pi coding agent | ⭐2 | 2mo ago |
| [algal-pi-context-inspect](https://github.com/algal/pi-context-inspect) | Pi extension for inspecting context window usage and breakdown | ⭐2 | ~1mo ago |
| [anthod0-pi-lab](https://github.com/anthod0/pi-lab) | A collection of extensions for the pi coding agent. | ⭐2 | 13d ago |
| [arrismo-pi-config](https://github.com/arrismo/pi-config) | the setup I use for pi, extensions, themes, etc | ⭐2 | 3d ago |
| [asoules-pi-recall](https://github.com/asoules/pi-recall) | Long-term memory for the pi coding agent. Deja vu on read. | ⭐2 | 4mo ago |
| [c-drew-pi-venice-stats](https://github.com/c-drew/pi-venice-stats) | Live Venice Protocol stats dashboard for Pi Coding Agent | ⭐2 | 18d ago |
| [cemoody-pi-remote-control](https://github.com/cemoody/pi-remote-control) | Mobile-first self-hosted web control plane for many concurrent Pi coding-agent sessions | ⭐2 | 3d ago |
| [cherish-ltt-pi-dev-workflow](https://github.com/cherish-ltt/pi-dev-workflow) | pi-dev-workflow: Developer workflow toolkit for pi: git agents, code review, Karpathy guidelines, themes | ⭐2 | today |
| [code-yeongyu-pi-cua-integration](https://github.com/code-yeongyu/pi-cua-integration) | Cua (trycua/cua) computer-use integration extension for the pi/senpi coding agent | ⭐2 | 6d ago |
| [code-yeongyu-pi-websearch](https://github.com/code-yeongyu/pi-websearch) | Provider-backed web search tool for pi-coding-agent with config-gated activation, TUI status, and source-aware results. | ⭐2 | 8d ago |
| [danielscholl-pi-chamber](https://github.com/danielscholl/pi-chamber) | Pi extension package: durable agent identities (Genesis minds), single- and multi-mind conversations (mind, room), and a TUI lens viewer (observatory). | ⭐2 | 21d ago |
| [Denifia-pi-extensions](https://github.com/Denifia/pi-extensions) | Collection of personal extensions for the Pi coding agent | ⭐2 | ~1mo ago |
| [DxVapor-pi-supacode](https://github.com/DxVapor/pi-supacode) | Pi extension that reports agent lifecycle hooks to the Supacode macOS app | ⭐2 | ~1mo ago |
| [edheltzel-Recall](https://github.com/edheltzel/Recall) | A SQLite persistent memory layer for any coding agent. Stop-hook extraction captures sessions, MCP tools expose them mid-session, hybrid search retrieves them, and a tiered L0/L1 recall block injects  | ⭐2 | yesterday |
| [egornomic-pi-session-auto-rename](https://github.com/egornomic/pi-session-auto-rename) | Pi extension to rename sessions automatically using ai. | ⭐2 | 18d ago |
| [ghoseb-pi-splash](https://github.com/ghoseb/pi-splash) | A simple splash screen for pi coding agent. | ⭐2 | 5d ago |
| [gooyoung-pi-langfuse](https://github.com/gooyoung/pi-langfuse) | langfuse extension for pi-coding-agent | ⭐2 | 5d ago |
| [igun997-pi-sdlc](https://github.com/igun997/pi-sdlc) | SDLC skills for pi-agents: spec → plan → execute → verify with drift detection | ⭐2 | 9d ago |
| [it-ony-pi-session-context](https://github.com/it-ony/pi-session-context) | A pi coding agent extension that tracks and displays session context (worktree, Jira ticket, GitLab MR) in the footer | ⭐2 | 18d ago |
| [kirang89-pi-todo](https://github.com/kirang89/pi-todo) | A pi coding agent extension that adds a persistent todo widget and tool for tracking multi-step task progress | ⭐2 | 2mo ago |
| [larsderidder-theredbeard-pi-agent](https://github.com/larsderidder/theredbeard-pi-agent) | Personal pi coding agent package — extensions, skills, and themes | ⭐2 | ~1mo ago |
| [marco-souza-pi-browser-bridge](https://github.com/marco-souza/pi-browser-bridge) | Let your pi coding agent control the browser. Navigate, click, type, screenshot — all from the terminal over WebSocket. | ⭐2 | 22d ago |
| [marcos2872-pi-config](https://github.com/marcos2872/pi-config) | Configuração pessoal do pi coding agent — agentes, skills e extensões | ⭐2 | ~1mo ago |
| [NelsonBrandao-pi-agent-extensions](https://github.com/NelsonBrandao/pi-agent-extensions) | A collection of extensions, skills and themes for the pi coding agent | ⭐2 | ~1mo ago |
| [pi-codex](https://www.npmjs.com/package/pi-codex) | Use Codex from pi-coding-agent to review code or delegate tasks. | ⬇ 2/mo | 25d ago |
| [quantfiction-pi-bash-steer](https://github.com/quantfiction/pi-bash-steer) | Pi extension that blocks direct invocation of long-running verification commands and steers agents to the process() tool | ⭐2 | 2d ago |
| [SebasAren-SebbaFlow](https://github.com/SebasAren/SebbaFlow) | AI-augmented development environment, GNU Stow configs, 20+ Pi agent extensions, Neovim, tmux, and a custom toolchain for Linux workstations. | ⭐2 | 2d ago |
| [sergical-pi-sentry-monitor](https://github.com/sergical/pi-sentry-monitor) | Sentry AI Monitoring extension for pi coding agent — traces sessions, tool calls, and LLM requests | ⭐2 | ~1mo ago |
| [sherif-fanous-pi-presets-plus](https://github.com/sherif-fanous/pi-presets-plus) | A Pi coding agent extension for presets that bundle a model, thinking level, tools, and system prompt, with a TUI on top. | ⭐2 | 10d ago |
| [siarhei-belavus-agent-public](https://github.com/siarhei-belavus/agent-public) | Sanitized open-source Pi agent configuration, skills, and extensions | ⭐2 | 7d ago |
| [sigilmakes-pi-channels](https://github.com/sigilmakes/pi-channels) | Channel-based messaging and multi-agent coordination for the pi coding agent | ⭐2 | ~1mo ago |
| [skyfallsin-pi-room](https://github.com/skyfallsin/pi-room) | Multi-agent awareness for pi coding agent — agents discover peers, peek at their work, and coordinate via tmux. | ⭐2 | ~1mo ago |
| [snqb-pi-cc-bridge](https://github.com/snqb/pi-cc-bridge) | Claude provider bridge for Pi that preserves Pi tool execution and Pi-style workflow | ⭐2 | ~1mo ago |
| [sreeragh-s-mucode](https://github.com/sreeragh-s/mucode) | mucode is an open source terminal AI coding workspace for running multiple coding agents from one focused TUI. It gives you one local interface for: Codex Claude Code OpenCode pi-ai backed API provide | ⭐2 | 7d ago |
| [stefanerdmann-psbx](https://github.com/stefanerdmann/psbx) | CLI tool for sandboxing the pi coding agent in per-project Lima VMs on macOS ARM. Each project gets an isolated Ubuntu VM with pi pre-installed, host files mounted in, and environment-specific config  | ⭐2 | 3d ago |
| [ThewindMom-pi-doom-loop-detector](https://github.com/ThewindMom/pi-doom-loop-detector) | Detects doom loops in LLM outputs and enables recovery injection for Pi coding agent | ⭐2 | 11d ago |
| [ThilinaTLM-pi-toolbelt](https://github.com/ThilinaTLM/pi-toolbelt) | My personal set of essential tools and UI tweaks for pi coding agent. | ⭐2 | 3d ago |
| [umutbasal-pi-workflows](https://github.com/umutbasal/pi-workflows) | A pi extension that adds workflow orchestration — define multi-step agent pipelines as simple JavaScript scripts and run them from the TUI. | ⭐2 | 6d ago |
| [vedang-pi-prompt-history](https://github.com/vedang/pi-prompt-history) | A Ctrl-R style prompt history search extension for Pi | ⭐2 | ~1mo ago |
| [volker48-agent-customization](https://github.com/volker48/agent-customization) | Extensions etc. to customize agents like opencode, pi-mono, etc. | ⭐2 | 22d ago |
| [WindowsRefundDay-pi-antigravity-auth](https://github.com/WindowsRefundDay/pi-antigravity-auth) | Pi Coding Agent provider extension for Google Antigravity OAuth models, plus Gemini CLI quota routing and multi-account rotation. | ⭐2 | 6d ago |
| [yulqen-conductor-pi](https://github.com/yulqen/conductor-pi) | Conductor extension for pi agent | ⭐2 | 4mo ago |
| [zogzog26-rtk-pi](https://github.com/zogzog26/rtk-pi) | Lightweight Pi extension to the RTK CLI proxy that reduces LLM token consumption by 60-90% on common dev commands. Uses's RTK's single Rust binary with zero dependencies. | ⭐2 | ~1mo ago |
| [0xkuze-pi-agent-autodiscovery](https://github.com/0xkuze/pi-agent-autodiscovery) | a extension for pi-subagents insert into the prompt a instruction for the llms autodiscovery the agents. | ⭐1 | ~1mo ago |
| [a2ajinkya-phone-pi](https://github.com/a2ajinkya/phone-pi) | My pi coding agent skills & extensions for Termux (Android) | ⭐1 | 5d ago |
| [Acelogic-pi-lm-studio](https://github.com/Acelogic/pi-lm-studio) | Pi extension/package for LM Studio model discovery and provider registration | ⭐1 | 14d ago |
| [Agentic-Engineering-Agency-pi-seshat](https://github.com/Agentic-Engineering-Agency/pi-seshat) | Seshat the Ghola — a custom Pi coding-agent harness with Honcho memory bridge, SpecSafe slice lifecycle, and agent-aware git traceability. | ⭐1 | 14d ago |
| [agenticoding-pi-agenticoding](https://github.com/agenticoding/pi-agenticoding) |  | ⭐1 | 7d ago |
| [akijain2000-hermes-loop](https://github.com/akijain2000/hermes-loop) | Self-improving agent extension — creates skills from experience, compresses context iteratively, maintains persistent memory. Runs on Pi or Claude Code. Combines pi-mono + hermes-agent + Skill Factory | ⭐1 | ~1mo ago |
| [alexbruf-pi-runner](https://github.com/alexbruf/pi-runner) | A fork-friendly multi-skill AI agent template on Cloudflare Workers, powered by pi-mono | ⭐1 | ~1mo ago |
| [Alexintosh-pi-flare](https://github.com/Alexintosh/pi-flare) | use Cloudflare Workers AI Provider for pi agent | ⭐1 | ~1mo ago |
| [andi0b-pi-pwsh](https://github.com/andi0b/pi-pwsh) | PowerShell tool for pi coding agent | ⭐1 | 3d ago |
| [andreskemeny-pi-codex](https://github.com/andreskemeny/pi-codex) | Codex-style extension pack for Pi coding agent. | ⭐1 | 2mo ago |
| [ang-XWBWZ-pi-agent-extensions](https://github.com/ang-XWBWZ/pi-agent-extensions) |  | ⭐1 | 2d ago |
| [arcanemachine-pi-subagent](https://github.com/arcanemachine/pi-subagent) | A pi extension that enables spawning sub-agents via RPC for parallel task execution. | ⭐1 | 9d ago |
| [arikru-pi-agent-doctor](https://github.com/arikru/pi-agent-doctor) | Pi package for Pydantic AI diagnostic agent traces | ⭐1 | 9d ago |
| [artur-shlyapnikov-pi-north-star](https://github.com/artur-shlyapnikov/pi-north-star) | persistent /goal workflow extension for Pi coding-agent, enabling Codex-style long-running objectives, pause/resume/clear lifecycle, and goal-aware continuations | ⭐1 | 15d ago |
| [ashlineldridge-pi-vertex](https://github.com/ashlineldridge/pi-vertex) | Google Cloud Vertex AI provider for Pi coding agent - Claude, Gemini, and more | ⭐1 | ~1mo ago |
| [atomdmac-pi-jj](https://github.com/atomdmac/pi-jj) | An extension for working with JJ repository workspaces within the pi coding agent. | ⭐1 | ~1mo ago |
| [autonomous-toaster-voidm-pi-extension](https://github.com/autonomous-toaster/voidm-pi-extension) | pi-coding-agent extension for voidm — persistent memory for LLM agents | ⭐1 | 10d ago |
| [Baseline-Systems-pi-mcp](https://github.com/Baseline-Systems/pi-mcp) | MCP server that exposes the [Pi coding agent](https://github.com/badlogic/pi-mono) as tools callable from any MCP client (Claude Code, etc.). Designed for multi-turn design discussions and adversarial | ⭐1 | ~1mo ago |
| [basnijholt-pi-subagents](https://github.com/basnijholt/pi-subagents) | Persistent RPC sub-agent pool extension for pi | ⭐1 | 3mo ago |
| [bastio-ai-pi-extension](https://github.com/bastio-ai/pi-extension) | Bastio AI Security Gateway extension for the Pi coding agent | ⭐1 | 3mo ago |
| [bernardjbs-pi-agent-toolkit](https://github.com/bernardjbs/pi-agent-toolkit) | Curated Pi coding agent extensions and workflow tools | ⭐1 | 3mo ago |
| [blink-ai-26-pi-spawn-agents](https://github.com/blink-ai-26/pi-spawn-agents) | Headless read-only sub-agents for the Pi coding agent. Spawn parallel one-shot Pi instances, collect results. | ⭐1 | 3mo ago |
| [bnenu-pi-evaluate](https://github.com/bnenu/pi-evaluate) | An adversarial post-execute evaluation skill for [pi](https://github.com/mariozechner/pi-coding-agent). | ⭐1 | 5d ago |
| [bruno-garcia-pi-config](https://github.com/bruno-garcia/pi-config) | My personal pi coding agent configuration - skills and extensions | ⭐1 | ~1mo ago |
| [bry-guy-pi-ez-entire](https://github.com/bry-guy/pi-ez-entire) | Entire CLI integration for pi coding agent | ⭐1 | 3mo ago |
| [bu5hm4nn-pi-permissions](https://github.com/bu5hm4nn/pi-permissions) | pi-permissions is a Pi Coding Agent extension that secures ssh_bash and optional local bash usage with per-command approvals, strict fail-closed SSH blocking, and policy management via /permissions an | ⭐1 | 2mo ago |
| [buihongduc132-pi-acp-agents](https://github.com/buihongduc132/pi-acp-agents) | Pi extension: ACP agent client — spawn and control ACP-compatible agents (Gemini CLI, etc.) from within pi | ⭐1 | 7d ago |
| [c99e-gqlx](https://github.com/c99e/gqlx) | Pi extension that gives AI agents schema-aware GraphQL exploration and query execution tools | ⭐1 | ~1mo ago |
| [carlos-rodrigo-pi-config](https://github.com/carlos-rodrigo/pi-config) | My personal Pi extensions and themes | ⭐1 | 2d ago |
| [cdias900-pi-subagent](https://github.com/cdias900/pi-subagent) | Multi-agent orchestration for PI — spawn specialized agents, coordinate teams, share context | ⭐1 | 7d ago |
| [charles-cooper-pi-extensions](https://github.com/charles-cooper/pi-extensions) | personal extensions to pi agent | ⭐1 | 15d ago |
| [chily-john-suPIerior](https://github.com/chily-john/suPIerior) | suPIerior tooling for the Pi agent | ⭐1 | 4d ago |
| [cliftonc-agentic-pi](https://github.com/cliftonc/agentic-pi) | An opinionated wrapper for Pi for use in agentic workflows, with built in github app extension and optional sandboxing. | ⭐1 | 2d ago |
| [code-yeongyu-pi-bash-timeout](https://github.com/code-yeongyu/pi-bash-timeout) | Bash timeout policy extension for the pi coding agent | ⭐1 | 8d ago |
| [code-yeongyu-pi-google-google-search](https://github.com/code-yeongyu/pi-google-google-search) | Google native search policy extension for the pi coding agent. Ensures native googleSearch tools are present on Google API payloads by default and appends Google Search guidance to the system prompt. | ⭐1 | 8d ago |
| [code-yeongyu-pi-openai-code-interpreter](https://github.com/code-yeongyu/pi-openai-code-interpreter) | OpenAI native code interpreter policy extension for the pi coding agent. Ensures native code_interpreter tools are present on Responses API payloads when opt-in is enabled and appends code interpreter | ⭐1 | 8d ago |
| [code-yeongyu-pi-openai-web-search](https://github.com/code-yeongyu/pi-openai-web-search) | OpenAI Responses native web search policy extension for the pi coding agent. Ensures native web_search tools are present on openai-responses and azure-openai-responses payloads and appends web search  | ⭐1 | 8d ago |
| [combust-labs-pi-mono-ext-ollama](https://github.com/combust-labs/pi-mono-ext-ollama) | Ollama tool for pi-mono coding agent | ⭐1 | 17d ago |
| [crustyhacker-pi-zerg-swarm](https://github.com/crustyhacker/pi-zerg-swarm) | Pi coding-agent extension for high-capacity agentic coding teams/subagents. | ⭐1 | today |
| [Devin-Marks-pi-workbench](https://github.com/Devin-Marks/pi-workbench) | An OpenCode/OpenChamber inspired WebUI for the Pi Coding agent. | ⭐1 | 25d ago |
| [dkmaker-pi-project](https://github.com/dkmaker/pi-project) | Pi Package: AI-Optimized Project Management Framework for Pi Coding Agent | ⭐1 | 3mo ago |
| [dmorn-pi-file-review](https://github.com/dmorn/pi-file-review) | Pi extension: review agent-modified files in your $EDITOR and inject the diff back into the loop | ⭐1 | 3mo ago |
| [dwayn-pi-things](https://github.com/dwayn/pi-things) | My set of extensions and things for pi coding agent | ⭐1 | 3mo ago |
| [Dwsy-ace-tool-skill](https://github.com/Dwsy/ace-tool-skill) | Semantic code search using AugmentCode for Pi Agent with debug web UI | ⭐1 | 4mo ago |
| [DxVapor-pi-prompt-enhancer](https://github.com/DxVapor/pi-prompt-enhancer) | A pi coding agent extension that enhances prompts using a configurable dedicated model | ⭐1 | 18d ago |
| [eddmann-agent-toolkit](https://github.com/eddmann/agent-toolkit) | Collection of reusable skills and extensions for AI coding agents - prompts, Pi extensions, and other bits and pieces. | ⭐1 | ~1mo ago |
| [egornomic-pi-chain](https://github.com/egornomic/pi-chain) | Pi extension that starts a new session seeded with the last assistant reply | ⭐1 | 2mo ago |
| [eleqtrizit-pi-chains](https://github.com/eleqtrizit/pi-chains) | Agent chains for Pi Coding Agent | ⭐1 | 12d ago |
| [elowen53-feynman-learning](https://github.com/elowen53/feynman-learning) | A strict Feynman learning coach package for Pi Coding Agent. | ⭐1 | 11d ago |
| [EnTeQuAk-pi-repomap](https://github.com/EnTeQuAk/pi-repomap) | Tree-sitter powered repository map for pi coding agent | ⭐1 | ~1mo ago |
| [espennilsen-pi-webserver](https://github.com/espennilsen/pi-webserver) | Shared HTTP server extension for pi coding agents. One port, one dashboard, shared auth — other extensions mount routes via API or event bus. | ⭐1 | 3mo ago |
| [FaiyazAwsaf-convex-sandbox-chatbot](https://github.com/FaiyazAwsaf/convex-sandbox-chatbot) | Chatbot app where each conversation spins up its own isolated VM with a Pi Agent, orchestrated by Convex. | ⭐1 | ~1mo ago |
| [fluxgear-pi-zerg-swarm](https://github.com/fluxgear/pi-zerg-swarm) | Pi coding-agent extension for high-capacity agentic coding teams/subagents. | ⭐1 | 10d ago |
| [forjd-forjd-pi](https://github.com/forjd/forjd-pi) | Forjd extension pack for the pi coding agent | ⭐1 | today |
| [forjd-pi-pr-ally](https://github.com/forjd/pi-pr-ally) | GitHub PR + CI copilot extension package for pi | ⭐1 | ~1mo ago |
| [fosskar-pi-pack](https://github.com/fosskar/pi-pack) | skills, extensions, and prompts for pi coding agent | ⭐1 | 3mo ago |
| [frgmt0-ale](https://github.com/frgmt0/ale) | Ale is a cloud delegation service specifically for Pi agents | ⭐1 | 23d ago |
| [GappelSolutions-pi-extensions](https://github.com/GappelSolutions/pi-extensions) | Pi coding agent extensions — workflow, lazylink, session dashboard | ⭐1 | 3mo ago |
| [georgebashi-pi-transcribe](https://github.com/georgebashi/pi-transcribe) | Speech-to-text dictation extension for pi coding agent — hold spacebar, speak, release. All transcription runs locally. | ⭐1 | 2mo ago |
| [gturkoglu-pi-dynsys](https://github.com/gturkoglu/pi-dynsys) | Pi extension that generates a per-turn system-prompt augmentation + senior persona via a nested Pi call (openai-codex), optimized for design-first full-stack craftsmanship. | ⭐1 | 4mo ago |
| [gwelinder-pi-cloudflare-codemode](https://github.com/gwelinder/pi-cloudflare-codemode) | Pi extension and Wrangler-provisioned Cloudflare Worker template for agent-authored Cloudflare operations via a codemode sandbox. | ⭐1 | 25d ago |
| [hai-pilgrim-pi-pilgrim](https://github.com/hai-pilgrim/pi-pilgrim) | A customized harness for the pi coding agent | ⭐1 | 10d ago |
| [hermitoad-pi-packages](https://github.com/hermitoad/pi-packages) | Pi extensions and packages monorepo | ⭐1 | 5d ago |
| [hschne-pi-stuff](https://github.com/hschne/pi-stuff) | Standalone repo for pi agent configuration, extensions, prompts, and skills | ⭐1 | 2d ago |
| [Huijiro-click](https://github.com/Huijiro/click) | PI extension providing SQLite-based persistent memory for AI agents with FTS5 search, project/user scoping, and auto-injection of relevant context. | ⭐1 | 3mo ago |
| [imkingjh999-pi-arcade-games](https://github.com/imkingjh999/pi-arcade-games) | 🎮 Retro terminal arcade for Pi coding agent - play Snake, 2048, Minesweeper, Wordle, Hangman, and Tic-Tac-Toe in your terminal | ⭐1 | 4d ago |
| [imkingjh999-pi-game](https://github.com/imkingjh999/pi-game) | 🎮 Retro terminal arcade for Pi coding agent - play Snake, 2048, Minesweeper, Wordle, Hangman, and Tic-Tac-Toe in your terminal | ⭐1 | 6d ago |
| [indigoviolet-pi-horde](https://github.com/indigoviolet/pi-horde) | Pi coding agent extension: multi-agent networking via NATS | ⭐1 | 2mo ago |
| [Istar-Eldritch-ai-tools](https://github.com/Istar-Eldritch/ai-tools) | A pi-coding-agent extensions, prompts and utilities | ⭐1 | 13d ago |
| [j6e-pi-auto-mode](https://github.com/j6e/pi-auto-mode) | A Claude auto mode clone for the Pi coding agent | ⭐1 | 9d ago |
| [jakubtomas-cz-pi-mempress](https://github.com/jakubtomas-cz/pi-mempress) | A simple extension for pi.dev agent that displays current memory pressure and usage in the status line. Works only on Mac. | ⭐1 | 10d ago |
| [jandrikus-pi-security-gates](https://github.com/jandrikus/pi-security-gates) | Tiered permissions gate and project-boundary security gate extensions for the Pi coding agent harness | ⭐1 | 27d ago |
| [JerryAZR-pi-todo-lite](https://github.com/JerryAZR/pi-todo-lite) | A lightweight todo list extension for the pi coding agent | ⭐1 | 4d ago |
| [jessedc-pi-brave-search-extension](https://github.com/jessedc/pi-brave-search-extension) | Brave Search web search extension for the Pi coding agent — single unified web_search tool wrapping bx | ⭐1 | 20d ago |
| [JJGO-pi-internet](https://github.com/JJGO/pi-internet) | No nonsense web search and content fetching for pi coding agent | ⭐1 | 17d ago |
| [joelhooks-pi-effect](https://github.com/joelhooks/pi-effect) | Source-first Effect guardrails for Pi agents: clone the spellbook before casting the damn spell. | ⭐1 | 5d ago |
| [karinMusaka-openspec-plannotator](https://github.com/karinMusaka/openspec-plannotator) | Pi extension bridging OpenSpec and Plannotator - visual review for AI coding agent plans | ⭐1 | 2mo ago |
| [kcodes0-ale](https://github.com/kcodes0/ale) | Ale is a cloud delegation service specifically for Pi agents | ⭐1 | 23d ago |
| [King-Capital-multi-agent-engine](https://github.com/King-Capital/multi-agent-engine) | Multi-agent orchestration engine with Red/Blue team swarms, live dashboard, and platform adapters for Pi/CC/Codex/Hermes | ⭐1 | 6d ago |
| [KristjanPikhof-Pi-YAML-Hooks](https://github.com/KristjanPikhof/Pi-YAML-Hooks) | YAML hook automation for the PI coding agent: tool guards, session hooks, prompts, notifications, and bash actions. | ⭐1 | 13d ago |
| [kucukkanat-nano-chat](https://github.com/kucukkanat/nano-chat) | Super-minimalistic desktop chat app for agentic AI, built on pi-mono. Streaming thoughts, inspectable tool calls, mid-chat model swap. | ⭐1 | 29d ago |
| [ky2renzz-pi-yggdrasil](https://github.com/ky2renzz/pi-yggdrasil) | Multi-repo workspace extension for Pi coding agent - manage multiple repositories as a single workspace | ⭐1 | 29d ago |
| [kylesnowschwartz-tail-claude-mux](https://github.com/kylesnowschwartz/tail-claude-mux) | tmux sidebar with Claude Code/pi agent state, git branches, and instant session switching. Personal tool — fork at your own risk. | ⭐1 | 2d ago |
| [leblancfg-lsp-pi](https://github.com/leblancfg/lsp-pi) | Language Server Protocol integration for pi-coding-agent | ⭐1 | 3mo ago |
| [lollipopkit-pi-models-metadata](https://github.com/lollipopkit/pi-models-metadata) | Fetches models from the provider /models endpoint and enriches them with OpenRouter metadata | ⭐1 | 6d ago |
| [lucacorbucci-pi-peer-review](https://github.com/lucacorbucci/pi-peer-review) | A simple pi.dev extension to spawn agents to review your ML papers | ⭐1 | 27d ago |
| [LuneZhang-pi-extensions](https://github.com/LuneZhang/pi-extensions) | Plug-and-play extensions for pi coding agent. | ⭐1 | ~1mo ago |
| [luongnv89-pi-extensions](https://github.com/luongnv89/pi-extensions) | Collection of extensions and themes for Pi Coding Agent | ⭐1 | 3d ago |
| [MaksimZinovev-pi-agent-config](https://github.com/MaksimZinovev/pi-agent-config) | Personal Pi agent configuration, skills, extensions, and settings | ⭐1 | 7d ago |
| [marcbaque-pi-ui](https://github.com/marcbaque/pi-ui) | Desktop UI for the pi coding agent — multi-session tabs, session history, live tool call streaming | ⭐1 | ~1mo ago |
| [marcellocurto-pi-extensions](https://github.com/marcellocurto/pi-extensions) | A small collection of personal pi coding-agent extensions. | ⭐1 | 21d ago |
| [marcfargas-permission-gate](https://github.com/marcfargas/permission-gate) | Tool permission enforcement for pi agents — gates tool calls based on safety classifications | ⭐1 | 3mo ago |
| [marcfargas-pi-planner](https://github.com/marcfargas/pi-planner) | Persistent, auditable plan-then-execute workflow for pi agents | ⭐1 | 3mo ago |
| [markokocic-pi-emacs](https://github.com/markokocic/pi-emacs) | Set of Emacs realted tools for pi-mono pi coding agent | ⭐1 | 7d ago |
| [martelogan-pi-autoclanker](https://github.com/martelogan/pi-autoclanker) | Autoclanker pi extension for Bayesian Agent experiment loops | ⭐1 | 21d ago |
| [martingrimmer-pi-web-ui](https://github.com/martingrimmer/pi-web-ui) | Pi coding agent over web frontend. | ⭐1 | 28d ago |
| [maxjendrall-ai-extensions](https://github.com/maxjendrall/ai-extensions) | pi-mono coding agent extensions | ⭐1 | 4mo ago |
| [mercurylamp-pi-prism](https://github.com/mercurylamp/pi-prism) | A small pi coding-agent extension pack for theme sync, fast mode, prompt alarms, and peer review | ⭐1 | 28d ago |
| [nakayama900-pi-casegraph](https://github.com/nakayama900/pi-casegraph) | CaseGraph CLI integration for pi-coding-agent. cg tool + /cg* commands. | ⭐1 | ~1mo ago |
| [naripok-pi-superpowers](https://github.com/naripok/pi-superpowers) | Frankenstein merge of obra/superpowers and openspec + subagents extension for the pi-coding-agent | ⭐1 | 18d ago |
| [neevparikh-pi-vim](https://github.com/neevparikh/pi-vim) | vim-style extension for pi coding agent | ⭐1 | 7d ago |
| [Neonity2020-neonity-agent](https://github.com/Neonity2020/neonity-agent) | A lightweight AI coding agent framework with multi-provider LLM support, inspired by pi-mono's architecture | ⭐1 | 17d ago |
| [Neonity2020-pi-agent-clone](https://github.com/Neonity2020/pi-agent-clone) | A lightweight AI coding agent framework with multi-provider LLM support, inspired by pi-mono's architecture | ⭐1 | 23d ago |
| [Nick-Wolf-HLK-pi-tscg](https://github.com/Nick-Wolf-HLK/pi-tscg) | Drop-in tool-schema and tool-result compression plugin for the Pi coding-agent. Built on @tscg/core. | ⭐1 | 26d ago |
| [nielsjaspers-magpie](https://github.com/nielsjaspers/magpie) | A set of custom tools and extensions I've made for the Pi coding agent | ⭐1 | 8d ago |
| [nunofgs-pi-hookify](https://github.com/nunofgs/pi-hookify) | Create hooks for the pi coding agent (pi.dev) with natural language | ⭐1 | 2mo ago |
| [opsCoffee-pi-continuous-learning-v2](https://github.com/opsCoffee/pi-continuous-learning-v2) | Continuous Learning v2 for pi-coding-agent. Learns project-scoped instincts from sessions and generates reusable skills and prompts from real repository workflows. | ⭐1 | ~1mo ago |
| [Otard95-pi-extensions](https://github.com/Otard95/pi-extensions) | Personal pi extensions bundled as a pi package. | ⭐1 | 3d ago |
| [pablomarti-pi-mini-web-research](https://github.com/pablomarti/pi-mini-web-research) | Web research tools for pi. Gives the agent autonomous web search (DuckDuckGo), page fetching with HTML→text cleaning, and GitHub exploration (repos, code, issues, files, trees) via gh CLI. Token-effic | ⭐1 | ~1mo ago |
| [Pascapone-pibo](https://github.com/Pascapone/pibo) | Pibo turns Pi Coding Agent into an agent-native runtime with discoverable CLI tools, plugins, channels, and local gateways. | ⭐1 | today |
| [pasky-pi-sub-reconstructed](https://github.com/pasky/pi-sub-reconstructed) | Usage tracking extensions for pi-coding-agent (reconstructed from npm packages) | ⭐1 | 4mo ago |
| [punzik-pi-simple-notify](https://github.com/punzik/pi-simple-notify) | Simple notification plugin for Pi coding agent | ⭐1 | 10d ago |
| [pweiskircher-pi-lanes](https://github.com/pweiskircher/pi-lanes) | Lane-based workflow, CLI, and dashboard for pi coding agent sessions | ⭐1 | 3mo ago |
| [qianwan-mono-pilot](https://github.com/qianwan/mono-pilot) | A lean, Cursor-style coding agent built on pi. Take full control of your AI workflow with a custom tool layer (ApplyPatch, rg, Glob), transparent prompt inspection, and native Model Context Protocol ( | ⭐1 | 6d ago |
| [Quicksandprotiumguianense974-pi-workstation](https://github.com/Quicksandprotiumguianense974/pi-workstation) | Extend pi coding agent with custom themes, a music player, a knowledge graph, and AI companion tools for a richer workstation | ⭐1 | today |
| [r3b1s-rtk-pi](https://github.com/r3b1s/rtk-pi) | RTK (Rust Token Killer) extension for pi-coding-agent. Simple, transparent extension to plug pi into rtk. | ⭐1 | 4d ago |
| [rjroy-oracle-keep](https://github.com/rjroy/oracle-keep) | Browser UI for the pi coding agent. Wraps a pi session in a Next.js streaming interface with session persistence, tool call visibility, and compaction status. | ⭐1 | 8d ago |
| [rnoldo-pi-ext-pomo](https://github.com/rnoldo/pi-ext-pomo) | Pomodoro + eye/neck/waist health reminder extension for pi coding agent, with countdown status and session persistence. | ⭐1 | 3mo ago |
| [roodriigoooo-trail](https://github.com/roodriigoooo/trail) | Trail is a pi extension for navigating/preserving the useful artifacts of an agent session. Browse lanes such as commands, errors, files, code blocks, prompts, and model responses; copy or inject any  | ⭐1 | 24d ago |
| [rpollard00-pi-materia](https://github.com/rpollard00/pi-materia) | Pi extension for socketable agent pipelines. | ⭐1 | yesterday |
| [run-llama-liteparse-pi-extension](https://github.com/run-llama/liteparse-pi-extension) | LiteParse extension for Pi agents | ⭐1 | 3d ago |
| [s1lver091-pi-agent-config](https://github.com/s1lver091/pi-agent-config) | Personal pi coding agent setup: extensions, skills, subagents and prompt templates for a safer and more structured AI assisted development | ⭐1 | 28d ago |
| [safzanpirani-pi-config](https://github.com/safzanpirani/pi-config) | Pi coding agent config with multi-account Antigravity extension | ⭐1 | 20d ago |
| [sahil-shubham-pi-bhatti-browser](https://github.com/sahil-shubham/pi-bhatti-browser) | Pi extension: Chromium browser in Bhatti microVM sandboxes for AI coding agents | ⭐1 | ~1mo ago |
| [samfoy-pi-conductor](https://github.com/samfoy/pi-conductor) | Pi-coding-agent extension that turns the parent pi session into an orchestrator driving persona-based sub-agents with first-class TUI visibility. | ⭐1 | 3d ago |
| [saphid-raycast-pi](https://github.com/saphid/raycast-pi) | Raycast companion extension for the Pi coding agent | ⭐1 | 27d ago |
| [sergical-pi-config](https://github.com/sergical/pi-config) | My personal pi coding agent configuration — skills, extensions, and agents | ⭐1 | 2mo ago |
| [shaftoe-pi-docker-sandbox](https://github.com/shaftoe/pi-docker-sandbox) | A Pi coding agent extension for running sandboxed subagents in Docker Desktop Sandboxes | ⭐1 | ~1mo ago |
| [shanepadgett-crumbs](https://github.com/shanepadgett/crumbs) | Extensions, tools, prompts, and skills for Pi coding agent | ⭐1 | 2d ago |
| [sinAshish-Roku-agent](https://github.com/sinAshish/Roku-agent) | A custom extension for the Pi Coding Agent that turns your AI agent into a smart, programmable network remote for your Roku TV! | ⭐1 | 22d ago |
| [sleepyeldrazi-pi-meta-agent-orchestration](https://github.com/sleepyeldrazi/pi-meta-agent-orchestration) | Multi-agent orchestration extensions for pi - pi-multi-agent and cross-agent-orchestrator | ⭐1 | ~1mo ago |
| [Soleone-pi-ext](https://github.com/Soleone/pi-ext) | My pi agent extensions | ⭐1 | 2mo ago |
| [StarkInternationalAI-pi-desktop](https://github.com/StarkInternationalAI/pi-desktop) | A UI desktop app for the pi coding agent | ⭐1 | 24d ago |
| [szokeasaurusrex-pi-agent](https://github.com/szokeasaurusrex/pi-agent) | My global configuration for Pi agent | ⭐1 | 3d ago |
| [tanRdev-pi-desktop](https://github.com/tanRdev/pi-desktop) | Native macOS desktop app for the Pi coding agent | ⭐1 | 25d ago |
| [testzugang-pi-plugins](https://github.com/testzugang/pi-plugins) | Skills, Extensions, Themes etc. for the pi coding agent | ⭐1 | 17d ago |
| [tfidfwastaken-pi-web](https://github.com/tfidfwastaken/pi-web) | ⚠️ Clankerslop: AI-generated web frontend for pi coding agent. Use at your own risk. | ⭐1 | 4mo ago |
| [therynamo-pi-agent-time](https://github.com/therynamo/pi-agent-time) | Pi extension showing per-turn and cumulative LLM response times in the status bar | ⭐1 | 3d ago |
| [therynamo-pi-auto-session-name](https://github.com/therynamo/pi-auto-session-name) | Pi extension that auto-generates session titles based on conversation | ⭐1 | 3d ago |
| [therynamo-pi-changed-files](https://github.com/therynamo/pi-changed-files) | Pi extension showing git-changed files in a floating overlay with diff counts | ⭐1 | 3d ago |
| [timm-u-pi-usage](https://github.com/timm-u/pi-usage) | Usage limit checker extension for pi coding agent — shows Codex and OpenCode Go limits at startup | ⭐1 | ~1mo ago |
| [toorusr-ai-extensions](https://github.com/toorusr/ai-extensions) | pi-mono coding agent extensions | ⭐1 | 4mo ago |
| [trotsky1997-pi-lsp-extension](https://github.com/trotsky1997/pi-lsp-extension) | Language Server Protocol integration for pi-coding-agent | ⭐1 | ~1mo ago |
| [twcrews-crust](https://github.com/twcrews/crust) | Pi Coding Agent extension for VS Code | ⭐1 | 3d ago |
| [Veucci-pi-prompt-translate](https://github.com/Veucci/pi-prompt-translate) | A lightweight extension for the Pi Coding Agent that translates user prompts into a configurable target language before they reach the agent. Perfect for multilingual developers who prefer to think an | ⭐1 | 19d ago |
| [vincents-ai-pi-engram-extensions](https://github.com/vincents-ai/pi-engram-extensions) | Engram extensions and skills for the pi coding agent — persistent memory, orchestration, workflow state machines, model failover, and commit enforcement. | ⭐1 | ~1mo ago |
| [wanderingspirit03-pi-math-render](https://github.com/wanderingspirit03/pi-math-render) | LaTeX → Unicode math renderer extension for pi (pi-coding-agent) | ⭐1 | ~1mo ago |
| [wassname-pi-lgtm](https://github.com/wassname/pi-lgtm) | UAT-style task tree with verify commands and done criteria for pi coding agent | ⭐1 | 24d ago |
| [Wayaans-ramean](https://github.com/Wayaans/ramean) | pi package for extensions collection for my personal need for pi-coding-agent | ⭐1 | 2d ago |
| [wenkil-pi-plan-runtime](https://github.com/wenkil/pi-plan-runtime) | A dedicated Plan Execution Runtime for Pi Coding Agent. Pure, reusable, and source-first engine for scheduling multi-step agent workflows in serial or parallel without business state coupling. | ⭐1 | 20d ago |
| [@0xkobold/pi-orchestration](https://www.npmjs.com/package/@0xkobold/pi-orchestration) | Agnostic subagent orchestration for pi-coding-agent |  | ~1mo ago |
| [@0xkobold/pi-persona](https://www.npmjs.com/package/@0xkobold/pi-persona) | Persona extension for pi agents — SOUL.md, IDENTITY.md, USER.md loading, scaffolding, and system prompt injection |  | ~1mo ago |
| [@0xkobold/pi-secret-guardian](https://www.npmjs.com/package/@0xkobold/pi-secret-guardian) | Secret detection and pi-share-hf integration for pi-coding-agent |  | ~1mo ago |
| [@adamjen/pi-agent-turn-limiter](https://www.npmjs.com/package/@adamjen/pi-agent-turn-limiter) | Forces the pi orchestrator to delegate to a subagent after N turns — prevents getting stuck in endless work loops. |  | yesterday |
| [@adamjen/pi-one-subagent-at-a-time](https://www.npmjs.com/package/@adamjen/pi-one-subagent-at-a-time) | Enforces sequential subagent execution — prevents concurrent subagent spawns that cause model swapping overhead on single-GPU setups. |  | 2d ago |
| [@adix7/pi-agent-teams](https://www.npmjs.com/package/@adix7/pi-agent-teams) | Experimental agent swarm extension for Pi. Inspired by Claude agent teams. |  | 18d ago |
| [@agney/pi-honcho-memory](https://www.npmjs.com/package/@agney/pi-honcho-memory) | Honcho persistent memory extension for pi coding agent |  | 3d ago |
| [@agnishc/edb-session-manager](https://www.npmjs.com/package/@agnishc/edb-session-manager) | Pi extension: alert when Pi's bundled default system prompt changes |  | 2d ago |
| [@aittalam/pi-llamafile](https://www.npmjs.com/package/@aittalam/pi-llamafile) | Pi extension that supervises local llamafile-served model processes — start, stop, adopt, with progress visible on quit |  | 4d ago |
| [@aizigao/pi-claude-code-headers-compat](https://www.npmjs.com/package/@aizigao/pi-claude-code-headers-compat) | Pi extension package for Claude-compatible header and request-path adaptation across multiple providers. |  | 2d ago |
| [@aizigao/pi-vibeguard](https://www.npmjs.com/package/@aizigao/pi-vibeguard) | Pi extension that replaces sensitive strings with placeholders before LLM requests (inspired by VibeGuard). |  | yesterday |
| [@alexanderfortin/pi-deepseek-usage](https://www.npmjs.com/package/@alexanderfortin/pi-deepseek-usage) | Pi coding agent extension to enrich footer with DeepSeek current usage |  | yesterday |
| [@alexanderfortin/pi-freestyle-sandbox](https://www.npmjs.com/package/@alexanderfortin/pi-freestyle-sandbox) | Pi coding agent extension for running sandboxed subagents in Freestyle cloud VMs |  | 17d ago |
| [@alexanderfortin/pi-loaded-tools](https://www.npmjs.com/package/@alexanderfortin/pi-loaded-tools) | Pi coding agent extension to list session's loaded tools. |  | 3d ago |
| [@alexanderfortin/pi-tavily-tools](https://www.npmjs.com/package/@alexanderfortin/pi-tavily-tools) | Pi coding agent extension for Tavily web search API |  | yesterday |
| [@alexanderfortin/pi-token-usage](https://www.npmjs.com/package/@alexanderfortin/pi-token-usage) | Pi coding agent extension to help visualize token consumption |  | 3d ago |
| [@alexanderfortin/pi-zai-usage](https://www.npmjs.com/package/@alexanderfortin/pi-zai-usage) | Pi coding agent extension to enrich footer with Z.ai plan current usage |  | yesterday |
| [@alexion42/pi-web-search](https://www.npmjs.com/package/@alexion42/pi-web-search) | Single-tool Exa-powered web search and URL reading for Pi coding agent |  | yesterday |
| [@alexlikevibe/pi-load](https://www.npmjs.com/package/@alexlikevibe/pi-load) | /load command for pi – resume a shared session from a URL |  | today |
| [@alexparamonov/pi-tokf](https://www.npmjs.com/package/@alexparamonov/pi-tokf) | pi extension that wraps commands through tokf for compressed output. |  | 6d ago |
| [@alfonzjanfrithz/pi-websearch](https://www.npmjs.com/package/@alfonzjanfrithz/pi-websearch) | Web search and URL content fetching tools for Pi coding agent |  | yesterday |
| [@amaster.ai/pi-teamwork](https://www.npmjs.com/package/@amaster.ai/pi-teamwork) | Pi extension for team collaboration and issue management via Multica |  | today |
| [@anton-kochev/pi-extensions](https://www.npmjs.com/package/@anton-kochev/pi-extensions) | Pi extensions. |  | 3d ago |
| [@aphotic/pi-flow-core](https://www.npmjs.com/package/@aphotic/pi-flow-core) | Aggregate install package for pi-flow workflow resources. |  | 2d ago |
| [@aphotic/pi-mux-subagents](https://www.npmjs.com/package/@aphotic/pi-mux-subagents) | Subagents for the pi coding agent that support interaction by spawning in mux panes. |  | 3d ago |
| [@apolosan/unified-process](https://www.npmjs.com/package/@apolosan/unified-process) | Unified Process pi Extension is a Pi package that bundles an Object-Oriented Unified Process workflow for the pi coding agent. |  | 6d ago |
| [@artyomspace/pi-telegram-connect](https://www.npmjs.com/package/@artyomspace/pi-telegram-connect) | Telegram bridge for the Pi coding agent |  | yesterday |
| [@aryanbhargav/pi-orch-cmux](https://www.npmjs.com/package/@aryanbhargav/pi-orch-cmux) | CMUX-native peer-to-peer Pi agent mesh extension |  | 3d ago |
| [@askjo/pi-mem](https://www.npmjs.com/package/@askjo/pi-mem) | Plain-Markdown persistent memory for AI coding agents. Long-term facts, daily logs, scratchpad, and semantic search — works with pi, Claude Code, and any LLM agent. |  | yesterday |
| [@askjo/pi-reflect](https://www.npmjs.com/package/@askjo/pi-reflect) | Self-improving behavioral files for AI coding agents. Analyzes session transcripts for correction patterns and makes surgical edits to prevent recurrence. |  | 17d ago |
| [@aslamplr/pi-ios-notify](https://www.npmjs.com/package/@aslamplr/pi-ios-notify) | Send iOS push notifications via Bark when pi completes agent turns |  | 6d ago |
| [@atlas.labs/pi-goal](https://www.npmjs.com/package/@atlas.labs/pi-goal) | /goals for pi coding agent |  | 7d ago |
| [@aveltens/pi-kit-linked-data](https://www.npmjs.com/package/@aveltens/pi-kit-linked-data) | Skills and extensions for the Pi Coding Agent |  | 4d ago |
| [@axnic/pi-aks-user-question](https://www.npmjs.com/package/@axnic/pi-aks-user-question) | A pi extension that lets LLMs ask structured questions to users via an interactive TUI form. |  | 12d ago |
| [@axnic/pi-extension-settings-sdk](https://www.npmjs.com/package/@axnic/pi-extension-settings-sdk) | A pi extension to manage settings of other extensions. |  | ~1mo ago |
| [@ayulab/pi-checkpoint](https://www.npmjs.com/package/@ayulab/pi-checkpoint) | File-level checkpoint engine using git bare repos |  | 2d ago |
| [@baggiiiie/pi-lazy-load](https://www.npmjs.com/package/@baggiiiie/pi-lazy-load) | Lightweight Pi extension that registers stub slash commands and loads optional extensions on demand. |  | 6d ago |
| [@baochunli/pi-collaborating-agents](https://www.npmjs.com/package/@baochunli/pi-collaborating-agents) | An extension that allows spawning multiple collaborating agents via messaging, for the Pi coding agent. |  | ~1mo ago |
| [@baretread/pi-forge](https://www.npmjs.com/package/@baretread/pi-forge) | Matte graphite, molten copper Forge theme and visual atmosphere for Pi. |  | 18d ago |
| [@benvargas/pi-exa-mcp](https://www.npmjs.com/package/@benvargas/pi-exa-mcp) | Packages for Pi - extensions, skills, prompt templates, and themes. |  | 4d ago |
| [@biratkk/pi-trust-policy](https://www.npmjs.com/package/@biratkk/pi-trust-policy) | Bash command allowlist system for pi — grouped trust policies with glob matching, recursive parsing, and an interactive TUI manager |  | 3d ago |
| [@bom0792/pi-teams](https://www.npmjs.com/package/@bom0792/pi-teams) | Pi extension for coordinated AI teams, workflows, worktrees, and async task orchestration |  | 29d ago |
| [@brain0pia/pi-ultrathink](https://www.npmjs.com/package/@brain0pia/pi-ultrathink) | pi-ultrathink is a Pi extension that gives your agent the ability to reflect, verify, and iteratively improve its work before handing it back to you. |  | 2mo ago |
| [@bramgeron/pi-kagi](https://www.npmjs.com/package/@bramgeron/pi-kagi) | Extensions for the Pi coding agent |  | today |
| [@brianmichel/pi-awake](https://www.npmjs.com/package/@brianmichel/pi-awake) | A pi extension to keep your machine awake when the agent is running |  | 14d ago |
| [@bugabinga/pi-ext-lucifiber](https://www.npmjs.com/package/@bugabinga/pi-ext-lucifiber) | Lucifiber Pi package bundle. |  | 5d ago |
| [@bumpyclock/pi-tasque](https://www.npmjs.com/package/@bumpyclock/pi-tasque) | Pi extension package for Tasque durable tasks plus in-session todos. |  | 9d ago |
| [@burneikis/pi-nolo](https://www.npmjs.com/package/@burneikis/pi-nolo) | no yolo for pi-coding-agent |  | 18d ago |
| [@burneikis/pi-plan](https://www.npmjs.com/package/@burneikis/pi-plan) | plan mode for pi-coding-agent |  | 2mo ago |
| [@burneikis/pi-vim](https://www.npmjs.com/package/@burneikis/pi-vim) | vim mode for pi-coding-agent |  | ~1mo ago |
| [@byteowlz/pi-auto-rename](https://www.npmjs.com/package/@byteowlz/pi-auto-rename) | extensions for pi-agent |  | 3d ago |
| [@capyup/pi-warp](https://www.npmjs.com/package/@capyup/pi-warp) | Warp terminal integration for Pi — tab status, spinner, and rich session notifications via the warp://cli-agent protocol |  | 17d ago |
| [@casualjim/pi-agentmemory](https://www.npmjs.com/package/@casualjim/pi-agentmemory) | Persistent memory for pi — captures tool usage, sessions, and context via lifecycle hooks, powered by agentmemory |  | 22d ago |
| [@cegersdo/pi-ptc](https://www.npmjs.com/package/@cegersdo/pi-ptc) | Programmatic Tool Calling for the pi-coding-agent |  | 3mo ago |
| [@christopherbecker/pi-kagi-api](https://www.npmjs.com/package/@christopherbecker/pi-kagi-api) | Pi extension exposing Kagi Search and Extract API tools. |  | 2d ago |
| [@code-fixer-23/nu-bash](https://www.npmjs.com/package/@code-fixer-23/nu-bash) | Pi extension that runs bash and user_bash through Nushell. |  | 28d ago |
| [@codexstar/pi-agent-teams](https://www.npmjs.com/package/@codexstar/pi-agent-teams) | Claude Code agent teams style workflow for Pi. |  | 2mo ago |
| [@codexstar/pi-listen](https://www.npmjs.com/package/@codexstar/pi-listen) | Hold-to-talk voice input for Pi CLI — Deepgram streaming STT with live transcription, voice commands, and cross-platform hold detection |  | 24d ago |
| [@counterposition/pi-web-search](https://www.npmjs.com/package/@counterposition/pi-web-search) | Skills, extensions, and packages for the Pi coding agent |  | 8d ago |
| [@danchamorro/pi-agent-modes](https://www.npmjs.com/package/@danchamorro/pi-agent-modes) | A collection of extensions and tools for the Pi coding agent |  | today |
| [@davecodes/pi-routines](https://www.npmjs.com/package/@davecodes/pi-routines) | A pi extension that gives your agent scheduled and event-driven routines |  | 5d ago |
| [@deevus/pi-wayfinder](https://www.npmjs.com/package/@deevus/pi-wayfinder) | Structure-aware code navigation and anchor-stable editing tools for pi agents |  | 5d ago |
| [@demigodmode/pi-web-agent](https://www.npmjs.com/package/@demigodmode/pi-web-agent) | Reliable web tools for Pi: search for sources, fetch over HTTP, and use headless browsing only when explicitly requested. |  | today |
| [@dev-vortex/pi-muninn](https://www.npmjs.com/package/@dev-vortex/pi-muninn) | Pi Muninn: project-aware memory extension architecture built on top of pi-mempalace. |  | today |
| [@diegopetrucci/pi-extensions](https://www.npmjs.com/package/@diegopetrucci/pi-extensions) | A collection of pi extensions I made |  | 2d ago |
| [@dkmnx/pi-clarify](https://www.npmjs.com/package/@dkmnx/pi-clarify) | Prompt clarification extension for pi coding agent. |  | 18d ago |
| [@dustinbyrne/kb](https://www.npmjs.com/package/@dustinbyrne/kb) | pi extension for agentic development - kanban style |  | ~1mo ago |
| [@edlsh/pi-web-tools](https://www.npmjs.com/package/@edlsh/pi-web-tools) | Multi-provider web search, extract, research, and code-search tools for Pi coding agent |  | ~1mo ago |
| [@eko24ive/pi-ask](https://www.npmjs.com/package/@eko24ive/pi-ask) | Interactive clarification flows for Pi coding agent |  | 3d ago |
| [@eliemessiecode/pi-mcp](https://www.npmjs.com/package/@eliemessiecode/pi-mcp) | pi-mcp is a Pi coding agent extension that allows connecting to MCP (Model Context Protocol) HTTP servers. It auto-discovers tools from MCP servers and registers them as native Pi tools. Features: Con |  | 2mo ago |
| [@ersintarhan/pi-explicit-honcho-memory](https://www.npmjs.com/package/@ersintarhan/pi-explicit-honcho-memory) | Explicit-load Honcho memory extension for pi coding agent |  | 7d ago |
| [@evolvehq/docflow](https://www.npmjs.com/package/@evolvehq/docflow) | ADR-driven documentation workflow: scaffold an Architecture Decision Record (ADR) catalogue, a plan/ queue, and AGENTS.md conventions into any repo, then author, queue, ship, and audit ADRs with lifec |  | 3d ago |
| [@fadouse/pi-permission](https://www.npmjs.com/package/@fadouse/pi-permission) | Native permission and sandbox extension for pi. |  | 7d ago |
| [@felipefontoura/pi-skill-model-handoff](https://www.npmjs.com/package/@felipefontoura/pi-skill-model-handoff) | Pi extension that switches model/thinking from skill frontmatter. |  | 11d ago |
| [@ferologics/pi-extensions](https://www.npmjs.com/package/@ferologics/pi-extensions) | Custom pi-coding-agent extensions |  | ~1mo ago |
| [@fiale-plus/pi-rogue-advisor](https://www.npmjs.com/package/@fiale-plus/pi-rogue-advisor) | PiRogue advisor-first Pi extension repo. Only the advisor package is public right now. |  | today |
| [@firstpick/pi-extension-hacker-news](https://www.npmjs.com/package/@firstpick/pi-extension-hacker-news) | Hacker News tools and commands for Pi using the official Firebase API. |  | 12d ago |
| [@firstpick/pi-prompts-agent-memory](https://www.npmjs.com/package/@firstpick/pi-prompts-agent-memory) | Reusable Pi prompt templates for maintaining durable agent memory. |  | 2d ago |
| [@firstpick/pi-prompts-code-workflows](https://www.npmjs.com/package/@firstpick/pi-prompts-code-workflows) | Reusable Pi prompt templates for code review, bug fixing, issue analysis, and incident triage. |  | 2d ago |
| [@firstpick/pi-prompts-git-pr](https://www.npmjs.com/package/@firstpick/pi-prompts-git-pr) | Reusable Pi prompt templates for commits, pull requests, and PR review workflows. |  | 2d ago |
| [@firstpick/pi-prompts-release-docs](https://www.npmjs.com/package/@firstpick/pi-prompts-release-docs) | Reusable Pi prompt templates for release notes, announcements, README updates, and wiki updates. |  | 2d ago |
| [@firstpick/pi-themes-bundle](https://www.npmjs.com/package/@firstpick/pi-themes-bundle) | Firstpick's custom Pi coding agent themes. |  | 5d ago |
| [@fitchmultz/pi-ephemeral](https://www.npmjs.com/package/@fitchmultz/pi-ephemeral) | Pi extension for temporary unsaved conversations. Toggle ephemeral mode on/off, session is deleted on exit. |  | ~1mo ago |
| [@fitchmultz/pi-stash](https://www.npmjs.com/package/@fitchmultz/pi-stash) | A pi extension for stashing draft messages and restoring them later. |  | yesterday |
| [@fractary/pi-claude-code](https://www.npmjs.com/package/@fractary/pi-claude-code) | Pi.dev extensions to allow it to run commands, agents and skills designed to use Claude Code tools. |  | ~1mo ago |
| [@gabai/pi-gab-ai](https://www.npmjs.com/package/@gabai/pi-gab-ai) | Gab AI model provider and media tools package for Pi. |  | 7d ago |
| [@galangryandana/pi-galang-setup](https://www.npmjs.com/package/@galangryandana/pi-galang-setup) | One-shot Pi agent setup with Perplexity MCP and custom configuration |  | 5d ago |
| [@gaodes/pi-primecodex-core](https://www.npmjs.com/package/@gaodes/pi-primecodex-core) | NoxPrime infrastructure utilities for PrimeCodex — settings engine, types, validators, scaffold templates, and shared constants. Zero Pi runtime dependencies. |  | 5d ago |
| [@gaodes/pure-dev-kit](https://www.npmjs.com/package/@gaodes/pure-dev-kit) | Personal extensions, themes, and configuration for the Pi coding agent |  | 23d ago |
| [@geminixiang/pi-simplify](https://www.npmjs.com/package/@geminixiang/pi-simplify) | /simplify - code reuse, quality, and efficiency review for pi coding agent |  | today |
| [@genegulanesjr/lapis](https://www.npmjs.com/package/@genegulanesjr/lapis) | 💎 LaPis — Persistent memory for the Pi coding agent. One SQLite DB, zero cloud, zero API keys. |  | today |
| [@giovani-junior-dev/pi-coms-local](https://www.npmjs.com/package/@giovani-junior-dev/pi-coms-local) | Pi-to-Pi local bidirectional communication package for Pi Coding Agent: run planner/coder peer agents on the same machine. |  | 3d ago |
| [@giuseppecrj/pi-engineering-workflow](https://www.npmjs.com/package/@giuseppecrj/pi-engineering-workflow) | Personal Pi engineering workflow package with in-repo pi-goals, pi-review, Skill Foundry skills, workflow commands, prompts, and reusable goal templates. |  | 7d ago |
| [@gonrocca/skillautoforge-pi](https://www.npmjs.com/package/@gonrocca/skillautoforge-pi) | skillautoforge-pi — an installable pi (pi.dev) package that adds the skill auto-learning loop pi is missing. pi already stores, surfaces (progressive disclosure), and loads skills; this package adds t |  | 5d ago |
| [@gordonb/pi-memory-blocks](https://www.npmjs.com/package/@gordonb/pi-memory-blocks) | Letta-style memory blocks for Pi coding agent |  | 3mo ago |
| [@gordonb/pi-notational](https://www.npmjs.com/package/@gordonb/pi-notational) | Notational Velocity for Pi coding agent |  | 3mo ago |
| [@gotgenes/pi-anthropic-auth](https://www.npmjs.com/package/@gotgenes/pi-anthropic-auth) | Pi extension package for Anthropic OAuth compatibility |  | yesterday |
| [@gotgenes/pi-github-tools](https://www.npmjs.com/package/@gotgenes/pi-github-tools) | Moved to gotgenes/pi-packages |  | 10d ago |
| [@gregjohnso/pi-imgview](https://www.npmjs.com/package/@gregjohnso/pi-imgview) | pi extension to display images inline in the terminal (iTerm2/Kitty/WezTerm/Ghostty) or open them in the system browser |  | 20d ago |
| [@gregjohnso/pi-monitor](https://www.npmjs.com/package/@gregjohnso/pi-monitor) | Background shell command runner for the pi coding agent — each stdout line becomes a TUI event and enters the LLM's next turn as context. |  | 20d ago |
| [@grwnd/pi-governance](https://www.npmjs.com/package/@grwnd/pi-governance) | Governance, RBAC, audit, DLP, and human-in-the-loop for Pi-based coding agents. |  | ~1mo ago |
| [@guwidoe/pi-prompt-suggester](https://www.npmjs.com/package/@guwidoe/pi-prompt-suggester) | A pi extension that suggests the user's likely next prompt. |  | 17d ago |
| [@h4rvey-g/context-mode](https://www.npmjs.com/package/@h4rvey-g/context-mode) | Context window optimization for AI coding agents. Sandboxes tool output, 98% reduction. 15 platforms |  | today |
| [@harms-haus/pi-cwd](https://www.npmjs.com/package/@harms-haus/pi-cwd) | pi-coding-agent extension: change working directory with /cwd |  | today |
| [@harms-haus/pi-processes](https://www.npmjs.com/package/@harms-haus/pi-processes) | Process definitions and utilities for the pi framework |  | today |
| [@harms-haus/pi-subagents](https://www.npmjs.com/package/@harms-haus/pi-subagents) | harms-haus subagents extension for pi-coding-agent |  | today |
| [@harms-haus/pi-tasks](https://www.npmjs.com/package/@harms-haus/pi-tasks) | pi-coding-agent extension: phased task workflow with dependency tracking and strict status gating |  | today |
| [@harms-haus/pi-til-done](https://www.npmjs.com/package/@harms-haus/pi-til-done) | pi-coding-agent extension: todo list that iterates until all tasks are done |  | today |
| [@harms-haus/pi-workflows](https://www.npmjs.com/package/@harms-haus/pi-workflows) | Deterministic workflow phases for pi-coding-agent |  | today |
| [@harms-haus/pi-worktrees](https://www.npmjs.com/package/@harms-haus/pi-worktrees) | pi-coding-agent extension: manage git worktrees with /wt-create, /wt-switch, /wt-merge, /wt-cleanup |  | today |
| [@harms-haus/pi-zai-usage](https://www.npmjs.com/package/@harms-haus/pi-zai-usage) | Z.ai API quota monitor extension for pi-coding-agent |  | today |
| [@hdkiller/pi-langfuse](https://www.npmjs.com/package/@hdkiller/pi-langfuse) | Langfuse observability extension for Pi coding agent with richer prompt, turn, tool, and generation tracing |  | 29d ago |
| [@howaboua/pi-smart-btw](https://www.npmjs.com/package/@howaboua/pi-smart-btw) | Async side-session questions for Pi with explicit injection into the main chat. |  | 5d ago |
| [@hsingjui/pi-hooks](https://www.npmjs.com/package/@hsingjui/pi-hooks) | Claude Code-compatible command hooks for the Pi coding agent |  | 18d ago |
| [@ifi/pi-plan](https://www.npmjs.com/package/@ifi/pi-plan) | One-click setup for pi-coding-agent — extensions, themes, prompts, skills, and ant-colony swarm. Like oh-my-zsh for pi. |  | 6d ago |
| [@ikuradon/pi-guardian](https://www.npmjs.com/package/@ikuradon/pi-guardian) | Codex-style sandbox boundary guardian gate for pi-coding-agent. |  | 6d ago |
| [@imsus/pi-extension-minimax-coding-plan-mcp](https://www.npmjs.com/package/@imsus/pi-extension-minimax-coding-plan-mcp) | MiniMax MCP extension for pi coding agent - provides web_search and understand_image tools with built-in skills |  | 13d ago |
| [@injaneity/pi-computer-use](https://www.npmjs.com/package/@injaneity/pi-computer-use) | control your applications using pi-coding-agent. fully invisible. |  | 4d ago |
| [@isaacraja/pi-vertex-claude](https://www.npmjs.com/package/@isaacraja/pi-vertex-claude) | Google Vertex AI Claude provider for Pi coding agent |  | 6d ago |
| [@jademind/pi-telemetry](https://www.npmjs.com/package/@jademind/pi-telemetry) | Comprehensive consumable telemetry data from all pi agents |  | 3mo ago |
| [@jaraxxxx/pi-extensions](https://www.npmjs.com/package/@jaraxxxx/pi-extensions) | A comprehensive collection of extension packages for Pi the coding agent — token guard, system context, tool profiler, project detector, dirty guard, permission gate, prompt customizer, auto commit, t |  | 3d ago |
| [@jarcelao/pi-exa-api](https://www.npmjs.com/package/@jarcelao/pi-exa-api) | Web search and content fetching for pi via the Exa API |  | 3d ago |
| [@javimolina/pi-palette](https://www.npmjs.com/package/@javimolina/pi-palette) | Pi package that adds a searchable slash-command palette for commands, prompt templates, and skills. |  | 3mo ago |
| [@javimolina/pi-rg](https://www.npmjs.com/package/@javimolina/pi-rg) | Pi package that adds a /r command with cached ripgrep-backed file completions |  | 3mo ago |
| [@jeonghyeon.net/pi-tasks](https://www.npmjs.com/package/@jeonghyeon.net/pi-tasks) | A pi extension that brings Claude Code-style task tracking and coordination to pi. Track multi-step work with structured tasks, dependency management, and a persistent visual widget. |  | 21d ago |
| [@jerryan/pi-sanity](https://www.npmjs.com/package/@jerryan/pi-sanity) | Soft guardrails for the pi coding agent |  | 4d ago |
| [@jerryan/pi-task-tree](https://www.npmjs.com/package/@jerryan/pi-task-tree) | A tree-structured task manager extension for the pi coding agent |  | 5d ago |
| [@jessenguyen22/pi-tool-router](https://www.npmjs.com/package/@jessenguyen22/pi-tool-router) | Intelligent tool routing extension for pi coding agent - automatically selects the best tool stack for each task |  | 29d ago |
| [@jmcombs/pi-tavily-search](https://www.npmjs.com/package/@jmcombs/pi-tavily-search) | A monorepo of high-quality extensions for the Pi coding agent. |  | today |
| [@joemccann/pi-exa](https://www.npmjs.com/package/@joemccann/pi-exa) | Exa AI semantic search and similarity tools for pi coding agent |  | 2mo ago |
| [@john95ac/pi-sound-notify-custom](https://www.npmjs.com/package/@john95ac/pi-sound-notify-custom) | Sound notifications for Pi Coding Agent — play .wav on events with random/sequential modes |  | yesterday |
| [@jonghyun/pi-web-tools](https://www.npmjs.com/package/@jonghyun/pi-web-tools) | Pi extension providing web search, page scraping, screenshot, and content extraction tools with auto-managed Docker services. |  | 7d ago |
| [@jstxn/agentdir-pi](https://www.npmjs.com/package/@jstxn/agentdir-pi) | Pi package for AgentDir local-first coding-agent memory and evidence capture. |  | today |
| [@juanibiapina/pi-extension-settings](https://www.npmjs.com/package/@juanibiapina/pi-extension-settings) | Shared utilities and extensions for pi coding agent |  | 4d ago |
| [@juanibiapina/pi-files](https://www.npmjs.com/package/@juanibiapina/pi-files) | Pi extension that tracks files read/written/edited by the agent and lets you open them in your editor |  | 2mo ago |
| [@juanibiapina/pi-plan](https://www.npmjs.com/package/@juanibiapina/pi-plan) | Pi extension for plan mode - read-only exploration and analysis |  | 3mo ago |
| [@juanibiapina/pi-powerbar](https://www.npmjs.com/package/@juanibiapina/pi-powerbar) | Pi extension that renders a persistent powerline status bar with left/right segments updated via events |  | 5d ago |
| [@juanibiapina/pi-usage](https://www.npmjs.com/package/@juanibiapina/pi-usage) | Pi extension that fetches Anthropic subscription usage. Simplified fork of @marckrenn/pi-sub-core. |  | 5d ago |
| [@kky42/pi-codex-tools](https://www.npmjs.com/package/@kky42/pi-codex-tools) | Pi extension adding ChatGPT/Codex OAuth-backed web search, image generation, and web fetch tools. |  | 21d ago |
| [@kky42/pi-hermes-goal](https://www.npmjs.com/package/@kky42/pi-hermes-goal) | Pi extension providing Hermes-style persistent /goal loop with judge-model evaluation, subgoals, and turn budget enforcement |  | yesterday |
| [@klutometis/pi-provider-vertex-anthropic](https://www.npmjs.com/package/@klutometis/pi-provider-vertex-anthropic) | Pi agent extension for Claude models via Google Cloud Vertex AI |  | yesterday |
| [@kmiyh/pi-codex-plan-limits](https://www.npmjs.com/package/@kmiyh/pi-codex-plan-limits) | Pi extension that shows live Codex plan usage: remaining 5h and weekly limits, reset times, and cached fallback snapshots |  | ~1mo ago |
| [@kmiyh/pi-extensions-menu](https://www.npmjs.com/package/@kmiyh/pi-extensions-menu) | Pi extension that adds a dedicated /extensions menu for browsing, enabling, disabling, and updating installed extensions |  | ~1mo ago |
| [@kmiyh/pi-full-text-paste](https://www.npmjs.com/package/@kmiyh/pi-full-text-paste) | Pi extension that keeps pasted text as full editor text |  | ~1mo ago |
| [@kmiyh/pi-skills-menu](https://www.npmjs.com/package/@kmiyh/pi-skills-menu) | Pi extension that moves skills into a dedicated /skills menu with browsing, preview, editing, enabling/disabling and AI-assisted creation |  | ~1mo ago |
| [@kmiyh/pi-undo-redo](https://www.npmjs.com/package/@kmiyh/pi-undo-redo) | Pi extension that adds branch-aware /undo and /redo for agent-driven file changes |  | ~1mo ago |
| [@lanquarden/pi-dev-worktrees](https://www.npmjs.com/package/@lanquarden/pi-dev-worktrees) | Pi extension for isolated branch workspaces — git worktrees via wtp and optional devcontainer targeting |  | yesterday |
| [@latent-variable/pi-auto-continue](https://www.npmjs.com/package/@latent-variable/pi-auto-continue) | Pi extension: auto-send a continue message after each agent turn, so local agents can run autoresearch-style overnight loops without babysitting. |  | ~1mo ago |
| [@latent-variable/pi-terminal-bench](https://www.npmjs.com/package/@latent-variable/pi-terminal-bench) | Self-contained benchmark suite for Pi. 60 coding tasks across 6 categories — watch the agent work in real time. No Docker, no external dependencies. |  | ~1mo ago |
| [@latentminds/pi-quotas](https://www.npmjs.com/package/@latentminds/pi-quotas) | Quota monitoring for the Pi coding agent. Anthropic, Codex & Copilot and OpenRouter usage at a glance |  | 12d ago |
| [@latitude-data/pi-telemetry](https://www.npmjs.com/package/@latitude-data/pi-telemetry) | Pi coding agent extension that streams sessions to Latitude as OTLP traces |  | 4d ago |
| [@lazykern/pi-persist-model](https://www.npmjs.com/package/@lazykern/pi-persist-model) | Persist model & reasoning settings per session, workspace, or globally |  | 4d ago |
| [@leing2021/super-pi](https://www.npmjs.com/package/@leing2021/super-pi) | A Pi-native iterative development workflow package with 8 skills and 14 tools for structured brainstorm → plan → work → review → learn cycles. |  | 2d ago |
| [@lincoln504/pi-research](https://www.npmjs.com/package/@lincoln504/pi-research) | Web research for pi witth smart and safe tooling + agent system |  | today |
| [@linioi/pi-btw](https://www.npmjs.com/package/@linioi/pi-btw) | Side-question extension for pi. Ask one-off questions while the agent is working — without derailing the main session or polluting future context. |  | ~1mo ago |
| [@llblab/pi-auto-tools](https://www.npmjs.com/package/@llblab/pi-auto-tools) | Persistent script-backed tools for pi |  | 27d ago |
| [@lojacobs/pi-roles](https://www.npmjs.com/package/@lojacobs/pi-roles) | Role-based session configuration for the pi coding agent |  | 20d ago |
| [@luxusai/pi-hindsight](https://www.npmjs.com/package/@luxusai/pi-hindsight) | memory for the people of pi (with help of hindsight) |  | yesterday |
| [@malinamnam/pi-phone](https://www.npmjs.com/package/@malinamnam/pi-phone) | A phone-first remote UI for Pi that lets you drive a real Pi session from your phone. pi-phone starts a small local web server, launches a dedicated pi --mode rpc subprocess in your current project, a |  | 2mo ago |
| [@marcfargas/pi-heartbeat](https://www.npmjs.com/package/@marcfargas/pi-heartbeat) | Non-blocking timers and heartbeats for pi agents — stop using sleep |  | 3mo ago |
| [@mario-gc/pi-context7](https://www.npmjs.com/package/@mario-gc/pi-context7) | Context7 integration for pi coding agent. |  | 20d ago |
| [@matyah00/openpi](https://www.npmjs.com/package/@matyah00/openpi) | Comprehensive, high-performance, and safety-hardened Pi-native multi-agent orchestration package, featuring advanced workflows, damage-control rules, and developer tooling. |  | yesterday |
| [@mazli/pi-ask-user-question](https://www.npmjs.com/package/@mazli/pi-ask-user-question) | Claude Code-style AskUserQuestion tool for pi agent. |  | 7d ago |
| [@megasuite/pi-moonshot](https://www.npmjs.com/package/@megasuite/pi-moonshot) | Pi extension adding Moonshot AI provider with Kimi K2.6, K2.5 and other models |  | yesterday |
| [@mhingston5/pi-cove-extension](https://www.npmjs.com/package/@mhingston5/pi-cove-extension) | Cove runtime integration for pi agents |  | 6d ago |
| [@miadisabelle/mia-presence](https://www.npmjs.com/package/@miadisabelle/mia-presence) | Mia presence extensions for Pi: echo, ceremony, interception, and structural tools |  | 7d ago |
| [@mjakl/pi-dark-or-light](https://www.npmjs.com/package/@mjakl/pi-dark-or-light) | A pi extension to improve auto detect of dark- or light-mode and to switch the pi theme automatically. |  | 3d ago |
| [@mjakl/pi-kagi-api](https://www.npmjs.com/package/@mjakl/pi-kagi-api) | Official Kagi API tools for Pi coding agent |  | 2d ago |
| [@mjakl/pi-subagent](https://www.npmjs.com/package/@mjakl/pi-subagent) | A lightweight subagent extension for the pi coding agent |  | 3d ago |
| [@mjfuertesf/pi-ask-pi](https://www.npmjs.com/package/@mjfuertesf/pi-ask-pi) | AskPi subagent extension for Pi. |  | today |
| [@mjfuertesf/pi-dumb-meter](https://www.npmjs.com/package/@mjfuertesf/pi-dumb-meter) | Context-pressure footer meter extension for Pi. |  | today |
| [@mkuziuk/pi-agents](https://www.npmjs.com/package/@mkuziuk/pi-agents) | Pi subagents extension with /agents dashboard visibility |  | 6d ago |
| [@modemdev/glance-pi](https://www.npmjs.com/package/@modemdev/glance-pi) | Agent plugins for glance.sh — temporary image sharing for coding agents |  | 4d ago |
| [@mohammedhammoud/pi-local-model-options](https://www.npmjs.com/package/@mohammedhammoud/pi-local-model-options) | Pi extension for spawning isolated worker processes. |  | today |
| [@momomemory/pi-momo](https://www.npmjs.com/package/@momomemory/pi-momo) | Pi plugin for Momo - Persistent memory integration for Pi coding agent |  | 3mo ago |
| [@morenol/pi-container-use](https://www.npmjs.com/package/@morenol/pi-container-use) | A pi package that routes built-in coding tools through container-use environments. |  | today |
| [@mporenta/pi-trading-quant-chain](https://www.npmjs.com/package/@mporenta/pi-trading-quant-chain) | Pi extension for read-only Snowflake queries via the team `claude` connection, with a specialized snowflake-analyst agent. |  | 5d ago |
| [@mrclrchtr/supi-lsp](https://www.npmjs.com/package/@mrclrchtr/supi-lsp) | SuPi (Super Pi) is my curated extension stack for PI, I use in every project, shared in case they help you too. Bundling LSP, TreeSitter, Ask-User-Tool, context monitoring, and practical small extras. |  | today |
| [@mrexodia/kilo-pi-provider](https://www.npmjs.com/package/@mrexodia/kilo-pi-provider) | Kilo provider for the Pi coding agent. |  | 29d ago |
| [@narumitw/pi-firecrawl](https://www.npmjs.com/package/@narumitw/pi-firecrawl) | Native Pi coding agent extensions for Chrome DevTools, Firecrawl web scraping, Python LSP with ty and Ruff, goal mode, retries, statusline, and caffeinate automation. |  | yesterday |
| [@neonn0d/twin](https://www.npmjs.com/package/@neonn0d/twin) | MCP server for AI memory in an Obsidian vault |  | 19d ago |
| [@netandreus/pi-auto](https://www.npmjs.com/package/@netandreus/pi-auto) | pi-auto is a Pi package that provides the pi-auto MCP server and a Skill for pi-coding-agent: usage data from @ccusage/pi and tools to switch the active provider by strategy — load-balancing (equalize |  | 3mo ago |
| [@netandreus/pi-cursor-provider](https://www.npmjs.com/package/@netandreus/pi-cursor-provider) | Pi Coding Agent custom provider that routes requests through the Cursor Agent CLI — use your Cursor subscription models (Claude, GPT, Gemini, Grok…) inside Pi. |  | 3mo ago |
| [@normful/picadillo](https://www.npmjs.com/package/@normful/picadillo) | Personal pi coding agent commands, skills, extensions |  | 3mo ago |
| [@nukman-salim/pi-obs-controls](https://www.npmjs.com/package/@nukman-salim/pi-obs-controls) | Control OBS Studio via WebSocket from Pi coding agent |  | 5d ago |
| [@oaalto-kodanbce/pi-ignore](https://www.npmjs.com/package/@oaalto-kodanbce/pi-ignore) | Pi extension: .piignore negation rules make selected gitignored files discoverable to the agent |  | today |
| [@observal/pi-insights](https://www.npmjs.com/package/@observal/pi-insights) | Personal usage analytics for Pi coding agent. Temporal-aware insights, context-aware suggestions, model efficiency analysis. |  | today |
| [@ogulcancelik/pi-flicker](https://www.npmjs.com/package/@ogulcancelik/pi-flicker) | Extensions for pi, the terminal-based coding agent |  | 6d ago |
| [@omardev_11/pi-pulse-border](https://www.npmjs.com/package/@omardev_11/pi-pulse-border) | Animates a symmetric-gradient comet along the pi editor border with breathing speed/size and per-cycle color swap. |  | 4d ago |
| [@omardev_11/pi-stop-notify](https://www.npmjs.com/package/@omardev_11/pi-stop-notify) | Notifies (sound + native + terminal OSC) when the pi agent stops — either finished or awaiting input. |  | 4d ago |
| [@onenote/pi-vim-editor](https://www.npmjs.com/package/@onenote/pi-vim-editor) | Vim-style modal editor extension for pi |  | ~1mo ago |
| [@p8n.ai/pi-listens](https://www.npmjs.com/package/@p8n.ai/pi-listens) | Speech-first Pi package powered by Sarvam AI |  | 14d ago |
| [@p8n.ai/pi-remembers](https://www.npmjs.com/package/@p8n.ai/pi-remembers) | Persistent memory and project search for the Pi coding agent, powered by Cloudflare AI Search. The North Remembers. 🧠 |  | 22d ago |
| [@panzenbaby/pi-secure-extension](https://www.npmjs.com/package/@panzenbaby/pi-secure-extension) | An extension for pi coding agent that creates a security rating for extensions before installation or updates. |  | ~1mo ago |
| [@parcom/tts](https://www.npmjs.com/package/@parcom/tts) | Provider-neutral TypeScript text-to-speech library for Node, browsers via proxy, and pi extensions |  | 29d ago |
| [@patimweb/pi-team](https://www.npmjs.com/package/@patimweb/pi-team) | Team agent orchestration extension for pi coding agent. Role-based profiles, shared memory, sprint phases, and structured handoffs between agents. |  | 12d ago |
| [@petechu/pi-ai-commit](https://www.npmjs.com/package/@petechu/pi-ai-commit) | Generate Conventional Commit messages from staged changes for pi |  | 4d ago |
| [@petechu/pi-code-wiki](https://www.npmjs.com/package/@petechu/pi-code-wiki) | Generate and maintain a persistent, compounding codebase wiki inside your repository |  | yesterday |
| [@petechu/pi-extension-toggle](https://www.npmjs.com/package/@petechu/pi-extension-toggle) | Enable or disable installed Pi extensions from inside Pi |  | 4d ago |
| [@petechu/pi-package-usage](https://www.npmjs.com/package/@petechu/pi-package-usage) | Passively collected usage statistics for installed Pi packages |  | 3d ago |
| [@petechu/pi-rewrite](https://www.npmjs.com/package/@petechu/pi-rewrite) | Rewrite prompt text into a clearer coding-agent prompt before sending |  | today |
| [@pgilad/pi-vertex-anthropic](https://www.npmjs.com/package/@pgilad/pi-vertex-anthropic) | Pi extension: Claude on Google Cloud Vertex AI via ADC. Uses the official @anthropic-ai/vertex-sdk for real Application Default Credentials (gcloud user creds, service account JSON, GCE/GKE metadata s |  | today |
| [@pi-agents/loop](https://www.npmjs.com/package/@pi-agents/loop) | Recurring prompt scheduling and cron job management for pi-coding-agent |  | ~1mo ago |
| [@pi-plugins/webfetch](https://www.npmjs.com/package/@pi-plugins/webfetch) | Exit command extension for pi-agent. |  | today |
| [@pi-vault/pi-custom-providers](https://www.npmjs.com/package/@pi-vault/pi-custom-providers) | Pi extension for adding third-party model providers |  | today |
| [@psg2/pi-costs](https://www.npmjs.com/package/@psg2/pi-costs) | Analyze cost and token usage from pi coding agent sessions |  | 2mo ago |
| [@psg2/pi-transcript](https://www.npmjs.com/package/@psg2/pi-transcript) | Convert pi coding agent sessions to clean, mobile-friendly HTML transcripts |  | 2mo ago |
| [@rahulmutt/pi-ralph](https://www.npmjs.com/package/@rahulmutt/pi-ralph) | Minimalist Ralph loop for semi-autonomous AI agent orchestration with the Pi coding agent. |  | ~1mo ago |
| [@rajeshkrishnamurthy/pi-workflow-team](https://www.npmjs.com/package/@rajeshkrishnamurthy/pi-workflow-team) | Shared Pi workflow bundle for todos/routing/execution lanes |  | yesterday |
| [@random-long-int/pi-context](https://www.npmjs.com/package/@random-long-int/pi-context) | Pi extension that adds a /context modal for context budget breakdowns. |  | 5d ago |
| [@random-long-int/pi-tavily](https://www.npmjs.com/package/@random-long-int/pi-tavily) | Tavily web_search and web_extract tools for pi |  | 6d ago |
| [@ravan08/pi-langfuse](https://www.npmjs.com/package/@ravan08/pi-langfuse) | Langfuse observability extension for Pi coding agent. Sends traces to Langfuse for monitoring tokens, costs, model, and tool calls. Install: pi install npm:@ravan08/pi-langfuse |  | 27d ago |
| [@rbwsam/pi-exa](https://www.npmjs.com/package/@rbwsam/pi-exa) | Exa search for Pi Coding Agent |  | ~1mo ago |
| [@ricoyudog/pi-goal-hermes](https://www.npmjs.com/package/@ricoyudog/pi-goal-hermes) | Goal-driven autonomous continuation for Pi coding agent - set a goal and let the agent work until done |  | 3d ago |
| [@robhowley/pi-structured-return](https://www.npmjs.com/package/@robhowley/pi-structured-return) | Pi extension that turns noisy CLI output into compact structured results - fewer tokens, full logs preserved. |  | 24d ago |
| [@robzolkos/pi-nocchio](https://www.npmjs.com/package/@robzolkos/pi-nocchio) | A tiny Pi package that adds a CLI flag for printing Pi's assembled system prompt. |  | 18d ago |
| [@romansix/pi-tmux](https://www.npmjs.com/package/@romansix/pi-tmux) | Pi coding agent extension: tmux session management per project |  | ~1mo ago |
| [@royalrat-pack/pi-extension-nvidia-build-provider](https://www.npmjs.com/package/@royalrat-pack/pi-extension-nvidia-build-provider) | Pi extension: NVIDIA Build API provider with /login + /model support |  | 29d ago |
| [@s1m0n38/pi-voice](https://www.npmjs.com/package/@s1m0n38/pi-voice) | Give voice to your Pi agent 🗣️ |  | 18d ago |
| [@saber7ooth/pi-archon](https://www.npmjs.com/package/@saber7ooth/pi-archon) | Archon workflow extension package for Pi coding agent |  | 21d ago |
| [@samfp/pi-essentials](https://www.npmjs.com/package/@samfp/pi-essentials) | Essential extensions for pi — auto session naming, compact header, clipboard images, image pruning, markdown viewer, screenshots, and subagents |  | 10d ago |
| [@samfp/pi-lesson-extractor](https://www.npmjs.com/package/@samfp/pi-lesson-extractor) | Pi extension that extracts reusable problem-solving patterns from session transcripts |  | 11d ago |
| [@samfp/pi-memory](https://www.npmjs.com/package/@samfp/pi-memory) | Persistent memory for pi — learns corrections, preferences, and patterns from sessions |  | 10d ago |
| [@samfp/pi-steering-hooks](https://www.npmjs.com/package/@samfp/pi-steering-hooks) | Deterministic tool-call guardrails for pi — enforce rules with before-tool hooks instead of prompts |  | 11d ago |
| [@sarthakxv/pi-goal](https://www.npmjs.com/package/@sarthakxv/pi-goal) | Durable goals for Pi Agent |  | 13d ago |
| [@schultzp2020/pi-cursor](https://www.npmjs.com/package/@schultzp2020/pi-cursor) | Extensions for the Pi coding agent. |  | 18d ago |
| [@scnewma/pi-codex-rate-limits](https://www.npmjs.com/package/@scnewma/pi-codex-rate-limits) | Pi extension that shows OpenAI Codex rate limit usage via /codex-rate-limits |  | 7d ago |
| [@sean_pedersen/pi-codegraph](https://www.npmjs.com/package/@sean_pedersen/pi-codegraph) | Pi coding agent extension for codegraph (tree-sitter knowledge graph MCP sidecar) |  | today |
| [@sherif-fanous/pi-rtk](https://www.npmjs.com/package/@sherif-fanous/pi-rtk) | Pi coding agent extension that routes bash commands through rtk for LLM token savings. |  | 12d ago |
| [@sherif-fanous/pi-theme-sync](https://www.npmjs.com/package/@sherif-fanous/pi-theme-sync) | A Pi coding agent extension that automatically switches Pi's theme to match your terminal or operating system appearance. |  | 13d ago |
| [@siddr/pi-tool-display](https://www.npmjs.com/package/@siddr/pi-tool-display) | Extensions for pi coding agent |  | 11d ago |
| [@siesing/pi-shortcuts](https://www.npmjs.com/package/@siesing/pi-shortcuts) | A Pi coding agent extension that adds a searchable keyboard and command shortcuts overlay |  | 7d ago |
| [@sinamtz/pi-mlx-provider](https://www.npmjs.com/package/@sinamtz/pi-mlx-provider) | Pi coding agent extension for local AI inference via Apple MLX on Apple Silicon |  | ~1mo ago |
| [@spences10/pi-child-env](https://www.npmjs.com/package/@spences10/pi-child-env) | Shared safe environment builder for Pi child processes |  | 26d ago |
| [@spences10/pi-telemetry](https://www.npmjs.com/package/@spences10/pi-telemetry) | Composable pi coding agent with MCP, LSP, agent chains, prompt presets, and local eval telemetry |  | today |
| [@steptian/ai-deps-review](https://www.npmjs.com/package/@steptian/ai-deps-review) | AI agent toolchain dependency version checker for Pi. Scans Pi Coding Agent, Claude Code, Codex, Pi Packages and extensions for updates, compares versions, and evaluates update necessity. Trigger: che |  | yesterday |
| [@tanvesh01/pierre-diffs](https://www.npmjs.com/package/@tanvesh01/pierre-diffs) | Pierre-themed inline diff rendering for Pi edit and write tool results. |  | ~1mo ago |
| [@tavily/pi-extension](https://www.npmjs.com/package/@tavily/pi-extension) | Official Tavily extension for the Pi coding agent |  | 6d ago |
| [@teelicht/pi-grepai](https://www.npmjs.com/package/@teelicht/pi-grepai) | Pi agent harness extension that integrates with the grepai code indexer through slash commands and LLM tools. |  | 13d ago |
| [@teelicht/pi-superagents](https://www.npmjs.com/package/@teelicht/pi-superagents) | Pi agent-harness extension to support superpowers workflows using subagents. |  | 4d ago |
| [@testzugang/pi-audit-agents-md](https://www.npmjs.com/package/@testzugang/pi-audit-agents-md) | Pi skill to audit AGENTS.md for clarity and safety rule violations |  | 3d ago |
| [@testzugang/pi-commit](https://www.npmjs.com/package/@testzugang/pi-commit) | Interactive gitmoji-based commit skill with staged review for Pi |  | 3d ago |
| [@testzugang/pi-dependency-audit](https://www.npmjs.com/package/@testzugang/pi-dependency-audit) | Static dependency and supply-chain malware auditing skill for Pi |  | 3d ago |
| [@testzugang/pi-migrate-to-agents-md](https://www.npmjs.com/package/@testzugang/pi-migrate-to-agents-md) | Pi skill to migrate agent instructions from CLAUDE.md to AGENTS.md |  | 3d ago |
| [@testzugang/pi-pr-findings](https://www.npmjs.com/package/@testzugang/pi-pr-findings) | Fetch and group GitHub PR review findings by severity in Pi |  | 3d ago |
| [@that-yolanda/pi-memory-honcho](https://www.npmjs.com/package/@that-yolanda/pi-memory-honcho) | Yolanda's personal collection of Pi extensions |  | 9d ago |
| [@therynamo/pi-agent-time](https://www.npmjs.com/package/@therynamo/pi-agent-time) | Pi extension showing per-turn and cumulative LLM response times in the status bar |  | 3d ago |
| [@therynamo/pi-auto-session-name](https://www.npmjs.com/package/@therynamo/pi-auto-session-name) | Pi extension that auto-generates a short working title for each session based on the conversation |  | 3d ago |
| [@therynamo/pi-changed-files](https://www.npmjs.com/package/@therynamo/pi-changed-files) | Pi extension showing git-changed files in a floating overlay with diff counts |  | 3d ago |
| [@thiago__ss/pi-agent-config](https://www.npmjs.com/package/@thiago__ss/pi-agent-config) | Thiago's shareable Pi agent configuration for Pi |  | ~1mo ago |
| [@timonclaeys/pi-github-skill-installer](https://www.npmjs.com/package/@timonclaeys/pi-github-skill-installer) | A pi extension to install agent skills directly from GitHub repositories. |  | 4d ago |
| [@tintinweb/pi-subagents](https://www.npmjs.com/package/@tintinweb/pi-subagents) | Sub-agents for pi with Claude Code look and feel — parallel execution, live widget, custom agent types, mid-run steering and more ... |  | 11d ago |
| [@tmustier/extending-pi](https://www.npmjs.com/package/@tmustier/extending-pi) | A set of delightful extensions for Pi |  | 12d ago |
| [@tmustier/pi-nes](https://www.npmjs.com/package/@tmustier/pi-nes) | An NES emulator for Pi. Play classic Nintendo games while your agent works. ROMs not included |  | 18d ago |
| [@todu/pi-extensions](https://www.npmjs.com/package/@todu/pi-extensions) | Task manager extensions for the pi agent harness that create UI for handling tasks |  | 18d ago |
| [@tomxprime/planning-with-files](https://www.npmjs.com/package/@tomxprime/planning-with-files) | Manus-style file-based planning for Pi Coding Agent |  | 4d ago |
| [@touchtechclub/pi-acp](https://www.npmjs.com/package/@touchtechclub/pi-acp) | Pi coding-agent extension: per-message undo/redo with shadow-git snapshots. Opencode-inspired. |  | 5d ago |
| [@traylinx/pi-switchai-provider](https://www.npmjs.com/package/@traylinx/pi-switchai-provider) | switchai provider extension for pi coding agent — routes completions through the switchAILocal gateway |  | ~1mo ago |
| [@trycedar/pi-mdiff](https://www.npmjs.com/package/@trycedar/pi-mdiff) | Markdown-aware edit tools for pi coding agent — block-level anchoring and normalized SEARCH matching for prose files |  | 6d ago |
| [@tryinget/pi-editor-registry](https://www.npmjs.com/package/@tryinget/pi-editor-registry) | Monorepo for pi extensions, including the @tryinget/pi-interaction package workspace. |  | 2d ago |
| [@tw93/waza](https://www.npmjs.com/package/@tw93/waza) | Waza engineering skills for Claude Code, Codex, Pi, and compatible coding agents. |  | yesterday |
| [@twogiants/pi-anthropic-vertex](https://www.npmjs.com/package/@twogiants/pi-anthropic-vertex) | Anthropic Claude models on Google Cloud Vertex AI for pi coding agent. |  | yesterday |
| [@unseated7635/pi-roxy-seo](https://www.npmjs.com/package/@unseated7635/pi-roxy-seo) | Roxy SEO: an open-source agent skill and PI extension for SEO, AEO, GEO, AI search visibility, technical audits, structured data, and content strategy. |  | 24d ago |
| [@upstash/context7-pi](https://www.npmjs.com/package/@upstash/context7-pi) | Official Context7 extension for pi.dev — adds resolve-library-id and query-docs tools to the pi coding agent |  | today |
| [@usirin/pi-loop](https://www.npmjs.com/package/@usirin/pi-loop) | Claude Code-style /loop command for pi-coding-agent |  | 7d ago |
| [@vahor/pi-hooks](https://www.npmjs.com/package/@vahor/pi-hooks) | Monorepo with customs pi extensions. |  | 2d ago |
| [@vamsitalupula/pi-run](https://www.npmjs.com/package/@vamsitalupula/pi-run) | This is a Pi extension for Pi extension developers. It enables running Typescript within the Node.js context of the Pi coding agent |  | 12d ago |
| [@verioussmith/pi-openrouter](https://www.npmjs.com/package/@verioussmith/pi-openrouter) | OpenRouter provider extension for Pi Coding Agent - access 20+ LLM models through unified API |  | 4mo ago |
| [@viartemev/pi-caveman](https://www.npmjs.com/package/@viartemev/pi-caveman) | Caveman mode for pi: ultra-compressed responses that save tokens. |  | 2d ago |
| [@victor-software-house/pi-acp](https://www.npmjs.com/package/@victor-software-house/pi-acp) | ACP adapter for pi coding agent |  | 6d ago |
| [@weaxs/stock-analysis-plugin](https://www.npmjs.com/package/@weaxs/stock-analysis-plugin) | Pi Agent extension for stock analysis, screening, and strategy backtesting across A/HK/US markets |  | 3d ago |
| [@weihan28/pi-tavily](https://www.npmjs.com/package/@weihan28/pi-tavily) | Pi extension for Tavily web search, extract, crawl, and map APIs |  | 3d ago |
| [@whonixnetworks/pi-mattermost](https://www.npmjs.com/package/@whonixnetworks/pi-mattermost) | Mattermost bridge for Pi coding agent sessions — control Pi agents via Mattermost slash commands with real-time streaming |  | today |
| [@wissem_hajbi/pi-pomodoro-global](https://www.npmjs.com/package/@wissem_hajbi/pi-pomodoro-global) | Global Pomodoro timer extension for pi coding agent |  | 3d ago |
| [@wissem_hajbi/pi-vaultify](https://www.npmjs.com/package/@wissem_hajbi/pi-vaultify) | Pi extension that turns sessions into linked Obsidian learning notes |  | 3d ago |
| [@woxqaq/pi-web](https://www.npmjs.com/package/@woxqaq/pi-web) | Web shell for pi coding agent. |  | today |
| [@x1any/pi-swarm](https://www.npmjs.com/package/@x1any/pi-swarm) | Multi-agent swarm for Pi — parallel & chained subagents with isolated context windows |  | 16d ago |
| [@xiaoso/pi-plugin-windows-notify](https://www.npmjs.com/package/@xiaoso/pi-plugin-windows-notify) | Pi Windows notification plugin - sends notifications on task completion and user confirmation needed, with AFK mode to notify only when away from window |  | 3d ago |
| [@xl0/firecrawl-web-search](https://www.npmjs.com/package/@xl0/firecrawl-web-search) |  |  | 8d ago |
| [@xl0/pi-web-tools](https://www.npmjs.com/package/@xl0/pi-web-tools) |  |  | 6d ago |
| [@yeliu84/pi-model-router](https://www.npmjs.com/package/@yeliu84/pi-model-router) | Extension for the pi coding agent that intelligently routes each turn to the right LLM tier (high/medium/low) based on task intent, session budget, context size, and custom rules. |  | 17d ago |
| [@yevhen.b/pi-macos-theme-sync](https://www.npmjs.com/package/@yevhen.b/pi-macos-theme-sync) | My custom extensions for pi agent harness |  | 7d ago |
| [@ygncode/pi-insights](https://www.npmjs.com/package/@ygncode/pi-insights) | Beautiful analytics reports for pi coding-agent sessions |  | 8d ago |
| [@yylan/pi-memory](https://www.npmjs.com/package/@yylan/pi-memory) | High-performance long-term memory system for pi coding agent — SQLite FTS5 + local ONNX embeddings |  | 4d ago |
| [@yylan/pi-web-tools](https://www.npmjs.com/package/@yylan/pi-web-tools) | Web search & content tools for pi — powered by Tavily and Jina AI |  | 4d ago |
| [@yzlin/pi-subagents](https://www.npmjs.com/package/@yzlin/pi-subagents) | A pi extension extension that brings smart Claude Code-style autonomous sub-agents to pi. |  | 6d ago |
| [@zerodawn/pi-notify](https://www.npmjs.com/package/@zerodawn/pi-notify) | Pi extension that notifies when the agent is ready for input. |  | yesterday |
| [@zhafron/pi-mcp-tools](https://www.npmjs.com/package/@zhafron/pi-mcp-tools) | Universal MCP tools extension for pi coding agent — connect to filesystem, GitHub, databases, and more |  | 3mo ago |
| [@zhafron/pi-memory](https://www.npmjs.com/package/@zhafron/pi-memory) | Memory management extension for pi coding agent — persistent identity, user profile, and daily logs |  | 3mo ago |
| [1Robeno-personal-pi-agent](https://github.com/1Robeno/personal-pi-agent) |  |  | 6d ago |
| [2h2d-co-pi-web-search](https://github.com/2h2d-co/pi-web-search) | A Pi extension package scaffold for web search workflows. |  | 16d ago |
| [3mrgnc3-ollama-graceful](https://github.com/3mrgnc3/ollama-graceful) | Pi extension that gracefully starts and stops Ollama on demand when switching between local and cloud models |  | ~1mo ago |
| [4cya-pi-wechat-bridge](https://github.com/4cya/pi-wechat-bridge) | WeChat ↔ Pi Agent multi-session bridge. One WeChat window, multiple AI coding sessions. Switch with /english /wechat /quant — case-insensitive, concurrent, image-aware. |  | 14d ago |
| [5h1nch4nn-pi-friday](https://github.com/5h1nch4nn/pi-friday) | Advanced Web Intelligence, UI, and Subagents for the Pi Coding Agent |  | 22d ago |
| [90sRehem-pi-agent-ext](https://github.com/90sRehem/pi-agent-ext) | pi-agent-ext monorepo: TypeScript packages for pi agent extensions |  | 4d ago |
| [a-Fig-pi-mcp-server](https://github.com/a-Fig/pi-mcp-server) | MCP server that bridges Claude Code and the pi coding agent — spawn, orchestrate, and communicate with pi agents as MCP tools |  | 3d ago |
| [aar-gee-pi-coord](https://github.com/aar-gee/pi-coord) | Lightweight multi-agent coordination channels for pi coding agent. Named channels, fire-and-forget + blocking messaging, user-approval gate. No daemon, file-based. |  | 2mo ago |
| [abboskhonov-nia-pi](https://github.com/abboskhonov/nia-pi) | Official Nia extension for pi.dev — index and search code repos, docs, papers, and packages via Nia AI |  | today |
| [acidghost-pi-web](https://github.com/acidghost/pi-web) | Pi from the browser (π) |  | 8d ago |
| [aferrariuy-gentle-pi](https://github.com/aferrariuy/gentle-pi) | Gentle AI made-to-measure Pi agent |  | 15d ago |
| [agent-halter](https://www.npmjs.com/package/agent-halter) | A conversation-budget extension for AI coding agents (pi only for now, claude code planned) |  | 20d ago |
| [agent-hooks-playground](https://www.npmjs.com/package/agent-hooks-playground) | Shared logger for AI coding agent lifecycle events |  | 2d ago |
| [ageorg06-pi](https://github.com/ageorg06/pi) | Arcano Co team pi coding agent configuration — extensions, skills, agents, and settings |  | 13d ago |
| [ahmadaccino-pi-mempalace](https://github.com/ahmadaccino/pi-mempalace) | persistent local memory for pi agent |  | ~1mo ago |
| [ai-ecoverse-pi-grok](https://github.com/ai-ecoverse/pi-grok) | Grok Build provider and extension for the Pi Coding Agent |  | 9d ago |
| [Airead-pi-airead](https://github.com/Airead/pi-airead) | Personal extensions for [pi coding-agent](https://github.com/badlogic/pi-mono) |  | 2mo ago |
| [ajjucoder-ohmypi](https://github.com/ajjucoder/ohmypi) | A safe orchestration layer for pi: GPT-5.4 orchestrator, GPT-5.4 mini scout, and Claude Opus 4.6 frontend specialist without touching pi core. |  | 26d ago |
| [akaihola-pi-akaihola](https://github.com/akaihola/pi-akaihola) | Packages, extensions and agents for Pi Coding Agent |  | ~1mo ago |
| [akshaykarle-pi-tools](https://github.com/akshaykarle/pi-tools) | Pi coding agent extensions for security hardening and productivity. |  | 7d ago |
| [aktech-pi-extensions](https://github.com/aktech/pi-extensions) | Personal set of extensions I use with @mariozechner/pi-coding-agent |  | ~1mo ago |
| [Albertobelleiro-wave-orchestrator](https://github.com/Albertobelleiro/wave-orchestrator) | Dynamic multi-agent orchestrator skill for Pi coding agent |  | 2mo ago |
| [aldoborrero-pi-agent-kit](https://github.com/aldoborrero/pi-agent-kit) | My public repository for Skills |  | ~1mo ago |
| [AleksanderEvensen-pi-agent-config](https://github.com/AleksanderEvensen/pi-agent-config) |  |  | 10d ago |
| [alfadb-pi-gstack](https://github.com/alfadb/pi-gstack) | gstack methodology ported to pi-coding-agent: opinionated review, QA, security audit, and ship workflows as prompt templates and skills |  | 21d ago |
| [alfadb-pi-multi-agent](https://github.com/alfadb/pi-multi-agent) | pi extension: multi-model parallel dispatch with debate, chain, ensemble strategies |  | 21d ago |
| [aliou-pi-poolside](https://github.com/aliou/pi-poolside) | Pi extension package for the Poolside inference API -- archived, for reproducibility only |  | 17d ago |
| [alnah-agent](https://github.com/alnah/agent) | Those are my Pi extensions, skills, prompts, themes, and context files. |  | 9d ago |
| [amertkara-pi-postman](https://github.com/amertkara/pi-postman) | Pi extension that bridges agent sessions via AMQ (Agent Message Queue) |  | 19d ago |
| [amugoodbad229-pi-ghost](https://github.com/amugoodbad229/pi-ghost) | Ghost agent-first database CLI integration for the Pi coding agent. |  | 23d ago |
| [andreimaxim-pi-agents](https://github.com/andreimaxim/pi-agents) | Plan mode for the Pi agent |  | 13d ago |
| [andreimaxim-pi-usage](https://github.com/andreimaxim/pi-usage) | Usage extension for the Pi agent |  | 13d ago |
| [andreyxdd-my-pi](https://github.com/andreyxdd/my-pi) | My PI coding agent config |  | 6d ago |
| [andrii-k6a-pi-packages](https://github.com/andrii-k6a/pi-packages) | Packages for Pi coding agent |  | 7d ago |
| [andriimartynov-pi-ollama-model-switcher](https://github.com/andriimartynov/pi-ollama-model-switcher) | Monitors and manages Ollama model instances within the pi coding agent harness |  | 24d ago |
| [andrioid-pi-fence](https://github.com/andrioid/pi-fence) | Fence wrapper for Pi coding agent. Wraps bash calls and intercepts reads/writes according to fence config |  | 12d ago |
| [ang-XWBWZ-PI-agent-wiki](https://github.com/ang-XWBWZ/PI-agent-wiki) |  |  | 5d ago |
| [ankitg12-chat-timestamps](https://github.com/ankitg12/chat-timestamps) | Per-message timestamps for OMP/Pi coding agents |  | 28d ago |
| [annapurna-himal-pi-memory-search](https://github.com/annapurna-himal/pi-memory-search) | Semantic memory search extension for Pi coding agent |  | 4mo ago |
| [AnthonyFangqing-pi-tps](https://github.com/AnthonyFangqing/pi-tps) | Live TPS (tokens per second), average TPS, and TTFT extension for the pi coding agent |  | 25d ago |
| [antob-pi-agent-config](https://github.com/antob/pi-agent-config) | Personal configuration for the pi coding agent |  | 12d ago |
| [AnupamKhurana-pi-whatsapp](https://github.com/AnupamKhurana/pi-whatsapp) | Production-ready WhatsApp integration for Pi Coding Agent |  | 26d ago |
| [aprajnaparamita-dara-pi-agent-theme](https://github.com/aprajnaparamita/dara-pi-agent-theme) | Cyberpunk lady hacker inspired theme and extensions for pi coding agent https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent |  | 3mo ago |
| [arc-megicxyz-bot-pi-hello-world](https://github.com/arc-megicxyz-bot/pi-hello-world) | Hello World project scaffolded for Pi coding agent |  | 3mo ago |
| [arcanemachine-pi-inter-agent](https://github.com/arcanemachine/pi-inter-agent) | Pi extension for connecting to the [inter-agent](https://github.com/arcanemachine/inter-agent) message bus. |  | 9d ago |
| [arcanemachine-pi-read](https://github.com/arcanemachine/pi-read) | The Pi coding agent `/read` tool, but with lower (and configurable) default max values (e.g. 2000 lines -> 100 lines). |  | ~1mo ago |
| [arcanemachine-pi-web-search](https://github.com/arcanemachine/pi-web-search) | A search extension for the Pi coding agent |  | 9d ago |
| [arek-e-agent-stuff](https://github.com/arek-e/agent-stuff) | My pi extensions, agents, prompts, and tmux workflow |  | 3mo ago |
| [arnaugomez-pi-fast-edits](https://github.com/arnaugomez/pi-fast-edits) | Faster tools for the Pi coding agent. Edit files using 60% fewer tokens. Inspired by Dirac. |  | 8d ago |
| [artran-pi-extensions](https://github.com/artran/pi-extensions) | Extensions and Skills for pi-coding-agent |  | 15d ago |
| [artystic](https://www.npmjs.com/package/artystic) | A visual design-polish skill and editorial website for making interfaces feel authored, not templated. |  | today |
| [ashwin-shopify-pi-memory-bank](https://github.com/ashwin-shopify/pi-memory-bank) | Recall-only persistent memory extension for pi coding agent |  | ~1mo ago |
| [asyrjasalo-pi-run-code](https://github.com/asyrjasalo/pi-run-code) | Pi Coding Agent extension for TypeScript/JavaScript code mode |  | 28d ago |
| [Attamusc-pi-acp](https://github.com/Attamusc/pi-acp) | ACP (Agent Client Protocol) adapter for the pi coding agent. |  | ~1mo ago |
| [Auda29-twincat-mcp-mono](https://github.com/Auda29/twincat-mcp-mono) | MCP Server / Pi extension that gives an agent read/write access to TwinCAT runtime values over ADS (Automation Device Specification). |  | 25d ago |
| [aussetg-pi-extensions](https://github.com/aussetg/pi-extensions) | pi coding agent extensions [mirror] |  | today |
| [AVGVSTVS96-pi-patcher](https://github.com/AVGVSTVS96/pi-patcher) | self-healing patches for pi coding agent! |  | 2d ago |
| [ayagmar-pi-pr-companion](https://github.com/ayagmar/pi-pr-companion) | Pi extension/package for PR status, review, and active PR browsing |  | 14d ago |
| [az9713-pi-vs-claude-code](https://github.com/az9713/pi-vs-claude-code) | Clone of disler/pi-vs-claude-code — Pi Coding Agent extension playground enhanced with extensive documentation (architecture guide, developer guide, quick start, zero-to-hero study plan) |  | 3mo ago |
| [Badisse-pi-agent-config](https://github.com/Badisse/pi-agent-config) | Pi coding agent config (extensions, skills, ralph) |  | 17d ago |
| [bakubay-typesafe-demos](https://github.com/bakubay/typesafe-demos) | Demo projects showcasing the TypeSafe AI evaluation API — Google Sheets add-on, Next.js multi-agent chat, and pi coding session mood monitor |  | ~1mo ago |
| [Balurc-pi-blast-radius-guard](https://github.com/Balurc/pi-blast-radius-guard) | A safety extension for pi coding agent that intercepts dangerous shell commands |  | 3mo ago |
| [benjaminkitt-pi-ext](https://github.com/benjaminkitt/pi-ext) | Pi coding agent extensions monorepo |  | ~1mo ago |
| [bernajaber-pi-product-system](https://github.com/bernajaber/pi-product-system) | Product creation system for Pi coding agent. Describe what to build → spec → plan → build → validate. |  | 3mo ago |
| [bertugmirasyedi-pi-threads](https://github.com/bertugmirasyedi/pi-threads) | Slate-style thread/episode delegation for pi coding agent |  | 2mo ago |
| [big-sw-little-sw-pi-agent-workbench](https://github.com/big-sw-little-sw/pi-agent-workbench) |  |  | 12d ago |
| [bigidulka-pi-browser](https://github.com/bigidulka/pi-browser) | Terminal Chromium browser manager for Pi coding agent. 30 tools, 7 browsers, cross-platform. |  | 22d ago |
| [BillJr99-pi-openai-compat](https://github.com/BillJr99/pi-openai-compat) | pi coding agent extension that registers OpenAI-compatible LLM providers (OpenRouter, Ollama, NVIDIA NIM, Nous Research, or any custom endpoint) as native first-class models in pi's /model picker and  |  | 9d ago |
| [bitmonkey-pi-stuff](https://github.com/bitmonkey/pi-stuff) | Extensions and skills for the pi coding agent |  | 4mo ago |
| [biubiu0002-pi-model-fallback](https://github.com/biubiu0002/pi-model-fallback) | Automatic model fallback for pi-coding-agent: switch to backup model on provider errors |  | ~1mo ago |
| [BlackBeltTechnology-pi-shodh](https://github.com/BlackBeltTechnology/pi-shodh) | Shodh memory package extension for pi coding agent. |  | 27d ago |
| [Bluxe-cmd-equitai-skills](https://github.com/Bluxe-cmd/equitai-skills) | Pi coding agent skills, extensions & prompts for EquitAI ecosystem |  | 2mo ago |
| [Blykegluk-pi-agents](https://github.com/Blykegluk/pi-agents) | Pi Agent dashboard + automated video pipeline for Your Body Explained YouTube channel |  | ~1mo ago |
| [bnema-pi-public](https://github.com/bnema/pi-public) | Public-safe Pi coding-agent config and skills export |  | 27d ago |
| [bombman-pi-agent-animations](https://github.com/bombman/pi-agent-animations) |  |  | 17d ago |
| [Bram-cat-my-pi-setup](https://github.com/Bram-cat/my-pi-setup) | Personal Pi coding-agent extensions and themes setup |  | yesterday |
| [BrandtWong-pi-ext-web-fetch](https://github.com/BrandtWong/pi-ext-web-fetch) | Web fetch and search tools for Pi coding agent |  | 7d ago |
| [BrenLong-pi-theme-support](https://github.com/BrenLong/pi-theme-support) | Pi coding agent setup for Shopify Theme Support advisors |  | 25d ago |
| [brettatoms-pi-web-tools](https://github.com/brettatoms/pi-web-tools) | WebSearch and WebFetch tools for pi-coding-agent |  | 3mo ago |
| [brian200508-pi-local](https://github.com/brian200508/pi-local) | Pi Coding Agent extension - TUI login flow for local OpenAI-compatible inference servers (OlliteRT, Ollama, LM Studio). |  | 6d ago |
| [brian200508-pi-tools](https://github.com/brian200508/pi-tools) | Pi Coding Agent extension - scope-restricted, approval-gated file system tools fot the AI agent. |  | 6d ago |
| [bsmithgall-pi-pi-pi](https://github.com/bsmithgall/pi-pi-pi) | Skills and extensions for the Pi coding agent |  | 25d ago |
| [btimothy-har-basecamp](https://github.com/btimothy-har/basecamp) | My personal Pi agent harness. |  | 12d ago |
| [btobolaski-pi-stop-hook](https://github.com/btobolaski/pi-stop-hook) | A stop hook for the pi coding agent that implement's Claude Code's PreStop hook. |  | 6d ago |
| [buihongduc132-pi-immediate-compaction](https://github.com/buihongduc132/pi-immediate-compaction) | Pi extension package |  | 10d ago |
| [Bunchhieng-pi-brainbud](https://github.com/Bunchhieng/pi-brainbud) | A PI extension that delivers contextual programming tips while you vibe-code — without interrupting your session. |  | 6d ago |
| [burningportra-pi-agent-flywheel](https://github.com/burningportra/pi-agent-flywheel) | Multi-agent orchestrator extension for pi — deep planning, parallel execution, guided review gates, compound memory. Based on the Agentic Coding Flywheel. |  | 5d ago |
| [burningportra-pi-agent-mail](https://github.com/burningportra/pi-agent-mail) | Agent Mail coordination tools for every pi session — messaging, file reservations, inbox, threads |  | ~1mo ago |
| [burningportra-pi-orchestrator](https://github.com/burningportra/pi-orchestrator) | Multi-agent orchestrator extension for pi — deep planning, parallel execution, guided review gates, compound memory. Based on the Agentic Coding Flywheel. |  | ~1mo ago |
| [bwks-pi-planner](https://github.com/bwks/pi-planner) | Planning extension for Pi coding agent |  | 22d ago |
| [BYTE-6D65-my-pi-setup](https://github.com/BYTE-6D65/my-pi-setup) | My Pi coding agent config and extensions |  | 7d ago |
| [c10l-pi-opencode-serve-api](https://github.com/c10l/pi-opencode-serve-api) | OpenCode serve API compatibility layer for Pi agent |  | ~1mo ago |
| [c2tarun-pi-agent-config](https://github.com/c2tarun/pi-agent-config) |  |  | 8d ago |
| [c4iov1-pi-graphify](https://github.com/c4iov1/pi-graphify) | Knowledge graphs, always-on for pi coding agents |  | 13d ago |
| [CanerGngr-pi-obsidian-extensions](https://github.com/CanerGngr/pi-obsidian-extensions) | pi extensions that plug Obsidian into the pi coding agent: capture, deepen, inbox processing, cross-session memory. |  | ~1mo ago |
| [CaptCanadaMan-pi-ollama-native](https://github.com/CaptCanadaMan/pi-ollama-native) | Native Ollama provider for pi coding agent — original fork-based prototype, superseded by pi-ollama (the extension) |  | 24d ago |
| [CaptCanadaMan-pi-rpc-bridge](https://github.com/CaptCanadaMan/pi-rpc-bridge) | HTTP + WebSocket bridge for pi-mono's RPC mode. Drive the pi coding agent remotely from any client, over any transport. |  | 21d ago |
| [Catdaemon-pi-code-intelligence](https://github.com/Catdaemon/pi-code-intelligence) | Code Intelligence tools for Pi Agent |  | 15d ago |
| [catlain-pi-context](https://github.com/catlain/pi-context) | Context management extension for pi-coding-agent — tool result formatting, distillation, and context panel |  | today |
| [catlain-pi-memory](https://github.com/catlain/pi-memory) | File-based persistent memory extension for pi-coding-agent |  | today |
| [catlain-pi-shared-utils](https://github.com/catlain/pi-shared-utils) | Shared utility library for pi-coding-agent extensions |  | today |
| [catlain-pi-smart-compact](https://github.com/catlain/pi-smart-compact) | Smart context compaction extension for pi-coding-agent — LLM-assisted relevance filtering |  | today |
| [catlain-pi-workflow](https://github.com/catlain/pi-workflow) | Workflow orchestration extension for pi-coding-agent — subagent spawning, research workflow, output capture |  | today |
| [cevr-pi](https://github.com/cevr/pi) | Custom pi coding-agent extensions and core utilities |  | 2mo ago |
| [ch0udry-termdraw-pi](https://github.com/ch0udry/termdraw-pi) | Standalone installable fork of @termdraw/pi for Pi package compatibility |  | 17d ago |
| [chamanomopah-pi-agent](https://github.com/chamanomopah/pi-agent) | Pi Coding Agent extension examples and experiments |  | 3mo ago |
| [CharLEE-X-pi-agent-team](https://github.com/CharLEE-X/pi-agent-team) | Pi extension: dispatcher-only orchestrator that delegates work to specialist agent teammates via dispatch_agent. Grid dashboard, multi-team yaml support, model-tier resolution, host notifications. |  | 29d ago |
| [chasey-myagi-agent-ts-starter](https://github.com/chasey-myagi/agent-ts-starter) | Blank TypeScript fullstack Agent starter: Hono + PI Agent Core + React |  | ~1mo ago |
| [cheezy-stride-pi](https://github.com/cheezy/stride-pi) | Task lifecycle skills for Stride kanban — Pi Coding Agent edition |  | today |
| [chiwanpark-pi-enhanced](https://github.com/chiwanpark/pi-enhanced) | My own Pi skills, extensions, and themes |  | 11d ago |
| [chknd1nner-pi-extensions](https://github.com/chknd1nner/pi-extensions) | Max's repository for extending Pi coding agent |  | 16d ago |
| [chrisetheridge-my-little-pi](https://github.com/chrisetheridge/my-little-pi) | my personal extensions, skills, themes for pi.dev agent |  | 5d ago |
| [chrisetheridge-pi-extension-architect](https://github.com/chrisetheridge/pi-extension-architect) | architect mode for pi agent |  | 22d ago |
| [christroutner-pi-extensions](https://github.com/christroutner/pi-extensions) | My extensions for the pi coding agent |  | 4mo ago |
| [christroutner-trout-pi-agent](https://github.com/christroutner/trout-pi-agent) | A boilerplate for creating a Pi Coding Agent, with my favorite default extensions |  | yesterday |
| [Ciantic-my-pi-extra](https://github.com/Ciantic/my-pi-extra) | My PI coding agent extra extension |  | 21d ago |
| [ckanner-pi-kimi-web-search](https://github.com/ckanner/pi-kimi-web-search) | Kimi Code platform web search and fetch tools for senpi / pi-coding-agent |  | 7d ago |
| [clashmar-pi-forge-jira](https://github.com/clashmar/pi-forge-jira) | Jira integration for the pi coding agent. |  | 3d ago |
| [claude-mem-pi](https://www.npmjs.com/package/claude-mem-pi) | Pi extension that shares claude-mem's persistent memory store with Claude Code — observations, context injection, and session summaries across both harnesses. |  | today |
| [coctostan-pi-agent-evals](https://github.com/coctostan/pi-agent-evals) | Pi extension + runner that measures agent tool routing and behavioral discipline |  | ~1mo ago |
| [coctostan-pi-lcm](https://github.com/coctostan/pi-lcm) | Pi LCM - Large Context Management extension for pi coding agent |  | 2mo ago |
| [code-yeongyu-pi-anthropic-bash](https://github.com/code-yeongyu/pi-anthropic-bash) | Anthropic native bash policy extension for the pi coding agent. Ensures native bash tools are present on anthropic-messages payloads when opt-in is enabled and appends bash guidance to the system prom |  | 14d ago |
| [code-yeongyu-pi-anthropic-code-execution](https://github.com/code-yeongyu/pi-anthropic-code-execution) | Anthropic native code execution policy extension for the pi coding agent. Ensures native code_execution tools are present on anthropic-messages payloads when opt-in is enabled and appends code executi |  | 14d ago |
| [code-yeongyu-pi-anthropic-computer-use](https://github.com/code-yeongyu/pi-anthropic-computer-use) | Anthropic native computer use extension for the pi coding agent. Registers the computer tool executor and ensures computer_20250124 is injected on anthropic-messages payloads when opt-in is enabled. |  | 11d ago |
| [code-yeongyu-pi-anthropic-text-editor](https://github.com/code-yeongyu/pi-anthropic-text-editor) | Anthropic native text editor policy extension for the pi coding agent. Registers str_replace_based_edit_tool and ensures text_editor_20250728 is used on anthropic-messages payloads when opt-in is enab |  | 12d ago |
| [code-yeongyu-pi-anthropic-tool-search](https://github.com/code-yeongyu/pi-anthropic-tool-search) | Anthropic native tool-search policy extension for the pi coding agent. Conditionally injects Anthropic tool-search tools based on PI_ANTHROPIC_TOOL_SEARCH and appends tool-search guidance to the syste |  | 14d ago |
| [code-yeongyu-pi-anthropic-web-fetch](https://github.com/code-yeongyu/pi-anthropic-web-fetch) | Anthropic native web fetch policy extension for the pi coding agent. Ensures native web_fetch tools are present on anthropic-messages payloads and appends web fetch guidance to the system prompt. |  | 12d ago |
| [code-yeongyu-pi-anthropic-web-search](https://github.com/code-yeongyu/pi-anthropic-web-search) | Anthropic native web search policy extension for the pi coding agent. Ensures native web_search tools are present on anthropic-messages payloads and appends web search guidance to the system prompt. |  | 12d ago |
| [code-yeongyu-pi-google-code-execution](https://github.com/code-yeongyu/pi-google-code-execution) | Google native code execution policy extension for the pi coding agent. Ensures native codeExecution tools are present on Google API payloads when opt-in env toggle is enabled and appends Code Executio |  | 14d ago |
| [code-yeongyu-pi-google-url-context](https://github.com/code-yeongyu/pi-google-url-context) | Google native URL context policy extension for the pi coding agent. Ensures native urlContext tools are present on Google API payloads when default-on env toggle is enabled and appends URL Context gui |  | 12d ago |
| [code-yeongyu-pi-openai-api-parallel-tool-calls](https://github.com/code-yeongyu/pi-openai-api-parallel-tool-calls) | OpenAI parallel tool call policy extension for the pi coding agent. |  | 4d ago |
| [code-yeongyu-pi-todotools](https://github.com/code-yeongyu/pi-todotools) | Structured todowrite/todoread task management extension for the pi coding agent |  | 6d ago |
| [CodeDoes-pi-featherless](https://github.com/CodeDoes/pi-featherless) | pi-package: Featherless AI provider for pi coding agent with accurate tokenization |  | ~1mo ago |
| [codestreamkr-pi-agent-init](https://github.com/codestreamkr/pi-agent-init) |  |  | 14d ago |
| [codewithkenzo-pi-dispatch](https://github.com/codewithkenzo/pi-dispatch) | Profile-based task dispatch and queued execution for the Pi coding agent. |  | ~1mo ago |
| [codewithkenzo-pi-rig](https://github.com/codewithkenzo/pi-rig) | Extensions for the Pi coding agent. Dispatch background agents, theming, and more. |  | 2d ago |
| [codewithkenzo-pi-theme-switcher](https://github.com/codewithkenzo/pi-theme-switcher) | Runtime theme switching and preview for the Pi coding agent. 10+ built-in palettes. |  | ~1mo ago |
| [CodyBontecou-pi-phone-mode](https://github.com/CodyBontecou/pi-phone-mode) | Compact Pi coding-agent theme and extension for phone + tmux + mosh workflows |  | 15d ago |
| [cole-pi-jj](https://github.com/cole/pi-jj) | jj extension for pi coding agent |  | ~1mo ago |
| [compound-engineering-pi](https://www.npmjs.com/package/compound-engineering-pi) | Compound engineering extension for Pi coding agent workflows. |  | ~1mo ago |
| [CoreyCole-pi-deterministic-docs](https://github.com/CoreyCole/pi-deterministic-docs) | Pi extension that deterministically injects nearest project docs when files are read |  | 7d ago |
| [Corythebeast7-pi-bash-guard](https://github.com/Corythebeast7/pi-bash-guard) | A pi coding agent extension that guards bash execution with LLM-powered safety checks |  | 12d ago |
| [csalvato-pi-config-personal](https://github.com/csalvato/pi-config-personal) | Personal pi coding agent config — extensions, skills, and agents |  | 29d ago |
| [CyanAutomation-kaseki-agent](https://github.com/CyanAutomation/kaseki-agent) | Kaseki is a proof-of-concept ephemeral coding-agent runner. Each run is a numbered, disposable container instance such as kaseki-1 or kaseki-2. This template uses the Pi coding-agent CLI with OpenRout |  | 8d ago |
| [Cyb3rDudu-pi-pen-kit](https://github.com/Cyb3rDudu/pi-pen-kit) | Pi extensions for offensive-security workflows — pentesting and red-team tooling for the Pi coding agent. |  | yesterday |
| [cyberCharl-pi-vault-agent](https://github.com/cyberCharl/pi-vault-agent) | Pi extension for scoped markdown-vault navigation, graph analysis, backlinks, note stats, recent notes, and safe rename workflows. |  | ~1mo ago |
| [daboss3d-pi-extensions](https://github.com/daboss3d/pi-extensions) | Extensions for Pi Agent |  | 24d ago |
| [danecando-pi-auto-handoff](https://github.com/danecando/pi-auto-handoff) | Auto-handoff extension for pi coding agent — transfers context to a fresh session when a conversation gets long |  | 29d ago |
| [DanGreinke-pi-command-center](https://github.com/DanGreinke/pi-command-center) | TUI command center extension for pi coding agent — live dashboard for multi-agent tmux workflows |  | 8d ago |
| [daniphant-pi-agent-notify](https://github.com/daniphant/pi-agent-notify) | Desktop notifications for Pi when agent turns complete |  | ~1mo ago |
| [dannyob-episodic-memory-pi](https://github.com/dannyob/episodic-memory-pi) | Version of Obra's Episodic Memory Adapted for the Pi Coding Agent |  | 3mo ago |
| [DanteBasile04-PiTextEditor](https://github.com/DanteBasile04/PiTextEditor) | Pi extensions for IDE-like coding: Code Review Panel + VimModalEditor. Built with SDD (Spec-Driven Development) on the Pi coding agent platform. |  | 8d ago |
| [darkhorseprojects-pi-circuitry](https://github.com/darkhorseprojects/pi-circuitry) | Pi extension for Circuitry - agentic workflows on Excalidraw |  | 3d ago |
| [DarkoKuzmanovic-pi-hud](https://github.com/DarkoKuzmanovic/pi-hud) | Status HUD for Pi coding agent — provider quota, session stats, git status, and model info in the terminal footer and header |  | 12d ago |
| [DarkoKuzmanovic-pi-kitten](https://github.com/DarkoKuzmanovic/pi-kitten) | Subagent system for Pi coding agent — dispatch agents into Kitty windows or hidden processes with async callback |  | 12d ago |
| [DarkoKuzmanovic-pi-powertoys](https://github.com/DarkoKuzmanovic/pi-powertoys) | A collection of standalone Pi coding-agent extensions. Each toy is a single file — install them all or pick what you need. |  | 12d ago |
| [DarkoKuzmanovic-pi-wafer](https://github.com/DarkoKuzmanovic/pi-wafer) | Wafer Pass provider for Pi coding agent — use Wafer-hosted models (DeepSeek, GLM, Qwen, MiniMax) directly from Pi |  | yesterday |
| [dasun-sathsara-pi-config](https://github.com/dasun-sathsara/pi-config) | Pabasara's personal pi coding agent configuration |  | 7d ago |
| [davelens-pi-config](https://github.com/davelens/pi-config) | Personal setup for the pi coding agent. |  | today |
| [davidshen84-pi-ollama-web-search](https://github.com/davidshen84/pi-ollama-web-search) | pi coding agent ollama web search extension |  | 15d ago |
| [davidsunglee-pi-subagent](https://github.com/davidsunglee/pi-subagent) | Fork of the subagents extension in the pi coding agent repo. |  | 3d ago |
| [demigodmode-pi-tool-codex](https://github.com/demigodmode/pi-tool-codex) | A compact extension for rendering codex-based tool calls, previewing differences, and truncating output for the Pi coding agent. |  | ~1mo ago |
| [DenisSud-dotfiles-pi](https://github.com/DenisSud/dotfiles-pi) | Pi coding agent config |  | 28d ago |
| [despin-pi-venice-web](https://github.com/despin/pi-venice-web) | Venice.ai Web (Subscription) provider for Pi coding agent |  | 25d ago |
| [Didi121-pi-vs-claude-code](https://github.com/Didi121/pi-vs-claude-code) | Gestion du personnel - CRUD complet avec Pi Coding Agent + Paperclip |  | 2mo ago |
| [diegoalgg88-sapling](https://github.com/diegoalgg88/sapling) | Sapling CLI - Headless coding agent with proactive context management (fork con mejoras Windows y Pi extension) |  | ~1mo ago |
| [digital-overground-pi-geon](https://github.com/digital-overground/pi-geon) | A messenger for the pi coding agent |  | 28d ago |
| [dilljens-pi-dotfiles](https://github.com/dilljens/pi-dotfiles) | personal pi coding agent setup — agents, extensions, skills, and config |  | 2d ago |
| [dizthewize-pi-agent-roles](https://github.com/dizthewize/pi-agent-roles) | pi-agent-roles extension for Pi |  | 3d ago |
| [dkmaker-pi-extension-developer-mode](https://github.com/dkmaker/pi-extension-developer-mode) | Developer mode extension for pi coding agent — docs search, examples, spawn, tmux management, learnings, and introspection tools |  | 2mo ago |
| [dkmaker-pi-extension-project-management](https://github.com/dkmaker/pi-extension-project-management) | Project management extension for pi coding agent — epics, issues, assets, and prioritized work tracking |  | 2mo ago |
| [dmarlow-personal-pi-mcp-local](https://github.com/dmarlow-personal/pi-mcp-local) | Pi agent package: MCP docs bridge, LSP integration, hash-anchored edits, system monitor, and research tools for local llama.cpp |  | 7d ago |
| [dmoreq-pi-me](https://github.com/dmoreq/pi-me) | Comprehensive extension suite for the pi coding agent: safety guards, session lifecycle, developer tools, content utilities, subagent orchestration, and authoring helpers |  | 7d ago |
| [dmoreq-pi-scope](https://github.com/dmoreq/pi-scope) | AST-powered context, retrieval & code intelligence for the pi coding agent — injects compact AST skeletons, intelligent symbol-based file retrieval, hash-verified editing, and LSP navigation, with ~85 |  | 17d ago |
| [DonaldMurillo-my-pi-again](https://github.com/DonaldMurillo/my-pi-again) | pi coding agent extensions |  | 3d ago |
| [doner21-pi-config](https://github.com/doner21/pi-config) | Pi coding agent configuration — agents, skills, extensions, and NenFlow v3 setup |  | 24d ago |
| [Dopingus-pi-bailian](https://github.com/Dopingus/pi-bailian) | Alibaba Cloud Bailian Coding Plan provider extension for [Pi Coding Agent](https://pi.dev/). |  | ~1mo ago |
| [dotbrains-pi](https://github.com/dotbrains/pi) | Sensible defaults for pi coding agent |  | 29d ago |
| [dougefresher-pi-ext-awsdocs](https://github.com/dougefresher/pi-ext-awsdocs) | pi-coding-agent extension for AWS documentation |  | 3d ago |
| [dougefresher-pi-ext-cursor-rules](https://github.com/dougefresher/pi-ext-cursor-rules) | pi-coding-agent extension for loading cursor rules |  | 17d ago |
| [dpolivaev-pi-fenced](https://github.com/dpolivaev/pi-fenced) | PI coding agent extension and launcher for running PI in a Fence sandbox and configuring Fence policy out of process. |  | 2d ago |
| [dpopsuev-alef](https://github.com/dpopsuev/alef) | alef (א) agent — fork of pi-mono / pi agent toolkit |  | today |
| [drew-myers-pi-extensions](https://github.com/drew-myers/pi-extensions) | My extensions for https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent |  | 4mo ago |
| [drkdra-pi-haro-kioku](https://github.com/drkdra/pi-haro-kioku) | Haro memory package for Pi coding agent |  | 5d ago |
| [drlove2002-ai-config](https://github.com/drlove2002/ai-config) | My personal global configuration, skills, and extensions for the pi coding agent. Features interactive TUI menus, smart git workflows, and DDD context extractors. |  | 15d ago |
| [DrOlu-pi-codemachine](https://github.com/DrOlu/pi-codemachine) | Universal Multi-Agent Workflow Orchestration for Pi |  | 2mo ago |
| [DrOlu-pi-gui](https://github.com/DrOlu/pi-gui) | Desktop GUI for pi coding agent built with Tauri (Rust + React) |  | 2mo ago |
| [DrOlu-pi-multi-agent-collaboration](https://github.com/DrOlu/pi-multi-agent-collaboration) | Enterprise-grade multi-agent collaboration system for pi coding agents - WebSocket-based agent-to-agent communication |  | 2mo ago |
| [dspachos-pi-md-knowledge](https://github.com/dspachos/pi-md-knowledge) | Markdown knowledge base generator for Pi coding agent. Scans your codebase and creates a navigable .kb folder of markdown documents for AI agents. |  | 18d ago |
| [DxVapor-pi-sonar](https://github.com/DxVapor/pi-sonar) | SonarQube integration for pi coding agent — tools and skills to find and fix sonar issues |  | ~1mo ago |
| [DxVapor-pi-splunk-cloud-logs](https://github.com/DxVapor/pi-splunk-cloud-logs) | Pi coding agent extension for querying Splunk Cloud logs — OAuth2 + bearer token auth |  | 26d ago |
| [dyyz1993-pi-agent-chat](https://github.com/dyyz1993/pi-agent-chat) |  |  | 6d ago |
| [EdibleTuber-Mother](https://github.com/EdibleTuber/Mother) | Mother AI Asisstant development repo, forked from pi-mono which is an AI agent toolkit: coding agent CLI, unified LLM API, TUI & web UI libraries, Slack bot, vLLM pods |  | ~1mo ago |
| [effidave-effi-pi](https://github.com/effidave/effi-pi) | Pi agent configuration: extensions, skills, settings |  | 3d ago |
| [egornomic-pi-branch-ask](https://github.com/egornomic/pi-branch-ask) | Extension for Pi to branch questions depending on user's answers. |  | 3mo ago |
| [eirenik0-pi-mempalace](https://github.com/eirenik0/pi-mempalace) | pi coding agent extension for mempalace |  | ~1mo ago |
| [eleqtrizit-pi-autohooks](https://github.com/eleqtrizit/pi-autohooks) | Hooks for Pi Coding Agent |  | 4d ago |
| [eleqtrizit-pi-tasks](https://github.com/eleqtrizit/pi-tasks) | Claude Code's Task System for Pi Coding Agent |  | 23d ago |
| [ellinokon-dot-pi-agent](https://github.com/ellinokon/dot-pi-agent) |  |  | 10d ago |
| [Elsin-pizza-pi](https://github.com/Elsin/pizza-pi) | Pi agent with extensions and commands |  | 2mo ago |
| [elvejohansson-my-pi-setup](https://github.com/elvejohansson/my-pi-setup) | Pi agent extensions |  | 9d ago |
| [end-pi](https://www.npmjs.com/package/end-pi) | Use Pi providers in Codex Desktop with seamless history switching, image input, and a local OpenAI-compatible proxy. |  | yesterday |
| [end-pi-multi-pass](https://www.npmjs.com/package/end-pi-multi-pass) | Multi-subscription companion extension for end-pi and Pi -- rotate OAuth accounts per provider with pools, presets, and failover |  | yesterday |
| [Entelligentsia-forge-cli](https://github.com/Entelligentsia/forge-cli) | Forge CLI — Forge SDLC ported onto pi-coding-agent (TypeScript pi extension) |  | today |
| [ephes-pi-extensions](https://github.com/ephes/pi-extensions) | A monorepo of Pi coding agent extensions that adds reliable, reusable tools for search, web access, and workflow automation. |  | 2mo ago |
| [erwagasore-agent-tooling](https://github.com/erwagasore/agent-tooling) | A collection of skills, extensions, and themes—mostly for pi-coding-agent—ready-made to better your workflow |  | 15d ago |
| [espennilsen-pi-personal-crm](https://github.com/espennilsen/pi-personal-crm) | Personal CRM extension for pi — track contacts, interactions, reminders, and relationships from your coding agent. |  | 3mo ago |
| [ether-moon-agent-atelier-pi-extension](https://github.com/ether-moon/agent-atelier-pi-extension) | Design and (eventually) implementation: agent-atelier orchestration loop ported to a pi-coding-agent extension |  | 28d ago |
| [Etsija-pi-extensions](https://github.com/Etsija/pi-extensions) | Extensions for the pi minimal coding agent |  | 4d ago |
| [executor-pi](https://www.npmjs.com/package/executor-pi) | `executor-pi` is a first-class Pi extension for running Executor from inside Pi with native approval, elicitation, rendering, and project-aware Executor configuration. |  | 2d ago |
| [FabianLevi-flevinsky-ai](https://github.com/FabianLevi/flevinsky-ai) | Cross-agent dev service runner + Claude Code plugin + Pi extension |  | 6d ago |
| [fadilsflow-pi-config](https://github.com/fadilsflow/pi-config) | Pi coding agent configuration - themes, prompts, settings, extensions |  | yesterday |
| [fanto237-agents](https://github.com/fanto237/agents) | skills, themes and extensions i use with pi agent. |  | ~1mo ago |
| [FaqFirebase-pi-desktop](https://github.com/FaqFirebase/pi-desktop) | Desktop GUI frontend for the PI coding agent |  | 3d ago |
| [FasalZein-pi-shared-config](https://github.com/FasalZein/pi-shared-config) | Pi coding agent shared config — Rift provider, tia-runtime, FFF fork, neon-glass theme, extensions |  | 10d ago |
| [Fatih0234-my-pi](https://github.com/Fatih0234/my-pi) | My personal pi coding agent configuration — extensions, skills, themes, prompts, and more |  | 13d ago |
| [Fatih0234-pi-agent-extensions](https://github.com/Fatih0234/pi-agent-extensions) |  |  | ~1mo ago |
| [Fatih0234-pi-config](https://github.com/Fatih0234/pi-config) | My pi coding agent config: extensions, themes, prompts, skills, and settings |  | 25d ago |
| [Fatih0234-pi-opencode-go-usage](https://github.com/Fatih0234/pi-opencode-go-usage) | Pi Coding Agent extension for tracking OpenCode Go model usage locally |  | 2d ago |
| [felix-d-pi-nvim](https://github.com/felix-d/pi-nvim) | Neovim plugin for sending file references to pi coding agent |  | 2mo ago |
| [fhaze-pi-plan-mode](https://github.com/fhaze/pi-plan-mode) | Read-only plan mode for Pi coding agent with execution tracking |  | 4d ago |
| [FieldSwan-pi-config](https://github.com/FieldSwan/pi-config) | My very opinonated collection of settings and extensions for the pi coding agent. Goes in .pi folder. |  | 10d ago |
| [finito-org-pi-agent-setup](https://github.com/finito-org/pi-agent-setup) |  |  | 12d ago |
| [fink-andreas-pi-web-reader](https://github.com/fink-andreas/pi-web-reader) | Extension for pi coding agent to provide a tool to read a web site |  | 4mo ago |
| [fitchmultz-agent-eval](https://github.com/fitchmultz/agent-eval) | Transcript-first evaluation tool for comparing coding-agent sessions across Codex, Claude Code, and Pi. |  | 4d ago |
| [ForeverYoung1208-pi-config](https://github.com/ForeverYoung1208/pi-config) | My current config for pi coding agent |  | 10d ago |
| [FoundDream-pi-mono-master](https://github.com/FoundDream/pi-mono-master) | A progressive 8-chapter tutorial for building AI agents from scratch with pi-coding-agent. Covers streaming, tools, sessions, skills & more. |  | 3mo ago |
| [francescoalemanno-pi-neuralwatt](https://github.com/francescoalemanno/pi-neuralwatt) | Pi extension package for NeuralWatt models |  | 18d ago |
| [FrederickAlt-pi-agent-dashboard](https://github.com/FrederickAlt/pi-agent-dashboard) |  |  | 16d ago |
| [freeo-pi-sqz](https://github.com/freeo/pi-sqz) | pi-coding-agent extension for ojuschugh1/sqz |  | 22d ago |
| [funkymonkeymonk-pi-rtk](https://github.com/funkymonkeymonk/pi-rtk) | RTK integration for Pi coding agent - reduces LLM token consumption by 60-90% |  | ~1mo ago |
| [furbyhaxx-pi-agent-roles](https://github.com/furbyhaxx/pi-agent-roles) | Pi extension package for session-scoped runtime roles with model, thinking, tool, prompt, and skill policy switching. |  | 4d ago |
| [gabrielgiacomini-gg-pi](https://github.com/gabrielgiacomini/gg-pi) | Use when configuring, extending, or troubleshooting the pi coding agent in your workspace. Covers installation, CLI usage, extension authoring, custom providers, model configuration, package managemen |  | today |
| [galihaprilian-pi-web-mobile](https://github.com/galihaprilian/pi-web-mobile) | Pi Web Mobile - mobile-first web companion for pi coding agent |  | ~1mo ago |
| [gallen-pi-latex](https://github.com/gallen/pi-latex) | Minimal LaTeX support for pi coding agent in terminal. |  | ~1mo ago |
| [gandazgul-pi-mnemosyne](https://github.com/gandazgul/pi-mnemosyne) | A Pi agent extension for Mnemosyne |  | ~1mo ago |
| [GCaringi-pi-nanogpt](https://github.com/GCaringi/pi-nanogpt) | NanoGPT provider extension for Pi coding agent — dynamic model discovery, native API key login |  | 6d ago |
| [GeneGulanesJr-PiStats](https://github.com/GeneGulanesJr/PiStats) | Pi Coding Agent Status Tracker |  | 17d ago |
| [GeneGulanesJr-Pyxis](https://github.com/GeneGulanesJr/Pyxis) | Context window attribution bar for the Pi coding agent. Color-coded token breakdown in your TUI footer. |  | 15d ago |
| [georgebashi-pi-kagi](https://github.com/georgebashi/pi-kagi) | Pi coding agent extension: web search via Kagi API |  | ~1mo ago |
| [gestas666-pi-hyperliquid-harness](https://github.com/gestas666/pi-hyperliquid-harness) | Read-only Hyperliquid quant intelligence harness for Pi coding agent |  | 15d ago |
| [gevious-pi-extensions](https://github.com/gevious/pi-extensions) | Extensions for pi.dev coding agent |  | 19d ago |
| [githabideri-pi-matrix-agent](https://github.com/githabideri/pi-matrix-agent) | Minimalistic pi-agent bolted to matrix endpoint, Schmalspur-Openclaw. |  | 26d ago |
| [giuseppecrj-pi-review](https://github.com/giuseppecrj/pi-review) | Pi skill package for running Pi as a code review closeout check |  | 7d ago |
| [godl1ke123-neurograph-pi](https://github.com/godl1ke123/neurograph-pi) | Pi coding agent extension: NeuroGraph context injection, session ingest, and indexed-repo read guards |  | 26d ago |
| [gotgenes-pi-subagents](https://github.com/gotgenes/pi-subagents) | Friendly fork of tintinweb/pi-subagents — Pi extension for Claude Code-style autonomous sub-agents, with RepOne-required patches. |  | 14d ago |
| [gregmercer-pi-agent-examples](https://github.com/gregmercer/pi-agent-examples) | Examples from [How to Build a Custom Agent Framework](https://nader.substack.com/p/how-to-build-a-custom-agent-framework). Built with the `@mariozechner/pi-ai` and `@mariozechner/pi-agent-core` librar |  | 2mo ago |
| [gripebomb-pi-codegraph-extension](https://github.com/gripebomb/pi-codegraph-extension) | CodeGraph MCP tools for the original Pi Coding Agent. |  | 5d ago |
| [gripebomb-Pi-Discord-Activity](https://github.com/gripebomb/Pi-Discord-Activity) | A Pi package for displaying presence/activity in Discord when using the Pi Coding Agent. |  | 15d ago |
| [gturkoglu-pi-prompt-hygiene](https://github.com/gturkoglu/pi-prompt-hygiene) | A Pi extension that blocks prompts containing polite filler before they reach the LLM. |  | 3mo ago |
| [gtwatts-pi-cmux](https://github.com/gtwatts/pi-cmux) | Pi CMUX extension family: local CMUX multi-agent orchestration, Pi session bridge, browser intelligence, and design workflows for Pi. |  | 14d ago |
| [Guanzhw-pi-access-guard](https://github.com/Guanzhw/pi-access-guard) | Lightweight, cross-platform security guard for pi coding agent |  | yesterday |
| [gunabot-pi-flywheel-system](https://github.com/gunabot/pi-flywheel-system) | Flywheel planning methodology as a pi coding agent package - prompt templates and wizard extension |  | 3mo ago |
| [GusChenn-pi-config](https://github.com/GusChenn/pi-config) | Personal pi-coding-agent configuration (extensions, skills, memories, settings) |  | yesterday |
| [gvbgduh-pi-anthropic-vertex](https://github.com/gvbgduh/pi-anthropic-vertex) | Pi coding agent provider for Claude models on Google Vertex AI |  | ~1mo ago |
| [gvkhosla-pi-executor-mcp](https://github.com/gvkhosla/pi-executor-mcp) | Unofficial Pi extension that connects Pi to Executor via Executor's MCP server |  | 28d ago |
| [gweakliem-agent-skills](https://github.com/gweakliem/agent-skills) | Skills for the pi agent |  | 2mo ago |
| [gypelayo-pi-extensions](https://github.com/gypelayo/pi-extensions) | Personal pi coding agent extensions and configuration |  | ~1mo ago |
| [hachej-boring-ui](https://github.com/hachej/boring-ui) | @boring/agent v2 — shadcn ChatPanel + ai-elements primitives, pi-coding-agent harness, AI SDK v6 stream protocol, deterministic showcase + e2e attachments suite |  | 18d ago |
| [HaqimIskandar-pi-agent-memory](https://github.com/HaqimIskandar/pi-agent-memory) | Pi-mem extension for pi-coding-agent — persistent cross-session memory via claude-mem worker |  | 15d ago |
| [harms-haus-pi-git](https://github.com/harms-haus/pi-git) | pi-coding-agent extension: rich git status in footer and agent end summary |  | today |
| [harms-haus-pi-searxng](https://github.com/harms-haus/pi-searxng) | SearXNG web search extension for pi-coding-agent |  | 4d ago |
| [harms-haus-pi-subagents](https://github.com/harms-haus/pi-subagents) | harms-haus subagents extension for pi-coding-agent |  | 2d ago |
| [harms-haus-pi-tasks](https://github.com/harms-haus/pi-tasks) | pi-coding-agent extension: phased task workflow with dependency tracking and strict status gating |  | 3d ago |
| [harms-haus-pi-til-done](https://github.com/harms-haus/pi-til-done) | pi-coding-agent extension: todo list that iterates until all tasks are done |  | 3d ago |
| [harms-haus-pi-till-done](https://github.com/harms-haus/pi-till-done) | pi-coding-agent extension: todo list that iterates until all tasks are done |  | 14d ago |
| [harms-haus-pi-worktrees](https://github.com/harms-haus/pi-worktrees) | pi-coding-agent extension: manage git worktrees with /wt-create, /wt-switch, /wt-merge, /wt-cleanup |  | 7d ago |
| [harms-haus-pi-zai-usage](https://github.com/harms-haus/pi-zai-usage) | Z.ai API quota monitor extension for pi-coding-agent |  | 3d ago |
| [HarshaDokula-pi_agent_extensions_skills](https://github.com/HarshaDokula/pi_agent_extensions_skills) | Extensions and skill for pi dev agent. |  | 15d ago |
| [harshmpatil-int-custom-pi-provider](https://github.com/harshmpatil-int/custom-pi-provider) | Custom provider for Pi coding agent |  | 11d ago |
| [Hastyshell-pi-config](https://github.com/Hastyshell/pi-config) | Configuration workspace for Pi Coding Agent prompts, skills, extensions, themes, and local development |  | 19d ago |
| [headsdownapp-headsdown-pi](https://github.com/headsdownapp/headsdown-pi) | HeadsDown availability package for Pi agent. Native tools, trust levels, verdicts. |  | 26d ago |
| [henryhwang-pi-extensions](https://github.com/henryhwang/pi-extensions) | Extensions for the Pi Coding Agent |  | yesterday |
| [hikmaai-io-pi-guard](https://github.com/hikmaai-io/pi-guard) | LLM-as-Guard advisor extension for the Pi Coding Agent. Three-tier security: fast local classifier, optional ML gateway (Mirsad), and LLM guard. |  | ~1mo ago |
| [hkfuertes-ask-pi-extension](https://github.com/hkfuertes/ask-pi-extension) | Sub-agents for pi with Claude Code look and feel — parallel execution, live widget, custom agent types, mid-run steering and more ... |  | 11d ago |
| [hscheema1979-pi-agent-teams](https://github.com/hscheema1979/pi-agent-teams) | Multi-agent orchestration for pi: parallel code reviews, hypothesis-driven debugging, and coordinated feature development |  | 3mo ago |
| [hshayde-pi-monitor](https://github.com/hshayde/pi-monitor) | Live tmux-aware status monitor for pi coding agents |  | yesterday |
| [hsohn420420-cmyk-iflow2api-pi-extension](https://github.com/hsohn420420-cmyk/iflow2api-pi-extension) | iflow2api Extension for pi-coding-agent - Free cloud models (128K-256K context) via local iFlow2API proxy with chunking support |  | 2mo ago |
| [HTWDEVRU-pi-env-loader](https://github.com/HTWDEVRU/pi-env-loader) | Env Loader Extension for pi code agent |  | 27d ago |
| [hurricanehrndz-pi-ext](https://github.com/hurricanehrndz/pi-ext) | One-stop shop for pi.dev extensions, skills, and themes |  | 4d ago |
| [inceptionstack-pi-mono-watchdog](https://github.com/inceptionstack/pi-mono-watchdog) | pi-watchdog: tmux-based watchdog extension for pi coding agent with auto-restart, telegram integration, and systemd service management |  | ~1mo ago |
| [initiatesofzeus-design-maxcode](https://github.com/initiatesofzeus-design/maxcode) | MaxCode — Self-evolving coding agent with multi-brain architecture, 3-tier memory, and autoresearch ratchet. Built on pi.dev. |  | ~1mo ago |
| [Istar-Eldritch-pi-wakatime](https://github.com/Istar-Eldritch/pi-wakatime) | A pi-coding-agent extension to log usage on wakatime. |  | 4mo ago |
| [itsmekene-pi-design-deck](https://github.com/itsmekene/pi-design-deck) | Present multi-slide visual decision decks for Pi coding agent, enabling clear comparisons of code, diagrams, and mockups to guide implementation choices. |  | 25d ago |
| [Itsnotaka-dot-pi](https://github.com/Itsnotaka/dot-pi) | Pi agent configuration, extensions, skills, and themes |  | 2mo ago |
| [ivanvza-pi-reepl](https://github.com/ivanvza/pi-reepl) | Pi agent REPL env for effective RLM |  | 25d ago |
| [Jabbslad-pi-shimmer](https://github.com/Jabbslad/pi-shimmer) | 🌈 Rainbow shimmer spinner with Claude Code verbs for Pi coding agent |  | ~1mo ago |
| [jakobwinkler-pi-plauder](https://github.com/jakobwinkler/pi-plauder) | Wake word triggered STT for pi coding agent |  | 16d ago |
| [jamarchist-pi-extensions](https://github.com/jamarchist/pi-extensions) | Extensions I use for the Pi (pi.dev) agent harness |  | 6d ago |
| [JaskoCoder-pi-agent-setup](https://github.com/JaskoCoder/pi-agent-setup) | Full pi coding agent setup — extensions, skills, themes, agents, model router — ready for VPS deployment |  | 18d ago |
| [jbenzaquen42-Benzpi](https://github.com/jbenzaquen42/Benzpi) | My personal pi coding agent configuration - skills and extensions |  | 2mo ago |
| [je-boska-pi-compact-tools](https://github.com/je-boska/pi-compact-tools) | Pi coding agent extension to render tool calls more compactly. |  | 27d ago |
| [je-boska-pi-subagents](https://github.com/je-boska/pi-subagents) | Basic subagents extension for Pi coding agent. |  | 17d ago |
| [je-boska-pi-vscode-file-context](https://github.com/je-boska/pi-vscode-file-context) | Extension providing Pi agent with context from VS Code active tab & selection. |  | 17d ago |
| [jeanfbrito-agentic-pi](https://github.com/jeanfbrito/agentic-pi) | Agentic Workflow Framework for pi — Orchestrator-by-default + 8 specialized subagents + 5 slash commands. Pi port of jeanfbrito's Claude Code framework. |  | ~1mo ago |
| [jemavidev-PiCA](https://github.com/jemavidev/PiCA) | PiCA (Pi Coding Agent) is an advanced multi-agent framework that orchestrates specialized agents to deliver comprehensive code solutions. It combines analysis, design, generation, and validation in a  |  | 9d ago |
| [JerryAZR-pi-meow](https://github.com/JerryAZR/pi-meow) | Pi coding agent extension that checks if the agent ends every message with 'meow' — a canary for context overflow |  | ~1mo ago |
| [JerryAZR-pi-more-models](https://github.com/JerryAZR/pi-more-models) | Extra model providers for the pi coding agent |  | 10d ago |
| [jerryfan-pi-download](https://github.com/jerryfan/pi-download) | Pi extension: /dl downloads YouTube video/audio/subtitles and emits an exact-word transcript bundle. |  | ~1mo ago |
| [jeryjs-pi-unify-provider](https://github.com/jeryjs/pi-unify-provider) | [WIP] Powerful Multi-provider LLM management for Pi with automatic model discovery |  | 6d ago |
| [JGrubb-pi-grafana-extension](https://github.com/JGrubb/pi-grafana-extension) | Grafana/Prometheus tools extension for the pi coding agent |  | 2mo ago |
| [jimiryquai-pi-agent](https://github.com/jimiryquai/pi-agent) | Pi agent configuration - skills, agents, extensions, and scripts |  | ~1mo ago |
| [jjuel-pi-mimir](https://github.com/jjuel/pi-mimir) | A Pi Coding Agent extension for deep research |  | ~1mo ago |
| [jkuball-pi-senses](https://github.com/jkuball/pi-senses) | sloppy senses for your pi (on macOS) |  | ~1mo ago |
| [JNRuan-pi-recap](https://github.com/JNRuan/pi-recap) | A small extension to provide a recap of agent sessions in Pi Coding Agent. |  | 11d ago |
| [joe5saia-pi-amp-agents](https://github.com/joe5saia/pi-amp-agents) | Pi extension that loads Amp-compatible AGENTS.md guidance, @mentions, and documentation globs. |  | ~1mo ago |
| [joelazar-pi-nvim](https://github.com/joelazar/pi-nvim) | Open Neovim from pi. Snacks git picker on dirty repos, agent-review.nvim export bridge to the prompt. |  | 18d ago |
| [joeldevz-skynex-pi](https://github.com/joeldevz/skynex-pi) | Skynex on Pi — programmable multi-agent coding harness for engineering teams. Built on pi.dev with TypeScript extensions, model routing, and real enforcement hooks. |  | 5d ago |
| [johansja-pi-extensions](https://github.com/johansja/pi-extensions) | Various extensions for pi coding agent |  | 3d ago |
| [john-marinelli-pi-advisor](https://github.com/john-marinelli/pi-advisor) | A read-only coding agent extension for pi to advise and plan with you.  |  | ~1mo ago |
| [john-marinelli-subdude](https://github.com/john-marinelli/subdude) | A read-only coding agent extension for pi to advise and plan with you. |  | 5d ago |
| [Jomik-pi-ward](https://github.com/Jomik/pi-ward) | File access guard for the pi coding agent — declarative filesystem boundaries. |  | today |
| [jontstaz-pi-kiwifs-extension](https://github.com/jontstaz/pi-kiwifs-extension) | Pi Coding Agent Extension for Kiwifs |  | 4d ago |
| [Joselay-pi-agent-config](https://github.com/Joselay/pi-agent-config) |  |  | 10d ago |
| [JosiahEverson-pi-coding-agent-extensions](https://github.com/JosiahEverson/pi-coding-agent-extensions) |  |  | 7d ago |
| [josorio7122-pi-packages](https://github.com/josorio7122/pi-packages) | Pi coding agent extensions and packages |  | 2mo ago |
| [josorio7122-pi-tasks](https://github.com/josorio7122/pi-tasks) | A task tool for pi agents — session-scoped tasks with a live above-editor widget and compact tool output |  | 7d ago |
| [josorio7122-pi-teams](https://github.com/josorio7122/pi-teams) | Multi-team agentic orchestration extension for pi |  | ~1mo ago |
| [jrswab-pivi](https://github.com/jrswab/pivi) | A vim keybinding extension for the Pi coding agent harnes. |  | 10d ago |
| [jtopjian-pi-codegraph](https://github.com/jtopjian/pi-codegraph) | codegraph extension for the Pi coding agent |  | 4d ago |
| [juanrgon-pi-thinktank](https://github.com/juanrgon/pi-thinktank) | Thinktank Room Extension for Pi Coding Agent |  | 4d ago |
| [justbee-pi-extensions](https://github.com/justbee/pi-extensions) | justbee's pi coding agent extensions |  | 8d ago |
| [justin-handsman-devrev-pi-gui](https://github.com/justin-handsman-devrev/pi-gui) | Tauri v2 desktop GUI for the pi coding agent (Claude Code / Codex style) |  | yesterday |
| [jwafle-pi-todos](https://github.com/jwafle/pi-todos) | todos extension for pi agent |  | 3mo ago |
| [jwayong-pi-azure-devops](https://github.com/jwayong/pi-azure-devops) | Azure DevOps integration for Pi coding agent — work items, pipelines, repos, and more |  | 10d ago |
| [jxonas-pi-web-search](https://github.com/jxonas/pi-web-search) | Pi extension package providing web_search and web_fetch tools powered by the Perplexity API. |  | 3mo ago |
| [k1000-pi-archivist](https://github.com/k1000/pi-archivist) | Pi extension package: pi-archivist |  | 16d ago |
| [k1000-pi-battler](https://github.com/k1000/pi-battler) | Pi extension package: pi-battler |  | 16d ago |
| [k1lgor-pi-memoir](https://github.com/k1lgor/pi-memoir) | Pi-memoir builds a structured knowledge base of your project. |  | 26d ago |
| [k3-2o-pi-k2](https://github.com/k3-2o/pi-k2) | k3-2o's pi coding agent extensions, themes, and skills |  | yesterday |
| [kalindalowermiddleclass3877-pi-qwen](https://github.com/kalindalowermiddleclass3877/pi-qwen) | Connect the pi coding agent to Qwen models with this OAuth provider extension for device-code login and request normalization. |  | 5d ago |
| [kaljr-kalpi](https://github.com/kaljr/kalpi) | Personal plugin for pi coding agent |  | 2mo ago |
| [karlis-vagalis-pi-lib](https://github.com/karlis-vagalis/pi-lib) | A custom set of pi coding agent extensions and related config |  | 11d ago |
| [katya4oyu-stackchan-ghost](https://github.com/katya4oyu/stackchan-ghost) | Local-first persona and memory definition for running StackChan conversations through pi-coding-agent sessions. |  | 28d ago |
| [keith-vs-kev-reins](https://github.com/keith-vs-kev/reins) | Pi extension for agent guardrails and orchestration |  | 3mo ago |
| [KenMacD-pi-extensions](https://github.com/KenMacD/pi-extensions) | My personal Pi agent configuration |  | ~1mo ago |
| [KennFatt-pi-explicit-skill-reasoning-effort](https://github.com/KennFatt/pi-explicit-skill-reasoning-effort) | A small Pi coding agent extension to respect explicit `reasoning-effort` from the loaded `SKILL.md`. |  | ~1mo ago |
| [kermans1988-eng-pi-statusline](https://github.com/kermans1988-eng/pi-statusline) | Custom statusline extension for Pi Coding Agent |  | 19d ago |
| [kesor-pi-workflow-insights](https://github.com/kesor/pi-workflow-insights) | A pi-coding-agent extension that tracks workflow patterns, scores productivity, and surfaces actionable insights |  | ~1mo ago |
| [kevin-pics-pi-extensions](https://github.com/kevin-pics/pi-extensions) | Custom extensions for Pi Agent. |  | yesterday |
| [kevinriverrrr-sudo-prismovit-ai](https://github.com/kevinriverrrr-sudo/prismovit-ai) | ◆ Prismovit AI — The ultimate multi-provider AI coding agent CLI. Interactive TUI, web interface, MCP support, 30+ LLM providers. Inspired by OpenCode + Pi + OpenClaude. |  | 15d ago |
| [kevinsimper-pi-extensions](https://github.com/kevinsimper/pi-extensions) | Two extensions for pi-coding-agent: read-folder (auto-load directory contents) and user-input (token counter footer) |  | 26d ago |
| [kexar007-pi-ssh-link](https://github.com/kexar007/pi-ssh-link) | Persistent SSH bridge for Pi coding agent |  | 10d ago |
| [kexul-pi-everything-search](https://github.com/kexul/pi-everything-search) | Everything search extension for pi coding agent - lightning fast file search on Windows |  | ~1mo ago |
| [kingkillery-pi-config](https://github.com/kingkillery/pi-config) | Pi coding agent profile configurations and extensions |  | 16d ago |
| [kirang89-pi-interactive-form](https://github.com/kirang89/pi-interactive-form) | A pi coding agent extension that provides a tabbed form interface for gathering structured user input |  | 2mo ago |
| [kksimons-pi-config](https://github.com/kksimons/pi-config) | pi coding agent config, extensions, and skills |  | 3mo ago |
| [KotDath-absolute-pi-nema](https://github.com/KotDath/absolute-pi-nema) | My pi agent extensions pack |  | 23d ago |
| [kristianernst-piui](https://github.com/kristianernst/piui) | webui for pi agent |  | 9d ago |
| [KristjanPikhof-pi-yaml-hooks](https://github.com/KristjanPikhof/pi-yaml-hooks) |   YAML hook automation for the PI coding agent: tool guards, session hooks, prompts, notifications, and bash actions. |  | ~1mo ago |
| [kschltz-pi-oac](https://github.com/kschltz/pi-oac) | OpenAgents Control (OAC) — plan-first, context-aware workflow with approval gates for the pi coding agent |  | ~1mo ago |
| [ktappdev-fresh-reads](https://github.com/ktappdev/fresh-reads) | A Pi coding agent extension that prevents stale file edits by ensuring files are re-read before modification if they have changed since the last read operation. |  | 3mo ago |
| [kukareku6341-piclaw](https://github.com/kukareku6341/piclaw) | Provide a Docker-based sandbox to run the Pi Coding Agent with a web UI, persistent sessions, task scheduling, and optional WhatsApp integration. |  | 25d ago |
| [kuyavinny-pi-planning-with-files](https://github.com/kuyavinny/pi-planning-with-files) | Pi-native adaptation of planning-with-files — extension + skill for durable task planning in Pi Coding Agent |  | 24d ago |
| [LabidySabidy-pi-agent-harness](https://github.com/LabidySabidy/pi-agent-harness) |  |  | 20d ago |
| [lallenlowe-pi-agent-shell](https://github.com/lallenlowe/pi-agent-shell) | High-performance interactive shell extension for pi — OS-level read-block detection, single turn() primitive, no polling |  | 19d ago |
| [lalomts-poe-pi](https://github.com/lalomts/poe-pi) | Pi coding agent extension: Poe's OpenAI-compatible API with Sign in with Poe OAuth and reasoning support (Claude Opus 4.7, GPT-5.4). |  | ~1mo ago |
| [landermkerbey-pi-azure-foundry](https://github.com/landermkerbey/pi-azure-foundry) | Azure Foundry-hosted LLM support for the Pi coding agent |  | 2mo ago |
| [last-sociable-orange-pi-extensions](https://github.com/last-sociable-orange/pi-extensions) | Custom pi coding agent extensions |  | 5d ago |
| [leandrocabrera-aerolab-pi-skillsmp](https://github.com/leandrocabrera-aerolab/pi-skillsmp) | SkillsMP extension for pi coding agent |  | ~1mo ago |
| [leblancfg-pi-hud](https://github.com/leblancfg/pi-hud) | Bird's-eye view orchestrator for Pi coding agent sessions |  | 3mo ago |
| [leing2021-pi-mgrep](https://github.com/leing2021/pi-mgrep) | Unified search extension for Pi Coding Agent — ripgrep + mgrep + DuckDuckGo fallback |  | 20d ago |
| [leninkhaidem-pi-agents](https://github.com/leninkhaidem/pi-agents) | First-class subagents for pi |  | ~1mo ago |
| [leninkhaidem-pi-ask-user-question](https://github.com/leninkhaidem/pi-ask-user-question) | Clean, Claude Code-style ask_user tool for pi-coding-agent — bottom-anchored, markdown context, numbered options with cursor navigation |  | 27d ago |
| [leninkhaidem-pi-crew](https://github.com/leninkhaidem/pi-crew) | Sub-agent extension for pi (private; under verification) |  | 25d ago |
| [leninkhaidem-pi-notify](https://github.com/leninkhaidem/pi-notify) | Pi extension — notification sound when agent runs complete |  | 28d ago |
| [lenstr-pi-rich-terminal-ui](https://github.com/lenstr/pi-rich-terminal-ui) | Pi extension: render rich terminal UI specs including charts, dashboards, tables, metrics, and diagrams |  | 29d ago |
| [leohenon-pi-claude-agent-sdk](https://github.com/leohenon/pi-claude-agent-sdk) | pi extension that uses Claude Agent SDK for inference while pi executes tools |  | ~1mo ago |
| [LeonardoDaviti-pi-stuff](https://github.com/LeonardoDaviti/pi-stuff) | My personal collection of skills, extensions, themes and tool for pi agent. |  | 7d ago |
| [leonj1-pi-devboxer](https://github.com/leonj1/pi-devboxer) | pi extension that wraps the DevBoxer CLI as LLM-callable tools |  | ~1mo ago |
| [lhl-pi-vertex](https://github.com/lhl/pi-vertex) | Google Vertex AI provider for Pi coding agent - forked from ssweens/pi-packages with tests and CI |  | 5d ago |
| [LightningBerk-vspi](https://github.com/LightningBerk/vspi) | VSCode(ium) integration for the Pi agent harness |  | ~1mo ago |
| [Litee-pi-extensions](https://github.com/Litee/pi-extensions) | Personal collection of extensions for Pi Agent |  | 11d ago |
| [liveinknewgithub-stardew-valley](https://github.com/liveinknewgithub/stardew-valley) | Stardew Valley-inspired terminal farming game — a pi coding agent extension |  | 3mo ago |
| [LLMpsycho-pi-anthropic-proxy](https://github.com/LLMpsycho/pi-anthropic-proxy) | Pi coding agent extension: route the built-in Anthropic provider through a local proxy (DroidProxy etc.) |  | 13d ago |
| [lostsock1-pi-groupchat](https://github.com/lostsock1/pi-groupchat) | Multi-agent Telegram group chat extension for pi coding agent — AI personas share one bot token, use pi's existing LLM providers |  | 8d ago |
| [louiss0-pi-packages](https://github.com/louiss0/pi-packages) | Packages for Pi - extensions, skills, prompts, and related resources. |  | today |
| [Lpaydat-pi-cymbal](https://github.com/Lpaydat/pi-cymbal) | Pi extension exposing cymbal (tree-sitter codebase indexer) as agent-facing code exploration tools |  | 13d ago |
| [Lpaydat-pi-undoredo](https://github.com/Lpaydat/pi-undoredo) | Undo/redo for Pi Coding Agent — /undo with editor prefill, /redo with redo stack |  | 4d ago |
| [Luan-Vn4-pi-mode](https://github.com/Luan-Vn4/pi-mode) | Pi Coding Agent extension to add Cursor based modes. |  | yesterday |
| [lucas-stellet-pi-os](https://github.com/lucas-stellet/pi-os) | pi-os is a workbench for the Pi coding agent. |  | 12d ago |
| [lucaspressi-pikit-engineer](https://github.com/lucaspressi/pikit-engineer) | 🛠️ Engineering orchestration pack for pi coding agent |  | 3mo ago |
| [LucianoLupo-pi-deep-research](https://github.com/LucianoLupo/pi-deep-research) | Deep research extension for pi coding agent - search, extract, and cache web content |  | 3mo ago |
| [LuckyCurve-pi-extensions](https://github.com/LuckyCurve/pi-extensions) | Personal extensions for pi-coding-agent: layered permission control for bash/file operations and real-time token rate monitoring. |  | 24d ago |
| [lukas8219-pi-config](https://github.com/lukas8219/pi-config) | pi.dev agents configs, extensios and etc |  | 2mo ago |
| [lukasl-dev-pi-openai](https://github.com/lukasl-dev/pi-openai) | OpenAI-related extensions for the people of pi. |  | 28d ago |
| [lukaspanni-pi-package-template](https://github.com/lukaspanni/pi-package-template) | Template for pi packages with extensions, skills, prompts, themes, TypeScript, and npm publishing |  | ~1mo ago |
| [LuoAndOrder-pi-ask-user-question](https://github.com/LuoAndOrder/pi-ask-user-question) | Claude-style ask_user_question tool for pi-coding-agent |  | 16d ago |
| [lutfi-zain-pi-nvidia-extension](https://github.com/lutfi-zain/pi-nvidia-extension) | NVIDIA NIM provider extension for pi-coding-agent with /login support |  | ~1mo ago |
| [luxus-pi-xai-text](https://github.com/luxus/pi-xai-text) | Pi extension for xAI / Grok (Responses API + native OAuth for Grok Build / Coding Plan). Full multi-agent, tools, reasoning, and binary-free auth. |  | 10d ago |
| [MadhavM-117-pi-config](https://github.com/MadhavM-117/pi-config) | Local Configuration for the pi coding agent. |  | 3mo ago |
| [magnusrodseth-pi-extensions](https://github.com/magnusrodseth/pi-extensions) | Delightful extensions for the pi coding agent |  | 10d ago |
| [majesticlabs-dev-pi-minimax_image](https://github.com/majesticlabs-dev/pi-minimax_image) | MiniMax image generation for the pi coding agent |  | ~1mo ago |
| [majido-pi-extensions](https://github.com/majido/pi-extensions) | Personal Pi Agent Extension |  | 3d ago |
| [manifestdocs-manifest-pi](https://github.com/manifestdocs/manifest-pi) | Manifest integration for Pi coding agent |  | 2mo ago |
| [ManuelSelch-pi-agent-extension-flow](https://github.com/ManuelSelch/pi-agent-extension-flow) | developer flow extension for pi ai agent |  | 3mo ago |
| [manusajith-pi-amnesia](https://github.com/manusajith/pi-amnesia) | Cross-agent session analytics for Pi, Claude Code, and Codex with semantic search powered by Turso vectors. |  | 2mo ago |
| [manusajith-pi-jj-agents](https://github.com/manusajith/pi-jj-agents) | A pi package for managed pi agent runs tied to jj work items |  | 2mo ago |
| [manusajith-pi-jj-dashboard](https://github.com/manusajith/pi-jj-dashboard) | A pi package for shared-registry dashboard views across jj work items |  | 2mo ago |
| [manusajith-pi-jj-review](https://github.com/manusajith/pi-jj-review) | A pi package for fast jj workspace creation and multi-model code review |  | 2mo ago |
| [manusajith-pi-jj-workspaces](https://github.com/manusajith/pi-jj-workspaces) | A pi package for jj workspace lifecycle management backed by shared suite state |  | 2mo ago |
| [maphim-pi-monk](https://github.com/maphim/pi-monk) | 🧘 pi coding agent extension — AAAK compress + austerity directives. 0 API cost. |  | 19d ago |
| [mason4agents](https://www.npmjs.com/package/mason4agents) | Mason Registry powered tool installer for coding agents. |  | yesterday |
| [masta-g3-pi-sessions](https://github.com/masta-g3/pi-sessions) | Tmux-powered session manager for the Pi coding agent. |  | 21d ago |
| [matthew-oconnell-pi-context-viz](https://github.com/matthew-oconnell/pi-context-viz) | Context window visualizer extension for the pi coding agent — shows token breakdown by segment in a live footer and overlay |  | 26d ago |
| [matthew-oconnell-pi-learning-extensions](https://github.com/matthew-oconnell/pi-learning-extensions) | pi coding agent extensions — learning the extension API |  | 23d ago |
| [maximekuntz-pi-train-yard](https://github.com/maximekuntz/pi-train-yard) | Extension for Pi coding agent that make a train run while agent is working |  | 12d ago |
| [maxmalkin-pi-OTEL](https://github.com/maxmalkin/pi-OTEL) | OpenTelemetry harness for the Pi coding agent. |  | 21d ago |
| [maxsumrall-pi-review](https://github.com/maxsumrall/pi-review) | Simplified flows for starting code reviews for Pi coding agent |  | 3mo ago |
| [MeatyAri-pi-agents](https://github.com/MeatyAri/pi-agents) | Personal AI agents for language learning, productivity, and everyday tasks |  | 21d ago |
| [menchauser-pi-kagi-extension](https://github.com/menchauser/pi-kagi-extension) | An extension and skill to use Kagi from Pi Coding Agent. Fully vibecoded |  | 3d ago |
| [merlinbr-pi-agent-notify](https://github.com/merlinbr/pi-agent-notify) | Notifications for the Pi coding agent via Discord webhooks, with support for task-finished and attention-needed alerts. |  | 22d ago |
| [mevech-my-pi-ext](https://github.com/mevech/my-pi-ext) | pi coding agent extensions |  | 6d ago |
| [mimicinnamonster-pi-discord](https://github.com/mimicinnamonster/pi-discord) | Standalone Discord bot for pi coding agent |  | 13d ago |
| [mjbmarques-pi-agent-extensions](https://github.com/mjbmarques/pi-agent-extensions) | Pi extensions I created |  | 6d ago |
| [mlanza-pi-synapse-link](https://github.com/mlanza/pi-synapse-link) | A pi extension that expands wikilinks in your prompts into second-brain context from Logseq. |  | 29d ago |
| [mogassama-pi-agent-config](https://github.com/mogassama/pi-agent-config) | Personal configuration, prompts, skills and extensions for PI coding agent |  | 13d ago |
| [MohammadErfan-Jabbari-pi-session-inspect](https://github.com/MohammadErfan-Jabbari/pi-session-inspect) | Read-only Pi extension for session discovery, search, and normalized session inspection |  | ~1mo ago |
| [monochromatti-pi-extensions](https://github.com/monochromatti/pi-extensions) | Extensions for the pi coding agent |  | today |
| [MonsieurBarti-bartis-coding-agent](https://github.com/MonsieurBarti/bartis-coding-agent) | Personal Minions-lite: Discord → Pi Agent → Tested PR. Project-agnostic coding pipeline built on Pi extensions + Gas Town + code-graph. |  | 3mo ago |
| [mooming-PiExtensions](https://github.com/mooming/PiExtensions) | A collection of useful extensions for Pi Coding Agent |  | today |
| [moricef-pi-agent-config](https://github.com/moricef/pi-agent-config) | pi-coding-agent configuration: model tiers, smart router, custom providers |  | ~1mo ago |
| [moritz-epeak-pi-speak](https://github.com/moritz-epeak/pi-speak) | Text-to-speech for Pi coding agent. ~90ms latency, 8 voices, self-contained pi package. |  | today |
| [msaguindang-pi-dev](https://github.com/msaguindang/pi-dev) | Personal configuration for my Pi Coding Agent |  | 14d ago |
| [mushrowan-pi-extensions](https://github.com/mushrowan/pi-extensions) | extensions for pi coding agent |  | 3mo ago |
| [mwamodo-pi-tinker](https://github.com/mwamodo/pi-tinker) | pi coding agent commands, skills, extensions, and themes |  | 6d ago |
| [MysticalDevil-pi-config](https://github.com/MysticalDevil/pi-config) | pi coding agent config — extensions, agents, workflow prompts, themes |  | 2d ago |
| [na-navi-permes](https://github.com/na-navi/permes) | Hermes CLI extension for pi-coding-agent — ask any model via /hermes command with autonomous review |  | 6d ago |
| [naranyala-pi-ext-c-programming-companion](https://github.com/naranyala/pi-ext-c-programming-companion) | The C-Programming Companion is a specialized extension for the pi coding agent designed to accelerate the development, debugging, and refactoring of C and C++ codebases. It provides a suite of profess |  | 25d ago |
| [naranyala-pi-ext-companion-for-c-programming](https://github.com/naranyala/pi-ext-companion-for-c-programming) | The C-Programming Companion is a specialized extension for the pi coding agent designed to accelerate the development, debugging, and refactoring of C and C++ codebases. It provides a suite of profess |  | 20d ago |
| [naranyala-pi-ext-companion-for-system-ffi](https://github.com/naranyala/pi-ext-companion-for-system-ffi) | The Pi-Mono FFI Companion is a high-performance extension for the pi ecosystem. It bridges the gap between high-level AI coding and low-level system programming by giving the agent "environmental cons |  | 20d ago |
| [naranyala-pi-ext-prompt-clarity-with-multistep-form-or-options](https://github.com/naranyala/pi-ext-prompt-clarity-with-multistep-form-or-options) | is a powerful extension for the Pi coding agent that prevents "guessing" and reduces hallucinations by providing a structured, interactive framework for resolving ambiguity. Instead of the agent makin |  | 22d ago |
| [naranyala-pi-ext-prompt-grammar-correction](https://github.com/naranyala/pi-ext-prompt-grammar-correction) | An intelligent, real-time grammar and style assistant for the pi coding agent. This extension improves the quality of user prompts, enhances professional communication, and optimizes prompt engineerin |  | 29d ago |
| [nathanstephenson-pi-agents-view](https://github.com/nathanstephenson/pi-agents-view) | Pi extension that adds an agents view accessible with pi --agents or /agents |  | 6d ago |
| [nayeemzen-pi-adversary](https://github.com/nayeemzen/pi-adversary) | Structured advocate/adversary debate chat mode for the pi coding agent — two isolated LLM sessions, live streaming, full markdown rendering, session persistence. |  | ~1mo ago |
| [ndraiman-pi-extensions](https://github.com/ndraiman/pi-extensions) | Personal pi-coding-agent extensions |  | 25d ago |
| [need-singularity-hive](https://github.com/need-singularity/hive) | pi-agent-core based fork — AI agent swarm (hive) |  | 28d ago |
| [neevparikh-pi-subagent](https://github.com/neevparikh/pi-subagent) | Subagent extension for pi - delegate tasks to specialized agents running in isolated pi processes |  | ~1mo ago |
| [Neonotso-pi-agent-web](https://github.com/Neonotso/pi-agent-web) | Web interface for the Pi coding agent with multi-session sidebar and PWA support for iPhone/Mac |  | 14d ago |
| [neuchatech-recurso](https://github.com/neuchatech/recurso) | Agent-to-agent orchestration for Pi. |  | yesterday |
| [ni3do-pi-remote-agent](https://github.com/ni3do/pi-remote-agent) | Run a pi coding agent on your server, talk to it via Discord, Slack, or web UI |  | 3mo ago |
| [nice-hang-pi-trace](https://github.com/nice-hang/pi-trace) | Agent tracing toolkit — capture, inspect, and replay pi-agent runs |  | 25d ago |
| [NicolasMontone-pi-engineer](https://github.com/NicolasMontone/pi-engineer) | Remote OSS coding harness for pi-mono. Spin up an isolated coding agent against your repos via a programmatic TypeScript SDK. |  | 15d ago |
| [nielpattin-.pi-tnega](https://github.com/nielpattin/.pi-tnega) | Pi agent setup |  | 27d ago |
| [niketansrane-pi-extensions](https://github.com/niketansrane/pi-extensions) | Pi coding agent extensions — OAuth 2.0 learning tools and more |  | ~1mo ago |
| [Ninthless-Tau](https://github.com/Ninthless/Tau) | Tau UI, a desktop workspace for the Pi Coding Agent |  | 3d ago |
| [noahlessard-.pi](https://github.com/noahlessard/.pi) | My personal configuration for the Pi coding agent. Uses a personal ollama server on a VPN (no leaked creds here) |  | ~1mo ago |
| [noppej-pi-vscode-gui](https://github.com/noppej/pi-vscode-gui) | GUI experience for the popular Pi Coding Agent |  | 19d ago |
| [noxmoriens-pi-heimdall](https://github.com/noxmoriens/pi-heimdall) | Full blown pi agents extensions, this is my personal pi agents extensions cover all of my workflows |  | 4d ago |
| [nstfn-pi-rtk-rewrite](https://github.com/nstfn/pi-rtk-rewrite) | Port of rtk rewrite claude hook for pi coding agent as an extension. |  | 3mo ago |
| [ocfmem-pi-extension-context7](https://github.com/ocfmem/pi-extension-context7) | My pi agent extension to use context7 |  | 20d ago |
| [ocfmem-pi-extension-notion](https://github.com/ocfmem/pi-extension-notion) | My implementation of Notion extension for pi-agent. |  | 20d ago |
| [offline-ant-pi-ant](https://github.com/offline-ant/pi-ant) | Ant's local pi extension package |  | 3d ago |
| [OleMussmann-pi-extension-plan-mode-default](https://github.com/OleMussmann/pi-extension-plan-mode-default) | pi coding agent starting in plan mode as a default |  | 7d ago |
| [omegon-pi](https://www.npmjs.com/package/omegon-pi) | An opinionated distribution of pi, the coding agent. Extensions for project memory, spec-driven development, local LLM inference, parallel task decomposition, and more. |  | 2mo ago |
| [omrikiei-pi-configs](https://github.com/omrikiei/pi-configs) | Personal pi coding agent configurations, extensions, and customizations |  | 14d ago |
| [oncrawl-mcp-pi-extension](https://www.npmjs.com/package/oncrawl-mcp-pi-extension) | Extension for Pi Coding Agent to access Oncrawl SEO tool |  | ~1mo ago |
| [oneopane-pi-extensions](https://github.com/oneopane/pi-extensions) | extensions for pi agent |  | 5d ago |
| [onetool-pi](https://www.npmjs.com/package/onetool-pi) | 🧿 Pi coding agent extension — the ultimate MCP bridge with 100+ tools including Brave, Google, Context7, Excalidraw, AWS, Excel, File Ops, Database, Playwright, Chrome DevTools and many more |  | 3mo ago |
| [openmyna-extension](https://www.npmjs.com/package/openmyna-extension) | Pi Coding Agent extension for OpenMyna agent-to-agent messaging (E2EE, discovery, manifests) |  | today |
| [oray749616-smart-search-pi-extension](https://github.com/oray749616/smart-search-pi-extension) | Pi Coding Agent extension for the smart-search CLI. |  | 12d ago |
| [pabloflores465-pi-extensions](https://github.com/pabloflores465/pi-extensions) | Custom extensions for pi coding agent |  | 28d ago |
| [pandysp-pi-mcp-server](https://github.com/pandysp/pi-mcp-server) | MCP server wrapping the Pi coding agent as tools |  | 3mo ago |
| [parmalla-pi-coding-agent-skills](https://github.com/parmalla/pi-coding-agent-skills) | Skills for pi coding agent |  | today |
| [pcaro-pcaropi](https://github.com/pcaro/pcaropi) | Skills, extensions, and themes for the Pi coding agent |  | 3d ago |
| [pebaryan-pi-ranoid](https://github.com/pebaryan/pi-ranoid) | pi-tool-interceptor extension for pi-coding-agent |  | 25d ago |
| [pedrozadotdev-pi-fallow](https://github.com/pedrozadotdev/pi-fallow) | Pi coding agent extension for Fallow |  | 16d ago |
| [pedrozadotdev-pi-gemini-cli](https://github.com/pedrozadotdev/pi-gemini-cli) | Gemini CLI integration for Pi Coding Agent |  | 5d ago |
| [peektism-pi-zsh](https://github.com/peektism/pi-zsh) | Allowlist-only zsh script runner extension for pi coding agents |  | 3mo ago |
| [PEMessage-pi-custom-provider-fireworksai](https://github.com/PEMessage/pi-custom-provider-fireworksai) | Pi Agent Fireworks AI provider |  | ~1mo ago |
| [penniey-pi-paste-image](https://github.com/penniey/pi-paste-image) | Paste clipboard images into pi conversations |  | 29d ago |
| [perezdap-pi-xai-grok-oauth](https://github.com/perezdap/pi-xai-grok-oauth) | xAI Grok OAuth provider for pi (SuperGrok / Premium subscription support) |  | 9d ago |
| [peteknowsai-pi-cell-memory](https://github.com/peteknowsai/pi-cell-memory) | Auto-memory + yearnings for Pi-driven Cell agents |  | 25d ago |
| [pgeske-pi-extensions](https://github.com/pgeske/pi-extensions) | Personal Pi extensions, skills, prompts, and themes lab |  | 2d ago |
| [pi-1password](https://www.npmjs.com/package/pi-1password) | Complete system for managing SSH keys and secrets using 1Password CLI with Pi coding agent integration. Features Service Account authentication, cascading environments, and SSH agent keychain. |  | 8d ago |
| [pi-a2a-communication](https://www.npmjs.com/package/pi-a2a-communication) | Enterprise-grade A2A protocol implementation for pi coding agent - enables multi-node, multi-agent collaboration |  | 2mo ago |
| [pi-acp](https://www.npmjs.com/package/pi-acp) | ACP adapter for pi coding agent |  | 12d ago |
| [pi-advisor](https://www.npmjs.com/package/pi-advisor) | Pi extension package that adds an advisor tool for strategic guidance during complex agent tasks. |  | 16d ago |
| [pi-afk](https://www.npmjs.com/package/pi-afk) | A Pi package extension that allows the agent to communicate with the user when they're afk. |  | 5d ago |
| [pi-agent-browser](https://www.npmjs.com/package/pi-agent-browser) | Browser automation tool for pi — interactive browsing, screenshots with inline vision, and session cleanup via agent-browser CLI |  | 4mo ago |
| [pi-agent-browser-native](https://www.npmjs.com/package/pi-agent-browser-native) | pi extension that exposes agent-browser as a native tool for browser automation |  | yesterday |
| [pi-agent-bus](https://www.npmjs.com/package/pi-agent-bus) | Agent orchestration runtime with MessageBus pub/sub coordination for the Pi coding agent ecosystem. Monorepo containing pi-agent-bus-node (core) and pi-agent-bus (Pi extension). |  | 8d ago |
| [pi-agent-extensions](https://www.npmjs.com/package/pi-agent-extensions) | Collection of extensions for pi coding agent (sessions, ask_user, handoff) |  | 28d ago |
| [pi-agent-flow](https://www.npmjs.com/package/pi-agent-flow) | Flow-state transition extension for Pi coding agent. |  | yesterday |
| [pi-agent-goal](https://www.npmjs.com/package/pi-agent-goal) | Pi extension that gives coding agents persistent /goal workflows with branch-aware state, source imports, progress tools, and explicit start handoffs. |  | 5d ago |
| [pi-agent-hub](https://www.npmjs.com/package/pi-agent-hub) | Tmux-powered session manager for the Pi coding agent. |  | 5d ago |
| [pi-agent-router](https://www.npmjs.com/package/pi-agent-router) | Pi extension for agent routing, active agent management, and subagent delegation rendering. |  | 3d ago |
| [pi-agent-squad](https://www.npmjs.com/package/pi-agent-squad) | Minimal fork-only subagent extension for Pi coding agent. |  | 28d ago |
| [pi-agent-suite](https://www.npmjs.com/package/pi-agent-suite) | Adds a configurable multi-agent layer to Pi Agent, with context management, MCP support, Codex quota status, a custom footer, and more. |  | 2d ago |
| [pi-agent-teams](https://www.npmjs.com/package/pi-agent-teams) | Claude Code agent teams style workflow for Pi. |  | 7d ago |
| [pi-agentarium](https://www.npmjs.com/package/pi-agentarium) | Ambient multi-agent observability for Pi — a terminal habitat for coding agents. |  | 29d ago |
| [pi-agentic-compaction](https://www.npmjs.com/package/pi-agentic-compaction) | Agentic conversation compaction extension for pi using a virtual filesystem and tool-driven exploration |  | ~1mo ago |
| [pi-agents](https://www.npmjs.com/package/pi-agents) | A generic framework for agent orchestration in pi. |  | 18d ago |
| [pi-agents-pool](https://www.npmjs.com/package/pi-agents-pool) | Codex-style multi-agent orchestration for pi |  | 2mo ago |
| [pi-alert](https://www.npmjs.com/package/pi-alert) | Pi extension that sends a system notification when the agent ends its turn. |  | 2mo ago |
| [pi-android-cli](https://www.npmjs.com/package/pi-android-cli) | Android CLI tools for pi — Gradle, ADB, Emulator, Logcat, Layout Inspector, and Android Knowledge Base integration. |  | 4d ago |
| [pi-animations](https://www.npmjs.com/package/pi-animations) | Animated thinking/working/tool indicators for pi coding agent — 21 terminal animations with ANSI true color and Nerd Font glyphs |  | 2mo ago |
| [pi-antigravity-quota](https://www.npmjs.com/package/pi-antigravity-quota) | Pi extension to check Google Cloud Code (Antigravity) model quotas. |  | 4mo ago |
| [pi-antigravity-rotator](https://www.npmjs.com/package/pi-antigravity-rotator) | Intelligent multi-account rotation proxy for Google Antigravity with per-model routing, real-time quota tracking, automatic token management, and infringement detection. |  | today |
| [pi-app-server](https://www.npmjs.com/package/pi-app-server) | Session multiplexer for pi-coding-agent — WebSocket + stdio, the protocol IS the architecture |  | 2mo ago |
| [pi-arcade-games](https://www.npmjs.com/package/pi-arcade-games) | Retro terminal arcade for Pi - play games while you wait for builds and tests |  | 4d ago |
| [pi-ask-me](https://www.npmjs.com/package/pi-ask-me) | A unique question/interview tool for pi coding agent with branched chats within the question interface |  | 3mo ago |
| [pi-ask-tool-extension](https://www.npmjs.com/package/pi-ask-tool-extension) | Ask tool extension package for pi |  | 22d ago |
| [pi-ask-user](https://www.npmjs.com/package/pi-ask-user) | Interactive decision-gating extension for pi — lets AI agents ask users questions with multiple-choice and freeform answers |  | 2d ago |
| [pi-auto-review](https://www.npmjs.com/package/pi-auto-review) | Automated project review for Pi — scans for problems, writes TODO.md, and optionally auto-fixes in bounded fix loops |  | 6d ago |
| [pi-autoname](https://www.npmjs.com/package/pi-autoname) | AI-powered session naming for Pi — generate meaningful, semantic session names via LLM |  | today |
| [pi-bash-readonly](https://www.npmjs.com/package/pi-bash-readonly) | Sandboxed read-only bash for Pi agents via bwrap |  | ~1mo ago |
| [pi-batch-tool](https://www.npmjs.com/package/pi-batch-tool) | Batch tool extension for Pi — unified file ops and parallel bash in a single call. |  | 17d ago |
| [pi-blackhole](https://www.npmjs.com/package/pi-blackhole) | Unified algorithmic compaction + observational memory for Pi. Merges pi-vcc and pi-observational-memory with fallback chains, cooldowns, and per-worker model config. |  | today |
| [pi-browser](https://www.npmjs.com/package/pi-browser) | Playwright-backed pi extension that registers the pi-browser tool |  | 5d ago |
| [pi-browser-cdp-extension](https://www.npmjs.com/package/pi-browser-cdp-extension) | A real-browser CDP execution extension for Pi agents. |  | 12d ago |
| [pi-browser-harness](https://www.npmjs.com/package/pi-browser-harness) | Browser control extension for pi — navigate, click, type, screenshot, and extract data from real Chrome via CDP |  | 18d ago |
| [pi-chutes](https://www.npmjs.com/package/pi-chutes) | A pi coding agent extension that provides access to models from Chutes.ai |  | 27d ago |
| [pi-claude-cli](https://www.npmjs.com/package/pi-claude-cli) | Pi coding agent extension that routes LLM calls through the Claude Code CLI |  | 2mo ago |
| [pi-claude-marketplace](https://www.npmjs.com/package/pi-claude-marketplace) | Access Claude plugin marketplaces from Pi Coding Agent. |  | today |
| [pi-cmdr](https://www.npmjs.com/package/pi-cmdr) | Commands for Pi coding agent. |  | 28d ago |
| [pi-cmux](https://www.npmjs.com/package/pi-cmux) | cmux-powered terminal workflows for Pi: notifications, split panes, zoxide jumps, review helpers, and handoff sessions. |  | today |
| [pi-code-graph](https://www.npmjs.com/package/pi-code-graph) | Native TypeScript extension for pi-coding-agent — code knowledge graphs for AI agents. Ported from code-graph-rag. |  | 3d ago |
| [pi-code-rollback](https://www.npmjs.com/package/pi-code-rollback) | Code & Conversation restore for Pi coding agent |  | ~1mo ago |
| [pi-codemode-extension](https://www.npmjs.com/package/pi-codemode-extension) | Pi extension that adds an exec tool for orchestrating Pi tools with JavaScript, plus a /codeMode command to toggle it. |  | 6d ago |
| [pi-codex-fast](https://www.npmjs.com/package/pi-codex-fast) | Fast mode toggle for OpenAI and Codex models in pi. |  | yesterday |
| [pi-codex-goal](https://www.npmjs.com/package/pi-codex-goal) | Codex-style goal tracking and continuation for pi. |  | today |
| [pi-codex-search](https://www.npmjs.com/package/pi-codex-search) | Search the web in Pi through your Codex subscription. |  | 2d ago |
| [pi-codex-status](https://www.npmjs.com/package/pi-codex-status) | ChatGPT Codex quota/status CLI and pi extension |  | 17d ago |
| [pi-commandcode-provider](https://www.npmjs.com/package/pi-commandcode-provider) | pi custom provider for the Command Code API — 18 models including Claude, GPT, DeepSeek, Kimi, GLM, MiniMax, and Qwen |  | 20d ago |
| [pi-commit-message](https://www.npmjs.com/package/pi-commit-message) | A pi extension that generates Conventional Commits messages from staged changes using AI. |  | 28d ago |
| [pi-compound](https://www.npmjs.com/package/pi-compound) | Turn your past Pi sessions into system-prompt context docs. A two-stage LLM pipeline extracts durable preferences from session transcripts; you approve or reject from a TUI; approved items are appende |  | ~1mo ago |
| [pi-comview](https://www.npmjs.com/package/pi-comview) | Pi package providing /review command powered by bundled comview binaries |  | 7d ago |
| [pi-constell-tasks](https://www.npmjs.com/package/pi-constell-tasks) | Inline / skill autocomplete for pi, so skills complete anywhere in the editor instead of only at command start. |  | 6d ago |
| [pi-context-injector](https://www.npmjs.com/package/pi-context-injector) | Pi extension that injects project context into first-turn prompts and compaction continuity messages. |  | 3d ago |
| [pi-context-tools](https://www.npmjs.com/package/pi-context-tools) | Pi extension exposing context info and compaction tools. Let agents control their own destiny! |  | 11d ago |
| [pi-context-viz](https://www.npmjs.com/package/pi-context-viz) | Interactive context window visualizer for pi — colored grid overlay with token breakdown, stats, and optimization suggestions |  | 3d ago |
| [pi-context-whisperer](https://www.npmjs.com/package/pi-context-whisperer) | Smart gradual auto-compaction for Pi — summarizes conversation mid-session before context limits hit, preserving key decisions |  | 3d ago |
| [pi-context-zone](https://www.npmjs.com/package/pi-context-zone) | Visual context health bar for the Pi coding agent — see your smart/warm/dumb zone at a glance |  | 2mo ago |
| [pi-conversation-retro](https://www.npmjs.com/package/pi-conversation-retro) | Pi extension that runs automated postmortem reviews on your coding agent conversations |  | 4mo ago |
| [pi-copy-user-message](https://www.npmjs.com/package/pi-copy-user-message) | pi extension that adds /copy-user to copy the most recent user message to your clipboard |  | yesterday |
| [pi-ctx-budget](https://www.npmjs.com/package/pi-ctx-budget) | Context window budget display for pi — /ctx-budget command + toggleable footer |  | 7d ago |
| [pi-cubing](https://www.npmjs.com/package/pi-cubing) | A cstimer-style Rubik's Cube timer overlay for Pi, with scrambles, averages, ratings, and local solve persistence. |  | 5d ago |
| [pi-cursor-agent](https://www.npmjs.com/package/pi-cursor-agent) | Leverages the power of frontier Coding Agents, empowering pi with their capabilities. |  | ~1mo ago |
| [pi-cursor-sdk](https://www.npmjs.com/package/pi-cursor-sdk) | Cursor SDK provider extension for pi, adding Cursor models to pi's native model picker. |  | today |
| [pi-cwd-guard](https://www.npmjs.com/package/pi-cwd-guard) | Small Pi safety extension for cwd access, protected paths, runtime config confirmation, and common destructive bash commands. |  | today |
| [pi-deepseek-balance-status](https://www.npmjs.com/package/pi-deepseek-balance-status) | Pi extension that shows your DeepSeek account balance in the status bar |  | today |
| [pi-deepseek-search](https://www.npmjs.com/package/pi-deepseek-search) | Web search for Pi using DeepSeek's server side search |  | today |
| [pi-defender](https://www.npmjs.com/package/pi-defender) | Defense-in-depth protection for Pi coding agent. Blocks dangerous commands and protects sensitive files via Pi extensions. |  | 6d ago |
| [pi-delegate](https://www.npmjs.com/package/pi-delegate) | Pi extension that adds one delegate tool for isolated child-agent tasks without polluting the main context. |  | 2d ago |
| [pi-delegate-tool](https://www.npmjs.com/package/pi-delegate-tool) | Delegate tool for Pi — fork of drsh4dow/pi-delegate |  | 17d ago |
| [pi-ding](https://www.npmjs.com/package/pi-ding) | pi extension that plays a configurable sound when the agent finishes |  | 4mo ago |
| [pi-discover-web](https://www.npmjs.com/package/pi-discover-web) | Anthropic web_search delegation discovery extension for the pi coding agent. Injects a single `discover` tool into the main model and delegates web research to a smaller Sonnet model via the user's ex |  | 11d ago |
| [pi-droid](https://www.npmjs.com/package/pi-droid) | Android phone control for pi-agent — 36 tools to see, touch, and automate any device via ADB |  | ~1mo ago |
| [pi-edit-hooks](https://www.npmjs.com/package/pi-edit-hooks) | Code quality hooks for the pi coding agent |  | 8d ago |
| [pi-edit-session-in-place](https://www.npmjs.com/package/pi-edit-session-in-place) | pi extension that lets you re-edit or delete an earlier user message in the current session branch |  | yesterday |
| [pi-elixir](https://www.npmjs.com/package/pi-elixir) | BEAM runtime tools for pi — connects to the running Elixir app via Tidewave |  | 13d ago |
| [pi-emacs-which-key](https://www.npmjs.com/package/pi-emacs-which-key) | Emacs-style prefix keys and which-key hints for Pi's interactive editor. |  | 4d ago |
| [pi-eurouter](https://www.npmjs.com/package/pi-eurouter) | EUrouter provider extension for pi coding agent |  | 4d ago |
| [pi-evalset-lab](https://www.npmjs.com/package/pi-evalset-lab) | pi extension for fixed-task-set eval runs and prompt/system comparisons with reproducible reports |  | 28d ago |
| [pi-event-monitor](https://www.npmjs.com/package/pi-event-monitor) | Adds background event monitors to pi coding agent sessions: watch shell output or file system changes, wake the session only on real events. |  | 13d ago |
| [pi-exa](https://www.npmjs.com/package/pi-exa) | Web search, deep research and fetch content tools for Pi Agent, powered by Exa. |  | today |
| [pi-exa-search](https://www.npmjs.com/package/pi-exa-search) | Exa-powered source discovery and search workflows for Pi. |  | 3mo ago |
| [pi-execution-time](https://www.npmjs.com/package/pi-execution-time) | Pi extension that shows live task execution time in the footer |  | 25d ago |
| [pi-extension-manager](https://www.npmjs.com/package/pi-extension-manager) | Enhanced UX for managing local Pi extensions and community packages |  | 8d ago |
| [pi-extension-wandb](https://www.npmjs.com/package/pi-extension-wandb) | pi coding agent extension that adds Weights & Biases Inference as a model provider |  | 4d ago |
| [pi-fancy-footer](https://www.npmjs.com/package/pi-fancy-footer) | A fancy footer extension for pi |  | 6d ago |
| [pi-fast-apply](https://www.npmjs.com/package/pi-fast-apply) | Morph Fast Apply extension package for Pi |  | today |
| [pi-feishu-lark](https://www.npmjs.com/package/pi-feishu-lark) | Feishu/Lark bridge for Pi coding agent — chat with Pi from Feishu or Lark |  | today |
| [pi-fff-non-ascii-guard](https://www.npmjs.com/package/pi-fff-non-ascii-guard) | Pi extension that detects and renames non-ASCII filenames before fff-core can panic on UTF-8 byte boundaries. |  | today |
| [pi-files-touched](https://www.npmjs.com/package/pi-files-touched) | Pi extensions |  | 7d ago |
| [pi-find-packages](https://www.npmjs.com/package/pi-find-packages) | Pi skill and CLI helper for finding installable Pi packages from npm. |  | today |
| [pi-footer-manager](https://www.npmjs.com/package/pi-footer-manager) | One footer, many extensions: build flexible Pi footers from reusable fragments with configurable layout and built-in fragments instead of competing `setFooter()` calls. `pi-footer-manager` lets one ex |  | yesterday |
| [pi-forge](https://www.npmjs.com/package/pi-forge) | Browser workbench for the pi coding agent. Reserved — see https://github.com/Devin-Marks/pi-workbench (rename in progress). |  | 20d ago |
| [pi-formatter](https://www.npmjs.com/package/pi-formatter) | Pi extension that auto-formats files after write/edit tool calls. |  | ~1mo ago |
| [pi-gemini-acp](https://www.npmjs.com/package/pi-gemini-acp) | Adds Gemini ACP tools for prompt, search, research, extraction, summarization, code review, translation, image analysis in Pi |  | 6d ago |
| [pi-git-assistant](https://www.npmjs.com/package/pi-git-assistant) | AI-powered git commit assistant for the Pi coding agent. Automatically analyzes diffs, manages git branches, writes conventional commit messages, and generates professional pull request descriptions. |  | 4d ago |
| [pi-git-commands-extension](https://www.npmjs.com/package/pi-git-commands-extension) | Pi extension package: AI-assisted /commit, /push, /commit-and-push, and GitHub PR /commit-pr slash commands that match your repo's commit style. |  | ~1mo ago |
| [pi-git-graph-sidebar](https://www.npmjs.com/package/pi-git-graph-sidebar) | VS Code Git Graph-style sidebar overlay for the Pi coding agent TUI |  | 8d ago |
| [pi-github](https://www.npmjs.com/package/pi-github) | GitHub extension package for Pi |  | 3mo ago |
| [pi-gitnexus](https://www.npmjs.com/package/pi-gitnexus) | GitNexus knowledge graph integration for the Pi coding agent |  | 17d ago |
| [pi-glm-ocr](https://www.npmjs.com/package/pi-glm-ocr) | Pi extension: Local OCR via Ollama GLM-OCR (0.9B) — convert images and PDFs to Markdown / LaTeX with high math formula accuracy. Bridges the multimodal gap for non-vision LLMs like DeepSeek. |  | yesterday |
| [pi-grok-build](https://www.npmjs.com/package/pi-grok-build) | Pi extension for delegating to xAI Grok Build with Pi-native lifecycle, artifacts, and safety controls. |  | today |
| [pi-harness](https://www.npmjs.com/package/pi-harness) | Build AI teams that work alongside yours -- accessible from your phone. |  | 17d ago |
| [pi-hashline-edit](https://www.npmjs.com/package/pi-hashline-edit) | A pi coding agent extension that overrides the built-in read, grep, and edit tools with content-anchored line references (LINE:HASH\|content). |  | 7d ago |
| [pi-hashline-readmap](https://www.npmjs.com/package/pi-hashline-readmap) | A unified pi-coding-agent extension combining hash-anchored file editing with structural code maps |  | today |
| [pi-hermes-memory](https://www.npmjs.com/package/pi-hermes-memory) | Hermes-style persistent memory and learning loop for Pi coding agent |  | 2d ago |
| [pi-hide-messages](https://www.npmjs.com/package/pi-hide-messages) | Pi extension for hiding older TUI chat history while preserving full session context, with /hide-messages and /restore-messages controls |  | 3d ago |
| [pi-hindsight-stats](https://www.npmjs.com/package/pi-hindsight-stats) | Hindsight memory analytics CLI — tags, entities, and bank statistics for Pi agent sessions |  | 7d ago |
| [pi-http-util](https://www.npmjs.com/package/pi-http-util) | HTTP utility functions for Pi Coding Agent |  | 6d ago |
| [pi-i18n](https://www.npmjs.com/package/pi-i18n) | LTR-only i18n/l10n platform for pi coding agent UI and extensions. Ships zh-TW first. |  | ~1mo ago |
| [pi-icm-hook](https://www.npmjs.com/package/pi-icm-hook) | Pi extension wrapping ICM (Infinite Context Memory) as native Pi tools and lifecycle hooks — semantic, cross-session, cross-project recall via the local icm CLI. |  | 4d ago |
| [pi-image-tools](https://www.npmjs.com/package/pi-image-tools) | Image attachment and rendering extension for Pi TUI |  | 3d ago |
| [pi-imagegen](https://www.npmjs.com/package/pi-imagegen) | Pi package for OpenAI/Codex subscription image generation with a local browser studio, batches, refs, and sketch inputs |  | 25d ago |
| [pi-interactive-shell](https://www.npmjs.com/package/pi-interactive-shell) | Pi coding agent extension that allows Pi to autonomously control interactive CLIs in an observable overlay. Full PTY emulation, no tmux, token efficient. User can take over anytime. |  | ~1mo ago |
| [pi-interview](https://www.npmjs.com/package/pi-interview) | Interactive form tool for pi-agent to gather user responses with keyboard navigation, themes, and image attachments |  | 24d ago |
| [pi-jj](https://www.npmjs.com/package/pi-jj) | Pi extension package for Jujutsu workflows |  | 3mo ago |
| [pi-karpathy-guidelines](https://www.npmjs.com/package/pi-karpathy-guidelines) | A Pi extension that enforces Andrej Karpathy's coding guidelines to reduce common LLM coding mistakes. |  | 28d ago |
| [pi-knowledge-search](https://www.npmjs.com/package/pi-knowledge-search) | Semantic search over local files for pi. Indexes text/markdown, watches for changes, exposes a knowledge_search tool to the LLM. |  | 10d ago |
| [pi-kota](https://www.npmjs.com/package/pi-kota) | KotaDB thin wrapper + context pruning extension for pi |  | 3mo ago |
| [pi-lance-mem](https://www.npmjs.com/package/pi-lance-mem) | Semantic memory extension for Pi with LanceDB backend |  | 3d ago |
| [pi-lazy-loader](https://www.npmjs.com/package/pi-lazy-loader) | Lazy-load pi-coding-agent extensions on first slash-command use. |  | 29d ago |
| [pi-libp2p-mesh](https://www.npmjs.com/package/pi-libp2p-mesh) | P2P mesh network extension for pi agents built on libp2p — peer discovery, direct messaging, and gossip broadcast. |  | yesterday |
| [pi-librarian](https://www.npmjs.com/package/pi-librarian) | GitHub research subagent package for pi coding agent |  | 18d ago |
| [pi-linear-worktree](https://www.npmjs.com/package/pi-linear-worktree) | Pi extension that fetches Linear issues and creates git worktrees to solve them |  | 2d ago |
| [pi-link](https://www.npmjs.com/package/pi-link) | A WebSocket-based inter-terminal communication system that creates a local network between multiple Pi coding agent terminals. Enables terminals to discover each other, exchange messages, and orchestr |  | 8d ago |
| [pi-loopsmith](https://www.npmjs.com/package/pi-loopsmith) | A pi extension that reviews coding-agent sessions and suggests workflow improvements. |  | 3d ago |
| [pi-lsp-extension](https://www.npmjs.com/package/pi-lsp-extension) | Pi coding agent extension for LSP integration — gives the LLM access to diagnostics, hover, go-to-definition, references, symbols, and rename |  | 11d ago |
| [pi-manage-todo-list](https://www.npmjs.com/package/pi-manage-todo-list) | VSCode Copilot Chat inspired structured todo list management for Pi — track multi-step work with live progress widgets and session persistence. |  | 25d ago |
| [pi-mcp-adapter](https://www.npmjs.com/package/pi-mcp-adapter) | Token-efficient MCP adapter for Pi coding agent |  | yesterday |
| [pi-mcp-bridge](https://www.npmjs.com/package/pi-mcp-bridge) | A minimal pi extension that exposes MCP server tools to pi via stdio transport. |  | 5d ago |
| [pi-memctx](https://www.npmjs.com/package/pi-memctx) | Local-first memory context for Pi coding agents. |  | 4d ago |
| [pi-memory-honcho](https://www.npmjs.com/package/pi-memory-honcho) | Honcho-backed persistent memory extension for PI coding agent |  | 7d ago |
| [pi-mermaid](https://www.npmjs.com/package/pi-mermaid) | 🧜‍♀️ Pi extension that renders Mermaid diagrams as ASCII in the TUI, with width-aware output and safe handling for larger diagrams. |  | 3mo ago |
| [pi-mesh](https://www.npmjs.com/package/pi-mesh) | Multi-agent coordination for Pi - presence, messaging, file reservations |  | ~1mo ago |
| [pi-messenger](https://www.npmjs.com/package/pi-messenger) | Multi-agent communication extension for pi coding agent |  | 23d ago |
| [pi-messenger-bridge](https://www.npmjs.com/package/pi-messenger-bridge) | Bridge common messengers (Telegram, WhatsApp, Slack, Discord) into |  | 16d ago |
| [pi-messenger-swarm](https://www.npmjs.com/package/pi-messenger-swarm) | Swarm-first multi-agent messaging and task orchestration extension for Pi |  | today |
| [pi-minimax-cli](https://www.npmjs.com/package/pi-minimax-cli) | A pi coding agent extension that wraps the MiniMax mmx CLI as callable tools with self-evolving architecture |  | 29d ago |
| [pi-minions](https://www.npmjs.com/package/pi-minions) | Minions for your pi |  | 19d ago |
| [pi-mission-control](https://www.npmjs.com/package/pi-mission-control) | Visual mission orchestration extension for pi with agent hierarchy and durable state. |  | ~1mo ago |
| [pi-modal-editor](https://www.npmjs.com/package/pi-modal-editor) | Kakoune/Helix-like modal editor for pi prompt input - motion-first with selection markers |  | 19d ago |
| [pi-model-cycler](https://www.npmjs.com/package/pi-model-cycler) | Interactive model switcher for Pi coding agent |  | 25d ago |
| [pi-model-picker](https://www.npmjs.com/package/pi-model-picker) | Categorized, keyboard-driven model selector extension for the pi coding agent |  | 3mo ago |
| [pi-model-profiles](https://www.npmjs.com/package/pi-model-profiles) | Pi extension for saving, importing, and applying agent model frontmatter profiles. |  | 3d ago |
| [pi-mono-clear](https://www.npmjs.com/package/pi-mono-clear) | Collection of pi-mono extensions |  | 4d ago |
| [pi-morphllm-plugin](https://www.npmjs.com/package/pi-morphllm-plugin) | Morph runtime extension package for Pi Coding Agent with tools, hooks, and compaction |  | today |
| [pi-multi-auth](https://www.npmjs.com/package/pi-multi-auth) | Pi extension for multi-provider credential management, OAuth login, and account rotation |  | 3d ago |
| [pi-must-have-extension](https://www.npmjs.com/package/pi-must-have-extension) | RFC 2119 keyword normalizer extension for the Pi coding agent. |  | 3d ago |
| [pi-navigator](https://www.npmjs.com/package/pi-navigator) | Navigation extension for Pi: session checkpointing, branch management and push-task tool |  | yesterday |
| [pi-no-autowrite](https://www.npmjs.com/package/pi-no-autowrite) | Pi extension: intercept auto-write/edit, education & supervisor modes |  | 6d ago |
| [pi-notifier](https://www.npmjs.com/package/pi-notifier) | Lightweight macOS desktop notifications for pi coding agent |  | ~1mo ago |
| [pi-nvidia-nim](https://www.npmjs.com/package/pi-nvidia-nim) | NVIDIA NIM API provider extension for pi coding agent - access 100+ models from build.nvidia.com |  | 15d ago |
| [pi-observability](https://www.npmjs.com/package/pi-observability) | A pi extension that replaces the default footer with a live observability bar and provides a full dashboard command. |  | 3d ago |
| [pi-ocr](https://www.npmjs.com/package/pi-ocr) | Pi skill for extracting text from images using Tesseract OCR. Handles screenshots, photos, and scanned documents with automatic preprocessing and multi-language support. |  | 7d ago |
| [pi-ollama-cloud](https://www.npmjs.com/package/pi-ollama-cloud) | Ollama Cloud plugin for Pi coding agent (API Key based) |  | 3d ago |
| [pi-ollama-keyring](https://www.npmjs.com/package/pi-ollama-keyring) | Ollama cloud provider for pi-coding-agent with multi-key rotation, live model discovery, and persistent key-pool management |  | ~1mo ago |
| [pi-opa](https://www.npmjs.com/package/pi-opa) | Enterprise-grade Open Policy Agent (OPA) integration for pi coding agent - comprehensive authorization and policy enforcement |  | 2mo ago |
| [pi-openai-codex-device-login](https://www.npmjs.com/package/pi-openai-codex-device-login) | Pi extension that adds ChatGPT Plus/Pro device-code login for OpenAI Codex |  | today |
| [pi-openai-fast](https://www.npmjs.com/package/pi-openai-fast) | Focused Pi extension for OpenAI Fast Mode priority service-tier requests. |  | 4d ago |
| [pi-openai-usage](https://www.npmjs.com/package/pi-openai-usage) | Focused Pi extension package for showing OpenAI Codex subscription usage in the status line. |  | 4d ago |
| [pi-openapi-tools](https://www.npmjs.com/package/pi-openapi-tools) | Pi extension that generates LLM tools from any OpenAPI/Swagger URL. |  | 8d ago |
| [pi-oracle](https://www.npmjs.com/package/pi-oracle) | ChatGPT web-oracle extension for pi with isolated browser auth, async jobs, and project-context archives. |  | yesterday |
| [pi-otel-telemetry](https://www.npmjs.com/package/pi-otel-telemetry) | OpenTelemetry traces & metrics extension for pi coding agent |  | ~1mo ago |
| [pi-package-search](https://www.npmjs.com/package/pi-package-search) | Discover and install Pi packages from npm directly inside Pi. |  | ~1mo ago |
| [pi-package-test](https://www.npmjs.com/package/pi-package-test) | Test package for pi coding agent |  | 4mo ago |
| [pi-pam](https://www.npmjs.com/package/pi-pam) | Project Architectural Maps — living, multi-layer cartography for monorepos. A Pi skill that maintains visual maps, significance ratings, dependency graphs, and third-party repo evaluation. |  | 3d ago |
| [pi-parallel-agents](https://www.npmjs.com/package/pi-parallel-agents) | A pi extension for dynamic parallel agent execution. Run multiple agents with different models in parallel, with or without pre-defined agent configurations. |  | 4mo ago |
| [pi-paste-context](https://www.npmjs.com/package/pi-paste-context) | A pi extension to add coding support to any editor by using the clipboard (aka CTRL+C) for light integration. It searches the current project for the text in your clipboard, and then sends the matchin |  | yesterday |
| [pi-pattern-retry](https://www.npmjs.com/package/pi-pattern-retry) | Pi extension: keep agent sessions alive across provider rate-limits, quota exhaustion, and transient auth failures by re-injecting continuation messages on an escalating retry schedule. |  | 5d ago |
| [pi-peon-ping](https://www.npmjs.com/package/pi-peon-ping) | A pi coding agent extension for peon-ping sound notification |  | 3mo ago |
| [pi-perf](https://www.npmjs.com/package/pi-perf) | Per-turn perf timings (TTFT, prefill tok/s, decode tok/s) for pi. |  | 3d ago |
| [pi-permission](https://www.npmjs.com/package/pi-permission) | Layered permission control extension for pi-coding-agent (no sound) |  | ~1mo ago |
| [pi-permission-system](https://www.npmjs.com/package/pi-permission-system) | Permission enforcement extension for the Pi coding agent. |  | 3d ago |
| [pi-pkg-guard](https://www.npmjs.com/package/pi-pkg-guard) | Guards against unregistered pi packages — installed via npm but not registered in pi's settings |  | 16d ago |
| [pi-powerline-footer](https://www.npmjs.com/package/pi-powerline-footer) | Powerline-style status bar extension for pi coding agent |  | 14d ago |
| [pi-powershell](https://www.npmjs.com/package/pi-powershell) | PowerShell extension for pi - replaces bash with PowerShell on Windows and auto-translates bash commands |  | 3d ago |
| [pi-prayer-times](https://www.npmjs.com/package/pi-prayer-times) | Islamic prayer time reminders for pi coding agent |  | yesterday |
| [pi-profiles](https://www.npmjs.com/package/pi-profiles) | pi.dev profile manager. Switch between multiple sets of settings, extensions, skills, themes, auth. |  | 2mo ago |
| [pi-project-gate](https://www.npmjs.com/package/pi-project-gate) | Pi Agent Extensions |  | today |
| [pi-prompt-suggestions](https://www.npmjs.com/package/pi-prompt-suggestions) | Pi extension that suggests a natural next prompt after an agent response. |  | 2d ago |
| [pi-provider-kimi-code](https://www.npmjs.com/package/pi-provider-kimi-code) | Reuse your Kimi Code (Moonshot) Coding plan inside pi-coding-agent |  | today |
| [pi-provider-service-tier](https://www.npmjs.com/package/pi-provider-service-tier) | Provider/model-scoped service_tier management extension for Pi |  | today |
| [pi-provider-utils](https://www.npmjs.com/package/pi-provider-utils) | Shared provider mirror, stream, and agent-path helpers for Pi extension packages |  | ~1mo ago |
| [pi-provider-vertex-anthropic](https://www.npmjs.com/package/pi-provider-vertex-anthropic) | Pi agent extension for Claude models via Google Cloud Vertex AI |  | ~1mo ago |
| [pi-qmd](https://www.npmjs.com/package/pi-qmd) | QMD (Quick Markdown Search) extension for pi coding agent - on-device knowledge base search with BM25, vector search, and LLM reranking |  | 4mo ago |
| [pi-qmd-adaptive-search](https://www.npmjs.com/package/pi-qmd-adaptive-search) | Pi package for project-local semantic file discovery with qmd and adaptive feedback |  | today |
| [pi-qmd-ledger](https://www.npmjs.com/package/pi-qmd-ledger) | Universal configurable JSONL ledger with qmd hybrid search, tiered HITL, and dynamic context injection for pi |  | 8d ago |
| [pi-questions](https://www.npmjs.com/package/pi-questions) | Structured and minimal ask_questions tool for Pi planning and clarification flows |  | 13d ago |
| [pi-quests](https://www.npmjs.com/package/pi-quests) | Keep your agent on track, one quest at a time |  | today |
| [pi-ralph](https://www.npmjs.com/package/pi-ralph) | Hat-based multi-agent orchestration loops for pi coding agent |  | 11d ago |
| [pi-read-before-write](https://www.npmjs.com/package/pi-read-before-write) | Pi extension that blocks stale edit/write operations when files changed since the agent last read them. |  | 2d ago |
| [pi-read-many](https://www.npmjs.com/package/pi-read-many) | 📚 Batch file reads for Pi via read_many with adaptive packing, safe heredoc framing, and output-budget awareness |  | 3mo ago |
| [pi-readcache](https://www.npmjs.com/package/pi-readcache) | 🧠 pi-readcache — Replay-aware read caching for Pi (lower token usage, compaction-safe correctness). |  | 3mo ago |
| [pi-redactor](https://www.npmjs.com/package/pi-redactor) | Pi extension that redacts sensitive strings from messages before the LLM provider sees them. |  | 2mo ago |
| [pi-reddit-research](https://www.npmjs.com/package/pi-reddit-research) | Reddit JSON research tools and skill for pi coding agent |  | 17d ago |
| [pi-repos](https://www.npmjs.com/package/pi-repos) | Read GitHub repositories as if local in Pi: find repos, list files, read code, and grep cached archives. |  | 7d ago |
| [pi-resource-center](https://www.npmjs.com/package/pi-resource-center) | A Pi package for browsing and managing packages, skills, extensions, prompts, and themes |  | 3d ago |
| [pi-response-guard](https://www.npmjs.com/package/pi-response-guard) | Pi extension that auto-recovers from empty, errored, or interrupted model responses |  | 7d ago |
| [pi-resume-remind](https://www.npmjs.com/package/pi-resume-remind) | Pi CLI extension that reminds users how to resume the current session when quitting |  | 7d ago |
| [pi-review-loop](https://www.npmjs.com/package/pi-review-loop) | Automated code review loop extension for Pi coding agent |  | ~1mo ago |
| [pi-rewind](https://www.npmjs.com/package/pi-rewind) | Checkpoint/rewind extension for the Pi coding agent. 1 checkpoint per turn, /rewind command, diff preview, safe restore, redo stack. |  | ~1mo ago |
| [pi-rewind-hook](https://www.npmjs.com/package/pi-rewind-hook) | Pi agent hook for rewinding file changes during coding sessions |  | ~1mo ago |
| [pi-rlm](https://www.npmjs.com/package/pi-rlm) | Recursive Language Model extension for Pi coding agent |  | 2mo ago |
| [pi-rlm-query](https://www.npmjs.com/package/pi-rlm-query) | Recursive LLM Query extension for pi - enables agent-to-agent delegation with guardrails |  | 2mo ago |
| [pi-rtk-optimizer](https://www.npmjs.com/package/pi-rtk-optimizer) | Pi extension that optimizes RTK command rewriting and tool output compaction for the coding agent. |  | 3d ago |
| [pi-rtk-rewrite](https://www.npmjs.com/package/pi-rtk-rewrite) | Automatic RTK rewrite integration for Pi bash tool calls (token-efficient command output) |  | 4d ago |
| [pi-runtime-extensions](https://www.npmjs.com/package/pi-runtime-extensions) | Runtime extension loader for Pi Coding Agent with /ext:load, /ext:list, and /ext:unload commands. |  | ~1mo ago |
| [pi-sandbox](https://www.npmjs.com/package/pi-sandbox) | OS-level sandboxing for pi with interactive permission prompts |  | 16d ago |
| [pi-schedule-prompt](https://www.npmjs.com/package/pi-schedule-prompt) | Pi's Heartbeat - Schedule recurring and one-shot main agent or background prompts with cron-like functionality |  | 22d ago |
| [pi-search-multi](https://www.npmjs.com/package/pi-search-multi) | Unified web search + content extraction extension for pi with 12 backends (DuckDuckGo, Jina AI, Tavily, Brave, Exa, Serper, Firecrawl, Marginalia, LangSearch, WebSearchAPI, Perplexity Sonar, SearXNG). |  | 11d ago |
| [pi-searxng-search](https://www.npmjs.com/package/pi-searxng-search) | Local SearXNG web_search tool for pi. |  | yesterday |
| [pi-sec](https://www.npmjs.com/package/pi-sec) | Fast, security-focused index of pip packages |  | yesterday |
| [pi-semantic-memory](https://www.npmjs.com/package/pi-semantic-memory) | Local-first semantic memory for Pi coding agent — powered by LogosDB MCP (stdio). Auto-indexes projects, persists turn records and thinking traces across sessions, injects relevant context on every pr |  | 11d ago |
| [pi-sensitive-guard](https://www.npmjs.com/package/pi-sensitive-guard) | Pi extension that protects sensitive files, blocks secret writes, and optionally redacts protected read output. |  | 3d ago |
| [pi-service-tier](https://www.npmjs.com/package/pi-service-tier) | Fast mode and provider service-tier controls for pi |  | 18d ago |
| [pi-session-cleanup](https://www.npmjs.com/package/pi-session-cleanup) | Pi extension for interactive batch session cleanup and safe deletion. |  | 3d ago |
| [pi-session-exporter](https://www.npmjs.com/package/pi-session-exporter) | Export Pi session history as clean Markdown for sharing in PRs, issues, docs, and Slack |  | 3d ago |
| [pi-session-manager](https://www.npmjs.com/package/pi-session-manager) | Session browser for pi coding agent — browse, resume, rename, and delete sessions |  | ~1mo ago |
| [pi-session-search](https://www.npmjs.com/package/pi-session-search) | Semantic search over past pi coding sessions — index, browse, and read your coding history |  | 10d ago |
| [pi-share-redacted-gist](https://www.npmjs.com/package/pi-share-redacted-gist) | Pi package: publish a redacted pi session as a public GitHub gist |  | ~1mo ago |
| [pi-simple-subagents](https://www.npmjs.com/package/pi-simple-subagents) | Minimal Pi extension for fresh synchronous subagents |  | 6d ago |
| [pi-simplify](https://www.npmjs.com/package/pi-simplify) | A set of pi-extensions, including pi-continuous-learning that continually improves you pi coding agent experience |  | yesterday |
| [pi-skill-arg-hints](https://www.npmjs.com/package/pi-skill-arg-hints) | Inline argument-hint placeholders for Pi skill and prompt template slash commands. |  | today |
| [pi-skill-deck](https://www.npmjs.com/package/pi-skill-deck) | Two-pane categorized skill browser for Pi with bookmarks, frecency tracking, and daily suggestions |  | 3d ago |
| [pi-skill-evolution](https://www.npmjs.com/package/pi-skill-evolution) | Meta-skill and self-improvement loop for pi — mines session history for repeated workflows, proposes new skills, and tracks skill health |  | 11d ago |
| [pi-skill-hub](https://www.npmjs.com/package/pi-skill-hub) | Safe provenance-aware Pi skill discovery, inventory, preview, and management hub. |  | 3d ago |
| [pi-skill-playbook](https://www.npmjs.com/package/pi-skill-playbook) | Pi extension for passive, human-mediated Agent Skill playbooks. |  | today |
| [pi-skill-shiori](https://www.npmjs.com/package/pi-skill-shiori) | Pi extension that reduces Agent Skill catalog tokens with policy-based skill retrieval. |  | today |
| [pi-skill-smart-read](https://www.npmjs.com/package/pi-skill-smart-read) | Skill-aware reading for pi: index large SKILL.md files and load sections on demand. |  | ~1mo ago |
| [pi-skillful](https://www.npmjs.com/package/pi-skillful) | Pi package with skill invocation and visibility improvements. |  | 5d ago |
| [pi-slack-bot](https://www.npmjs.com/package/pi-slack-bot) | Slack bot that exposes pi as a conversational coding agent |  | 11d ago |
| [pi-slopchop](https://www.npmjs.com/package/pi-slopchop) | Terminal code review and annotation workflow for Pi |  | today |
| [pi-slopkick](https://www.npmjs.com/package/pi-slopkick) | Pi coding-agent extension for terminal-native review, annotation, and rich diff workflows. |  | 4d ago |
| [pi-smart-commit](https://www.npmjs.com/package/pi-smart-commit) | Auto-generate conventional commit messages from Pi session diffs — feat, fix, refactor, chore with confirmation |  | 3d ago |
| [pi-smart-compact](https://www.npmjs.com/package/pi-smart-compact) | Verification-oriented smart compaction extension for the Pi Coding Agent. |  | today |
| [pi-smart-edit](https://www.npmjs.com/package/pi-smart-edit) | Safer, cheaper edits by verifying prior reads in the harness instead of the prompt. Lets the harness verify the model already read the latest text it wants to edit, avoiding old-text replay and hash-d |  | yesterday |
| [pi-smart-voice-notify](https://www.npmjs.com/package/pi-smart-voice-notify) | Cross-platform smart voice, sound, and desktop notifications for Pi coding agent (Windows, Linux, macOS) |  | 3d ago |
| [pi-soloterm](https://www.npmjs.com/package/pi-soloterm) | Pi extensions for Soloterm — agent orchestration, dispatch, and fork workflows |  | 5d ago |
| [pi-speedometer](https://www.npmjs.com/package/pi-speedometer) | Per-turn speedometer for pi: TTFT, prefill tok/s, decode tok/s, and total wall time. |  | today |
| [pi-spell-check](https://www.npmjs.com/package/pi-spell-check) | Spell-check extension for pi coding agent |  | ~1mo ago |
| [pi-spinner-lyrics](https://www.npmjs.com/package/pi-spinner-lyrics) | Pi extension that rotates Phish lyrics as the agent spinner verb. |  | 5d ago |
| [pi-sre-mode](https://www.npmjs.com/package/pi-sre-mode) | Pi-native incident investigation workflow with support for private overlays |  | 13d ago |
| [pi-star-router](https://www.npmjs.com/package/pi-star-router) | StarRouter is a focused model-routing extension for Pi. It chooses the best available model and thinking level for each prompt using a deterministic heuristic prompt profiler, Artificial Analysis benc |  | 3d ago |
| [pi-startup-redraw-fix](https://www.npmjs.com/package/pi-startup-redraw-fix) | Pi extension that patches terminal full-clear ordering to avoid startup redraw glitches. |  | 3d ago |
| [pi-status](https://www.npmjs.com/package/pi-status) | Pi extension that shows a terminal tab title spinner while pi is working |  | 29d ago |
| [pi-subdir-context](https://www.npmjs.com/package/pi-subdir-context) | Automatically load AGENTS.md context from subdirectories in pi coding agent |  | 18d ago |
| [pi-super-curl](https://www.npmjs.com/package/pi-super-curl) | pi extension to empower a curl request with coding agent capabilities (slopcoded) |  | 27d ago |
| [pi-supergsd](https://www.npmjs.com/package/pi-supergsd) | Curated, patched Superpowers skills packaged for Pi |  | 2d ago |
| [pi-supervisor](https://www.npmjs.com/package/pi-supervisor) | A Pi-Agent extension that supervises the coding agent and steers it toward a defined outcome. |  | 21d ago |
| [pi-tasklists](https://www.npmjs.com/package/pi-tasklists) | Multi-list task management extension for the Pi coding agent |  | 2d ago |
| [pi-teammate](https://www.npmjs.com/package/pi-teammate) | A pi extension that turns multiple pi sessions into a collaborative team of AI agents. Instead of a top-down orchestrator dispatching tasks to subordinate subagents, pi-teammate creates a peer network |  | ~1mo ago |
| [pi-telebridge](https://www.npmjs.com/package/pi-telebridge) | A pi extension that creates a two-way relay between your active pi coding agent session and a Telegram bot. |  | 2mo ago |
| [pi-telegram-service](https://www.npmjs.com/package/pi-telegram-service) | 24/7 Telegram bot powered by the Pi coding agent SDK |  | 29d ago |
| [pi-theme-sync](https://www.npmjs.com/package/pi-theme-sync) | Sync pi theme with system appearance — works locally and over SSH via OSC 11 terminal queries |  | 3mo ago |
| [pi-timestamps](https://www.npmjs.com/package/pi-timestamps) | Timestamps extension for the pi coding agent |  | 2mo ago |
| [pi-tinyfish-tools](https://www.npmjs.com/package/pi-tinyfish-tools) | TinyFish Web Agent tools for pi — search, fetch, and goal-driven browser automation |  | 2d ago |
| [pi-tmux-spinner](https://www.npmjs.com/package/pi-tmux-spinner) | Animated tmux window-name spinner for the pi coding agent |  | 2d ago |
| [pi-token-tracker](https://www.npmjs.com/package/pi-token-tracker) | Pi extension that tracks token usage across all sessions including taskplane workers and merge agents. Writes per-call token records to usage.jsonl and provides a token-report command. |  | 6d ago |
| [pi-tokyo-night](https://www.npmjs.com/package/pi-tokyo-night) | Pi Theme for Tokyo Night |  | yesterday |
| [pi-tool-display](https://www.npmjs.com/package/pi-tool-display) | Compact tool call rendering, diff visualization, and output truncation extension for Pi coding agent. Hides, collapses, and truncates verbose tool output for cleaner TUI display. |  | 3d ago |
| [pi-tool-display-summary](https://www.npmjs.com/package/pi-tool-display-summary) | Pi extension that adds model-written user-facing display summaries to tool calls. |  | 5d ago |
| [pi-typescript-lsp](https://www.npmjs.com/package/pi-typescript-lsp) | Pi package adding TypeScript LSP navigation, diagnostics, import fixes, and rename tools for coding agents. |  | yesterday |
| [pi-unify-cmd](https://www.npmjs.com/package/pi-unify-cmd) | Load slash commands from Claude Code, OpenCode, Codex, and Gemini CLI into pi — adapter pattern with configurable sources and formats |  | 7d ago |
| [pi-until-done](https://www.npmjs.com/package/pi-until-done) | A Pi extension command that executes raw user intent to completion with strict, verifiable termination. `/until-done` runs until a truthful terminal state: 1) all criteria are objectively satisfied or |  | 18d ago |
| [pi-updater](https://www.npmjs.com/package/pi-updater) | Auto updater for pi |  | 3d ago |
| [pi-usage-dashboard](https://www.npmjs.com/package/pi-usage-dashboard) | Feature-rich usage dashboard footer for Pi coding agent — live tokens, cost, context window, budget tracking, thinking level, response latency, and more |  | 3d ago |
| [pi-venice](https://www.npmjs.com/package/pi-venice) | Venice.AI extension for Pi Coding Agent. |  | 10d ago |
| [pi-vertex-ai-provider](https://www.npmjs.com/package/pi-vertex-ai-provider) | Pi package that enables Google Vertex AI ADC auth and adds latest Gemini Vertex models. |  | 5d ago |
| [pi-voice-stt](https://www.npmjs.com/package/pi-voice-stt) | Provider-agnostic speech-to-text dictation extension for the Pi TUI. |  | 2d ago |
| [pi-wc3-sounds](https://www.npmjs.com/package/pi-wc3-sounds) | WC3 Sounds — A pi extension that plays Warcraft III voice lines on agent events. |  | 3mo ago |
| [pi-web-access](https://www.npmjs.com/package/pi-web-access) | Web search and content extraction extension for Pi coding agent |  | 23d ago |
| [pi-web-minimal](https://www.npmjs.com/package/pi-web-minimal) | Web research tools for Pi agents that don't trash the context window. Retrieves via Exa + Context7, stores raw payloads out-of-band, returns short source-cited briefs through a distillation firewall. |  | today |
| [pi-web-providers](https://www.npmjs.com/package/pi-web-providers) | Configurable web access extension for pi that routes search, contents, answers, and research across Claude, Codex, Exa, Gemini, Parallel, and Valyu providers. |  | yesterday |
| [pi-web-tools](https://www.npmjs.com/package/pi-web-tools) | Web search, content extraction, and GitHub repo cloning for Pi coding agent |  | 9d ago |
| [pi-web-utils](https://www.npmjs.com/package/pi-web-utils) | Efficient Web/github search and fetch extension for pi coding agent |  | 3mo ago |
| [pi-webdav-sync](https://www.npmjs.com/package/pi-webdav-sync) | WebDAV backup and restore for Pi personal configuration. |  | yesterday |
| [pi-wechat](https://www.npmjs.com/package/pi-wechat) | Add Wechat Channel For Your Pi Agent |  | 2mo ago |
| [pi-whisper-voice](https://www.npmjs.com/package/pi-whisper-voice) | Voice interface for the Pi coding agent |  | 29d ago |
| [pi-wierd-statusline](https://www.npmjs.com/package/pi-wierd-statusline) | pi coding agent extensions |  | 8d ago |
| [pi-windsurf](https://www.npmjs.com/package/pi-windsurf) | Windsurf/Cognition models in Pi — Claude, GPT, Gemini, Kimi, DeepSeek, SWE via your Windsurf subscription |  | 2d ago |
| [pi-workflow-agent](https://www.npmjs.com/package/pi-workflow-agent) | Generic issue, planning, memory, and verification workflow helper for Pi. |  | 25d ago |
| [pi-working-vibe](https://www.npmjs.com/package/pi-working-vibe) | Custom Working… message + tool-aware spinner for pi coding agent. Vibe files with [default] and [tool:] sections. |  | 12d ago |
| [pi-workspace-history](https://www.npmjs.com/package/pi-workspace-history) | Workspace history extension for @mariozechner/pi-coding-agent |  | 15d ago |
| [pi-workstation](https://www.npmjs.com/package/pi-workstation) | Personal pi agent setup |  | 2mo ago |
| [pi-xplan](https://www.npmjs.com/package/pi-xplan) | Steering-only planning and step-by-step implementation workflow extension for pi. |  | yesterday |
| [pi-yandex-bridge](https://www.npmjs.com/package/pi-yandex-bridge) | Pi Coding Agent provider bridge for Yandex Cloud AI (YandexGPT) |  | 16d ago |
| [pi-yolo-bypass](https://www.npmjs.com/package/pi-yolo-bypass) | Dynamic full-permission bypass toggle for pi-permission-system with backup/restore of policy files. |  | today |
| [pi-zai-mcp](https://www.npmjs.com/package/pi-zai-mcp) | Z.ai MCP server bridge for pi with web search, reader, zread, and vision tools. |  | yesterday |
| [pi-zai-tools](https://www.npmjs.com/package/pi-zai-tools) | Pi package that exposes Z.AI Web Search, Web Reader, and Zread MCP tools for pi. |  | 6d ago |
| [pi-zellij](https://www.npmjs.com/package/pi-zellij) | Pi package with zellij-powered terminal integrations for Pi. Make your workflow agent driven. |  | today |
| [pimotte-agents-orchestra-pi](https://github.com/pimotte-agents/orchestra-pi) | Pi extensions for agent orchestration |  | 10d ago |
| [pinchy-dev-pinchy-dev](https://github.com/pinchy-dev/pinchy-dev) | Local-first autonomous coding agent workspace built on Pi with dashboard, API, worker, and browser debugging workflows. |  | 20d ago |
| [piotr-oles-sem-pi](https://github.com/piotr-oles/sem-pi) | Pi agent extension: semantic code tools via sem CLI |  | today |
| [pip-webui-pip-webui-themes](https://github.com/pip-webui/pip-webui-themes) | Color Themes for Pip.WebUI |  | 6y ago |
| [pipelinedave-pi-pipelinedave](https://github.com/pipelinedave/pi-pipelinedave) | Ultimate pi.dev configuration with 94+ MCP tools, custom extensions, and cyberpunk theme |  | 24d ago |
| [piscord](https://www.npmjs.com/package/piscord) | Piscord - Lightweight Discord gateway for pi coding agent. Architecture inspired by NanoClaw. |  | 6d ago |
| [pjtf93-pi-extensions](https://github.com/pjtf93/pi-extensions) | Custom extensions for pi coding agent |  | 4mo ago |
| [pk-pi-hermes-evolve](https://www.npmjs.com/package/pk-pi-hermes-evolve) | Pi package inspired by Hermes Agent Self-Evolution with hybrid TypeScript + optional Python DSPy/GEPA backends. |  | 3d ago |
| [plasmate-labs-pi-plasmate](https://github.com/plasmate-labs/pi-plasmate) | Pi coding agent extension for web browsing via Plasmate SOM |  | ~1mo ago |
| [plgodin-.pi](https://github.com/plgodin/.pi) | My configuration for the Pi coding agent |  | 15d ago |
| [pmzi-pi-telegram-tools](https://github.com/pmzi/pi-telegram-tools) | A pi extension that gives your AI full Telegram account access via MTProto — no separate server process required. |  | ~1mo ago |
| [pocketto-pi](https://www.npmjs.com/package/pocketto-pi) | Pocket-driven development skills: structured subagent delegation, bug hunting, iterative planning, and code review workflows for Pi. |  | yesterday |
| [pocorschi-pi-screenshots](https://github.com/pocorschi/pi-screenshots) | Screenshot picker extension for pi coding agent |  | ~1mo ago |
| [ppowo-pi-config](https://github.com/ppowo/pi-config) | Personal pi agent configuration — prompts, extensions, skills, themes, and settings managed in version control with symlink-based bootstrap. |  | today |
| [project-memory-kit](https://www.npmjs.com/package/project-memory-kit) | Project memory kit for AI coding agents: shared docs initialization, plan/archive workflow, and Pi plan mode extension. |  | 11d ago |
| [psylsph-pi-desktop](https://github.com/psylsph/pi-desktop) | A native desktop app for the pi coding agent — your AI pair programmer in a beautiful Electron UI |  | 16d ago |
| [purplefish32-vicinae-pi-chat](https://github.com/purplefish32/vicinae-pi-chat) | Vicinae extension to chat with the pi coding agent |  | ~1mo ago |
| [pwnholic-pi-pwnholic](https://github.com/pwnholic/pi-pwnholic) | Pi coding agent extension — FastEdit, TLDR, Bloks, Webclaw, Zero. AST code editing, code analysis, library context cards, web scraping, and web search. |  | 17d ago |
| [QubitInfinity-Pi-Coding-Agent-Extensions](https://github.com/QubitInfinity/Pi-Coding-Agent-Extensions) |  |  | 8d ago |
| [Qusic-pi-telegram](https://github.com/Qusic/pi-telegram) | Telegram bridge extension for Pi agent |  | 8d ago |
| [R-Dson-pi-codebase](https://github.com/R-Dson/pi-codebase) | A fast, lightweight codebase indexing and search extension for pi-coding-agent. It provides instant symbol navigation, incremental re-indexing via content hashing, and powerful reference search (lever |  | ~1mo ago |
| [r-vdp-pi-rtk-rewrite](https://github.com/r-vdp/pi-rtk-rewrite) | Port of rtk rewrite claude hook for pi coding agent as an extension. |  | 2mo ago |
| [R0B0WARRI0R-mcp-to-pi-extension](https://github.com/R0B0WARRI0R/mcp-to-pi-extension) | Convert MCP servers into Pi Coding Agent extensions |  | ~1mo ago |
| [r4vi-pi-auto-mode](https://github.com/r4vi/pi-auto-mode) | claude auto-mode for pi agent |  | 19d ago |
| [radpozniakov-pi-configs](https://github.com/radpozniakov/pi-configs) | A collection of custom extensions for the Pi coding agent |  | 2mo ago |
| [rafaymhddn-pi-telegram-multi](https://github.com/rafaymhddn/pi-telegram-multi) | Multi-session Telegram bridge for pi coding agent — one bot, many sessions |  | ~1mo ago |
| [Rahlir-clanker-stuff](https://github.com/Rahlir/clanker-stuff) | My personal stuff that helps clunkers do stuff. |  | 14d ago |
| [raindragon14-pi-agent-dotfiles](https://github.com/raindragon14/pi-agent-dotfiles) | Pi coding agent dotfiles — single-command setup: settings, extensions, prompts, themes |  | 23d ago |
| [rainmeter33-jpg-pi-tterhashlineedit](https://github.com/rainmeter33-jpg/pi-tterhashlineedit) | Hashline read/edit tool override for pi-coding-agent — 7-stage pipeline with dual anchors + indentation validation |  | ~1mo ago |
| [ralphschuler-pi-agent-setup](https://github.com/ralphschuler/pi-agent-setup) | Custom pi agent setup bootstrap with extensions, skills, prompts, themes, and install scripts |  | 6d ago |
| [ramarivera-pi-powerline-footer](https://github.com/ramarivera/pi-powerline-footer) | Powerline-style status bar extension for pi coding agent |  | 17d ago |
| [ratnesh-screener-pi-agent-config](https://github.com/ratnesh-screener/pi-agent-config) | Global config for the Pi coding agent. |  | 3mo ago |
| [ReqallSystem-pi-plugin](https://github.com/ReqallSystem/pi-plugin) | Reqall plugin for the pi.dev coding agent |  | 17d ago |
| [rfgamaral-pi-config](https://github.com/rfgamaral/pi-config) | Personal harness configuration for the Pi coding agent: extensions, skills, and prompts. |  | 10d ago |
| [richardgill-pi-pack](https://github.com/richardgill/pi-pack) | Packaging system for pi extensions. |  | 4d ago |
| [Richi-78-pi-tweak](https://github.com/Richi-78/pi-tweak) | Tweaks, extensions and skills for pi coding agent |  | 22d ago |
| [Rmnlly-pi-config](https://github.com/Rmnlly/pi-config) | Personal pi coding agent config — extensions, skills, and review agents |  | 2mo ago |
| [rnorth-sandboxed-pi](https://github.com/rnorth/sandboxed-pi) | Sandboxed execution wrapper for the pi coding agent — all tool calls run inside ephemeral Docker containers |  | 7d ago |
| [roaanv-macpi](https://github.com/roaanv/macpi) | GUI for Pi Agent |  | 9d ago |
| [RoderickJDunn-pi-idle-indicator](https://github.com/RoderickJDunn/pi-idle-indicator) | pi coding agent extension: surface idle/working state via zellij + Ghostty + macOS banners with click-to-focus |  | 11d ago |
| [roman-compote-pi-dispatch-lite](https://github.com/roman-compote/pi-dispatch-lite) | Minimal multi-agent dispatcher for Pi Coding Agent |  | 3mo ago |
| [rpiv-todo](https://www.npmjs.com/package/rpiv-todo) | Todo overlay extension for Pi CLI agent — visual task tracking in TUI with Claude-Code parity |  | 7d ago |
| [rubens-fidelis-pi-vscode](https://github.com/rubens-fidelis/pi-vscode) | Pi Coding Agent VS Code extension — status bar launcher, multi-session terminals, and editor integration |  | 13d ago |
| [runchr-works-eta-desktop](https://github.com/runchr-works/eta-desktop) | Desktop for Pi Coding Agent |  | 12d ago |
| [sadiksaifi-pi-guardrails](https://github.com/sadiksaifi/pi-guardrails) | Permission guardrails for pi. |  | ~1mo ago |
| [sagarbalaai-code-pi-tgrep](https://github.com/sagarbalaai-code/pi-tgrep) | An extension for Pi Coding Agent that leverages Microsoft’s Tgrep library to efficiently search and match grep patterns. |  | ~1mo ago |
| [Samarth-8836-pi-skills-and-extensions](https://github.com/Samarth-8836/pi-skills-and-extensions) | This contains all the useful and locally tested PI coding agent skills and extensions. All of them are plug and play and do not pollute the local environment - only project based |  | 2mo ago |
| [sanchezcodes-pi-salesforce-security-benchmark](https://github.com/sanchezcodes/pi-salesforce-security-benchmark) | Pi coding agent package for the Security Benchmark for Salesforce (SBS). Skills, extension, agents, and workflow prompts for 25 security controls across 4 domains. |  | 2mo ago |
| [sandalsoft-pi-fleet](https://github.com/sandalsoft/pi-fleet) | Multi-agent terminal orchestration extension for pi coding agent |  | 2mo ago |
| [sartoris-digital-pi-engteam](https://github.com/sartoris-digital/pi-engteam) | Multi-agent engineering team extension for the Pi coding agent |  | 3d ago |
| [sathish-t-piagon](https://github.com/sathish-t/piagon) | Pi Agent using Gondolin |  | 19d ago |
| [sathish316-pi-extensions](https://github.com/sathish316/pi-extensions) | Pi coding agent extensions that i use |  | 3d ago |
| [satish860-EnterpriseOps-Gym](https://github.com/satish860/EnterpriseOps-Gym) | 3 tools vs 512 MCP tools — Pi coding agent for EnterpriseOps-Gym benchmark |  | ~1mo ago |
| [sbfaulkner-pi-extensions](https://github.com/sbfaulkner/pi-extensions) | Personal extensions for the Pi coding agent |  | today |
| [SchmidleImpuls-double-loop](https://github.com/SchmidleImpuls/double-loop) | Consent-oriented agent workflows for human-accountable software development in Pi. |  | 9d ago |
| [seanGSISG-pi-gsd](https://github.com/seanGSISG/pi-gsd) | Modern agentic workflow engine for the pi coding CLI — phase-based, wave-parallel executors in git worktrees, 3-layer verification, dream-loop memory. Inspired by GSD (get-shit-done). |  | ~1mo ago |
| [semaphoric775-pi-vcd-view](https://github.com/semaphoric775/pi-vcd-view) | An ASCII-based waveform viewer package for the Pi Coding Agent |  | ~1mo ago |
| [SentientBiscuit-pi-research-assistant](https://github.com/SentientBiscuit/pi-research-assistant) | Pi coding agent extension for scientific research |  | ~1mo ago |
| [serejke-pi-playground](https://github.com/serejke/pi-playground) | Hands-on playground for the pi coding agent's core primitives (pi-ai, pi-agent-core, pi-tui). Demos + a twitter-research CLI. |  | ~1mo ago |
| [sergiobonfiglio-pi-hashline](https://github.com/sergiobonfiglio/pi-hashline) | Pi extension adding stable line anchors and hash-addressed editing tools |  | yesterday |
| [shadow5og-pi-agent-extensions](https://github.com/shadow5og/pi-agent-extensions) |  |  | 2mo ago |
| [shaftoe-pi-sandbox-core](https://github.com/shaftoe/pi-sandbox-core) | A Pi coding agent shared orchestration library for building sandbox extensions |  | ~1mo ago |
| [shitty-clipboard-extension](https://www.npmjs.com/package/shitty-clipboard-extension) | Custom hooks for pi coding agent |  | 7d ago |
| [shog-lab-pi-mind](https://github.com/shog-lab/pi-mind) | Give pi a mind: portable memory and self-evolution as a drop-in pi-coding-agent extension. |  | today |
| [shuymn-pi-extensions](https://github.com/shuymn/pi-extensions) | Personal pi coding-agent extensions packaged as a standalone pi package. |  | today |
| [sigilmakes-pi-memory](https://github.com/sigilmakes/pi-memory) | Memory system for pi coding agents — soul identity, memory consolidation, and recall |  | 3mo ago |
| [simonwjackson-pi-bedrock-principals](https://github.com/simonwjackson/pi-bedrock-principals) | Cross-project engineering principles for the Pi coding agent. Auto-loads philosophy / standards / style-guide into every session. |  | 19d ago |
| [simonwjackson-pi-web-search](https://github.com/simonwjackson/pi-web-search) | Web search tool and skill for the Pi coding agent, backed by Brave Search and Serper. |  | 19d ago |
| [siygle-pi-rss-reader](https://github.com/siygle/pi-rss-reader) | RSS reader extension for pi coding agent with newsletter email support |  | ~1mo ago |
| [siygle-pi-telegram-bridge](https://github.com/siygle/pi-telegram-bridge) | Telegram bridge extension for pi coding agent |  | ~1mo ago |
| [skyfallsin-pi-projects](https://github.com/skyfallsin/pi-projects) | Self-contained project directories for the pi coding agent |  | 17d ago |
| [SlanyCukr-pi-code-intel](https://github.com/SlanyCukr/pi-code-intel) | Pi coding agent extension: LSP, sub-agents, semantic search, code intelligence workflow |  | 15d ago |
| [sliced-paraiba-pi-extensions](https://github.com/sliced-paraiba/pi-extensions) | Personal pi coding agent extensions |  | 5d ago |
| [sn-kaier-pi-repomap](https://github.com/sn-kaier/pi-repomap) | Repository map extension for the pi agent (pi.dev) |  | 8d ago |
| [sonhal-pi-extensions](https://github.com/sonhal/pi-extensions) | My personal pi agent extensions |  | 26d ago |
| [sotayamashita-pi-mcp-export](https://github.com/sotayamashita/pi-mcp-export) | Expose pi coding agent extensions as MCP servers — Claude Desktop, Cursor, Codex, Hermes, … |  | ~1mo ago |
| [sourcesmith-pi-treesitter](https://github.com/sourcesmith/pi-treesitter) | Treesitter extension for the pi.dev coding agent |  | 2mo ago |
| [speniti-dotpi](https://github.com/speniti/dotpi) | Personal pi coding agent setup — extensions, skills, themes, and prompts. Like dotfiles, but for pi. |  | 11d ago |
| [Spirizeon-pi-nix](https://github.com/Spirizeon/pi-nix) | Fork of the popular Pi coding agent harness but as a Nix package |  | 23d ago |
| [ssh-vom-Bunshin](https://github.com/ssh-vom/Bunshin) | A file-system based memory framework for Pi Coding Agents |  | ~1mo ago |
| [sshkeda-pi-background-bash](https://github.com/sshkeda/pi-background-bash) | Pi extension: async background bash with background:true and automatic 30s backgrounding for long-running agent commands |  | 17d ago |
| [sshkeda-pi-google-search](https://github.com/sshkeda/pi-google-search) | Google Search extension for the pi coding agent — real-time web search via Gemini grounded search with source citations (free with Google OAuth) |  | ~1mo ago |
| [sshkeda-pi-mock](https://github.com/sshkeda/pi-mock) | Integration testing harness for pi extensions. Mock LLM APIs (Anthropic, OpenAI, Google), Docker sandbox with network isolation, fault injection, record/replay, CLI. |  | 8d ago |
| [sshkeda-pi-script](https://github.com/sshkeda/pi-script) | Pi extension toggling a TypeScript-native single-tool mode for typed agent scripting |  | yesterday |
| [st-gws-pi](https://www.npmjs.com/package/st-gws-pi) | Enhanced Google Workspace extension for pi coding agent |  | 3d ago |
| [stagefright5-pi-agent-extensions](https://github.com/stagefright5/pi-agent-extensions) | Collection of my extensions for pi coding agent (https://shittycodingagent.ai/) |  | 18d ago |
| [star26bsd-pi-sandbox-supabase](https://github.com/star26bsd/pi-sandbox-supabase) | Unsandboxed npx supabase CLI tool for the pi coding agent. |  | 8d ago |
| [StarryAlfredo-pi-aim-extension](https://github.com/StarryAlfredo/pi-aim-extension) | Pi AI Multi-Agent Extension - Agent orchestration, LLM interaction tools, and background services for pi coding agent |  | 12d ago |
| [StarryAlfredo-pi-claude-code](https://github.com/StarryAlfredo/pi-claude-code) | Claude Code compatibility layer for Pi — tools, permissions, memory, agents, MCP |  | ~1mo ago |
| [StartupBros-pi-research-fabric](https://github.com/StartupBros/pi-research-fabric) | Cross-harness research capability tools for Pi: WebSearch, WebFetch, CodeContextSearch, and SiteMap. |  | ~1mo ago |
| [StartupBros-pi-wsl-clipboard-image](https://github.com/StartupBros/pi-wsl-clipboard-image) | WSL-first Pi extension that bridges Windows clipboard screenshots into Pi via temp image paths |  | ~1mo ago |
| [SteelPh0enix-pi-agent-config](https://github.com/SteelPh0enix/pi-agent-config) | My config files and extensions for Pi agent |  | 8d ago |
| [stefanerdmann-pi-security-scanner](https://github.com/stefanerdmann/pi-security-scanner) | Extension for pi coding agent. Analyzes third-party pi extensions for threats including data exfiltration, arbitrary execution, filesystem abuse, network communication, privilege escalation, obfuscati |  | ~1mo ago |
| [stegmannb-pi-agent-cmux](https://github.com/stegmannb/pi-agent-cmux) | PI extension for cmux |  | 7d ago |
| [stegmannb-pi-agent-devenv](https://github.com/stegmannb/pi-agent-devenv) |  |  | 13d ago |
| [stegmannb-pi-agent-direnv](https://github.com/stegmannb/pi-agent-direnv) |  |  | 13d ago |
| [steimbyte-pi-agent-switch](https://github.com/steimbyte/pi-agent-switch) | OpenCode-style primary agent switching for pi coding agent |  | 29d ago |
| [stepandel-nonlinear-pi](https://github.com/stepandel/nonlinear-pi) | Linear plugin for pi agents |  | 3mo ago |
| [stgrue-pi-extensions](https://github.com/stgrue/pi-extensions) | Extensions for the Pi coding agent |  | 21d ago |
| [SujitRoy-.pi](https://github.com/SujitRoy/.pi) | Personal skills, model configurations, and coding standards for the PI Coding Agent. Synced across machines, version-controlled, and optimized for minimal token usage and high autonomy. |  | 29d ago |
| [surf-skill](https://www.npmjs.com/package/surf-skill) | Multi-skill bundle for AI coding agents: surf-search-skill (multi-provider web search via Tavily + Parallel + Brave) + surf-plan-skill (research-driven execution planning). Includes `surf` interactive |  | 4d ago |
| [sven1103-pi-agent-collections](https://github.com/sven1103/pi-agent-collections) | My personal collections of skills and extensions for pi agent |  | ~1mo ago |
| [swt-labs-stop-wasting-tokens](https://github.com/swt-labs/stop-wasting-tokens) | Methodology-first SDLC for vendor-agnostic coding agents. v3 (Pi-native, worktree-isolated) in design on main — see TDD2.md; v2.3.5 (Codex CLI) lives on the v2-archive branch. |  | 10d ago |
| [Sylvan-Cheng-pi-firecrawl-extension](https://github.com/Sylvan-Cheng/pi-firecrawl-extension) | pi coding agent extension: Firecrawl web scraping & search tools |  | 9d ago |
| [Sylvan-Cheng-pi-tavily-extension](https://github.com/Sylvan-Cheng/pi-tavily-extension) | pi coding agent extension: Tavily web search, research & extraction tools |  | 9d ago |
| [syntheticrecon-pi-coding-agent-packages](https://github.com/syntheticrecon/pi-coding-agent-packages) | Template for building publishable Pi Coding Agent packages with extensions, skills, prompts, and themes. |  | 17d ago |
| [syxc-pi-ext](https://github.com/syxc/pi-ext) | Extensions for pi coding agent. |  | 9d ago |
| [TACH04-pi-calendar](https://github.com/TACH04/pi-calendar) | Equips Pi agent with google calendar tools. |  | 28d ago |
| [tadatuta-logseq-pi-integration](https://github.com/tadatuta/logseq-pi-integration) | Logseq plugin that connects to the Pi Coding Agent via slash command |  | 3mo ago |
| [taimoorchatha-pi-extensions](https://github.com/taimoorchatha/pi-extensions) | pi coding-agent extensions: pulsing border + per-turn context footer |  | 16d ago |
| [tamayotchi-pi-workspace](https://github.com/tamayotchi/pi-workspace) | My pi-agent config |  | ~1mo ago |
| [tarsgate-awto-pi-lot](https://github.com/tarsgate/awto-pi-lot) | Extension for pi-coding-agent adding support for PPQ.ai provider & its AutoClaw meta-model |  | 7d ago |
| [tchaudhry91-pi-extensions](https://github.com/tchaudhry91/pi-extensions) | My PI Coding Agent Extensions |  | 7d ago |
| [tensorfish-pi-dotfiles](https://github.com/tensorfish/pi-dotfiles) | Config for pi agent harness |  | ~1mo ago |
| [TeoBale-pi-config](https://github.com/TeoBale/pi-config) | Pi coding agent personal configuration - settings, extensions, and customizations |  | 9d ago |
| [teytattze-pi-agent-toolbox](https://github.com/teytattze/pi-agent-toolbox) |  |  | 8d ago |
| [the-librarian-pi-extension](https://www.npmjs.com/package/the-librarian-pi-extension) | Pi coding-agent package for The Librarian: durable memory + cross-harness session lifecycle over a remote Librarian MCP server. |  | today |
| [the-wendell-pi-config](https://github.com/the-wendell/pi-config) | configuratin for pi coding agent |  | ~1mo ago |
| [TheAmericanMaker-pi-stbar](https://github.com/TheAmericanMaker/pi-stbar) | DOOM (1993)-inspired skin for the pi coding agent — terminal theme, web face, and a native desktop app with full filesystem + shell. Beveled HUD plates, signal colors, sharp corners. |  | 4d ago |
| [thegreatsantiny-AIfred](https://github.com/thegreatsantiny/AIfred) | A somatic butler for the pi coding agent — Alfred Pennyworth as code |  | 10d ago |
| [thelobsterpinchy-pinchy-dev](https://github.com/thelobsterpinchy/pinchy-dev) | Local-first autonomous coding agent workspace built on Pi with dashboard, API, worker, and browser debugging workflows. |  | ~1mo ago |
| [TheTechChild-my-personal-pi](https://github.com/TheTechChild/my-personal-pi) | Personal pi-coding-agent extensions: MCP client + web research + helper scripts. |  | 11d ago |
| [threepointsweb-threepointsweb-pi-core](https://github.com/threepointsweb/threepointsweb-pi-core) | ThreePointsWeb core extension package for Pi |  | 7d ago |
| [timm-u-pi-oracle](https://github.com/timm-u/pi-oracle) | Oracle advisor tool extension for pi coding agent |  | ~1mo ago |
| [timothyckl-pi-chroma](https://github.com/timothyckl/pi-chroma) | chroma vector search for pi |  | 14d ago |
| [TinySquid-pi-agent-extensions](https://github.com/TinySquid/pi-agent-extensions) | Custom extensions for pi coding agent |  | 17d ago |
| [tmdgusya-hud-dashboard](https://github.com/tmdgusya/hud-dashboard) | Interactive HUD Dashboard for pi-coding-agent to monitor agentic workflows |  | ~1mo ago |
| [tpcw-dev-pi-bmad](https://github.com/tpcw-dev/pi-bmad) | BMAD Method agent framework for pi coding agent |  | 2mo ago |
| [tr-pi](https://www.npmjs.com/package/tr-pi) | Umbrella Pi package bundling pi-qq, pi-chrome, and trifecta-footer. |  | 17d ago |
| [tremolo-agent-config](https://github.com/tremolo/agent-config) | pi coding agent commands, skills, extensions, and themes |  | 26d ago |
| [trifecta-footer](https://www.npmjs.com/package/trifecta-footer) | Never accidentally run Opus on a typo. Pi footer for model, thinking, and context. |  | 18d ago |
| [trotsky1997-pi-autocontinue](https://github.com/trotsky1997/pi-autocontinue) | AutoContinue extension package for pi |  | ~1mo ago |
| [trotsky1997-pi-claude-runtime-core](https://github.com/trotsky1997/pi-claude-runtime-core) | Shared Claude-style runtime contracts for Pi packages |  | ~1mo ago |
| [TsFreddie-pi-kilocode-provider](https://github.com/TsFreddie/pi-kilocode-provider) | Kilo provider for the Pi coding agent. |  | 12d ago |
| [ttiimmaahh-pi-sap-aicore](https://github.com/ttiimmaahh/pi-sap-aicore) | SAP AI Core (orchestration) custom provider for the pi coding agent |  | 4d ago |
| [tuansondinh-pi-extensions](https://github.com/tuansondinh/pi-extensions) | Monorepo for Pi coding agent extension packages |  | ~1mo ago |
| [TylerAngelier-agent-stuff](https://github.com/TylerAngelier/agent-stuff) | Pi coding agent extensions, skills, and themes |  | ~1mo ago |
| [ubergarm-dotpi](https://github.com/ubergarm/dotpi) | Configuration for first class llama-server support with pi.dev agentic coding harness. |  | 27d ago |
| [Ucr9005-pi-read-many](https://github.com/Ucr9005/pi-read-many) | Enable efficient batch reading of multiple files in Pi to reduce calls and streamline file inspection with a single tool. |  | today |
| [UgoMendesDonelli-pi-tree-sitter](https://github.com/UgoMendesDonelli/pi-tree-sitter) | Tree Sitter extension for PI the AI coding agent harness |  | 2d ago |
| [ukind-pi-cc-guard](https://github.com/ukind/pi-cc-guard) | Cyclomatic complexity guard for pi agent — blocks write/edit when code quality degrades |  | 3d ago |
| [unfallenwill-pi-coding-agent-extensions](https://github.com/unfallenwill/pi-coding-agent-extensions) | A collection of extensions for pi-coding-agent |  | 3mo ago |
| [valllabh-am-pi-agent](https://github.com/valllabh/am-pi-agent) | Agent sandbox runner using pi (Bedrock via IAM) |  | 13d ago |
| [vegardx-pi-ext-review](https://github.com/vegardx/pi-ext-review) | pi.dev extension: multi-agent code review — seven specialist reviewers in parallel with dedupe and interactive walk-through |  | ~1mo ago |
| [vegardx-pi-extensions](https://github.com/vegardx/pi-extensions) | Monorepo of pi.dev extensions for the pi coding agent |  | 5d ago |
| [viartemev-pi-rtk-rewrite](https://github.com/viartemev/pi-rtk-rewrite) | Automatic RTK rewrite integration for Pi bash tool calls (token-efficient command output) |  | 4d ago |
| [victor-software-house-pi-ghostty-theme-sync](https://github.com/victor-software-house/pi-ghostty-theme-sync) | Ghostty ↔ Pi theme sync extension (fork of @ogulcancelik/pi-ghostty-theme-sync) |  | ~1mo ago |
| [VictorDelamonica-pi-hive](https://github.com/VictorDelamonica/pi-hive) | 🐝 Multi-agent orchestration system for pi |  | ~1mo ago |
| [vilosource-pi-extensions](https://github.com/vilosource/pi-extensions) | Pi coding agent extensions and skills by Vilosource — usage telemetry, internal tools, and shared infrastructure. |  | 13d ago |
| [vinicius741-gemini-cli-bridge](https://github.com/vinicius741/gemini-cli-bridge) | CLI tool integrating the Gemini CLI SDK for search and photo analysis, designed for Pi agent and open-code ecosystems |  | 18d ago |
| [vision-handoff](https://www.npmjs.com/package/vision-handoff) | Vision handoff extension for pi - send images to a vision-capable model for analysis |  | 4d ago |
| [vkundapur-context-inspector](https://github.com/vkundapur/context-inspector) | Context inspector for Pi coding agent |  | today |
| [vtshly-pi-extensions](https://github.com/vtshly/pi-extensions) | My custom extensions for pi.dev agent created by the agent itself |  | ~1mo ago |
| [vvbzv-pi-vibe-memory](https://github.com/vvbzv/pi-vibe-memory) | just memory for Pi-Agents |  | 7d ago |
| [Waraq-Labs-pi-notify-terminal-notifier](https://github.com/Waraq-Labs/pi-notify-terminal-notifier) | A pi-coding-agent extension to send notifications using the terminal-notifier app. |  | 3mo ago |
| [Whamp-pi-lambda-rlm](https://github.com/Whamp/pi-lambda-rlm) | Pi coding agent Lambda-RLM extension for path-based long-context reasoning |  | 29d ago |
| [williamleong-pi-copilot-bar](https://github.com/williamleong/pi-copilot-bar) | A pi extension package that shows GitHub Copilot request usage in the footer when the active provider is github-copilot. |  | 14d ago |
| [willyamjarcand-pi-catacombs](https://github.com/willyamjarcand/pi-catacombs) | A pixel-art roguelike dungeon for the pi coding agent. Plays in a TUI overlay using half-block + 24-bit color rendering. |  | 10d ago |
| [Willyfrog-pi-agent-extensions](https://github.com/Willyfrog/pi-agent-extensions) | Elements to extend the pi agent I'm running |  | 4mo ago |
| [wilsonwan-my-pi](https://github.com/wilsonwan/my-pi) | My personal Pi Coding Agent setup |  | 9d ago |
| [wobondar-pi-double-paste](https://github.com/wobondar/pi-double-paste) | pi extension: Paste a long block once to collapse it, paste it again to expand it in the editor. |  | 26d ago |
| [woshichengpeng-pi-pack](https://github.com/woshichengpeng/pi-pack) | Personal collection of pi extensions, skills, agents, and themes |  | 3mo ago |
| [woxQAQ-otelpi](https://github.com/woxQAQ/otelpi) | A pi coding agent opentelemetry extension |  | 2mo ago |
| [wschwab-pi-idle-notify](https://github.com/wschwab/pi-idle-notify) | desktop notifications for the pi coding agent |  | 3mo ago |
| [x0retnop-pi-extensions](https://github.com/x0retnop/pi-extensions) | Collection of useful extensions for Pi |  | 15d ago |
| [xdrobotx-rust-pi-harness](https://github.com/xdrobotx/rust-pi-harness) | Template for software development project using Rust with Pi coding agent. |  | ~1mo ago |
| [xdrobotx-xdx-swe-template](https://github.com/xdrobotx/xdx-swe-template) | An agentic software engineering harness as Pi coding agent extension. |  | 25d ago |
| [xXJSONDeruloXx-pi-cursor-agent](https://github.com/xXJSONDeruloXx/pi-cursor-agent) | Cursor Agent provider extension for pi — Miyagi fork adding Opus 4.7 family and fixing GPT-5.4 1M context |  | ~1mo ago |
| [y0usaf-pi-flake](https://github.com/y0usaf/pi-flake) | Thin flake wrapper around upstream pi-mono with local patches and extension packages |  | yesterday |
| [y0usaf-pi-multi-agent](https://github.com/y0usaf/pi-multi-agent) | Multi-agent orchestration extension for pi |  | ~1mo ago |
| [yanekyuk-pi-kagi](https://github.com/yanekyuk/pi-kagi) | Pi coding agent extension integrating Kagi APIs (Search, FastGPT, Summarizer, Enrich, SmallWeb) |  | ~1mo ago |
| [yastrab1-vicinae-pi-agent](https://github.com/yastrab1/vicinae-pi-agent) |  |  | 9d ago |
| [yboyer-pi](https://github.com/yboyer/pi) | Pi package with custom extensions, skills, and prompt templates |  | yesterday |
| [yeonic-pi-dotfiles](https://github.com/yeonic/pi-dotfiles) | Personal Dotfiles for Pi Coding Agent |  | 4d ago |
| [yippiez-pi-explorer-tools](https://github.com/yippiez/pi-explorer-tools) | Pi extension to limit the coding agent to only explorer tools |  | 3mo ago |
| [Youhai020616-pi-extensions](https://github.com/Youhai020616/pi-extensions) | A collection of Pi coding agent extensions — Telegram Bot remote control, and more. |  | 2mo ago |
| [Youpen-y-pi-termux-toolkit](https://github.com/Youpen-y/pi-termux-toolkit) | Pi coding agent extensions for Termux on Android: location tools, TUI widgets, and more. |  | 5d ago |
| [zahradil-pyglimpse](https://github.com/zahradil/pyglimpse) | Native HTML windows for pi coding agent via Python + pywebview (WebView2 on Windows). Works on WSL2 and should also work on Linux/macOS; includes reactive, bidirectional JSONL stdin/stdout communicati |  | ~1mo ago |
| [zaraken-pi-extensions](https://github.com/zaraken/pi-extensions) | Extensions for the pi coding agent |  | 15d ago |
| [zeljkokalezic-pi-extensions](https://github.com/zeljkokalezic/pi-extensions) | Extensions and skills for Pi coding agent |  | 5d ago |
| [Zeromika-pi-orchestration](https://github.com/Zeromika/pi-orchestration) | Composable autonomy primitives for pi: subagent, agent-team, agent-workflow, goal-keeper, autopilot. Five small MIT-licensed pi packages that compose into a long-loop autonomous coding agent. |  | yesterday |
| [zfadhli-pi-workflow](https://github.com/zfadhli/pi-workflow) | A collection of workflow-mode extensions for the pi coding agent |  | 6d ago |
| [zgulde-pi-coding-agent-tool-approval](https://github.com/zgulde/pi-coding-agent-tool-approval) | Adds a simple tool approval workflow to the pi coding agent |  | 2mo ago |
| [zhushanwen321-xyz-pi-extensions](https://github.com/zhushanwen321/xyz-pi-extensions) | Collection of Pi coding agent extensions/plugins |  | today |
| [zineyu-pi-plugins](https://github.com/zineyu/pi-plugins) | Collection of pi coding agent plugins |  | 5d ago |
| [zosmaai-pi-cowork](https://github.com/zosmaai/pi-cowork) | Desktop GUI for the pi coding agent — open-source Claude Cowork alternative |  | 25d ago |
| [zqcli-pi-rail-ui](https://github.com/zqcli/pi-rail-ui) | Rail UI extension for Pi coding agent |  | today |
| [zukuy-pi-skill-picker](https://github.com/zukuy/pi-skill-picker) | Pi coding agent extension — type $ to search and pick skills from a dropdown menu |  | ~1mo ago |
| [zwx2zq-my-pi-setup](https://github.com/zwx2zq/my-pi-setup) | Pi agent extensions |  | 9d ago |


## Themes

*Custom themes and color schemes for the pi TUI.*

| Name | Description | Popularity | Updated |
|------|-------------|----------:|--------:|
| [amp-themes](https://www.npmjs.com/package/amp-themes) | Amp-inspired Pi UI suite: theme, editor chrome, and compact tool display. | ⬇ 3.6k/mo | 18d ago |
| [pi-terminal-theme](https://www.npmjs.com/package/pi-terminal-theme) | Pi terminal themes using ANSI 0..15, with an optional tinted variant for custom palette slots. | ⬇ 2k/mo | 6d ago |
| [pi-opencode-theme](https://www.npmjs.com/package/pi-opencode-theme) | An opencode-inspired theme for pi. | ⬇ 542/mo | 20d ago |
| [@ineersa/my-pi-themes](https://www.npmjs.com/package/@ineersa/my-pi-themes) | Color themes for pi: cyberpunk, nord, gruvbox, tokyo-night, catppuccin, and more. | ⬇ 538/mo | 2d ago |
| [pi-theme-synthwave-84](https://www.npmjs.com/package/pi-theme-synthwave-84) | Synthwave '84 theme for the Pi coding agent TUI. | ⬇ 360/mo | 17d ago |
| [@aliou/pi-theme-jellybeans](https://www.npmjs.com/package/@aliou/pi-theme-jellybeans) | Jellybeans Mono themes for Pi in dark and light variants. | ⬇ 311/mo | 16d ago |
| [flexoki-pi-theme](https://www.npmjs.com/package/flexoki-pi-theme) | Flexoki color scheme theme for pi | ⬇ 258/mo | 25d ago |
| [@m64/pi-remembra-theme](https://www.npmjs.com/package/@m64/pi-remembra-theme) | A beautiful dark theme for pi coding agent inspired by the Remembra web interface, featuring sophisticated purple-blue gradients and carefully balanced text colors. | ⬇ 255/mo | ~1mo ago |
| [@codella/pi-mcp-support](https://www.npmjs.com/package/@codella/pi-mcp-support) | Neon cyberpunk theme for Pi. | ⬇ 227/mo | 7d ago |
| [@odradekk/vera-theme](https://www.npmjs.com/package/@odradekk/vera-theme) | Vera unified theme package: Obsidian-toned palette plus Kylin-inspired chrome (banner, status line, spinner, thinking cycle). | ⬇ 206/mo | 17d ago |
| [@zenobius/pi-rose-pine](https://www.npmjs.com/package/@zenobius/pi-rose-pine) | Rose Pine themes for Pi Coding Agent | ⬇ 197/mo | 4mo ago |
| [@sherif-fanous/pi-atom-one](https://www.npmjs.com/package/@sherif-fanous/pi-atom-one) | Atom One themes for the Pi Coding Agent | ⬇ 187/mo | ~1mo ago |
| [my-pi-themes](https://www.npmjs.com/package/my-pi-themes) | 14 custom themes for Pi Coding Agent: neapple, monokai-pro, onedark, e-ink, tokyo-dark, and more | ⬇ 174/mo | 9d ago |
| [pi-modus-themes](https://www.npmjs.com/package/pi-modus-themes) | Modus Operandi and Modus Vivendi themes for pi coding agent | ⬇ 159/mo | 28d ago |
| [@eliemessiecode/pi-code-theme](https://www.npmjs.com/package/@eliemessiecode/pi-code-theme) | A warm, earthy dark theme for Pi coding agent with burnt orange and gold accents | ⬇ 155/mo | 2mo ago |
| [pi-kanagawa](https://www.npmjs.com/package/pi-kanagawa) | Kanagawa theme and UI extension for pi — wave animation, Kanagawa-colored footer, git branch widget, and thinking-level controls | ⬇ 151/mo | 26d ago |
| [pi-themes-rose-pine](https://www.npmjs.com/package/pi-themes-rose-pine) | Rosé Pine themes for pi (main, moon, dawn) | ⬇ 143/mo | 28d ago |
| [@haispeed/pi-deck](https://www.npmjs.com/package/@haispeed/pi-deck) | A theme and footer enhancement pack for pi | ⬇ 142/mo | 2mo ago |
| [pi-blackboard-theme](https://www.npmjs.com/package/pi-blackboard-theme) | Blackboard and Blackboard Pro themes for Pi. | ⬇ 134/mo | 6d ago |
| [pi-coder-theme](https://www.npmjs.com/package/pi-coder-theme) | Pi Coder Theme UI suite for Pi: theme, editor chrome, and compact tool display. | ⬇ 133/mo | 8d ago |
| [pi-tokyo-night-storm](https://www.npmjs.com/package/pi-tokyo-night-storm) | Tokyo Night Storm theme for pi coding agent | ⬇ 121/mo | ~1mo ago |
| [pi-cursor-theme](https://www.npmjs.com/package/pi-cursor-theme) | A Cursor-inspired dark theme for pi coding agent | ⬇ 110/mo | 2mo ago |
| [@juanibiapina/pi-tokyonight](https://www.npmjs.com/package/@juanibiapina/pi-tokyonight) | Tokyo Night theme for pi coding agent | ⬇ 108/mo | 3mo ago |
| [pi-theme-flexoki](https://www.npmjs.com/package/pi-theme-flexoki) | Flexoki theme for Pi coding agent - an inky color scheme for prose and code | ⬇ 99/mo | ~1mo ago |
| [@sherif-fanous/pi-dracula](https://www.npmjs.com/package/@sherif-fanous/pi-dracula) | Dracula themes for the Pi Coding Agent | ⬇ 88/mo | ~1mo ago |
| [@tran-quil/pi-rose-pine](https://www.npmjs.com/package/@tran-quil/pi-rose-pine) | All 3 Rosé Pine theme variants for Pi Coding Agent - All natural pine, faux fur and a bit of soho vibes for the classy minimalist | ⬇ 87/mo | 2mo ago |
| [@gravewhisper/pi-theme-monokai-classic](https://www.npmjs.com/package/@gravewhisper/pi-theme-monokai-classic) | A Monokai Classic theme for Pi with softer borders, balanced code colors, and neutral tool panels. | ⬇ 83/mo | 2mo ago |
| [@javiportillo/pi-hackerman](https://www.npmjs.com/package/@javiportillo/pi-hackerman) | A neon hacker-style color theme for pi coding agent | ⬇ 83/mo | 2mo ago |
| [pi-dracula](https://www.npmjs.com/package/pi-dracula) | Dracula theme for the pi coding agent | ⬇ 75/mo | ~1mo ago |
| [ameno-cyberdyne](https://www.npmjs.com/package/ameno-cyberdyne) | A high-contrast cyberpunk Pi theme inspired by synthwave aesthetics - electric cyan, hot pink, acid green, and golden amber | ⬇ 68/mo | 4mo ago |
| [pi-digital-rust-theme](https://www.npmjs.com/package/pi-digital-rust-theme) | A warm, tech-dystopian color scheme for Pi, inspired by corrupted hardware and failing systems. | ⬇ 60/mo | 2mo ago |
| [@ifiokjr/oh-pi-themes](https://www.npmjs.com/package/@ifiokjr/oh-pi-themes) | Color themes for pi: cyberpunk, nord, gruvbox, tokyo-night, catppuccin, and more. | ⬇ 50/mo | 3mo ago |
| [@ujjwalgrover/pi-catppuccin](https://www.npmjs.com/package/@ujjwalgrover/pi-catppuccin) | Beautiful Catppuccin themes for Pi Coding Agent | ⬇ 39/mo | 3mo ago |
| [@samfp/pi-rose-pine](https://www.npmjs.com/package/@samfp/pi-rose-pine) | Rosé Pine theme for pi. Soho vibes for your coding agent. | ⬇ 18/mo | 2mo ago |
| [iodic-pi-auto-theme](https://github.com/iodic/pi-auto-theme) | Automatically switch pi themes based on macOS system appearance | ⭐2 | ~1mo ago |
| [lulucatdev-pi-themes](https://github.com/lulucatdev/pi-themes) | OpenCode-ported themes and interactive /theme command for pi | ⭐2 | 2mo ago |
| [arach-contextual](https://github.com/arach/contextual) | Hangar-themed UI for context engineering on pi.dev sessions — three-pane workshop (threads / conversation / context rack), session-forest tree, built on HudsonKit. | ⭐1 | 5d ago |
| [justinclayton-pi-marathon-theme](https://github.com/justinclayton/pi-marathon-theme) | Cyberpunk UI theme for pi, inspired by Marathon (2026) and 80s/90s hacking aesthetics | ⭐1 | 10d ago |
| [manusajith-pi-ampere](https://github.com/manusajith/pi-ampere) | Amp-inspired framed editor UI and Tokyo Night theme for pi | ⭐1 | ~1mo ago |
| [@victor-software-house/pi-curated-themes](https://www.npmjs.com/package/@victor-software-house/pi-curated-themes) | Curated dark terminal themes for pi, adapted from iTerm2-Color-Schemes |  | ~1mo ago |
| [arjun-zosma-dotpi](https://github.com/arjun-zosma/dotpi) | my pi coding agent setup — themes, prompts, and opinions included |  | ~1mo ago |
| [CodyBontecou-pi-phone-tmux-compact-theme](https://github.com/CodyBontecou/pi-phone-tmux-compact-theme) | A minimal pi coding agent theme tuned for phones inside tmux. |  | 6d ago |
| [kartikkabadi-pi-composer-powerpack](https://github.com/kartikkabadi/pi-composer-powerpack) | Cursor Composer 2.5 powerpack for Pi: agent chains, dispatch teams, Pi-Pi experts, live subagents, Pi-to-Pi coms, damage-control safety, curated agents and mono-black theme. Install with pi install. R |  | today |
| [spences10/pi-themes](https://pi.dev/packages/@spences10/pi-themes) | Theme pack for the Pi coding agent. | 🌐Pi |  |
| [tanishqkancharla-pi-theme-sync](https://github.com/tanishqkancharla/pi-theme-sync) | Auto-switch Pi themes when macOS appearance changes |  | 18d ago |
| [victor-software-house-pi-term](https://github.com/victor-software-house/pi-term) | Live iTerm2 theme picker for Pi with embedded themes and debounced preview |  | ~1mo ago |


## Videos & Tutorials

*Talks, tutorials, walkthroughs, and demos from the community.*

| Name | Description | Popularity | Updated |
|------|-------------|----------:|--------:|
| [Claude Code + CMUX: The Ultimate AI Coding Terminal](https://youtube.com/watch?v=8oLP8oxqtOE) | Cmux is a revolutionary terminal by Lawrence Chen, built specifically for AI coding agents that gives them the power to control ... | 📺67.6k | 3mo ago |
| [GSD Is the Missing Piece For Claude Code](https://youtube.com/watch?v=uEit1oOJK0w) | Every AI coding agent framework claims to be the best. GSD, get shit done, is built different. Whether you use Claude Code, ... | 📺51.9k | 2mo ago |
| [Build Your Own Claude Code \| Full AI Coding Agent Tutorial](https://youtube.com/watch?v=k_D_C3ExypU) | In this video, we build our own AI coding agent inspired by tools like Claude Code completely from scratch and learn how modern ... | 📺35.8k | 6d ago |
| [Pi Coding Agent Setup After 2 Months](https://youtube.com/watch?v=DWWrLlM3gwQ) | My current Pi coding agent config for agentic engineering and everything else AI. 0:00 Intro 0:30 web-search 1:03 web-fetch 1:23 ... | 📺28.8k | 28d ago |
| [Pi: Open-Source AI Agent Terminal Set-Up](https://youtube.com/watch?v=04EL2_Llenc) | Check out Twingate and supercharge your security: https://bit.ly/3Y1OaZi Most AI coding agents are turning into huge platforms ... | 📺28.8k | 6d ago |
| [I Switched to Neovim + Tmux for AI Coding Agents. No Going Back](https://youtube.com/watch?v=C8EdaqLAxl8) | I walk you through my full terminal-first setup whichs integrates neovim and tmux with AI coding agents such as claude code and ... | 📺26.0k | 3mo ago |
| [Pi Coding Agent: The Minimal Coding Agent That Beats Claude Code and OpenCode](https://youtube.com/watch?v=8yac_swVw8I) | Pi Coding Agent is the open source terminal coding tool built by Mario Zechner that's quietly winning over senior engineers. | 📺25.2k | 22d ago |
| [Pi Agent – Crash Course \| Minimal Coding Agent](https://youtube.com/watch?v=N30XGyPrr6I) | Pi Agent is a lightweight terminal harness that gives you a powerful coding assistant without the bloat. Unlike traditional agents ... | 📺24.5k | 20d ago |
| [Pi Agent (Full Course)](https://youtube.com/watch?v=yAPKzHrx3eo) | This course gives you everything you need to use and extend Pi as your main AI coding agent. No fluff, hands-on, we'll go deep ... | 📺21.3k | 26d ago |
| [300 Tokens vs 10K \| Pi Wins Anyway](https://youtube.com/watch?v=KiplOks4NAs) | This video delves into Pi.dev (PI Agents) as a significant competitor to "claude code" and "opencode", emphasizing its extensible ... | 📺20.4k | 3mo ago |
| [Pi can run from your phone!](https://youtube.com/watch?v=iAQq0MndX9c) | https://github.com/badlogic/pi-telegram https://pi.dev/ | 📺19.7k | 25d ago |
| [PI Agent + Ollama + Gemma4: Super Lightweight and Highly Extensible AI Coding Agent](https://youtube.com/watch?v=1cF_Afc5_tA) | This video demonstrated how to install and use Pi Agent with Ollama and Gemma 4 including skills, extensions and subagents Pi ... | 📺16.4k | ~1mo ago |
| [pi - a radically minimal, opinionated multi-model coding agent](https://youtube.com/watch?v=4p2uQ4FQtis) | https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent. | 📺16.3k | 6mo ago |
| [Pi Coding Agent - Visual Plan Mode Extension](https://youtube.com/watch?v=XqFun9XCXPw) | Plannotator is the best plan mode plugin for Claude Code, and now it's here for Pi! Have Pi use a similar plan mode, then visually ... | 📺14.3k | 3mo ago |
| [The REAL reason Pi is better than Claude Code or Codex](https://youtube.com/watch?v=pr2WGRhVKys) | Download pi: https://pi.dev Download the Warp terminal: https://warp.dev. | 📺12.0k | 4d ago |
| [Simple Pi Subagents](https://youtube.com/watch?v=KRVYUkM16hE) | My current subagents extension for the Pi coding agent. Repo: https://github.com/amosblomqvist/pi-subagents. | 📺11.8k | 4d ago |
| [Pi Agent Creator on future of Agentic Coding](https://youtube.com/watch?v=PZ-sko1NWa0) | In this episode, I sat down with Mario Zechner, the creator of Pi Agent - one of the most talked about coding agents in the ... | 📺10.0k | ~1mo ago |
| [Short Demo of my Pi Todo Extension](https://youtube.com/watch?v=uPR7aAneg2U) | This is a short demo of my todos extension for pi that is modelled after the Claude Code task system. Extension: ... | 📺9.6k | 4mo ago |
| [Pi Coding Agent](https://youtube.com/watch?v=O-96yYDPMOc) | Let's have a look at the Pi coding agent. https://pi.dev/ Contact: david.devonduty@gmail.com #pi #coding-agent. | 📺9.5k | ~1mo ago |
| [PI Agent + Gemma 4 = Best Laptop AI Coding Setup!](https://youtube.com/watch?v=g94lMuhGlEY) | Your laptop just became an AI coding machine. PI coding agent + Google's Gemma 4 running locally through LM Studio — zero ... | 📺5.3k | 18d ago |
| [Best AI Coding CLI (Claude Code, Codex, OpenCode Alternative)](https://youtube.com/watch?v=P3onJNQhS60) | https://github.com/badlogic/pi-mono https://github.com/obra/superpowers. | 📺5.0k | 4mo ago |
| [Gemma 4 with Pi Coding Agent & llama.cpp \| Build LLM Resource Calculator with NextJS \| 🔴 Live](https://youtube.com/watch?v=ttklS6Yp0O8) | Let's setup Gemma 4 with Pi coding agent and run local coding agent with llama.cpp. We'll build a simple React/NextJS app with ... | 📺4.7k | ~1mo ago |
| [Is Pi the Best Coding Agent? Pi vs OpenCode vs Claude Code](https://youtube.com/watch?v=771PQEDeRmw) | I switched from OpenCode to Pi, a minimal and hackable AI coding agent for terminal first developers. In this video I compare Pi vs ... | 📺2.6k | yesterday |
| [oMLX + Pi Agent + Qwen3.6 35B = The Most Powerful Local Coding Setup](https://youtube.com/watch?v=gBBytfQbIxs) | In this video, I show you how to combine oMLX, Pi Coding Agent, and Qwen3.6 35B to build a complete application — 100% ... | 📺2.1k | 6d ago |
| [Pi Coding Agent Just Destroyed Claude Code (Here's Why)](https://youtube.com/watch?v=qOhaaJMGzwM) | Pi Coding Agent just quietly outperformed Claude Code, OpenAI Codex, OpenCode, and Google Antigravity — without a single ... | 📺1.7k | ~1mo ago |
| [Pi Coding Agent, Dark Factories & the Furniture Makers of Carolina](https://youtube.com/watch?v=-uB0KVAQIM8) | This episode covers the simultaneous release of Claude Opus 4.6 and GPT Codex 5.3, a deep dive into the Pi coding agent ... | 📺1.6k | 3mo ago |
| [Your AI Agent Is Coding Blind — GitNexus Changes That](https://youtube.com/watch?v=FDjFogArwWA) | Your AI coding agent doesn't know your codebase — it knows your files. GitNexus fixes that with a knowledge graph built for ... | 📺1.6k | 14d ago |
| [Pi Coding Agent (The Only Claude Code Competitor)](https://youtube.com/watch?v=tD6oiWLkXq4) | If you've been hearing about the Pi Coding Agent and wondering what's actually different about it, this video breaks it down in a ... | 📺1.5k | ~1mo ago |
| [Pi Coding Agent vs Claude Code, Codex & OpenCode](https://youtube.com/watch?v=dGCFj-IcuI0) | Pi Coding Agent ships with 4 tools and under 1000 tokens. Claude Code ships with everything. One of them might be wasting ... | 📺1.4k | 19d ago |
| [Pi Coding Agent: The Unrestricted Alternative to Claude Code](https://youtube.com/watch?v=KMTcJX89jFI) | The Pi Coding Agent by Mario Zechner is the backbone of Openclaw — and if Claude Code is VS Code, then Pi is Neovim. | 📺1.3k | 2mo ago |
| [Pi.dev explained by its creators \| AI Agents Under the Hood](https://youtube.com/watch?v=BQ_Es8k650I) | The Pi.Dev Community Meetup in Berlin: a technical, demo-heavy session for AI engineers, builders, and developers exploring ... | 📺1.2k | 20d ago |
| [Claude Code Wasted 100K Tokens. Pi Did It Better on Local Gemma 4](https://youtube.com/watch?v=_u4PLnc13ME) | In this video, I put Claude Code head-to-head against Pi Coding Agent, a minimal, no-nonsense coding agent — and the results ... | 📺1.2k | 24d ago |
| [Setup Pi Agent with Nvidia’s FREE AI Models (Step-by-Step)](https://youtube.com/watch?v=dHT7-sm_wl4) | Want to run powerful AI agents for free? In this video, we're setting up Pi Agent using Nvidia's hosted API models. Nvidia offers ... | 📺1.2k | 21d ago |
| [How to install PI Coding Agent on Windows 11](https://youtube.com/watch?v=vkTOC7T-LU4) | Install pi coding agent github Mariozechner/pi coding agent Pi-coding agent extensions Pi-coding agent GitHub Pi coding agent ... | 📺1.1k | 2mo ago |
| [My top 3 AI tools for 2026 (Opencode, Pi, vllm-studio)](https://youtube.com/watch?v=DPzrBSuzkho) | In this video I go over my top 3 AI tools in 2026 https://github.com/anomalyco/opencode https://github.com/badlogic/pi-mono ... | 📺1.1k | 4mo ago |
| [Pi-Mono : Minimalist AI Coding Agent & Toolkit (Review)](https://youtube.com/watch?v=cCzPb4NeazQ) | Most AI agents are bloated and slow. Pi (from the badlogic/pi-mono repo) is the opposite. It's a minimalist terminal powerhouse ... | 📺906 | 3mo ago |
| [Pi Agent + OpenCode: Step-by-Step Setup with FREE Kimi K2.6 (2026 Guide)](https://youtube.com/watch?v=-VPcfTwtKaI) | In this video, we are building the ultimate terminal-based AI coding stack for 2026. We're combining the minimalism of Pi Agent, ... | 📺850 | 18d ago |
| [Pi AI Agent and Coding Harness: Free, Open Source, Local, and Scary Good](https://youtube.com/watch?v=hvqiRdGko6g) | What if the best AI coding agent was completely free? Pi is a free, open-source AI coding and agent harness that punches way ... | 📺521 | 14d ago |
| [I Ran an Uncensored Local LLM Inside Pi Coding Agent (Qwen 3.6 + Gemma 4 uncensored live demo)](https://youtube.com/watch?v=pn4hGl6GJ0I) | First realtime test of a local LLM running inside the Pi Coding Agent harness. In this video I connect Qwen 3.6 to Pi Coding Agent ... | 📺442 | 25d ago |
| [1K+ Stars • AI Agents \| Pi vs Claude Code — Open Source Alternative #shorts](https://youtube.com/watch?v=e0Mb0bfpaP4) | Meet Pi Coding Agent—the open-source competitor taking on Claude Code. This repository showcases six customized Pi agent ... | 📺360 | 3d ago |
| [Pi Coding Agent (Free Course) (2026)](https://youtube.com/watch?v=6T46BslVzAc) | Pi Coding Agent (Free Course) (2026) If this tutorial helped you out please like & commenting down below if this works! Subscribe ... | 📺279 | 21d ago |
| [PI-AGENT Local LLM agentic benchmark: Gemma4-26B-A4B vs Qwen3.5-35B-A3B (NOTHINK)](https://youtube.com/watch?v=lhtkqvKbgto) | i test with pi-agent and agentic coding benchmark. | 📺212 | ~1mo ago |
| [Why Everyone Is Talking About Pi Agent](https://youtube.com/watch?v=8PJepXx0Jd0) | Pi Coding Agent is an open-source terminal coding harness from earendil-works. This deep dive looks at how it turns a model into ... | 📺208 | 6d ago |
| [PI: pi-coding-agent, a general framework](https://youtube.com/watch?v=y3ntCh8vF7Q) | 1. Layer-3. pi-coding-agent: 00:00 2. What is session? 00:40 Session log, tree structure: 01:46 Session compaction: 04:17 3. | 📺188 | 3mo ago |
| [pi-mono - GitHub Trending Today](https://youtube.com/watch?v=c4onFBGu260) | pi-mono - https://github.com/badlogic/pi-mono Watch Full Video: https://youtu.be/x9Ha83MeXJ0/ Do you wish there was a single ... | 📺171 | ~1mo ago |
| [Is This the Perfect AI Coding Assistant Setup?](https://youtube.com/watch?v=gfw3jBeLeqs) | In this video, I show you how to install and configure the Pi coding agent to unlock its full potential. I walk through the complete ... | 📺165 | 4d ago |
| [How the PI coding agent was built](https://youtube.com/watch?v=qS-aMKbVJ00) | In this video I rebuild the Pi coding agent from scratch and break down the anatomy of a real AI coding agent — tools, agent loops, ... | 📺162 | 19d ago |
| [PiCodingAgent: Minimal but Extensible AI Coding Agent](https://youtube.com/watch?v=d5BdCxdNNp0) | In this video, I show how to connect Pi Coding Agent to local llm server hosted via mlx-lm. Interested in Opencode? If yes ... | 📺146 | ~1mo ago |
| [Your Own Perplexity Deep Search Tool Using Pi Coding Agent](https://youtube.com/watch?v=yqwT5sGSlJk) | Pi (pi.dev) is a coding agent, but it can be more than that. Its extension system makes Pi the ultimate custom command line tool. | 📺142 | ~1mo ago |
| [Day 5: pi agent - not codex or claude code](https://youtube.com/watch?v=KTjKYlQV97I) | pi agent - not codex or claude code. | 📺136 | 20d ago |
| [Agent Harnesses, Stripe's Minions & Open Source Acqui-hires (Ep. 3)](https://youtube.com/watch?v=lkOt1cMQ5EM) | Michael and I break down the latest wave of AI coding agent harnesses — from the ultra-minimal Pi Coding Agent (literally 4 tools: ... | 📺125 | 2mo ago |
| [Oh My Pi: AI Coding Agent That Actually Understands Your Codebase](https://youtube.com/watch?v=LtcklC3FFhg) | Oh My Pi is an AI coding agent designed for developers who want intelligent code editing without the guesswork. It uses ... | 📺102 | 4d ago |
| [Pi Coder First Impressions(with GPT 5.5 & Local Models)](https://youtube.com/watch?v=ycYESgx_P70) | Let's talk about Pi Coder, a highly customizable minimalist coding agent. For more information, check out https://pi.dev/. | 📺70 | 9d ago |
| [Pi Coding Agent Review: The Minimalist AI Harness That Modifies Itself](https://youtube.com/watch?v=5sBoPualwTY) | In this video, I take Pi (https://pi.dev) for a spin — the minimal, self-modifying terminal coding agent by Mario Zechner. | 📺68 | 6d ago |
| [Pi Coding Agent + Archo Explained](https://youtube.com/watch?v=NH-LeJpgBeE) | This video breaks down Pi Coding Agent + Archo Explained. Claude Code used to be simple, predictable, and easy to mold to ... | 📺49 | ~1mo ago |
| [This Repo Has 5.4K Stars \| pi-mono #github #coding #opensource](https://youtube.com/watch?v=0cBr6WVt1t8) | pi-mono just hit 5400+ stars on GitHub! AI agent toolkit featuring: coding agent CLI, unified LLM API, TUI & web UI libraries, Slack ... | 📺48 | 4mo ago |
| [Sync active nvim theme to pi coding agent](https://youtube.com/watch?v=sQq8Bhqig5E) | A short demo showing automatically sync active nvim theme to the pi coding agent (pi.dev). Get the plugin here ... | 📺46 | ~1mo ago |
| [Pi Coding Agent Custom Theme and Animated Gif During Thought](https://youtube.com/watch?v=28MLpm4NSBs) | Pi Agent is a great alternative to Claude Code. I made a theme and extension that shows an animated GIF every time an AI agent ... | 📺39 | 3mo ago |
| [Questo Agente AI Gratuito fa PAURA 🤯 (Pi Agent vs OpenCode)](https://youtube.com/watch?v=XuYxGc0dJwc) | Nella puntata di oggi sveliamo i veri pesi massimi degli AI agent! Siamo andati a testare a fondo Pi Agent: è totalmente free, ... | 📺25 | 3d ago |
| [Pi Coding Agent — AI Agent Spotlight](https://youtube.com/watch?v=mlPuvCB0ZeQ) | Learn more about Pi Coding Agent on AI Agent Store: https://aiagentstore.ai/ai-agent/pi-coding-agent List of AI Agents from ... | 📺19 | ~1mo ago |
| [Pi Coding Agent vs Claude Code vs OpenCode — I Tested All 3](https://youtube.com/watch?v=8pfPf8Wmcrc) | Pi Coding Agent is the open source terminal tool by Mario Zechner — the engineer behind libGDX — that's quietly winning over ... | 📺19 | today |
| [Pi Coding Agent — The AI That Codes Like You Think](https://youtube.com/watch?v=rozfrxpRTao) | Pi Coding Agent is a next-generation AI coding tool that understands your intent. Unlike traditional assistants, Pi uses a unique ... | 📺14 | 6d ago |
| [43K Stars: The Ultimate Secret AI Agent Toolkit [2026]](https://youtube.com/watch?v=B945C1aw6Dw) | 43700 stars. 4000 commits. ONE developer. pi-mono is a brutal all-in-one AI coding ecosystem. Why do they auto-close your PRs ... | 📺6 | 23d ago |
| [pi-computer-use Review: Semantic Computer Use for Pi Agents on macOS](https://youtube.com/watch?v=Oayp5VtBWl0) | A source-grounded review of pi-computer-use, a macOS-first Pi extension that gives agents semantic computer-use tools with ... | 📺4 | ~1mo ago |


## Articles

*Blog posts, discussions, and community coverage from around the web.*

| Name | Description | Popularity | Updated |
|------|-------------|----------:|--------:|
| [Show HN: Pi-coding-agent: Emacs front end for AI-assisted coding](https://github.com/dnouri/pi-coding-agent) | A new Emacs mode for AI-assisted coding (Claude Code style), with native Emacs buffers instead of a flickering terminal. Built on top of pi, a no-bs open source Claude Code alternative. It supports Cl | 📌4 | 4mo ago |
| [Show HN: A Pi Harness for Color Correcting Multi-Clip Footage](https://github.com/perbhat/agentic-color-grader) | Hey guys, created a color grading harness for the pi coding agent to color correct S-Log3 footage. This gives claude access to both images (watching the frame) and also to meters like rgb gamma, color | 📌2 | 3mo ago |
| [Show HN: HF-agents, CLI extension to find the best model/quant for your hardware](https://github.com/huggingface/hf-agents) | We've been building out CLI extensions for the Hugging Face hub, and hf-agents is a fun one to share. It uses llmfit under the hood to profile your hardware and automatically select the best-fit model | 📌2 | 2mo ago |
| [Show HN: Rakenne – Markdown-defined agentic workflows for structured documents](https://rakenne.app) | Hi! I’m the creator of Rakenne and I built it because I noticed a recurring problem with LLMs in professional settings: chat-based document creation is unpredictable and hard to scale for domain exper | 📌2 | 3mo ago |
| [blackbelt-technology/pi-agent-dashboard](https://pi.dev/packages/@blackbelt-technology/pi-agent-dashboard) | Web dashboard for monitoring and interacting with pi agent sessions · Install @blackbelt-technology/pi-agent-dashboard from npm and Pi will load the resources declared by the package manifest | 🌐Pi |  |
| [How To Install Pi Coding Agent and Set Up Your First Project](https://www.implicator.ai/how-to-install-pi-coding-agent-and-set-up-your-first-project/) | Install Pi Coding Agent from the official npm package, authenticate one provider, write a practical AGENTS.md file, run a read-only smoke test, and make a controlled first edit. This intermediate tuto | 🌐Implicator |  |
| [Package Catalog · Pi](https://pi.dev/packages?name=web) | Extensions, skills, prompt templates, and themes published to npm. Install with pi install npm:. See the package docs for details · Web search, URL fetching, GitHub repo cloning, PDF extraction, YouTu | 🌐Pi |  |
| [pi - Coding Agent](https://ailearnedtoday.com/ref/pi.dev/) | There are many coding agents, but this one is mine · Pi is a minimal terminal coding harness. A coding agent designed for customization and control, not dictating workflows | 🌐Ailearnedtoday |  |
| [Pi Coding Agent](https://pi.dev/docs/latest/quickstart) | Guides and references for configuring and extending Pi · This page gets you from install to a useful first pi session | 🌐Pi |  |
| [Pi Coding Agent](https://pi.dev/packages/pi-subagents) | Pi extension for delegating tasks to subagents with chains, parallel execution, and TUI clarification · Install pi-subagents from npm and Pi will load the resources declared by the package manifest | 🌐Pi |  |
| [Pi Coding Agent](https://pi.dev/packages/pi-web-access) | Web search, URL fetching, GitHub repo cloning, PDF extraction, YouTube video understanding, and local video analysis for Pi coding agent · Install pi-web-access from npm and Pi will load the resources | 🌐Pi |  |
| [Pi Coding Agent - AI Agent](https://aiagentstore.ai/ai-agent/pi-coding-agent) | An open-source terminal coding agent that developers can extend with packages, skills, prompts, and custom workflows. | 🌐AI Agent Store |  |
| [Pi Coding Agent Setup Guide: Install, Configure Models, and Best Extensions](https://www.bitdoze.com/pi-coding-agent-setup-guide/) | Step-by-step guide to installing Pi coding agent, connecting cheap models like MiniMax M2.7 and Qwen 3.6, and setting up the most useful extensions. Covers LazyPi one-command setup and the Rust port a | 🌐Zoxide |  |
| [Pi Coding Agent: A Self-Documenting, Extensible AI Partner - DEV Community](https://dev.to/theoklitosbam7/pi-coding-agent-a-self-documenting-extensible-ai-partner-dn) | Exploring Pi's ability to read its own documentation, understand its codebase, and help extend or modify its behavior through natural conversation. Tagged with ai, agents, agentskills. | 🌐DEV Community |  |
| [Pi coding agent: how to install (npm) extensions? - #2 by boxenlude - Help - NixOS Discourse](https://discourse.nixos.org/t/pi-coding-agent-how-to-install-npm-extensions/77030/2) | Hi all! I’ve installed the pi-coding-agent package from unstable. It works fine, but installing extensions (e.g. pi-mcp-adapter) does not work, because it calls npm install under the hood (I assume) a | 🌐NixOS Discourse |  |
| [pi-init - npmx](https://npmx.dev/package/pi-init) | A pi agent skill to initialize or update AGENTS.md context files. | 🌐npmx |  |
| [pi-package-template](https://pi.dev/packages/pi-package-template) | # 1. Clone this template git clone https://github.com/YOU/pi-package-template.git my-pi-package cd my-pi-package # 2. Install dev dependencies (for type checking) npm install # 3. Edit package.json —  | 🌐Pi |  |
| [pi-tokensaver CDN by jsDelivr - A CDN for npm and GitHub](https://www.jsdelivr.com/package/npm/pi-tokensaver) | A free, fast, and reliable CDN for pi-tokensaver. Give your Pi AI agent a semantic memory — bridges tokensave's Rust-powered local graph engine into your coding workflow for token-efficient codebase e | 🌐jsDelivr |  |
| [pi-workflow 0.1.7 on npm - Libraries.io - security & maintenance data for open source software](https://libraries.io/npm/pi-workflow) | Visual companion for pi coding agent workflows - 0.1.7 - a TypeScript package on npm | 🌐Libraries.io |  |
| [Pi: The Minimal Coding Agent That Wins by Doing Less \| atal upadhyay](https://atalupadhyay.wordpress.com/2026/05/05/pi-the-minimal-coding-agent-that-wins-by-doing-less/) | If you've been using AI coding assistants lately, you've probably felt it: More features → more complexity → more things that can break Sub-agents, plan mode, MCP integrations… but you still just want | 🌐atal upadhyay |  |
| [Pi.dev Review: Secure Terminal AI Agent (2026) - Petronella Cybersecurity News](https://petronellatech.com/blog/pi-dev-platform-review/) | Pi.dev terminal AI coding agent reviewed for regulated teams: HIPAA, CMMC, and self-hosted LLM fit, by Petronella Technology Group, RPO #1449. | 🌐Petronellatech |  |
| [r/ClaudeCode on Reddit: Change your coding agent to pi](https://www.reddit.com/r/ClaudeCode/comments/1qu5fa4/change_your_coding_agent_to_pi/) | https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent | 🌐Reddit |  |
| [r/LocalLLM on Reddit: Pi coding agent is amazing (or how I learned to stop worrying and leave OpenCode)](https://www.reddit.com/r/LocalLLM/comments/1ta2tzz/pi_coding_agent_is_amazing_or_how_i_learned_to/) | 38 votes, 51 comments. Warning: long post ahead. On the plus side, it’s completely human-written. No AI slop was used in writing this post. I’m old… | 🌐Reddit |  |
| [r/PiCodingAgent on Reddit: What you guys have been using for web search/fetch on Pi?](https://www.reddit.com/r/PiCodingAgent/comments/1t2yeax/what_you_guys_have_been_using_for_web_searchfetch/) | 14 votes, 30 comments. Hi! I'm new on Pi agent world and I'm missing some good package or tool to make web search properly. What are you guys using… | 🌐Reddit |  |
| [The coding-agent harness you can make your own \| Pi Coding Agent \| Product Hunt](https://www.producthunt.com/products/pi-coding-agent-3) | Pi is a minimal terminal coding harness. Adapt Pi to your workflows, not the other way around. Customize Pi with extensions, skills, prompt templates, and themes. Bundle them as Pi packages and share  | 🌐Product Hunt |  |
| [tintinweb/pi-subagents - Pi Coding Agent](https://pi.dev/packages/@tintinweb/pi-subagents) | A pi extension extension that brings smart Claude Code-style autonomous sub-agents to pi · Install @tintinweb/pi-subagents from npm and Pi will load the resources declared by the package manifest | 🌐Pi |  |
| [What Is Pi Agent?](https://aisoftwaresystems.com/blog/what-is-pi-agent/) | What is Pi Agent? Explore this lightweight, open-source terminal AI coding agent with just four tools. Ideal for developers and businesses seeking efficient AI automation solutions. | 🌐AI Software Systems |  |


## Miscellaneous

*CLIs, dashboards, providers, templates, configurations, and other pi-related projects.*

| Name | Description | Popularity | Updated |
|------|-------------|----------:|--------:|
| [@gonrocca/zero-pi](https://www.npmjs.com/package/@gonrocca/zero-pi) | zero-pi — an installable layer for pi (pi.dev): the zero spec-driven development workflow (explore → plan → build → veredicto) with per-phase model autotune and token-efficient batched builds. Adds ca | ⬇ 6.0k/mo | yesterday |
| [@os-eco/mulch-cli](https://www.npmjs.com/package/@os-eco/mulch-cli) | Let your agents grow 🌱 — structured expertise files that accumulate over time, live in git, work with any agent | ⬇ 4.8k/mo | 10d ago |
| [@companion-ai/feynman](https://www.npmjs.com/package/@companion-ai/feynman) | Research-first CLI agent built on Pi and alphaXiv | ⬇ 4.5k/mo | 9d ago |
| [@robzolkos/lazypi](https://www.npmjs.com/package/@robzolkos/lazypi) | Opinionated one-shot installer for a full-featured Pi coding agent setup. | ⬇ 3.6k/mo | 5d ago |
| [@apmantza/greedysearch-pi](https://www.npmjs.com/package/@apmantza/greedysearch-pi) | Headless multi-engine AI search (Perplexity, Bing Copilot, Google AI) via browser automation -- NO API KEYS needed. Extracts answers with sources, optional synthesis. Grounded AI answers from real bro | ⬇ 3.0k/mo | today |
| [clickup-cu](https://www.npmjs.com/package/clickup-cu) | Fast ClickUp CLI for daily task workflow, with optional Pi prompt shortcut. | ⬇ 1.7k/mo | 15d ago |
| [@os-eco/seeds-cli](https://www.npmjs.com/package/@os-eco/seeds-cli) | Git-native issue tracker for AI agent workflows | ⬇ 1.6k/mo | 7d ago |
| [bmw-lex](https://www.npmjs.com/package/bmw-lex) | Lex — BMW Legal AI Agent Platform built on Pi | ⬇ 1.5k/mo | 29d ago |
| [opencandle](https://www.npmjs.com/package/opencandle) | Financial trading & investing agent | ⬇ 1.5k/mo | 10d ago |
| [@touchskyer/memex](https://www.npmjs.com/package/@touchskyer/memex) | Zettelkasten-based agent memory system with bidirectional links | ⬇ 1.5k/mo | today |
| [@curl.md/pi](https://www.npmjs.com/package/@curl.md/pi) | URL to markdown for Pi | ⬇ 1.3k/mo | 16d ago |
| [@chewey182/multipi](https://www.npmjs.com/package/@chewey182/multipi) | Multi-agent orchestration system for pi-coding-agent with subagents, web search, and URL fetching | ⬇ 1.3k/mo | 27d ago |
| [split-editor](https://www.npmjs.com/package/split-editor) | Open pi prompt editing in a live tmux split editor without freezing the pi UI. | ⬇ 1.2k/mo | 11d ago |
| [disler-pi-vs-claude-code](https://github.com/disler/pi-vs-claude-code) | Comparison between open source PI agent and closed source Claude Code agent | ⭐1.2k | 14d ago |
| [tmlpd-pi](https://www.npmjs.com/package/tmlpd-pi) | Research-backed Multi-LLM Router with parallel execution, learned routing (RouteLLM), prefix caching (RadixAttention), speculative decoding (Medusa/EAGLE), token compression (ISON), local LLM support  | ⬇ 1.0k/mo | 11d ago |
| [voipi](https://www.npmjs.com/package/voipi) |  | ⬇ 926/mo | 29d ago |
| [oh-pi](https://www.npmjs.com/package/oh-pi) | One-click setup for pi-coding-agent. Like oh-my-zsh for pi. | ⬇ 871/mo | 3mo ago |
| [@roodriigoooo/trail](https://www.npmjs.com/package/@roodriigoooo/trail) | Trail: session artifacts and fresh-session checkpoints for Pi | ⬇ 792/mo | 2d ago |
| [spotme](https://www.npmjs.com/package/spotme) | SpotMe — gym mode for agentic coding. Works with OpenCode and Pi. | ⬇ 774/mo | 10d ago |
| [@akuzmenko/rgk](https://www.npmjs.com/package/@akuzmenko/rgk) | ripgrep with an LLM-powered --keep post-filter | ⬇ 746/mo | 14d ago |
| [@callumvass/forgeflow-pm](https://www.npmjs.com/package/@callumvass/forgeflow-pm) | Dev pipeline for Pi — TDD implementation, code review, architecture, and Datadog investigations. | ⬇ 736/mo | ~1mo ago |
| [@martintrojer/mu](https://www.npmjs.com/package/@martintrojer/mu) | A persistent, observable crew of pi agents running in one tmux session per workstream, coordinated through a built-in task DAG. | ⬇ 721/mo | 2d ago |
| [tau-mirror](https://www.npmjs.com/package/tau-mirror) | Web UI that mirrors your Pi terminal session in the browser | ⬇ 649/mo | 3mo ago |
| [effect-mode](https://www.npmjs.com/package/effect-mode) | Dynamic context resolver effects for pi | ⬇ 641/mo | 11d ago |
| [ears-spec-engine](https://www.npmjs.com/package/ears-spec-engine) | EARS Spec-Driven Development — Kiro-inspired SDD with EARS notation, design docs, and dependency-tracked tasks | ⬇ 633/mo | 7d ago |
| [vim-motions-pi](https://www.npmjs.com/package/vim-motions-pi) | A focused Vim-style editing layer for pi, with motions, text objects, visual selections, and clipboard sync | ⬇ 570/mo | 23d ago |
| [@arvoretech/hub-pi](https://www.npmjs.com/package/@arvoretech/hub-pi) | Pi runtime package for hub.yaml workspaces — interprets config at runtime with no static generation | ⬇ 497/mo | 3d ago |
| [showsignature](https://www.npmjs.com/package/showsignature) | Extract structure from code. Turn source files into clean, readable artifacts. | ⬇ 493/mo | 4d ago |
| [@black-knight.dev/emet](https://www.npmjs.com/package/@black-knight.dev/emet) | Zero-setup grounded web research for AI coding agents. | ⬇ 486/mo | yesterday |
| [HazAT-pi-interactive-subagents](https://github.com/HazAT/pi-interactive-subagents) | Interactive subagents for pi — spawn, orchestrate, and manage sub-agent sessions in cmux terminals | ⭐480 | 13d ago |
| [open-agent-team](https://www.npmjs.com/package/open-agent-team) | Declarative multi-agent orchestration powered by pi-coding-agent: Admin → Leader → Worker hierarchy, team.json config, isolated workspaces (git worktree), and the oat CLI. | ⬇ 448/mo | 13d ago |
| [@odradekk/vera-subagents](https://www.npmjs.com/package/@odradekk/vera-subagents) | Subagent orchestration for Vera agent (explorer, librarian, thinker, worker) | ⬇ 342/mo | 17d ago |
| [@companionai/bohr](https://www.npmjs.com/package/@companionai/bohr) | Research-first CLI agent built on Pi and alphaXiv | ⬇ 338/mo | ~1mo ago |
| [tmustier-pi-for-excel](https://github.com/tmustier/pi-for-excel) | Experimental Excel sidebar agent add-in. Multi-model. Powered by Pi. | ⭐333 | 6d ago |
| [@odradekk/vera-memory](https://www.npmjs.com/package/@odradekk/vera-memory) | Structured memory system for Vera agent (SQLite + vector search) | ⬇ 326/mo | 20d ago |
| [arisa](https://www.npmjs.com/package/arisa) | Telegram + Pi Agent modular assistant | ⬇ 322/mo | ~1mo ago |
| [@odradekk/vera-chimeras](https://www.npmjs.com/package/@odradekk/vera-chimeras) | Chimera workflow engine for Vera agent | ⬇ 319/mo | 17d ago |
| [rstack-agents](https://www.npmjs.com/package/rstack-agents) | Production-ready agentic SDLC framework for Pi and coding agents — orchestrator, builder/validator teams, lifecycle state, and specialist reuse | ⬇ 307/mo | 8d ago |
| [teach-me](https://www.npmjs.com/package/teach-me) | A Socratic learning system with literature review and curriculum building | ⬇ 307/mo | 8d ago |
| [@odradekk/vera-setup](https://www.npmjs.com/package/@odradekk/vera-setup) | Setup CLI for deploying Vera agent resources to Pi coding agent | ⬇ 300/mo | 20d ago |
| [deword](https://www.npmjs.com/package/deword) | 🪱 De-Words your documents for AI agents. Read, edit, fill forms, replace text — all without breaking formatting. | ⬇ 299/mo | 11d ago |
| [@shaurya-sethi/primus](https://www.npmjs.com/package/@shaurya-sethi/primus) | CAD generation agent built on Pi and build123d | ⬇ 278/mo | 11d ago |
| [@grothesque/sandburg](https://www.npmjs.com/package/@grothesque/sandburg) | Pi sandbox balancing security, usability and agent autonomy; for Linux | ⬇ 226/mo | 8d ago |
| [@odradekk/vera-scheme-sandbox](https://www.npmjs.com/package/@odradekk/vera-scheme-sandbox) | Chez Scheme WASM sandbox for Vera agent — platform-independent Scheme evaluation | ⬇ 216/mo | 20d ago |
| [@melihmucuk/leash](https://www.npmjs.com/package/@melihmucuk/leash) | Security guardrails for AI coding agents | ⬇ 182/mo | 2mo ago |
| [@quant-pi/ext](https://www.npmjs.com/package/@quant-pi/ext) | Small, hand-written, composable modules for pi-agent — inspired by mini.nvim, focused on simple, predictable building blocks for coding agents. | ⬇ 157/mo | 20d ago |
| [ypi](https://www.npmjs.com/package/ypi) | ypi — a recursive coding agent. Pi that can call itself via rlm_query. | ⬇ 155/mo | ~1mo ago |
| [slopmeter](https://www.npmjs.com/package/slopmeter) | CLI for generating yearly usage heatmaps for Claude Code, Codex, Cursor, Open Code, and Pi Coding Agent. | ⬇ 131/mo | 2mo ago |
| [@juliusbrussee/caveman-markdown-preview](https://www.npmjs.com/package/@juliusbrussee/caveman-markdown-preview) | Rendered markdown + LaTeX preview for caveman-code, with terminal, browser, and PDF output | ⬇ 126/mo | 7d ago |
| [cc-grammar](https://www.npmjs.com/package/cc-grammar) | Grammar checking for coding agents — Claude Code, Pi, Codex CLI, Gemini CLI | ⬇ 122/mo | ~1mo ago |
| [simple-subs](https://www.npmjs.com/package/simple-subs) | Lightweight subagent dispatch for Pi — single, parallel, async with peer messaging | ⬇ 122/mo | 14d ago |
| [@interleavelove/keating](https://www.npmjs.com/package/@interleavelove/keating) | A Pi-powered hyperteacher package with self-improving teaching policies, lesson maps, and animated visual teaching artifacts. | ⬇ 120/mo | 4d ago |
| [haagent](https://www.npmjs.com/package/haagent) | ahaasler's agent | ⬇ 118/mo | 18d ago |
| [@open-pets/pi](https://www.npmjs.com/package/@open-pets/pi) |  | ⬇ 117/mo | 5d ago |
| [lazy-pi](https://www.npmjs.com/package/lazy-pi) | You love LazyVim. You're gonna love LazyPi. | ⬇ 117/mo | ~1mo ago |
| [@actant/pi](https://www.npmjs.com/package/@actant/pi) | Pi Agent backend for the Actant platform — built on pi-agent-core and pi-ai | ⬇ 113/mo | 3mo ago |
| [@saibolla/ada](https://www.npmjs.com/package/@saibolla/ada) | The AI research agent for the terminal | ⬇ 113/mo | ~1mo ago |
| [@anfilat/bit-by-bit](https://www.npmjs.com/package/@anfilat/bit-by-bit) | Step-by-step task management for Pi — splits LLM output into isolated task branches | ⬇ 102/mo | 14d ago |
| [hive-agent](https://www.npmjs.com/package/hive-agent) | Hive — Lightweight Feature Tracker for AI Coding Agents. Built on Pi. | ⬇ 86/mo | 3mo ago |
| [@jyking/jypi](https://www.npmjs.com/package/@jyking/jypi) |  | ⬇ 83/mo | 21d ago |
| [@stenn/tps-monitor](https://www.npmjs.com/package/@stenn/tps-monitor) | Minimal tokens-per-second display in pi footer | ⬇ 80/mo | ~1mo ago |
| [vscode-pi-companion](https://www.npmjs.com/package/vscode-pi-companion) | Share VS Code context with pi coding agent | ⬇ 77/mo | 2mo ago |
| [dungle-scrubs-tallow](https://github.com/dungle-scrubs/tallow) | A coding agent CLI and library built on pi-coding-agent | ⭐68 | 7d ago |
| [@clankie/web-search](https://www.npmjs.com/package/@clankie/web-search) | Headless web search and page extraction for clankie using CloakBrowser + Playwright | ⬇ 65/mo | 2mo ago |
| [knoopx-pi](https://github.com/knoopx/pi) | pi.ai config | ⭐56 | 6d ago |
| [@felixoid/py-yank](https://www.npmjs.com/package/@felixoid/py-yank) | Pi agent copy command: enhanced /y (yank/copy) for indexed and rendered assistant message clipboard copy | ⬇ 53/mo | 3d ago |
| [askbudi-juno-code](https://github.com/askbudi/juno-code) | Ralph Wiggum meet Kanban! Ralph style execution for [Claude Code, Codex, Pi, Cursor]. One task per iteration, automatic progress tracking, and git commits. Set it and let it run. | ⭐53 | 18d ago |
| [@clankie/memory](https://www.npmjs.com/package/@clankie/memory) | Persistent memory with TursoDB native vector search for clankie | ⬇ 49/mo | 3mo ago |
| [caveman-pi](https://www.npmjs.com/package/caveman-pi) | Caveman mode for pi — terse, no-fluff LLM responses with a /caveman toggle | ⬇ 48/mo | ~1mo ago |
| [@ifiokjr/oh-pi-prompts](https://www.npmjs.com/package/@ifiokjr/oh-pi-prompts) | Prompt templates for pi: review, fix, explain, refactor, test, commit, and more. | ⬇ 46/mo | 3mo ago |
| [leapmux-leapmux](https://github.com/leapmux/leapmux) | AI Coding Agent Multiplexer | ⭐44 | 2d ago |
| [@browser-annotations/pi](https://www.npmjs.com/package/@browser-annotations/pi) | Select an element, add feedback, and send it to pi. | ⬇ 39/mo | ~1mo ago |
| [hunvreus-pi-hosts](https://github.com/hunvreus/pi-hosts) | Give the Pi coding agent access to your servers. | ⭐37 | 27d ago |
| [tokely](https://www.npmjs.com/package/tokely) | CLI for generating yearly usage heatmaps for Claude Code, Codex, Cursor, Gemini CLI, Open Code, and Pi Coding Agent. | ⬇ 37/mo | ~1mo ago |
| [philipp-spiess-modern](https://github.com/philipp-spiess/modern) | Agentic development environment for pi | ⭐36 | 3mo ago |
| [@ifreeman666/agent-context](https://www.npmjs.com/package/@ifreeman666/agent-context) | Shared repository-native context management for Codex, Claude Code, and pi-coding-agent. | ⬇ 35/mo | 3mo ago |
| [lukasl-dev-pi.nix](https://github.com/lukasl-dev/pi.nix) | Nix flake for pi, a terminal coding agent. | ⭐34 | today |
| [espennilsen-pilot](https://github.com/espennilsen/pilot) | A desktop coding agent with a GUI. Electron + React app powered by Pi Coding Agent. A chat-driven development with sandboxed file editing, git integration, dependency-aware task management, persistent | ⭐32 | 8d ago |
| [llm-water-pi](https://www.npmjs.com/package/llm-water-pi) | Track Pi-agent session token usage, costs, and water consumption. Daily, monthly, and session reports with water footprint data. | ⬇ 29/mo | ~1mo ago |
| [shaftoe-pi-coding-agent-action](https://github.com/shaftoe/pi-coding-agent-action) | GitHub action to integrate https://pi.dev/ coding agent with GitHub-compatible CI/CD, issues and PRs | ⭐28 | yesterday |
| [@ws-rush/conductor](https://www.npmjs.com/package/@ws-rush/conductor) | Context-Driven Development framework. Measure twice, code once. | ⬇ 25/mo | 2mo ago |
| [cv-pi-action](https://github.com/cv/pi-action) | GitHub Action to invoke the PI coding agent on issues and PRs via comment triggers | ⭐24 | 22d ago |
| [jeffton-batty](https://github.com/jeffton/batty) | PWA built on Pi coding agent | ⭐24 | yesterday |
| [cfal-garcon](https://github.com/cfal/garcon) | A local AI coding workspace for Claude Code, Codex, Cursor, OpenCode, Amp, Factory Droid, Pi, and OpenAI/Anthropic-compatible models. | ⭐19 | today |
| [tensorfish-pi-telegram](https://github.com/tensorfish/pi-telegram) | Connect Pi Agent Harness to Telegram | ⭐18 | 2mo ago |
| [perminder-klair-locca](https://github.com/perminder-klair/locca) | A TUI around llama.cpp for running, managing, and benchmarking local GGUF models and launching the pi coding agent against your local server. | ⭐13 | 6d ago |
| [steel-experiments-durable-researcher](https://github.com/steel-experiments/durable-researcher) | Self-hosted deep research agent with durable execution. Pi Agent SDK + Absurd + Steel. | ⭐12 | today |
| [leohenon-pi-vim](https://github.com/leohenon/pi-vim) | Vim mode for pi with motions, text objects, and visual mode. | ⭐10 | 14d ago |
| [p1rallels-pi-op](https://github.com/p1rallels/pi-op) | complete .env secrets handling replacement for agentic development within the Pi agent harness - secure secret injection, redaction, and vault browsing via the 1Password SDK | ⭐10 | ~1mo ago |
| [DeevsDeevs-deevs-pi-kit](https://github.com/DeevsDeevs/deevs-pi-kit) | Perfect pi kit to be 10x Deevs' engineer | ⭐9 | 16d ago |
| [doer-ee-pi-telegram-bot](https://github.com/doer-ee/pi-telegram-bot) | Private Telegram remote bot for Pi sessions | ⭐9 | 14d ago |
| [dkmaker-hass-pi-agent](https://github.com/dkmaker/hass-pi-agent) | Pi Agent for Home Assistant — AI coding agent add-on with full HA access | ⭐6 | ~1mo ago |
| [jkuball-pi-discuss](https://github.com/jkuball/pi-discuss) | inline-answers for your clanker from the cozyness of your editor | ⭐6 | 18d ago |
| [kngzzz-pi-programmatic-agents](https://github.com/kngzzz/pi-programmatic-agents) | Programmatic sub-agent primitive for Pi — invoke isolated sub-agents as functions with contracted outputs | ⭐6 | 3mo ago |
| [lhr0909-pi-obsidian](https://github.com/lhr0909/pi-obsidian) | Putting pi-agent inside Obsidian. | ⭐6 | 17d ago |
| [oines-nekoclaw](https://github.com/oines/nekoclaw) | Multi-agent chat runtime for Telegram and QQ/NapCat, built on pi-coding-agent with Docker-isolated agent workspaces. | ⭐6 | ~1mo ago |
| [deflating-psst](https://github.com/deflating/psst) | Ephemeral side questions for pi — ask without cluttering your conversation history | ⭐5 | 2mo ago |
| [hvent90-pi-pringles-dod-capsules](https://github.com/hvent90/pi-pringles-dod-capsules) | Agent-controlled context window management for pi-coding-agent - a Pringles x DoD collaboration | ⭐5 | 2mo ago |
| [iamfozzy-coppice](https://github.com/iamfozzy/coppice) | A desktop app for managing Git worktrees, AI agents, and development workflows in a unified interface. Supports Claude Code and PI Agent. | ⭐5 | 6d ago |
| [stefan2904-dockerized-pi](https://github.com/stefan2904/dockerized-pi) | run pi in docker | ⭐5 | today |
| [VaclavSynacek-pi-coding-agent-termux](https://github.com/VaclavSynacek/pi-coding-agent-termux) | Termux port of pi-coding-agent | ⭐5 | 4mo ago |
| [cemoody-pi-crust](https://github.com/cemoody/pi-crust) | Mobile-first self-hosted web control plane for many concurrent Pi coding-agent sessions | ⭐4 | yesterday |
| [leohenon-pi-mux](https://github.com/leohenon/pi-mux) | Tmux-powered session multiplexer for Pi. | ⭐4 | 8d ago |
| [MattFlower-tempest](https://github.com/MattFlower/tempest) | Tempest is a macOS Desktop Application for Claude, Codex, and Pi that helps maintain your focus | ⭐4 | 14d ago |
| [monotykamary-pi-double-esc](https://github.com/monotykamary/pi-double-esc) | Prevent accidental Escape from aborting the LLM — requires double-press to interrupt while streaming | ⭐4 | 5d ago |
| [oratis-LISA](https://github.com/oratis/LISA) | An AI agent with a real self — soul she wrote, desires that drive her, a heartbeat for autonomous action, dreams she processes when you're away. Capability superset of pi-mono / OpenClaw / hermes-agen | ⭐4 | 5d ago |
| [fuyunfei-pi-agent-just](https://github.com/fuyunfei/pi-agent-just) | Browser-based AI coding playground — pi-coding-agent + just-bash fusion | ⭐3 | 3mo ago |
| [mralifakbar-pi-usage-dashboard](https://github.com/mralifakbar/pi-usage-dashboard) | A web-based dashboard for tracking token usage, costs, sessions, and resources across all your pi coding agent | ⭐3 | 21d ago |
| [nice-hang-pi-tracing](https://github.com/nice-hang/pi-tracing) | Observe and debug your pi-mono agents in real time. | ⭐3 | 24d ago |
| [phrazzld-pi-agent-config](https://github.com/phrazzld/pi-agent-config) | Versioned Pi agent config, ready to sync. | ⭐3 | ~1mo ago |
| [sacenox-pi-linux-use](https://github.com/sacenox/pi-linux-use) | Looking into allowing the Pi coding agent to use a linux desktop. | ⭐3 | 12d ago |
| [spences10-pirecall](https://github.com/spences10/pirecall) | 🔄️ Sync pi.dev agent sessions to SQLite for analytics, uses node:sqlite | ⭐3 | 2d ago |
| [spfunctions-harness](https://github.com/spfunctions/harness) | Dual pi-agent runtime harness. Two agents (local + Cloudflare) negotiate, share state, and self-modify via a 5-message protocol. | ⭐3 | ~1mo ago |
| [aadishv-pi-agy](https://github.com/aadishv/pi-agy) | Vibe coded minimal CLI to use Antigravity OAuth models via Pi coding agent. Heavily WIP | ⭐2 | 5mo ago |
| [butttons-pi-action-runner](https://github.com/butttons/pi-action-runner) | GitHub Action that runs AI-powered PR reviews using pi coding agent | ⭐2 | 2mo ago |
| [chron-odincode](https://github.com/chron/odincode) | ⚡ ODINCODE — a pi coding agent persona. Senior engineer & architect. Clean code. Strong foundations. No shortcuts. | ⭐2 | ~1mo ago |
| [corwinm-coding-agents-tmux](https://github.com/corwinm/coding-agents-tmux) | Track, monitor, and jump between agent sessions in tmux | ⭐2 | 5d ago |
| [EasterCompany-EDE](https://github.com/EasterCompany/EDE) | The Easter Company Development Environment (EDE) with Darwin & Dexter integrations. | ⭐2 | 8d ago |
| [Epsilondelta-ai-pi-web](https://github.com/Epsilondelta-ai/pi-web) | A web UI for viewing and controlling the local pi coding agent in your browser. | ⭐2 | 2d ago |
| [FaiyazAwsaf-agent-in-a-box](https://github.com/FaiyazAwsaf/agent-in-a-box) | Chatbot app where each conversation spins up its own isolated VM with a Pi Agent, orchestrated by Convex. | ⭐2 | ~1mo ago |
| [hiasinho-linear-pi-agent](https://github.com/hiasinho/linear-pi-agent) | Connect your own pi coding agent to Linear Agent Sessions. | ⭐2 | 13d ago |
| [kacperkwapisz-pi-offload](https://github.com/kacperkwapisz/pi-offload) | Offload a pi coding-agent session to a remote VPS with iOS Live Activity progress | ⭐2 | 12d ago |
| [marcfargas-pi-server](https://github.com/marcfargas/pi-server) | Detachable agent sessions for pi — headless daemon + terminal client over WebSocket | ⭐2 | 3mo ago |
| [mcowger-pi-action](https://github.com/mcowger/pi-action) | GitHub Action to invoke the PI coding agent on issues and PRs via comment triggers | ⭐2 | 12d ago |
| [nixihz-pi-agent-teams](https://github.com/nixihz/pi-agent-teams) |  | ⭐2 | 8d ago |
| [rhjoh-PiAssistant](https://github.com/rhjoh/PiAssistant) | A persistant Pi coding agent session accessible via Telegram. | ⭐2 | 27d ago |
| [santychuy-pi-setup](https://github.com/santychuy/pi-setup) | Pi Agent Setup | ⭐2 | 7d ago |
| [abboskhonov-pi-dotfiles](https://github.com/abboskhonov/pi-dotfiles) | Pi coding agent dotfiles and configuration | ⭐1 | 4d ago |
| [arikru-pi-agent-diagnostic-testbox](https://github.com/arikru/pi-agent-diagnostic-testbox) |  | ⭐1 | 9d ago |
| [arniesaha-agent-max](https://github.com/arniesaha/agent-max) | Self-hosted AI agent. Opinionated pi-mono fork with A2A, browser automation, and distributed compute. | ⭐1 | 16d ago |
| [asoules-pi-worker](https://github.com/asoules/pi-worker) | Pi coding agent running in a Cloudflare Worker with persistent filesystem and git | ⭐1 | 2mo ago |
| [azs06-my-pi](https://github.com/azs06/my-pi) | My Personal Claw Using Pi-Agent | ⭐1 | ~1mo ago |
| [Beastea3-pi-llm-wiki](https://github.com/Beastea3/pi-llm-wiki) | Inspired by Karpathy's LLM Wiki; Based on pi-mono agent framework; Happy Hacking! | ⭐1 | ~1mo ago |
| [code-yeongyu-pi-agent-system](https://github.com/code-yeongyu/pi-agent-system) |  | ⭐1 | yesterday |
| [dantetekanem-pi-agentic-search](https://github.com/dantetekanem/pi-agentic-search) | Make AI more intentional, not just wandering around, feeling lost. | ⭐1 | 13d ago |
| [dotemacs-pi-update](https://github.com/dotemacs/pi-update) | `/update` pi agent to the latest version, from a running pi session and resume the active session | ⭐1 | 3mo ago |
| [Duye0120-Chela](https://github.com/Duye0120/Chela) | use pi-mono to creat an agent by myslef and make me understand what is agent and so on. | ⭐1 | 5d ago |
| [eirondev-pi-gsd](https://github.com/eirondev/pi-gsd) | Implements the Get-Shit-Done method in pi-agent | ⭐1 | 3mo ago |
| [evatths-loadouts](https://github.com/evatths/loadouts) | Composable configuration bundles for AI coding agents (Claude Code, Cursor, OpenCode, Codex, Pi) | ⭐1 | 4d ago |
| [Firstp1ck-npm-packages](https://github.com/Firstp1ck/npm-packages) | This repository contains my public JavaScript/TypeScript packages published via npm (using Bun and/or npm). | ⭐1 | 2d ago |
| [heestolee-pilee](https://github.com/heestolee/pilee) | custom pi coding agent 🔥 | ⭐1 | today |
| [herakles-dev-claude-pi](https://github.com/herakles-dev/claude-pi) | Co-processor CLI for delegating deterministic coding tasks to Pi agent. Safety-first design with YOLO firewall, stall detection, parallel burst mode, and YAML pipelines. TypeScript. | ⭐1 | 3mo ago |
| [HyperHarness-pi-agent-minimal-ts](https://github.com/HyperHarness/pi-agent-minimal-ts) | autonomous agent project | ⭐1 | today |
| [ianshan0915-pi-agent-chatbot-platform](https://github.com/ianshan0915/pi-agent-chatbot-platform) | chatbot built on top of pi-coding-agent | ⭐1 | 2mo ago |
| [jay-aye-see-kay-.pi](https://github.com/jay-aye-see-kay/.pi) | pi coding agent config | ⭐1 | 27d ago |
| [jbutlerdev-llm-wiki](https://github.com/jbutlerdev/llm-wiki) | LLM-maintained personal wiki with built-in QMD search, embedded Pi agent, and modern web UI | ⭐1 | ~1mo ago |
| [joe-p-pi-agent-config](https://github.com/joe-p/pi-agent-config) |  | ⭐1 | 4d ago |
| [jpenilla-BubbleBuddy](https://github.com/jpenilla/BubbleBuddy) | BubbleBuddy is a friendly Discord AI companion powered by Pi, Effect, and discord.js | ⭐1 | 4d ago |
| [julian-af-bot-julian](https://github.com/julian-af-bot/julian) | Open-source Airflow coding agent — fork of pi-mono with Airflow-aware defaults | ⭐1 | 19d ago |
| [marcellocurto-roark-coding-agent](https://github.com/marcellocurto/roark-coding-agent) | Roark is a small CLI workflow runner around the Pi coding-agent SDK. It turns GitHub issues into isolated agent runs, review artifacts, verification gates, and draft pull requests. | ⭐1 | 13d ago |
| [mjaverto-ace](https://github.com/mjaverto/ace) | Agent Conversation Exporter — render Claude Code, Codex, Pi, opencode transcripts to Markdown | ⭐1 | 22d ago |
| [nielpattin-pi-tnega](https://github.com/nielpattin/pi-tnega) | Pi agent setup | ⭐1 | 7d ago |
| [octalpixel-mastractl](https://github.com/octalpixel/mastractl) | Opinionated AI agent control plane: Mastra shell + pi-agent-core loop + Paperclip-shape control plane | ⭐1 | ~1mo ago |
| [Oyaxira-pi-visionizer](https://github.com/Oyaxira/pi-visionizer) | Add vision support to any text-only model in pi coding agent — transparent image description via a configured vision model. | ⭐1 | today |
| [PrayagS-pi-config](https://github.com/PrayagS/pi-config) | Personal pi coding agent (https://pi.dev) configuration | ⭐1 | 4d ago |
| [pythoninthegrass-pi_config](https://github.com/pythoninthegrass/pi_config) | pi coding agent config | ⭐1 | today |
| [rafaelmocelin-po-mono](https://github.com/rafaelmocelin/po-mono) | po — pi coding agent fork with RTK token compression, three-tier model system, and TDD pipeline orchestrator | ⭐1 | ~1mo ago |
| [sapiderman-pi-roasts](https://github.com/sapiderman/pi-roasts) | Getting big headed with all the code you produce? Pi-roasts brings you back down to earth. Sometimes even gently. | ⭐1 | 2d ago |
| [seemethere-bakery](https://github.com/seemethere/bakery) | Local-first web UI for running server-backed pi coding-agent sessions against your own workspaces | ⭐1 | today |
| [selimozten-elek](https://github.com/selimozten/elek) | AI code review GitHub Action — model-agnostic via pi (DeepSeek, Z.AI, OpenAI, Anthropic, Google, …). Posts inline review threads on changed lines. Cannot approve, merge, or close (structural guarantee | ⭐1 | 22d ago |
| [sssstwee-agent-switch](https://github.com/sssstwee/agent-switch) | Agent Switch: Claude Code, Claude Desktop, Codex CLI, Codex Desktop, Hermes, OpenCode, OpenClaw and AI agent config switcher, model router, and local OpenAI/Anthropic gateway | ⭐1 | yesterday |
| [sssstwee-switch-plus-plus](https://github.com/sssstwee/switch-plus-plus) | Agent Switch: Claude Code, Claude Desktop, Codex CLI, Codex Desktop, Hermes, OpenCode, OpenClaw and AI agent config switcher, model router, and local OpenAI/Anthropic gateway | ⭐1 | today |
| [sumesh2279-pi-mono](https://github.com/sumesh2279/pi-mono) | Pi coding agent fork with daemon & telegram | ⭐1 | 3mo ago |
| [TOGAF-TURBO-pi-coding-agent-learning](https://github.com/TOGAF-TURBO/pi-coding-agent-learning) |  | ⭐1 | 14d ago |
| [VOID229-picode](https://github.com/VOID229/picode) | a beautiful agent manager frontend for Pi built with tauri | ⭐1 | 18d ago |
| [xmbshwll-pi-config](https://github.com/xmbshwll/pi-config) | Pi Agent config | ⭐1 | 13d ago |
| [Xuyiyang23333-pi-agent-network](https://github.com/Xuyiyang23333/pi-agent-network) |  | ⭐1 | 18d ago |
| [Yvem-hello-world--pi-agent-core--2026](https://github.com/Yvem/hello-world--pi-agent-core--2026) | https://github.com/badlogic/pi-mono/tree/main/packages/agent | ⭐1 | ~1mo ago |
| [@gonrocca/devteam-pi](https://www.npmjs.com/package/@gonrocca/devteam-pi) | devteam-pi — an installable pi (pi.dev) package that ships a role-based development team (architect, backend, frontend, qa, reviewer, devops, dispatcher) plus a single /devteam orchestrator command th |  | 5d ago |
| [@marcfargas/brainiac](https://www.npmjs.com/package/@marcfargas/brainiac) | Persistent, searchable agent knowledge store for pi — learn, connect, recall |  | 3mo ago |
| [@rhobot-dev/rho](https://www.npmjs.com/package/@rhobot-dev/rho) | An AI agent that stays running, remembers across sessions, and checks in on its own. macOS, Linux, Android. Built on Pi. |  | ~1mo ago |
| [@robhowley/spinner-verbs](https://www.npmjs.com/package/@robhowley/spinner-verbs) | Custom spinner verbs for claude and pi |  | 25d ago |
| [@synadia-ai/nats-pi-headless](https://www.npmjs.com/package/@synadia-ai/nats-pi-headless) | SDKs and reference implementations for the Synadia Agent Protocol for NATS |  | 4d ago |
| [aaronhsyong2-my-pi](https://github.com/aaronhsyong2/my-pi) | My Pi Coding Agent |  | 27d ago |
| [abhinavborah-borah-pi](https://github.com/abhinavborah/borah-pi) | pi coding agent setup for my workflows |  | yesterday |
| [aboros-piguild](https://github.com/aboros/piguild) | Discord bot runtime for pi-coding-agent — guild workspaces, thread sessions, access control |  | ~1mo ago |
| [adampetrovic-pi-telegram-bot](https://github.com/adampetrovic/pi-telegram-bot) | Telegram bot that orchestrates pi coding agent sessions via RPC |  | 4d ago |
| [aefreedman-pi-agents](https://github.com/aefreedman/pi-agents) | Pi agent package with reusable subagent definitions. |  | 29d ago |
| [Agent Sandboxes - The Full Landscape](https://engine.build/lab/agent-sandboxes) | Every AI agent sandbox provider compared. Isolation, cold starts, persistence, pricing, and what makes each one different. |  | 12d ago |
| [ahstn-pi](https://github.com/ahstn/pi) | Pi Coding Agent config — https://pi.dev/ |  | 8d ago |
| [alivault-pico](https://github.com/alivault/pico) | Pico is a local, keyboard-friendly browser workspace for Pi coding-agent sessions. |  | 5d ago |
| [apple-pi](https://www.npmjs.com/package/apple-pi) | Opinionated pi coding agent. |  | 28d ago |
| [asyrjasalo-micro-pi](https://github.com/asyrjasalo/micro-pi) | Run Pi Coding Agent inside a microsandbox VM |  | ~1mo ago |
| [azmeenafandi-openrouter-params](https://github.com/azmeenafandi/openrouter-params) | Set temperature, top_p and top_k for OpenRouter models within pi coding agent. |  | 10d ago |
| [bitmonk8-pi-config](https://github.com/bitmonk8/pi-config) | Personal pi coding agent configuration |  | today |
| [BlackBeltTechnology-pi-dashboard-subagents](https://github.com/BlackBeltTechnology/pi-dashboard-subagents) | Subagent package for the pi-agent-dashboard project. |  | 5d ago |
| [bowfeng-pi-show](https://github.com/bowfeng/pi-show) | pi coding agent show command to display agent information |  | 24d ago |
| [cacab6002-safe-coder](https://github.com/cacab6002/safe-coder) | Protect pi coding agent with safety guardrails, command checks, and workspace limits for safer AI-assisted coding |  | today |
| [Caho1-pi](https://github.com/Caho1/pi) | PI agent platform |  | 16d ago |
| [chronicblondiee-pi-agent-config](https://github.com/chronicblondiee/pi-agent-config) | agent config for pi.dev agent harness |  | 9d ago |
| [Ciantic-pi-tandem-terminal](https://github.com/Ciantic/pi-tandem-terminal) | Running terminal in tandem style with Pi coding agent |  | 25d ago |
| [cocolinfff-coli](https://github.com/cocolinfff/coli) | Supervisor agent for pi |  | 4d ago |
| [cocovs-weread-agent-chat](https://github.com/cocovs/weread-agent-chat) | WeRead agent chat app powered by Pi Agent |  | yesterday |
| [conradkoh-pi-oc-context-pruning](https://github.com/conradkoh/pi-oc-context-pruning) | OpenCode-style context pruning for the [pi coding agent](https://shittycodingagent.ai) |  | ~1mo ago |
| [CounterpointConsulting-shepherds-pi](https://github.com/CounterpointConsulting/shepherds-pi) | Coordinate pi agents for great winning |  | 6d ago |
| [crafter-station-jsonl-debug](https://github.com/crafter-station/jsonl-debug) | Forensic visualization for Claude Code, Codex, and Pi agent sessions |  | 9d ago |
| [crichalchemist-agent-pi](https://github.com/crichalchemist/agent-pi) | Multi-agent orchestration for Claude Code — coordinate a fleet of AI models via Pi |  | 16d ago |
| [ctriolo-pi-vibecheck](https://github.com/ctriolo/pi-vibecheck) | Pi Coding Agent package inspired by coding patterns, interviews and blogs of Peter Steinberger, Mario Zechner, and Armin Ronacher |  | 3mo ago |
| [curtisalexander-agent-stuff](https://github.com/curtisalexander/agent-stuff) | 🥧 pi coding agent customizations |  | ~1mo ago |
| [cyprx-pi.nix](https://github.com/cyprx/pi.nix) | Pi Coding Agent for Nix Users |  | 9d ago |
| [daniel-butler-irl-pi-codeslinger](https://github.com/daniel-butler-irl/pi-codeslinger) | A pi coding agent loadout for intent-driven agentic development |  | 25d ago |
| [daniphant-pi-delegated-agents](https://github.com/daniphant/pi-delegated-agents) | Blocking delegated specialist agents for Pi |  | 13d ago |
| [darkhorseprojects-pi-vo](https://github.com/darkhorseprojects/pi-vo) | The best lightweight, efficient, opinionated, pi, voice solution. |  | 9d ago |
| [dcostap-pi-coding-agent-gui-office-wrapper](https://github.com/dcostap/pi-coding-agent-gui-office-wrapper) |  |  | 3d ago |
| [dobleuber-pi-agent](https://github.com/dobleuber/pi-agent) |  |  | yesterday |
| [EasyMetaAu-Agenteam](https://github.com/EasyMetaAu/Agenteam) | Pi Agent System — Self-hosted multi-agent platform for Feishu/Telegram with tmux-driven Claude Code CLI |  | 2d ago |
| [EcoKG-vela-pi](https://github.com/EcoKG/vela-pi) | Vela — deterministic sandbox engine built on Pi SDK (@mariozechner/pi-coding-agent) |  | ~1mo ago |
| [emmaneugene-pi](https://github.com/emmaneugene/pi) | pi coding agent config |  | 2d ago |
| [Enigmadie-pi-agent](https://github.com/Enigmadie/pi-agent) |  |  | 5d ago |
| [FableFatale-pi-coding-agent](https://github.com/FableFatale/pi-coding-agent) | diy-pi |  | today |
| [fhaze-pi-bailian-models](https://github.com/fhaze/pi-bailian-models) | Adds Alibaba Cloud BaiLian Token Plan models to Pi coding agent |  | 4d ago |
| [Forgenn-plder](https://github.com/Forgenn/plder) | Pi agent config |  | 3d ago |
| [fr0ziii-memoria](https://github.com/fr0ziii/memoria) | BM25 search for Obsidian vaults — agent memory system for Pi |  | ~1mo ago |
| [gentle-pi](https://www.npmjs.com/package/gentle-pi) | Gentle AI made-to-measure Pi agent |  | today |
| [gotgenes-pi-autoformat](https://github.com/gotgenes/pi-autoformat) | Moved to gotgenes/pi-packages |  | 10d ago |
| [gregmercer-temporal-pi-tui](https://github.com/gregmercer/temporal-pi-tui) | A music-obsessed AI agent in your terminal. Built using pi-mono packages. |  | ~1mo ago |
| [Guedxx-dotfiles](https://github.com/Guedxx/dotfiles) | My pi agent dotfiles |  | today |
| [happsie-kodda](https://github.com/happsie/kodda) | PI Agent Harness |  | 3d ago |
| [harms-haus-pi-acp](https://github.com/harms-haus/pi-acp) | ACP (Agent Client Protocol) wrapper for pi-coding-agent |  | 5d ago |
| [harms-haus-pi-workflows](https://github.com/harms-haus/pi-workflows) | Deterministic workflow phases for pi-coding-agent |  | 3d ago |
| [harpomaxx-pi-setup](https://github.com/harpomaxx/pi-setup) | Private Pi coding agent setup backup |  | 3d ago |
| [Hot-Sweeper-Titanium](https://github.com/Hot-Sweeper/Titanium) | Electron harness for small local AI agents — iOS-style mobile preview, pi-coding-agent backend |  | 6d ago |
| [IanZhengruShen-pi-agent-chatbot-platform](https://github.com/IanZhengruShen/pi-agent-chatbot-platform) | chatbot built on top of pi-coding-agent |  | 3mo ago |
| [iapicca-pi_agents](https://github.com/iapicca/pi_agents) | a collection of agents for pi |  | ~1mo ago |
| [irfansofyana-pi-setup](https://github.com/irfansofyana/pi-setup) | My Pi coding agents setup |  | today |
| [ItsThompson-pi-fleet](https://github.com/ItsThompson/pi-fleet) | the sucessor of pi-watch: A dashboard for observing, grouping and navigating between pi coding agents. |  | 6d ago |
| [jerilseb-pi-slack-bot](https://github.com/jerilseb/pi-slack-bot) | Slack bot using Pi agent harness |  | 2mo ago |
| [jnyross-harness-engineering](https://github.com/jnyross/harness-engineering) | A coding agent harness forked from pi-mono |  | 3mo ago |
| [jonatascastro12-workos-audit-harness](https://github.com/jonatascastro12/workos-audit-harness) | WorkOS audit logging for Claude Code, Codex, and pi-coding-agent |  | 7d ago |
| [josorio7122-pi-agents](https://github.com/josorio7122/pi-agents) | Agent layer specification for pi — composable, self-enhancing AI agents |  | 8d ago |
| [jrupac-pi-agent](https://github.com/jrupac/pi-agent) |  |  | 8d ago |
| [jswent-my-pi](https://github.com/jswent/my-pi) | My pi coding agent configuration |  | 5d ago |
| [junixlabs-PixelAgent](https://github.com/junixlabs/PixelAgent) | DSL preview middleware to cut token cost for AI coding agents building UI |  | 13d ago |
| [junkijin-my-pi](https://github.com/junkijin/my-pi) | My pi agent configuration |  | 4d ago |
| [jvz-devx-my-pi-setup](https://github.com/jvz-devx/my-pi-setup) | Personal public-safe Pi coding agent setup |  | 9d ago |
| [kanatti-pipi](https://github.com/kanatti/pipi) | My workflows with Pi Agent |  | 2mo ago |
| [KarthikRaju391-pi-config](https://github.com/KarthikRaju391/pi-config) | Personal Pi coding-agent configuration |  | today |
| [kdowswell-agent-room](https://github.com/kdowswell/agent-room) | Mission-control dashboard for AI coding agents — runs locally, drives @mariozechner/pi-coding-agent sessions in parallel git worktrees |  | ~1mo ago |
| [keIIy-kim-pi-config](https://github.com/keIIy-kim/pi-config) | Personal pi coding agent configuration |  | today |
| [kungfuchicken-pi-agent-container](https://github.com/kungfuchicken/pi-agent-container) | PAC: Pi Agent Container — containerized pi-coding-agent with version-pinned builds, weekly auto-updates, and rollback. Waka-waka. |  | 25d ago |
| [lazzarello-pi-coding-kit](https://github.com/lazzarello/pi-coding-kit) | My customization for the pi-coding-agent |  | 24d ago |
| [lcjnil-browser-pi](https://github.com/lcjnil/browser-pi) | Browser-first runtime for running pi coding agents with a VFS and js-shell. |  | 7d ago |
| [leandromesq-pi-setup](https://github.com/leandromesq/pi-setup) | my pi coding agent custom setup |  | 3d ago |
| [lhr0909-pi-mobile](https://github.com/lhr0909/pi-mobile) | Mobile client and SDK host MVP for Pi coding-agent sessions |  | 3d ago |
| [LikelyLucid-pi-config](https://github.com/LikelyLucid/pi-config) | Pi agent configuration |  | 5d ago |
| [linuswolff-dot-pi](https://github.com/linuswolff/dot-pi) | Pi coding agent config |  | 4mo ago |
| [Lpaydat-pi-beads](https://github.com/Lpaydat/pi-beads) | Pi coding agent integration for beads — a distributed graph issue tracker for AI agents |  | today |
| [makyinmars-pi-agent](https://github.com/makyinmars/pi-agent) | based from bendavis pi agent setup |  | yesterday |
| [ManuelSelch-pi-agent-demo](https://github.com/ManuelSelch/pi-agent-demo) | demo how to use & customize pi coding agent |  | 3mo ago |
| [manusajith-pi-jj-shared](https://github.com/manusajith/pi-jj-shared) | Shared registry, storage, and doctor utilities for the pi jj suite |  | 2mo ago |
| [manusajith-pi-jj-suite](https://github.com/manusajith/pi-jj-suite) | A meta-package that installs and activates the full pi jj suite |  | 2mo ago |
| [Marvino-Fransisco-pi-coding-agent-configs](https://github.com/Marvino-Fransisco/pi-coding-agent-configs) | My pi coding agent config in docker container environment |  | 29d ago |
| [mattoopie-pi-openspec-status](https://github.com/mattoopie/pi-openspec-status) | Pi coding agent OpenSpec status widget |  | yesterday |
| [MauriceElliott-GuinnessPi](https://github.com/MauriceElliott/GuinnessPi) | A pi configuration aimed at close to feature parity with Github Copilot with some nice extras. |  | 18d ago |
| [maxsumrall-treesee](https://github.com/maxsumrall/treesee) | Polished HTML conversation tree viewer for Pi sessions |  | 2mo ago |
| [michalvankodev-my-pi-agent](https://github.com/michalvankodev/my-pi-agent) | Configuration files for my `pi` agent |  | today |
| [mooncos-pi-setup](https://github.com/mooncos/pi-setup) | My custom pi-coding-agent setup |  | today |
| [mrcloudchase-nano-agent](https://github.com/mrcloudchase/nano-agent) | Minimal version of pi-mono's agent package |  | 3mo ago |
| [mrcloudchase-nano-ai](https://github.com/mrcloudchase/nano-ai) | Minimal version of pi-mono's ai package |  | 3mo ago |
| [mrcloudchase-nano-coding-agent](https://github.com/mrcloudchase/nano-coding-agent) | Minimal version of pi-mono's coding-agent package |  | 3mo ago |
| [mrcloudchase-nano-mom](https://github.com/mrcloudchase/nano-mom) | Minimal version of pi-mono's mom package |  | 3mo ago |
| [mrcloudchase-nano-pods](https://github.com/mrcloudchase/nano-pods) | Minimal version of pi-mono's pods package |  | 3mo ago |
| [mrcloudchase-nano-tui](https://github.com/mrcloudchase/nano-tui) | Minimal version of pi-mono's tui package |  | 3mo ago |
| [mrcloudchase-nano-web-ui](https://github.com/mrcloudchase/nano-web-ui) | Minimal version of pi-mono's web-ui package |  | 3mo ago |
| [msaguindang-dot-pi](https://github.com/msaguindang/dot-pi) | Personal configuration for my Pi Coding Agent |  | 6d ago |
| [msylvester-pi-coding-agent-from-scratch](https://github.com/msylvester/pi-coding-agent-from-scratch) |  |  | 10d ago |
| [nachoal-agent-usage-report](https://github.com/nachoal/agent-usage-report) | Local agent usage report generator for Codex, Claude Code, OpenCode, and Pi Coding Agent |  | ~1mo ago |
| [namanxajmera-nucleus](https://github.com/namanxajmera/nucleus) | Personal AI agent on Telegram — pi-coding-agent + multi-agent dispatch + encrypted credential vault. |  | ~1mo ago |
| [nathanstephenson-pi-subagents](https://github.com/nathanstephenson/pi-subagents) | Pi coding-agent package for delegating work to isolated subagents |  | ~1mo ago |
| [neal-batbot-pi-agent](https://github.com/neal-batbot/pi-agent) |  |  | 7d ago |
| [nickperkins-pi-manager](https://github.com/nickperkins/pi-manager) | Desktop app for managing multiple pi agentic coding sessions |  | 25d ago |
| [nihar5hah-pi-mono-gemini-cli](https://github.com/nihar5hah/pi-mono-gemini-cli) | Pi coding agent with Google Gemini CLI & Antigravity OAuth support restored |  | 24d ago |
| [NimbleTronAI-pi-code-gui](https://github.com/NimbleTronAI/pi-code-gui) | GUI experience for the popular Pi Coding Agent |  | today |
| [nlicitra-pi-agent](https://github.com/nlicitra/pi-agent) | My pi coding agent setup |  | 16d ago |
| [no-vibe](https://www.npmjs.com/package/no-vibe) | Tutor mode for AI coding assistants. AI shows code in chat and reviews your work, but never writes to your project files. Ships across Claude Code, OpenCode, Codex, Gemini CLI, and Pi. |  | 3d ago |
| [NooaLumi-my-pi-config](https://github.com/NooaLumi/my-pi-config) | My Pi agent config ~/.pi |  | 15d ago |
| [nSimonFR-amarre](https://github.com/nSimonFR/amarre) | 🪢 Tailnet-only WS harness for CLI coding agents (pi, claude-code, …) |  | 14d ago |
| [OJCompany-OJ_Code_Refactor](https://github.com/OJCompany/OJ_Code_Refactor) | AI agent for code review, refactoring, and PR creation — built as a pi-coding-agent package with company-specific convention support. |  | 14d ago |
| [OrestesK-pi](https://github.com/OrestesK/pi) | pi agent config |  | today |
| [orkuhh-opencode-monitor](https://github.com/orkuhh/opencode-monitor) | Tauri dashboard for OpenCode sessions + Pi coding agent |  | ~1mo ago |
| [PClmnt-pi-setup](https://github.com/PClmnt/pi-setup) | My Pi coding agent customization dotfiles |  | 9d ago |
| [peektism-pi-shell](https://github.com/peektism/pi-shell) | Secure pi agent generator for validated profiles enforced via allowlists |  | 3mo ago |
| [Pi-Eye-camera-connection](https://github.com/Pi-Eye/camera-connection) | Package for connecting with Pi-Eye camera |  | 4y ago |
| [Pi-Eye-client-connection-server](https://github.com/Pi-Eye/client-connection-server) | Package for connecting with Pi-Eye server |  | 4y ago |
| [pinotator](https://www.npmjs.com/package/pinotator) | Clipboard-first transcript citations for Pi. |  | 6d ago |
| [PlebeiusGaragicus-mypi](https://github.com/PlebeiusGaragicus/mypi) | PlebbyG's personal Pi agent configurations managed as a Pi git package. |  | 4d ago |
| [possibly-pi-gallery](https://github.com/possibly/pi-gallery) | quickly view images read by your pi-coding-agent |  | ~1mo ago |
| [possibly-pi-tree-delete](https://github.com/possibly/pi-tree-delete) | Tree context deletion for pi-agents |  | ~1mo ago |
| [qihaiyan-pi-agent](https://github.com/qihaiyan/pi-agent) | Simple agent built with pi-mono |  | ~1mo ago |
| [rakeshtembhurne-pi-starter](https://github.com/rakeshtembhurne/pi-starter) | Minimal starter template for AI-assisted development with pi coding agent |  | ~1mo ago |
| [raulbethencourt-pi_config](https://github.com/raulbethencourt/pi_config) | My pi agent configuration |  | today |
| [ryo-morimoto-pi-codedb](https://github.com/ryo-morimoto/pi-codedb) | Code intelligence for pi-coding-agent — structural indexing, trigram search, symbol lookup via codedb REST API |  | 28d ago |
| [saharathkleips-my-pi](https://github.com/saharathkleips/my-pi) | Personal Pi Coding Agent workflow repository |  | 18d ago |
| [SamMorrowDrums-mcpi-ext](https://github.com/SamMorrowDrums/mcpi-ext) | MCP focused pi agent |  | 2d ago |
| [samyakjain0606-pi-fleet](https://github.com/samyakjain0606/pi-fleet) | ⚡ Manage multiple pi coding agent instances across git worktrees |  | 3mo ago |
| [sarat-asymmetrica-sarvam-pi](https://github.com/sarat-asymmetrica/sarvam-pi) | Sarvam 105B coding agent built on top of the Pi agentic harness |  | 28d ago |
| [saurabh-pal-dn-pi-currency-footer](https://github.com/saurabh-pal-dn/pi-currency-footer) | pi coding agent currency conversion command |  | 18d ago |
| [SeanMooney-pi-config](https://github.com/SeanMooney/pi-config) | my pi-agent config |  | 10d ago |
| [shrwnsan-pi-agent](https://github.com/shrwnsan/pi-agent) | There are many coding agents, but this one is mine. My PI agent customizations. |  | ~1mo ago |
| [shubham-cpp-pi-config](https://github.com/shubham-cpp/pi-config) | My Personal PI-agent config |  | 4d ago |
| [sjramblings-aws-migration-board](https://github.com/sjramblings/aws-migration-board) | AWS Migration Board — Multi-Agent Architecture Review System built on Pi Coding Agent |  | ~1mo ago |
| [sleepyeldrazi-research-pi](https://github.com/sleepyeldrazi/research-pi) | Headless research orchestrator for pi-coding-agent |  | ~1mo ago |
| [stansz-agent-hive](https://github.com/stansz/agent-hive) | Self-hosted coding agent server — pi.dev SDK + Fastify. One VPS, one API, any orchestrator. |  | 7d ago |
| [stepandel-pi-linear](https://github.com/stepandel/pi-linear) | Linear agent build using pi-coding-agent SDK |  | 3mo ago |
| [stevelikesrhino-mode-gate](https://github.com/stevelikesrhino/mode-gate) | Custom mode-gate for pi-coding-agent |  | today |
| [stnly-pi-grok](https://github.com/stnly/pi-grok) | Use your SuperGrok subscription in pi with OAuth login, auto-refresh, and live model discovery |  | 8d ago |
| [Studio-Sunnyfield-pimagotchi](https://github.com/Studio-Sunnyfield/pimagotchi) | Tamagotchi like pet for your pi coding agent |  | ~1mo ago |
| [sultandevin-pi-agent](https://github.com/sultandevin/pi-agent) | Pi Agent setup |  | yesterday |
| [supporthoseupstage565-pi-session-summary](https://github.com/supporthoseupstage565/pi-session-summary) | Track and update one-line LLM session summaries for pi, so your status bar and /resume list show clear context fast |  | today |
| [swarmbit-pi-container](https://github.com/swarmbit/pi-container) | Container environment for development with pi coding agent |  | today |
| [sykar-f-pi-config](https://github.com/sykar-f/pi-config) | Configuration Pi.dev coding agent — Qwen self-hosted, fetch_clean, deep-researcher |  | yesterday |
| [SynrgStudio-gpi](https://github.com/SynrgStudio/gpi) | GUI For Pi.dev Agent |  | 12d ago |
| [Th1nkK1D-azpi](https://github.com/Th1nkK1D/azpi) | A seamless ACP client built on top of the Pi coding agent |  | 6d ago |
| [the-grove-ai-autonomaton-pi](https://github.com/the-grove-ai/autonomaton-pi) | GRV-001 Autonomaton scaffold for pi-coding-agent — five-stage invariant telemetry pipeline. See SPEC.md. |  | 4d ago |
| [the-metafactory-sage](https://github.com/the-metafactory/sage) | Botanical-named code review agent on pi.dev substrate, speaking Myelin envelopes |  | 3d ago |
| [timcki-my-agent-stuff](https://github.com/timcki/my-agent-stuff) | pi agent related things |  | ~1mo ago |
| [tmustier-pi-unpacked](https://github.com/tmustier/pi-unpacked) | Interactive exploration of pi coding agent internals — v0.64.0 |  | ~1mo ago |
| [TophC7-pi.nix](https://github.com/TophC7/pi.nix) | My personal pi agent setup |  | 2d ago |
| [uchoa-pi-agent-config](https://github.com/uchoa/pi-agent-config) | My global **pi.dev** agent configuration. |  | 10d ago |
| [valdo766hi-datu](https://github.com/valdo766hi/datu) | Nix wrapper of pi coding agent with based on my workflow |  | 9d ago |
| [vdemeester-radian](https://github.com/vdemeester/radian) | Analytics and usage insights for pi-coding-agent sessions |  | 5d ago |
| [vedang-pi-antigravity-image-gen](https://github.com/vedang/pi-antigravity-image-gen) | Generate images using Gemini models, in Pi Coding Agent |  | 3mo ago |
| [vedang-pi-watcher](https://github.com/vedang/pi-watcher) | Editor comment watch mode for `pi-coding-agent`, inspired by Aider |  | 4d ago |
| [viartemev-pi-working-message](https://github.com/viartemev/pi-working-message) | Configurable working-message phrases for pi via JSON config. |  | 4d ago |
| [Vibecodelicious-pi_context_bonsai](https://github.com/Vibecodelicious/pi_context_bonsai) | Pi Context Bonsai side repo. Pi's bonsai implementation lives in-tree at pi-mono/packages/context-bonsai/; this side repo is the standards/spec holder per the per-agent spec. |  | 5d ago |
| [Vochsel-pi-web](https://github.com/Vochsel/pi-web) | Packages to use web as a front end to pi-mono in rpc mode |  | ~1mo ago |
| [vvv850-pi-pretty-codeblocks](https://github.com/vvv850/pi-pretty-codeblocks) | Pretty, syntax-highlighted Markdown code blocks for the Pi coding-agent TUI. |  | 11d ago |
| [WingRa7-pi-config](https://github.com/WingRa7/pi-config) | My Pi agent configuration files |  | 10d ago |
| [xuzhixiangya-pi-web-ui](https://github.com/xuzhixiangya/pi-web-ui) | Pi coding agent over web frontend. |  | 28d ago |
| [yagaltd-pi-image-classify](https://github.com/yagaltd/pi-image-classify) | Image classification and cataloging for pi-coding-agent. |  | ~1mo ago |
| [yozlet-RiverOfPain](https://github.com/yozlet/RiverOfPain) | Objective-driven Pi coding agent with local web UI (OBJECTIVES.md / CONSTRAINTS.md steering) |  | ~1mo ago |
| [zekdevs-pi-config](https://github.com/zekdevs/pi-config) | my person pi agent setup |  | 9d ago |
| [zhongjis-pi-config](https://github.com/zhongjis/pi-config) | pi agent configuration |  | 4d ago |
| [zilongshanren-pi-config](https://github.com/zilongshanren/pi-config) | my opinioned pi agents config |  | yesterday |


---

- Generated on 2026-05-26 from 3999 entries (npm: 2656, GitHub: 1250, YouTube: 64, Brave Search: 24, Hacker News: 4, Manual: 1)
- Auto-updated by [awesome-pi-coding-agent](https://github.com/shaftoe/awesome-pi-coding-agent)
