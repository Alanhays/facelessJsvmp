// 测试代码
var {a, b} = {a: 0, b: 1};
console.log(a, b);
[c, d] = [2, 3];
console.log(c, d);
let arr = {a: 0, b: 1, c: 2}
let pro = {d: 3, e: 4}
arr.__proto__ = pro;
for (const element in arr) {
    console.log(element)
}
const set = new Set([1, 2, 3]);
for (let element of set) {
    console.log(element);
}
const str = 'Hello';
for (let char of str) {
    console.log(char);
}

(0, 0, function (x) {
    console.log(x)
})(123)