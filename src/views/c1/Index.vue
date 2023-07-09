<template>
  <div>
    <HelloWorld :name="name" age="12" ref="helloworld">
      <template #default="slotProps">
        <div>slotProps: {{ slotProps }}</div>
      </template>
    </HelloWorld>
    title:{{ title }} <br />
    count: <button ref="button" @click="count++">{{ count }}</button>

    <h2>返回渲染函数</h2>
    <ReturnRender ref="returnRender"></ReturnRender>
    增加: <button @click="rrPlus">增加</button>
  </div>
</template>

<script>
import { onMounted, ref, toRefs, toRef } from "vue";
import HelloWorld from "./HelloWorld.vue";
import ReturnRender from "./ReturnRender.vue";
export default {
  components: {
    HelloWorld,
    ReturnRender,
  },
  props: {
    title: {
      type: String,
      default: () => "title1",
    },
  },
  // 1. setup 返回值会暴露给模板和其他的选项式 API 钩子
  // 2. setup 是在 beforeCreate 之后 created 之前执行的, 所以在 setup 中无法访问到 props, data, methods, computed 和 watch，setup 中的 this 指向 undefined
  // 3. 可以在选项式 API 中使用 setup 暴露的值, 但是反过来不行
  // 4. setup 应同步返回一个对象或者返回一个函数, 如果返回一个函数, 则会被当作 render 函数使用，唯一可以 async setup 的情况是，这个组件是 Suspense 的子组件
  // setup 第一个参数是 props(响应式的，变化后组件会更新), 第二个参数是 context
  // 不要解构 props, 因为解构会使得 props 不再是响应式的
  setup(props, context) {
    // 设置 props 不会触发视图更新
    console.log("setup props", props);
    // props.title = "title22"; // 无效

    // {attrs, slots, emit, expose}
    console.log("setup context", context); // 非响应式的

    const count = ref(0);
    let name = ref("zhangsan");
    let { title } = toRefs(props);
    // let { title } = toRef(props, 'title');
    const helloworld = ref(null);

    onMounted(() => {
      // 组件内部修改 props 不会触发视图更新, 是只读的  target is readonly
      // props.title = "title22"; // 无效
      // title.value = 'title22' // 无效
      setTimeout(() => {
        name.value = "wangwu";
      }, 3000);

      console.log("helloworld", helloworld.value.count);
    });

    const returnRender = ref(null)

    const rrPlus = () => {
      returnRender.value.plus();
    };

    return {
      count,
      title,
      name,
      helloworld,
      returnRender,
      rrPlus,
    };
  },
  mounted() {
    console.log("this.count", this.count);

    console.log("this.$refs.helloworld.count", this.$refs.helloworld.count);
  },
};
</script>
