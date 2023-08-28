---
title: "🌲 Rust"
date: 2021-11-04T01:09:36.217999935Z
updated: 2023-07-28T15:25:53.889935Z
weight: 1
extra:
  note_type: 🌲
---

> Rust is a systems programming language which provides memory safety, static types, and concurrency

[GitHub - alexpusch/rust-magic-function-params: Example for Axum style magic function parameter passing](https://github.com/alexpusch/rust-magic-function-params)

[Introductions - Dependency Injection like Bevy Engine from Scratch](https://promethia-27.github.io/dependency_injection_like_bevy_from_scratch/introductions.html)

[Introduction - Easy Rust](https://dhghomon.github.io/easy_rust/Chapter_1.html)

# Rust Dev Log

[Fri, Dec 2 '22](javascript:;) Rust can return a pointer to something which implements a trait: referred to with the type `Box<dyn MyTrait>` . The rust compiler needs to know the size of each function's return type during compilation. Since a data type which implements a Trait can have any size, we need a fixed size. That's where `Box` comes in. Box is a pointer to something allocated on the heap, and pointers have known sizes.

[Fri, Dec 2 '22](javascript:;) I learned about the differences between Rust Closures including the three `Fn` traits (`Fn`, `FnMut`, and `FnOnce`)  [https://rustyyato.github.io/rust/syntactic/sugar/2019/01/17/Closures-Magic-Functions.html](https://rustyyato.github.io/rust/syntactic/sugar/2019/01/17/Closures-Magic-Functions.html)

[Thu, Jan 27 '22](javascript:;) One issue I am noticing with the Rust implementation of GraphQL, Yew, Axum, and SQLx is that there are multiple struct data types which needs to be compatible with one another.
Yew needs to have representation of data so it can build views.
GraphQL needs to have a representation of data to query and respond
SQLx needs to have a representation of data to update and fetch database records.
There should be a way to keep all of the data in sync.

[Thu, Jan 27 '22](javascript:;) I went to the Rust NYC meetup on Tuesday and heard two talks. The first talk was by Jesse Hallet. He was one of the members of the Rust NYC community and ended up giving a presentation about Rust and GraphQL.
He inspired me to use GraphQL as my data query layer for the plant project. It would be a good exercise to integrate with Axum.

---

[Wed, Dec 1 '21](javascript:;)I attended the November RustNYC meetup. The speaker was [🌲 Rust](@/garden/programming-languages/rust.md) (Chinedu Nwafili) and he gave an excellent talk about Rust and Swift interoperability using static binaries and shared memory. Effectively Rust and Swift can communicate by
1. Compiling to the same taget
2. Linking Rust binary in a Swift project
3. Creating an "C" FFI in Rust and representing internal memory structures in a C-like manner (contiguously)
4. Create a "bridge" from Swift to another language and mapping types back to Swift
This allows for embedding a Rust core into another application (even a Mac application)

---

[Mon, Nov 22 '21](javascript:;) I learned about how bevy

---

[Thu, Nov 18 '21](javascript:;) Accessing DOM objects via Rust is extremely cumbersome, you have to import `web_sys` as well as `wasm_bindgen` and then perform a runtime cast from an known JS value to a Rust value. Once the cast has occurred it's extremely hard to get `rust-analyzer` type hinting information.

[Thu, Nov 18 '21](javascript:;) I was able to successfully integrate a global store with Yew using [yewdux](https://github.com/intendednull/yewdux), it proved to be rather difficult, but eventually things came together. What I learned...

It does not seem easy to "filter" or "pick" the pieces of state you want to subscribe to
Your root component should not wrap itself with the store because it will re-render every time
Any component that wraps itself in `WithDispatch` and takes `type Properties = DispatchProps<ReducerStore<MyStoreStruct>>;`  will have access to two pieces of data.The first is the global store struct `ctx.props().store()...;` and the second is the dispatch struct which allows for: creating generic callbacks, creating callbacks which mutate the store, and sending  `Msg`  to the `ReducerStore` .

---

[Wed, Nov 17 '21](javascript:;) If an Axum extractor rejects the request, the entire request will be rejected. If you wish to make an extractor optional, wrap it in an `Option<Extractor>` .

Likewise, if you want to know why the extractor failed, wrap it in `Result<Extractor, ExtractorRejection>`  and you will get typed information for the rejection reason.

If you wish to customize the extractor error, you can implement your own extractor, capture the rejection reason, and return your own error. An example can be found here: [https://github.com/tokio-rs/axum/blob/main/examples/customize-extractor-error/src/main.rs](https://github.com/tokio-rs/axum/blob/main/examples/customize-extractor-error/src/main.rs) This would allow you to set a custom status code on rejection

Finally if you need to access the "real" inner error of a failed extractor (for debugging purposes) you can do so like this: [https://docs.rs/axum/0.3.4/axum/extract/index.html#accessing-inner-errors](https://docs.rs/axum/0.3.4/axum/extract/index.html#accessing-inner-errors)  Reference for all of the above: [https://docs.rs/axum/0.3.4/axum/extract/index.html#accessing-inner-errors](https://docs.rs/axum/0.3.4/axum/extract/index.html#accessing-inner-errors)

[Wed, Nov 17 '21](javascript:;) Axum extractors always run in the oder of parameters to the handler function, that is to say **extractors are applied from left to right.**

[Wed, Nov 17 '21](javascript:;) Axum extractors might mutate the request, when using extractors take note of the order in which they are called. E.g. `HeaderMap` makes the request headers in-accessible to other extractors after it - **use it last**.

[Wed, Nov 17 '21](javascript:;) Serde allows for backend/frontend type sharing and type serialization. There is a good example of fullstack serde usage here. This can be used for frontend-backend-database communication. [https://github.com/zupzup/rust-fullstack-example/blob/main/common/src/lib.rs](https://github.com/zupzup/rust-fullstack-example/blob/main/common/src/lib.rs)

---

[Tue, Nov 16 '21](javascript:;) Read about `cargo-make` which is a general purpose make tool for rust projects and can substitute for npm scripts

[Tue, Nov 16 '21](javascript:;) Adding dependencies to projects in a workspace will resolve to the same version. This ensures that all crates use the same version of a dependency

[Tue, Nov 16 '21](javascript:;) I am using [cargo workspaces](https://doc.rust-lang.org/book/ch14-03-cargo-workspaces.html) to manage frontend and backend crates. I found some examples of full-stack Rust development over here  [🌲 Rust](@/garden/programming-languages/rust.md#rust-fullstack-development) [🌲 Rust](@/garden/programming-languages/rust.md) [🌲 Rust](@/garden/programming-languages/rust.md)

---

[Mon, Nov 15 '21](javascript:;) Using Chrono you can take the difference between two `DateTime<T>` values by calling [`Datetime::signed_duration_since`](https://docs.rs/chrono/0.4.19/chrono/struct.DateTime.html#method.signed_duration_since)

---

# Rust by Example  (Cheatsheet)

What a learn goes here 👉️ [🌲 Rust](@/garden/programming-languages/rust.md#rust-dev-log)

[Introduction - Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/)

+ ### Chapter 1 - Formatting

   > `println!` is a macro which prints to the "console", in this case STDOUT `eprintln!`  is a macro for printing errors and progress, in this case STDERR `format!` is a macro that writes formatted text to a `String` type

   > Formatting is done with`{}` bracket substitution syntax `println!("{0} this is {1}, {1}, this is {0}, "Alice", "Bob")`

   > Use `{:#?}` for pretty printing with `trait Debug`

```rust
// Subsititions can be named
println!("{subject} {verb} {object}",
			object="the lazy dog",
			subject="the quick brown fox",
			verb="jumps over");
```

```rust
// You can right-align text with a specified width. This will output
// "     1". 5 white spaces and a "1".
println!("{number:>width$}", number=1, width=6);
```

   > `std::fmt` has several different traits which handle displaying text `fmt::Debug` uses `{:?}` `fmt::Display` uses `{}` When a type implements `Display` it also must implement the `ToString` trait which defines how to covert itself to a string

   > `trait Debug` can be automatically derived for any type `trait Display` must be implemented manually

   > the `?` operator exists to work with functions which return `Result` types. Since a result is either of type `Ok` or `Err` calling a function with `?` at the end is equivalent to `return Err(From::from(err))` or `return ok`  where `ok` is the inner value of `Ok(ok)` This reduces nested `match` statements significantly!

+ ### Chapter 2 - Primitives
   - > signed integers: `i8`, `i16`, `i32`, `i64`, `i128` and `isize` (pointer size)
   - > unsigned integers: `u8`, `u16`, `u32`, `u64`, `u128` and `usize` (pointer size)
   - > floating point: `f32`, `f64`
   - > `char` Unicode scalar values like `'a'`, `'α'` and `'∞'` (4 bytes each)
   - > `bool` either `true` or `false`
   - > and the unit type `()`, whose only possible value is an empty tuple: `()`
   - > arrays like `[1, 2, 3]`
   - > tuples like `(1, true)`

   > A `Tuple` is a structure which can have multiple elements of different types. `(i32, f64, String)` A `Tuple` can be accessed by index `let t = (1, 2, 3)` `t.0; t.1; t.2;`

   > An `Array`  is a collection of objects of the same type `T` . Elements are stored contiguously in memory. At compile time the type definition of an array is `[T; length]` it's size must be known

   > A `Slice` is a borrow on a piece of an array, like a "window". A slice consists of two parts (each being a **word size** (or `usize` which depends on the processor architecture)

A pointer to the data

The length of the slice

   > `let xs : [i32, 3] = [1, 2, 3]; // An array`

   > `&xs; // slice on the whole array`

   > `&xs[0..1]; // smaller slice on the array`

+ ### Chapter 3 - Custom Types

   > Rust has a few ways to create custom data types `struct` define a structure `enum` define an enumeration
There is also `const` and `static` for creating constants

   > There are three kinds of structs that can be created in Rust

Tuple `struct` which is effectively a named Tuple type
C-Structs which have fields
Unit structs which are fieldless. These are useful for generics

   > An `Enum` is a type which represents multiple variants, where an enum instance can only ever be one of the variants.
It's variants are different `struct` types
The variants can be

```rust
enum WebEvent {
    // An `enum` may either be `unit-like`,
    PageLoad,
    PageUnload,
    // like tuple structs,
    KeyPress(char),
    Paste(String),
    // or c-like structures.
    Click { x: i64, y: i64 },
}
```

   > It is also possible to perform **Type aliasing** with Enums to shorten the name to reference their variants `type Ops = VeryLongVeboseEnumOfThings` We can shorten Enum references with the `use` keyword `use crateWebEvent{PageLoad, PageUnloaded};` `use crateWebEvent*;`

   > We can use the `match` keyword on an `Enum` type to handle each variant

```rust
match event {
	PageLoad => println!(...),
	PageUnload => println!(...),
}
```

   > An enum can also "hold" a value, similar to how C-Structs hold values. They can either be dynamic (set later) or static (fixed at definition)

```rust
// enum with explicit discriminator
enum Color {
    Red = 0xff0000,
    Green = 0x00ff00,
    Blue = 0x0000ff,
}
```

   > A rust `String` is a heap-allocated buffer (always UTF-8) that has three components  `ptr` which is a pointer to the buffer in memory `len` which is the current length of the buffer in bytes `capacity` which is the current capacity of the buffer in bytes

The length will always be less than the capacity
A `String` has the property of being cheaply converted into a `&str`, most functions will take `&str` unless they need something special from `String` .

   > Constants come in two forms `const` which is an unchangeable value (added to the stack frame) `static` which lives for the lifetime of the program and is readonly

Constant `const THRESHOLD: i32 =10;`  Static `let s: &'static str = "hello world";`

+ ### Chapter 4 - Variable Bindings

   > Variables are "bound" using the `let` keyword `let an_integer = 35u32;`  All variables are **immutable** by default `an_integer = 11u32; // Error!`

   > To mutate a variable, it must be declared as mutable with the `mut`  keyword `let mut an_integer = 35u32;` `an_integer = 191u32; // Ok!`  Variables are bound to a particular **scope** which is equal to their location within brackets `{}`  Variables can be **shadowed** in another scope by binding the same variable name again. Once the scope exists, the shadowed variable will be released and the outer variable will be valid again.

Taking a mutable variable and shadowing it in another scope will **freeze** the variable (make it immutable again).

+ ### Chapter 5 - Types

   > There are several ways to change type of either primitive types or user defined typed

Casting between primitive types
Specifying the desired type of literals
Using type inference
Aliasing types

   > There is no **implicit type coercion** in Rust
However there is **explicit type coercion** using the `as` keyword `let integer = decimal as u8;`

   > When casting any value to an **unsigned** type, if the value does not fit, then `T::Max +1` will be added or subtracted from the value until it does

```rust
// when casting any value to an unsigned type, T,
    // T::MAX + 1 is added or subtracted until the value
    // fits into the new type

    // 1000 already fits in a u16
    println!("1000 as a u16 is: {}", 1000 as u16);

    // 1000 - 256 - 256 - 256 = 232
    // Under the hood, the first 8 least significant bits (LSB) are kept,
    // while the rest towards the most significant bit (MSB) get truncated.
    println!("1000 as a u8 is : {}", 1000 as u8);
    // -1 + 256 = 255
    println!("  -1 as a u8 is : {}", (-1i8) as u8);

    // For positive numbers, this is the same as the modulus
    println!("1000 mod 256 is : {}", 1000 % 256);

    // When casting to a signed type, the (bitwise) result is the same as
    // first casting to the corresponding unsigned type. If the most significant
    // bit of that value is 1, then the value is negative.

    // Unless it already fits, of course.
    println!(" 128 as a i16 is: {}", 128 as i16);
    // 128 as u8 -> 128, whose two's complement in eight bits is:
    println!(" 128 as a i8 is : {}", 128 as i8);

    // repeating the example above
    // 1000 as u8 -> 232
    println!("1000 as a u8 is : {}", 1000 as u8);
    // and the two's complement of 232 is -24
    println!(" 232 as a i8 is : {}", 232 as i8);
    
    // Since Rust 1.45, the `as` keyword performs a *saturating cast* 
    // when casting from float to int. If the floating point value exceeds 
    // the upper bound or is less than the lower bound, the returned value 
    // will be equal to the bound crossed.
    
    // 300.0 is 255
    println!("300.0 is {}", 300.0_f32 as u8);
    // -100.0 as u8 is 0
    println!("-100.0 as u8 is {}", -100.0_f32 as u8);
    // nan as u8 is 0
    println!("nan as u8 is {}", f32::NAN as u8);
```

   > The type inference engine is smart enough to know
What the type of the variable is when initialized
And how it is used later

See example below

```rust
fn main() {
    // Because of the annotation, the compiler knows that `elem` has type u8.
    let elem = 5u8;

    // Create an empty vector (a growable array).
    let mut vec = Vec::new();
    // At this point the compiler doesn't know the exact type of `vec`, it
    // just knows that it's a vector of something (`Vec<_>`).

    // Insert `elem` in the vector.
    vec.push(elem);
    // Aha! Now the compiler knows that `vec` is a vector of `u8`s (`Vec<u8>`)
    // TODO ^ Try commenting out the `vec.push(elem)` line

    println!("{:?}", vec);
}
```

   > Type aliasing is done via the `type` keyword `type Nanosecond = u64; // Now Nanosecond refers to u64`  This is mostly used to shorten type references, it does nothing to affect the underlying types.

+ ### Chapter 6 - Conversion

   > If you can convert `From` type `A` → `B` then you should be able to convert `B` → `Into` `A` The `From` trait defines how a type can construct itself from another type `B` The`Into` trait never need be defined if you've already defined `From` on your type  `trait From` is the reciprocal of `trait Into`

```rust
use std::convert::From;

#[derive(Debug)]
struct Number {
    value: i32,
}

impl From<i32> for Number {
    fn from(item: i32) -> Self {
        Number { value: item }
    }
}

fn main() {
    let num = Number::from(30);
    println!("My number is {:?}", num);

    // We also get Into for free
    // ONLY if we explicityly define the type on the left
    let int = 5;
    let num: Number = int.into();

    println!(
        "My nubmer is now {:?} beause we cast {} into a Number",
        num, int
    )
}
```

   > Rust also has generic traits for **attempting a conversion**, these traits return the `Result` type to represent the possibility of failure.  `trait TryFrom`  `trait TryInto`

```rust
use std::convert::TryFrom;
use std::convert::TryInto;

#[derive(Debug, PartialEq)]
struct EvenNumber(i32);

impl TryFrom<i32> for EvenNumber {
    type Error = ();

    fn try_from(value: i32) -> Result<Self, Self::Error> {
        if value % 2 == 0 {
            Ok(EvenNumber(value))
        } else {
            Err(())
        }
    }
}

fn main() {
    // TryFrom

    assert_eq!(EvenNumber::try_from(8), Ok(EvenNumber(8)));
    assert_eq!(EvenNumber::try_from(5), Err(()));

    // TryInto

    let result: Result<EvenNumber, ()> = 8i32.try_into();
    assert_eq!(result, Ok(EvenNumber(8)));
    let result: Result<EvenNumber, ()> = 5i32.try_into();
    assert_eq!(result, Err(()));
}
```

   > The best way to convert a type to a `String` is to implement the `Display` trait which gives printing via `println!("{}", val):` as well as `val.to_string()` .

By implementing `trait Display` the other trait `trait ToString` is also implemented.

   > Parsing a string into a a number can be one in one of two ways

Calling the `parse` function on a type and annotating the type for type inference `let parsed_annotated: i32 = "5".parse.unwrap();`  Or alternatively calling using the "turbofish" syntax  `let parsed_turbo = "5".parse::<i32>().unwrap`();

+ ### Chapter 7 - Expressions

   > Expressions are statements that are not variable bindings

You can bind a variable to an entire block! So long as that block's last statement is an expression without a semicolon
(this means it will return the result of the last expression)

Adding a semicolon onto the last expression will return the unit type `()`

```rust
fn main() {
    let x = 5u32;

    let y = {
        let x_squared = x * x;
        let x_cube = x_squared * x;

        // This expression will be assigned to `y`
        x_cube + x_squared + x
    };

    let z = {
        // The semicolon suppresses this expression and `()` is assigned to `z`
        2 * x;
    };

    println!("x is {:?}", x);
    println!("y is {:?}", y);
    println!("z is {:?}", z);
}
```

+ ### Chapter 8 - Control Flow

   > All branches of `if`/`else` must return the same type

   > `loop` keyword starts an infinite loop. `break` is used to exit. `continue` is used to skip to the next iteration

```rust
// Rust allows for breaking from nested loops easily using annotations
// 'loop_name
// This avoids setting flags to manage which loop has been broken

fn main() {
    'outer: loop {
        println!("Entered the outer loop");

        'inner: loop {
            println!("Entered the inner loop");

            // This would break only the inner loop
            //break;

            // This breaks the outer loop
            break 'outer;
        }

        println!("This point will never be reached");
    }

    println!("Exited the outer loop");
}
```

```rust
// `break` can also return a value
// This is used to retry and operation until it succeeds then return the output

fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    assert_eq!(result, 20);
}
```

```rust
// `while` loops exist and work conventionally

fn main() {
    // A counter variable
    let mut n = 1;

    // Loop while `n` is less than 101
    while n < 101 {
        if n % 15 == 0 {
            println!("fizzbuzz");
        } else if n % 3 == 0 {
            println!("fizz");
        } else if n % 5 == 0 {
            println!("buzz");
        } else {
            println!("{}", n);
        }

        // Increment counter
        n += 1;
    }
}
```

   > Use the `for ... in {iterator}` syntax to work with any type that implements the `Iterator` trait in Rust  `for n in 1..101 {}`

   > Types which implement `Iterator` have three different ways to convert their collections into an `iterable`  `iter`  will borrow each element in the iterator, thus leaving it untouched. This allows us to use the original collection after iterating over it `for n in names.iter() { // n is &str }`

   > \---

   > `into_iter` copies the values of each element into the iteration, thus **moving** the entire collection. This means the original collection can no longer be used after iteration. `for n in names.iter() { // n is str }`

   > \---

   > i`ter_mut` will mutably borrow each element in the iterator, allowing for in-place mutation of the collection w**ithout moving** the entire collection into the iteration. `for n in names.iter() {  // n is &mut str. *name = "new name" }`

   > `match` provides pattern matching
Every possible variant of the value must be handled in the match statement `_ => expression,` is used to handle "all other cases"  `1 | 2 | 3 | 4 => expression`  can handle `OR` logic between cases  `13..=19 => expression,` can handle a range of cases

```rust
// Match can be used to destructure a tuple
fn main() {
    let triple = (0, -2, 3);
    match triple {
        // Destructure the second and third elements
        (0, y, z) => println!("First is `0`, `y` is {:?}, and `z` is {:?}", y, z),
        (1, ..)  => println!("First is `1` and the rest doesn't matter"),
        // `..` can be used to ignore the rest of the tuple
        _      => println!("It doesn't matter what they are"),
    }
}
```

```rust
// Match can be used to destructure an enum
enum Color {
	Red,
	Green,
	Blue,
	RGB(u32, u32, u32);
}

fn main () {
	let color = Color::RGB(122, 17, 40);
	match color {
    	Color::Red   => println!("The color is Red!"),
		Color::Blue  => println!("The color is Blue!"),
		Color::Green => println!("The color is Green!"),
		Color::RGB(r, g, b) => println!("Red: {}, green: {}, and blue: {}!", r, g, b),
		// All variants have been examined
	}
}
```

```rust
// Match can be used with pointers
// 		-> * 				deREFRENCES
// 		-> & 				destructures
// 		-> ref 			destructures
// 		-> ref mut 		destructures

fn main () {
	match reference {
		&my_val => println!("Our value from destructuring {:?}", my_val),
	}

	match *reference {
		my_val => println("Dereferenced our value instead {:?}", my_val),
	}
	
	let a_value = 5;
	match a_value {
		ref new_ref => println!("Now we have a reference to our value {:?}", new_ref),
	}

	let mut_value = 10;
	match mut_value {
		ref mut m => {
			*m = 99;
			println!("We mutated mut_value to {:?}", m);
		},
	}
}
```

```rust
// match can be used to destructure structures
fn main() {
    struct Foo {
        x: (u32, u32),
        y: u32,
    }

    let foo = Foo { x: (1, 2), y: 3 };

    match foo {
        Foo { x: (1, b), y } => println!("First of x is 1, b = {},  y = {} ", b, y),

        // rename variables
        Foo { y: 2, x: i } => println!("y is 2, i = {:?}", i),

        // ignore remaining variables
        Foo { y, .. } => println!("y = {}, we don't care about x", y),
    }
}
```

   > `match` also provides the ability to filter by value, these are called **match guards**.
However the compiler cannot check that every possible arm has been satisfied, so you must use `_ => println!("fallthrough arm"),`

```rust
// Use match guards to filter the arm
fn main() {
    let pair = (2, -2);
    match pair {
        (x, y) if x == y => println!("These are twins"),
        // ^^^^^^^^^^^^^ `if condition` part is a guard
        (x, y) if x + y == 0 => println!("Antimatter, kaboom!"),
        (x, _) if x % 2 == 1 => println!("The first one is odd"),
        _ => println!("No correlation..."),
    }
}
```

      > `match` allows for binding the result of a match to a variable using the `@` sigil.
This allows us to access the specific value by name

```rust
fn age() -> u32 {
	15
}
fn some_number() -> Option<u32> {
    Some(42)
}
fn main() {
	match age() {
		0 => println!("no birthdays yet"),
		n @ 1..=12 => println!("Just a child"),
		n @ 13..19 => println!("Teenage years"),
		n @ 20..60 => println!("Adulting"),
		n => println!("An old person"),
	}
	match some_number() {
		Some(n @ 42) => println!("Got a match to Some, if its inner value is 42 (bound to n)"),
		Some(n) => println!("Got a match to Some for all other values of its inner value (bound to n)"),
		_ => println!("Everything else"),
	}
}
```

      > `if`/`let` syntax is used when `match` would be too cumbersomez

```rust
fn main() {
	let emoticon: Option<i32> = None;
    let i_like_letters = false;
	
	// success and bind to `i`
    if let Some(i) = emoticon {
        println!("Matched {:?}!", i);
	// use else if for alternative arm
    } else if i_like_letters {
        println!("Didn't match a number. Let's go with a letter!");
    } else {
	// default branch	
        println!("I don't like letters. Let's go with an emoticon :)!");
    }
}
```

```rust
// if/let also works with enums and allows for destructuring as well as binding

enum Foo {
    Bar,
    Baz,
    Qux(u32)
}
fn main() {
    // Create example variables
    let a = Foo::Bar;
    let b = Foo::Baz;
    let c = Foo::Qux(100);
    
    if let Foo::Bar = a {
        println!("a is foobar");
    }
    if let Foo::Qux(value) = c {
        println!("c is {}", value);
    }
    if let Foo::Qux(value @ 100) = c {
        println!("c is one hundred");
    }
}
```

   > Iterating over `Option` types is difficult because it requires `while` then `match` then arm and more indentation, then `break` .
Instead Rust gives us `while let` which handles pattern matching

```rust
fn main() {
    // Make `optional` of type `Option<i32>`
    let mut optional = Some(0);

    // This reads: "while `let` destructures `optional` into
    // `Some(i)`, evaluate the block (`{}`). Else `break`.
    while let Some(i) = optional {
        if i > 9 {
            println!("Greater than 9, quit!");
            optional = None;
        } else {
            println!("`i` is `{:?}`. Try again.", i);
            optional = Some(i + 1);
        }
        // ^ Less rightward drift and doesn't require
        // explicitly handling the failing case.
    }
    // ^ `if let` had additional optional `else`/`else if`
    // clauses. `while let` does not have these.
}
```

+ ### Chapter 9 - Functions

   > There are two types of functions defined on types, **associated functions** and **methods**

   ### Associated Functions

   > An **associated function** **is defined on a type using `impl`**

```rust
struct Point {
	x: f64;
	y: f64;
}
impl Point {
	// This is an associated function because it does not take `self` `&self` or `&mut self`
	// The function is associated with the type, not instance of the type
	fn origin() -> {
		
	}
}
```

   ### Methods

   > A **method is defined on a type and takes a reference to `self`**  using `impl`

```rust
sturct Rectangle {
	p1: Point,
	p2: Point,
}

impl Rectangle {
    // This is a method
    // `&self` is sugar for `self: &Self`, where `Self` is the type of the
    // caller object. In this case `Self` = `Rectangle`
	fn area(&self) -> f64 {
		...
	}
}
```

   ### Closures

   > A **closure** is an anonymous function which does not take a time and does not require explicit type annotation. Its key feature is that it will "capture" the its surrounding variables.

```rust
// Closures are anonymous, here we are binding them to references
// Annotation is identical to function annotation but is optional
// as are the `{}` wrapping the body. These nameless functions
// are assigned to appropriately named variables.
let closure_annotated = |i: i32| -> i32 { i + 1 };
let closure_inferred  = |i     |          i + 1  ;
```

   > Closures can capture variables in three different ways

   1. > `&T` by reference
   2. > `&mut T` by mutable reference
   3. > `T` by value

   > Closures start by capturing **by reference** then try other methods

   > All three types of capturing are demonstrated in the example below, which is taken directly from the Rust By Example book

```rust
fn main() {
    use std::mem;
    
    let color = String::from("green");

    // A closure to print `color` which immediately borrows (`&`) `color` and
    // stores the borrow and closure in the `print` variable. It will remain
    // borrowed until `print` is used the last time. 
    //
    // `println!` only requires arguments by immutable reference so it doesn't
    // impose anything more restrictive.
    let print = || println!("`color`: {}", color);

    // Call the closure using the borrow.
    print();

    // `color` can be borrowed immutably again, because the closure only holds
    // an immutable reference to `color`. 
    let _reborrow = &color;
    print();

    // A move or reborrow is allowed after the final use of `print`
    let _color_moved = color;


    let mut count = 0;
    // A closure to increment `count` could take either `&mut count` or `count`
    // but `&mut count` is less restrictive so it takes that. Immediately
    // borrows `count`.
    //
    // A `mut` is required on `inc` because a `&mut` is stored inside. Thus,
    // calling the closure mutates the closure which requires a `mut`.
    let mut inc = || {
        count += 1;
        println!("`count`: {}", count);
    };

    // Call the closure using a mutable borrow.
    inc();

    // The closure still mutably borrows `count` because it is called later.
    // An attempt to reborrow will lead to an error.
    // let _reborrow = &count; 
    // ^ TODO: try uncommenting this line.
    inc();

    // The closure no longer needs to borrow `&mut count`. Therefore, it is
    // possible to reborrow without an error
    let _count_reborrowed = &mut count; 

    
    // A non-copy type.
    let movable = Box::new(3);

    // `mem::drop` requires `T` so this must take by value. A copy type
    // would copy into the closure leaving the original untouched.
    // A non-copy must move and so `movable` immediately moves into
    // the closure.
    let consume = || {
        println!("`movable`: {:?}", movable);
        mem::drop(movable);
    };

    // `consume` consumes the variable so this can only be called once.
    consume();
    // consume();
    // ^ TODO: Try uncommenting this line.


    //
    //
    // `Vec` has non-copy semantics.
    let haystack = vec![1, 2, 3];

    let contains = move |needle| haystack.contains(needle);

    println!("{}", contains(&1));
    println!("{}", contains(&4));

    // println!("There're {} elements in vec", haystack.len());
    // ^ Uncommenting above line will result in compile-time error
    // because borrow checker doesn't allow re-using variable after it
    // has been moved.
    
    // Removing `move` from closure's signature will cause closure
    // to borrow _haystack_ variable immutably, hence _haystack_ is still
    // available and uncommenting above line will not cause an error.

}
```

   ### Functions taking closures as parameters

   > There are three **function traits** which we can use to describe the types of closures we can provide as arguments to other functions

   1. > `Fn` - The closure captures by reference `&T`
   2. > `FnMut` - The closure captures by mutable reference `&mut T`
   3. > `FnOnce` - The closure captures by value `T`

   > If a closure is annotated as `FnOnce` that means it **might** capture by `&T` , `&mut T`, or `T`. It will be up to the compiler to determine how the closure captures variables.
The following example uses `FnOnce`

```rust
// A function which takes a closure as an argument and calls it.
// <F> denotes that F is a "Generic type parameter"
fn apply<F>(f: F) where
    // The closure takes no input and returns nothing.
    F: FnOnce() {
    // ^ TODO: Try changing this to `Fn` or `FnMut`.

    f();
}

fn main() {
    use std::mem;

    let greeting = "hello";
    // A non-copy type.
    // `to_owned` creates owned data from borrowed one
    let mut farewell = "goodbye".to_owned();

    // Capture 2 variables: `greeting` by reference and
    // `farewell` by value.
    let diary = || {
        // `greeting` is by reference: requires `Fn`.
        println!("I said {}.", greeting);

        // Mutation forces `farewell` to be captured by
        // mutable reference. Now requires `FnMut`.
        farewell.push_str("!!!");
        println!("Then I screamed {}.", farewell);
        println!("Now I can sleep. zzzzz");

        // Manually calling drop forces `farewell` to
        // be captured by value. Now requires `FnOnce`.
        mem::drop(farewell);
    };

    // Call the function which applies the closure.
    apply(diary);
}
```

   > Notice that providing a closure as an argument **requires the use of generics**. Since the compiler determines on the fly which kind of closure we will end up getting (`Fn` , `FnMut` , or `FnOnce` ) our function which takes the closure must also be generic.
We say that our function takes a generic type `F`. However that type needs to be bounded otherwise it is too broad:

```rust
fn apply<F>(a_closure: F)
    where
    F: FnOnce() {
    a_closure();
}
```

   > As an additional note, the `Fn`, `FnMut`, and `FnOnce` `traits` dictate how a closure captures variables from the enclosing scope.

You can pass a defined function that satisfies the `Fn`, `FnMut`, or `FnOnce` traits

```rust
fn function () {
	println!("I am a function");
}

fn main() {
    let closure = || println!("I am a closure");
	
	pass_fn(closure);
	pass_fn(my_function);	
}
```

   ### Functions returning closures

   > Because a closure is an anonymous type, we have to say that a function which creates and returns a closure, returns a **trait type** (indicated by `impl Trait` )

   > For example:

```rust
fn create_fn() -> impl Fn() {
    let text = "Fn".to_owned();

    move || println!("This is a: {}", text)
}

fn create_fnmut() -> impl FnMut() {
    let text = "FnMut".to_owned();

    move || println!("This is a: {}", text)
}

fn create_fnonce() -> impl FnOnce() {
    let text = "FnOnce".to_owned();

    move || println!("This is a: {}", text)
}

fn main() {
    let fn_plain = create_fn();
    let mut fn_mut = create_fnmut();
    let fn_once = create_fnonce();

    fn_plain();
    fn_mut();
    fn_once();
}
```

+ ### Chapter 10 - Modules

   ### Visibility

   > By default all items inside a module are **private**

   > You can make an item public by using the `pub` keyword

```rust
mod my_mod {
	fn private_function() { ... }

	pub fn public_fuction() { ... }
}
```

   > Modules can be nested, private, and scoped to themselves (`pub(self)` ), their parent (`pub(super)` ), or another module (`pub(in crate::path::to::mod` )

```rust
mod my_mod {
	fn private_function() { ... }

	pub mod nested_mod {
		fn private_function() { ... }

		pub (in crate::my_mod) fn public_function_in_my_mod() { ... }

		pub(self) fn only_visible_in_nested_mod() { ... }

		pub(super) fn only_visible_in_my_mod() { ... }
	}

	pub(crate) fn public_function_in_crate() {
		println!("my_mod::public_function_in_crate");
	}

	mod private_mod {
		pub(crate) fn cannot_be_called_because_parent_is_private() { ... }
   }
}
```

   ### Struct visibility

   > Structs have an additional layer of visibility control for their fields. Making a struct public `pub struct MyStruct` will not make its fields public by default.

   > **All struct fields are private by default.**

   > The purpose of keeping fields private is for encapsulation when accessed from outside the module in which it is defined.

```rust
mod struct_mod {
	pub struct OpenBox<T> {
		pub contents: T,
	}

	pub struct ClosedBox<T> {
		contents: T, // This is private
	}

	impl<T> ClosedBox<T> {
		pub fn new(contents: T) -> ClosedBox<T> {
			ClosedBox {
				conents: contents,
			}
		}
	}
}

fn main() {
	// You can construct a type that's private using a public constructor. 
	// This means that the user of this module has to use this public constructor
	// in order to interact with the struct.
	let _closed_box = my::ClosedBox::new("inside hidden information");
}
```

   ### The use declaration

   > The `use` declaration is how we import modules and their items

```rust
use crate::deeply::nested::{
	first_function,
	second_function,
	Rectangle, // struct
	ATraitType,	
}
```

   > When using `use` the `crate` scope is the outermost scope.

```rust
use crate::cool::function as root_function;
root_function()
```

   ### Using the file hierarchy

```rust
/* main.rs */

// Declaring a module without an attached block will have the following behavior
// 1. Relative to the current file, look for a file called `my.rs`
// 2. Relative to teh current file, look for a directory called `my` with a file caleld `mod.rs` inside (`my/mod.rs`)

mod my;


/* my/mod.rs */

pub mod nested_in_my_mod;

mod inaccessible;

pub fn pub_fun() { ... }

pub fn wrapper() { private_function(); }

fn private_function() { ... }

/* my/nested.rs */

pub fn nested_function() { ... }

/* my/inaccessible.rs */

pub fn pub_function_in_private_mod() { ... }
```

+ ### Chapter 11 - Crates

   > A crate is a compilation unit for the rust compiler. When we run `rustc my_rust_file.rs`  then `my_rust_file.rs` is treated as if it were a crate.
If our file has any `mod` declarations inside then the module code is injected where we declared `mod my_mod;` This means that modules are not compiled individually, but injected into the intput to the compiler - this occurs before the compilation stage.

   > A crate can be compiled as a binary or a library, by default all crates start out as binaries but can be changed by calling `--crate-type lib` to `rustc`

   ### Creating a Library

```rust
rustc --crate-type=lib edward.rs
ls lib/*
libedward.rlib
```

   ### Using a Library

```rust
fn main() {
	edward::my_function();
}
```

+ ### Chapter 12 - Cargo

   ### Creating crates with cargo

   > `cargo` is the official dependency manager for Rust. It allow for project setup, dependency management, as well as unit testing, and benchmarking.

```rust
cargo new foo # Creaes a binary by default src/main.rs

cargo new --lib foo # Creates a library src/lib.rs
```

   ### Describing our crate & dependencies

   > For a basic cargo project, we can create a `Cargo.toml` file which will describe our project and its dependencies.

```
[package]
name = "foo"
versiokn = "0.1.0"
authors = ["mark"]

[dependencies]

name = "verison"

# Specify version, git url, branch, or tag
name = { version = "version", git = "url", branch = "branch", tag = "tag", etc... }

# Specify a local dependency
name = { path = "../my_crate" }
```

   ### Running our crate

   > We can **build** or **run** our project using cargo as well

```
cargo run           # downloads dependencies -> builds crate -> executes crate

cargo build         # downloads dependencies -> builds crate
```

   ### Project structure

   > If we want to have multiple binaries then we can create a `bin` directory inside `src/.`

   > If we want cargo to execute a different binary we can do so with `cargo run --bin my_other_bin`

```
foo
├── Cargo.toml
└── src
    ├── main.rs
    └── bin
        └── my_other_bin.rs
```

   ### Unit tests & Integration tests

   > Unit tests are placed in the same file the module is defined - typically at the bottom

   > Integration tests are placed in their own top level `tests/` directory - where each file is an integration test.
The idea is that each integration test should call your library as if someone else was calling it.

```
# Run tests

cargo test


# Run tests that match a pattern

cargo test test_foo
```

   > ⚠️ Cargo may execute tests concurrently, make sure that one tests does not depend on another (case a race condition) ⚠️

   ### Build scripts

   > If your crate needs some pre-compile steps, it may be useful to define a build script.

   > Build scripts can do things like: code generation, non-rust native code, etc.

```
[package]
...
build = "build.rs"

# Cargo will look for a build.rs file in the project directory by default
```

+ ### Chapter 13 - Attributes

   > An attribute is metadata, it can be applied to a crate, module, or just a single item (function, etc.)
We can use attributes to do things like:
- conditionally compile code
- modify the crate name, version, type, etc.
- disable linting
- link to external libraries
- mark a function as a unit test function
- mark a function as a benchmarking function

   ### Crate v.s. item attributes

   > Giving an attribute to an entire crate is done like so

   > `#![crate_attribute]` with a `!`

   > Giving a module or an item an attribute is done like so

   > `#[item_attribute]`  no `!`

   ### Setting an attribute

   > There are three ways to set an attribute

   > `#[attribute = "value"]`

   > `#[attribute(key = "value")`

   > `#[attribute(value)]`

   > The compiler will lint to tell us that we have dead code. Giving an item the `#[allow(...)]` attribute will allow us to disable this lint and allow dead code

   > `#[allow(dead_code)]`

   ### Setting configurations and checking them conditionally

   > We can configure some code to be compiled conditionally using the `#[cfg(...)]` attribute.

```rust
#[cfg(target_os = "linux")]
fn only_run_on_linux() [
}

#[cfg(not(target_os = "linux")]
fn not_on_linux() {
}

#[cfg(target_family = "unix")]
fn on_unix() {
}

// Cargo has the notion of a feature flag which we can setup like so
#[cfg(feature = "my_feature")]
fn compile_if_feature_is_set() {
}
```

   ### Custom conditions for `cfg`

   > If you want to set some custom configuration then you can pass `--cfg {custom_cfg}` to the rust compoiler `rustc`

```rust
#[cfg(custom_cfg)]
fn conditionally_compile() {
}

// rustc --cfg custom_cfg custom.rs && ./custom
```

+ ### Chapter 14 - Generics

   ### Overview

   > Generics are powerful tools that allow you to express data and functions which may take multiple different types of arguments.

   > A **concrete type** is one in which not generic (it only has one possible type value)

   > A **generic type** is a type which can represent many different types. A generic is always defined within angle brackets `<T>` . If we impose **type constraints** on a generic type `T` it will also restrict the possible concrete types we can provide.

   ### Generics in structs and functions

```rust
// Structs can be generic

struct Single<T>(T);

struct Double<T,K> {
	name: T,
	phone: K,
}

// Functions can also be generic

fn generic_function<T>(_s: Single<T>) {}
// 					   ^ The function takes a generic type T
// 									   ^ We pass that generic type to Signle<T>


fn main() {
	// Explicitly say what type `T` is for generic_function.
 	generic_function::<i32>(Single(3));

	// Implicityly specify what type `T` is for generic_function
	generic_function(Signle("hey"));
}
```

   ### Generic Implementations

   > If we have a struct that is generic over some type `T` then we can have **specific (concrete) implementations** or we can have **generic implementations**. Here are some examples

```rust
struct GenericStruct<T> {
	generic_field: T,
}

impl GenericStruct<i32> {} // This is only an implementation for i32

impl<T> GenericStrcut<T> {} // placing <T> after impl makes this implementation generic for type `T`
```

   ### Generic Traits

```rust
// A Trait generic over the type T

trait DoubleDrop<T> {
	// In order to allow this trait to be generic
	// we take the generic type T as the type of an 
	// argument to double_drop, but we do nothing with it.
	fn double_drop(self, _: T);
}

// implement the trait DoubleDouble on generic type T for a generic type of U (a struct)

impl<T,U> DoubleDrop<T> for U {
	// Because this function takes ownership of both `self` and `_`
	// when the function returns, both values will be dropped.
	fn double_drop(self, _: T) {}
}

fn main() {
	let a = A;
	let b = B;
	
	a.double_drop(b);
}
```

   ### Bounds on generic types

   > When working with generics we often don't want to accept or implement something for every possible type (that's what `T` represents - any possible type).

   > Sometimes we need to put some bounds on what kinds of types we want to accept or implement for.

   > Rust has a brilliant way to do this, instead of manually writing all types we want to accept, we can bound a generic type `T` by a set of **traits** it must implement in order to be accepted.

```rust
// Define a function `printer` that takes a generic type `T` which must implement the trait `Display`

fn printer<T: Display>(t: T) {
	println!("{}", t); // Rust will make sure that whatever type we give as `T` will also be able to be used in this expression as it implemented the trait `Display`.
}

// Define a struct `S` which takes a single field of type `T` which must implement the trait `Display`

struct S<T: Display>(T);

let s = S(vec![1]); // Error Vec<T> does not implement `Display`
```

   ### Bounding with empty traits

   > We can use a trait which has no functionality to bound types. This is a useful way to force any type provided by the caller to at least conform to your API.

```rust
struct Turkey {};
struct Chicken {};
struct BlueJay {};
struct TRex {};

trait Red {};
trait Blue {};

impl Red for TRex {}
impl Blue for BlueJay {}

// These functions can only take types which implement our traits Red and Blue

fn red<T: Red>(_: &T)   -> &'static str { "red" }
fn blue<T: Blue>(_: &T) -> &'statuc str { "blue" }
```

   > Importantly this is how the standard library `std` handles the traits `Eq` and `Copy`

   > From `std::cmp::Eq`

   > *This trait can be used with `#[derive]`. When `derive`d, because `Eq` has no extra methods, it is only informing the compiler that this is an equivalence relation rather than a partial equivalence relation. Note that the `derive` strategy requires all fields are `Eq`, which isn’t always desired.*

```rust
enum BookFormat { Paperback, Hardback, Ebook }
struct Book {
	isbn: i32,
	format: BookFormat,
}

impl Eq for Book {}
```

   ### Multiple bounds

```rust
// Multiple bounds can be applied to a generic type by using the `+` operator

fn comapre_types<T: Debug + Display, U: Debug>(t: &T, u: &U) {
    println!("t: `{?}`", t);  // Since this has Display trait
    println!("u: `{:?}`", u); // Since this has Debug trait
}
```

   ### Where Clause

   > The `where` cause is helpful for adding complex bounds to a generic type, it can be used to visually simplify generic functions and implementations

```rust
impl <A: TraitB + TraitC, D: TraitE + TraitF> MyTrait<A, D> for YourType {}

// Expressing bounds with a `where` clause
impl <A, D> MyTrait<A, D> for YourType where
    A: TraitB + TraitC,
    D: TraitE + TraitF {
	
	fn first_requirement(a: &A, b: &b) -> bool { ... }
}
```

   > Some generic types **must be expressed with the `where` clause**.

   > For example, if we have a generic `impl` on the type `T` and we want a function to take an `Option<T>` (`Option` is already generic) then we need to use the `where` clause

```rust
// We want `Option<T>` to implement the `Debug` trait, not `T` necessarily
impl<T> PrinttInnerOption for T where Option<T>: Dbeug {
	fn print_in_option(self) {
		println!("{:?}", Some(self))
	}
}
```

   ### Associated Items

   > If we create a generic trait that takes three generic types `A` `B` and `C`, what if we want to say that type `C` expresses `A` and `B`.

   > Using Associated types allows us to do this

```rust
trait Contains {
	type A;
	type B;

	fn contains(&self, &Self::A, &Self::B) -> bool;
}

// When we go to implement this trait we can define the concrete types for `A` and `B` 
// so the caller does not have to

impl Contains for Container {
	// Now the output types are determined by these types
	type A = i32;
	type B = i32;
}

// When we want to use `Container` we don't need to specify the generics `A` and `B`

fn difference<C: Contains>(container: &C) -> i32 {
	// It doesn't matter what the types A and B are at this point, `difference` doesn't need to care!!
	container.first() - container.last()
}
```

   ### PhantomTypes and PhantomData

   > Let's say we have a `struct` or `fn` or `trait` that takes some generics. If we want to make the caller have **compile time type checked** usage of our data types, but not use some of the data types they give us, we can use **phantom type parameters.**

```rust
use std::marker::PhantomData;	
struct PhantomStruct<A, B> { first: A, phantom: PhantomData<B> }

fn main() {
	let _struct = PhantomStruct<char, f32> = PhantomStruct{
		first: 'J',
		phantom: PhantomData, // <--- This will become f32 since it can be inferred from the type annotation
	}
}
```

+ ### Chapter 15 - Scoping, Borrowing, and Lifetimes

   ### (RAII) Resource Acquisition is Initialization)

   > This is the concept that your data **owns** some portion of memory, and when it goes out of scope (no longer used by anything) its resources out automatically freed by calling `drop` .

   > This means that you never have to manually free memory again. Rust will figure out when this happens and free the resources for you.

```rust
fn create_box() {
	// Heap allocated integer (shorthand notation for allocating the number `3` of type `i32`)
	let _box1 = Box::new(3i32);

	// _box1 is dropped here and the memory is freed since it is never returned
}
```

   ### Manually Defining Drop Behavior

```rust
// All data types have the `Drop` trait derrived on them,
// however if you need to perform some data type specific cleanup 
// then you can implement the `Drop` trait on your data type

struct MyStruct;

impl Drop for MyStruct {

}
```

   ### Ownership and Moves

   > Because variables are in charge of freeing their own resources using `trait Drop` ,

   > **a variable is only allowed to have one owner at a time**.
With only one owner, a variable can never be freed twice (the cause of the [double free error](https://en.wikipedia.org/wiki/Memory_safety#Types_of_memory_errors))

Not all variables own their data. A variable that is a reference `let x: &str` **borrows data by using the reference**.

   > When assigning `let x = y` the ownership of `y` is transferred to `x` . **When ownership is transferred** it is referred to as a **move**

```rust
fn my_move_fn(c) {
	// `c` is never used so it is freed at the end of this function call
}

fn main() {
	let x: u32 = 5;
	let y = x;			// This is a Copy of x into y - no resources are moved here


	let a = Box::new(5u32);
	let b = a; 		// Move a into b. The pointer address of `a` is copied into `b` but the data.
						// the data on the heap never changed but the owner of the pointer did

	println!("{}", a); // <-- Error! `a` can no longer access the data since `a` does not own the memory

	my_move_fn(b); 	// Calling this function *moves* the pointer from `b` into this function

	println!("{}", a); // <-- Error! The memory on the heap has been freed so `b` can no longer access it. Doing so would be an attempt at dereferencing freed memory (segmentation fault)
}
```

   ### Mutability

   > In Rust all data starts off immutable. However **we can change the mutability explicitly when we borrow or move.**

```rust
fn main() {
	let immutable_box = Box::new(5u32);

	*immutable_box = 4; // <-- Error! `immutable_box` cannot be modified
	
	let mut mutable_box = immutable_box; // Move from `immutable_box` into `mutable_box` and change the access to `mut`
	
	*mutable_box = 4; // Now we can change the contents of data on the heap
}
```

   ### Partial Moves

   > Imagine that we have a struct with multiple fields. It would be inconvenient to have to **move** all the fields in a struct in order to move one field.

   > To get around this, we have the notion of a **partial move.**

   > A **Partial Move** occurs when we **destructure** a `struct` and move some fields but not others.

   > The parent struct can not longer be accessed, but individual fields can be taken by reference while others are moved.

   > Example

```rust
fn main() {
	struct Person {
		name: String,
		age: u8,
	}

	let person = Person {
		name: String::from("Alice"),
		age: 20,
	}

	// Destructure syntax
	// `ref` keyword takes a reference to a thing
	// `name` is moved out of `person`
	let Person { name, ref age } = person;
	

	println!("{}, person); // <-- Error! borrow of paritally moved value: `person` partial move occurs
}
```

   ### Borrowing

   > If we to allow multiple variables to access the same data, they cannot all own the data. Instead variables can **borrow** data by taking a **reference** or **pointer** to the data.

   > The Rust compiler will error if a variable is borrowing some data and that piece of data goes out of scope (get destroyed). The prevents outdated pointers (dangling pointers) that reference pointers which no longer exist.

```rust
fn borrow_i32(x: &i32) { ... }

fn main() {
	let boxed_i32 = Box::new(5_i32);
	let stacked_i32 = 5_i32;

	// We can give out as many references to out data as we want, so long as the data will exist while
	// the references are given out. If the data suddenly disappears while someone has a reference to it, 
	// then we have an error.
	
	borrow_i32(&boxed_i32);
	borrow_i32(&stacked_i32);

	{
		// If we take a reference
		let _ref_to: &i32 = &boxed_i32;

		eat_data(boxed_i32); // <-- Error! Cannot drop boxed_data while the inner value is borrowed later in scope

		borrow_i32(_ref_to); // <-- Borrowing the inner value of boxed_i32 AFTER it got destroyed
		// At this point _ref_to goes out of scope and the borrow stops 
	}

	// No problem dropping dat now that there are no more references to the data
	eat_data(boxed_i32); 		
}
```

   ### Mutable Borrowing

   > Just like borrowing, we can create a **mutable borrow** which allows for read & write access to the data we are borrowing.

```rust
#[derive(Clone, Copy)]
struct Book {
	author: &'static str,
	title: &'static str,
	year: u32,
}

fn main() {
	let book_immutable = Book {
		author: "Douglas Hofstadter",
		title: "Gödel, Escher, Bach",
		year: 1979,
	};
	
	let mut book_mutable = book_immutable; // *Copy* the immutable data to a mutable variable

	edit_book(&mut book_mutable);

	edit_book(&mut book_immutable); // <-- Error! Cannot borrow an immutable object as mutable
}
```

   ### Aliasing

   > By using references we can rename the pointer to a particular piece of data. If we do this enough times, we can get confused and lose track of what the original data was; then modifying our 4th pointer to the same thing may have unintended consequences since we've forgotten what the original data was.

   > Rust never forgets, so it will help us out. There are some rules for how we borrow things, regardless of how many aliases we take.

   1. > Data can be immutably borrowed an infinite number of times, however *while being immutably borrowed **it may not be mutably borrowed**.*
   2. > **Only one mutable borrow is allowed at a time,** *the original data can be borrowed again after the last mutable borrow goes out of scope.*

   > This means that a `&mut` mutable borrow is effectively a [Mutex](https://en.wikipedia.org/wiki/Lock_(computer_science)) (mutual exclusion - only one modifier at a time).

```rust
fn main() {
	let mut point = Point { x: 0, y: 0, z: 0 };
	
	let first_borrow = &point;
	let second_borrow = &point;

	println!("{}, {}, {}", first_borrow.x, second_borrow.x, point.z);

	let mutable_borrow = &mut point; // <-- Error! can't borrow `point` as mutable because it's currently borrowed as immutable
	
	println!("{}, {}, {}", first_borrow.x, second_borrow.x, point.z); // Immutable borrow happens here
	

	let mutable_borrow = &mut point; // no more immutable borrows so we are OK

	// Change data via mutable reference
    mutable_borrow.x = 5;
    mutable_borrow.y = 2;
    mutable_borrow.z = 1;

	let y = &point.y; // <-- Error! Can't borrow `point` as immutable because it's currently borrowed as mutable

   	println!("({}, {}, {})", mutable_borrow.x, mutable_borrow.y, mutable_borrow.z); // Last mutable borrow happens here

	let ok_to_borrow = &point;

	println!("({}, {}, {})", ok_to_borrow.x, ok_to_borrow.y, ok_to_borrow.z);
}
```

   ### The `ref` Pattern

   > When pattern matching (including assigning variables) and de-structuring, the `ref` keyword can be used on the **left side** of the expression to take a reference to the data on the right, this is the same as `&data`

   > `ref` can be paired with `mut` to take a mutable reference, this is the same as `&mut data`

```rust
fn main() {
	let c = 'C';

	// Equivalent
	let ref borrow_1 = c;
	let borrow_2 = &c;

	let point = Point { x: 0, y: 0 };
	
	let _copy_of_x = {
		let Point { x: ref x_ref, y: _ignore } = point; // `ref` while de-structuring
		
		// Return a copy of the `x` value, not a reference! We never moved!
		*x_ref
	};

	// Mutable copy of `point`
	let mut mutable_point = point;

	
}
```

   ### Lifetimes

   > When we perform a borrow, that borrow has a **lifetime** (how long the value is borrowed for).

   > A common problem in computing is having a pointer which outlives the data it points to. This will leave to undefined behavior at the point could be accessing *any* data.

   > To solve this issue, Rust introduces the idea that a reference has an amount of time it "lives" - a lifetime - during which the data it points to is known to be valid.

```rust
// Lifetimes are annotated below with lines denoting the creation
// and destruction of each variable.
// `i` has the longest lifetime because its scope entirely encloses 
// both `borrow1` and `borrow2`. The duration of `borrow1` compared 
// to `borrow2` is irrelevant since they are disjoint.
fn main() {
    let i = 3; // Lifetime for `i` starts. ────────────────┐
    //                                                     │
    { //                                                   │
        let borrow1 = &i; // `borrow1` lifetime starts. ──┐│
        //                                                ││
        println!("borrow1: {}", borrow1); //              ││
    } // `borrow1 ends. ──────────────────────────────────┘│
    //                                                     │
    //                                                     │
    { //                                                   │
        let borrow2 = &i; // `borrow2` lifetime starts. ──┐│
        //                                                ││
        println!("borrow2: {}", borrow2); //              ││
    } // `borrow2` ends. ─────────────────────────────────┘│
    //                                                     │
}   // Lifetime ends. ─────────────────────────────────────┘
```

   > Lifetimes are extra information used be the **Borrow Checker** - a part of the Rust compiler in charge of determining if a borrow is valid or invalid

   ### Lifetime Annotations

   > There are times when the Borrow checker needs to have some explicit annotation of how long a reference lives.

   > To accomplish this we use the tick `'a` annotation as if it were generic. Which is interesting because **lifetime annotations are generic.** We wouldn't be able to give a number of milliseconds or cpu cycles, so instead **we use generics to define the relationship between lifetimes rather than their specific value.**

   > Here is the golden rule:

   > **Any borrow (reference) must outlive the thing which is borrowing it (function). In other words, a reference must live longer than it is borrowed for - if a function borrows some data, that data must exist for longer than the function.**

```rust
fn first_borrow<'a>() {
	let _x = 12;

	let y: &'a i32 = &_x;
	// ^ Attempting to borrow from x with the lifetime of 'a (which defaults to static)
	// FAILS because x does not live as long as 'static, it only lives as long as this 
	// function's stack frame.

} // ---- Lifetime of x ends here, since it is only in this stack frame
```

   > There is an idea in Rust of "removing lifetime annotations" because the Rust borrow checker is usually able to **infer the lifetime of a reference**.
This is called "**Elision**" which is a complicated word for "omitting lifetime annotations".

   > I wish they had chosen a better word.

   ### Functions Lifetime Annotations

   1. > All references given to a function need a lifetime (either inferred or manually annotated)
   2. > If a function returns a reference, then that reference must life as long as: the lifetime of the input, or, the `'static` lifetime

```rust
// Multiple lifetimes but both live as long as `'a` in this case
//
// There are other cases where the lifetimes have different lengths and 
// we would need to express that, but not now

fn multi_borrow<'a, 'b>(x: &'a i32, y: &'b i32) { ... }

// Here we can return a reference but it has the same lifetime as one of the inputs, `'a`

fn multi_borrow_and_return<'a, 'b>(x: &'a i32, y: &'b i32) -> &'a i32 { x }
```

   > The same syntax applies to methods on a struct.

   > Remember that methods are functions defined in the `impl` of a struct which take `self` as their first argument

   ### Struct & Enum Lifetime Annotations

   > Both Structs and Enums are able to store references, which means they might need to annotate the lifetime of those references

```rust
// A struct which hold a reference to an i32
// The reference 'a must live longer than the struct Borrowed
struct Borrowed<'a>(&'a i32);

// Multiple references in a struct must outlive the struct
struct MultiBorrow<'a> {
	x: &'a i32,
	y: &'a i32,
}

enum Either<'a> {
	Val(i32),
	Ref(&'a i32),
}

// This is where the borrow checker determins the concrete lifetimes
fn main () {
	let x = 18;
	let y = 15;
	let single = Borrowed(&x);
	let mutli = MultiBorrow { x: &x, y: &y };
	let either_ref = Either::Ref(&x);
	let either_val = Either::Val(y);
}
```

   ### Trait & Impl Lifetime Annotations

   > If a struct will take a lifetime as a field, and we `impl` some methods on that struct, we can define a generic lifetime on our implementation - that way we can affix the same lifetime throughout the methods.

```rust
struct Borrowed<'a> {
	x: &'a i32,
}

impl<'a> Default for Borrowed<'a> {
	fn default() -> Self {
		Self {
			x: &10,
		}
	}
}
```

   ### Bounds

   > Just life generic types, lifetimes are generic as well. Since they are generic we can express some bounds over the lifetimes as well as over regular type or trait generics.

   > Here is an example

```rust
// The struct Ref takes a reference that lives as long as 'a
// It takes a reference to a generic type T which should also live 'a long
struct Ref<'a, T: 'a>(&'a T);
```

   ### Coercion

   > By default, Rust will try to infer the length of each lifetime and choose the shortest possible option - to avoid bugs.

   > However if we need to manually tell the borrow checker that one lifetime lives as long as another, we can **coerce** lifetimes to have a length of another lifetime.

```rust
// Rust infers the shortest possible lifetime, then the two parameters are coerced into that length
fn multiply<'a>(first: &'a i32, second: &'a i32) -> i32 {
	first * second
}

// We read this as "'a lives as long as 'b"
// That makes it possible to return `first`
fn choose_first<'a: 'b, 'b>(first: &'a i32, _: &'b i32) -> &'b i32 {
	first
}
```

# Bevy Game Dev

[An in-depth analyze of entity composition in Bevy 1/2](https://maz.digital/in-depth-analyze-entity-composition-bevy-12)

### Productivity Cycle

1. Create a schedule to work on game dev
   - Only once per week is too little
   - At least 2-4 times per week (~1 hour)
1. Create a schedule to meetup in person to work
2. Timebox game development
   - Follow in the style of a "GameJam" which encourages people to actually finish games by timeboxing game development
   - Since we are just starting it would

---

# Rust Web Assembly (Wasm)

[Introduction - Rust and WebAssembly](https://rustwasm.github.io/docs/book/introduction.html)

# Rust Fullstack Development

### Rust and Docker Interop

[Rust - Fast + Small Docker Image Builds](https://shaneutt.com/blog/rust-fast-small-docker-image-builds/)

### Short Gitst Outlining Yew + Rocket Integration

[Full Stack Rust](https://gist.github.com/LLBlumire/dc83ee9612691c60b6535bdfbcb2be81)

### LogRocket Blog Post

[Full-stack Rust: A complete tutorial with examples - LogRocket Blog](http://blog.logrocket.com/full-stack-rust-a-complete-tutorial-with-examples/)

[GitHub - zupzup/rust-fullstack-example: example of a full stack web app (backend and frontend) wrtiten in Rust](https://github.com/zupzup/rust-fullstack-example)

---

# Rust Meetup 11.30 - Swift Interop

- Why did you make this
- Why not transpile?
- Thoughts on doing something similar to flutter and managing UI at the canvas level
- Does your library automatically copy and box any rust data you provide to the FFI macro?
- Frankie.nwafili@gmail.com ^A3F7E9CA-CE58-4089-8C28-B238B629F9DE

# A Crash Course in Computer Programs

*I wanted to write something down to explain the **why** I am learning Rust - if I were to explain its features, it would not explain the root causes of why the language was created and what benefits it has, or even why I am learning it. In order to diagnose the cause rather than describe the symptoms, I will spend the majority of the time explaining the foundations of how computer programs work! Once we know how computer programs work then we can easily understand what Rust tries to accomplish.*

---

*Computer programs* consist of two parts. The "computer" (hardware), which is the physical hardware made from silicon and other metals which turn electricity into computations; and the "program" (software) which are instructions for the computer written by humans for the computer to execute. Hardware and software are two totally different worlds. An accurate analogy would be how the world of bacteria is totally different to the world of a blue whale. One makes up the other, but both have very little understanding of each other.

The world of hardware is "low level". It is literally tiny (made up of things measured in nanometers, one billionth of a meter), and deals with electricity ("1" means current is following, and "0" means there is no current, like a lightbulb).

## Hardware

How can computers turn electricity into computations, logic, processing, web pages, computer games, and video calls? *What if computers ran using flowing of water rather than flowing electricity*? How would would that work? How can we turn a pipe of running water into a computer? Thinking of electricity as if it were water is a nice mental model to understand how things work. Let's explore how computers turn electricity into computations.

### Logic and Processing Units

To turn electricity into computations, modern computers have several components that make this possible - the most important one is called the "transistor" which is like a "gate". In a wire, electrical current "flows". We want to control that flow, and we can! By sending a transistor an electrical signal, we can tell it to open and close its "gate" which allows electricity to "flow" or "close" the gate which stops electricity from "flowing".

We can assemble these transistors in different arrangements to create "logical gates". A logical gate is a physical implementation of a logical structure like "AND", "OR", "NOT", "NOT OR", "NOT AND", etc.

The "AND" gate takes two electrical inputs and produces one output. If both the inputs are turned on, meaning they have electricity flowing through them or "1" for both, the output of the "AND" gate will be "1". If both are off, the output will be "0", and if only one is on, the output will also be "0", since the first "AND" second inputs are not on.

| 1st Input | 2nd Input | Output of (1st "AND" 2nd) |
| --------- | --------- | ------------------------- |
| 0 (off)   | 0 (off)   | 0 (off)                   |
| 0 (off)   | 1 (on)    | 0 (off)                   |
| 1 (on)    | 0 (off)   | 0 (off)                   |
| 1 (on)    | 1 (on)    | 1 (on)                    |

What about an "OR" gate? If either the first "OR" second input are on, then the output will be "1". But if both are off, then the output will be "0"

| 1st Input | 2nd Input | Output of (1st "OR" 2nd) |
| --------- | --------- | ------------------------ |
| 0 (off)   | 0 (off)   | 0 (off)                  |
| 0 (off)   | 1 (on)    | 1 (on)                   |
| 1 (on)    | 0 (off)   | 1 (on)                   |
| 1 (on)    | 1 (on)    | 1 (on)                   |

There are several more logical gate structures but they are not so different from "AND" and "OR", but we will skip over them for now to keep things simple.

Here's the cool part: **::By connecting these gates together we can create a physical device that takes electrical input and performs computations using logic!::**

Let's see an example...

### A Fountain and "The General Purpose Problem"

Let's imagine that we made a version of our gates that don't work with electricity but work using flowing water!

To do this we go outside, hook up a bunch of pipes together, and we have plugs represent our "gates" which control the flow of water.

> Plug the pipe           → no water flows

> Unplug the pipe.     → water flows.

We use our gates to build a water-based computer which controls a fountain. The fountains takes several inputs "streams".

- > Input Pipe: On / Off → Flowing water into this pipe tells the fountain to turn on
- > Input Pipe: 1 = Low height → Flowing water into this pipe tells the fountain height to be small
- > Input Pipe: 2 =  Medium height → Flowing water into this pipe tells the fountain height to be medium
- > Input Pipe: 3 = High height → Flowing water into this pipe tells the fountain height to be tall

Our water based computer will use "AND" and "OR" gates to control whether the fountain is "on" or "off".

When the fountain is set to "off", all inputs in "1", "2", and "3" will be ignored.

When the fountain is set to "on", only one of the levels can be set ("1", "2", OR "3") at a time.

---

Okay great. But this "computer" can only do one thing... it can only control a fountain. What if we wanted this computer to do something else, like control a spaceship to the moon, or divide numbers?

::We would have to remake the pipes and create a totally different layout of logical gates.::

This sucks: it is time consuming, labor intensive, and just wasteful.

::What if, somehow, we could make a set of pipe that could perform "any" computation. No matter what the computation is, we could feed it into our special set of pipes and it could output the result of that computation.::

---

Enter the "general purpose computer". A computer whose inputs are not specific to any individual circumstance but are for "any" purpose.

This computer takes **instructions** as inputs and **outputs** the result of those instructions.

At last, our solution!

### Instructions

Let's go back to the world of electricity, silicon, and transistors.

Our "general purpose" computer has a "general purpose" chip on it called the **Central Processing Unit (CPU)**. The CPU is made up of ***billions*** of transistors which made up ***billions*** of logical gates. All of these gates is what allows us to run **any program we want**.

However the CPU needs a set of "instructions" it understands. We need to turn our computation (whatever it may be) into these instructions and only these instructions - the CPU won't understand anything that is not in its list of instructions.

::This is an important idea: the CPU itself dictates how we write instructions.::

A "program" is a set of instructions to the CPU. But these instructions are not complex, they are all about adding, subtracting, multiplying, and dividing numbers. Why numbers? Because numbers can be represented with electricity, and they can easily be added, multiplied, subtracted, and divided in "0.1 nanoseconds"!

If we can translate our "logic" or "program" into numbers, then the CPU can execute it FAST, very very fast. That's good for us, more work, less time.

::So because of how our hardware is constructed, our computer "programs" have to take the form of "instructions to the general purpose CPU which instruct the CPU to add, subtract, multiply, or divide specific numbers".::

## Software

Okay, so our hardware can take our instructions as input, execute our instructions, and give us the output back - neat!

Well wait. Those instructions are just on numbers, and if we want to write a program that does something complicated... that would be a lot of instructions, with a lot of numbers... like millions of instructions! We probably don't want to write millions of "add this to that" instructions for the CPU. How can we make our lives easier?

### Programing Languages

What if we could write instructions to the computer in a human-readable and human-friendly format? Okay, that's all well and good, but the CPU still only understands "divide this number by that number" instructions - what do we do?

We could try to *translate* between the computer instructions and the CPU instructions.

This would be similar to how human languages are translated between one another. Most of the words in one language can be translated to any other. "boy", "red", "happy", and "want" are easy translation. Then there are some words in languages which have no counterpart - usually a word describing a complex idea, emotion, or cultural norm. How do we translate these words? Well in the case of Chinese or Japanese, we can use many English words to approximate what the meaning of the original word was - though never capturing the full meaning.

Computer can translate with perfect accuracy. If we write our programs in a human-readable format, we can translate it perfectly to the computer's set of instructions. Ironically, we actually need to write another computer program to *do the translating.* This program is called a "compiler", it takes our human instructions as input, and converts the human-readable version into CPU readable instructions.

> You might be thinking there is some chicken and egg situation going on If the compiler is a program, it has to be written using instructions right? Since it converts human-readable instructions into CPU-readable instructions, it must be complicated right? If the compiler was written in CPU-readable instructions then it would be millions of instructions long right? So how is it done?

> Compilers are written "incrementally" using what I can only describe as "magic". They basically write and compile themselves. A computer programmer starts by writing a compiler which translates an "intermediate" human-readable set of instructions into CPU instructions. Then writes a compiler in the "intermediate" set of instructions that compiles a set of instructions "one level up" and keeps going all the way until the final programming language can be compiled.

> It's not important that you understand this, but I think it's a nifty idea. Basically building an airplane from scratch while you're falling through the air - insane!

Okay now that we have a "compiler" we can write our "programs" in human-readable format and, well, *compile* them into the set of instructions the CPU understands.

We typically refer to human-readable programs as a "programming language". It's nothing like a human language, it is more like a valid "set of instructions",  but often can read like a spoken language and represent more complex ideas which get translated down into “add this number to that number” for the CPU.

### How Computer Programs are "Executed"/"Run"

Every time you open an "app" on your phone or computer, there is a sequence of events that occur in which your computer (which has a CPU) gets a list of instructions it needs to execute.

Because all programs eventually become CPU instructions, there is a common "execution model" for how programs are run. An "execution model" just refers to what happens when a program is run, where the instructions live, how many resources the program gets, etc.

One part of the execution model is all about “order” - which instructs are executed first, then which ones after, and so on.

The other part is “storage” or “memory” - how can a program member information while it is running or even after it finishes running?

### Programs Need to Remember Stuff

So far we've described how computers build up logic from electricity, computations from logic, and instructions from computations. Our programs will run, but they might need to create, store, and remember some information while they are running.

Think about a simple program which works like a "counter". There is some physical or virtual button and you press the button multiple times. Each time you press the button the count increases by 1.

Okay so the program has to store a number... somewhere on the computer? How?

We will simplify many ideas down: like L1 caches, Random Access Memory (RAM), and Operating Systems (OS) down to the following...

> Computers have physical components that allow programs to store information in either the short term (RAM) or long term (SSD/HDD). Programs will be able to access these resources, but only through a special program which is always running called the Operating System.

> The Operating System is like a "coordinator program". It is the very first program to run when the computer is turned on, and it always runs until you shut the computer down.

> What does it "coordinate"? It coordinates between the physical components (hardware) on the computer and all of the programs (software) that want to use them.

> As you might know, multiple programs might run simultaneously, it is the Operating System which silently and kind of magically, figures out how many programs are running and when to switch between them.

> But there is a problem... there is a finite amount of storage (both short term and long term types of storage) and there are many programs which all want to use the same finite amount of resources.

> How can we share a finite amount of something with a much larger number of programs which want to access them?

> Do we divide the amount of resources by the number of programs?

> Well if we have 100% of the resources and 5 programs, then each program gets 20% of the resources - okay. Let's say all 5 programs use all of their portion? That means 100% of the available resources are used. What happens if the user launches a 6th application? There aren't any more resources to go around! How do we solve this problem?

> Also what if each program doesn't use all of their resources? Then we've over-provisioned and there is no more room. That's also bad.

> Instead of dividing the resources evenly, the Operating System will allocate a tiny portion of the available resources to each application, then allocate more "on-demand" (if the program needs more, the Operating System will try to give it more. It may or may not succeed).

---

> ::Okay we have a new idea: programs can access resources to store information, they can access them as a type of instruction in their "programming language". However there is a grim underbelly to the ability to access these new resources - human beings make a lot of mistakes.::

### Monkeys Make Mistakes

Now comes the human component. We make a lot of mistakes as monkeys, but the funny part is that the computer (CPU, hardware, etc.) **never makes mistakes**.

This means that our computer programs often have "bugs" or things that are wrong with them.

One of the most common mistakes, and in fact the most consequential, are "memory bugs". This happens when the human writes a program that tries to request some amount of the storage resources on the computer, but messes up managing those resources through the programming language.

Let me give you a example:

> Let's say we have a "counter" program we described above, every time the user clicks a physical or virtual button, the counter goes up.

> However, the human programmer who wrote the instructions for the program made a mistake.

> Instead of reserving some storage space for the counter at the start of the program (before any buttons have been pressed), the human accidentally reserves the amount of storage *every time the button is pressed**.***

> What will happen?

> Each time the button is pressed, more storage is give to our "counter" program by the Operating System. Since the Operating System gives us storage space "on demand" we can continually request more and more storage... however eventually we will run out.

> What happens when all of the computer's storage is reserved by a program?

> Several decades ago this would cause the entire computer to "crash" or fail to operate and shutdown. These days, Operating Systems are smarter and instead of shutting off the entire computer, our program will be "killed" (basically no longer allowed to run) and the Operating System will take back the resources we reserved.

> This mistake is called a "memory leak", where a programmer writes a program with a mistake which reserves more resources than it needs until the computer either crashes or the Operating System forcibly ends the program.

There are many other types of memory bugs. Let's explore another one

> Let's say we write a program which will read a file from the computer's hard drive storage. Each line of the file has some text in it, and the program tries to see if the word "banana" appears in each line. If it does, it prints out "found one!".

> In order to read the file, we load the file from the "long term storage" into "short term storage" so the computer program can access it more quickly (short term storage is faster than long term storage but has smaller space).

> The programer made a mistake. When we are done reading the file from short term memory, the programmer manually "freed'' the short term storage back to the Operating System using the programming language... However in the computer program, the programmer kept a "reference" or a "pointer" to the location in short term storage to where the file's contents *used to be**.***

> What does this "pointer" refer to now that the memory has been "released"?

> "Nothing", or worse, some other's program's memory.

> What happens when the programmer tries to access the memory that has been "freed"?

> The program will "crash" because it tried to access something that no longer exists.

> This mistake is called "use after free". The programmer "freed" the resources back to the Operating System, turning them into "nothing", then tried to get the contents of "nothing". This causes the program to crash.

Why does this happen? Why do programmer make so many mistakes?

It turns out that allowing humans to manually manage the resources of a computer is a bad idea. As a computer program becomes more complicated, the amount of resources that need to be managed grows dramatically.

What can we do to make this easier on us poor humans?

### Automatic Resource Management

Just like a compiler, programmers eventually realized that they could make another computer program to do a task automatically. A "garbage collector" is a special type of computer program which *automatically reserves resources as the computer program requires them and also automatically "frees" the resources when the computer program no longer needs them.*

The "garbage collector" is a program which is run along-side your program (they run at the same time) and watches what your program tries to do. If it tries to get more more resources, it will reserve those resources for your program (if it can). If your program no longer needs some of the resources it gave it previously, it will take them back (free) when it knows it is safe and the program will no longer "use after free".

This is massive convenience for programmers! This makes writing computer programs less prone to errors.

With all things there are downsides. The "garbage collector" will need to "pause" our computer program in order to look at all of the resources that have been allocated and determine if any are *truly no longer needed*. However this "pause" is quite long (it can take several milliseconds) compared to the world of a CPU which can execute an instruction every "0.1 nanoseconds". That is a factor of 100,000 slower

::So the tradeoff of automatic resource management is performance. We make our programs a lot slower so we don't accidentally crash our program while it is running.::

However it is not always possible to use a "garbage collector" in all situations. A "garbage collector" is itself a program which itself takes resources to run (kind of cyclical right?).  If we were writing a computer program that needs to execute *extremely quickly* we would not want to use a "garbage collector" because it would slow our program down a lot. If we wanted to write a computer program on a robot, which has a tiny amount of available resources, the "garbage collector" would take more resources than our program!

---

::What if we had a programming language which did not use a garbage collector and allowed us to manually manage our memory - but prevented us from making many of the common mistakes?::

### Enter the Rust Programming Language

"Rust" is a programming language with a radical idea. Don't use a garbage collector at all but don't allow the human programmer to manage the resources themselves - let the compiler do it! The same thing that translates your programming language into CPU instructions can validate that you don't accidentally cause a memory bug! And the coolest part of Rust is that it does this *before your program starts running*. If the compiler spots a possible mistake, it will not allow your program to be translated into CPU instructions at all!

Either your program is valid, or it isn't,, and Rust knows the difference.

- [ ] I have to explain Rust more, but this is the idea - I got tired of writing for today

