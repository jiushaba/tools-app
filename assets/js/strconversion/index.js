//引入通知组件
import {
  Notification
} from 'element-ui';


export function isNull(title, val) {
  if (val == '') {
    notificationWarning(title + "不能为空!");
    return false;
  }
  return true;
}

export function notificationWarning(message) {
  Notification({
    title: "警告",
    message: message,
    type: "warning"
  });
}


/**
 *全角空格为12288，半角空格为32 
 *其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248 
 *半角转换为全角函数 
 */
export function ToDBC(txtstring) {
  var tmp = "";
  for (var i = 0; i < txtstring.length; i++) {
    if (txtstring.charCodeAt(i) == 32) {
      tmp = tmp + String.fromCharCode(12288);
    }
    if (txtstring.charCodeAt(i) < 127) {
      tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
    }
  }
  return tmp;
}

/**
 * 
 *全角转换为半角函数 
 */
export function ToCDB(str) {
  var tmp = "";
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return tmp
}


export function strLength(app) {
  var re = /[\u4E00-\u9FA5]/g;
  var match = app.strDataModel.match(re);
  var len = match != null ? match.length : 0;
  app.strLengthResDataModel = "字符长度：" + app.strDataModel.length + "，汉字数量：" + len
}

export function urlSerialize(val) {
  var json = '{ ';
  var args = getQueryStringArgs(val);
  for (var key in args) {
    json += "\"" + key + "\"";
    json += ":\"" + args[key] + "\", ";
  }
  json += ' }';
  json = json.replace(',  }', ' }');
  if(json.length<=4){
    notificationWarning('url参数格式错误')
    return ;
  }
  return json
}


function getQueryStringArgs(url) {
  if (url && url.indexOf("?") > -1) {
    var arr = url.split("?");
    var qs = arr[1],
      args = {},
      items = qs.length ? qs.split("&") : [],
      item = null,
      name = null,
      value = null,
      i = 0,
      len = items.length;
    for (i = 0; i < len; i++) {
      item = items[i].split("=");
      name = decodeURIComponent(item[0]);
      value = decodeURIComponent(item[1]);
      if (name.length) {
        args[name] = value;
      }
    }
    return args;
  }
  return {};
}
