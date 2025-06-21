# Doubly Linked List

## Objectives

- Construct a Doubly Linked List
- Compare and contrast Doubly and Singly Linked Lists.
- Implement basic operations on a Doubly Linked List.

## General

### Summary

- Doubly Linked Lists are almost identical to Singly Linked Lists except there is an additional pointer to previous nodes
- Better than Singly Linked Lists for finding nodes and can be done in half the time!
- However, they do take up more memory considering the extra pointer

### Big O of Doubly Linked Lists

- Insertion - `O(1)`
- Removal - `O(1)`
- Searching - `O(n)`
- Access - `O(n)`
- Technically searching is `O(n / 2)`, but that's still `O(n)`

### We know what lists are but doubly?

- **Almost** identical to Singly Linked Lists, except every node has **another** pointer, to the **previous** node.

### Comparisons with Singly Linked Lists

- More memory `===` More Flexibility
- It's **almost** always a tradeoff!

## Operations

### Pushing

#### Definition

Adding a node to the **end** of the Doubly Linked List.

#### Pseudocode

- Create a new node with the value passed to the function
- If the head property is `null` set the head and tail to be the newly created node
- If not, set the next property on the tail to be that node
- Set the previous property on the tail to be taht node
- Set the previous property on the newly created node to be the tail
- Set the tail to be the newly created node

### Popping

#### Definition

Removing a node from the **end** of the Doubly Linked List.

#### Pseudocode

- If there is no head, return `undefined`
- Otherwise, Store the current tail in a variable to return later
- If the length is `1`, set the head and tail to be null
- Update the tail to be the previous node
- Set the newTail's next to `null`
- Decrement the length
- Return the value removed

### Shift

#### Definition

Removing a node from the **beginning** of the Doubly Linked List.

#### Pseudocode

- If the length is 0, return `undefined`
- Otherwise, store the current head property in a variable _(We'll call it old head)_
- If the length is one
- Set the head and tail to be `null`
- Update the head to be the next of the old head
- Set the head's prev property to `null`
- Set the old head's next to `null`
- Decrement the length
- Return the old head

### Unshift

#### Definition

Adding a node to the **beginning** of the Doubly Linked List.

#### Pseudocode

- Create a new node with the value passed to the function
- If the length is 0
- Set the head to be the new node
- Set the tail to be the new node
- Otherwise
- Set the prev property on the head of the list to be the new node
- Set the property on the new node to be the head property
- Update the head to be the new node
- Increment the length
- Return the list

### Get

#### Definition

Accessing a node in a Doubly Linked List by its position

#### Pseudocode

- If the index is less than 0 or greater than or equal to the length, return null
- If the index is less than or equal to half the length of the list
- Loop through the list starting from the head and loop towards the middle
- Return the node once it is found
- If the index is greater than half the length of the list
- Loop through the list starting from the tail and loop towards the middle
- Return the node once it is found

### Set

#### Definition

Replacing the value of a node in a Doubly Linked List.

#### Pseudocode

- Create a variable which is the result of the `get` method at the index passed to the function
- If the `get` method returns a valid node, set the value of that node to be the value passed to the function
- Return true
- Otherwise, return false

### Insert

#### Definition

Adding a node in a Doubly Linked List a by a certain position

#### Pseudocode

- If the index is less than zero or greater than or equal to the length return false
- If the index is 0, `unshift`
- If the index is the same as the length, `push`
- Use the `get` method to access `index - 1`
- Set the next and prev properties on the correct nodes to link everything together
- Increment the length
- Return true

### Remove

#### Definition

Removing a node in a Doubly Linked List a by a certain position.

#### Pseudocode

- If index is less than zero or greater than or equal to the length return undefined.
- If the index is 0, `shift`
- If the index is the same as `length - 1`, `pop`
- Use the `get` method to retrieve the item to be removed
- Update the next and prev properties to remove the found node from the list
- Set next and prev to null on the found node
- Decrement the length
- Return the removed node
