# Shells

## Bash
```
which bash
```

### Auto-completition 
```
brew install bash-completion
```
then add it to your `~/.bash_profile`
```
if [ -f $(brew --prefix)/etc/bash_completion ]; then
    . $(brew --prefix)/etc/bash_completion
fi
```

## `zsh` Z Shell
- Installing `zsh`
  - https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH

## Auto-completition
```
echo 'autoload -Uz compinit && compinit' >> ~/.zshrc
source ~/.zshrc
```

## Oh My Zsh
- https://github.com/ohmyzsh/ohmyzsh
  - https://github.com/ohmyzsh/ohmyzsh#basic-installation

## Plugins To Add
```
plugins=(
    git
    # zsh-completions
    zsh-syntax-highlighting
    zsh-autosuggestions
)
```
