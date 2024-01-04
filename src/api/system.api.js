import { request } from './request'

export const switchMode = (mode) => request('get', `/switchMode/${mode}`);
export const changeStatus = (data) => request('post', `/changeStatus`, data);
// { item: '', status: '' }
export const getPreStatus = () => request('get', `/getPreStatus`);