# Network

## Route IP traffic through a particular / VPN network interface

### Find out VPN interface
Turn off VPN
```
ifconfig > vpn-on
```
Turn on VPN
```
ifconfig > vpn-off
```
Compare files.
New interface should be something like `utun1`

### Check IP of particular host
```
dig www.google.com +short
```

### Route IP through Certain Network Interface
https://superuser.com/questions/756134/how-to-direct-ip-route-through-specific-interface-in-os-x
```
route add -host 54.81.143.201 -interface utun1
```

## Check Routing Table On Mac
https://www.tunnelsup.com/how-to-see-the-routing-table-on-mac-osx/
Print all routes
```
netstat -rn > all-routes
```

## `ip` - Default Linux Utility To Manage Routes And Network Interfaces
Install on macos.
https://superuser.com/questions/687310/ip-command-in-mac-os-x-terminal

Additional commands:
