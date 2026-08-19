# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.7.1] - 2026-08-19

### Fixed

- **list**: move pi2.nvim entry from misc to extensions category (#258)

## [2.7.0] - 2026-08-17

### Added

- add luw2007/pi-grill to the directory (#253)

## [2.6.0] - 2026-08-14

### Added

- **list**: add zgs225/pi2.nvim (Neovim frontend for pi) (#248)

## [2.5.7] - 2026-06-18

## [2.5.6] - 2026-06-13

### Fixed

- migrate biome config to 2.5.0 and add SVG titles for a11y (#137)

## [2.5.5] - 2026-06-11

### Fixed

- resolve Astro site build failure when root node_modules is absent (#131)

## [2.5.4] - 2026-06-10

### Fixed

- preserve higher-priority source metadata (#127)

## [2.5.3] - 2026-06-09

### Fixed

- keep validation prompt under action limits (#124)

## [2.5.2] - 2026-06-04

### Changed

- **deps**: bump astro
- remove health metadata system (#109)

### Fixed

- include YT title when filtering

## [2.5.1] - 2026-05-24

### Fixed

- clarify how project works

## [2.5.0] - 2026-05-10

### Added

- refresh existing entry metadata on same-source duplicates (#80)

## [2.4.0] - 2026-05-05

### Added

- **site**: add global shareable search URL (?q= parameter) (#65)

## [2.3.4] - 2026-05-01

### Fixed

- relax filter to allow valid data points

## [2.3.3] - 2026-04-30

### Fixed

- strip HTML tags and decode entities in descriptions and titles (#54)

## [2.3.2] - 2026-04-30

### Fixed

- reclassify misc entries as extensions and blacklist irrelevant ones (#52)

## [2.3.1] - 2026-04-30

### Fixed

- improve blacklisting rules

## [2.3.0] - 2026-04-30

### Added

- add Brave Web Search discovery source (#47)

## [2.2.1] - 2026-04-30

### Fixed

- ensure timestamp match across renders

## [2.2.0] - 2026-04-29

### Added

- add Hacker News source via Algolia API (#44)

## [2.1.1] - 2026-04-28

### Changed

- **deps-dev**: bump @alexanderfortin/semantic-release-keep-a-changelog (#41)
- consolidate source custom logic into sources

### Fixed

- store last update timestamp for consistency between readme and site

## [2.1.0] - 2026-04-27

### Added

- **site**: use query params for shareable category search links (#32)

## [2.0.2] - 2026-04-27

### Fixed

- add normalization for https://youtu.be/ID urls

## [2.0.1] - 2026-04-27

### Changed

- updates

### Fixed

- add url normalization to avoid mismatch when blacklisting

## [2.0.0] - 2026-04-27

### Added

- full rewrite of pipeline and storage (#30)

## [1.2.0] - 2026-04-25

### Added

- improve early reject logic

## [1.1.0] - 2026-04-24

### Added

- add search to categories

## [1.0.16] - 2026-04-24

### Fixed

- add more filtering for non-English entries

## [1.0.15] - 2026-04-24

### Fixed

- add more gates for yt videos

## [1.0.14] - 2026-04-24

### Fixed

- add filter for non-English entries

## [1.0.13] - 2026-04-24

### Fixed

- code cleanups #2

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

[2.7.1]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.7.0...v2.7.1
[2.7.0]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.6.0...v2.7.0
[2.6.0]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.5.7...v2.6.0
[2.5.7]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.5.6...v2.5.7
[2.5.6]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.5.5...v2.5.6
[2.5.5]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.5.4...v2.5.5
[2.5.4]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.5.3...v2.5.4
[2.5.3]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.5.2...v2.5.3
[2.5.2]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.5.1...v2.5.2
[2.5.1]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.5.0...v2.5.1
[2.5.0]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.3.4...v2.4.0
[2.3.4]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.3.3...v2.3.4
[2.3.3]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.3.2...v2.3.3
[2.3.2]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.3.1...v2.3.2
[2.3.1]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.3.0...v2.3.1
[2.3.0]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.2.1...v2.3.0
[2.2.1]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.1.1...v2.2.0
[2.1.1]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.0.2...v2.1.0
[2.0.2]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.16...v1.1.0
[1.0.16]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.15...v1.0.16
[1.0.15]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.14...v1.0.15
[1.0.14]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.13...v1.0.14
[1.0.13]: https://github.com/shaftoe/awesome-pi-coding-agent/compare/v1.0.12...v1.0.13
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
