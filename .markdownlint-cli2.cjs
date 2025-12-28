module.exports = {
  config: {
    default: true,
	 // line length, disable for docs readability
    MD013: false,
	 // inline HTML, allow (Starlight uses it)
    MD033: false 
  },
  globs: ["**/*.md"],
  ignores: ["**/node_modules/**", "**/.git/**"]
};
