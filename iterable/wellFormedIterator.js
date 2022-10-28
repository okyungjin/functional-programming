const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      /**
       * iterator가 `[Symbol.iterator]()`를 실행했을 때 자기 자신을 반환하도록 한다.
       * 이러한 형태를 well formed iterator라고 한다.
       * iterable 자체로도 순회를 할 수 있고, iterator로 순회를 할 수도 있다.
       * iterator로 일부를 진행 시키다가, 나머지를 for of로 순회할 수 있다.
       */
      [Symbol.iterator]() {
        return this;
      }
    }
  }
};

let iterator = iterable[Symbol.iterator]();
iterator.next();
iterator.next();
for (const a of iterator) console.log(a);

/**
 * js의 내장 객체만 iterable/iterator 프로토콜을 따르는 것은 아니다.
 * immutable js와 같은 오픈소스도 이 프로토콜을 따르도록 되어있다.
 * Web APIs 또한 이 프로토콜을 따라서 다음과 같이 순회가 가능하다.
 */
for (const a of document.querySelectorAll('*')) console.log(a);
const all = document.querySelectorAll('*');
const iter3 = all[Symbol.iterator]();
console.log(iter3.next());
console.log(iter3.next());
console.log(iter3.next());
// ...
