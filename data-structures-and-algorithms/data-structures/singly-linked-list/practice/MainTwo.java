// My attempt at creating a Doubly Linked List data structure
// Without watching any video lessons...

import java.util.*;

public class MainTwo {
    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) throws Exception {
        final int itemCount = userInput("Enter the item count: ");
        final int randomRangeLimit = 500;
        final DoublyLinkedList linkedList = new DoublyLinkedList(new Node(5));
        for (int i = 0; i < itemCount; i++) {
            final int randomNum = (int) Math.floor(Math.random() * randomRangeLimit);
            linkedList.push(randomNum);
        }
        testLinkedList(linkedList);
    }

    private static void testLinkedList(DoublyLinkedList linkedList) {
        System.out.println("Contents of Linked List:");
        for (Node node = linkedList.getHead(); node != null; node = node.next) {
            System.out.println(node.value);
        }

        System.out.println("\nIn Reverse:");
        for (Node node = linkedList.getTail(); node != null; node = node.previous) {
            System.out.println(node.value);
        }
    }

    private static int userInput(String prompt) throws Exception {
        try {
            System.out.print(prompt);
            return sc.nextInt();
        } catch (Exception err) {
            System.out.println("Invalid input! Please try again");
            return userInput(prompt);
        }
    }
}

class DoublyLinkedList {
    private Node head;
    private Node tail;
    private int length;

    public DoublyLinkedList(Node head) {
        this.head = head;
        this.tail = head;
        this.length = 1;
    }

    public void push(int value) {
        Node createdNode = new Node(value);
        this.tail.previous = this.tail;
        this.tail.next = createdNode;
        this.tail = this.tail.next;
        this.length++;
    }

    public Node search(int target) {
        for (Node node = this.head; node != null; node = node.next) {
            if (node.value == target) {
                return node;
            }
        }
        return null;
    }

    public void shift(int value) {
        Node createdNode = new Node(value);
        this.head.next = createdNode;
        this.head = createdNode;
        this.length++;
    }

    public Node getHead() {
        return this.head;
    }

    public Node getTail() {
        return this.tail;
    }

    public int size() {
        return this.length;
    }
}

class Node {
    public Node next;
    public Node previous;
    public int value;

    public Node(int value, Node previousNode) {
        this.previous = previousNode;
        this.value = value;
        this.next = null;
    }

    public Node(int value) {
        this.next = null;
        this.previous = null;
        this.value = value;
    }
}