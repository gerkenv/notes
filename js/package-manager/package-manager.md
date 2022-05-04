# Package Manager

## Yarn / NPM

## Cheatsheets
- https://github.com/areai51/yarn-cheatsheet
- https://classic.yarnpkg.com/en/docs/migrating-from-npm
- https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc

## Get Package Version
```
yarn info ${name} versions --json 2> /dev/null
```

## Get Package Info
```
yarn info package
yarn info package@0.0.17
```

## Resolutions
https://classic.yarnpkg.com/en/docs/selective-version-resolutions/
define
```json
"resolutions": {
  "package-1": "^1.2.3"
}
```

## Version Ranges ~ ^
https://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json
```jsonc
"package-1": "~1.2.3" // --> "< 1.3.0"
```

```jsonc
"package-1": "^1.2.3" // --> "< 2.0.0"
```

## Lock dependencies
https://docs.npmjs.com/cli/v7/commands/npm-shrinkwrap

## Show Installed Packages
Globally
```
yarn global list           # complete hierarchy
yarn global list --depth=0 # top level only

npm -g list           # complete hierarchy
npm -g list --depth=0 # top level only
```

## Packages Registry Configuration
- https://docs.npmjs.com/cli/v8/configuring-npm/npmrc#files
- https://stackoverflow.com/questions/51330735/npm-config-global-vs-local

```
# comment
; comment
# registry for a scope `@godaddy`, all packages `@godadday/something` will be pulled from here
@godaddy:registry=https://registry.npmjs.org
# registry for everything else
registry=https://registry.yarnpkg.com
```

## Yalc
Simple local package manager. Alternative to `npm link`.

https://github.com/wclr/yalc

### Simplest workflow
1. Install globally
```
yarn global add yalc
npm -g install yalc
```

2. Go to a dependency repository. Build a project, switch to the build output directory with files you want to publish to the package manager and run:
```
yalc push
```
this adds the package to the yalc local repository.

3. In main repository (where depndency is used) run:
```
yalc add package-name && yarn
```

__Note__:
Every time you make a change in the dependency package - you need to build a apckage and push it again.

4. To uninstall all yalc depndencies do:
```
yalc remove --all
yarn
```
