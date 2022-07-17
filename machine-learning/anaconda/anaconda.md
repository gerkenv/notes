# Anaconda

## Initial Setup On Mac
- Run `brew cask install anaconda`.
- Add `export PATH=/usr/local/anaconda3/bin:$PATH` to `~/.zshrc` or `~/.bash_profile`
- Create a project folder somewhere `project`, go into it with `cd project`
- Create a local conda environment by `sudo conda create --prefix envs python=3.6`
- Activate an environment by `conda activate ./env`
- Check active python version by `which python` - it should point to subfolder of `project/env/...`
- Add jupyter by `conda install notebook`
- Export `environment.yml` file by running `conda env export --from-history > environment.yml`
- Start notebook by `jupyter notebook .`
- Close the environment by `conda deactivate`

Links:
- https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-from-an-environment-yml-file
- https://medium.com/ayuth/install-anaconda-on-macos-with-homebrew-c94437d63a37
- https://kapeli.com/cheat_sheets/Conda.docset/Contents/Resources/Documents/index

## Cheat sheet
- add a new dependecy to `environement.yml` and run `sudo conda env update --file environment.yml --prefix ./envs`
- `conda install package`
- `conda remove package`
- `conda list package` - to see which version is installed
- `conda list` - to show all packages

## Secondary Run:
- `cd project`
- `conda activate ./envs`
- Check active python version by `which python` - it should point to subfolder of `project/env/...`
- `jupyter notebook .`

## Environment Mangement
- List all environments
  - `conda env list` or `conda info --envs`
- Install all packages you need and export `environment.yml` file by running `conda env export --from-history > environment.yml`.
  - https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#exporting-an-environment-file-across-platforms
- Create an environemnt later from `environment.yml` file
  - https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-from-an-environment-yml-file
- Update an environement after adding a new dependency to `environment.yml` by running `sudo conda env update --file environment.yml --prefix ./envs --prune`
  - https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#updating-an-environment
- Remove an environement
  - https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#removing-an-environment



