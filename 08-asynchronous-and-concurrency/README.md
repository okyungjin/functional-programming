# 비동기, 동시성 프로그래밍
- [06. C.reduce, C.take](#06-creduce-ctake)
  - [Promise.reject와 오류 메세지](#promisereject와-오류-메세지)
  - [Promise.reject를 catch할 때 주의점](#promisereject를-catch할-때-주의점)

<br>

## 06. C.reduce, C.take
### Promise.reject와 오류 메세지
Promise.reject이 된 후에 catch를 하려고 해도 이미 오류 메세지는 출력된 상태이다.
**나는 비동기 처리를 하면서 catch 할거니까 신경쓰지마**라고 프로미스에게 알려주고 싶을 땐 어떻게 작성해야 할까?

```js
const C = {};
function noop() {}

// Promise.reject로 인한 오류를 출력하지 않도록 한다.
const catchNoop = arr =>
  (arr.forEach(a => a instanceof Promise ? a.catch(noop) : a), arr);

C.reduce = curry((f, acc, iter) => {
  const iter2 = catchNoop(iter ? [...iter] : [...acc]);
  return iter
    ? reduce(f, acc, iter2)
    : reduce(f, iter2)
});
```

<br>

### Promise.reject를 catch할 때 주의점

catch를 완료한 프로미스를 반환하면 그 프로미스는 더 이상 catch할 수 없다. (이미 catch가 완료되었기 때문에)
```js
let a = Promise.reject('hi');
a = a.catch(a => a);
// 아래 코드와 같음
// let a = Promise.reject('hi').catch(a => a);

a.catch(a => console.log(a)); // catch 불가능
```
catch한 프로미스를 반환하지 않고 catch를 달아준다.
```js
const a = Promise.reject('hi');
a.catch(a => a); // Promise.reject로 인한

// 언제든 catch 가능
a.catch(a => console.log('해결', a));
```

