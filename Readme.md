# roquib.github.io

Source for my blog at [roquib.github.io](https://roquib.github.io/).

Posts are Djot files in `content/posts`, named `YYYY-MM-DD-slug.dj`. The build script in `src/` turns them into static HTML under `out/www`. It runs on [Bun](https://bun.sh).

```console
$ bun install
$ bun run new -- my-post-slug   # create a dated post
$ bun run build                 # write the site to out/www
$ bun run serve                 # build, serve on :8080, rebuild on change
```

Deployment: pushes to `master` run `.github/workflows/ci.yml`, which publishes `out/www` to GitHub Pages. In the repo settings, set Pages → Build and deployment → Source to **GitHub Actions**.
