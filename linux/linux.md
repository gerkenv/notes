# Linux

## Theory
Check the [configuring the linux web server course notes](https://github.com/gerkenv/notes/blob/main/courses/configuring-linux-webservers.md)

## Distributions 

### How To Select. Option 1.
https://www.youtube.com/watch?v=iox7fr7p5Hc 
- starter: 
  - pop os (optimized for gaming, comes with drivers)
  - mint (issues with nvidea drivers)
  - ubuntu (too much 'not recommend' videos recently)
- stable (but runs a bit behind): 
  - debian (base repo)
  - fedora (desktop managed by red hat) 
    - package manager: `yum` or `dnf`, install even more with rmpfusion.org
- server: centos (mirrors `rel` - enterprise linux system manged by Red Hat)
- lightweight, access to latest packages, cumbersome installation
  - arch 
    - Arch User Repository (AUR) 
      - a community-driven repository containing package descriptions (PKGBUILD's) that allows users to compile packages from source.
      - if you don't use it then Arch is very stable, otherwise - make backups before installations
    - package manager `pacman`
  - manjaro (arch + gui)
    - package manager `pamac` + AUR
  - acro 

### How To Select. Option 2.
1. 2020 3 options for developers https://www.youtube.com/watch?v=-EOzLbWxLWQ&ab_channel=KskRoyal
2. 2022 how to choose? https://www.youtube.com/watch?v=dL05DoJ0qsQ&ab_channel=ChrisTitusTech

### Like MacOs
- https://www.youtube.com/watch?v=oI6EQGEagEU
  - elemntary os
  - pop os
  - https://ubuntubudgie.org/
    - provides the same top-level menu as mac os does

## Why Pop Os?
1. It can use default debian package manager `apt` and ubuntu package manager which provides an option to use custom repositories.
1. Some other benefits https://www.youtube.com/watch?v=Cs4QRBm0C_8&t=52s&ab_channel=TheLinuxExperiment


## dual boot pop os 22.04 with windows 10
https://www.youtube.com/watch?v=vdxMB6qD5rc&t=7s&ab_channel=SandipSky
1. `sudo fdisk -l` - check partitions and find windows reserved partition with `EFI System` type (usually it is located before the main `C` drive). 
  Its `device` might be `/dev/nvme0n1p123` or `/dev/sda123`.
1. `mkdir /mnt/windows` - create an empty directory.
1. `sudo mount /dev/sda123 /mnt/windows` - mount directory to a partition.
1. `sudo ls /boot/efi/EFI` - check current configuration
   > BOOT  Linux  Pop_OS-7cd89900-1221-4aed-90dd-b5552bb4021c  systemd`
1. `sudo cp -r /mnt/windows/EFI/Microsoft /boot/efi/EFI` - copy windows configuration in linux boot options
1. `sudo ls /boot/efi/EFI` - check that `Microsoft` folder was copied correctly
BOOT  Linux  Microsoft	Pop_OS-7cd89900-1221-4aed-90dd-b5552bb4021c  systemd
1. `sudo nano /boot/efi/loader/loader.conf` - open the boot loader configuration
    1. file content should be something like
        ```
        default Pop_OS-current
        ```
    1. add 2 more line, so file wuld look like
        ```
        default Pop_OS-current
        timeout 7
        console-mode max
        ```
    1. save the file `control+O` -> file name prompt will show up -> don't change the file name and press `enter`
    1. exit with `control+X`
1. `sudo cat /boot/efi/loader/loader.conf` - check that file content was correctly updated 


## Pop Os. Keyboard Shortcuts
https://support.system76.com/articles/pop-keyboard-shortcuts/
### usefull apps
1. `super` - open launcher
1. `super+T` - open terminal
1. `super+F` - open files
### keyboard language
1. `super+space` - cycle between languages
1. `control+alt+delete` - log out
1. `super+esc` - log out
### windows
1. `super+control+arrow left/right` - snap window to left/right
1. `super+M` - maximize/minimize window
### apps
1. `super+arrow` - switch between apps
### workspaces
1. `super+control+arrow up/down` - switch workspaces
1. `super+shift+arrow up/down` - move window between workspaces


## Install Chrome
### Option 1
```
sudo apt-get install google-chrome-stable
```

### Option 2
https://daylifetips.com/how-to-install-google-chrome-on-pop_os/
```
# check if `wget` is installed
which wget
# or
wget --help
# if it not installed - install it with
# `sudo apt install -y wget`
# then download latest stable chrome version
cd ~/Downloads
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt-get install ./google-chrome-stable_current_amd64.deb
```

## Install `zsh`
https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH#install-and-set-up-zsh-as-default
```
sudo apt install zsh
```

## Setting Up MacOS Key Bindings In Linux
- few solutions https://askubuntu.com/questions/10008/how-to-make-keyboard-work-like-osx-system-wide
- custom solution https://petrstepanov.medium.com/a-macos-like-keyboard-remap-on-ubuntu-linux-cae1d108a97
- https://superuser.com/questions/426515/efficient-key-bindings-using-both-mac-and-linux
  
### Kinto
https://kinto.sh/
- install / uninstall https://github.com/rbreaves/kinto#quick-install-method 

## Backup And Restore
- timeshift https://www.youtube.com/watch?v=U-lMJHcjCVs
