/**
 * 
 * @param {px字符串} pxObject 
 * @param {是否处理Border} isBorder 
 * @param {1rem=n px} tem 
 */

export function pxToRem(pxObject, isBorder, tem) {
  var arr = pxObject.split("\n");
  var sb = "";
  for (var i = 0; i < arr.length; i++) {
    var line = arr[i];
    sb +=
      line.replace(/\d+px/g, px => {
        if (isBorder) {
          if (!/border:/gi.test(line)) {
            return parseInt(px) / parseInt(tem) + "rem";
          } else {
            return px;
          }
        } else {
          return parseInt(px) / parseInt(tem) + "rem";
        }
      }) + "\n";
  }
  return sb;
}


export function notificationWarning(message) {
  Notification({
    title: "警告",
    message: message,
    type: "warning"
  });
}


/**
 * 
 * @param {r} r 
 * @param {g} g 
 * @param {b} b 
 */
export function rgbAssemble(r, g, b) {
  return "rgb(" + r + "," + g + "," + b + ")";
}

/**
 * 
 * @param {r} r 
 * @param {g} g 
 * @param {b} b 
 */
export function rgbTo16Ascii(r, g, b) {
  var reg = /^rgb\((\s*[1-2]?[0-9]?[0-9]{1}\,)(\s*[1-2]?[0-9]?[0-9]{1}\,)(\s*[1-2]?[0-9]?[0-9]{1})\)$/;
  var matches = reg.exec(rgbAssemble(r, g, b));
  var hexColor = "#";
  for (var i = 1; i <= 3; i++) {
    if (parseInt(matches[i]) < 16) {
      hexColor += "0" + parseInt(matches[i]).toString(16);
    } else {
      hexColor += parseInt(matches[i]).toString(16);
    }
  }
  return hexColor;
}

export const commonColors = [{
    title: "#409EFF",
    color: "#409EFF"
  },
  {
    title: "#67C23A",
    color: "#67C23A"
  },
  {
    title: "#E6A23C",
    color: "#E6A23C"
  },
  {
    title: "#F56C6C",
    color: "#F56C6C"
  },
  {
    title: "#909399",
    color: "#909399"
  },
  {
    title: "#000000",
    color: "#000000"
  },
  {
    title: "#191970",
    color: "#191970"
  },
  {
    title: "#ED9121",
    color: "#ED9121"
  },
  {
    title: "#663366",
    color: "#663366"
  }
]
