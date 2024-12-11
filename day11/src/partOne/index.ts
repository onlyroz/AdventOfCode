import { shout, hasEvenDigits, splitNumber } from "../utils";

export class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  head: Node<T> | null = null;
  private length: number = 0;

  append(value: T): void {
    const newNode = new Node(value);
    if (!this.head) this.head = newNode;
    else {
      let current = this.head;
      while (current.next)  current = current.next;
      current.next = newNode;
    }
    this.length++;
  }

  transformStones(): void {
    let current = this.head;
    while (current) {
      const num = BigInt(current.value as unknown as string);
      if (num === BigInt(0)) {
        current.value = '1' as T;
      } else if (hasEvenDigits(num)) {
        const [left, right] = splitNumber(num);
        current.value = left as T;
        const newNode = new Node(right as T);
        newNode.next = current.next;
        current.next = newNode;
        current = newNode;
        this.length++;
      } else { 
        current.value = (num * BigInt(2024)).toString() as T;
      }
      current = current.next;
    }
  }

  getLength = () => this.length;
}

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");
  const startTime = performance.now();

  const nums = input[0].split(" ").map(Number);
  const linkedList = new LinkedList<number>();
  nums.forEach((num) => linkedList.append(num));

  for (let i = 0; i < 25; i++) {
    linkedList.transformStones();
  }
 
  const endTime = performance.now();
  shout(`Length: ${linkedList.getLength()}`);
  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(3)} s`);
};

