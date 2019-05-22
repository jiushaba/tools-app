//引入通知组件
import {
  Notification
} from 'element-ui';
import QRCode from "qrcode";

function notificationWarning(message) {
  Notification({
    title: "警告",
    message: message,
    type: "warning"
  });
}


export async function getQr(content, errorCorrection, margin, size) {
  if (content == '') {
    notificationWarning("内容不能为空")
    return false;
  }
  return await QRCode.toDataURL(content, {
    errorCorrectionLevel: errorCorrection,
    margin: margin,
    height: size,
    width: size
  })
}
