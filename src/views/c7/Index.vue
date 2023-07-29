<template>
  <div>
    <div class="list">
      <div>1</div>
      <div>2</div>
      <div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

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
console.log(map.entries());
// MapIterator {'name' => '张三', 'age' => 12}
console.log(map.entries().forEach); // undefined

console.log(`-------- yield ------------`);
function* gen() {
  yield [1, 2, 3];
}
for (let o of gen()) {
  console.log(o); // [1, 2, 3]
}

console.log(`------------遍历DOM树-------------------`);
function* traverse(elemList) {
  for (const elem of elemList) {
    yield elem;
    if (elem.children.length > 0) {
      yield* traverse(elem.children);
    }
  }
}

onMounted(() => {
  const elems = traverse(document.querySelectorAll(".list"));
  for (const elem of elems) {
    console.log(elem);
  }
});
</script>
