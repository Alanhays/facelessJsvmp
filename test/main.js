if (typeof window === "undefined") {
    require("../tools/babelPlugins");
    var {readFileSync, writeFileSync} = require("fs");
    process.argv.length > 2 ? sourceFile = process.argv[2] : sourceFile = "./source.js";
    process.argv.length > 3 ? outputFile = process.argv[3] : outputFile = "./output.js";
    process.argv.length > 4 ? preprocessFile = process.argv[4] : preprocessFile = "./preprocess.js";
    var sourceCode = readFileSync(sourceFile, {encoding: "utf-8"});
    window = {
        "exports": exports,
        "require": require,
        "module": module,
        "__dirname": __dirname,
        "__filename": __filename,
    };
    window.__proto__ = global;
}

// 选项配置
const CONFIG = {
    NAME: "faceless", // faceless man
    ENCODING: true,
    COMPRESS_CODE: false,
    EXPORT_JSVMP: true,
    SHOW_DETAIL: false,
}
const {
    NAME,               // logo
    ENCODING,           // 指令编码
    COMPRESS_CODE,      // 压缩输出代码
    EXPORT_JSVMP,       // 导出加固代码(需同时开启ENCODING) 注: 开启后运行此文件不会执行解释器
    SHOW_DETAIL,        // 显示详细内容
} = CONFIG;

// 日志列表
const LOG_LIST = [`
注: 由于项目开源导致加固代码很容易被反编译,
请勿将加固后的代码用于生产环境。
`];
// logo log
if (NAME) {
    console.log(facelessLogo);
    for (let i = 0; i < LOG_LIST.length; i++) {
        console.log(LOG_LIST[i])
    }
}
// 字节码
let bytecode = [];
// 常量池
let constantPool = [`@${NAME}`, "arguments", "__proto__"];
// 指令映射表
let IMT = {};
// 自定义指令集
let instruction = [
    "=", // 赋值
    "get", // 获取属性
    "call", // 调用
    "def_v", // 声明变量
    "lod_c",  //  读取常量
    "lod_v",  //  读取变量
    "jump",  // 无条件跳转
    "ifJump",  // 条件跳转
    "switchJump", //
    "defFunc", // 定义函数
    "params",  // 参数映射
    "return",  // 返回值
    "localScope",  // 当前作用域
    "globalScope",  // 全局作用域
    "block",  // 块
    "loopBlock",  //循环块
    "blockEnd", // 块结束地址
    "sequence", // 序列表达式
    "tryNumber",  //尝试转换为数字 失败则返回-1
    "try",
    "throw",
    // "yield",
    "TemplateExpressions", // 尝试转换结果为字符串
    "Template",   // 样板  例子: let a = 0; console.log(`${a}`) -> 输出 0
    "RegExpLiteral", // 正则
    "debugger",
    "++",
    "--",
    "typeof",
    "object",
    "property",
    "array",
    "new",
    "void",
    "delete",
];
// 运算符指令
let operator = [
    "instanceof",
    "in",
    ">>>",
    ">>",
    "<<",
    "|",
    "||",
    "&",
    "&&",
    ">=",
    "<=",
    "==",
    "!=",
    "===",
    "!==",
    "<",
    ">",
    "+",
    "-",
    "*",
    "/",
    "%",
    "^",
    "~",
    "!",
];
//  全局变量
let globalVariable = [];
let _ = "------------------";

//  未解析的节点
function unresolvedNode(node) {
    let s = _ + "code" + _;
    let msg = `源代码第${node.loc.start.line}行未解析: type -> ${node.type}\n${s}\n${generator(node).code}\n${s}`;
    console.log(msg)
    debugger
    throw new TypeError(msg)
}

// 源代码预处理
function preprocess(ast) {
    //  编译前处理 变量提升特性 语法转换等待
    const ARRAY_PATTERN = template("A = B[C]")
    const ARROW = template("{ return A }");
    const FOR_OF_LET = template("let A = _F_i.value");
    const FOR_OF = template("for (let _F_iterator = A[Symbol.iterator](), _F_i = _F_iterator.next();!_F_i.done;_F_i = _F_iterator.next()) B");
    const FOR_IN_LET = template("let A = _F_li[_F_i]");
    const FOR_IN = template("for (let _F_i = 0, _F_li = _faceless_all_keys(A); _F_i < _F_li.length; _F_i++) B");
    const ALL_KEYS = template("function _faceless_all_keys(o){let _keys=[],l;while(1){l=Object.keys(o);_keys=_keys.concat(l);o=o.__proto__;if(!l.length){break}}return _keys}");
    const liftingFunction = {
        FunctionDeclaration(path) {
            let block = path.findParent(p => p.isBlockStatement() || p.isProgram()).node.body;
            let funcNode = block.splice(block.indexOf(path.node), 1);
            block.splice(0, 0, funcNode[0]);
        }
    };
    const promoteVariable = {
        /**
         * 基于 es6 语法的变量提升特性
         * 函数内 var 声明提升至当前函数作用域
         * 其他情况 var 声明提升至全局作用域
         * let 、const 只在当前块作用域（函数作用域）有效(不需要提升)
         * @param path
         * @constructor
         */
        "FunctionDeclaration|FunctionExpression|Program"(path) {
            let {body, params} = path.node;
            let _params = [], var_body = [];
            if (params) {
                params.forEach(n => _params.push(n.name));
                body = body.body;
            } else {
                for (const name in path.scope.globals) {
                    globalVariable.push(name);
                }
            }
            path.traverse({
                VariableDeclaration(_path) {
                    let parent = _path.findParent(p => p.isFunctionDeclaration()
                        || p.isFunctionExpression() || p.isProgram());
                    if (parent != path) return;
                    let {kind, declarations} = _path.node;
                    if (kind !== "var") return;
                    let sequence_body = [];
                    for (let j = 0; j < declarations.length; j++) {
                        let {id, init} = declarations[j];
                        if (!_params.includes(id.name)) {
                            var_body.push(types.VariableDeclarator(id, null))
                        }
                        if (init) {
                            sequence_body.push(types.AssignmentExpression("=", id, init))
                        }
                    }
                    if (sequence_body.length) {
                        if (_path.parentPath.isForStatement()) {
                            _path.replaceInline(types.SequenceExpression(sequence_body));
                        } else {
                            _path.replaceInline(types.ExpressionStatement(types.SequenceExpression(sequence_body)));
                        }
                    } else {
                        _path.remove()
                    }
                }
            });
            if (var_body.length) {
                body.unshift(types.VariableDeclaration("var", var_body))
            }
        }
    };
    const adapt = {
        /**
         * 适配箭头(匿名)函数 (加括号)   (x...) => 0,0...;  ->  (x...) => { return 0,0... };
         * @param path
         * @constructor
         */
        ArrowFunctionExpression(path) {
            let body = path.get("body");
            if (body.isBlockStatement()) return;
            body.replaceInline(ARROW({A: body.node}));
        },
        /**
         * 转换为可编译语法
         * 处理前
         * let {a} = {a: {b: {c: {}}}};
         * var {b} = a;
         * const {c} = a.b;
         * 处理后
         * let a = {a: {b: {c: {}}}}.a;
         * var b = a.b;
         * const c = a.b.c;
         * @param path
         * @constructor
         */
        ObjectPattern(path) {
            let {properties} = path.node;
            let parentPath = path.parentPath;
            if (!parentPath.isVariableDeclarator()) return;
            let {kind} = path.parentPath.parentPath.node;
            let {init} = parentPath.node;
            properties.forEach(n => {
                let {key, value} = n;
                let body = [types.VariableDeclarator(key, types.MemberExpression(init, value || key))];
                parentPath.parentPath.insertBefore(types.VariableDeclaration(kind, body));
            })
            parentPath.parentPath.remove();
        },
        /**
         * 原理同上
         * @param path
         * @constructor
         */
        ArrayPattern(path) {
            let {elements} = path.node;
            let parentPath = path.parentPath;
            let {right} = parentPath.node;
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                parentPath.insertBefore(ARRAY_PATTERN({A: element, B: right, C: types.NumericLiteral(i)}))
            }
            parentPath.remove();
        },
        /**
         * 偷懒亿下下，能跑就行了
         * 将 for of | for in 语法转换为 for i
         处理前
         for (const char of str) {
            console.log(char);
          }
         处理后
         for (let _F_iterator = str[Symbol.iterator](), _F_i = _F_iterator.next(); !_F_i.done; _F_i = _F_iterator.next()) {
          let char = _F_i.value;
          console.log(char);
        }
         for in 的转换同理
         * @param path
         * @constructor
         */
        "ForOfStatement|ForInStatement"(path) {
            let {left, right, body} = path.node;
            let FOR = FOR_OF, LET = FOR_OF_LET;
            if (path.isForInStatement()) {
                FOR = FOR_IN, LET = FOR_IN_LET;
                ast.program.body.unshift(ALL_KEYS());
            }
            let name = left;
            if (types.isVariableDeclaration(left)) {
                name = left.declarations[0].id;
            }
            body.body.unshift(LET({A: name}));
            path.replaceInline(FOR({A: right, B: body}));
        },
    };
    traverse(ast, liftingFunction);
    traverse(ast, adapt);
    traverse(ast, promoteVariable);
    // 预处理代码保存
    if (typeof global !== "undefined") {
        writeFileSync(preprocessFile, generator(ast).code, (e) => {
        })
    }

    return ast
}

// 虚拟化源代码
function virtualizationSourceCode(sourceCode) {
    constantPool = [`@${NAME}`, "arguments", "__proto__"],bytecode = [],globalVariable = [];
    //  解析源代码为AST
    let ast = parser.parse(sourceCode);
    // 添加运算符
    instruction = instruction.concat(operator);
    instruction.forEach(k => IMT[k] = k);
    console.info(`${_}编译器输出结果${_}\n`)
    console.time("编译耗时")
    // 预处理源代码
    let {program} = preprocess(ast);
    let nodes = program.body;

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        sourceToByte(node);
    }
    // 指令编码
    if (ENCODING) {
        // 指令集keys
        let IKA = Object.keys(IMT);
        for (let i = 0; i < IKA.length; i++) {
            IMT[IKA[i]] = i
        }
        for (let i = 0; i < bytecode.length; i++) {
            let j = bytecode[i];
            if (typeof j == "number") continue;
            bytecode[i] = IMT[j];
        }
    }
    console.timeEnd("编译耗时")
    // 检查字节码信息
    let errorIndex = bytecode.indexOf(undefined);
    if (errorIndex === -1) {
        console.info(`编译结果正常 | 字节码长度:${bytecode.length} | 常量池长度:${constantPool.length}`)
        if (SHOW_DETAIL) {
            console.info("info -> 常量池 :", constantPool)
            console.info("info -> 字节码 :", bytecode)
            // if (ENCODING) console.info(`info -> 指令映射表 :${JSON.stringify(IMT)}`);
        }
    } else {
        debugger
        throw new Error(`编译失败，错误地址:${errorIndex}`)
    }
    console.info(`\n${_}解释器输出结果${_}\n`)
    if (ENCODING && EXPORT_JSVMP) {
        // 保存加固代码
        let handlerCode = outputHandlerCode(parser.parse(interpreter.toString()));
        let appendCode = ")(typeof window !== 'undefined' ? window : (window = global, window)"
            + `, 0, [],${JSON.stringify(constantPool)}, ${JSON.stringify(bytecode)})`;
        return `(${handlerCode + appendCode}`;
    } else {
        // 执行测试
        interpreter(window, 0, [], constantPool, bytecode)
    }
}

// 输出加固代码处理程序
function outputHandlerCode(ast) {
    traverse(ast, {
        MemberExpression(path) {
            let {object, property} = path.node;
            if (object.name !== "IMT") return;
            let value = IMT[property.value];
            path.replaceInline(types.valueToNode(value));
            let parentPath = path.parentPath;
            if (parentPath.isSwitchCase() && !parentPath.node.consequent.length) {
                parentPath.remove()
            }
        },
        SwitchStatement: {
            exit(path) {
                let parentPath = path.parentPath;
                if (parentPath.isSwitchCase()) {
                    parentPath.get('test').replaceInline(types.BinaryExpression(
                        ">", types.NumericLiteral(parentPath.get('consequent.2.cases.0.test').evaluate().value - 1),
                        types.NumericLiteral(parentPath.get('test').evaluate().value + 1)
                    ))
                }
            }
        }
    })
    traverse(ast, {
        SwitchStatement: {
            exit(path) {
                let {cases, discriminant} = path.node;
                let tempBody = [];
                for (let i = 0; i < cases.length; i++) {
                    let {consequent, test} = cases[i];
                    if (!test) continue;
                    if (types.isContinueStatement(consequent[consequent.length - 1])) {
                        consequent.pop()
                    }
                    let block = types.BlockStatement(consequent);
                    let _test;
                    if (types.isBinaryExpression(test)) {
                        let left = types.BinaryExpression("<", test.left, discriminant)
                        let right = types.BinaryExpression("<", discriminant, test.right)
                        _test = types.LogicalExpression("&&", left, right)
                    } else {
                        _test = types.BinaryExpression("==", discriminant, test);
                    }
                    tempBody.push(types.IfStatement(_test, block))
                }
                // 打乱body
                tempBody = tempBody.sort(() => 0.5 - Math.random())
                path.replaceInline(tempBody)
            }
        },
        BreakStatement(path) {
            path.replaceInline(types.continueStatement())
        }
    })
    return generator(ast, {minified: COMPRESS_CODE, comments: false}).code;
}

// 源代码转字节码
function sourceToByte(node, option = {}) {
    if (!node) return;
    let t0, t1, t2, t3, t4, t5;
    switch (node.type) {
        case "Identifier":
            poolIndex("lod_c", node.name, option)
            break
        case "VariableDeclaration":
            node.declarations.forEach(n => sourceToByte(n))
            break
        case "VariableDeclarator":
            if (!types.isIdentifier(node.id)) {
                throw new TypeError("特殊情况 节点id不是标识符")
            }
            sourceToByte(node.id, {pool: "def_v"})
            if (node.init) {
                sourceToByte(node.init,{pool: "lod_v"})
                if (types.isIdentifier(node.id)) {
                    bytecode.push(IMT['localScope'])
                }
                sourceToByte(node.id)
                bytecode.push(IMT['='])
                bytecode.push(0)
            }
            break
        case "AssignmentPattern":
        case "AssignmentExpression":
            if (node.operator == '=') {
                //  值为成员表达式则获取其值
                if (types.isIdentifier(node.right)) {
                    sourceToByte(node.right, {pool: "lod_v"})
                } else if (types.isMemberExpression(node.right)) {
                    sourceToByte(node.right)
                } else {
                    sourceToByte(node.right, {notReadProperty: 1})
                }
                //  被赋值为标识符推送当前作用域
                if (types.isIdentifier(node.left)) {
                    if (globalVariable.includes(node.left.name)) {
                        bytecode.push(IMT['globalScope'])
                    } else {
                        bytecode.push(IMT['localScope'])
                    }
                }
                sourceToByte(node.left, {notReadProperty: 1})
                bytecode.push(IMT["="])
                bytecode.push(Number(!option.notPushStack))
            } else if (node.operator.length > 1 && node.operator[node.operator.length - 1] == "=") {
                t0 = node.operator.substring(0, node.operator.length - 1)
                if (types.isIdentifier(node.left)) {
                    sourceToByte(node.left, {pool: "lod_v"})
                } else
                    //     if (types.isMemberExpression(node.left)) {
                    //     sourceToByte(node.left)
                    // } else
                {
                    sourceToByte(node.left)
                }
                if (types.isIdentifier(node.right)) {
                    sourceToByte(node.right, {pool: "lod_v"})
                } else {
                    sourceToByte(node.right)
                }
                if (IMT[t0] == undefined) {
                    unresolvedNode(node) //  监控意外情况
                }
                bytecode.push(IMT[t0]);
                bytecode.push(1)
                if (types.isIdentifier(node.left)) {
                    bytecode.push(IMT['localScope'])
                }
                sourceToByte(node.left, {notReadProperty: 1})
                bytecode.push(IMT['='])
                bytecode.push(Number(!option.notPushStack))
            } else {
                unresolvedNode(node) //  监控意外情况
            }
            break
        case "LogicalExpression":
            if (types.isIdentifier(node.left)) {
                sourceToByte(node.left, {pool: "lod_v"})
            } else {
                sourceToByte(node.left)
            }
            sourceToByte(node.right)
            bytecode.push(IMT[node.operator])
            bytecode.push(Number(!option.notPushStack))
            break
        case "BinaryExpression":
            if (types.isIdentifier(node.left)) {
                sourceToByte(node.left, {pool: "lod_v"})
            } else {
                sourceToByte(node.left)
            }
            if (types.isIdentifier(node.right)) {
                sourceToByte(node.right, {pool: "lod_v"})
            } else {
                sourceToByte(node.right)
            }
            bytecode.push(IMT[node.operator])
            bytecode.push(Number(!option.notPushStack))
            break
        // case "CommentLine":
        case "BooleanLiteral":
        case "NumericLiteral":
        case "NullLiteral":
        case "StringLiteral":
            poolIndex("lod_c", node.value)
            break
        case "UnaryExpression":
            if (node.operator == IMT['-']) {
                poolIndex("lod_c", 0)
            }
            sourceToByte(node.argument, {pool: "lod_v"})
            if (node.operator == IMT['~']) {
                bytecode.push(IMT["tryNumber"])
            }
            bytecode.push(IMT[node.operator])
            bytecode.push(Number(!option.notPushStack))
            break
        case "UpdateExpression":
            if (types.isIdentifier(node.argument)) {
                bytecode.push(IMT['localScope'])
            }
            sourceToByte(node.argument)  // 这里获取标识符
            bytecode.push(IMT[node.operator])
            bytecode.push(Number(node.prefix))
            bytecode.push(Number(!option.notPushStack))
            break
        case "ExpressionStatement":
            sourceToByte(node.expression, {notPushStack: 1})
            break
        case "SequenceExpression":
            node.expressions.forEach(n => sourceToByte(n))
            bytecode.push(IMT['sequence'])
            bytecode.push(node.expressions.length - 1)
            bytecode.push(Number(!option.notPushStack))
            break
        case "ConditionalExpression":
        case "IfStatement":
            sourceToByte(node.test, {pool: "lod_v"})
            bytecode.push(IMT["ifJump"])
            t0 = bytecode.length;
            bytecode.push(t0)
            sourceToByte(node.consequent)
            bytecode.push(IMT["jump"])
            t1 = bytecode.length;
            bytecode.push(t1)
            bytecode[t0] = bytecode.length;
            sourceToByte(node.alternate)
            bytecode[t1] = bytecode.length;
            break
        case "CallExpression":
            node.arguments.forEach(n => sourceToByte(n, {pool: "lod_v"}))
            if (types.isFunctionExpression(node.callee) || types.isSequenceExpression(node.callee)) {
                poolIndex("lod_c", 0)
            }
            if (types.isIdentifier(node.callee)) {
                bytecode.push(IMT['localScope'])
            }
            sourceToByte(node.callee, {notReadProperty: 1})
            bytecode.push(IMT['call'])
            bytecode.push(node.arguments.length)
            bytecode.push(Number(!option.notPushStack))
            break
        case "ForInStatement":
            unresolvedNode(node)  // 通过语法转换实现
            break
        case "ForOfStatement":
            unresolvedNode(node)  // 通过语法转换实现
            break
        case "ForStatement":
            bytecode.push(IMT["block"]);
            t0 = bytecode.length;
            bytecode.push(t0);
            sourceToByte(node.init, {notPushStack: 1});
            t1 = bytecode.length;
            bytecode.push(IMT["loopBlock"]);  // 循环体开始
            bytecode.push(t1);
            if (node.test) {
                sourceToByte(node.test, {pool: "lod_v"});
            } else {
                poolIndex("lod_c", 1);
            }
            bytecode.push(IMT["ifJump"]); // 跳至结束
            t2 = bytecode.length;
            bytecode.push(t2);
            sourceToByte(node.body, {specialBlock: 1});
            bytecode.push(IMT["blockEnd"]);  // 结束当此循环
            bytecode[t2] = bytecode.length;  // 循环体结束地址
            bytecode.push(IMT["return"]); // 循环体结束
            bytecode.push(1);
            bytecode[t1 + 1] = bytecode.length;
            sourceToByte(node.update, {notPushStack: 1});
            bytecode.push(IMT["jump"]); // 跳转至 loopBlock
            bytecode.push(t1);
            bytecode.push(IMT["blockEnd"]);  // 循环结束
            bytecode[t0] = bytecode.length; // 循环结束地址
            break
        case "WhileStatement":
            bytecode.push(IMT["block"]);
            t0 = bytecode.length;
            bytecode.push(t0);
            t1 = bytecode.length;
            bytecode.push(IMT["loopBlock"]);
            bytecode.push(t1);
            sourceToByte(node.test, {pool: "lod_v"});
            bytecode.push(IMT["ifJump"]); // 跳至结束
            t2 = bytecode.length;
            bytecode.push(t2);
            sourceToByte(node.body, {specialBlock: 1})
            bytecode.push(IMT["blockEnd"]);  // 结束当此循环
            bytecode[t2] = bytecode.length;  // 循环体结束地址
            bytecode.push(IMT["return"]); // 循环体结束
            bytecode.push(1);
            bytecode[t1 + 1] = bytecode.length;
            bytecode.push(IMT["jump"]);
            bytecode.push(t1);
            bytecode.push(IMT["blockEnd"]);
            bytecode[t0] = bytecode.length;
            break
        case "DoWhileStatement":
            bytecode.push(IMT["block"]);
            t0 = bytecode.length;
            bytecode.push(t0);
            t1 = bytecode.length;
            bytecode.push(IMT["loopBlock"]);
            bytecode.push(t1);
            sourceToByte(node.body, {specialBlock: 1})
            sourceToByte(node.test, {pool: "lod_v"});
            bytecode.push(IMT["ifJump"]); // 跳至结束
            t2 = bytecode.length;
            bytecode.push(t2);
            bytecode.push(IMT["blockEnd"]);  // 结束当此循环
            bytecode[t2] = bytecode.length;  // 循环体结束地址
            bytecode.push(IMT["return"]); // 循环体结束
            bytecode.push(1);
            bytecode[t1 + 1] = bytecode.length;
            bytecode.push(IMT["jump"]);
            bytecode.push(t1);
            bytecode.push(IMT["blockEnd"]);
            bytecode[t0] = bytecode.length;
            break
        case "MemberExpression":
            // object为标识符时推送当前作用域
            if (types.isIdentifier(node.object)) {
                bytecode.push(IMT['localScope'])
                sourceToByte(node.object)
                bytecode.push(IMT['get'])
                bytecode.push(1)
            } else {
                sourceToByte(node.object)
            }
            // 处理property是可计算的情况
            if (node.computed) {
                if (types.isIdentifier(node.property)) {
                    bytecode.push(IMT['localScope'])
                    sourceToByte(node.property)
                    bytecode.push(IMT['get'])
                    bytecode.push(1)
                } else {
                    sourceToByte(node.property)
                }
            } else {
                sourceToByte(node.property)
            }
            bytecode.push(IMT['get'])
            bytecode.push(Number(!option.notPushStack))
            if (option.notReadProperty) {
                bytecode.pop()
                bytecode.pop()
            }
            break
        case "FunctionExpression":
        case "ArrowFunctionExpression":
        case "FunctionDeclaration":
            // 三种情况 匿名函数 函数定义 函数表达式
            t1 = node.id ? node.id.name : 0;
            poolIndex("lod_c", t1) // 函数名称 匿名为 number 0
            bytecode.push(IMT["defFunc"])  // 仅声明函数
            bytecode.push(bytecode.length + 4)// 函数指针
            bytecode.push(Number(node.type !== "FunctionDeclaration"))  // 函数声明类型
            bytecode.push(IMT["jump"])  // 跳过函数内容
            t0 = bytecode.length;
            bytecode.push(t0);
            node.params.forEach(n => poolIndex("lod_c", n.name))  // 形参处理
            bytecode.push(IMT["params"])
            bytecode.push(node.params.length - 1)  // 形参数量
            sourceToByte(node.body, {specialBlock: 1})
            bytecode.push(IMT["blockEnd"])
            bytecode[t0] = bytecode.length; // 函数结束指针
            break
        case "NewExpression":
            node.arguments.forEach(n => sourceToByte(n, {pool: "lod_v"}))
            if (types.isIdentifier(node.callee)) {
                bytecode.push(IMT['localScope'])
            }
            sourceToByte(node.callee)
            bytecode.push(IMT['new'])
            bytecode.push(node.arguments.length)
            bytecode.push(Number(!option.notPushStack))
            break
        case "ThisExpression":
            bytecode.push(IMT['localScope'])
            poolIndex("lod_c", constantPool[0])
            bytecode.push(IMT['get'])
            bytecode.push(Number(!option.notPushStack))
            break
        case "BlockStatement":
            if (option.specialBlock) {
                node.body.forEach(n => sourceToByte(n))
            } else {
                bytecode.push(IMT["block"])
                t0 = bytecode.length
                bytecode.push(t0)
                node.body.forEach(n => sourceToByte(n))
                bytecode.push(IMT["blockEnd"])
                bytecode[t0] = bytecode.length;
            }
            break
        case "ArrayExpression":
            node.elements.forEach(n => sourceToByte(n))
            bytecode.push(IMT["array"])
            bytecode.push(node.elements.length)
            bytecode.push(Number(!option.notPushStack))
            break
        case "ObjectExpression":
            bytecode.push(IMT['object'])
            node.properties.forEach(n => sourceToByte(n))
            break
        case "ObjectProperty":
            sourceToByte(node.key)
            sourceToByte(node.value)
            bytecode.push(IMT["property"])
            bytecode.push(Number(!option.notPushStack))
            break
        case "LabeledStatement":
            unresolvedNode(node) // 没意义不处理
            break
        case "TemplateElement":
            poolIndex("lod_c", node.value.raw);  // raw|cooked
            break
        case "TemplateLiteral":
            t0 = node.quasis.concat(node.expressions);
            t0.sort((a, b) => b.start - a.start);
            for (t1 = 0; t1 < t0.length; t1++) {
                t2 = t0[t1]
                if (t2.type == "TemplateElement") {
                    sourceToByte(t2)
                } else {
                    sourceToByte(t2, {pool: "lod_v"})
                    bytecode.push(IMT['TemplateExpressions'])
                }
            }
            bytecode.push(IMT['Template'])
            bytecode.push(t0.length)
            bytecode.push(Number(!option.notPushStack))
            break
        case "ReturnStatement":
            sourceToByte(node.argument, {pool: "lod_v"})
            bytecode.push(IMT['return'])
            bytecode.push(2)
            break
        case "BreakStatement":
            // node.label
            bytecode.push(IMT['return'])
            bytecode.push(1)
            break
        case "ContinueStatement":
            bytecode.push(IMT['return'])
            bytecode.push(0)
            break
        case "SwitchStatement":
            bytecode.push(IMT["loopBlock"])
            t0 = bytecode.length;
            bytecode.push(t0);
            sourceToByte(node.discriminant, {pool: "lod_v"});
            t4 = -1;
            node.cases.forEach(n => sourceToByte(n.test ||
                (t4 = node.cases.indexOf(n), types.StringLiteral("@faceless_switch_default"))));  // 这里有个小问题,不会修,就这样吧
            bytecode.push(IMT["array"]);
            bytecode.push(node.cases.length);
            bytecode.push(1)
            poolIndex("lod_c", "indexOf")
            bytecode.push(IMT["call"])
            bytecode.push(1)
            bytecode.push(1)
            t1 = bytecode.length;
            t2 = t1 + node.cases.length * 2;
            bytecode.length = t2;
            bytecode.push(IMT["array"])
            bytecode.push(node.cases.length)
            bytecode.push(1)
            bytecode.push(IMT["switchJump"])
            bytecode.push(t4)
            t3 = [];
            node.cases.forEach(n => t3.push(sourceToByte(n)));
            for (let i = 0; i < t3.length; i++) {
                let _index = t3[i];
                bytecode[i * 2 + t1] = IMT["lod_c"];
                let c_index = poolIndex(null, _index);
                bytecode[i * 2 + t1 + 1] = c_index;
            }
            bytecode.push(IMT["blockEnd"]);
            bytecode[t0] = bytecode.length;
            break
        case "SwitchCase":
            t0 = bytecode.length;
            node.consequent.forEach(n => sourceToByte(n));
            return t0;
        case "RegExpLiteral":
            poolIndex("lod_c", node.pattern)
            poolIndex("lod_c", node.flags)
            bytecode.push(IMT['RegExpLiteral'])
            break
        case "TryStatement":
            bytecode.push(IMT['try']);
            t0 = bytecode.length;
            bytecode.push(t0)
            bytecode.length = bytecode.length + 3;
            bytecode[t0 + 1] = bytecode.length;
            sourceToByte(node.block, {specialBlock: 1})
            bytecode.push(IMT["blockEnd"]);
            bytecode[t0 + 2] = bytecode.length
            sourceToByte(node.handler.body, {specialBlock: 1})
            bytecode.push(IMT["blockEnd"]);
            bytecode[t0 + 3] = bytecode.length
            sourceToByte(node.finalizer, {specialBlock: 1});
            bytecode.push(IMT["blockEnd"]);
            bytecode[t0] = bytecode.length
            break
        // case "CatchClause":
        case "ThrowStatement":
            sourceToByte(node.argument)
            bytecode.push(IMT["throw"])
            break
        case "ObjectPattern":
            unresolvedNode(node)  // 通过语法转换实现
            break
        case "ObjectMethod":
            sourceToByte(node.key)
            // 三种情况 匿名函数 函数定义 函数表达式
            t1 = node.id ? node.id.name : 0;
            poolIndex("lod_c", t1) // 函数名称 匿名为 number 0
            bytecode.push(IMT["defFunc"])  // 仅声明函数
            bytecode.push(bytecode.length + 4)// 函数指针
            bytecode.push(Number(node.type !== "FunctionDeclaration"))  // 函数声明类型
            bytecode.push(IMT["jump"])  // 跳过函数内容
            t0 = bytecode.length;
            bytecode.push(t0);
            node.params.forEach(n => poolIndex("lod_c", n.name))  // 形参处理
            bytecode.push(IMT["params"])
            bytecode.push(node.params.length - 1)  // 形参数量
            sourceToByte(node.body, {specialBlock: 1})
            bytecode.push(IMT["blockEnd"])
            bytecode[t0] = bytecode.length; // 函数结束指针
            bytecode.push(IMT["property"])
            bytecode.push(Number(!option.notPushStack))
            break
        case "EmptyStatement":
            break
        case "ArrayPattern":
            unresolvedNode(node)  // 通过语法转换实现
            break
        case "YieldExpression":
            unresolvedNode(node)  // 不知道怎样实现，先搁置
            break
        case "DebuggerStatement":
            if (!EXPORT_JSVMP) {
                bytecode.push(IMT["debugger"])
            }
            break
        default:
            unresolvedNode(node)  // 其他类型监测
    }
}

//  池索引
function poolIndex(poolName, value, option = {}) {
    poolName = option.pool || poolName;
    let index = constantPool.indexOf(value);
    // 不在池中则推入
    if (index === -1) {
        index = constantPool.length;
        constantPool.push(value);
    }
    if (poolName) {
        bytecode.push(IMT[poolName]);
        bytecode.push(index);
        if (poolName == "lod_v") bytecode.push(Number(!option.notPushStack));
    } else {
        return index;
    }
}

// 解释器
function interpreter(parentScope, index, stack, constantPool, bytecode, option = {}, args) {
    let localScope = {};
    localScope[constantPool[0]] = option.t || this;
    localScope[constantPool[1]] = args;
    if (option.n) localScope[option.n] = parentScope[option.f];
    localScope.__proto__ = parentScope;

    // 获取最近的含某属性的原型对象
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
        switch (instruction) {
            case IMT["="]:
                t0 = stack.pop() // 标识符
                t1 = stack.pop() // 对象
                t2 = stack.pop() // 值
                t4 = bytecode[index++]  // 入栈
                t3 = getScope(t1, t0) || t1
                t3[t0] = t2  // 赋值
                if (t4) stack.push(t2);
                break
            case IMT["instanceof"]:
            case IMT["in"]:
            case IMT[">>>"]:
            case IMT[">>"]:
            case IMT["<<"]:
            case IMT["|"]:
            case IMT["||"]:
            case IMT["&"]:
            case IMT["&&"]:
            case IMT[">="]:
            case IMT["<="]:
            case IMT["=="]:
            case IMT["!="]:
            case IMT["==="]:
            case IMT["!=="]:
            case IMT["<"]:
            case IMT[">"]:
            case IMT["+"]:
            case IMT["-"]:
            case IMT["*"]:
            case IMT["/"]:
            case IMT["%"]:
            case IMT["^"]:
                t0 = stack.pop() // 值1
                t1 = stack.pop() // 值2
                switch (instruction) {
                    case IMT["instanceof"]:
                        t2 = t1 instanceof t0;
                        break
                    case IMT["in"]:
                        t2 = t1 in t0;
                        break
                    case IMT[">>>"]:
                        t2 = t1 >>> t0;
                        break
                    case IMT[">>"]:
                        t2 = t1 >> t0;
                        break
                    case IMT["<<"]:
                        t2 = t1 << t0;
                        break
                    case IMT["|"]:
                        t2 = t1 | t0;
                        break
                    case IMT["||"]:
                        t2 = t1 || t0;
                        break
                    case IMT["&"]:
                        t2 = t1 & t0;
                        break
                    case IMT["&&"]:
                        t2 = t1 && t0;
                        break
                    case IMT[">="]:
                        t2 = t1 >= t0;
                        break
                    case IMT["<="]:
                        t2 = t1 <= t0;
                        break
                    case IMT["=="]:
                        t2 = t1 == t0;
                        break
                    case IMT["!="]:
                        t2 = t1 != t0;
                        break
                    case IMT["==="]:
                        t2 = t1 === t0;
                        break
                    case IMT["<"]:
                        t2 = t1 < t0;
                        break
                    case IMT["!=="]:
                        t2 = t1 !== t0;
                        break
                    case IMT[">"]:
                        t2 = t1 > t0;
                        break
                    case IMT["+"]:
                        t2 = t1 + t0;
                        break
                    case IMT["-"]:
                        t2 = t1 - t0;
                        break
                    case IMT["*"]:
                        t2 = t1 * t0;
                        break
                    case IMT["/"]:
                        t2 = t1 / t0;
                        break
                    case IMT["%"]:
                        t2 = t1 % t0;
                        break
                    case IMT["^"]:
                        t2 = t1 ^ t0;
                        break
                }
                t3 = bytecode[index++]
                if (t3) stack.push(t2);
                break
            case IMT["~"]:
                t0 = stack.pop()
                t1 = ~t0;
                t5 = bytecode[index++]
                if (t5) stack.push(t1);
                break
            case IMT["!"]:
                t0 = stack.pop()
                t1 = !t0;
                t5 = bytecode[index++]
                if (t5) stack.push(t1);
                break
            case IMT["typeof"]:
                t0 = stack.pop() //
                t1 = typeof t0;
                t5 = bytecode[index++];
                if (t5) stack.push(t1);
                break
            case IMT["void"]:
                t0 = stack.pop();
                t1 = void t0;
                t5 = bytecode[index++];
                if (t5) stack.push(t1);
                break

            case IMT["++"]:
                t0 = bytecode[index++]  // prefix
                t1 = stack.pop() // 标识符
                t2 = stack.pop() // 对象
                t3 = getScope(t2, t1) || t2;
                t4 = !t0 ? t3[t1]++ : ++t3[t1];
                t5 = bytecode[index++];
                if (t5) stack.push(t4);
                break
            case IMT["--"]:
                t0 = bytecode[index++] // prefix
                t1 = stack.pop() // 标识符
                t2 = stack.pop() // 对象
                t3 = getScope(t2, t1) || t2;
                t4 = !t0 ? t3[t1]-- : --t3[t1];
                t5 = bytecode[index++];
                if (t5) stack.push(t4);
                break
            case IMT["get"]:
                t0 = stack.pop() // 标识符
                t1 = stack.pop() // 对象
                t5 = bytecode[index++];
                if (t5) stack.push(t1[t0]);
                break
            case IMT['localScope']:
                stack.push(localScope);
                break
            case IMT['globalScope']:
                stack.push(window);
                break
            case IMT["def_v"]:
                t0 = bytecode[index++]
                t1 = constantPool[t0]
                localScope[t1] = undefined;
                break

            case IMT["call"]:
                t0 = bytecode[index++] // 参数数量
                t1 = stack.pop() // 标识符
                t2 = stack.pop() // 对象
                args = [];
                for (t3 = 0; t3 < t0; t3++) args.unshift(stack.pop());
                if (t2 === 0) {
                    t4 = t1.apply(localScope, args);
                } else {
                    t4 = t2[t1].apply(t2, args);
                }
                t5 = bytecode[index++];
                if (t5) stack.push(t4);
                break
            case IMT["lod_v"]:
                t0 = constantPool[bytecode[index++]]; // 标识符
                t1 = localScope
                t2 = t1[t0]
                t5 = bytecode[index++];
                if (t5) stack.push(t2);
                break
            case IMT["lod_c"]:
                t0 = bytecode[index++]
                stack.push(constantPool[t0])
                break
            case IMT["defFunc"]:
                t0 = stack.pop();  // 函数名
                t1 = bytecode[index++];  // 函数指针
                t2 = bytecode[index++];  // 是否入栈
                t3 = stack[stack.length - 1];
                t4 = function () {
                    return interpreter(localScope, t1, stack, constantPool, bytecode, {
                        t: this,
                        n: t0,
                        f: t0 || t3,
                        r: 1,
                    }, arguments);
                }
                if (t2) {
                    stack.push(t4)
                } else {
                    localScope[t0] = t4
                }
                break
            case IMT["params"]:
                t0 = bytecode[index++];  // 参数数量
                if (!args) args = [].concat(stack);
                for (t1 = t0; t1 >= 0; t1--) {
                    t2 = stack.pop();
                    localScope[t2] = args[t1]
                }
                break
            case IMT["object"]:
                stack.push({});
                break
            case IMT["RegExpLiteral"]:
                t0 = stack.pop()
                t1 = stack.pop()
                t3 = new RegExp(t1, t0)
                stack.push(t3);
                break
            case IMT["new"]:
                t0 = stack.pop()
                t1 = stack.pop()
                t2 = bytecode[index++];
                args = [];
                for (t3 = 0; t3 < t2; t3++) args.unshift(stack.pop());
                t4 = new t1[t0](...args);
                t5 = bytecode[index++];
                if (t5) stack.push(t4);
                break
            case IMT["return"]:
                if (option.r) {
                    return stack.pop()
                }
                return bytecode[index++];
            case IMT["property"]:
                t0 = stack.pop();
                t1 = stack.pop();
                t2 = stack.pop();
                t2[t1] = t0;
                t5 = bytecode[index++];
                if (t5) stack.push(t2);
                break
            case IMT["sequence"]:
                t0 = bytecode[index++];
                t1 = stack.pop();
                for (t2 = 0; t2 < t0; t2++) stack.pop();
                t5 = bytecode[index++];
                if (t5) stack.push(t1);
                break
            case IMT["blockEnd"]:
                return
            case IMT["jump"]:
                t0 = bytecode[index++]
                index = t0;
                break
            case IMT["switchJump"]:
                t0 = stack.pop()
                t1 = stack.pop()
                t2 = bytecode[index++];
                if (t1 == -1) t1 = t2;
                t1 = t0[t1]
                index = t1;
                break
            case IMT["ifJump"]:
                t0 = stack.pop()  // 条件
                t1 = bytecode[index++]  // 指针
                if (!t0) index = t1;
                break
            case IMT["debugger"]:
                debugger
                break
            case IMT["try"]:
                t2 = bytecode[index++];
                t3 = bytecode[index++];
                t4 = bytecode[index++];
                t5 = bytecode[index++];
                try {
                    t1 = interpreter(localScope, t3, stack, constantPool, bytecode, {t: localScope[constantPool[0]]});
                    if (t1 > 0) {
                        //  处理 return
                        if (option.r) {
                            return stack.pop()
                        }
                        return t1;
                    }
                } catch (e) {
                    t1 = interpreter(localScope, t4, stack, constantPool, bytecode, {
                        t: localScope[constantPool[0]],
                        e: e
                    });
                    if (t1 > 0) {
                        //  处理 return
                        if (option.r) {
                            return stack.pop()
                        }
                        return t1;
                    }
                } finally {
                    t1 = interpreter(localScope, t5, stack, constantPool, bytecode, {t: localScope[constantPool[0]]});
                    if (t1 > 0) {
                        //  处理 return
                        if (option.r) {
                            return stack.pop()
                        }
                        return t1;
                    }
                }
                index = t2;
                break
            case IMT["tryNumber"]:
                t0 = stack.pop()
                t0 = Number(t0)
                if (t0 == NaN) t0 = -1;
                stack.push(t0)
                break
            case IMT["delete"]:
                t0 = stack.pop()
                t1 = stack.pop()
                t2 = delete t1[t0];
                t5 = bytecode[index++];
                if (t5) stack.push(t2);
                break
            case IMT["TemplateExpressions"]:
                stack.push(`${stack.pop()}`)
                break
            case IMT["throw"]:
                throw stack.pop()
            case IMT["Template"]:
                t0 = bytecode[index++];
                t2 = "";
                for (t1 = 0; t1 < t0; t1++) {
                    t2 += stack.pop()
                }
                t5 = bytecode[index++];
                if (t5) stack.push(t2);
                break
            case IMT["block"]:
                t0 = bytecode[index++];
                t1 = interpreter(localScope, index, stack, constantPool, bytecode, {t: localScope[constantPool[0]]});
                if (t1 === undefined) {
                    index = t0
                } else {
                    //  处理 return
                    if (option.r) {
                        return stack.pop()
                    }
                    return t1;
                }
                break
            case IMT["loopBlock"]:
                t0 = bytecode[index++];  // 结束块指针
                t1 = interpreter(localScope, index, stack, constantPool, bytecode, {t: localScope[constantPool[0]]});
                if (!t1) {
                    // 处理 continue 和 正常循环
                    index = t0;
                } else {
                    if (t1 === 1) {
                        // 处理 break
                        return
                    } else {
                        //  处理 return
                        if (option.r) {
                            return stack.pop()
                        }
                        return t1
                    }
                }
                break
            case IMT["array"]:
                t0 = bytecode[index++]  // 长度
                t1 = [];
                for (t2 = 0; t2 < t0; t2++) {
                    t3 = stack.pop()  // 元素
                    t1.unshift(t3)
                }
                t5 = bytecode[index++];
                if (t5) stack.push(t1);
                break
            case undefined:
                throw new Error("当前指令不存在，请检查指令集!")
            default:
                let msg = `没有解析！指令: "${instruction}" 指针:${index}`;
                debugger
                throw new Error(msg)
        }
    }
}

if (typeof global !== "undefined") {
    let code = virtualizationSourceCode(sourceCode);
    writeFileSync(outputFile, code, (e) => {
    })
    console.info(`info -> 加固代码已保存至 ${__dirname}\\output.js!\n`)
}