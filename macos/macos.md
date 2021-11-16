# MacOS Setup

## Brew (Package Manager)
- https://docs.brew.sh/Installation
    - it will install xcode command line tools automatically

## Optional. Xcode Command Line Tools
https://www.freecodecamp.org/news/install-xcode-command-line-tools/
```
xcode-select --install
```
## Optional. Manage XCode Versions
https://github.com/RobotsAndPencils/xcodes

### Versions
https://xcodereleases.com/

### How To Use Command Line Tools After Uninstalling Xcode
https://stackoverflow.com/a/26749000
```
sudo xcode-select --switch /Library/Developer/CommandLineTools
```

## Clipboard Manager
https://github.com/Clipy/Clipy

## Shuffle Windows Around The Screens
Install https://www.spectacleapp.com/

### Alternatives
- https://techpp.com/2022/01/11/best-clipboard-managers-for-mac/
- https://www.makeuseof.com/tag/5-best-mac-clipboard-manager-apps-improve-workflow/

## Screen Recorder
https://getkap.co/

## Install `zsh`
- https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH

## Install `oh-my-zsh`
- https://github.com/ohmyzsh/ohmyzsh/
```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Install `fzf`
- https://github.com/gerkenv/notes/blob/main/shell/shells.md#install-fzf

## Display Fan Speed Rpm And Temperature
https://crystalidea.com/macs-fan-control

## Avoiding Overheating On M1 Mac
- https://www.reddit.com/r/apple/comments/xb2ngn/comment/io22fzv/?utm_source=share&utm_medium=web2x&context=3
    - turn on `low power mode`
        - it should throttle core performance by approximatelly 2/3
        - performance can be observed with `sudo powermetrics`

## Avoiding Overheating. Disable Turboboost On Intel Processor
Download `turboboost switcher` from http://tbswitcher.rugarciap.com/ and follow instructions after opening `.dmg` file to install the app.

### Trobleshooting
### If after installation turboboost does not switch off then
### Or turboboost is activated each time when laptop is coming from sleep mode
1. reboot and retry
2. open `help.rtf` from `.dmg` file and go to point `2.2 Turbo Boost doesn’t get disabled`.
  Run
  ```
  sudo kextutil -v /Applications/tbswitcher_resources/DisableTurboBoost.64bits.kext
  ```

It might output some additional actions, for example `reboot is required` - perform them and repeat the procedure.

3. If above does not help - reinstall completely. Check point 2.3 in `help.rtf` from `dmg` file.

## Python Version Manager for Mac OS
- https://medium.com/macoclock/how-to-install-and-manage-multiple-python-versions-on-macos-ca01a5e398d4

## Optional. Swap `~` and `±` keys on english international layout.
- Get shell script from here https://ppolyzos.com/2020/10/09/swap-places-between-tilde-and-section-sign-%C2%A7-key-in-your-macbook-keyboard/
- Go to system preferences 
    1. search for `open application at login` 
    1. add new one with `+` 
    1. `Cmd`+`Shift`+`.` to show hidden files in `finder`
    1. select `~/.tilde-switch`

# MacOs System

## Hot Keys
_shortcuts short keys hot keys_

- `Cdm`+`Space` - open app search
- `Cmd`+`Ctrl`+`Q` - lock screen
- `Cmd`+`Shift`+3 - full-screen
- `Cmd`+`Shift`+4 - select screen area
- long press on `a` -> extended `a` characters `ä`, `á`, etc. works with other keys as well.

## How To Run Not Trusted Applications From CLI
System preferences -> Security & Privacy -> Developer Tools -> Allow the apps below to run software locally that does not meet the system security policy

## Show Hidden Files
https://nordlocker.com/blog/how-to-show-hidden-files-mac/
- Click `Cmd`+`Shift`+`.` when Finder is opened.

## Screenshots
- `Cmd`+`Shift`+3 - full-screen
- `Cmd`+`Shift`+4 - select screen area

## Check Connected USB Devices
https://www.quora.com/How-do-I-check-what-USB-devices-are-connected-to-a-Mac

## Keychain issues
Multiple messanges in form
```
cloudd wants to use the "login keychain" 
```
if restart dooes not help
then https://forums.macrumors.com/threads/keychain-message-virus.1883336/

## View Files Of Another User
- https://apple.stackexchange.com/questions/52465/view-another-users-files-in-os-x

# Mac Hardware
## How to Check That Mac Is New?
- https://macreports.com/how-to-know-if-a-mac-is-refurbished-or-new/
