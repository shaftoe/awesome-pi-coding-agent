import path from "node:path";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { buildChecks } from "./src/integrations/build-checks";
import { searchIndex } from "./src/integrations/search-index";

const rootDir = path.resolve(import.meta.dirname, "..");

// https://astro.build/config
export default defineConfig({
	vite: {
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
						{ label: "🛠️ Tools & Utilities", link: "/tools" },
						{ label: "🎨 Themes", link: "/themes" },
						{ label: "🔗 Providers", link: "/providers" },
						{ label: "📋 Templates", link: "/templates" },
						{ label: "🎬 Videos", link: "/videos" },
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
