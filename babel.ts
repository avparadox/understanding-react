/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as parser from "@babel/parser";
import _traverse, { NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import * as fs from "fs";
import path from "path";

// @ts-expect-error
const traverse = _traverse.default;

const code = fs.readFileSync(path.join(process.cwd(), "App.tsx"), "utf-8");
console.log("React code:");
console.log(code);

const ast = parser.parse(code, {
  sourceType: "module",
  plugins: ["jsx", "typescript"],
});

traverse(ast, {
  JSXElement(path: NodePath<t.JSXElement>) {
    if (!path) {
      return;
    }
    const node = path.node;

    const childName = (node.openingElement.name as t.JSXIdentifier).name;
    console.log(
      `Found ${childName} element:`,
      JSON.stringify(
        {
          attributes: node.openingElement.attributes,
          children: node.children,
        },
        null,
        2
      )
    );
  },
});
