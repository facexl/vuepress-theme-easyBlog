/**
 * 毫秒转时间
 * @param ms 毫秒
 * @param format 格式
 */
export const formatDate = (ms, format= 'YYYY-MM-DD') => {
    const dt = new Date(ms);
    switch (format) {
    case 'YYYY-MM-DD HH:mm:ss':
        return [
            [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'),
            [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(':'),
        ].join(' ').replace(/(?=\b\d\b)/g, '0');
    default:
        return [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-').replace(/(?=\b\d\b)/g, '0');
    }
};