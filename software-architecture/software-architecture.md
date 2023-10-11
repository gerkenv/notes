# Software Architecture

## Audible Resources (Books, Podcasts) For System Design
https://www.teamblind.com/post/Podcasts-for-system-design-interview-prep-[senior-SWE]-QpSSSG4j
- audiobook version of for `Designing Data Intensive Applications`

## Stream Processing

### Questioning the Lambda Architecture / Kappa Architecture
- https://www.oreilly.com/radar/questioning-the-lambda-architecture/

## Rate Limiting / Load Shedding / Capacity Management / Traffic Prioritization

### Limit Concurrency And Adaptive Capacity Management
- https://www.youtube.com/watch?v=m64SWl9bfvk

### Load Shadding And Traffic Management
- https://www.youtube.com/watch?v=XNEIkivvaV4

### Admission Control In A 3000 Microservices System
- https://blog.acolyer.org/2018/11/16/overload-control-for-scaling-wechat-microservices/
    - WeChat classify their microservices as 
        - “Entry leap” services (front-end services receiving external requests), 
        - “Shared leap” services (middle-tier orchestration services), and 
        - “Basic services” (services that don’t fan out to any other services, and thus act as sinks for requests).
    - Overload detection with request queuing time
    - Compound admission level control is based on 2 dimensions
        - priority set by 'entry leap' service
        - assigned user priority
    - Overload control should take into account a variety of feedback mechanisms (e.g. DAGOR’s collaborative admission control) rather than relying solely on open-loop heuristics.
    - updated papar from comments
        - https://arxiv.org/abs/1806.04075    

## Reverse Proxy. LIFO Queue
- https://opensource.zalando.com/skipper/reference/filters/#lifo
    - https://dropbox.tech/infrastructure/meet-bandaid-the-dropbox-service-proxy
        - load shedding based on `lifo` idea
        - prioritisation based on using multiple queues and dequeuer aware of prioritization

## Scalable Weakly-consistent Infection-style Process Group Membership Protocol (SWIM) - Better Health Check
- https://distributed-computing-musings.com/2023/01/paper-notes-swimscalable-weakly-consistent-infection-style-process-group-membership-protocol/

## Backpressure / Back pressure
- https://medium.com/@jayphelps/backpressure-explained-the-flow-of-data-through-software-2350b3e77ce7

