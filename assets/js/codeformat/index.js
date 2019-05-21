//引入通知组件
import {
  Notification
} from 'element-ui';
const sty = require('../common/htmlformat.js')
const jsb = require('../common/jsformat.js')
const jsmin = require('../common/jsmin.js')
export function do_js_beautify(val) {
  let js_source = val.replace(/^\s+/, '');
  let tabsize = 1; //document.getElementById('tabsize').value;
  let tabchar = ' ';
  if (tabsize == 1) {
    tabchar = '\t';
  }
  if (js_source && js_source.charAt(0) === '<') {
    return sty.style_html(js_source, tabsize, tabchar, 80);
  } else {
    return jsb.js_beautify(js_source, tabsize, tabchar);
  }
}
export function pack_js(val) {
  return jsmin.jsmin('', val, "2");
}

export function cssCompress(code) {
  code = code.replace(/\r\n/ig, '');
  code = code.replace(/(\s){2,}/ig, '$1');
  code = code.replace(/\t/ig, '');
  code = code.replace(/\n\}/ig, '\}');
  code = code.replace(/\n\{\s*/ig, '\{');
  code = code.replace(/(\S)\s*\}/ig, '$1\}');
  code = code.replace(/(\S)\s*\{/ig, '$1\{');
  code = code.replace(/\{\s*(\S)/ig, '\{$1');
  return code;
}

export function CSSdecode(code) {
  code = code.replace(/(\s){2,}/ig, '$1');
  code = code.replace(/(\S)\s*\{/ig, '$1 {');
  code = code.replace(/\*\/(.[^\}\{]*)}/ig, '\*\/\n$1}');
  code = code.replace(/\/\*/ig, '\n\/\*');
  code = code.replace(/;\s*(\S)/ig, ';\n\t$1');
  code = code.replace(/\}\s*(\S)/ig, '\}\n$1');
  code = code.replace(/\n\s*\}/ig, '\n\}');
  code = code.replace(/\{\s*(\S)/ig, '\{\n\t$1');
  code = code.replace(/(\S)\s*\*\//ig, '$1\*\/');
  code = code.replace(/\*\/\s*([^\}\{]\S)/ig, '\*\/\n\t$1');
  code = code.replace(/(\S)\}/ig, '$1\n\}');
  code = code.replace(/(\n){2,}/ig, '\n');
  code = code.replace(/:/ig, ':');
  code = code.replace(/  /ig, ' ');
  return code;
}
export function jsonFormat(text) {
  try {
    if (typeof text === "string") {
      return JSON.stringify(JSON.parse(text), null, "    ");
    }
    if (typeof text === "object") {
      return JSON.stringify(text, null, "    ");
    }
  } catch (e) {
    notificationWarning("JSON格式错误，请检查。")
  }
  return text; // text is not string nor object
}

export function jsonCompress(text) {
  return JSON.stringify(JSON.parse(text), null, 0);
}

export function xmlFormat(text) {
  var ar = text.replace(/>\s{0,}</g, "><").replace(/</g, "~::~<").replace(/\s*xmlns\:/g, "~::~xmlns:").replace(/\s*xmlns\=/g, "~::~xmlns=").split('~::~');
  let len = ar.length
  let inComment = false
  let deep = 0
  let str = ''
  let ix = 0
  let shift = createShiftArr("    ");
  for (ix = 0; ix < len; ix++) {
    // start comment or <![CDATA[...]]> or <!DOCTYPE //
    if (ar[ix].search(/<!/) > -1) {
      str += shift[deep] + ar[ix];
      inComment = true;
      // end comment  or <![CDATA[...]]> //
      if (ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1) {
        inComment = false;
      }
    } else
      // end comment  or <![CDATA[...]]> //
      if (ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
        str += ar[ix];
        inComment = false;
      } else
        // <elm></elm> //
        if (/^<\w/.exec(ar[ix - 1]) && /^<\/\w/.exec(ar[ix]) &&
          /^<[\w:\-\.\,]+/.exec(ar[ix - 1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/', '')) {
          str += ar[ix];
          if (!inComment) deep--;
        } else
          // <elm> //
          if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1) {
            str = !inComment ? str += shift[deep++] + ar[ix] : str += ar[ix];
          } else
            // <elm>...</elm> //
            if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
              str = !inComment ? str += shift[deep] + ar[ix] : str += ar[ix];
            } else
              // </elm> //
              if (ar[ix].search(/<\//) > -1) {
                str = !inComment ? str += shift[--deep] + ar[ix] : str += ar[ix];
              } else
                // <elm/> //
                if (ar[ix].search(/\/>/) > -1) {
                  str = !inComment ? str += shift[deep] + ar[ix] : str += ar[ix];
                } else
                  // <? xml ... ?> //
                  if (ar[ix].search(/<\?/) > -1) {
                    str += shift[deep] + ar[ix];
                  } else
                    // xmlns //
                    if (ar[ix].search(/xmlns\:/) > -1 || ar[ix].search(/xmlns\=/) > -1) {
                      str += shift[deep] + ar[ix];
                    }

    else {
      str += ar[ix];
    }
  }

  return (str[0] == '\n') ? str.slice(1) : str;
}

export function xmlCompress(text) {
  var str = this.preserveComments ? text :
    text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, "")
    .replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns');
  return str.replace(/>\s{0,}</g, "><");
}

export function sqlFormat(text) {
  var ar_by_quote = text.replace(/\s{1,}/g, " ").replace(/\'/ig, "~::~\'").split('~::~');
  let len = ar_by_quote.length
  let ar = []
  let deep = 0
  let tab = "    " //+this.step,
  let parenthesisLevel = 0
  let str = ''
  let ix = 0;
  let shift = createShiftArr("    ");
  for (ix = 0; ix < len; ix++) {
    if (ix % 2) {
      ar = ar.concat(ar_by_quote[ix]);
    } else {
      ar = ar.concat(split_sql(ar_by_quote[ix], tab));
    }
  }

  len = ar.length;
  for (ix = 0; ix < len; ix++) {

    parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);

    if (/\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix])) {
      ar[ix] = ar[ix].replace(/\,/g, ",\n" + tab + tab + "");
    }

    if (/\s{0,}\s{0,}SET\s{0,}/.exec(ar[ix])) {
      ar[ix] = ar[ix].replace(/\,/g, ",\n" + tab + tab + "");
    }

    if (/\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix])) {
      deep++;
      str += shift[deep] + ar[ix];
    } else
    if (/\'/.exec(ar[ix])) {
      if (parenthesisLevel < 1 && deep) {
        deep--;
      }
      str += ar[ix];
    } else {
      str += shift[deep] + ar[ix];
      if (parenthesisLevel < 1 && deep) {
        deep--;
      }
    }
  }
  str = str.replace(/^\n{1,}/, '').replace(/\n{1,}/g, "\n");
  return str;
}

export function sqlCompress(text) {
  return text.replace(/\s{1,}/g, " ").replace(/\s{1,}\(/, "(").replace(/\s{1,}\)/, ")");
}



function createShiftArr(step) {
  var space = '    ';
  if (isNaN(parseInt(step))) { // argument is string
    space = step;
  } else { // argument is integer
    space = new Array(step + 1).join(' '); //space is result of join (a string), not an array
  }
  var shift = ['\n']; // array of shifts
  for (var ix = 0; ix < 100; ix++) {
    shift.push(shift[ix] + space);
  }
  return shift;
};

function split_sql(str, tab) {
  return str.replace(/\s{1,}/g, " ")
    .replace(/ AND /ig, "~::~" + tab + tab + "AND ")
    .replace(/ BETWEEN /ig, "~::~" + tab + "BETWEEN ")
    .replace(/ CASE /ig, "~::~" + tab + "CASE ")
    .replace(/ ELSE /ig, "~::~" + tab + "ELSE ")
    .replace(/ END /ig, "~::~" + tab + "END ")
    .replace(/ FROM /ig, "~::~FROM ")
    .replace(/ GROUP\s{1,}BY/ig, "~::~GROUP BY ")
    .replace(/ HAVING /ig, "~::~HAVING ")
    //.replace(/ SET /ig," SET~::~")
    .replace(/ IN /ig, " IN ")
    .replace(/ JOIN /ig, "~::~JOIN ")
    .replace(/ CROSS~::~{1,}JOIN /ig, "~::~CROSS JOIN ")
    .replace(/ INNER~::~{1,}JOIN /ig, "~::~INNER JOIN ")
    .replace(/ LEFT~::~{1,}JOIN /ig, "~::~LEFT JOIN ")
    .replace(/ RIGHT~::~{1,}JOIN /ig, "~::~RIGHT JOIN ")
    .replace(/ ON /ig, "~::~" + tab + "ON ")
    .replace(/ OR /ig, "~::~" + tab + tab + "OR ")
    .replace(/ ORDER\s{1,}BY/ig, "~::~ORDER BY ")
    .replace(/ OVER /ig, "~::~" + tab + "OVER ")
    .replace(/\(\s{0,}SELECT /ig, "~::~(SELECT ")
    .replace(/\)\s{0,}SELECT /ig, ")~::~SELECT ")
    .replace(/ THEN /ig, " THEN~::~" + tab + "")
    .replace(/ UNION /ig, "~::~UNION~::~")
    .replace(/ USING /ig, "~::~USING ")
    .replace(/ WHEN /ig, "~::~" + tab + "WHEN ")
    .replace(/ WHERE /ig, "~::~WHERE ")
    .replace(/ WITH /ig, "~::~WITH ")
    //.replace(/\,\s{0,}\(/ig,",~::~( ")
    //.replace(/\,/ig,",~::~"+tab+tab+"")
    .replace(/ ALL /ig, " ALL ")
    .replace(/ AS /ig, " AS ")
    .replace(/ ASC\s*/ig, " ASC ")
    .replace(/ DESC\s*/ig, " DESC ")
    .replace(/ DISTINCT /ig, " DISTINCT ")
    .replace(/ EXISTS /ig, " EXISTS ")
    .replace(/ NOT /ig, " NOT ")
    .replace(/ NULL /ig, " NULL ")
    .replace(/ LIKE /ig, " LIKE ")
    .replace(/\s{0,}SELECT /ig, "SELECT ")
    .replace(/\s{0,}UPDATE /ig, "UPDATE ")
    .replace(/ SET /ig, " SET ")
    .replace(/~::~{1,}/g, "~::~")
    .split('~::~');
};

function isSubquery(str, parenthesisLevel) {
  return parenthesisLevel - (str.replace(/\(/g, '').length - str.replace(/\)/g, '').length);
};




export function notificationWarning(message) {
  Notification({
    title: "警告",
    message: message,
    type: "warning"
  });
}
