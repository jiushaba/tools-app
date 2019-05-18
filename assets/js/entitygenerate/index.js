//引入通知组件
import {
  Notification
} from 'element-ui';
export var jsonChilds = []

// json转实体
export function extractJson(title, obj) {
  var sb = "public class " + title;
  sb += "\r\n{";
  var i = 0;
  for (var name in obj) {
    var val = obj[name];
    var type = typeof val;
    if (
      val == null ||
      type == "number" ||
      type == "string" ||
      type == "boolean"
    ) {
      if (type == "number") {
        type = "int";
      }
      if (type == "boolean") {
        type = "bool";
      }
      if (type == "object") {
        type = "string";
      }
      sb +=
        (i > 0 ? "\r\n" : "") +
        "\r\n\tpublic " +
        type +
        " " +
        name +
        " { get; set; }";
    } else {
      if (val.length == undefined) {
        sb +=
          (i > 0 ? "\r\n" : "") +
          "\r\n\tpublic " +
          name +
          " " +
          name +
          " { get; set; }";
        jsonChilds.push({
          name: name,
          value: val
        });
      } else {
        if (val[0].toString() != "[object Object]") {
          sb +=
            (i > 0 ? "\r\n" : "") +
            "\r\n\tpublic List<string> " +
            name +
            " { get; set; }";
        } else {
          sb +=
            (i > 0 ? "\r\n" : "") +
            "\r\n\tpublic List<" +
            name +
            "> " +
            name +
            " { get; set; }";
          jsonChilds.push({
            name: name,
            value: val[0]
          });
        }
      }
    }
    i++;
  }
  sb += "\r\n}";
  return sb;
}
export function extractJavaJson(title, obj) {
  var sb = "public class " + title;
  sb += "\r\n{";
  var i = 0;
  var props = [];
  for (var name in obj) {
    var val = obj[name];
    var type = typeof (val);
    if (val == null || type == "number" || type == "string" || type == "boolean") {
      if (type == "number") {
        type = "int";
      }
      if (type == "string" || type == "object") {
        type = "String";
      }
      if (type == "boolean") {
        type = "boolean";
      }
      sb += (i > 0 ? "\r\n" : "") + getJavaEntity(type, name);
      props.push({
        "type": type,
        "name": name
      });
    } else {
      if (val.length == undefined) {
      
        sb += (i > 0 ? "\r\n" : "") + getJavaEntity(name, name);
        props.push({
          "type": name,
          "name": name
        });
        jsonChilds.push({
          "name": name,
          "value": val
        });
      } else {
       
        if (val[0].toString() != "[object Object]") {
          sb += (i > 0 ? "\r\n" : "") + getJavaEntity("List<String>", name);
          props.push({
            "type": "List<String>",
            "name": name
          });
        } else {
          sb += (i > 0 ? "\r\n" : "") + getJavaEntity("List<" + name + ">", name);
          props.push({
            "type": "List<" + name + ">",
            "name": name
          });
          jsonChilds.push({
            "name": name,
            "value": val[0]
          });

        }
      }
    }
    i++;
  }
  for (var p in props) {
    sb += getJavaPropEntity(props[p].type, props[p].name);
  }
  sb += "\r\n}";
  return sb;
}

function getJavaEntity(type, name) {
  var sb = "";
  sb += "\r\n\tprivate " + type + " " + name.toLowerCase() + ";";
  return sb;
}

function getJavaPropEntity(type, name) {
  var sb = "";
  name = nameCase(name);
  sb += "\r\n\r\n\tpublic " + type + " get" + name + "(){";
  sb += "\r\n\t\treturn this." + name.toLowerCase() + ";";
  sb += "\r\n\t}";
  sb += "\r\n\tpublic void set" + name + "(" + type + " " + name.toLowerCase() + "){";
  sb += "\r\n\t\tthis." + name.toLowerCase() + " = " + name.toLowerCase() + ";";
  sb += "\r\n\t}";
  return sb;
}

function nameCase(name) {
  var str = "";
  for (var i = 0; i < name.length; i++) {
    if (i == 0) {
      str += name[i].toUpperCase();
    } else {
      str += name[i].toLowerCase();
    }
  }
  return str;
}

export function notificationWarning(message) {
  Notification({
    title: "警告",
    message: message,
    type: "warning"
  });
}


export const JsonStringData = '{\n' +
  '  "error_code": 0,\n' +
  '  "reason": "Success",\n' +
  '  "result": {\n' +
  '      "realname": "张三",\n' +
  '      "idcard": "330329199001020022",\n' +
  '      "isok": false,\n' +
  '      "IdCardInfor": {\n' +
  '      "area": "山西省太原市清徐县",\n' +
  '      "sex": "男",\n' +
  '      "birthday": "1985-4-10"\n' +
  '      }\n' +
  '  }\n' +
  '}'

function getFieldType(t) {
  var slt = "string";
  switch (t) {
    case "i":
      slt = "int";
      break;
    case "s":
      slt = "string";
      break;
    case "d":
      slt = "DateTime";
      break;
    case "b":
      slt = "bool";
      break;
  }
  return slt;
}

function getJavaFieldType(t) {
  var slt = "String";
  switch (t) {
    case "i":
      slt = "int";
      break;
    case "s":
      slt = "String";
      break;
    case "d":
      slt = "Date";
      break;
    case "b":
      slt = "boolean";
      break;
  }
  return slt;
}
export function strToCEntity(strVal) {
  var arr = strVal.split(/,|，/);
  if (arr != null && arr.length > 0) {
    var sb = "public class Object";
    sb += "\r\n{";
    var props = [];
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      var name = item;
      var type = "string";
      if (/(\w+)\((\w)+\)/.test(item)) {
        var t = /(\w+)\((\w)+\)/.exec(item);
        name = t[1]
        type = getFieldType(t[2]);
      }
      sb += ((i > 0 ? "\r\n" : "") + "\r\n\tpublic " + type + " " + name + " { get; set; }");
    }
    for (var p in props) {
      sb += getJavaPropEntity(props[p].type, props[p].name);
    }
    sb += "\r\n}";
    return sb;
  }
}

export function strToJavaEntity(strVal) {
  var arr = strVal.split(/,|，/);
  if (arr != null && arr.length > 0) {
    var sb = "public class Object";
    sb += "\r\n{";
    var props = [];
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      var name = item;
      var type = "string";
      if (/(\w+)\((\w)+\)/.test(item)) {
        var t = /(\w+)\((\w)+\)/.exec(item);
        name = t[1]
        type = getJavaFieldType(t[2]);
      }
      if (type == "string") {
        type = "String";
      }
      sb += (i > 0 ? "\r\n" : "") + getJavaEntity(type, name);
      props.push({
        "type": type,
        "name": name
      });
    }
    for (var p in props) {
      sb += getJavaPropEntity(props[p].type, props[p].name);
    }
    sb += "\r\n}";
    return sb;
  }
}

export const stringData='index(i),card(s),meg(i),dhs(d),cl(b),od'
