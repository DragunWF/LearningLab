import java.util.Scanner;

public class Main {
    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        LinkedList list = new LinkedList(new Node(0));
        final int itemCount = userInput("Item Count: ");
        for (int i = 1; i <= itemCount; i++) {
            list.push(i);
        }

        for (Node node = list.getHead(); node != null; node = node.next) {
            System.out.println(node.value);
        }
    }

    private static int userInput(String prompt) {
        System.out.print(prompt);
        return sc.nextInt();
    }
}

class LinkedList {
    private Node head;
    private Node tail;
    private int length;

    public LinkedList(Node head) {
        this.head = head;
        this.tail = head;
        this.length = 1;
    }

    public void push(int value) {
        this.tail.next = new Node(value);
        this.tail = this.tail.next;
    }

    public void shift(int value) {
        Node newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    public Node search(int target) {
        for (Node node = this.head; node != null; node = node.next) {
            if (node.value == target) {
                return node;
            }
        }
        return null;
    }

    public void pop() {
        // add implementation
    }

    public int getLength() {
        return this.length;
    }

    public Node getHead() {
        return this.head;
    }
}

class Node {
    public Node next = null;
    public int value;

    public Node(int value) {
        this.value = value;
    }
}