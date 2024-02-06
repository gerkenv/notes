# Windows

## Clipboard Manager
It is built-in since windows 10.
https://support.microsoft.com/en-us/windows/clipboard-in-windows-c436501e-985d-1c8d-97ea-fe46ddf338c6

Use `win+V` to open it.
Use arrow keys and `enter` to select what to paste.

## Windows Subsystem For Linux (WSL)
### Windows Subsystem For Linux (WSL). Install
- how to install wsl https://learn.microsoft.com/en-us/windows/wsl/install

### WSL. Best Practices For Setup
https://learn.microsoft.com/en-us/windows/wsl/setup/environment

### WSL. Cheat Sheet
- `wsl` - start wsl
- `wsl --list --online` - check available online distributions
- `wsl --list --verbose` - check available offline distributions and associated wsl version
    - [wsl version comparison](https://learn.microsoft.com/en-us/windows/wsl/compare-versions) (wsl 2 is better than wsl 1)
- `wsl --update`
- `wsl --status` - get default wsl distribution and associated wsl version
- `wsl --shutdown` - make a proper restart for limux system

More here https://learn.microsoft.com/en-us/windows/wsl/basic-commands#install

### WSL. Locate Linux Files In Windows
https://learn.microsoft.com/en-us/windows/terminal/tips-and-tricks

### WSL. Identify IP Address
https://learn.microsoft.com/en-us/windows/wsl/basic-commands#identify-ip-address

### WSL. Mount Disk Or Device
https://learn.microsoft.com/en-us/windows/wsl/basic-commands#mount-a-disk-or-device

### WSL. Set Up Windows Terminal
https://learn.microsoft.com/en-us/windows/wsl/setup/environment#set-up-windows-terminal

### WSL. Visual Studio Code with Windows Subsystem for Linux
https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-vscode

### WSL. Setting Up SSH-Agent
After usual procedure from github docs run
```
ssh -T git@github.com
```
More details in https://stackoverflow.com/a/59430757

## Windows Terminal
### Windows Terminal. Install
- how to set up https://learn.microsoft.com/en-us/windows/terminal/install

### Windows Terminal. Key Bindings
-  `Ctrl+Shift+P` - invoke the command palette
-  `Ctrl+Shift+T` - open a new tab
-  `Alt+Shift+plus` - open a new tab (split horizontally)
-  `Alt+Shift+minus` - open a new tab (split vertically)
-  `Ctrl+Tab` - switch tab
-  `Ctrl+Shift+W` - close tab

### Windows Terminal. Set Up Custom Comands With A Key Binding
https://learn.microsoft.com/en-us/windows/terminal/tips-and-tricks#send-input-commands-with-a-key-binding

### Windows Terminal. Tips And Tricks
https://learn.microsoft.com/en-us/windows/terminal/tips-and-tricks


