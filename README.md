<a name="b5Rk9"></a>
# facelessJsvmp是什么？
> 单栈实现的js代码虚拟化保护程序，加固代码支持在浏览器和nodejs中运行

<a name="C5UEx"></a>
# 使用说明
注：请勿将加固后的代码用于生产环境，由于项目开源导致加固代码很容易被反编译。

环境安装
```shell
npm install @babel/parser --save-dev
npm install @babel/generator --save-dev
npm install @babel/traverse --save-dev
npm install @babel/template --save-dev
npm install @babel/types --save-dev
npm install figlet --save-dev
```

<a name="zCdGm"></a>
### base目录文件
待加固的js源文件：source.js <br />编译前预处理的源文件：preprocess.js<br />jsvmp代码加固程序：jsvmp-1.0.0.js（直接run即可）<br />加固后输出的文件：output.js
<a name="wmIXS"></a>
### pass目录文件
> 已通过测试的算法有 HMAC-SHA256 | MD5 | SHA1 | SHA256 | SM3 

存放一些通过测试的加密算法
<a name="LgVWw"></a>
# 实现原理
<a name="wGqOl"></a>
### 二进制代码虚拟化保护的基本步骤
![image.png](https://cdn.nlark.com/yuque/0/2023/png/26634545/1687165199145-a1f384ec-5041-445b-b7b8-dc9ef1aed17a.png#averageHue=%23edecec&clientId=udca881f6-3b4d-4&from=paste&height=236&id=u0d06e43f&originHeight=236&originWidth=776&originalType=binary&ratio=1&rotation=0&showTitle=false&size=61205&status=done&style=none&taskId=u6677b63f-2fe6-45d0-9825-b32e4db012f&title=&width=776)
<a name="KLcIj"></a>
### JSVMP 的保护流程图
![image.png](https://cdn.nlark.com/yuque/0/2023/png/26634545/1687165290462-a50a4ce7-5d46-4635-902b-0d47e6144608.png#averageHue=%23eeedec&clientId=udca881f6-3b4d-4&from=paste&height=590&id=ub7aa9e77&originHeight=590&originWidth=784&originalType=binary&ratio=1&rotation=0&showTitle=false&size=151473&status=done&style=none&taskId=u3722bd40-d842-44d9-8bb3-b2b8859588f&title=&width=784)
<a name="vKWCT"></a>
### JavaScript 代码虚拟化过程示例
![image.png](https://cdn.nlark.com/yuque/0/2023/png/26634545/1687165382564-4e8b1055-dfee-4588-bef8-ab922dc38f5a.png#averageHue=%23f7f6f4&clientId=udca881f6-3b4d-4&from=paste&height=245&id=u3a34f9ba&originHeight=245&originWidth=773&originalType=binary&ratio=1&rotation=0&showTitle=false&size=53585&status=done&style=none&taskId=u664c4f36-e5df-49e7-a82a-6cfd42ee8e0&title=&width=773)

<a name="zvI5D"></a>
# 已知问题
> YieldExpression 语法未实现 ：yield 
> SpreadElement 语法未实现：...args 

```javascript
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}
f(...args)
```
<a name="ycXqT"></a>
# 参考文献
JSVMP论文和专利：[JSVMP 论文和专利.rar - 蓝奏云](https://surans.lanzouw.com/inJf30zj41je)<br />大语言模型机器人AI
<a name="q4Gvg"></a>
# 广告
本项目开源起，星球内上线同步更新课程,零基础的伙伴们可从零课程开始学习，二课程感兴趣可以学习。<br />课程:《零.jsvmp原理与AST基础》、《一.手把手带你反编译jsvmp》、《二.手把手带你实现jsvmp》<br />试听公开课请查看的投稿哦，地址: [https://space.bilibili.com/247999712](https://space.bilibili.com/247999712)<br />逆向知识学习交流(星球): [https://t.zsxq.com/104HdF074](https://t.zsxq.com/104HdF074)<br />微信号:AlanHays | QQ号:2757317549

