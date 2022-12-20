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

