<template>
  <div></div>
</template>

<script setup lang="ts">
interface IPerson {
  name: string;
  age: number;
  sayHi(otherName: string): void;
}

class Person implements IPerson {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHi(otherName: string) {
    console.log(`Hi, ${otherName}`);
  }
}

const p1 = new Person("张三", 12);
p1.sayHi('李四')
</script>
