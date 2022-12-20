# exit on any command non-zero exit code / on any failing command
# please set in the begging of the script
set -e

# update the system
sudo apt update && sudo apt upgrade -y

# install chrome
sudo apt-get install google-chrome-stable

# check if `python` is already installed 
which python
which python3

# install `zsh`
# https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH#install-and-set-up-zsh-as-default
sudo apt install zsh

# install `oh-my-zsh`

# install fzf

# check if `git` is installed
which git

# git. configure default branch name to be `main`

# install kinto (replicate macos keybindings)
