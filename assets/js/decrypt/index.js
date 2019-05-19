//引入通知组件
import {
  Notification
} from 'element-ui';

import SparkMD5 from 'spark-md5'

export function readFile(app) {
  var file = document.getElementById("image64file").files[0];
  if (!/image\/\w+/.test(file.type)) {
    notificationWarning('请请上传正确格式的图片文件');
    app.fullscreenLoading = false;
    return;
  }
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = e => {
    debugger
    app.Base64DecryptData = e.currentTarget.result
    app.prView = e.currentTarget.result
    setTimeout(app.fullscreenLoading = false, 4000);
    // txt: e.currentTarget.result,
    // info: Math.ceil(file.size / 1024) + "KB"
  }
}
export function isNull(val) {
  if (val.trim() == '') {
    notificationWarning('请输入Base64图片加密串');
    return;
  }
}
export function notificationWarning(message) {
  Notification({
    title: "警告",
    message: message,
    type: "warning"
  });
}

export function fileMd5(app) {
  debugger
  let obj = [];
  var fileReader = new FileReader(),
    box = document.getElementById('md5box'),
    blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,
    file = document.getElementById("md5file").files[0],
    chunkSize = 2097152,
    chunks = Math.ceil(file.size / chunkSize),
    currentChunk = 0,
    bs = fileReader.readAsBinaryString,
    spark = bs ? new SparkMD5() : new SparkMD5.ArrayBuffer();
  obj.push({
    name: '文件：',
    value: file.name
  })
  fileReader.onload = function (ee) {
    spark.append(ee.target.result);
    currentChunk++;
    if (currentChunk < chunks) {
      loadNext();
    } else {
      obj.push({
        name: 'md5：',
        value: spark.end()
      })
      app.fileMd5Data=obj;
      app.fileMd5Loading=false;
    }
  }
  obj.push({
    name: '大小：',
    value: Math.ceil(file.size / 1024) + "KB"
  })

  function loadNext() {
    var start = currentChunk * chunkSize,
      end = start + chunkSize >= file.size ? file.size : start + chunkSize;
    if (bs) fileReader.readAsBinaryString(blobSlice.call(file, start, end));
    else fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
  }

  loadNext();
}
