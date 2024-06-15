const baseConfig = require("@blitzjs/next/eslint");

// Extend baseConfig with additional plugins and settings
baseConfig.extends = [
  ...baseConfig.extends, // Spread existing extends
  "plugin:@typescript-eslint/recommended", // TypeScript rules
  "plugin:react/recommended", // React rules
  "prettier", // Prettier plugin
  "plugin:prettier/recommended", // Prettier recommended rules
];

// Add or override ESLint rules
baseConfig.rules = {
  ...baseConfig.rules, // Spread existing rules
  // You can add other rules here
};

// Ensure the ESLint knows about the React version
baseConfig.settings = {
  ...baseConfig.settings,
  react: {
    version: "detect",
  },
};

module.exports = baseConfig;
