class LinkedList:
    def __init__(self, head):
        self.head = head
        self.tail = head
        self.length = 1

    def push(self, value) -> None:
        self.tail.next = Node(value)
        self.tail = self.tail.next
    
    def shift(self, value) -> None:
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node

    def size(self) -> int:
        return self.length;


class Node:
    def __init__(self, value):
        self.next = None
        self.value = value


def main() -> None:
    pass


if __name__ == "__main__":
    main()
