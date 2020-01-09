import originJSONP from 'jsonp';

const param = (data) => {
    let url = '';
    for (const key in data) {
        const value = data[key] !== undefined ? data[key] : '';
        url += `&${key}=${encodeURIComponent(value)}`;
    }
    return url ? url.substring(1) : '';
};

const jsonp = (url, data, option) => {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
};

export default jsonp;