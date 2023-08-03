# 状态模式

## 定义和作用

状态模式是一种行为设计模式，它是将多种状态封装成独立的类，并将请求委托给当前的状态对象，当对象的内部状态改变时，会带来不同的行为变化。

## 特点和优缺点

它的特点是将不同的状态隔离，每个状态都是一个类，使得状态变化时，可以独立改变状态对象，而不是在一个类中堆砌各种状态的判断逻辑，避免了复杂的条件分支语句。

优点是将不同的状态隔离，每个状态都是一个类，使得状态变化时，可以独立改变状态对象，而不是在一个类中堆砌各种状态的判断逻辑，避免了复杂的条件分支语句。

缺点是会导致类的数量增加，系统中会增加很多状态类，使得代码结构更加复杂。

## 类图

```
+----------------+        +----------------+
|   Context      |        |     State      |
+----------------+        +----------------+
| -state: State  | 1    * | +handle(): void |
+----------------+        +----------------+
        △                        △
        |                        |
        |                        |
+-------|------------------------|-------+
|       |                        |       |
|       |                        |       |
|       |                        |       |
+-------|------------------------|-------+
        |                        |
+----------------+        +----------------+
|   ConcreteState1|        | ConcreteState2 |
+----------------+        +----------------+
| +handle(): void|        | +handle(): void|
+----------------+        +----------------+
```

每种状态是一个类，如 ConcreteState1、ConcreteState2，它们内部有对应的 handle 行为。 Context 是一个环境角色，它的作用是串联各个状态的过渡，在 Context 内部会维护一个当前状态，当状态发生改变时，Context 会根据当前状态调用不同的方法。

> 结构和组成部分：上下文类、状态类。

## 代码实现

```js
// 状态接口
class State {
  constructor() {
    this.stateName = '';
  }

  handle(context) {}
}

// 具体状态类：订单创建状态
class CreatedState extends State {
  constructor() {
    super();
    this.stateName = 'created';
  }

  handle(context) {
    console.log('订单已创建');
    context.setState(new PaidState());
  }
}

// 具体状态类：订单已支付状态
class PaidState extends State {
  constructor() {
    super();
    this.stateName = 'paid';
  }

  handle(context) {
    console.log('订单已支付');
    context.setState(new ShippedState());
  }
}

// 具体状态类：订单已发货状态
class ShippedState extends State {
  constructor() {
    super();
    this.stateName = 'shipped';
  }

  handle(context) {
    console.log('订单已发货');
    context.setState(new CompletedState());
  }
}

// 具体状态类：订单已完成状态
class CompletedState extends State {
  constructor() {
    super();
    this.stateName = 'completed';
  }

  handle(context) {
    console.log('订单已完成');
  }
}

// 上下文类：订单
class Order {
  constructor() {
    this.state = new CreatedState();
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  create() {
    console.log('订单已创建，不能重复创建');
  }

  pay() {
    this.state.handle(this);
  }

  ship() {
    console.log('订单未支付，不能发货');
  }

  complete() {
    console.log('订单未发货，不能完成');
  }
}

// 测试代码
const order = new Order();
order.create();
order.pay();
order.ship();
order.complete();
```

## 案例分析

### Redux 中的状态模式

Redux 是一个流行的JavaScript状态管理库，它使用状态模式来管理应用程序的状态。Redux的状态模式包含三个部分：store、action 和 reducer。

- store：存储应用程序的状态，提供 getState() 和 dispatch() 方法，用于获取和更新状态。
- action：描述状态的变化，是一个包含 type 属性的普通 JavaScript 对象。
- reducer：根据 action 更新状态，是一个纯函数，接收当前状态和 action 作为参数，返回新的状态。

下面是一个简单的 Redux 状态模式示例：

```js
import { createStore } from 'redux';

// 定义action类型
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// 定义action创建函数
let nextTodoId = 0;
const addTodo = (text) => ({
  type: ADD_TODO,
  id: nextTodoId++,
  text
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
});

// 定义reducer函数
const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

// 创建store
const store = createStore(todos);

// 订阅store的变化
store.subscribe(() => {
  console.log(store.getState());
});

// 分发action
store.dispatch(addTodo('Learn Redux'));
store.dispatch(toggleTodo(0));
```


状态模式和 Redux 的状态模式有很多相似之处，它们都是将状态封装成独立的类，当状态发生改变时，会带来不同的行为变化。但是它们也有一些不同之处：

- 状态模式中的 Context 是一个环境角色，它的作用是串联各个状态的过渡，而 Redux 中的 store 是一个存储角色，它的作用是存储应用程序的状态。
- 状态模式中的状态类是可变的，它们内部会改变 Context 的状态，而 Redux 中的 reducer 是一个纯函数，它不会改变 store 的状态，而是返回一个新的状态。
- 状态模式中的状态类是相互独立的，它们之间没有任何联系，而 Redux 中的 reducer 是一个纯函数，它可以访问和修改整个 store 的状态。

## 比较

状态模式和策略模式都是行为型设计模式，它们的目的都是将算法封装成独立的类，使得算法可以独立于客户端而变化。但是，它们之间有以下几个区别：

1. 目的不同：状态模式的目的是封装对象的状态，并将状态的变化委托给不同的状态类处理；而策略模式的目的是封装算法，并将算法的选择委托给客户端。
2. 上下文对象的角色不同：在状态模式中，上下文对象负责维护状态，并将状态的处理委托给当前状态对象；而在策略模式中，上下文对象负责维护策略，并将策略的选择委托给客户端。
3. 状态转移的方式不同：在状态模式中，状态的转移是由状态类控制的，上下文对象只需要将状态的处理委托给当前状态对象即可；而在策略模式中，策略的选择是由客户端控制。
4. 状态模式中状态类之间的转移是固定的，而策略模式中算法之间的选择是动态的。



