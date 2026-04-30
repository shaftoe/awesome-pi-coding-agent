import path from "node:path";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { readMeta } from "../src/core/meta.ts";
import { formatBuildTimestamp, formatIsoTimestamp } from "../src/core/timestamp.ts";
import { buildChecks } from "./src/integrations/build-checks";
import { searchIndex } from "./src/integrations/search-index";

const rootDir = path.resolve(import.meta.dirname, "..");

// Use the datastore's last-update timestamp (from data/meta.json) for the site.
// Falls back to build time if meta.json doesn't exist (e.g. first deploy).
const meta = readMeta();
const buildDate = meta ? formatIsoTimestamp(meta.lastUpdatedAt) : formatBuildTimestamp();

// https://astro.build/config
export default defineConfig({
	vite: {
		define: {
			BUILD_DATE: JSON.stringify(buildDate),
		},
		resolve: {
			alias: {
				"@pipeline": path.join(rootDir, "src"),
			},
		},
	},
	integrations: [
		searchIndex(),
		buildChecks(),
		starlight({
			title: "Awesome Pi Coding Agent",
			logo: {
				src: "./src/assets/logo.svg",
			},
			social: [],
			sidebar: [
				{
					label: "Home",
					link: "/",
				},
				{
					label: "Categories",
					items: [
						{ label: "🔌 Extensions", link: "/extensions" },
						{ label: "🎨 Themes", link: "/themes" },
						{ label: "🎬 Videos & Tutorials", link: "/videos" },
						{ label: "📰 Articles", link: "/articles" },
						{ label: "📦 Miscellaneous", link: "/misc" },
					],
				},
			],
			pagefind: false,
			customCss: ["./src/styles/custom.css"],
			components: {
				Search: "./src/components/Search.astro",
				TwoColumnContent: "./src/components/TwoColumnContent.astro",
			},
		}),
	],
});
