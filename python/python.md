# Python

## Python Version Managers
1. https://towardsdatascience.com/installing-multiple-alternative-versions-of-python-on-ubuntu-20-04-237be5177474
    - good, but fits for ubuntu based systems only 
1.  https://stackoverflow.com/questions/2547554/multiple-python-versions-on-the-same-machine
    - https://github.com/pyenv/pyenv
        - awesome installation guide 
          - https://medium.datadriveninvestor.com/how-to-install-and-manage-multiple-python-versions-on-linux-916990dabe4b
          - __preferred option__, but installation process requires a lot of dependencies (which are unavoidable with `asdf` as well)
          - please use updated list of dependencies, [`python-openssl` is not available for ubuntu 22.04](https://stackoverflow.com/a/73566675)
              ```
              sudo apt-get install --yes libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libgdbm-dev lzma lzma-dev tcl-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev wget curl make build-essential python3-openssl
              ```
          - Common build problems https://github.com/pyenv/pyenv/wiki/Common-build-problems 

1. install `asdf` and add a required configuration line to a bash configuration file https://asdf-vm.com/guide/getting-started.html#_3-install-asdf
    - then follow https://stackoverflow.com/a/46258340 
        1. pull repository
        ```
        git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.10.2
        ```
        1. add to `.zshrc` or `bashrc`
        ```
        . $HOME/.asdf/asdf.sh
        ```
        1. add python plugin
        ```
        asdf plugin-add python
        ```
        1. check currently installed python versions
        ```
        asdf list python
        ```
        1. install latest from https://www.python.org/downloads/
        ```
        asdf install python 3.11.1
        ```
        1. uses same build process under the hood as pyenv does. so installing linux packages as dependencies is unavoidable.
        ```
        Installing Python-3.11.1...
        WARNING: The Python bz2 extension was not compiled. Missing the bzip2 lib?
        WARNING: The Python curses extension was not compiled. Missing the ncurses lib?
        WARNING: The Python readline extension was not compiled. Missing the GNU readline lib?
        ERROR: The Python ssl extension was not compiled. Missing the OpenSSL lib?

        Please consult to the Wiki page to fix the problem.
        https://github.com/pyenv/pyenv/wiki/Common-build-problems


        BUILD FAILED (Pop 22.04 using python-build 2.3.9-1-gff93c58b)
        ```
        1. uninstall with
        ```
        rm -rf $HOME/.tool-versions $HOME/.asdfrc
        ```

## `pyenv`
- `pyenv install --list` - show versions available for installation
- `pyenv version` - show the current Python version(s) and its origin
- `pyenv versions` - show the current Python version(s) and its origin
- `pyenv install 3.11.1` - install a particular version
- `pyenv uninstall 3.11.1` - uninstall a particular version
- `pyenv global 3.11.1` - set global version
- `pyenv local 3.11.1` - set a version for a current directory -> creates a `.python-version` file for pyenv, which determines the version in the current directory and subdirectories.

### How To Find `python2` and `python3`?
See 'pyenv help global' for tips on allowing both python2 and python3 to be found.


