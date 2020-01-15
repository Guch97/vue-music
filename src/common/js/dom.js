//推荐页面className
export function addClass(el,className){
    if(hasClass(el,className)){
      return
    }
    let newClass=el.className.split('')
    newClass.push(className)
    el.className=newClass.join('')
}

export function hasClass(el,className){
  let reg=new RegExp('(^|\\s)'+className+'(\\s|$)')
  return reg.test(el.className)

}

//singer 快速入口点击data-index
export function getData(el,name,val){
    const prefix='data-'
    if(val){
      return el.setAttribute(prefix+name,val)
    }else{
      return el.getAttribute(prefix+name)
    }
}