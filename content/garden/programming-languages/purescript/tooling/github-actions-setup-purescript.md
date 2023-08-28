---
title: "Github Actions: Setup PureScript"
date: 2021-08-11T17:34:58.642271996Z
updated: 2023-08-28T21:17:18.257973Z
weight: 4
extra:
  note_type:  
---

A GitHub Action which sets up a [🌲 PureScript](@/garden/programming-languages/purescript/purescript.md) toolchain for CI. Contains the following tools by default:

- The [PureScript compiler](https://github.com/purescript/purescript)
- The [Spago package manager and build tool](https://github.com/purescript/spago)
- The [`psa` error reporting frontend for the compiler](https://github.com/natefaubion/purescript-psa)

You can also optionally include the following tools:

- The [`purs-tidy` code formatter](https://github.com/natefaubion/purs-tidy)
- The [Zephyr dead code elimination tool](https://github.com/coot/zephyr)

This action is designed to support PureScript tools. Your PureScript project may also depend on tooling and libraries provided by the NPM ecosystem, in which case you will also want to use the [setup-node](https://github.com/actions/setup-node) action.

[GitHub - purescript-contrib/setup-purescript: Set up a specific PureScript toolchain in your GitHub Actions workflow](https://github.com/purescript-contrib/setup-purescript)

