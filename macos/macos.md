# MacOS

## Hot Keys
_shortcuts short keys hot keys_

- `Cdm`+`Space` - open app search
- `Cmd`+`Ctrl`+`Q` - lock screen
- `Cmd`+`Shift`+3 - full-screen
- `Cmd`+`Shift`+4 - select screen area
- long press on `a` -> extended `a` characters `ä`, `á`, etc. works with other keys as well.

## Xcode Command Line Tools
https://www.freecodecamp.org/news/install-xcode-command-line-tools/
```
xcode-select --install
```
## Manage XCode Versions
https://github.com/RobotsAndPencils/xcodes

### Versions
https://xcodereleases.com/

## How To Use Command Line Tools After Uninstalling Xcode
https://stackoverflow.com/a/26749000
```
sudo xcode-select --switch /Library/Developer/CommandLineTools
```

## How To Run Not Trusted Applications From CLI
System preferences -> Security & Privacy -> Developer Tools -> Allow the apps below to run software locally that does not meet the system security policy

## Show Hidden Files
https://nordlocker.com/blog/how-to-show-hidden-files-mac/
- Click `Cmd`+`Shift`+`.` when Finder is opened.

## Shuffle Windows Around The Screen
Install https://www.spectacleapp.com/

## Clipboard Manager
https://github.com/Clipy/Clipy

## Screen Recorder
https://getkap.co/

## Screenshots
- `Cmd`+`Shift`+3 - full-screen
- `Cmd`+`Shift`+4 - select screen area

## Check Connected USB Devices
https://www.quora.com/How-do-I-check-what-USB-devices-are-connected-to-a-Mac

## Display Fan Speed Rpm And Temperature
https://crystalidea.com/macs-fan-control

## Disable Turboboost On Intel Processor
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
