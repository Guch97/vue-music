//推荐页面className
export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split('')
    newClass.push(className)
    el.className = newClass.join('')
}

export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)

}

//singer 快速入口点击data-index
export function getData(el, name, val) {
    const prefix = 'data-'
    if (val) {
        return el.setAttribute(prefix + name, val)
    } else {
        return el.getAttribute(prefix + name)
    }
}

//css transform 封装
let elementStyle = document.createElement('div').style

let vendor = (() => {
    let transofrmNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }
    for (let key in transofrmNames) {
        if (elementStyle[transofrmNames[key]] !== undefined) {
            return key
        }
    }
    return false
})()

export function prefixStyle(style) {
    if (vendor === false) {
        return false
    }
    if (vendor === 'standard') {
        return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1)

}