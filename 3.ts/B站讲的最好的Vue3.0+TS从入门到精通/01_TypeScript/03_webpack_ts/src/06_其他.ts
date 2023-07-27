// 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能
// 声明语句: 如果需要ts对新的语法进行检查，需要要加载了对应的类型说明代码
// declare var jQuery: (selector: string) => any;
// 声明文件：把声明语句放到一个单独的文件（jQuery.d.ts）中，ts会自动解析到项目中所有的声明文件

declare var jQuery: (selector: string) => any;
jQuery('#foo')

// 创建一个 01_typescript.d.ts 文件 declare var jQuery: (selector: string) => any

// 内置对象(大写的)
// Boolean: let b: Boolean = new Boolean(1)
// Number: let n: Number = new Number(true)
// String: let s: String = new String('abc')
// Date: let d: Date = new Date()
// RegExp: let r: RegExp = /[a-z]/
// Error: let e: Error = new Error('error message')
// let bb: boolean = new Boolean(1) // error

// BOM 和 DOM 的内置对象
Window:
Document
HTMLElement
DocumentFragment: document.createDocumentFragment()
Event
NodeList