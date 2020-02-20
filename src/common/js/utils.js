function getRandinUbt(min, max) {
    //取值min——min，max中间数 
    return Math.floor(Math.random() * (max - min) + min)
}




export function shuffle(arr) {
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandinUbt(0, i)
        let temp = _arr[i]
        _arr[i] = arr[j]
        _arr[j] = temp
    }
    return _arr
}

//节流函数
export function debounce(func, delay) {
    let timer
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}