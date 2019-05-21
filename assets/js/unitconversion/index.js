//引入通知组件
import {
  Notification
} from 'element-ui';

function notificationWarning(message) {
  Notification({
    title: "警告",
    message: message,
    type: "warning"
  });
}


export function calculation(type, val) {
  if (val == '') {
    notificationWarning(type + "进制不能为空")
    return {
      ten: '',
      two: '',
      eight: '',
      sixteen: ''
    }
  }
  switch (type) {
    case 10:
      return {
        ten: val,
          two: parseFloat(val, 10).toString(2),
          eight: parseFloat(val, 10).toString(8),
          sixteen: parseFloat(val, 10).toString(16)
      }
      break
    case 2:
      return {
        two: val,
          ten: parseFloat(val, 10).toString(10),
          eight: parseFloat(val, 10).toString(8),
          sixteen: parseFloat(val, 10).toString(16)
      }
      break
    case 8:
      return {
        eight: val,
          ten: parseFloat(val, 10).toString(10),
          two: parseFloat(val, 10).toString(2),
          sixteen: parseFloat(val, 10).toString(16)
      }
      break
    case 16:
      return {
        sixteen: val,
          ten: parseFloat(val, 10).toString(10),
          two: parseFloat(val, 10).toString(2),
          eight: parseFloat(val, 10).toString(8)
      }
      break

  }
}

export function dateCalculation(type, val) {
  let num = parseFloat(val);
  switch (type) {
    case '天':
      return {
        day: val,
          time: num * 24,
          branch: num * 24 * 60,
          second: num * 24 * 60 * 60,
          Millisecond: num * 24 * 60 * 60 * 1000
      }
      break
    case '时':
      return {
        day: extractTime((num / 24).toFixed(4)),
          time: val,
          branch: extractTime(num * 60),
          second: extractTime(num * 60 * 60),
          Millisecond: extractTime(num * 60 * 60 * 1000)
      }
      break
    case '分':
      return {
        day: extractTime((num / 60 / 24).toFixed(4)),
          time: extractTime((num / 60).toFixed(4)),
          branch: val,
          second: extractTime(num * 60),
          Millisecond: extractTime(num * 60 * 1000)
      }
      break
    case '秒':
      return {
        day: extractTime((num / 60 / 60 / 24).toFixed(4)),
          time: extractTime((num / 60 / 60).toFixed(4)),
          branch: extractTime((num / 60).toFixed(4)),
          second: val,
          Millisecond: extractTime(num * 1000)
      }
      break
    case '毫秒':
      return {
        day: extractTime((num / 1000 / 60 / 60 / 24).toFixed(4)),
          time: extractTime((num / 1000 / 60 / 60).toFixed(4)),
          branch: extractTime((num / 1000 / 60).toFixed(4)),
          second: extractTime(num / 1000),
          Millisecond: val
      }
      break
  }
}


function extractTime(text) {
  var slt = text;
  if (text.toString().indexOf(".") > 0) {
    var arr = text.toString().split(".");
    if (parseInt(arr[1]) == 0) {
      slt = arr[0];
    }
  }
  return slt;
}
