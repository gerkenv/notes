# VSCode

## Tips
https://code.visualstudio.com/docs/getstarted/tips-and-tricks

## Search for node modules in quick open
https://github.com/microsoft/vscode/issues/36438

Add following configuration
```json
  "search.exclude": {
    // access node_modules files from `quick open`
    "/node_modules": false,
    "**/node_modules": false,
    "**/bower_components": true,
    "**/*.code-search": true
  },
```

## Disable TS checks
https://stackoverflow.com/questions/42632215/how-to-disable-typescript-warnings-in-vscode

## Extensions
https://www.sitepoint.com/vs-code-extensions-javascript-developers/
https://code.visualstudio.com/blogs/2017/02/12/code-lens-roundup

### Live Server
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

### Extension Sets
https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack
https://marketplace.visualstudio.com/items?itemName=nodesource.vscode-for-node-js-development-pack
https://marketplace.visualstudio.com/items?itemName=afractal.node-essentials

### Import Cost
https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost

### Version Lens
https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens

Checks versions of npm packages.

### Code Complexity Estimation
https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics

### Static Code Analysis
https://marketplace.visualstudio.com/items?itemName=adisreyaj.sonarqube-status
https://github.com/SonarSource/sonarlint-vscode

### AI Code Completion / Tabnine
Helps to write code, comments and free text.
Privacy is secured.
ML model works locally.

https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode

### Faster Prototyping
https://quokkajs.com/docs/

### Search Node Modules
https://marketplace.visualstudio.com/items?itemName=jasonnutter.search-node-modules

## Extension Performance
https://www.freecodecamp.org/news/optimize-vscode-performance-best-extensions/

## GitLens 
### Interactive Rebase UI

## Updates

### 1.60
https://code.visualstudio.com/updates/v1_60#_high-performance-bracket-pair-colorization
https://code.visualstudio.com/updates/v1_60#_inlay-hints-for-javascript-and-typescript
