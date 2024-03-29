# Git

## Initalize A Repository
```
git init
```

## Set Default Branch Name `main`
```
git config --global init.defaultBranch main
```

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

## Rebase Current Branch Interactevely
- https://ona.io/home/squashing-commits-with-an-interactive-git-rebase/
```
git rebase -i @~5 # rebase last 5 commits
```
1. By default the `vi` or `vim` editor will be opened, so use `:x` or `:wq` to save and exit.
2. Check if the commit on top is the oldest / or commit on bottom is the oldest - point is, you cannot apply `s` - `squash` option to oldest commit, otherwise you'll get an error message `Cannot 'squash' without a previous commit`
3. In case of troubles use `git rebase --abort`
4. Use `git diff @ origin/main` to check if you haven't deleted something unintentionally 


## Push Current Branch (And Set It As Upstream)
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

## Search On Github
__only whole word will match - casing is not important__
- https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax
- https://docs.github.com/en/search-github/searching-on-github/searching-commits
- https://docs.github.com/en/search-github/searching-on-github/searching-code

## CDN oN GitHub
### Add An Image
You can copy paste an image into github markdown file.
https://gist.github.com/vinkla/dca76249ba6b73c5dd66a4e986df4c8d

### Remove An Image
Submit request here via virtual assitant
https://support.github.com/?tags=dotcom-direct&q=delete+image+from+cdn

## Push A Branch From Original Repository To A Fork Repository
https://stackoverflow.com/questions/25545613/how-can-i-push-to-my-fork-from-a-clone-of-the-original-repo

Add a new `remote` with
```
git remote add my-origin https://github.com/abc/repo.git
```
Then push a branch (and set it to be upsteam `-u`)
```
git push -u my-origin my-branch
```

## Get Date Of Git Commit
https://stackoverflow.com/questions/3814926/git-commit-date
```
git show -s --format=%ci <commit>
```

## Get Last Commit Id
https://stackoverflow.com/questions/5694389/get-the-short-git-version-hash/5694416
```
git rev-parse --short HEAD
```

## Check If Commit Id A Is A Parent Of Commit Id B
Produces exit state 1 or exit state 0
```
git merge-base --is-ancestor <commit-id-A> <commit-id-B> && echo "1" || echo "0"
```

## Rename Local & Remote Branch
https://stackoverflow.com/questions/30590083/how-do-i-rename-both-a-git-local-and-remote-branch-name

## Set Default User And Email For Commits
```
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

## Set VSCode As Default Git Editor
- https://stackoverflow.com/questions/30024353/how-to-use-visual-studio-code-as-default-editor-for-git
```shell
git config --global core.editor "code --wait"
```

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