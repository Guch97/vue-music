import { isUndefined, upperFirst } from 'lodash';

export const addClass = (el, className) => {
    if(hasClass(el, className)) {
        return;
    }
    const newClassName = el.className.split(' ');
    newClassName.push(className);
    el.className = newClassName.join(' ');
};

export const hasClass = (el, className) => {
    const reg = new RegExp('(^|\\s)' + className + '($|\\s)');
    return reg.test(el.className);
};

export const getData = (el, name, val) => {
  const prefix = 'data-';
  name = prefix + name;
  if(val) {
    return el.setAttribute(name, val);
  } else {
    return el.getAttribute(name);
  }
};

const elementStyle = document.createElement('div').style;
const vendor = (() => {
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for(let key in transformNames) {
    if(!isUndefined(elementStyle[transformNames[key]])) {
      return key;
    }
  }

  return false;
})();

export const prefixStyle = (style) => {
  if(vendor === false) {
    return false;
  }
  if(vendor === 'standard') {
    return style;
  }
  return `${vendor}${upperFirst(style)}`;
};
