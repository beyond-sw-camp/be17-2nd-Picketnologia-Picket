import api from "@/plugins/axiosInterceptor";


const register = async (req) => {
    let data = {};
    let url = '/api/qna/qna_create_post';

    await api.post(url, req)
        .then((res) => {
            data = res.data;
        })
        .catch((error) => {
            data = error.data;
        });

    return data;
}



const userIdxQnaList = async (dateInfo) => {
    let data = {};
    let url = '/api/qna/userQnaList';

    await api.get(url, { params: dateInfo })
        .then((res) => {
            data = res.data;
        })
        .catch((error) => {
            data = error.data;
        });

    return data;
}

export default { userIdxQnaList, register }

