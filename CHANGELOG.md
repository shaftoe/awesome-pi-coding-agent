# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.12] - 2026-04-24

### Fixed

- add astro build tests

## [1.0.11] - 2026-04-24

### Fixed

- ensure website is in sync with readme

## [1.0.10] - 2026-04-23

### Fixed

- use same load logic for readme and astro

## [1.0.9] - 2026-04-23

### Fixed

- add auto blacklist into filter, add dedup to pipeline

## [1.0.8] - 2026-04-23

### Fixed

- improve filter logic

## [1.0.7] - 2026-04-23

### Fixed

- improve discovery logic

## [1.0.6] - 2026-04-23

### Fixed

- improve filtering to also blacklist unrelated @types

## [1.0.5] - 2026-04-23

### Fixed

- improve false positive filtering

## [1.0.4] - 2026-04-23

### Changed

- add workaround to shorten title for mobile view (#21)

### Fixed

- filter out oh-my-pi related projects

## [1.0.3] - 2026-04-22

### Fixed

- remove NPM_TOKEN which appears to be useless, add backoff

## [1.0.2] - 2026-04-22

### Fixed

- add NPM_TOKEN to avoid throttling

## [1.0.1] - 2026-04-22

### Fixed

- use proper pagination for discover fetches

## [1.0.0] - 2026-04-22

### Added

- add astro website
- add semantic release flow (#17)

### Changed

- update tagline

### Fixed

- blacklist 442 irrelevant entries from data/ (#12)
- cleanp hero
- decode HTML entities in video titles and fix site title (#4)
- recalculate video health with available signals (#14)
- remove skills category
- replace @types/bun with pinned bun-types to fix typecheck (#6)

[1.0.12]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.11...v1.0.12
[1.0.11]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.10...v1.0.11
[1.0.10]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.9...v1.0.10
[1.0.9]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.8...v1.0.9
[1.0.8]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.7...v1.0.8
[1.0.7]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.6...v1.0.7
[1.0.6]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.0...v1.0.1
