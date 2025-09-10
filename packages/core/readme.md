## `git diff` for @git-diff-view Component

## Usage

```tsx
// ==== step1: generate diff view data, this part can be used in the worker/server environment for better performance ==== //
import { DiffFile } from "@git-diff-view/core";
const file = new DiffFile(
    data?.oldFile?.fileName || "",
    data?.oldFile?.content || "",
    data?.newFile?.fileName || "",
    data?.newFile?.content || "",
    data?.hunks || [],
    data?.oldFile?.fileLang || "",
    data?.newFile?.fileLang || ""
  );
// light / dark theme, base on current highlight engine
// default is light
file.initTheme(xxx);
// init
file.init();
// or you can use below method to init
file.initRaw();
file.initSyntax(); // if you do not want syntax highlight, you can skip this step

// build the `Split View` data;
file.buildSplitDiffLines();

// build the `Unified View` data;
file.buildUnifiedDiffLines();

// get All the diff data bundle, you can safely to send this data to the client side
const bundle = file.getBundle();

// ==== step2: render the @git-diff-view component ==== //

// merge bundle
const mergeFile = DiffFile.createInstance(data || {}, bundle);

// used for @git-diff-view/react and @git-diff-view/vue
<DiffView diffFile={mergeFile} />

<DiffView :diffFile="mergeFile" />

```

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
    From within the `packages/core` directory, run the following command:
    ```bash
    npm run build:webpack
    ```
    This will generate the `dist` directory with the bundled cjs and esm modules.

## Screen Shot

![Screenshot](https://raw.githubusercontent.com/MrWangJustToDo/git-diff-view/aa2e918498270f737d28e7531eab08fa3f1b8831/1.png)
![Screenshot](https://raw.githubusercontent.com/MrWangJustToDo/git-diff-view/69c801e5eb5fcabc9c9655825eb1228f18dc1e0c/5.png)
![Screenshot](https://raw.githubusercontent.com/MrWangJustToDo/git-diff-view/aa2e918498270f737d28e7531eab08fa3f1b8831/theme.png)
![Screenshot](https://raw.githubusercontent.com/MrWangJustToDo/git-diff-view/aa2e918498270f737d28e7531eab08fa3f1b8831/2.png)
![Screenshot](https://raw.githubusercontent.com/MrWangJustToDo/git-diff-view/aa2e918498270f737d28e7531eab08fa3f1b8831/3.png)
