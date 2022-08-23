# Containers

## Docker

### Images

#### List Images
List all `-a`
```
docker image ls -a
```
Only IDs `-q`
```
docker image ls -aq
```

##### --help
```
Usage:  docker image ls [OPTIONS] [REPOSITORY[:TAG]]

List images

Aliases:
  ls, list

Options:
  -a, --all             Show all images (default hides intermediate images)
      --digests         Show digests
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print images using a Go template
      --no-trunc        Don't truncate output
  -q, --quiet           Only show image IDs
```

#### Build Image
```
docker build --tag=${repository/application:optional_tag} .
```

#### Image History
```
docker image history --no-trunc some-image-name > some-file
```

#### Pull Image
```
docker pull some-image
```

#### Remove All Images
```
docker image ls -aq | xargs -L1 docker image rm
```

### Containers

#### List Containers
Alias: `docker ps`, `docker container ps`

List only running containers
```
docker container ls
```
List all `-a`
```
docker container ls -a
```
Only IDs `-q`
```
docker container ls -aq
```

##### --help
```
Usage:  docker container ls [OPTIONS]

List containers

Aliases:
  ls, ps, list

Options:
  -a, --all             Show all containers (default shows just running)
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print containers using a Go template
  -n, --last int        Show n last created containers (includes all states) (default -1)
  -l, --latest          Show the latest created container (includes all states)
      --no-trunc        Don't truncate output
  -q, --quiet           Only display container IDs
  -s, --size            Display total file sizes
```

#### Stop Containers
Only running
```
docker container ls -q | xargs -L1 docker stop
```
all `-a`
```
docker container ls -aq | xargs -L1 docker stop
```

#### Start All Containers
```
docker container ls -aq | xargs -L1 docker start
```

#### Remove All Containers
```
docker container ls -aq | xargs -L1 docker container rm
```

#### Run Container
What means `create` and `start` container from a latest tag og the `local-repo/rendering-engine-image` image and write output `>` to the `log` file.
```
docker container run --name some-name -p 3333:3333 --rm --cpus 1 -m 1000M local-repo/rendering-engine-image > log
```
##### --help
- `--name` - custom name for a container. (Useful for scripts, to access exact running container).
- `-p` - map container port to a host port `container:host`.
- `--rm` - delete container when it stops. (Useful when developing docker image, since you cannot delete an image while some container is using it).
- `--cpus` - amount of cpu cores for container to use.
- `-m` - amount of memoery for container to use.


#### Open Shell In A Running Container
Alias: `docker exec`

By Id `d11d34bcff5c`
```
docker container exec -it d11d34bcff5c sh
```
By Name
```
docker container exec -it some-name sh
```

#### Execute Any Command In A Container
Alias: `docker exec`

By Id `d11d34bcff5c`
```
docker container exec -it d11d34bcff5c ls -al /
```
By Name
```
docker container exec -it some-name ls -al /
```

#### Copy File From Container
https://docs.docker.com/engine/reference/commandline/cp/
Alias: `docker cp`

By Id `d11d34bcff5c`
```
docker container cp d11d34bcff5c:/tmp/test-1.cpuprofile ./test-1.cpuprofile
```
__Note__ in `docker-container:path` path is always absolute. So `d11d34bcff5c:/tmp` is the same as `d11d34bcff5c:tmp`.

By Name
```
docker container cp some-name:/tmp/test-1.cpuprofile ./test-1.cpuprofile
```

#### Copy From Local To Container
https://docs.docker.com/engine/reference/commandline/cp/
Alias: `docker cp`

By Id `d11d34bcff5c`
```
docker container cp ./test-1.cpuprofile d11d34bcff5c:/tmp/test-1.cpuprofile
```
__Note__ in `docker-container:path` path is always absolute. So `d11d34bcff5c:/tmp` is the same as `d11d34bcff5c:tmp`.

By Name
```
docker container cp ./test-1.cpuprofile some-name:/tmp/test-1.cpuprofile
```

#### How To Get A Container Id
##### Of A Running Container
https://stackoverflow.com/questions/46031522/dynamically-get-a-running-container-id-name-created-by-docker-run-command

##### When Starting A Container
https://stackoverflow.com/questions/56218336/how-to-get-docker-container-id-when-starting-container

#### Logs
https://docs.docker.com/engine/reference/commandline/logs/
```
docker container logs container-name > log-file
```

## Unistall Docker From Mac
- https://stackoverflow.com/a/39823119/8309959

## Podman
### Install
```
brew install podman
```

### Version
```
podman -v
```

### Initialize Podman Virtual Machine 
- https://docs.podman.io/en/latest/markdown/podman-machine-init.1.html
```
podman machine init --cpus 2 --memory 4096 --volume /Users:/Users
```

### Start Podman Virtual Machine 
```
podman machine start
```

### Stop Podman virtual MAchine
```
podman machine stop
```

### Substitute Docker Commands
```
echo "alias docker=podman" >> ~/.zshrc
```

### Run Test Container
```
podman run -t --rm -p 8080:80/tcp docker.io/library/httpd
curl localhost:8080
```
It should log
> 

### Stop Running Containers
```
podman container ls -q | xargs -L1 podman stop
```

### Remove All Stopped Containers
```
podman container prune
# or
podman container ls -q | xargs -L1 podman rm
```

### Select Exited Containers
```
podman container ls --filter status=exited
```

### Select Running Containers
```
podman container ls --filter status=running
```
