---
title: "Cipher"
date: 2021-09-23T18:25:26.549Z
updated: 2021-09-23T18:25:26.549Z
weight: 4
extra:
  note_type:  
---

Ciphers are defined over three spaces

1. The set of all possible keys `K`
2. The set of all possible messages `M`
3. The set of all possible cipher texts `C`

A cipher consists of two algorithms

`E: K x M → C`

`D: K x C → M`

The algorithms must statisfy the [Consistency Equation](@/garden/cryptography/consistency-equation.md) which is as follows

`for all m in M and k in K : D(k, E(k,m)) = m`

This means that all messages encrypted with a `k` must be able to be decrypted with the same key `k` and produce the same original message `m` .

---

Something interesting is that `E` might be a randomized algorithm which produces slightly different outputs for given inputs.
However essentially, `D` must be deterministic!

