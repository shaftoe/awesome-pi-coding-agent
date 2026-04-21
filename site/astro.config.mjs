import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { searchIndex } from "./src/integrations/search-index";

// https://astro.build/config
export default defineConfig({
	integrations: [
		searchIndex(),
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
						{ label: "🧠 Skills", link: "/skills" },
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
