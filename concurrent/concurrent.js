function* map(f, iter) {
  for (const a of iter) {
    yield a instanceof Promise ? a.then(f) : f(a);
  }
}

function* chunk(iter, n) {
  let cur = [];
  for (const a of iter) {
    cur.push(a);
    if (cur.length === n) {
      yield cur;
      cur = [];
    }
  }
  return cur;
}

async function reduceAsync(f, acc, iter) {
  for await (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
}

const concur = async (fs, n) =>
  await reduceAsync((acc, cur) => [...acc, ...cur], [],
    map(_chunk => Promise.all(
      map(f => f(), _chunk)),
        chunk(fs, n)));

const fetchByUrl = url => new Promise((resolve, reject) =>
  fetch(url)
    .then(res => res.ok ? resolve(res.json()): reject(res)));

const tasks = [
  () => fetchByUrl('https://jsonplaceholder.typicode.com/todos/1'),
  () => fetchByUrl('https://jsonplaceholder.typicode.com/todos/2'),
  () => fetchByUrl('https://jsonplaceholder.typicode.com/todos/3'),
  () => fetchByUrl('https://jsonplaceholder.typicode.com/todos/4'),
  () => fetchByUrl('https://jsonplaceholder.typicode.com/todos/invalid'),
  () => fetchByUrl('https://jsonplaceholder.typicode.com/todos/6'),
  () => fetchByUrl('https://jsonplaceholder.typicode.com/todos/7'),
];

concur(tasks, 2)
  .then(res => console.log('🎉', res))
  .catch(err => console.log('😱', err));
