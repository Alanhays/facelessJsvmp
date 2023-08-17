const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;
const template = require("@babel/template").default;
const facelessLogo = `   __                _               
  / _| __ _  ___ ___| | ___  ___ ___ 
 | |_ / _\` |/ __/ _ \\ |/ _ \\/ __/ __|
 |  _| (_| | (_|  __/ |  __/\\__ \\__ \\
 |_|  \\__,_|\\___\\___|_|\\___||___/___/
                                     `
let astGlobal = null;

if (typeof window !== 'undefined') {
    astGlobal = window;
} else if (typeof global !== 'undefined') {
    astGlobal = global;
} else {
    astGlobal = this;
}

astGlobal.parser = parser;
astGlobal.traverse = traverse;
astGlobal.types = types;
astGlobal.generator = generator;
astGlobal.template = template;
astGlobal.facelessLogo = facelessLogo;
//  browserify ./tools/env.js -o ./tools/babelPlugins.js