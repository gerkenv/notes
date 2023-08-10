# Kubernetes

## Objects
### Ingress
https://kubernetes.io/docs/concepts/services-networking/ingress/

## How Deployment Service Ingress Are Related
https://dwdraju.medium.com/how-deployment-service-ingress-are-related-in-their-manifest-a2e553cf0ffb

## Namespaces
- https://kubernetes.io/docs/reference/kubectl/cheatsheet/#viewing-finding-resources
- https://kubernetes.io/docs/reference/kubectl/cheatsheet/#a-note-on-all-namespaces
```sh
kubectl get pod --all-namespaces
kubectl get pod -A # same as above
kubectl get pod --namespace=some-namespace
kubectl get pod -n some-namespace
```

## Get All Objects
```
kubectl get all
```

## Print Out JSON Representation
```sh
kubectl get pod some-pod -o json
```

## Print Out Part Of JSON Representation
https://kubernetes.io/docs/reference/kubectl/jsonpath/
for a subfield
```sh
kubectl get pod some-pod -o jsonpath='{.status}'
```

## Print Out Yaml Representation
```
kubectl get pod some-pod -o yaml
```

## Describe Resource
```
kubectl describe pod some-pod
```

## Edit Resource
```
kubectl edit pod some-pod
```

### Vim Commands 
- `i` - insert mode
    - type what you need as usual
- `esc` - view mode
    - `:wq` - save and exit
    - `:q` - exit without saving
    - `/pattern` +  `Enter` -> search mode
        - `n` - next occurrence
        - `shift` + `n` - previous occurance

__Note__: generally you want to edit a deployment which contains pod template. Then deployment will execute `rollout restart` (update pods one by one).

## Copy File From Pod
https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#cp

## Megabyte MB vs Mebibyte MiB
KiB, MiB, GiB
https://www.majordifferences.com/2018/03/differences-between-megabyte-and.html
https://digilent.com/blog/mib-vs-mb-whats-the-difference/

## Check Configuration
```shell
kubectl describe pod pod-name
```

### Check Latest Events
```shell
kubectl describe pod pod-name
```
And go to the `events` section in the bottom.

## Get Some Object In JSON Format
```
kubectl get deployment.apps/some-application-55 --namespace some-namespace -o json
```

## Get Some Object In YAML Format
```
kubectl get deployment.apps/some-application-55 --namespace some-namespace -o yaml
```

## Patch
https://kubernetes.io/docs/reference/kubectl/cheatsheet/#patching-resources

### Add A Value To An Array
Use `--type=json` and operation `op=add`.

__Warning__: please point to an array element with `/env/-`.

Add new environment variable to a deployment.
```
kubectl patch deployment some-deployment --type='json' --patch='[{"op": "add", "path": "/spec/template/spec/containers/0/env/-", "value":{"name":"ONE","value":"one"}}]'
```

### Replace Existing Value In Array
Use `--type=json` and operation `op=replace`.

__Warning__: please point to an array element by index with `/env/1`.

```
kubectl patch deployment some-deployment --type='json' --patch='[{"op": "replace", "path": "/spec/template/spec/containers/0/env/1", "value":{"name":"ONE","value":"2"}}]'
```

### Remove Existing Value From Array
Use `--type=json` and operation `op=remove`.
```
kubectl patch deployment some-deployment --type='json' --patch='[{"op": "remove", "path": "/spec/template/spec/containers/0/env/1"}]'
```

### Replace Existing Value
```
kubectl patch deployment some-deployment --patch '{"spec":{"replicas":96}}' --type merge
```

## Manually Scale Object
```shell
# by patching
kubectl patch deployment some-deployment -n default --patch '{"spec":{"replicas":19}}' --type merge
# by editing, manually changing `replicas` to 19
kubectl edit deployment some-deployment
# by scale command
kubectl scale deployment some-deployment --replicas=19
```

__Note__: All of those will fail to scale the deployment if it has a horizontal pod autoscaler (HPA) with any policy. Let's say HPA scales based on CPU and pods have enough CPU then `scale` request will be neglected by HPA. It will overwrite your command depending on the scaling policy.

## Add Horizontal Pod Autoscaler (HPA)
https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#autoscale
```shell
kubectl autoscale deployment some-deployment --min=3 --max=100 --cpu-percent=50
```
Upper / lower pod limits and autoscale should target to reach 50% cpu consumption on average on pods.

## Manually Scale Up HPA
_alias `horizontalpodautoscaler` = `hpa`_

```shell
# by patching
kubectl patch horizontalpodautoscaler some-horizontalpodautoscaler --patch '{"spec":{"minReplicas":50}}' --type merge
# by editing, manually changing `minReplicas` to 50
kubectl edit horizontalpodautoscaler some-horizontalpodautoscaler
```

## Logs
```shell
# Get logs for alive pod
kubectl logs object-name
# Get logs for a dead pod
kubectl logs object-name --previous
```

## Default Scaling Configuration
https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#default-behavior

## Liveness Probe / Readiness Probe / Statup Probe
- https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
- https://blog.colinbreck.com/kubernetes-liveness-and-readiness-probes-revisited-how-to-avoid-shooting-yourself-in-the-other-foot/
- failure stories by Datadog https://www.youtube.com/watch?v=QKI-JRs2RIE

## Managing Secrets using kubectl 
https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kubectl/
