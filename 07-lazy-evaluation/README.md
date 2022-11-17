# 지연성
- [L.range, L.map, L.filter, take 의 평가 순서](#lrange-lmap-lfilter-take-의-평가-순서)
- [즉시 평가 함수 vs 지연 평가 함수](#즉시-평가-함수-vs-지연-평가-함수)

## L.range, L.map, L.filter, take 의 평가 순서
`take`, `L.filter`, `L.map`, `L.range`에 breakpoint가 설정되어 있다면, 어떤 함수에 가장 먼저 걸릴까?  
```js
go(L.range(10),
  L.map(n => n + 10),
  L.filter(n => n % 2),
  take(2),
  log);
```
**정답: `take`** <br>
(`take`, `L.filter`, `L.map`, `L.range` 순으로 실행되는 것처럼 보인다.)

<br>

## 즉시 평가 함수 vs 지연 평가 함수
<table>
<thead>
  <tr>
    <th></th>
    <th>즉시 평가되는 함수</th>
    <th>지연 평가되는 함수 (제너레이터 / 이터레이터 방식으로 만들어진 함수)</th>
  </tr>
</thead>
<tbody>
  <tr>
<th>코드</th>
<td>

```js
go(range(10),
  map(n => n + 10),
  filter(n => n % 2),
  take(2),
  log);
```
</td>
<td>

```js
go(L.range(10),
  L.map(n => n + 10),
  L.filter(n => n % 2),
  take(2),
  log);
```
</td>
</tr>

<tr>
  <th>방향</th>
  <td style="text-align: center">⬇️</td>
  <td style="text-align: center">⬆️</td>
</tr>

<tr>
<th>과정</th>
<td>

1. `range` 10개짜리 배열을 다 만들고
2. `map` 모두 10을 더하고
3. `filter` 모두 확인하면서 필터링한 값을 만들어서
4. `take` 그 값이 take에 들어감
</td>
<td>

1. `take` 하나를 take하려고 하니까 위로 올라가서
2. `L.filter` 필터링 할거를 `L.map`에서 찾는다
3. `L.map` map 할거를 `L.range`에서 찾는다
4. `L.range`는 처음 값인 0을 준다
</td>
</tr>

<tr>
<th>데이터</th>
<td>

```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
[11, 13, 15, 17, 19]
[11, 13]
```
</td>
<td>

```
0       1     ...
10      11    ...
false   true  ...
        take!
```
</td>
</tr>

</tbody>
</table> 


