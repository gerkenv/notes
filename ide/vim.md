# Vim

## Default System Editor In MacOS
By default system editor is `vim`.

Alternatively you could set different editor by providing environment variable `EDITOR`
```
EDITOR='code --wait' kubectl edit pod some-pod
```
or you could select it forever by setting in your bash configuration file
```
# set VScode as defult system editor (for every app)
export EDITOR='code --wait'
```
Also some application provide additional variables to configure an editor for a certain app
```
# set VScode as defult kubernetes editor
export KUBE_EDITOR='code --wait'
```

### Vim Commands
- `vim [path]` - opens a file at `path` in editor
  - `i` - switches to the insert mode
      - type what you need as usual
  - `esc` - switches to view mode
      - `/pattern` +  `Enter` -> search mode
          - `n` - next occurrence
          - `shift` + `n` - previous occurance
      - `:q` - exit without saving
      - `:w` - write - saves the file.
      - `:wq` - save and exit
      - `:x` - equivalent of `:wq` - write and exit.
