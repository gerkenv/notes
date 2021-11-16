# exit on any command non-zero exit code / on any failing command
# please set in the begging of the script
set -e

# update the system
sudo apt update && sudo apt upgrade -y

# install chrome
sudo apt-get install google-chrome-stable

# install bookmark manager
echo "Don't forget to setup a shortcut to `show the tray menu` !!!!!"


# check if `python` is already installed 
which python
which python3

# install performance monitor `htop`
sudo apt install htop

# install `zsh`
# https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH#install-and-set-up-zsh-as-default
sudo apt install zsh

# install `oh-my-zsh`
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

echo "install fzf optionally"
# https://github.com/junegunn/fzf#using-git

# check if `git` is installed
which git

# git. configure default branch name to be `main`
git config --global init.defaultBranch main

# install kinto (replicate macos keybindings)
/bin/bash -c "$(wget -qO- https://raw.githubusercontent.com/rbreaves/kinto/HEAD/install/linux.sh || curl -fsSL   https://raw.githubusercontent.com/rbreaves/kinto/HEAD/install/linux.sh)"
