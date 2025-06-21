# Analyzing Performance of Arrays and Objects

## Objectives

- Understand how objects and arrays work, through the lens of Big O
- Explain why adding elements to the beginning of an array is costly.
- Compare and contrast the runtime for arrays and objects, as well as built-in methods.

## Objects

### Time Complexities

#### Big O of Objects

- **Insertion** - `O(1)`
- **Removal** - `O(1)`
- **Searching** - `O(n)`
- **Access** - `O(1)`

#### Big O of Object Methods

- `Object.keys` - `O(n)`
- `Object.values` - `O(n)`
- `Object.entries` - `O(n)`
- `hasOwnProperty` - `O(1)`

```js
const player = {
  username: "DragunWF",
  isAdmin: true,
  stats: [1, 2, 3, 4, 5],
};
Object.keys(player);
// ["username", "isAdmin", "stats"]
Object.values(player);
// ["DragunWF", true, [1, 2, 3, 4, 5]]
Object.entries(player);
// [["username", "DragunWF"], ["isAdmin", true], ["stats", [1, 2, 3, 4, 5]]]
Object.hasOwnProperty("username");
// true
```

## Arrays

### Time Complexities

#### Big O of Arrays

- **Insertion** - _It depends_
- **Removal** - _It depends..._
- **Searching** - `O(n)`
- **Access** - `O(1)`

#### Insertion and Removal

- Inserting at the end of an array will always be faster than inserting an element at the beginning of the array, same thing goes for removal operations.
- Insertion and removal operations at the end will always be `O(1)` while operations at the beginning of the array will always be `O(n)`.

#### Big O of Array Methods

- `push` - `O(1)`
- `pop` - `O(1)`
- `shift` - `O(n)`
- `unshift` - `O(n)`
- `concat` - `O(n)`
- `slice` - `O(n)`
- `splice` - `O(n)`
- `sort` - `O(n * log n)`
- `forEach/map/filter/reduce/etc.` - `O(n)`
