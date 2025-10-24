/*!
 * pixCSS ✨ v0.0.1 (https://pix-css.dev)
 * Copyright 2024 - Licensed under MIT
 */

import themeDefault from "bundle-text:../styles/themes/_default.css";
import themeAmber from "bundle-text:../styles/themes/_amber.css";
import themeJade from "bundle-text:../styles/themes/_jade.css";
import themePurple from "bundle-text:../styles/themes/_purple.css";
import themeSand from "bundle-text:../styles/themes/_sand.css";

const rgbToHex = (c) => {
	const [r, g, b] = c
		.replace("rgb(", "")
		.replace(")", "")
		.split(", ")
		.map((part) => parseInt(part));
	return `#${r.toString(16).padStart("0", 2)}${g.toString(16).padStart("0", 2)}${b.toString(16).padStart("0", 2)}`;
};

const updateColorPicker = () => {
	const markComputedStyle = getComputedStyle(document.querySelector("mark"));

	document.querySelector('input[type="color"]').value = rgbToHex(
		markComputedStyle.backgroundColor,
	);
};

const themes = {
	default: themeDefault,
	amber: themeAmber,
	jade: themeJade,
	purple: themePurple,
	sand: themeSand,
};

const updateTheme = (theme) => {
	document.querySelector("aside style").innerHTML = theme;

	requestAnimationFrame(() => updateColorPicker());

	localStorage.setItem("pix-theme", theme);
};

document.querySelector(".dropdown.theme").addEventListener("change", (e) => {
	e.currentTarget.querySelector("summary").textContent =
		`Theme: ${e.target.value}`;
	updateTheme(themes[e.target.value]);
});

updateTheme(themes.default);

const colorSchemes = {
	auto: "light dark",
	light: "light",
	dark: "dark",
};

const updateColorScheme = (colorScheme) => {
	const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
	metaColorScheme?.setAttribute("content", colorScheme);

	requestAnimationFrame(() => updateColorPicker());

	localStorage.setItem("pix-color-scheme", colorScheme);
};

document
	.querySelector(".dropdown.color-scheme")
	.addEventListener("change", (e) => {
		e.currentTarget.querySelector("summary").textContent =
			`Color-scheme: ${e.target.value}`;
		updateColorScheme(colorSchemes[e.target.value]);
	});

updateColorScheme(colorSchemes.auto);
