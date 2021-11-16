# Git
## Remove everything except master
```
git branch --list | grep -e "[^master \*]" | xargs -L1 echo
git branch --list | grep -e "[^master \*]" | xargs -L1 git branch -D
```
Regex is wrong, but the idea is clear

## Rebase from branch based on master
https://git-scm.com/docs/git-rebase
First let’s assume your topic is based on branch next. For example, a feature developed in topic depends on some functionality which is found in next.
```
    o---o---o---o---o  master
         \
          o---o---o---o---o  next
                           \
                            o---o---o  topic
```
We want to make topic forked from branch master; for example, because the functionality on which topic depends was merged into the more stable master branch. We want our tree to look like this:
```
    o---o---o---o---o  master
        |            \
        |             o'--o'--o'  topic
         \
          o---o---o---o---o  next
```
We can get this using the following command:
```
git rebase --onto master next topic
```

## Push Current Branch
```
git branch --show-current | xargs -L1 git push -u origin --no-verify
```

## Remove Remote Branch
```
git push origin --delete branch-name --no-verify
```

## Checkout Previous Branch
```
git checkout -
```

## Stash

### Apply
```
git stash apply 0
```

## SSH
### Verify Connection
https://docs.github.com/en/enterprise-server@3.0/authentication/troubleshooting-commit-signature-verification/checking-your-commit-and-tag-signature-verification-status

### Check existing keys
https://docs.github.com/en/enterprise-server@3.0/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys

### Setup New Key
https://docs.github.com/en/enterprise-server@3.0/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

## Compare 2 commits

### CLI
```
git log e..a --oneline --stat
```
__Note__: `a` itself is excluded.
So in case of
```
a->b->c->d->e
```
a servers as a base, only changes introduced by `b->c->d->e` are displayed.

### Github UI
https://docs.github.com/en/github/committing-changes-to-your-project/viewing-and-comparing-commits/comparing-commits#comparing-commits
```
https://github.com/owner/repo/compare/a..e
```
Same as with CLI, `a` is excluded and represents base.

## Conventions

### Commits
https://www.conventionalcommits.org/en/v1.0.0/#specification