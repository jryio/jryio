---
title: "PureScript by Example"
date: 2021-08-11T16:42:14.81892705Z
updated: 2023-08-28T21:15:43.291455Z
weight: 4
extra:
  note_type:  
---

# Reading Notes: Purescript by Example

[Foreword - PureScript by Example](https://book.purescript.org/)

[GitHub - purescript-contrib/purescript-book: Sources for the PureScript book](https://github.com/purescript-contrib/purescript-book)

---

> PureScript is a statically typed programming language which uses types at compile time to validate programs.

> PureScript also has type inference, which means it can detect the true type or infer a type without an explicit annotation

> The `Control.Plus` module, which defines the `empty` value.

> The `Data.List` module, which is provided by the `lists` package which can be installed using Spago. It contains a few functions which we will need for working with linked lists.

> The `Data.Maybe` module, which defines data types and functions for working with optional values.

> It is good practice to list the names of imports explicitly in parenthesis when importing, like so `import Data.List (List(...), filter, map, head)` This is done to avoid conflicting imports between modules which might have exported functions with the same signature

> PureScript has three primitive types, which are imported automatically with every module, that map directly to JavaScript's primitive types: `String` , `Number` , `Boolean`

> `Number` can be either an `Integer` or a `Float`

> Universally quantified types are like generics - I think - whereby using the keyword `forall` allows us to label some generic types which can be substituted for real types later. `flip :: forall a b c . (a → b → c ) → b → a → c` This means that `flip` can can types `a` `b` and `c`.
Passing in specific types to a universally quantified type like `flip` will specialize it automatically like so `flip (\n s → show n <> s) "Ten" 10` `flip :: (Int  → String  → String) → String  → Int → String`

> Using the keyword `type` will create a Type Synonym which assigns a name to a type like so

```
type Entry =
  { firstName :: String
  , lastName  :: String
  , address   :: Address
  }
```

> A type constructor is a specific type that is parameterized on another type, for example, no value has the type `List`, but values can have the type `List a` . That is because `List` is a type constructor which types a type argument `a` and constructs a new type `List a` .

> A "Kind" error can happen when we try to assign a value which expects a type which can hold a value such as `Number` to a type constructor like `List` For example: `Type` and `Type → Type` will produce a "kind error"

```
> :kind Number
Type

> import Data.List
> :kind List
Type -> Type

> :kind List String
Type
```

> If we want to access properties of a record we can do so with an anonymous function like so

```
\entry -> entry.address
```

> There is also property accessor shorthand which uses an underscore like so

```
> address = { street: "123 Fake St.", city: "Faketown", state: "CA" }
> entry = { firstName: "John", lastName: "Smith", address: address }
> _.lastName entry
"Smith"

> _.address.city entry
"Faketown"
```

> The `Data.Function` module has a function `apply` which is also defined as an infix operator `$` which allows for infixing of function applications like so

```
book3 = insertEntry john (insertEntry peggy (insertEntry ned emptyBook))
-- Becomes
book3 = insertEntry john $ insertEntry peggy & insertEntry ned emptyBook

-- Order of insertion: ned, peggy, john
```

```
apply :: forall a b. (a -> b) -> a -> b
apply f x = f x

infixr 0 apply as $
```

> We can work with the `Maybe` type by suing the function `fromMaybe :: forall a. a → Maybe a → a` . This function takes a default value and a Maybe. If the Maybe returns `Nothing` then the default value is returned from `fromMaybe` . If the Maybe is `Just` then it returns the value wrapped inside of `Just`.

> `concatMap` works by first applying the mapping function to each element of the array. This application produces an array. Then an array of arrays is constructed internally, and each array in the main array is concatenated together to produce one flat array.

```
> import Data.Array

> :type concat
forall a. Array (Array a) -> Array a

> concat [[1, 2, 3], [4, 5], [6]]
[1, 2, 3, 4, 5, 6]

> :type concatMap
forall a b. (a -> Array b) -> Array a -> Array b

> concatMap (\n -> [n, n * n]) (1 .. 5)
[1,1,2,4,3,9,4,16,5,25]
```

> Array comprehensions can be accomplished by using `map` , `filter` , and `concatMap` .

> Do Notation allows for ::monad comprehensions:: which look like this (when using only arrays)

```
-- product takes an array [5, 5] and computrs their product 25
factors :: Int → Array (Array Int)
factors n = filter (\xs -> product xs == n) do
	i <- 1 .. n
	j <- i .. n
	pure [ i , j ]

-- If we replace "<-" with the word "choose" we get
-- i choose a value in the range 1 and n
-- j choose a value in the range i and n
-- then return [i, j]
```

> Guards are something that I don't fully understand but will go with it anyway. using the `guard` function allows us to replace the usage of `fitler` in the above example like so:

```
import Control.Alternative (guard)

factors :: Int -> Array (Array Int)
factors n = do
	i <- 1 .. n
	j <- i .. n
	guard $ i & j == n
	pure [i, j]

-- If the guard function receives an express which evaluates to false, it returns an empty array []
-- otherwise the guard function returns an array with a single element [unit]
-- I believe this allows the control flow to stop on [] and continue on [unit] since almost all basse cases for 
-- recursive functions on arrays use [].

-- RULES FOR DO NOTATION

-- 1. Expressions which bind elements of an array to a name. These are indicated with the backwards-facing arrow <-, with a name on the left, and an expression on the right whose type is an array.
-- 2. Expressions which do not bind elements of the array to names. The do result is an example of this kind of expression and is illustrated in the last line, pure [i, j].
-- 3. Expressions which give names to expressions, using the let keyword.
```

Because we can only use recursion in functional programming, we have one optimization that will prevent stack overflows, ::tail recursion::. When we write a function whose last expression **calls itself**, then we can re-compile the function as a `while` loop. This is assisted by rewriting functions to take an additional argument which represents the accumulated result.

```
lengthTailRec :: forall a. Array a -> Int
lengthTailRec arr = length' arr 0
  where
  length' :: Array a -> Int -> Int
  length' arr' acc =
    if null arr'
      then acc
      else length' (fromMaybe [] $ tail arr') (acc + 1)
```

[PureScript by Example](https://book.purescript.org/)

# ☑️ Exercises

- [Tue, Sep 14 '21](javascript:;)
- [Wed, Sep 15 '21](javascript:;)
- [ ] Chapter 4
- [ ] Chapter 5
- [ ] Chapter 6
- [ ] Chapter 7
- [ ] Chapter 8
- [ ] Chapter 9
- [ ] Chapter 10
- [ ] Chapter 11
- [ ] Chapter 12
- [ ] Chapter 13
- [ ] Chapter 14

