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




const getQnas = async (productId, page = 1, size = 5) => {
    try {
        const backendPage = page - 1;
        const response = await api.get(`/api/qna/qnaPaging?productId=${productId}&page=${backendPage}&size=${size}`);

        return response.data.results;
    } catch (error) {
        console.error('QnA 조회 오류:', error);
        return { content: [], totalPages: 0, totalElements: 0 };
    }
}

export default { userIdxQnaList, register, getQnas }


