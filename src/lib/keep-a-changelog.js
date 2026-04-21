/**
 * Custom conventional-changelog config for Keep a Changelog format.
 *
 * Used by @semantic-release/release-notes-generator via the `config` option
 * to produce changelog notes that follow https://keepachangelog.com.
 *
 * Maps conventional commit types to Keep a Changelog sections:
 *   feat       → Added
 *   fix        → Fixed
 *   perf       → Changed
 *   refactor   → Changed
 *   revert     → Removed
 *   docs       → Changed
 *   style      → Changed
 *   test/ci/build/chore → omitted
 */

const SECTION_ORDER = ["Added", "Changed", "Deprecated", "Removed", "Fixed", "Security"];

const TYPE_MAP = {
	feat: "Added",
	fix: "Fixed",
	perf: "Changed",
	refactor: "Changed",
	revert: "Removed",
	docs: "Changed",
	style: "Changed",
};

const mainTemplate = `{{> header}}

{{#each commitGroups}}
{{#if title}}
### {{title}}

{{/if}}
{{#each commits}}
{{> commit root=@root}}
{{/each}}

{{/each}}
{{> footer}}
`;

const headerPartial = `## [{{version}}] - {{date}}
`;

const commitPartial = `- {{#if subject}}{{subject}}{{else}}{{header}}{{/if}}
`;

const footerPartial = `{{#if noteGroups}}
{{#each noteGroups}}

### {{title}}
{{#each notes}}
- {{text}}
{{/each}}
{{/each}}
{{/if}}
`;

export default () => ({
	writer: {
		mainTemplate,
		headerPartial,
		commitPartial,
		footerPartial,

		transform(commit, context) {
			const section = TYPE_MAP[commit.type];
			if (!section) return undefined;

			let { subject } = commit;
			if (typeof subject === "string" && context.host && context.owner && context.repository) {
				const url = `${context.host}/${context.owner}/${context.repository}/issues/`;
				subject = subject.replace(/#(\d+)/g, (_, issue) => `[#${issue}](${url}${issue})`);
			}

			return {
				type: section,
				subject: subject || commit.header,
			};
		},

		groupBy: "type",
		commitGroupsSort: (a, b) => SECTION_ORDER.indexOf(a.title) - SECTION_ORDER.indexOf(b.title),
		commitsSort: ["scope", "subject"],
	},
});
