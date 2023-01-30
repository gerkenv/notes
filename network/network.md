# Network

## Find IP Information
https://ip-lookup.net/

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

## Ping 
Basic ommand to send a small network package to a certain address.
It helps to troubleshoot network issues like:
- latency spikes
- request timeouts
```
ping 1.1.1.1
ping -s 64 8.8.8.8 # `-s` would set size of package in bytes
```

### PingPlotter
- https://www.pingplotter.com/

Can be used for continious monitoring.

## True-Client-IP
`true-client-ip` is an industry standard header provided by a cloud infrastructure.
- https://community.akamai.com/customers/s/article/Send-True-Client-IP-to-origin-server?language=en_US
- https://developers.cloudflare.com/fundamentals/get-started/reference/http-request-headers/#true-client-ip-enterprise-plan-only
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-true-client-ip-header.html

### Take into consideration that IP might have multiple clients inside
- [IANA-Reserved IPv4 Prefix for Shared Address Space
](https://www.rfc-editor.org/rfc/rfc6598)
- https://totaluptime.com/kb/how-to-implement-connection-rate-limiting/
    > But filtering on the IP alone is not necessarily the perfect solution in every scenario. For example, some larger ISPs place hundreds or even thousands of users behind a single IP address using technology such as CGNAT (carrier-grade NAT). When filtering on source IP address exclusively, this can incorrectly limit traffic. To get around this, other rate limiting parameters are often added
- https://forum.vodafone.de/t5/Archiv-DSL/Is-it-possible-to-disable-CGNAT/m-p/2428725
    > on mobile connections - they also use CGNAT services. And the usage of CGNAT will increase as the pool of IPv4 addresses is exhausted - since 2011(!). So providers will have to use CGNAT for IPv4 connections in the future on a much wider scale
    - proof 1 https://en.wikipedia.org/wiki/IPv4_address_exhaustion
    - proof 2 https://serverfault.com/questions/895270/how-widely-deployed-is-carrier-grade-nat

## Frequently Asked Questions (FAQ) on IPv6 adoption and IPv4 exhaustion
https://www.internetsociety.org/deploy360/ipv6/faq/
- very detailed article around the topic

## Example IPv6 transition planning 
- https://www.itu.int/en/ITU-D/Regional-Presence/AsiaPacific/Documents/S08-IPv6-Transition-Planning.pdf
