# Singly Linked Lists

## Introduction

### Summary

- Singly Linked Lists are an excellent alternative to arrays when insertion and deletion at hte beginning are frequently required.
- Arrays con tain a build in index whereas linked lists do not.
- The idea of al ist data structure that consists of nodes is the foundation for other data structures like Stacks and Queues.

### What is a linked list?

- A data structure that contains a **head**, **tail**, and **length** property.
- Linked list consists of nodes, and each **node** has a **value** and a **pointer** to another node or null.

### Big O of Singly Linked Lists

#### Time Complexities

- **Insertion** - `O(1)`
- **Removal** - It depends... `O(1)` or `O(n)`
- **Searching** - `O(n)`
- **Access** - `O(n)`

#### Notes

- Singly linked lists excel at insertion and deletion compared to arrays.

### Comparison with Arrays

#### Lists

- Do not have indexes!
- Connected via nodes with a **next** pointer
- Random access is not allowed

#### Arrays

- Indexed in order!
- Insertion and deletion can be expensive
- Can quickly be accessed at a specific index

### Pushing

#### Definition

- It's about adding a **node** at the end of the list
- The reason why we're returning the linked list is to view the current state of the linked list whenever you call the method in the console of a browser.

#### Pseudocode

- This function should accept a value
- Create a new node using the value passed to the function
- If there is no head property on the list, set the head and tial to be the newly created node
- Otherwise, set the next property on the tail to be the new node and set the tail property on the list to be newly created node
- Increment the length by one
- Return the linked list

### Popping

#### Definition

- It's about removing a **node** from the end of the linked list.

#### Psuedocode

- If there are no nodes in the list, return `undefined`
- Loop through the list until you reach the tail
- Set the next property of the 2nd to last node to be null
- Set the tail to be the 2nd to last node
- Decrement the length of the list by 1
- Return the value of the node removed

### Shifting

#### Definition

- It is about removing a new **node** from the beginning of the linked list.

#### Pseudocode

- If there are no nodes, return undefined
- Store the current head property in a variable
- Set the head property to be the current head's next property
- Decrement the length by 1
- Return the value of the node removed

### Unshifting

#### Definition

- It is about adding a new **node** to the beginning of the linked list.

#### Pseudocode

- This function should accept a value
- Create a new node using the value passed to the function
- If there is no head property on the list, set the head and tail to be the newly created node
- Otherwise set teh newly created node's next property to be the current head property on the list.
- Set the head property on the list to be that newly created node
- Increment the length of the list by 1
- Return the linked list

### Get

#### Definition

- Retrieving a **node** by its position in the linked list.

#### Pseudocode

- This function should accept an index
- If the index is less than zero or greater than or equal to the length of the list, reutrn null
- Loop through the list until you reach the index and return the node at that specific index.

### Set

#### Definition

- Changing the **value** of a node based on it's position in the linked list.

#### Pseudocode

- This function should accept a value and an index
- Use your `get` function to find the specific node
- If the node is not found, return `false`
- If the node is found, set the value of that node to be the value passed to the function and return `true`

### Insert

#### Definition

- Adding a node to a linked list at a **specific** position.

#### Pseudocode

- If the index is less than zero or greater than the length, return `false`.
- If the index is the same as the length, push a new node to the end of the list.
- If the index is 0, unshift a new node to the start of the list
- Otherwise, using the `get` method, access the node at `index - 1`
- Set the next property on that node to be the new node
- Set the next property on the new node to be the previous next
- Increment the length
- Return `true`

### Remove

#### Definition

- Removing a node from the linked list at a **specific** position.

#### Pseudocode

- If the index is less than zero or greater than the length, return `undefined`.
- If the index is the same as `length - 1`, pop
- If the index i 0, shift
- Otherwise, using the `get` method, access the node at `index - 1`
- Set the next property on that node to be the next of the next node
- Decrement the length
- Return the value of the node removed

### Reverse

#### Purpose

- Reversing the linked list **in place**.

#### Pseudocode

- Swap the head and tail
- Create a variable called next
- Create a variabled called prev
- Create a variable called node and initialize it to start at the head
- Loop through the list
- Set next to be the next property on whatever node is
- Set prev to be the value of the node variable
- Set the node variable to be the value of the next variable

#### Optimal Solution

```js
reverse(){
  var node = this.head;
  this.head = this.tail;
  this.tail = node;
  var next;
  var prev = null;
  for(var i = 0; i < this.length; i++){
    next = node.next;
    node.next = prev;
    prev = node;
    node = next;
  }
  return this;
}
```
