/**
 * Temporal polyfill — import once at app startup to make `Temporal` available globally.
 *
 * Remove this file once Bun ships native Temporal support.
 * TypeScript 6.0 already provides the type definitions via `ESNext` lib.
 *
 * @see https://tc39.es/proposal-temporal/docs/
 */

import "temporal-polyfill/global";
