# @git-diff-view/lowlight

This package provides a low-level virtual DOM-based syntax highlighter.

## Building from source

This package can be built from source using either the root project's build script or with Webpack directly within the package.

### Building with the root project's build script (Rollup)

To build this package using the project's default Rollup-based build script, run the following command from the root of the project:

```bash
pnpm run build:packages
```

### Building with Webpack

This package also includes a Webpack build configuration for standalone building. To build with Webpack, follow these steps:

1.  **Install dependencies:**
    If you are in a standalone project, make sure you have installed the dependencies by running:
    ```bash
    npm install
    ```
    or if you are in the monorepo:
    ```bash
    pnpm install
    ```

2.  **Run the Webpack build:**
    From within the `packages/lowlight` directory, run the following command:
    ```bash
    npm run build:webpack
    ```
    This will generate the `dist` directory with the bundled cjs and esm modules.
