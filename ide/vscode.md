# VSCode

## Settings
### Disable Trust Workspace Feature
- https://stackoverflow.com/questions/67914668/vs-code-do-you-trust-the-authors-of-the-files-in-this-folder
open vscode command line `cmd+P` or `F1` type in and open `>user settings (json)` and add a line
```
"security.workspace.trust.enabled": false
```

## Set VSCode As Default Git Editor
- https://stackoverflow.com/questions/30024353/how-to-use-visual-studio-code-as-default-editor-for-git
```shell
git config --global core.editor "code --wait"
```

## How To Make Default Intellisense `Ctrl+Space` Work On MacOS
- https://github.com/microsoft/vscode/issues/103855#issuecomment-671062294
  - or use `cmd+i` in latest vscode versions

## Set VSCode As Default Git Diff Tool
```shell
git config --global --edit
```
add following lines
```
[diff]
    tool = default-difftool
[difftool "default-difftool"]
    cmd = code --wait --diff $LOCAL $REMOTE
```
it allows to use difftool through the command
```shell
git difftool
```
or
```
git difftoll @ @~1
```

## Tips
https://code.visualstudio.com/docs/getstarted/tips-and-tricks

## Search for node modules in quick open
https://github.com/microsoft/vscode/issues/36438

Add following configuration to settings
```json
  "search.exclude": {
    // access node_modules files from `quick open`
    "/node_modules": false,
    "**/node_modules": false,
    "**/bower_components": true,
    "**/*.code-search": true
  },
```

## Remove Unused Imports
https://stackoverflow.com/questions/46722701/is-there-a-way-to-remove-unused-imports-and-declarations-from-angular-2
Command `Organize imports` is `Option`+`Shift`+`O`.
Also there is a hook to execute an action on save, so adding this to settings could help
```
"editor.codeActionsOnSave": {
    "source.organizeImports": true
}
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

### Turbo Console Log
https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log

### Import Cost
https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost

### Version Lens
https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens

Checks versions of npm packages.

### Code Speel Checker
https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker

### Find Unused Imports
https://marketplace.visualstudio.com/items?itemName=iulian-radu-at.find-unused-exports

### GraphQL: Syntax Highlighting
https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax

### Code Complexity Estimation
https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics

### Docker
https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker

### DotENV
https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv

### ESLint
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

### Prettier - Code formatter
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

### Rainbow Tags
https://marketplace.visualstudio.com/items?itemName=voldemortensen.rainbow-tags

### Static Code Analysis
https://marketplace.visualstudio.com/items?itemName=adisreyaj.sonarqube-status
https://github.com/SonarSource/sonarlint-vscode

### AI Code Completion / Tabnine
Helps to write code, comments and free text.
Privacy is secured.
ML model works locally.

https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode

### GitHub Pull Requests and Issues
https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github

### Live Share
https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare

### Faster Prototyping
https://quokkajs.com/docs/

### Search Node Modules
https://marketplace.visualstudio.com/items?itemName=jasonnutter.search-node-modules

### Extension Performance
https://www.freecodecamp.org/news/optimize-vscode-performance-best-extensions/

### GitLens
#### Interactive Rebase UI

### Paste Images In Markdown
https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image
- Images are pasted by default into the same folder
- Add to your vscode settings to paste into `./__images__/filename`
```jsonc
"pasteImage.namePrefix": "__images__/",
```

### Smart Paste Into Markdown (Optional)
- https://marketplace.visualstudio.com/items?itemName=telesoho.vscode-markdown-paste-image

### Typewriter Sounds
https://marketplace.visualstudio.com/items?itemName=timreilly.typewriter-sounds

### Jupyter
https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter

### Python
https://marketplace.visualstudio.com/items?itemName=ms-python.python

### Thunder Client
Alternative to postman
https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client

## Additional Shortcuts
`cmd+p` -> type `>shortcuts json` -> select not `default`
```jsonc
// Place your key bindings in this file to override the defaults
[
    {
        "key": "cmd+g shift+c",
        "command": "git.checkout"
    },
    {
        "key": "cmd+g shift+s",
        "command": "git.sync"
    },
    {
        "key": "cmd+g cmd+s",
        "command": "git.stageSelectedRanges"
    },
    {
        "key": "cmd+g cmd+o",
        "command": "git.openChange"
    },
    {
        "key": "cmd+g cmd+u",
        "command": "git.unstageSelectedRanges"
    },
    {
        "key": "cmd+y",
        "command": "workbench.files.action.showActiveFileInExplorer"
    },
    {
        "key": "ctrl+cmd+]",
        "command": "workbench.action.moveEditorToNextGroup"
    },
    // for compatibility with default spectacle move window command
    {
        "key": "ctrl+cmd+right",
        "command": "-workbench.action.moveEditorToNextGroup"
    },
    {
        "key": "ctrl+cmd+[",
        "command": "workbench.action.moveEditorToPreviousGroup"
    },
    // for compatibility with default spectacle move window command
    {
        "key": "ctrl+cmd+left",
        "command": "-workbench.action.moveEditorToPreviousGroup"
    },
    {
        "key": "cmd+g cmd+r",
        "command": "git.revertSelectedRanges"
    },
    {
        "key": "cmd+m",
        "command": "workbench.action.toggleEditorWidths"
    },
    {
        "key": "ctrl+cmd+.",
        "command": "editor.action.fixAll"
    }
]
```

## Settings
`cmd+p` -> type `settings.json` -> select `~/Library/Application Support/Code/User/settings.json`
```jsonc
{
  // basic settings
  "workbench.colorTheme": "Default Light+",
  "git.autofetch": true,
  "editor.fontSize": 11,
  "editor.minimap.enabled": false,
  // recommended settings
  "breadcrumbs.enabled": false,
  // "editor.tabSize": 4,
  "security.workspace.trust.enabled": false,
  "editor.wordWrap": "wordWrapColumn",
  "editor.wordWrapColumn": 100,
  "editor.detectIndentation": false,
  // "editor.autoIndent": "full",
  "editor.renderWhitespace": "all",
  "editor.autoClosingBrackets": "always",
  "editor.guides.bracketPairs": true,
  "editor.autoSurround": "languageDefined",
  "editor.hover.sticky": true,
  "editor.occurrencesHighlight": true,
  // "debug.inlineValues": true,
  "diffEditor.renderSideBySide": true,
  "diffEditor.ignoreTrimWhitespace": false,
  "files.trimTrailingWhitespace": true,
  "files.trimFinalNewlines": true,
  "git.mergeEditor": true,
  "git.path": "/usr/local/bin/git",
  // "markdown.preview.fontSize": 12,
  "markdown.preview.scrollPreviewWithEditor": true,
  "markdown.preview.scrollEditorWithPreview": true,
  // "workbench.settings.editor": "json",
  "workbench.startupEditor": "none",
  "workbench.commandPalette.history": 500,
  "workbench.view.alwaysShowHeaderActions": true,
  "workbench.editor.highlightModifiedTabs": true,
  "workbench.editor.wrapTabs": false,
  "workbench.editor.tabSizing": "shrink",
  "workbench.editor.showTabs": true,
  "workbench.editor.enablePreview": false,
  "workbench.commandPalette.preserveInput": true,
  "workbench.editor.focusRecentEditorAfterClose": true,
  "workbench.quickOpen.preserveInput": true,
  "editor.suggest.preview": true,
  "window.restoreWindows": "all",
  "window.title": "${rootPath}  -->  ${activeEditorMedium}  ${dirty}",
  "search.showLineNumbers": true,
  "search.collapseResults": "alwaysCollapse",
  "scm.alwaysShowActions": true,
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.fontSize": 11,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },

  "[javascript]": {
    "editor.tabSize": 2,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.tabSize": 2,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[javascriptreact]": {
    "editor.tabSize": 2,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.tabSize": 2,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.wordWrap": "on",
    "editor.quickSuggestions": {
      "comments": "off",
      "strings": "off",
      "other": "off"
    },
    "editor.tabSize": 4, // because git sometimes does not understand 2 spaces indentation
    "editor.defaultFormatter": "vscode.markdown-language-features"
  },
  "[graphql]": {
    "editor.tabSize": 2,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.tabSize": 2,
    "editor.quickSuggestions": {
      "strings": true
    },
    "editor.formatOnSave": true,
    "editor.suggest.insertMode": "replace",
    "editor.defaultFormatter": "vscode.json-language-features",
  },
  "[jsonc]": {
    "editor.tabSize": 2,
    "editor.defaultFormatter": "vscode.json-language-features",
    "editor.formatOnSave": true,
  },
  "[yaml]": {
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "editor.autoIndent": "advanced",
    "editor.quickSuggestions": {
      "other": true,
      "comments": false,
      "strings": true
    },
    "editor.formatOnSave": false
  },
  "[scss]": {
    "editor.tabSize": 2
  },
  "[plaintext]": {
    "editor.wordWrap": "on"
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features",
    "editor.wordWrapColumn": 220
  },
  "workbench.editorAssociations": {
    "*.ipynb": "jupyter-notebook"
  },
  "notebook.cellToolbarLocation": {
    "default": "right",
    "jupyter-notebook": "left"
  },
  "cSpell.userWords": [],
  "search.exclude": {
    // access node_modules files from `quick open`
    "/node_modules": false,
    "**/node_modules": false,
    "**/bower_components": true,
    "**/*.code-search": true
  },
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true
  },
  // optional recommendations
  "editor.formatOnSave": true,
  "typescript.autoClosingTags": true,
  // "typescript.format.enable": true,
  "editor.bracketPairColorization.enabled": true,
  // "typescript.inlayHints.variableTypes.enabled": true,
  "javascript.inlayHints.variableTypes.enabled": true,
  "typescript.preferences.includePackageJsonAutoImports": "on",
  // "typescript.tsserver.experimental.enableProjectDiagnostics": true,
  // "typescript.tsserver.maxTsServerMemory": 1024,
  // "typescript.tsserver.useSeparateSyntaxServer": true,
  // -> extensions
  // turbo console log
  "turboConsoleLog.addSemicolonInTheEnd": true,
  // "eslint.format.enable": true,
  "eslint.alwaysShowStatus": true,
  "eslint.codeActionsOnSave.mode": "all",
  "eslint.lintTask.enable": true,
  "eslint.run": "onSave",
  // code metrics
  "codemetrics.basics.CodeLensHiddenUnder": 0,
  "codemetrics.basics.CodeLensEnabled": true,
  // tab nine
  "tabnine.experimentalAutoImports": true,
  // cspell
  "cSpell.diagnosticLevel": "Hint",
  "cSpell.language": "en-US, de-DE",
  "cSpell.maxNumberOfProblems": 5,
  "cSpell.maxDuplicateProblems": 1,
  // paste image
  "pasteImage.namePrefix": "__images__/",
  // code lens
  // "merge-conflict.codeLens.enabled": false,
  // "editor.codeLens": true,
  // "merge-conflict.codeLens.enabled": true,
}
```

## Updates

### 1.60
https://code.visualstudio.com/updates/v1_60#_high-performance-bracket-pair-colorization
https://code.visualstudio.com/updates/v1_60#_inlay-hints-for-javascript-and-typescript
