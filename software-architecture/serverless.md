# Serverless
Is not about absence of server - it is about using server only when it is required. 
If there are no requests - no server costs.
If there isa requests - then a runtime will be initialized with a server code and then request will be processed. (This is cold request)
For a while a server will stay alive and then will be disabled in case of absence of requests.

## Cloudflare Workers
- intro https://workers.cloudflare.com/
- more details https://developers.cloudflare.com/workers/

### Limits
https://developers.cloudflare.com/workers/platform/limits/ 

### Pricing
https://developers.cloudflare.com/workers/platform/pricing/

### Cloudflare Pages
https://pages.cloudflare.com/
