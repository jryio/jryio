---
title: "Pseudo-random Generator"
date: 2021-09-23T19:05:55.427999973Z
updated: 2021-09-23T19:05:55.428Z
weight: 4
extra:
  note_type:  
---

A `PRG` is a function that takes a seed `s` in a seed space `S` and produces values `n` in a value space `N` . It is **essential that the value space is MUCH larger than the seed space.**

A `PRG` is a totally deterministic function whereby the same seed `s` will always produce the same sequence of values in `N`.

Equally as important is that the sequence of values of `N` **look like random values.**

