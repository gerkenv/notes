# Locust

## Writing A Locustfile / Intro to Locust
https://docs.locust.io/en/stable/writing-a-locustfile.html

## Create A User To Send A Request
https://docs.locust.io/en/stable/writing-a-locustfile.html#httpuser-class
```
def hello_world(self):
    self.client.get("/hello")
    self.client.get("/world")
```

## Distribute Request Ratio `@task`
https://docs.locust.io/en/stable/api.html#task-decorator

## Add Random Delay
https://docs.locust.io/en/stable/api.html#locust.wait_time.between
```
between(min_wait, max_wait)
```

## Set Constant Throuput / Request Rate / RPS
https://docs.locust.io/en/stable/api.html#locust.wait_time.constant_throughput
```
wait_time = constant_throughput(0.1) # wait 10 seconds before sending a new request
# wait_time = constant_throughput(1) # wait 1 seconds before sending a new request
# wait_time = constant_throughput(10) # wait 0.1 seconds before sending a new request
```

## Define Load Test Shape
Dynamically change request rate depending on any conditions (time, test phase, etc.).
https://docs.locust.io/en/stable/custom-load-shape.html#restricting-which-user-types-to-spawn-in-each-tick
