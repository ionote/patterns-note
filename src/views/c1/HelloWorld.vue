<template>
    <div>hello world: {{ name }}</div>
    <div>slot: <slot a="1" b="2" c="3"></slot></div>
</template>

<script>
import { onMounted, ref, toRefs, toRef } from "vue";
export default {
  props: {
    name: {
      type: String,
      default: () => "lisi",
    },
    //Extraneous non-props attributes (age) were passed to component but could not be automatically
    // age 没有使用会被警告, 可以使用 inheritAttrs 或者参数传递使用对象形式
  },
  inheritAttrs: false, // 不会将 attrs 作为 props 传递给子组件
  onBeforeUpdate(){
    console.log('arguments', arguments)
  },
  setup(props, context) {
    // 设置 props 不会触发视图更新
    console.log("setup props", props);
    // props.title = "title22"; // 无效
    // {attrs, slots, emit, expose}
    console.log("setup context", context); // 非响应式的
    console.log("context.attrs", context.attrs); // props 里没用到的属性 {age: '12'}
    console.log("context.slots", context.slots); // props 里没用到的属性 {age: '12'}

    const count = ref(12);
    context.expose({
      count
    })
  },
};
</script>
