const singer = {
    state: {
        singer: {}
    },
    mutations: {
        SET_SINGER(state, singer) {
            console.log(singer)
            state.singer = singer
        }
    },
    actions: {

    }
}

export default singer