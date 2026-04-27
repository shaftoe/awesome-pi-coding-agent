/**
 * Canonical search terms for Pi Coding Agent ecosystem discovery.
 *
 * Each source transforms these into its own query syntax:
 *   - npm:     `keywords:${term}`
 *   - GitHub:  `${term} language:TypeScript`
 *   - YouTube: plain text search
 *
 * Sources may also accept fully-formed query overrides via --query flags,
 * which bypass these defaults entirely.
 */

export const SEARCH_TERMS = ["pi-coding-agent", "pi-agent", "pi-theme", "pi-package"];
