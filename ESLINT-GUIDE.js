// README - ESLint Configuration
// This is a flat config file for ESLint in modern ESM format.
//
// Key features of this configuration:
// 1. Uses ESLint's modern flat config format (eslint.config.mjs)
// 2. Configures TypeScript-specific rules only for TS files
// 3. Sets up import ordering and unused import removal
// 4. Provides optimized rules for Next.js development
//
// VS Code Integration:
// - Make sure you have the ESLint extension installed
// - The .vscode/settings.json is already configured for this setup
// - Errors will appear directly in the editor
// - Auto-fix on save is enabled
//
// Available npm scripts:
// - pnpm run lint         - Run ESLint on all files
// - pnpm run lint:fix     - Fix all auto-fixable issues
// - pnpm run lint:report  - Generate a detailed report
// - pnpm run lint:file    - Check a specific file (e.g. pnpm run lint:file ./src/components/Navbar.tsx)
// - pnpm run format       - Format code with both ESLint and Prettier
//
// Common issues:
// - Import ordering issues can be fixed with 'pnpm run lint:fix'
// - Non-null assertions (!.) are flagged as warnings but not auto-fixed
//
// For more information, see the ESLint documentation at:
// https://eslint.org/docs/latest/use/configure/configuration-files-new
