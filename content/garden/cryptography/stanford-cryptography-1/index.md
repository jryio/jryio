---
title: "🪴 Stanford Cryptography 1"
date: 2021-09-21T02:44:55.417000055Z
updated: 2023-08-28T21:43:04.616213Z
weight: 2
extra:
  note_type: 🪴
---

- [ ] Review the free book on discrete probabilities to strengthen understanding of probability for cryptographic analysis [Discrete Probability Book](https://en.wikibooks.org/wiki/High_School_Mathematics_Extensions/Discrete_Probabilityhttps://en.wikibooks.org/wiki/High_School_Mathematics_Extensions/Discrete_Probability)
- [ ] Solve the crypto pals problems as an applied coding exercise as well as a method to reinforce knowledge about cryptography from the class [Crypto Pals Challenges](https://cryptopals.com)

---

# Cryptography 1 Notes

# W.1 - Course Overview

[TLS](@/garden/cryptography/tls.md) is used to secure HTTP protocol

   The [Handshake Protocol](@/garden/cryptography/handshake-protocol.md) establishes a shared secret key between the participants, alice and bob.

   Once alice and bob both have the shared key there are able to ensure [Confidentiality](@/garden/cryptography/confidentiality.md) and [Integrity](@/garden/cryptography/integrity.md) when transmitting their data

[Symmetric Encryption](@/garden/cryptography/symmetric-encryption.md)  uses a shared secret key `K` between participants alice and bob.

   Single use key encryption (one time key / one time pad)

      A key that is generated once and used once to encrypt one message.

   Multi use key encryption (many time key)

      Same key can be used to encrypt multiple messages over a longer period of time.

[You should only use encryption algorithms which are publicly known and peer reviewed](@/garden/cryptography/you-should-only-use-encryption-algorithms-which-are-publicly-known-and-peer-reviewed.md)

Two Steps to cryptography

   Key sharing

   Secure communication

[Digital Signatures](@/garden/cryptography/digital-signatures.md) are the equivalent of real signatures in the physical world. However we have a problem - if a signature is digital then a person can simply find a document you signed and apply it to another document you did not sign. To solve this problem we ensure that digital signatures are totally unique to you as well as dependent on the contents of the document being signed. This prevents tampering.

How cryptographic algorithms are made

   1. Specify the type of attack with a **threat model**
   2. Propose an algorithm construction
   3. Show that if someone were to break our constriction - under the given threat model - that doing so would also involve solving a pre-existing known hard problem (which has no feasible solution)

### History of cryptography

Substitution cipher

Caesar Cipher (no key)

Vigener Cipher

[The worst type of vulnerability is a cipher text only attack](@/garden/cryptography/the-worst-type-of-vulnerability-is-a-cipher-text-only-attack.md) this is because using only the information provided via the cipher text, the attacker can re-construct the encryption key and decrypt your message.

# W.1 - Discrete Probability

Cryptography operates on a finite universe of inputs, specifically the universe of all `n-bit` strings make of `{0, 1}^n`

[Uniform Distribution](@/garden/cryptography/uniform-distribution.md) assigns the same probably to each element in the universe, meaning that *the probability of getting `x_1` or `x_159` are uniform (equal)*

[Point Distribution](@/garden/cryptography/point-distribution.md) means we only get one element in the universe, since that element has probability `1`

[Probability Event](@/garden/cryptography/probability-event.md) describes the probability of getting an event `A` in our universe `U` .

   Example

$$
U = {0,1}^8
\\
A = \{ all \; x \; in \; U \; such \; that \; lsb_2(x)=11 \} \subseteq U
$$

![Drawing](Drawing_bin_preview.png)

[Union Bound ](@/garden/cryptography/union-bound/index.md) represents the probability that events `A_1` AND `A_2` occur

   Example

![Drawing](Drawing%20(2)_bin_preview.png)

[Random Variable](@/garden/cryptography/random-variable/index.md) is a function from the universe to the set `V` where the random variable takes its values

[Uniform Random Variable](@/garden/cryptography/uniform-random-variable/index.md) is a variable whose probability is uniform `for all a in U : Pr[r = a] = 1 / |U|`

[Randomized Algorithms](@/garden/cryptography/randomized-algorithms.md) is an algorithm which takes some input `m` but also takes an implicit argument `r` which is a [Uniform Random Variable](@/garden/cryptography/uniform-random-variable/index.md) (different value each time the algorithm is run).
Because of this, randomized algorithms are defining a random variable since the outputs of a randomized algorithm is a distribution of all outputs given that the inputs `m` is the same.

![Drawing](Drawing%20(3)_bin_preview.png)

[Variable Independence](@/garden/cryptography/variable-independence.md) occurs if event `A` happening has no influence on event `B` happening. Therefore the probably of `A AND B` happening is the product of the probability of A and the probably of B

![Drawing](Drawing%20(4)_bin_preview.png)

[XOR](@/garden/cryptography/xor.md) is an operation where you add each bit of an n-bit string and take the modulo by 2.

![Drawing](Drawing%20(5)_bin_preview.png)

[XOR](@/garden/cryptography/xor.md) has a very **important property** forcryptography which is that: if Y is **random variable of n-bits** and **X is an independent uniform variable of n-bits** then **Z := Y XOR X is a uniform variable of n-bits.**

![Drawing](Drawing%20(6)_bin_preview.png)

[The Birthday Paradox](@/garden/cryptography/the-birthday-paradox.md) is reverent to cryptography because it influences the size of our universe. If we have `n` **independent identically distributed random variables in our universe** then we only need `1.2 x |U|^1/2` samples until we have probability `1/2` or greater that two samples are equal.

![Drawing](Drawing%20(7)_bin_preview.png)

#### References

["End-to-end encryption: Behind the scenes" by Martin Kleppmann, Diana Vasile](https://www.youtube.com/watch?v=oRZoeDRACrY&feature=youtu.be)

[Crypto 101](https://www.crypto101.io/)

[Phil Rogaway - IACR Distinguished Lecture 2015](https://www.youtube.com/watch?v=F-XebcVSyJw)

[Oktane19: Does WebAuthn Signal the End of Passwords for Browsers?](https://www.youtube.com/watch?v=S_Yxt3KJKYE)

