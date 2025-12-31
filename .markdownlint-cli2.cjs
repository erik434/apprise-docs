module.exports = {
  config: {
    default: true,
	 // line length, disable for docs readability
    MD013: false,
	 // inline HTML, allow (Starlight uses it)
    MD033: false,
	 // first header in file does not have to be # (h1)
	 MD041: false
  },
  globs: ["**/*.md"],
  ignores: ["**/node_modules/**", "**/.git/**"]
};
