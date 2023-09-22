// path:/pass/MD5.js  MD5反编译示例
require("../tools/babelPlugins");
let body = [];
(function interpreter(parentScope, index, stack, constantPool, bytecode, option = {}, args, body, params, isIf) {
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
        if ([4, 9, 6, 12, 1, 2, 3, 0, 5, 10, 7, 17, 14, 15, 16, 25, 11, 18, 57].indexOf(instruction) === -1) {
            if (!(33 < instruction && instruction < 57)) {
                console.log("未反编译指令", instruction)
                debugger
            }
        }

        if (instruction == 4) {
            t0 = bytecode[index++];
            stack.push(types.valueToNode(constantPool[t0]));
        }
        if (instruction == 58) {
            t0 = stack.pop();
            t1 = !t0;
            t5 = bytecode[index++];
            if (t5) stack.push(t1);
        }
        if (instruction == 3) {
            t0 = bytecode[index++];
            t1 = constantPool[t0];
            localScope[t1] = undefined;
            body.push(types.VariableDeclaration("var", [
                types.VariableDeclarator(types.Identifier(t1), null)
            ]))
        }
        if (instruction == 27) {
            t0 = stack.pop();
            t1 = typeof t0;
            t5 = bytecode[index++];
            if (t5) stack.push(t1);
        }
        if (33 < instruction && instruction < 57) {
            t0 = stack.pop();
            t1 = stack.pop();
            if (instruction == 45) {
                t2 = t1 == t0;
                t2 = types.BinaryExpression("==", t1, t0)
            }
            if (instruction == 42) {
                t2 = t1 && t0;
                t2 = types.BinaryExpression("&&", t1, t0)
            }
            if (instruction == 56) {
                t2 = t1 ^ t0;
                t2 = types.BinaryExpression("^", t1, t0)
            }
            if (instruction == 54) {
                t2 = t1 / t0;
                t2 = types.BinaryExpression("/", t1, t0)
            }
            if (instruction == 48) {
                t2 = t1 !== t0;
                t2 = types.BinaryExpression("!==", t1, t0)
            }
            if (instruction == 38) {
                t2 = t1 << t0;
                t2 = types.BinaryExpression("<<", t1, t0)
            }
            if (instruction == 53) {
                t2 = t1 * t0;
                t2 = types.BinaryExpression("*", t1, t0)
            }
            if (instruction == 51) {
                t2 = t1 + t0;
                t2 = types.BinaryExpression("+", t1, t0)
            }
            if (instruction == 40) {
                t2 = t1 || t0;
                t2 = types.BinaryExpression("||", t1, t0)
            }
            if (instruction == 43) {
                t2 = t1 >= t0;
                t2 = types.BinaryExpression(">=", t1, t0)
            }
            if (instruction == 39) {
                t2 = t1 | t0;
                t2 = types.BinaryExpression("|", t1, t0)
            }
            if (instruction == 49) {
                t2 = t1 < t0;
                t2 = types.BinaryExpression("<", t1, t0)
            }
            if (instruction == 44) {
                t2 = t1 <= t0;
                t2 = types.BinaryExpression("<=", t1, t0)
            }
            if (instruction == 37) {
                t2 = t1 >> t0;
                t2 = types.BinaryExpression(">>", t1, t0)
            }
            if (instruction == 55) {
                t2 = t1 % t0;
                t2 = types.BinaryExpression("%", t1, t0)
            }
            if (instruction == 41) {
                t2 = t1 & t0;
                t2 = types.BinaryExpression("&", t1, t0)
            }
            if (instruction == 46) {
                t2 = t1 != t0;
                t2 = types.BinaryExpression("!=", t1, t0)
            }
            if (instruction == 52) {
                t2 = t1 - t0;
                t2 = types.BinaryExpression("-", t1, t0)
            }
            if (instruction == 36) {
                t2 = t1 >>> t0;
                t2 = types.BinaryExpression(">>>", t1, t0)
            }
            if (instruction == 47) {
                t2 = t1 === t0;
                t2 = types.BinaryExpression("===", t1, t0)
            }
            if (instruction == 50) {
                t2 = t1 > t0;
                t2 = types.BinaryExpression(">", t1, t0)
            }
            if (instruction == 35) {
                t2 = t1 in t0;
                t2 = types.BinaryExpression("in", t1, t0)
            }
            if (instruction == 34) {
                t2 = t1 instanceof t0;
                t2 = types.BinaryExpression("instanceof", t1, t0)
            }
            t3 = bytecode[index++];
            if (t3) stack.push(t2);
        }
        if (instruction == 23) {
            t0 = stack.pop();
            t1 = stack.pop();
            t3 = new RegExp(t1, t0);
            stack.push(t3);
        }
        if (instruction == 6) {
            t0 = bytecode[index++];
            index = t0;
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
        if (instruction == 32) {
            t0 = stack.pop();
            t1 = void t0;
            t5 = bytecode[index++];
            if (t5) stack.push(t1);
        }
        if (instruction == 24) {
            debugger;
        }
        if (instruction == 19) {
            t2 = bytecode[index++];
            t3 = bytecode[index++];
            t4 = bytecode[index++];
            t5 = bytecode[index++];
            try {
                t1 = interpreter(localScope, t3, stack, constantPool, bytecode, {
                    t: localScope[constantPool[0]]
                }, undefined, body, params, isIf);
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
                }, undefined, body, params, isIf);
                if (t1 > 0) {
                    if (option.r) {
                        return stack.pop();
                    }
                    return t1;
                }
            } finally {
                t1 = interpreter(localScope, t5, stack, constantPool, bytecode, {
                    t: localScope[constantPool[0]]
                }, undefined, body, params, isIf);
                if (t1 > 0) {
                    if (option.r) {
                        return stack.pop();
                    }
                    return t1;
                }
            }
            index = t2;
        }

        if (instruction == 0) {
            t0 = stack.pop();
            t1 = stack.pop();
            t2 = stack.pop();
            t4 = bytecode[index++];
            t3 = getScope(t1, t0) || t1;
            t5 = t0.value ? types.Identifier(t0.value) : t0;
            if (types.isBinaryExpression(t0)) {
                t0 = types.MemberExpression(t3, t5, true)
            }
            body.push(types.ExpressionStatement(types.AssignmentExpression("=", t0.type && !t0.value ? t0 : types.Identifier(t0.value), t2)));
            if (t4) stack.push(t5);
        }
        if (instruction == 9) {
            t0 = stack.pop();
            t1 = bytecode[index++];
            t2 = bytecode[index++];
            t3 = stack[stack.length - 1];
            let _params = [];
            let _body = [];
            t4 = (function () {
                return interpreter(localScope, t1, stack, constantPool, bytecode, {
                    t: this,
                    n: t0,
                    f: t0 || t3,
                    r: 1,
                }, arguments, _body, _params, isIf);
            })();
            _body.push(types.ReturnStatement(t4))
            t4 = types.FunctionExpression(null, _params, types.BlockStatement(_body));
            if (t2) {
                stack.push(t4);
            } else {
                localScope[t0.value] = t4;
                body.push(types.ExpressionStatement(types.AssignmentExpression("=", types.Identifier(t0.value), t4)))
            }
        }
        if (instruction == undefined) {
            throw new Error("当前指令不存在，请检查指令集!");
        }
        if (instruction == 57) {
            t0 = stack.pop();
            // t1 = ~t0;
            t1 = types.UnaryExpression("~", typeof t0.value == "number" || types.isIdentifier(t0) ? t0 : types.Identifier(t0.value))
            t5 = bytecode[index++];
            if (t5) stack.push(t1);
        }
        if (instruction == 25) {
            t0 = bytecode[index++];
            t1 = stack.pop();
            t2 = stack.pop();
            t3 = getScope(t2, t1) || t2;
            if (t3.type) {
                t1 = types.MemberExpression(t3, types.Identifier(t1.value))
            } else {
                t1 = types.Identifier(t1.value)
            }
            t4 = types.UpdateExpression("++", t1, Boolean(t0))
            t5 = bytecode[index++];
            if (t5) {
                stack.push(t4)
            }
            body.push(types.ExpressionStatement(t4))
        }
        if (instruction == 2) {
            t0 = bytecode[index++];
            t1 = stack.pop();
            t2 = stack.pop();
            args = [];
            for (t3 = 0; t3 < t0; t3++) args.unshift(stack.pop());
            let callee = t1;
            if (t2 === 0) {
                // t4 = t1.apply(localScope, args);
                callee = types.Identifier(t1.value)
            } else {
                // t4 = t2[t1].apply(t2, args);
                if (t2.type) {
                    callee = types.MemberExpression(t2.type === "Identifier" ? t2 : types.Identifier(t2.value), t1, true)
                } else {
                    callee = types.Identifier(t1.value)
                }
            }
            t4 = types.CallExpression(callee, args);
            t5 = bytecode[index++];
            if (t5) stack.push(t4); else body.push(types.ExpressionStatement(t4));
        }
        if (instruction == 20) {
            throw stack.pop();
        }
        if (instruction == 10) {
            t0 = bytecode[index++];
            if (!args) args = [].concat(stack);
            for (t1 = t0; t1 >= 0; t1--) {
                t2 = stack.pop();
                localScope[t2.value] = args[t1];
                params.unshift(types.Identifier(t2.value))
            }
        }
        if (instruction == 29) {
            t0 = stack.pop();
            t1 = stack.pop();
            t2 = stack.pop();
            t2[t1] = t0;
            t5 = bytecode[index++];
            if (t5) stack.push(t2);
        }
        if (instruction == 16) {
            return;
        }
        if (instruction == 1) {
            t0 = stack.pop();
            t1 = stack.pop();
            t5 = bytecode[index++];
            if (!t1.type) {  // 判断是否是ast节点
                t2 = types.Identifier(t0.value)
            } else {
                t2 = types.MemberExpression(t1, t0, true)
            }
            if (t5) stack.push(t2);
        }
        if (instruction == 12) {
            stack.push(localScope);
        }
        if (instruction == 17) {
            t0 = bytecode[index++];
            t1 = stack.pop();
            for (t2 = 0; t2 < t0; t2++) stack.pop();
            t5 = bytecode[index++];
            if (t5) stack.push(t1);
        }
        if (instruction == 28) {
            stack.push({});
        }
        if (instruction == 7) {
            t0 = stack.pop();
            t1 = bytecode[index++];
            let block1 = [], block2 = [];
            t3 = interpreter(localScope, index, stack, constantPool, bytecode, option, undefined, block1, params, isIf)
            t2 = interpreter(localScope, t1, stack, constantPool, bytecode, option, undefined, block2, params, isIf)
            if (!block2.length && t2) {
                if (!isIf) {
                    t2 = interpreter(localScope, t1 + 2, stack, constantPool, bytecode, option, undefined, block2, [], 1)
                }
                if (block2.length) {
                    body.push(types.ForStatement(null, t0, block2[0].expression, types.BlockStatement(block1)))
                }
                index = t1;
            } else {
                body.push(types.IfStatement(t0, types.BlockStatement(block1), block2.length ? types.BlockStatement(block2) : null))
                if (t2 === undefined) {
                    index = t1;
                } else {
                    return t2;
                }
            }
        }
        if (instruction == 21) {
            stack.push(`${stack.pop()}`);
        }
        if (instruction == 5) {
            t0 = constantPool[bytecode[index++]];
            t1 = localScope;
            // t2 = t1[t0];
            t2 = types.Identifier(t0)
            t5 = bytecode[index++];
            if (t5) stack.push(t2);
        }
        if (instruction == 33) {
            t0 = stack.pop();
            t1 = stack.pop();
            t2 = delete t1[t0];
            t5 = bytecode[index++];
            if (t5) stack.push(t2);
        }
        if (instruction == 13) {
            stack.push(window);
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
        if (instruction == 18) {
            t0 = stack.pop();
            // t0 = Number(t0);
            // if (t0 == NaN) t0 = -1;
            stack.push(t0);
        }
        if (instruction == 14) {
            t0 = bytecode[index++];
            t1 = interpreter(localScope, index, stack, constantPool, bytecode, {
                t: localScope[constantPool[0]]
            }, undefined, body, params, isIf);
            if (t1 === undefined) {
                index = t0;
            } else {
                if (option.r) {
                    return stack.pop();
                }
                return t1;
            }
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
        if (instruction == 15) {
            t0 = bytecode[index++];
            t1 = interpreter(localScope, index, stack, constantPool, bytecode, {
                t: localScope[constantPool[0]]
            }, undefined, body, params, isIf);
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
    }
})(typeof window !== 'undefined' ? window : (window = global, window), 0, [],
    ["@faceless", "arguments", "__proto__", "toMd5Hex", "text", "hexcase", "chrsz", "binl2hex", "binarray", "hex_tab", "str", "i", "0123456789ABCDEF", "0123456789abcdef", "", 0, "length", 4, 2, 8, 15, "charAt", "str2binl", "bin", "mask", "Array", 1, 5, "charCodeAt", 32, "bit_rol", "num", "cnt", "safe_add", "x", "y", "lsw", "msw", 65535, 16, "md5_ii", "a", "b", "c", "d", "s", "t", "md5_cmn", "md5_hh", "md5_gg", "md5_ff", "q", "core_md5", "len", "olda", "oldb", "oldc", "oldd", 128, 64, 9, 14, 1732584193, 271733879, 1732584194, 271733878, 7, 680876936, 12, 389564586, 17, 606105819, 3, 22, 1044525330, 176418897, 1200080426, 6, 1473231341, 45705983, 1770035416, 1958414417, 10, 42063, 11, 1990404162, 1804603682, 13, 40341101, 1502002290, 1236535329, 165796510, 1069501632, 643717713, 20, 373897302, 701558691, 38016083, 660478335, 405537848, 568446438, 1019803690, 187363961, 1163531501, 1444681467, 51403784, 1735328473, 1926607734, 378558, 2022574463, 1839030562, 23, 35309556, 1530992060, 1272893353, 155497632, 1094730640, 681279174, 358537222, 722521979, 76029189, 640364487, 421815835, 530742520, 995338651, 198630844, 1126891415, 1416354905, 21, 57434055, 1700485571, 1894986606, 1051523, 2054922799, 1873313359, 30611744, 1560198380, 1309151649, 145523070, 1120210379, 718787259, 343485551, "执行耗时", "console", "time", "123456", "e10adc3949ba59abbe56e057f20f883e", "log", "timeEnd"],
    [4, 3, 9, 7, 0, 6, 4033, 4, 4, 10, 0, 3, 5, 3, 6, 4, 7, 9, 22, 0, 6, 211, 4, 8, 10, 0, 3, 9, 3, 10, 3, 11, 5, 5, 1, 7, 41, 4, 12, 6, 43, 4, 13, 12, 4, 9, 0, 1, 17, 0, 0, 4, 14, 12, 4, 10, 0, 1, 17, 0, 0, 14, 205, 4, 15, 12, 4, 11, 0, 1, 17, 0, 0, 15, 196, 5, 11, 1, 12, 4, 8, 1, 1, 4, 16, 1, 1, 4, 17, 53, 1, 49, 1, 7, 194, 5, 10, 1, 12, 4, 8, 1, 1, 5, 11, 1, 4, 18, 37, 1, 1, 1, 5, 11, 1, 4, 17, 55, 1, 4, 19, 53, 1, 4, 17, 51, 1, 37, 1, 4, 20, 41, 1, 12, 4, 9, 1, 1, 4, 21, 2, 1, 1, 12, 4, 8, 1, 1, 5, 11, 1, 4, 18, 37, 1, 1, 1, 5, 11, 1, 4, 17, 55, 1, 4, 19, 53, 1, 37, 1, 4, 20, 41, 1, 12, 4, 9, 1, 1, 4, 21, 2, 1, 1, 51, 1, 51, 1, 12, 4, 10, 0, 0, 16, 11, 1, 12, 4, 11, 25, 0, 0, 6, 73, 16, 5, 10, 1, 11, 2, 16, 4, 22, 9, 218, 0, 6, 383, 4, 10, 10, 0, 3, 23, 3, 24, 3, 11, 12, 4, 25, 2, 0, 1, 12, 4, 23, 0, 1, 17, 0, 0, 4, 26, 5, 6, 1, 38, 1, 4, 26, 52, 1, 12, 4, 24, 0, 1, 17, 0, 0, 14, 377, 4, 15, 12, 4, 11, 0, 1, 17, 0, 0, 15, 361, 5, 11, 1, 12, 4, 10, 1, 1, 4, 16, 1, 1, 5, 6, 1, 53, 1, 49, 1, 7, 359, 12, 4, 23, 1, 1, 5, 11, 1, 4, 27, 37, 1, 1, 1, 5, 11, 1, 5, 6, 1, 54, 1, 12, 4, 10, 1, 1, 4, 28, 2, 1, 1, 5, 24, 1, 41, 1, 5, 11, 1, 4, 29, 55, 1, 38, 1, 39, 1, 12, 4, 23, 1, 1, 5, 11, 1, 4, 27, 37, 1, 0, 0, 16, 11, 1, 5, 11, 1, 5, 6, 1, 51, 1, 12, 4, 11, 0, 0, 6, 273, 16, 5, 23, 1, 11, 2, 16, 4, 30, 9, 390, 0, 6, 421, 4, 31, 4, 32, 10, 1, 5, 31, 1, 5, 32, 1, 38, 1, 5, 31, 1, 4, 29, 5, 32, 1, 52, 1, 36, 1, 39, 1, 11, 2, 16, 4, 33, 9, 428, 0, 6, 514, 4, 34, 4, 35, 10, 1, 3, 36, 3, 37, 5, 34, 1, 4, 38, 41, 1, 5, 35, 1, 4, 38, 41, 1, 51, 1, 12, 4, 36, 0, 1, 17, 0, 0, 5, 34, 1, 4, 39, 37, 1, 5, 35, 1, 4, 39, 37, 1, 51, 1, 5, 36, 1, 4, 39, 37, 1, 51, 1, 12, 4, 37, 0, 1, 17, 0, 0, 5, 37, 1, 4, 39, 38, 1, 5, 36, 1, 4, 38, 41, 1, 39, 1, 11, 2, 16, 4, 40, 9, 521, 0, 6, 577, 4, 41, 4, 42, 4, 43, 4, 44, 4, 34, 4, 45, 4, 46, 10, 6, 5, 43, 1, 5, 42, 1, 5, 44, 1, 18, 57, 1, 39, 1, 56, 1, 5, 41, 1, 5, 42, 1, 5, 34, 1, 5, 45, 1, 5, 46, 1, 12, 4, 47, 2, 6, 1, 11, 2, 16, 4, 48, 9, 584, 0, 6, 637, 4, 41, 4, 42, 4, 43, 4, 44, 4, 34, 4, 45, 4, 46, 10, 6, 5, 42, 1, 5, 43, 1, 56, 1, 5, 44, 1, 56, 1, 5, 41, 1, 5, 42, 1, 5, 34, 1, 5, 45, 1, 5, 46, 1, 12, 4, 47, 2, 6, 1, 11, 2, 16, 4, 49, 9, 644, 0, 6, 705, 4, 41, 4, 42, 4, 43, 4, 44, 4, 34, 4, 45, 4, 46, 10, 6, 5, 42, 1, 5, 44, 1, 41, 1, 5, 43, 1, 5, 44, 1, 18, 57, 1, 41, 1, 39, 1, 5, 41, 1, 5, 42, 1, 5, 34, 1, 5, 45, 1, 5, 46, 1, 12, 4, 47, 2, 6, 1, 11, 2, 16, 4, 50, 9, 712, 0, 6, 773, 4, 41, 4, 42, 4, 43, 4, 44, 4, 34, 4, 45, 4, 46, 10, 6, 5, 42, 1, 5, 43, 1, 41, 1, 5, 42, 1, 18, 57, 1, 5, 44, 1, 41, 1, 39, 1, 5, 41, 1, 5, 42, 1, 5, 34, 1, 5, 45, 1, 5, 46, 1, 12, 4, 47, 2, 6, 1, 11, 2, 16, 4, 47, 9, 780, 0, 6, 845, 4, 51, 4, 41, 4, 42, 4, 34, 4, 45, 4, 46, 10, 5, 5, 41, 1, 5, 51, 1, 12, 4, 33, 2, 2, 1, 5, 34, 1, 5, 46, 1, 12, 4, 33, 2, 2, 1, 12, 4, 33, 2, 2, 1, 5, 45, 1, 12, 4, 30, 2, 2, 1, 5, 42, 1, 12, 4, 33, 2, 2, 1, 11, 2, 16, 4, 52, 9, 852, 0, 6, 3975, 4, 34, 4, 53, 10, 1, 3, 41, 3, 42, 3, 43, 3, 44, 3, 11, 3, 54, 3, 55, 3, 56, 3, 57, 12, 4, 34, 1, 1, 5, 53, 1, 4, 27, 37, 1, 1, 1, 4, 58, 5, 53, 1, 4, 29, 55, 1, 38, 1, 39, 1, 12, 4, 34, 1, 1, 5, 53, 1, 4, 27, 37, 1, 0, 0, 5, 53, 1, 12, 4, 34, 1, 1, 5, 53, 1, 4, 59, 51, 1, 4, 60, 36, 1, 4, 17, 38, 1, 4, 61, 51, 1, 0, 0, 4, 62, 12, 4, 41, 0, 1, 17, 0, 0, 4, 15, 4, 63, 52, 1, 12, 4, 42, 0, 1, 17, 0, 0, 4, 15, 4, 64, 52, 1, 12, 4, 43, 0, 1, 17, 0, 0, 4, 65, 12, 4, 44, 0, 1, 17, 0, 0, 14, 3954, 4, 15, 12, 4, 11, 0, 1, 17, 0, 0, 15, 3939, 5, 11, 1, 12, 4, 34, 1, 1, 4, 16, 1, 1, 49, 1, 7, 3937, 5, 41, 1, 12, 4, 54, 0, 1, 17, 0, 0, 5, 42, 1, 12, 4, 55, 0, 1, 17, 0, 0, 5, 43, 1, 12, 4, 56, 0, 1, 17, 0, 0, 5, 44, 1, 12, 4, 57, 0, 1, 17, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 15, 51, 1, 1, 1, 4, 66, 4, 15, 4, 67, 52, 1, 12, 4, 50, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 26, 51, 1, 1, 1, 4, 68, 4, 15, 4, 69, 52, 1, 12, 4, 50, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 18, 51, 1, 1, 1, 4, 70, 4, 71, 12, 4, 50, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 72, 51, 1, 1, 1, 4, 73, 4, 15, 4, 74, 52, 1, 12, 4, 50, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 17, 51, 1, 1, 1, 4, 66, 4, 15, 4, 75, 52, 1, 12, 4, 50, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 27, 51, 1, 1, 1, 4, 68, 4, 76, 12, 4, 50, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 77, 51, 1, 1, 1, 4, 70, 4, 15, 4, 78, 52, 1, 12, 4, 50, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 66, 51, 1, 1, 1, 4, 73, 4, 15, 4, 79, 52, 1, 12, 4, 50, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 19, 51, 1, 1, 1, 4, 66, 4, 80, 12, 4, 50, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 60, 51, 1, 1, 1, 4, 68, 4, 15, 4, 81, 52, 1, 12, 4, 50, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 82, 51, 1, 1, 1, 4, 70, 4, 15, 4, 83, 52, 1, 12, 4, 50, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 84, 51, 1, 1, 1, 4, 73, 4, 15, 4, 85, 52, 1, 12, 4, 50, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 68, 51, 1, 1, 1, 4, 66, 4, 86, 12, 4, 50, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 87, 51, 1, 1, 1, 4, 68, 4, 15, 4, 88, 52, 1, 12, 4, 50, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 61, 51, 1, 1, 1, 4, 70, 4, 15, 4, 89, 52, 1, 12, 4, 50, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 20, 51, 1, 1, 1, 4, 73, 4, 90, 12, 4, 50, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 26, 51, 1, 1, 1, 4, 27, 4, 15, 4, 91, 52, 1, 12, 4, 49, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 77, 51, 1, 1, 1, 4, 60, 4, 15, 4, 92, 52, 1, 12, 4, 49, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 84, 51, 1, 1, 1, 4, 61, 4, 93, 12, 4, 49, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 15, 51, 1, 1, 1, 4, 94, 4, 15, 4, 95, 52, 1, 12, 4, 49, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 27, 51, 1, 1, 1, 4, 27, 4, 15, 4, 96, 52, 1, 12, 4, 49, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 82, 51, 1, 1, 1, 4, 60, 4, 97, 12, 4, 49, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 20, 51, 1, 1, 1, 4, 61, 4, 15, 4, 98, 52, 1, 12, 4, 49, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 17, 51, 1, 1, 1, 4, 94, 4, 15, 4, 99, 52, 1, 12, 4, 49, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 60, 51, 1, 1, 1, 4, 27, 4, 100, 12, 4, 49, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 61, 51, 1, 1, 1, 4, 60, 4, 15, 4, 101, 52, 1, 12, 4, 49, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 72, 51, 1, 1, 1, 4, 61, 4, 15, 4, 102, 52, 1, 12, 4, 49, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 19, 51, 1, 1, 1, 4, 94, 4, 103, 12, 4, 49, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 87, 51, 1, 1, 1, 4, 27, 4, 15, 4, 104, 52, 1, 12, 4, 49, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 18, 51, 1, 1, 1, 4, 60, 4, 15, 4, 105, 52, 1, 12, 4, 49, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 66, 51, 1, 1, 1, 4, 61, 4, 106, 12, 4, 49, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 68, 51, 1, 1, 1, 4, 94, 4, 15, 4, 107, 52, 1, 12, 4, 49, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 27, 51, 1, 1, 1, 4, 17, 4, 15, 4, 108, 52, 1, 12, 4, 48, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 19, 51, 1, 1, 1, 4, 84, 4, 15, 4, 109, 52, 1, 12, 4, 48, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 84, 51, 1, 1, 1, 4, 39, 4, 110, 12, 4, 48, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 61, 51, 1, 1, 1, 4, 111, 4, 15, 4, 112, 52, 1, 12, 4, 48, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 26, 51, 1, 1, 1, 4, 17, 4, 15, 4, 113, 52, 1, 12, 4, 48, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 17, 51, 1, 1, 1, 4, 84, 4, 114, 12, 4, 48, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 66, 51, 1, 1, 1, 4, 39, 4, 15, 4, 115, 52, 1, 12, 4, 48, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 82, 51, 1, 1, 1, 4, 111, 4, 15, 4, 116, 52, 1, 12, 4, 48, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 87, 51, 1, 1, 1, 4, 17, 4, 117, 12, 4, 48, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 15, 51, 1, 1, 1, 4, 84, 4, 15, 4, 118, 52, 1, 12, 4, 48, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 72, 51, 1, 1, 1, 4, 39, 4, 15, 4, 119, 52, 1, 12, 4, 48, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 77, 51, 1, 1, 1, 4, 111, 4, 120, 12, 4, 48, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 60, 51, 1, 1, 1, 4, 17, 4, 15, 4, 121, 52, 1, 12, 4, 48, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 68, 51, 1, 1, 1, 4, 84, 4, 15, 4, 122, 52, 1, 12, 4, 48, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 20, 51, 1, 1, 1, 4, 39, 4, 123, 12, 4, 48, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 18, 51, 1, 1, 1, 4, 111, 4, 15, 4, 124, 52, 1, 12, 4, 48, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 15, 51, 1, 1, 1, 4, 77, 4, 15, 4, 125, 52, 1, 12, 4, 40, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 66, 51, 1, 1, 1, 4, 82, 4, 126, 12, 4, 40, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 61, 51, 1, 1, 1, 4, 20, 4, 15, 4, 127, 52, 1, 12, 4, 40, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 27, 51, 1, 1, 1, 4, 128, 4, 15, 4, 129, 52, 1, 12, 4, 40, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 68, 51, 1, 1, 1, 4, 77, 4, 130, 12, 4, 40, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 72, 51, 1, 1, 1, 4, 82, 4, 15, 4, 131, 52, 1, 12, 4, 40, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 82, 51, 1, 1, 1, 4, 20, 4, 15, 4, 132, 52, 1, 12, 4, 40, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 26, 51, 1, 1, 1, 4, 128, 4, 15, 4, 133, 52, 1, 12, 4, 40, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 19, 51, 1, 1, 1, 4, 77, 4, 134, 12, 4, 40, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 20, 51, 1, 1, 1, 4, 82, 4, 15, 4, 135, 52, 1, 12, 4, 40, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 77, 51, 1, 1, 1, 4, 20, 4, 15, 4, 136, 52, 1, 12, 4, 40, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 87, 51, 1, 1, 1, 4, 128, 4, 137, 12, 4, 40, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 17, 51, 1, 1, 1, 4, 77, 4, 15, 4, 138, 52, 1, 12, 4, 40, 2, 7, 1, 12, 4, 41, 0, 0, 5, 44, 1, 5, 41, 1, 5, 42, 1, 5, 43, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 84, 51, 1, 1, 1, 4, 82, 4, 15, 4, 139, 52, 1, 12, 4, 40, 2, 7, 1, 12, 4, 44, 0, 0, 5, 43, 1, 5, 44, 1, 5, 41, 1, 5, 42, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 18, 51, 1, 1, 1, 4, 20, 4, 140, 12, 4, 40, 2, 7, 1, 12, 4, 43, 0, 0, 5, 42, 1, 5, 43, 1, 5, 44, 1, 5, 41, 1, 12, 4, 34, 1, 1, 5, 11, 1, 4, 60, 51, 1, 1, 1, 4, 128, 4, 15, 4, 141, 52, 1, 12, 4, 40, 2, 7, 1, 12, 4, 42, 0, 0, 5, 41, 1, 5, 54, 1, 12, 4, 33, 2, 2, 1, 12, 4, 41, 0, 0, 5, 42, 1, 5, 55, 1, 12, 4, 33, 2, 2, 1, 12, 4, 42, 0, 0, 5, 43, 1, 5, 56, 1, 12, 4, 33, 2, 2, 1, 12, 4, 43, 0, 0, 5, 44, 1, 5, 57, 1, 12, 4, 33, 2, 2, 1, 12, 4, 44, 0, 0, 16, 11, 1, 5, 11, 1, 4, 39, 51, 1, 12, 4, 11, 0, 0, 6, 1006, 16, 5, 41, 1, 5, 42, 1, 5, 43, 1, 5, 44, 1, 12, 4, 25, 2, 4, 1, 11, 2, 16, 4, 15, 12, 4, 5, 0, 1, 17, 0, 0, 4, 19, 12, 4, 6, 0, 1, 17, 0, 0, 5, 4, 1, 12, 4, 22, 2, 1, 1, 12, 4, 4, 1, 1, 4, 16, 1, 1, 5, 6, 1, 53, 1, 12, 4, 52, 2, 2, 1, 12, 4, 7, 2, 1, 1, 11, 2, 16, 4, 142, 12, 4, 143, 1, 1, 4, 144, 2, 1, 0, 3, 4, 4, 145, 12, 4, 3, 2, 1, 1, 12, 4, 4, 0, 0, 5, 4, 1, 5, 4, 1, 4, 146, 45, 1, 12, 4, 143, 1, 1, 4, 147, 2, 2, 0, 4, 142, 12, 4, 143, 1, 1, 4, 148, 2, 1, 0], undefined, undefined, body, []);
//  打印反编译结果
console.log(generator(types.Program(body)).code)

