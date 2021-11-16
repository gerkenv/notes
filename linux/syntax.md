# Linux Syntax

## Update System Packages
```shell
sudo apt update && sudo apt upgrade -y
```

## Check Partitions
```
sudo fdisk -l
```

## Mount Partition
```shell
# create a new folder
mkdir /mnt/windows
# mount a partition to a new folder
sudo mount /dev/sda123 /mnt/windows
```

## Open File
```
echo "some text" > new.md
open new.md
```

## Text / Code Editors
- `gedit`
- `nano`
- `vim`
- `vi`

## Installing Gnome Extensions
- ubuntu 20 https://linuxhint.com/installing_gnome_extensions_ubuntu/
- ubuntu 22 https://linuxhint.com/install-gnome-shell-extensions-ubuntu-22-04/
```
# install manager
sudo apt install gnome-shell-extension-manager
# install extensions
sudo apt install gnome-shell-extensions
```
