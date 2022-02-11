import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/';

const api = axios.create({
    baseURL: baseUrl,
});

export const getLang = async(lang='en') => {
    return await api.get(`langs/${lang}`);
}

export const getCheckUserName = async(name='') => {
    return await api.get(`users/checkUserName/${name}`);
}

export const addUser = async(userData) => {
    const userExist = await getCheckUserName(
        userData?.name || ''
    );
    console.log({userExist});
    if(userExist.data.error) return userExist.data;

    return await api.post(`users/`, userData);
}