//引入通知组件
import {
  Notification
} from 'element-ui';
import QRCode from "qrcode";

export function getBar(dom, content, type, width, height) {
  try {
    JsBarcode(dom, content, {
      format: type,
      width: width, //设置条之间的宽度
      height: height, //高度
    })
  } catch {
    notificationWarning('内容输入错误')
  }
}

// JsBarcode(dom, "123456789999", {
//   format: type, //选择要使用的条形码类型
//   width: 3, //设置条之间的宽度
//   height: 100, //高度
//   displayValue: true, //是否在条形码下方显示文字
//   fontOptions: "bold italic", //使文字加粗体或变斜体
//   font: "fantasy", //设置文本的字体
//   textAlign: "left", //设置文本的水平对齐方式
//   textPosition: "top", //设置文本的垂直位置
//   textMargin: 5, //设置条形码和文本之间的间距
//   fontSize: 15, //设置文本的大小
//   background: "#eee", //设置条形码的背景
//   lineColor: "#2196f3", //设置条和文本的颜色。
//   margin: 15 //设置条形码周围的空白边距
// });
function notificationWarning(message) {
  Notification({
    title: "警告",
    message: message,
    type: "warning"
  });
}
