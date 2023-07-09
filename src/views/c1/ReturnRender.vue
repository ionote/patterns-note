<script>
import { onMounted, ref, toRefs, toRef, h } from "vue";
export default {
  setup(props, { expose }) {
    const count = ref(0);
    const plus = () => {
      count.value++;
    };

    expose({ plus });
    return () =>
      h(
        "div",
        {
          onClick: plus,
          className: "classA",
          bb: "bb",
          style: {
            color: "red",
          },
        },
        "count:",
        count.value
      );
  },
};
</script>
