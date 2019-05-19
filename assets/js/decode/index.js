/**
 * html编码
 */
export function htmlencode(s) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(s));
  return div.innerHTML;
}
/**
 * html解码
 */
export function htmldecode(s) {
  var div = document.createElement('div');
  div.innerHTML = s;
  return div.innerText || div.textContent;
}

/**
 * Ascii  编码解码
 */
export function Ascii() {
  this.encode = function (content) {
    var result = '';
    for (var i = 0; i < content.length; i++)
      result += '&#' + content.charCodeAt(i) + ';';
    return result;
  }
  this.decode = function (content) {
    var code = content.match(/&#(\d+);/g);
    var result = '';
    for (var i = 0; i < code.length; i++)
      result += String.fromCharCode(code[i].replace(/[&#;]/g, ''));
    return result;
  }
}
/**
 * utf8编码解码
 */
export function UTF8() {
  this.encode = function (str) {
    var temp = "",
      rs = "";
    for (var i = 0, len = str.length; i < len; i++) {
      temp = str.charCodeAt(i).toString(16);
      rs += "\\u" + new Array(5 - temp.length).join("0") + temp;
    }
    return rs;
  }
  this.decode = function (str) {
    return str.replace(/(\\u)(\w{4}|\w{2})/gi, function ($0, $1, $2) {
      return String.fromCharCode(parseInt($2, 16));
    });
  }
}


/**
 * Unicode  编码解码
 */
export function Unicode() {
    this.encode = function (str) {
        var res = [];
        for (var i = 0; i < str.length; i++)
            res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
        return "\\u" + res.join("\\u");
    }
    this.decode = function (str) {
        str = str.replace(/\\/g, "%");
        return unescape(str);
    }
}
