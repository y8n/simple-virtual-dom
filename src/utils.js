export function isString(value) {
    return typeof value === 'string';
}
export function isArray(value) {
    return Array.isArray(value);
}
export function isUndefined(value) {
    return typeof value === 'undefined';
}
export function isUndef(value){
    return typeof value === 'undefined' || value === null;
}

export function setAttr(node, key, value) {
    switch (key) {
        case 'style':
            let styleValue = '';
            if (isString(value)) {
                styleValue = value;
            } else {
                each(value, function(val, prop) {
                    styleValue += hump2lineae(prop) + ':' + String(val) + ';';
                });
            }
            node.style = styleValue;
            break;
        case 'value':
            var tagName = node.tagName || '';
            tagName = tagName.toLowerCase();
            if (
                tagName === 'input' || tagName === 'textarea'
            ) {
                node.value = value;
            } else {
                // if it is not a input or textarea, use `setAttribute` to set
                node.setAttribute(key, value);
            }
            break;
        default:
            node.setAttribute(key, value);
    }
}

function hump2lineae(str) {
    return str.replace(/[A-Z]/g, function(m, index) {
        return (index !== 0 ? '-' : '') + m.toLowerCase();
    });
}
export function toArray (listLike) {
  if (!listLike) {
    return [];
  }

  var list = [];

  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i]);
  }

  return list;
}

export function each(list, fn) {
    if (Array.isArray(list)) {
        list.forEach(fn);
    } else if (typeof list === 'object') {
        for (const key in list) {
            fn(list[key], key);
        }
    }
}