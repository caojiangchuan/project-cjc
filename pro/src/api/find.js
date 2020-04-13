import http from '../config/index';
import apiUrl from './apiUrl';
function find(name, age) {
    return new Promise((resolve, reject) => {
        http.post(apiUrl.find, {
            name: name,
            age: age
        }, res => {
            resolve(res);
        });
    });
}
export default {
    find
}
