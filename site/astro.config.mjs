import path from "node:path";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { formatBuildTimestamp } from "../src/core/timestamp.ts";
import { buildChecks } from "./src/integrations/build-checks";
import { searchIndex } from "./src/integrations/search-index";

const rootDir = path.resolve(import.meta.dirname, "..");

// Build-time timestamp injected as a Vite global constant
const buildDate = formatBuildTimestamp(); // e.g. "2026-04-27 08:52 UTC"

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
