<template></template>

<script setup lang="ts">
class DataIterator {
  private data: number[];
  private index = 0;
  constructor(container: DataContainer) {
    this.data = container.data;
  }

  hasNext(): boolean {
    return this.index < this.data.length;
  }

  next() {
    return {
      value: this.data[this.index++],
      done: !this.hasNext(),
    };
  }
}

class DataContainer {
  data: number[] = [];
  constructor(data: number[]) {
    this.data = data;
  }
  getIterator() {
    return new DataIterator(this);
  }
}

const arr = [10, 20, 30, 40];
const data = new DataContainer(arr);
const it = data.getIterator();
while (it.hasNext()) {
  console.log(it.next());
}
console.log(it.next());

console.log(`----- Array 内置迭代器----------`);

// 内置迭代器
const arr2 = [10, 20, 30, 40];
const iterator = arr2[Symbol.iterator]();
console.log(`arr2 iterator:`, iterator);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); // {value: undefined, done: true}

console.log(`----- Map 内置迭代器----------`);
const map = new Map();
map.set("name", "张三");
map.set("age", 12);
const mapIt = map[Symbol.iterator]();
console.log(mapIt.next());
console.log(mapIt.next());
console.log(map.entries()) 
// MapIterator {'name' => '张三', 'age' => 12}
console.log(map.entries().forEach) // undefined
</script>
