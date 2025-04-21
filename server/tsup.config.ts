import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src"], // ou outras entradas específicas
	format: ["esm"],
	outDir: "dist",
	clean: true,
	esbuildOptions(options) {
		// Ignora arquivos .sql
		options.loader = {
			...options.loader,
			".sql": "file",
		};
	},
});
