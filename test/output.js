(function interpreter(parentScope, index, stack, constantPool, bytecode, option = {}, args) {
  let localScope = {};
  localScope[constantPool[0]] = option.t || this;
  localScope[constantPool[1]] = args;
  if (option.n) localScope[option.n] = parentScope[option.f];
  localScope.__proto__ = parentScope;
  function getScope(scope, name) {
    if (!scope || name == constantPool[2]) return null;
    if (scope.hasOwnProperty(name)) return scope;
    return getScope(Object.getPrototypeOf(scope), name);
  }
  if (option.e) {
    localScope[constantPool[bytecode[index + 1]]] = option.e;
  }
  while (index < bytecode.length) {
    let t0, t1, t2, t3, t4, t5;
    let instruction = bytecode[index++];
    if (instruction == 3) {
      t0 = bytecode[index++];
      t1 = constantPool[t0];
      localScope[t1] = undefined;
    }
    if (instruction == 13) {
      stack.push(window);
    }
    if (instruction == 19) {
      t2 = bytecode[index++];
      t3 = bytecode[index++];
      t4 = bytecode[index++];
      t5 = bytecode[index++];
      try {
        t1 = interpreter(localScope, t3, stack, constantPool, bytecode, {
          t: localScope[constantPool[0]]
        });
        if (t1 > 0) {
          if (option.r) {
            return stack.pop();
          }
          return t1;
        }
      } catch (e) {
        t1 = interpreter(localScope, t4, stack, constantPool, bytecode, {
          t: localScope[constantPool[0]],
          e: e
        });
        if (t1 > 0) {
          if (option.r) {
            return stack.pop();
          }
          return t1;
        }
      } finally {
        t1 = interpreter(localScope, t5, stack, constantPool, bytecode, {
          t: localScope[constantPool[0]]
        });
        if (t1 > 0) {
          if (option.r) {
            return stack.pop();
          }
          return t1;
        }
      }
      index = t2;
    }
    if (instruction == 12) {
      stack.push(localScope);
    }
    if (instruction == 16) {
      return;
    }
    if (instruction == 28) {
      stack.push({});
    }
    if (instruction == 14) {
      t0 = bytecode[index++];
      t1 = interpreter(localScope, index, stack, constantPool, bytecode, {
        t: localScope[constantPool[0]]
      });
      if (t1 === undefined) {
        index = t0;
      } else {
        if (option.r) {
          return stack.pop();
        }
        return t1;
      }
    }
    if (instruction == 27) {
      t0 = stack.pop();
      t1 = typeof t0;
      t5 = bytecode[index++];
      if (t5) stack.push(t1);
    }
    if (instruction == 58) {
      t0 = stack.pop();
      t1 = !t0;
      t5 = bytecode[index++];
      if (t5) stack.push(t1);
    }
    if (instruction == 32) {
      t0 = stack.pop();
      t1 = void t0;
      t5 = bytecode[index++];
      if (t5) stack.push(t1);
    }
    if (instruction == 30) {
      t0 = bytecode[index++];
      t1 = [];
      for (t2 = 0; t2 < t0; t2++) {
        t3 = stack.pop();
        t1.unshift(t3);
      }
      t5 = bytecode[index++];
      if (t5) stack.push(t1);
    }
    if (instruction == 11) {
      if (option.r) {
        return stack.pop();
      }
      return bytecode[index++];
    }
    if (instruction == 8) {
      t0 = stack.pop();
      t1 = stack.pop();
      t2 = bytecode[index++];
      if (t1 == -1) t1 = t2;
      t1 = t0[t1];
      index = t1;
    }
    if (instruction == 57) {
      t0 = stack.pop();
      t1 = ~t0;
      t5 = bytecode[index++];
      if (t5) stack.push(t1);
    }
    if (instruction == 23) {
      t0 = stack.pop();
      t1 = stack.pop();
      t3 = new RegExp(t1, t0);
      stack.push(t3);
    }
    if (instruction == 31) {
      t0 = stack.pop();
      t1 = stack.pop();
      t2 = bytecode[index++];
      args = [];
      for (t3 = 0; t3 < t2; t3++) args.unshift(stack.pop());
      t4 = new t1[t0](...args);
      t5 = bytecode[index++];
      if (t5) stack.push(t4);
    }
    if (instruction == undefined) {
      throw new Error("当前指令不存在，请检查指令集!");
    }
    if (instruction == 5) {
      t0 = constantPool[bytecode[index++]];
      t1 = localScope;
      t2 = t1[t0];
      t5 = bytecode[index++];
      if (t5) stack.push(t2);
    }
    if (instruction == 2) {
      t0 = bytecode[index++];
      t1 = stack.pop();
      t2 = stack.pop();
      args = [];
      for (t3 = 0; t3 < t0; t3++) args.unshift(stack.pop());
      if (t2 === 0) {
        t4 = t1.apply(localScope, args);
      } else {
        t4 = t2[t1].apply(t2, args);
      }
      t5 = bytecode[index++];
      if (t5) stack.push(t4);
    }
    if (instruction == 15) {
      t0 = bytecode[index++];
      t1 = interpreter(localScope, index, stack, constantPool, bytecode, {
        t: localScope[constantPool[0]]
      });
      if (!t1) {
        index = t0;
      } else {
        if (t1 === 1) {
          return;
        } else {
          if (option.r) {
            return stack.pop();
          }
          return t1;
        }
      }
    }
    if (33 < instruction && instruction < 57) {
      t0 = stack.pop();
      t1 = stack.pop();
      if (instruction == 45) {
        t2 = t1 == t0;
      }
      if (instruction == 40) {
        t2 = t1 || t0;
      }
      if (instruction == 44) {
        t2 = t1 <= t0;
      }
      if (instruction == 51) {
        t2 = t1 + t0;
      }
      if (instruction == 54) {
        t2 = t1 / t0;
      }
      if (instruction == 39) {
        t2 = t1 | t0;
      }
      if (instruction == 48) {
        t2 = t1 !== t0;
      }
      if (instruction == 35) {
        t2 = t1 in t0;
      }
      if (instruction == 43) {
        t2 = t1 >= t0;
      }
      if (instruction == 47) {
        t2 = t1 === t0;
      }
      if (instruction == 55) {
        t2 = t1 % t0;
      }
      if (instruction == 41) {
        t2 = t1 & t0;
      }
      if (instruction == 56) {
        t2 = t1 ^ t0;
      }
      if (instruction == 46) {
        t2 = t1 != t0;
      }
      if (instruction == 37) {
        t2 = t1 >> t0;
      }
      if (instruction == 38) {
        t2 = t1 << t0;
      }
      if (instruction == 34) {
        t2 = t1 instanceof t0;
      }
      if (instruction == 50) {
        t2 = t1 > t0;
      }
      if (instruction == 36) {
        t2 = t1 >>> t0;
      }
      if (instruction == 53) {
        t2 = t1 * t0;
      }
      if (instruction == 42) {
        t2 = t1 && t0;
      }
      if (instruction == 49) {
        t2 = t1 < t0;
      }
      if (instruction == 52) {
        t2 = t1 - t0;
      }
      t3 = bytecode[index++];
      if (t3) stack.push(t2);
    }
    if (instruction == 29) {
      t0 = stack.pop();
      t1 = stack.pop();
      t2 = stack.pop();
      t2[t1] = t0;
      t5 = bytecode[index++];
      if (t5) stack.push(t2);
    }
    if (instruction == 0) {
      t0 = stack.pop();
      t1 = stack.pop();
      t2 = stack.pop();
      t4 = bytecode[index++];
      t3 = getScope(t1, t0) || t1;
      t3[t0] = t2;
      if (t4) stack.push(t2);
    }
    if (instruction == 6) {
      t0 = bytecode[index++];
      index = t0;
    }
    if (instruction == 26) {
      t0 = bytecode[index++];
      t1 = stack.pop();
      t2 = stack.pop();
      t3 = getScope(t2, t1) || t2;
      t4 = !t0 ? t3[t1]-- : --t3[t1];
      t5 = bytecode[index++];
      if (t5) stack.push(t4);
    }
    if (instruction == 24) {
      debugger;
    }
    if (instruction == 18) {
      t0 = stack.pop();
      t0 = Number(t0);
      if (t0 == NaN) t0 = -1;
      stack.push(t0);
    }
    if (instruction == 4) {
      t0 = bytecode[index++];
      stack.push(constantPool[t0]);
    }
    if (instruction == 1) {
      t0 = stack.pop();
      t1 = stack.pop();
      t5 = bytecode[index++];
      if (t5) stack.push(t1[t0]);
    }
    if (instruction == 20) {
      throw stack.pop();
    }
    if (instruction == 21) {
      stack.push(`${stack.pop()}`);
    }
    if (instruction == 25) {
      t0 = bytecode[index++];
      t1 = stack.pop();
      t2 = stack.pop();
      t3 = getScope(t2, t1) || t2;
      t4 = !t0 ? t3[t1]++ : ++t3[t1];
      t5 = bytecode[index++];
      if (t5) stack.push(t4);
    }
    if (instruction == 17) {
      t0 = bytecode[index++];
      t1 = stack.pop();
      for (t2 = 0; t2 < t0; t2++) stack.pop();
      t5 = bytecode[index++];
      if (t5) stack.push(t1);
    }
    if (instruction == 33) {
      t0 = stack.pop();
      t1 = stack.pop();
      t2 = delete t1[t0];
      t5 = bytecode[index++];
      if (t5) stack.push(t2);
    }
    if (instruction == 10) {
      t0 = bytecode[index++];
      if (!args) args = [].concat(stack);
      for (t1 = t0; t1 >= 0; t1--) {
        t2 = stack.pop();
        localScope[t2] = args[t1];
      }
    }
    if (instruction == 9) {
      t0 = stack.pop();
      t1 = bytecode[index++];
      t2 = bytecode[index++];
      t3 = stack[stack.length - 1];
      t4 = function () {
        return interpreter(localScope, t1, stack, constantPool, bytecode, {
          t: this,
          n: t0,
          f: t0 || t3,
          r: 1
        }, arguments);
      };
      if (t2) {
        stack.push(t4);
      } else {
        localScope[t0] = t4;
      }
    }
    if (instruction == 22) {
      t0 = bytecode[index++];
      t2 = "";
      for (t1 = 0; t1 < t0; t1++) {
        t2 += stack.pop();
      }
      t5 = bytecode[index++];
      if (t5) stack.push(t2);
    }
    if (instruction == 7) {
      t0 = stack.pop();
      t1 = bytecode[index++];
      if (!t0) index = t1;
    }
  }
})(typeof window !== 'undefined' ? window : (window = global, window), 0, [],["@faceless","arguments","__proto__","a","b","_faceless_all_keys","o","_keys","l",1,"Object","keys","concat","length",0,"console","log",2,3,"c","d","arr","pro","e",4,"_F_i","_F_li","element","set","Set","_F_iterator","Symbol","iterator","next","done","value","str","Hello","char",123,"x"], [3,3,3,4,4,5,9,11,0,6,117,4,6,10,0,3,7,30,0,1,12,4,7,0,0,3,8,14,111,15,108,4,9,7,106,5,6,1,12,4,10,1,1,4,11,2,1,1,12,4,8,0,0,5,8,1,12,4,7,1,1,4,12,2,1,1,12,4,7,0,0,12,4,6,1,1,4,2,1,1,12,4,6,0,0,12,4,8,1,1,4,13,1,1,58,1,7,105,14,103,11,1,16,6,105,16,11,1,6,29,16,5,7,1,11,2,16,28,4,3,4,14,29,1,4,4,4,9,29,1,4,3,1,1,12,4,3,0,1,17,0,0,28,4,3,4,14,29,1,4,4,4,9,29,1,4,4,1,1,12,4,4,0,1,17,0,0,5,3,1,5,4,1,12,4,15,1,1,4,16,2,2,0,4,17,4,18,30,2,1,4,14,1,1,13,4,19,0,0,4,17,4,18,30,2,1,4,9,1,1,13,4,20,0,0,5,19,1,5,20,1,12,4,15,1,1,4,16,2,2,0,3,21,28,4,3,4,14,29,1,4,4,4,9,29,1,4,19,4,17,29,1,12,4,21,0,0,3,22,28,4,20,4,18,29,1,4,23,4,24,29,1,12,4,22,0,0,5,22,1,12,4,21,1,1,4,2,0,0,14,378,3,25,4,14,12,4,25,0,0,3,26,5,21,1,12,4,5,2,1,1,12,4,26,0,0,15,369,5,25,1,12,4,26,1,1,4,13,1,1,49,1,7,367,3,27,12,4,26,1,1,12,4,25,1,1,1,1,12,4,27,0,0,5,27,1,12,4,15,1,1,4,16,2,1,0,16,11,1,12,4,25,25,0,0,6,316,16,3,28,4,9,4,17,4,18,30,3,1,12,4,29,31,1,1,12,4,28,0,0,14,508,3,30,12,4,28,1,1,12,4,31,1,1,4,32,1,1,2,0,1,12,4,30,0,0,3,25,12,4,30,1,1,4,33,2,0,1,12,4,25,0,0,15,490,12,4,25,1,1,4,34,1,1,58,1,7,488,3,27,12,4,25,1,1,4,35,1,1,12,4,27,0,0,5,27,1,12,4,15,1,1,4,16,2,1,0,16,11,1,12,4,30,1,1,4,33,2,0,1,12,4,25,0,0,6,443,16,3,36,4,37,12,4,36,0,0,14,625,3,30,12,4,36,1,1,12,4,31,1,1,4,32,1,1,2,0,1,12,4,30,0,0,3,25,12,4,30,1,1,4,33,2,0,1,12,4,25,0,0,15,607,12,4,25,1,1,4,34,1,1,58,1,7,605,3,38,12,4,25,1,1,4,35,1,1,12,4,38,0,0,5,38,1,12,4,15,1,1,4,16,2,1,0,16,11,1,12,4,30,1,1,4,33,2,0,1,12,4,25,0,0,6,560,16,4,39,4,14,4,14,4,14,4,14,9,640,1,6,658,4,40,10,0,5,40,1,12,4,15,1,1,4,16,2,1,0,16,17,2,1,2,1,0])