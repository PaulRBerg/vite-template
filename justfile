import "./node_modules/@prb/devkit/just/base.just"

na := require("na")

default:
    just --list

clean:
    nlx del-cli ".DS_Store" "dist"

@build:
    bun vite build

@dev *args:
    bun vite {{ args }}

@preview *args:
    bun vite preview {{ args }}

[group("checks")]
@eslint-check +paths=".":
    na eslint --cache --cache-location node_modules/.cache/eslint/.eslintcache {{ paths }}

[group("checks")]
@eslint-write +paths=".":
    na eslint --cache --cache-location node_modules/.cache/eslint/.eslintcache --fix {{ paths }}

[group("checks")]
@test *args:
    bun vitest run {{ args }}
