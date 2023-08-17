var a, b;
function _faceless_all_keys(o) {
  let _keys = [],
    l;
  while (1) {
    l = Object.keys(o);
    _keys = _keys.concat(l);
    o = o.__proto__;
    if (!l.length) {
      break;
    }
  }
  return _keys;
}
a = {
  a: 0,
  b: 1
}.a;
b = {
  a: 0,
  b: 1
}.b; // 测试代码
console.log(a, b);
c = [2, 3][0];
d = [2, 3][1];
console.log(c, d);
let arr = {
  a: 0,
  b: 1,
  c: 2
};
let pro = {
  d: 3,
  e: 4
};
arr.__proto__ = pro;
for (let _F_i = 0, _F_li = _faceless_all_keys(arr); _F_i < _F_li.length; _F_i++) {
  let element = _F_li[_F_i];
  console.log(element);
}
const set = new Set([1, 2, 3]);
for (let _F_iterator = set[Symbol.iterator](), _F_i = _F_iterator.next(); !_F_i.done; _F_i = _F_iterator.next()) {
  let element = _F_i.value;
  console.log(element);
}
const str = 'Hello';
for (let _F_iterator = str[Symbol.iterator](), _F_i = _F_iterator.next(); !_F_i.done; _F_i = _F_iterator.next()) {
  let char = _F_i.value;
  console.log(char);
}
(0, 0, function (x) {
  console.log(x);
})(123);