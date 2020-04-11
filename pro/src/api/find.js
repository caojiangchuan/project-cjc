import http from '../config/index';
const find = new Promise((resolve, reject) => {
    http.post('/find', {name: 'tom', age: 10}, response => {
        resolve(response);
    });
});
export default {
    find
}
