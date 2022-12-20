# Shells

## Bash
```
which bash
```

### Bash Auto-completition (Mac OS)
```
brew install bash-completion
```
then add it to your `~/.bash_profile`
```
if [ -f $(brew --prefix)/etc/bash_completion ]; then
    . $(brew --prefix)/etc/bash_completion
fi
```

## Install `zsh`
https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH#install-and-set-up-zsh-as-default
```
sudo apt install zsh
```

### Auto-completition
```
echo 'autoload -Uz compinit && compinit' >> ~/.zshrc
source ~/.zshrc
```

### Oh My Zsh
- https://github.com/ohmyzsh/ohmyzsh
  - https://github.com/ohmyzsh/ohmyzsh#basic-installation

#### Plugins To Add
```
plugins=(
    git
    # zsh-completions
    zsh-syntax-highlighting
    zsh-autosuggestions
)
```

#### Themes

##### PowerLevel 10K
- https://github.com/romkatv/powerlevel10k


## Languages Compiled To Shell
- https://www.oilshell.org/

### Why?
- https://www.oilshell.org/why.html
