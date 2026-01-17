# IOTM Design 

The IOTM design document is based on the template for requirements published by Netwerk Digitaal Erfgoed.
Requirements are written in Markdown and transformed to HTML using the
[Bikeshed preprocessor](https://tabatkins.github.io/bikeshed/).

## Usage

Changes to files are automatically processed by a Github action.

## Generate HTML locally

To view HTML output locally (using a [Docker container](https://github.com/netwerk-digitaal-erfgoed/bikeshed-docker)),
run:

```bash
make spec
```

and open the `index.html` file:

```bash
open index.html
```

**WARNING: Do NOT add the generated `index.html` to your `.gitignore` as this will make github actions unable to automatically publish the rendered version of your specification on github pages.**

Alternatively, to update the HTML every time you make changes to [the source document](index.bs):

```bash
make watch
```
