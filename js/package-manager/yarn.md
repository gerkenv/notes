# Yarn

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
