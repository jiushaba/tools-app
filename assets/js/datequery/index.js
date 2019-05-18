//引入通知组件
import {
  Notification
} from 'element-ui';
/*
 * 获取oper浏览器版本
 */
export function getOperaVersion(userAgent) {
  try {
    if (window.opera) {
      return userAgent.match(/opera.([\d.]+)/)[1];
    } else if (userAgent.indexOf("opr") > 0) {
      return userAgent.match(/opr\/([\d.]+)/)[1];
    }
  } catch (e) {
    return 0;
  }
}

/*
 * 判断是否为360浏览器
 */
export function validate360(option, value) {
  let mimeTypes = window.navigator.mimeTypes;
  for (let mt in mimeTypes) {
    if (mimeTypes[mt][option] == value) {
      return true;
    }
  }
  return false;
}
export function detectOS() {
  var sUserAgent = navigator.userAgent;
  var isWin =
    navigator.platform == "Win32" || navigator.platform == "Windows";
  var isMac =
    navigator.platform == "Mac68K" ||
    navigator.platform == "MacPPC" ||
    navigator.platform == "Macintosh" ||
    navigator.platform == "MacIntel";
  if (isMac) return "Mac";
  var isUnix = navigator.platform == "X11" && !isWin && !isMac;
  if (isUnix) return "Unix";
  var isLinux = String(navigator.platform).indexOf("Linux") > -1;
  if (isLinux) return "Linux";
  if (isWin) {
    var isWin2K =
      sUserAgent.indexOf("Windows NT 5.0") > -1 ||
      sUserAgent.indexOf("Windows 2000") > -1;
    if (isWin2K) return "Win2000";
    var isWinXP =
      sUserAgent.indexOf("Windows NT 5.1") > -1 ||
      sUserAgent.indexOf("Windows XP") > -1;
    if (isWinXP) return "WinXP";
    var isWin2003 =
      sUserAgent.indexOf("Windows NT 5.2") > -1 ||
      sUserAgent.indexOf("Windows 2003") > -1;
    if (isWin2003) return "Win2003";
    var isWinVista =
      sUserAgent.indexOf("Windows NT 6.0") > -1 ||
      sUserAgent.indexOf("Windows Vista") > -1;
    if (isWinVista) return "WinVista";
    var isWin7 =
      sUserAgent.indexOf("Windows NT 6.1") > -1 ||
      sUserAgent.indexOf("Windows 7") > -1;
    if (isWin7) return "Win7";
    if (sUserAgent.indexOf("Windows NT 10.0") > -1) return "Windows 10";
  }
  return "other";
}
//ip地址正则验证
export function validateIP(rule, value, callback) {
  if (value && "..." === value) {
    callback(new Error("请输入IP地址"));
  }
  if (
    value &&
    !/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/.test(
      value
    )
  ) {
    callback(new Error("IP地址不规范"));
  } else {
    callback();
  }
}

export function getBrowerInfo(userAgent) {
  let browserObject;
  let isIE =
    userAgent.match(/msie/) != null || userAgent.match(/trident/) != null;
  // 浏览器类型-IE
  if (
    userAgent.match(/msie/) != null ||
    userAgent.match(/trident/) != null
  ) {
    browserObject = {
      type: "IE",
      version: this.getIeVersion()
    };
  }
  // 欧朋
  else if (window.opera || userAgent.indexOf("opr") > 0) {
    browserObject = {
      type: "欧朋",
      version: this.getOperaVersion(userAgent)
    };
  }
  // UC
  else if (userAgent.indexOf("ubrowser") > 0) {
    browserObject = {
      type: "UC",
      version: userAgent.match(/ubrowser\/([\d.]+)/)[1]
    };
  }
  // 百度
  else if (userAgent.indexOf("bidubrowser") > 0) {
    browserObject = {
      type: "百度",
      version: userAgent.match(/bidubrowser\/([\d.]+)/)[1]
    };
  }
  // 搜狗
  else if (
    userAgent.indexOf("metasr") > 0 ||
    userAgent.indexOf("se 2.x") > 0
  ) {
    browserObject = {
      type: "搜狗",
      version: userAgent.match(/metasr\/([\d.]+)/)[1]
    };
  }
  // QQ
  else if (userAgent.indexOf("tencenttraveler") > 0) {
    browserObject = {
      type: "QQ",
      version: userAgent.match(/tencenttraveler\/([\d.]+)/)[1]
    };
  }
  // QQ
  else if (userAgent.indexOf("qqbrowser") > 0) {
    browserObject = {
      type: "QQ",
      version: userAgent.match(/qqbrowser\/([\d.]+)/)[1]
    };
  }
  // 遨游
  else if (userAgent.indexOf("maxthon") > 0) {
    browserObject = {
      type: "遨游",
      version: userAgent.match(/maxthon\/([\d.]+)/)[1]
    };
  }
  // 火狐
  else if (userAgent.indexOf("firefox") > 0) {
    browserObject = {
      type: "火狐",
      version: userAgent.match(/firefox\/([\d.]+)/)[1]
    };
  }
  // edge
  else if (userAgent.indexOf("edge") > 0) {
    browserObject = {
      type: "Edge",
      version: userAgent.match(/edge\/([\d.]+)/)[1]
    };
  }
  // 谷歌/360
  else if (userAgent.indexOf("Chrome") > 0) {
    if (this.validate360("type", "application/x360mmplugin")) {
      browserObject = {
        type: "360",
        version: userAgent.match(/Chrome\/([\d.]+)/)[1]
      };
    } else {
      browserObject = {
        type: "谷歌",
        version: userAgent.match(/Chrome\/([\d.]+)/)[1]
      };
    }
  }
  // 苹果
  else if (userAgent.indexOf("Safari") > -1) {
    browserObject = {
      type: "Safari",
      version: userAgent.match(/version\/([\d.]+)/)[1]
    };
  }
  return browserObject;
}
export function getBrowerLanguage() {
  //检测浏览器语言
  let currentLang = navigator.language; //判断除IE外其他浏览器使用语言
  if (!currentLang) {
    //判断IE浏览器使用语言
    currentLang = navigator.browserLanguage;
  }
  return currentLang;
}


export function notificationWarning(message) {
  Notification({
    title: "警告",
    message: message,
    type: "warning"
  });
}

export function isNull(title, value) {
  if (value == null && value == '') {
    notificationWarning(title + '不能为空')
    return
  }

}


/**
 * 手机正则匹配
 */
export function checkPhone(phone) {
  if (!/^1[34578]\d{9}$/.test(phone)) {
    notificationWarning('手机号不规范，请重新输')
    return false
  }
  return true;
}

/**
 * 域名正则匹配
 */
export function checkWord(word) {
  if (!/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(word)) {
    notificationWarning('域名不规范，请重新输入')
    return false
  }
  return true;
}


/**
 * ip正则匹配
 */
export function checkIp(ip) {
    if (  !/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/.test(ip)) {
      notificationWarning('ip地址不规范，请重新输入')
      return false
    }
    return true;
  }
  