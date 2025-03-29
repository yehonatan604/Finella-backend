import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import _import from "eslint-plugin-import";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...fixupConfigRules(compat.extends("eslint:recommended", "plugin:import/recommended")),
    {
        plugins: {
            import: fixupPluginRules(_import),
        },

        languageOptions: {
            globals: {
                ...globals.node,
            },

            ecmaVersion: "latest",
            sourceType: "module",
        },

        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx"],
                    "moduleDirectory": ["node_modules", "src"]
                },
            },
        },

        rules: {
            "import/order": ["error", {
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
                "newlines-between": "any",

                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },
            }],
        },
    },
];