# Kubernetes

## Objects
### Ingress
https://kubernetes.io/docs/concepts/services-networking/ingress/

## How Deployment Service Ingress Are Related
https://dwdraju.medium.com/how-deployment-service-ingress-are-related-in-their-manifest-a2e553cf0ffb

## Namespaces
https://kubernetes.io/docs/reference/kubectl/cheatsheet/#viewing-finding-resources
```sh
kubectl get pod --all-namespaces
kubectl get pod --namespace=some-namespace
kubectl get pod -n some-namespace
```

## Print Out JSON Representation
```sh
kubectl get pod some-pod -o json
```
for a subfield
```sh
kubectl get pod some-pod -o jsonpath='{.status}'
```

## Print Out Yaml Representation
```
kubectl describe object > file
```
## Copy File From Pod
https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#cp

## Megabyte MB vs Mebibyte MiB
KiB, MiB, GiB
https://www.majordifferences.com/2018/03/differences-between-megabyte-and.html
https://digilent.com/blog/mib-vs-mb-whats-the-difference/

## Get Some Object In JSON Format
```
zkubectl get deployment.apps/rendering-engine-pr-pr-5949-2 --namespace rendering-engine-pr-5949 -o json
```

## Patch
https://kubernetes.io/docs/reference/kubectl/cheatsheet/#patching-resources

### Add A Value To An Array
Use `--type=json` and operation `op=add`.

__Warning__: please point to an array element with `/env/-`.

Add new environment variable to a deployment.
```
zkubectl patch deployment some-deployment --type='json' --patch='[{"op": "add", "path": "/spec/template/spec/containers/0/env/-", "value":{"name":"ONE","value":"one"}}]'
```

### Replace Existing Value In Array
Use `--type=json` and operation `op=replace`.

__Warning__: please point to an array element by index with `/env/1`.

```
zkubectl patch deployment some-deployment --type='json' --patch='[{"op": "replace", "path": "/spec/template/spec/containers/0/env/1", "value":{"name":"ONE","value":"2"}}]'
```

### Remove Existing Value From Array
Use `--type=json` and operation `op=remove`.
```
zkubectl patch deployment some-deployment --type='json' --patch='[{"op": "remove", "path": "/spec/template/spec/containers/0/env/1"}]'
```

### Replace Existing Value
```
zkubectl patch deployment some-deployment --patch '{"spec":{"replicas":96}}' --type merge
```

