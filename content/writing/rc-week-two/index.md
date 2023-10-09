+++
title = "Recurse 2 - Connections, Challenges, Creative Coding"
date = 2023-10-02
+++

Reflections on my second week at [The Recurse
Center](https://recurse.com). [Last week](@/writing/rc-week-one/index.md)  I
wrote about what came before RC and introducing myself to the unique people in
my batch.


The second week of Recurse consisted of exploration. I attended more interest
groups than I had expected and organized two myself. The openness of the
calendar reminds me of a directory of clubs at school you can join.
Everyone is welcome and half the time you don't know what the club does until
you show up.


Here is a brief summary and description of my experience with different working
groups at RC this batch:


### Creative Coding

Create a computer program, in 90 minutes or less, which satisfies a randomly
generated prompt. You program can be anything, or do anything, related to the
prompt. Here are some examples:

> Would anyone want it?

> Think of the radio


The [Creative Coding](https://creativecoding.recurse.com/) tradition started 
about three years ago, and there is a rich gallery of out-of-the-box
websites and programs from previous Recursers. I suggest you take the time to
look through past projects.


In such a constrained time frame it's surprising both how much and how little
can get done. For example, I spent 60 minutes fighting with tooling while trying to
build [Evil
Editor](https://github.com/jryio/creativecoding/tree/master/evileditor), a text
editor which rejects your words if they are too negative. While with [CipherFM](https://github.com/jryio/creativecoding/tree/master/cipherFM)
I learned the relevant parts of the WebCrypto API to generate a
radio station which produces cryptographic noise... BZZZ.

```typescript
// CipherFM, a poorly designed, rapidly implemented radio station of random
// cryptogrpahic noise. Enjoy!
function buf2hex(buffer: Uint8Array) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');

}

function tocolor(p: number): string {
  if (p >= 88 && p < 92) {
    return "blue"
  } else if (p >= 92 && p < 96) {
    return "yellow"
  } else if (p >= 96 && p < 100) {
    return "green"
  } else if (p >= 100 && p < 104) {
    return "red"
  } else if (p >= 104 && p < 108) {
    return "pink"
  } else {
    return "black"
  }
}


const freuency = document.getElementById("frequency")
const label = document.getElementById("label")
const histogramElement = document.getElementById("histogram")

let fm = ""
let lastFm = ""

freuency?.addEventListener("input", async (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    const value = event.target?.value
    fm = value
    if (!label) { return }
    label.innerHTML = `Frequency: ${fm} MHz`
    // crypto
    const length = 8 * 256
    const alg = "HKDF"


    const pw = value;
    const enc = new TextEncoder()

    const key = await window.crypto.subtle.importKey(
      "raw",
      enc.encode(pw),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"],
    );

    while (fm !== lastFm) {
      const salt = window.crypto.getRandomValues(new Uint8Array(16))
      const derivedBits = await window.crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt,
          iterations: 100000,
          hash: "SHA-256",
        },
        key,
        length,
      );
      const output = new Uint8Array(derivedBits);
      const hex = buf2hex(output)

      const histogram: { [key: string]: number } = {}
      const histostring: { [key: string]: string } = {}
      const binned = hex.match(/.{1,2}/g)
      if (!binned) { return }
      binned.map((x) => {
        const count = histogram[x]
        histogram[x] = count ? count + 3 : 1
        histostring[x] = x.repeat(count)
      })

      if (histogramElement) {
        const children = Object.values(histostring).map((value) => {
          let pre = document.createElement("pre")
          pre.innerHTML = value
          pre.style.transform = "rotate(-90deg)"
          const color = tocolor(Number(fm))
          pre.style.color = color
          pre.style.margin = "0"
          pre.style.padding = "0"
          return pre as Node
        })

        histogramElement.replaceChildren(...children)
      }
    }
  }

})
```


This group is more fun and more anxiety inducing than I thought. We often do not
need to write our computer code under duress, adding the time pressure
and the strong desire to have something working by the end of the time slot,
causes extreme focus. Focus on what is sufficient to get the program
working, everything else is irrelevant. *The Essentials Driven Development*
is a useful practice to strengthen decision making during regular development. I
have found myself thinking this week: *If I gave myself 90 minutes to build
this Merkle Tree implementation, what would it look like?*.

Creative Coding is the most surprising and refreshing thing I have done so far
at RC.


### Tool Time Talk


This group is all about getting together to talk about the different tools we know and use. Thus far it  
has been a topical meeting once per week where we'll discuss things like
editors, shells, data wrangling tools, debuggers etc. I have found that while I
have plenty of tools to offer, I have even more to learn.


Also, there is great fun geeking out about tools where every tool is on equal
footing. No vim v.s. emacs flame wars, just plain old fashioned: "what tools do
you use for this job". Connecting to the root of [Homo Sapien](https://australian.museum/learn/science/human-evolution/homo-sapiens-modern-humans/),
wisdom, tool making, and teaching can be great fun even if it's about
computer tools.


### Rust Books Crew


It should not be surprising to find my fellow Recursers programing
in Rust during their batch. For the last eight years in a row, Rust has
ranked [most admired programming language](https://survey.stackoverflow.co/2023/#section-admired-and-desired-programming-scripting-and-markup-languages)
on the Stack Overflow Developer Survey.


Skills levels in Rust skew towards beginner at Recurse and had I joined only a
few months ago I would have been a beginner as well. Several other great Rust
programmers on Zulip who incorporate lively debugging and
discussion into the group.


This batch there are enough intermediate Rust programmers, myself included, to
have a group book club for [Rust for
Rustaceans](https://nostarch.com/rust-rustaceans). Covering topics like
[Existential
Types](https://varkor.github.io/blog/2018/07/03/existential-types-in-rust.html)
and [Marker
Traits](https://doc.rust-lang.org/stable/std/marker/struct.PhantomData.html) have
been useful in a group setting instead of individual reading.


Aside from tokio, I have not dealt directly with spawning threads, channels, or
working with atomics yet, but I would like to dive deeper into these primitives as
I work on more complex Rust programs.


### Cryptopals


What fun! Rather unexpectedly the Cryptopals group turned out to be sizable,
engaged, and curious. I am enjoying so much organizing this group and working
through the challenges.

Specifically [Cryptopals Set 1 - Challenge
3](https://cryptopals.com/sets/1/challenges/3) - breaking a single character XOR
cipher -  engaged more of my byte-level Rust
than I expected. Without lower level exercises like these, it can be easy to
throw `clone()` around in Rust without appreciating how to take the "harder"
reference and lifetime approach.


Implementing a frequency analysis on cipher texts is a great way to work
directly with character bytes, ASCII tables, and statistical testing methods
like [chi-squared](https://en.wikipedia.org/wiki/Chi-squared_test).


After several attempts, and getting the scoring value inverted (oops), here is
my implementation of scoring text based on expected English character frequencies.

Some issues I encountered while implementing:

1. Which characters in the ASCII table do I consider valid?
2. Which non-alphanumeric characters should I count? For example `'`, `\n`, `\t`, `"`, `.`, `!`, `?`, `,`.
3. How should invalid characters should I scored?
4. Should I score the frequency of a character or character counts themselves?


I landed on a set of tradeoff which have worked thus far in the challenges.

1. ASCII control characters are invalid when analyzing texts. No regular English
   phrase contain these.

2. Whitespace are valid because they distinguish random letters from
   formatted sentences.

3. Punctuation are valid if aggregated. Attempting to score per-character
   leads to chi-sqaured scores which deviate from expected results.

4. Comparing expected character counts against actual character counts is better
   than comparing frequency values because the smaller text size of an actual
   cipher text will almost certainly be non-representative of the entire English
   language character frequency.

5. Higher chi-squared values are not better, in fact pay attention to what the
   formula says: `(expected - actual)^2` tells you that actual character count
   values being closer to expected character count values produce smaller
   chi-squared scores.



```rust
/// Computes the frequency of characters in an buffer and compares against known English langauge
/// character frequency, returning a score.
///
/// The score is computed using the chi-sqaured test: (difference squared of the actual - expected
/// values) divided by the expected value, summed for all measurements
///
/// Low values of chi-sqaured indicate a high fit between the recorded results and the expected.
/// High score indicate large difference between actual and expected results.
pub fn frequency_score(buffer: &[u8]) -> u32 {
    // Highest score says that this is invalid
    if !buffer.is_ascii() {
        return std::u32::MAX;
    }

    // Highest score says that this is invalid
    if buffer
        .iter()
        .any(|&c| c != ASCII_NEWLINE && (c < ASCII_CONTROL_END || c == ASCII_CONTROL_DEL))
    {
        return std::u32::MAX;
    }

    let actual_chars_len = buffer.len() as f64;
    let actual_chars_count: HashMap<u8, f64> = buffer
        .iter()
        .map(|&x| (x as char).to_ascii_lowercase())
        .fold(HashMap::new(), |mut hash_map, c| {
            // ASCII a-z or A-Z
            let key: u8 = if c.is_alphabetic() {
                c as u8
            }
            // whitespace mapping
            else if c as u8 == ASCII_WHITESPACE || c as u8 == ASCII_TAB {
                ASCII_WHITESPACE
            }
            // Convert all other characters (punctuation or numbers) to '.'
            else {
                ASCII_PERIOD
            };

            hash_map
                .entry(key)
                .and_modify(|f| *f += 1.0)
                .or_insert(DEFAULT_FREQUENCY);

            hash_map
        });

    let mut chi_sqrd = 0.0;
    for (c, f) in ENGLISH_FREQUENCIES {
        let expect_num_char = (f / 100.0) * actual_chars_len;
        let actual_num_char = actual_chars_count.get(&c).unwrap_or(&DEFAULT_FREQUENCY);
        let diff = expect_num_char - actual_num_char;
        chi_sqrd += (diff * diff) / expect_num_char;
    }
    chi_sqrd as u32
}
```


Notes on Rust in the code samples above - things I enjoyed using or
learned while writing my implementation:

[`HashMap::entry()`](http://doc.rust-lang.org/1.72.1/std/collections/struct.HashMap.html#method.entry) is a great API for getting and inserting values in a single
method call. It solves the issue of calling `HashMap::get()`, checking if the
value exists, then calling `HashMap::set()`.


[`Iterator::fold()`](https://doc.rust-lang.org/1.72.1/std/iter/trait.Iterator.html#method.fold)
has a nice design for iterators where you wish to reduce into a different type
than the type of the iterator.
[`Iterator::reduce()`](https://doc.rust-lang.org/1.72.1/std/iter/trait.Iterator.html#method.reduce)
will use the first element
of the iterator as the accumulator, so for example if you have an iterator of
`u32`, `reduce` takes the first `u32` as the initial value and lets you do
whatever operations you wish until it collapses every `u32` value into a
single one. By contrast `fold` lets you take an iterator or anything and fold
it into the type you specify as the first argument. It is nice to have these two
separated.


[`char::is_alphanumeric()`](http://doc.rust-lang.org/1.72.1/std/primitive.char.html#method.is_alphanumeric)
and its related methods are helpful functions for dealing with ASCII characters
but not byte values directly. Thanks to [Miccah](https://github.com/mcastorina)
for pointing this one out.


### Upcoming Work

Next week I would like to buckle down and sink my teeth into encrypted file
systems and their trade offs. I have taken a look at the [ORI
Filesystem](http://ori.scs.stanford.edu/),
[Tahoe-LAFS](https://www.tahoe-lafs.org/trac/tahoe-lafs), and even
[Age](https://age-encryption.org/) (not a file system).


* Get a FUSE mounted to my Macbook 
* Make a VirtualFS abstraction over the directly file system (what design
  choices to make?)
* Design a multiparty key exchange for a shared folder. Perhaps a reader keyring
  and writer keyring.
* Decide to what degree I care about authenticated and trusted key exchange (might
  have to overlook this for the initial version).
* Determine the behavior for chunking and encrypted file data.
* How much, and what, metadata is to the sync server?

