module.exports = {
    devServer: {
        before(app) {
            app.get('/api/getTopBanner', function(req, res) {
                const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
                const jumpPrefix = 'https://y.qq.com/n/yqq/album/'

                axios.get(url, {
                    headers: {
                        referer: 'https://u.y.qq.com/',
                        host: 'u.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    response = response.data
                    if (response.code === 0) {
                        const slider = []
                        const content = response.focus.data && response.focus.data.content
                        if (content) {
                            for (let i = 0; i < content.length; i++) {
                                const item = content[i]
                                const sliderItem = {}
                                sliderItem.id = item.id
                                sliderItem.linkUrl = jumpPrefix + item.jump_info.url + '.html'
                                sliderItem.picUrl = item.pic_info.url
                                slider.push(sliderItem)
                            }
                        }
                        res.json({
                            code: 0,
                            data: {
                                slider
                            }
                        })
                    } else {
                        res.json(response)
                    }
                }).catch((e) => {
                    console.log(e)
                })
            })
        }
    }
}