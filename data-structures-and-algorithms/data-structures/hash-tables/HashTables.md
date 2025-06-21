# Hash Tables

## Objectives

- Explain what a hash table is
- Define what a hashing algorithm is
- Discuss what makes a good hashing algorithm
- Understand how collisions occur in a hash table
- Handle collisions using separate chaining or linear probing

## Big O of Hash Tables

- **Insert:** `O(1)`
- **Deletion:** `O(1)`
- **Access:** `O(1)`

## Introduction

### What is a hash table?

- Hash tables are used to store _key-value_ pairs.
- They are like arrays, but the keys are not ordered.
- Unlike arrays, hash tables are _fast_ for all of the following operations: finding values, adding new values, and removing values!

### Why should I care?

- Nearly every programming language has some sort of hash table data structure
- Because of their speed, hash tables are very commonly used!

### Hash tables in the Wild

- **Python** - Dictionaries
- **JavaScript** - Objects and Maps
- **Java, Go, & Scala** - Maps
- **Ruby** - Hashes

**Note:** Objects have some restrictions, but are basically hash tables.

### Introductory Example

- How can we get human-readability _and_ computer readability?
- Computers don't know how to find an element at index _pink_!
- We have hash tables to the rescue!

## The Hash Part

- To implement a hash table we'll be using an array
- In order to look up values by key, we need to a way to convert keys into valid array indices.
- A function that performs this task is called a **hash function**

### What makes a good hash?

1. Fast (Constant time)
2. Doesn't cluster outputs at specific indicies, but distributes uniformly
3. Deterministic (same input yields same output)

### Prime Numbers

- The prime number in the hash is helpful in spreading out the keys more uniformly
- It's also helpful if the array that you're putting values into has a prime length.
- Having the length of your array a prime number will always have higher performance than hash tables with a composite number.

## Dealing with Collisions

- Even with a large array and a great hash function, collisions are inevitable.
- There are many strategies for dealing with collisions, but we'll focus on two: separate chaining and linear probing.

### Separate Chaining

- With _separate chaining_, at each index in our array we store values using a more sophisticated data structure (an array or a linked list)
- This allows us to store multiple key-value pairs at the same index.

![Separate Chaining Image](Screenshots/SeparateChaining.JPG)

### Linear Probing

- With _linear probing_, when we find a collision, we search through the array to find the next empty slot.
- Unlike with separate chaining, this allows us to store a single key-value at each index.

![Linear Probing Image](Screenshots/LinearProbing.JPG)

## Hash Table Example

```js
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key, arrayLen) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % arrayLen;
    }
    return total;
  }
}
```

## Operations Pseudocode

### Set

1. Accepts a key and a value
2. Hashes the key
3. Stores the key-value pair in the hash table array via separate chaining

### Get

1. Accepts a key
2. Hashes the key
3. Retrieves the key-value pair in the hash table
4. If the key isn't found, returns `undefined`

### Keys

1. Loops through the hash table table array and returns an array of keys in the table

### Values

1. Loops through the hash table array and returns an array of values in the table

## Summary

- Hash tables are collections of key-value pairs
- Hash tables can find values quickly given a key
- Hash tables can add new key-values quickly
- Hash tables store data in a large array, and work by _hashing_ the keys
- A good has should be fast, distribute keys uniformly, and be deterministic
