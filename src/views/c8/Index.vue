<template>
  <div></div>
</template>

<script setup lang="ts">
@decorator
class A {
  @decorator
  name: string = "A";

  @decorator
  say(words) {
    console.log(`A say:`, words);
  }

  @decorator
  get age() {
    return 12;
  }
}

function decorator(target, key, descriptor) {
  console.log(`decorator:`, target, key, descriptor, target === A);
}

const a = new A();

function readonly(target, key, descriptor) {
  descriptor.writable = false;
}

class B {
  @readonly
  name: string = "B";
}

const b = new B();
b.name = "C";
</script>
