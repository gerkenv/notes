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
