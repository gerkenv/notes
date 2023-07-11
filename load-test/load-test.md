# Load Test

## Comparison Of Load Testing Tools
- https://k6.io/blog/comparing-best-open-source-load-testing-tools/

## Apache Bench
__Note__: Natively available on MacOS.

https://stackoverflow.com/questions/64043420/how-to-install-apache-benchmark-on-mac
### URL Only
```
ab -k -c 2 -t 30 -l "https://www.google.com/"
```
### With Headers
```shell
ab -t 10 -c 1 -k \
  -H 'Accept-Language: de-DE' \
  -H 'Accept-Encoding: gzip, deflate' \
  -m GET 'https://www.example.com/'
```

### --help
https://stackoverflow.com/questions/12732182/ab-load-testing
`-k` - add `Keep-Alive` header which is native added by a browser to keep connections alive thus server will be loaded as by usual browser.
`-c` - concurrency level to simulate multiple users. `-c 2` means 2 request flows in parallel.
`-t` - time in seconds to run the load test.
`-l` - if a page has dynamic content, a request might fail because the content-length might be different between requests. This option allows to avoid this.
`-n` - overall amount of requests for all concurrent users.
`-m` - HTTP method
`-H` - header


## Vegeta
https://github.com/tsenart/vegeta

### CLI
#### 1. Create A Script
```shell
# print all commands
set -o xtrace

mkdir results

# rate has rps units

for rate in 50 100 150 200 250 300 350 400 450; do
  vegeta attack -targets=targets.txt -rate="$rate" -duration=20s | vegeta encode > results/"requests-$rate.json"
  vegeta report results/"requests-$rate.json"
done

vegeta attack -targets=targets.txt -rate=500 -duration=600s | vegeta encode > results/requests.json
vegeta report results/requests.json

vegeta plot results/requests.json > results/plot.html

vegeta report results/requests.json
```

#### 2. Specify targets (requests) in a separate file
```
POST https://domain/path-1
# headers
content-type:application/json
accept:*/*
accept-language:en-GB
cookie:key_1=value_1; key_2=value_2;
# path to body json file
@./body-1.json

POST https://domain/path-2
# headers
content-type:application/json
accept:*/*
accept-language:en-GB
cookie:key_1=value_1; key_2=value_2;
# path to body json file
@./body-1.json
```

#### 3. Specify body in a separate file if required
```

{
  "key_1": 1,
  "key_2": 2
}
```
