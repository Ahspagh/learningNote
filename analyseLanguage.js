const fs = require('fs');

// 初始化缺少的节点数组
const enMissingKeys = new Set();
const zhMissingKeys = new Set();
const twMissingKeys = new Set();

// 将语言包读取成对象
let data = null;
try {
  data = fs.readFileSync('./src/locale/en.json', 'utf8');
} catch (err) {
  console.error(err);
}
data = data.replace(/^export default/, '').replace(/;\s*$/, '');
let en = eval('('+data+')');
try {
  data = fs.readFileSync('./src/locale/zh_CN.json', 'utf8');
} catch (err) {
  console.error(err);
}
data = data.replace(/^export default/, '').replace(/;\s*$/, '');
let zh = eval('('+data+')');
try {
  data = fs.readFileSync('./src/locale/zh_TW.json', 'utf8');
} catch (err) {
  console.error(err);
}
data = data.replace(/^export default/, '').replace(/;\s*$/, '');
let tw = eval('('+data+')');

// 遍历并三个语言包，并添加将其他语言包没有的节点
visitNode(en, [], 'en');
visitNode(zh, [], 'zh');
visitNode(tw, [], 'tw');

// 打印结果
console.info('./locale/en.js missing keys:', Array.from(enMissingKeys));
console.info('./locale/zh_CN.js missing keys:', Array.from(zhMissingKeys));
console.info('./locale/zh_TW.js missing keys:', Array.from(twMissingKeys));

// 递归遍历
function visitNode(obj, parentList, language) {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const parentListCopy = JSON.parse(JSON.stringify(parentList));
    parentListCopy.push(key);
    if (value instanceof Object) {
      visitNode(value, parentListCopy, language);
    }
    let enParent = en;
    let zhParent = zh;
    let twParent = tw;
    for (const parentKey of parentList) {
      if (language !== 'en' && enParent) {
        enParent = enParent[parentKey];
      }
      if (language !== 'zh' && zhParent) {
        zhParent = zhParent[parentKey];
      }
      if (language !== 'tw' && twParent) {
        twParent = twParent[parentKey];
      }
    }
    if (language !== 'en' && enParent && enParent[key] === undefined) {
      enMissingKeys.add(parentListCopy.join('.'));
    }
    if (language !== 'zh' && zhParent && zhParent[key] === undefined) {
      zhMissingKeys.add(parentListCopy.join('.'));
    }
    if (language !== 'tw' && twParent && twParent[key] === undefined) {
      twMissingKeys.add(parentListCopy.join('.'));
    }
  }
}
