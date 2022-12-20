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


## Setting Up MacOS Key Bindings In Linux
- few solutions https://askubuntu.com/questions/10008/how-to-make-keyboard-work-like-osx-system-wide
- custom solution https://petrstepanov.medium.com/a-macos-like-keyboard-remap-on-ubuntu-linux-cae1d108a97
- https://superuser.com/questions/426515/efficient-key-bindings-using-both-mac-and-linux
  
### Kinto
https://kinto.sh/
- install / uninstall https://github.com/rbreaves/kinto#quick-install-method 

## Backup And Restore
- timeshift https://www.youtube.com/watch?v=U-lMJHcjCVs

