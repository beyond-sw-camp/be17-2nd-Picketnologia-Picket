import api from "@/plugins/axiosInterceptor";

const register = async (req) => {
    let data = {};
    let url = 'http://localhost:8080/products/register';

    await api.post(url, req)
        .then((res) => {
            data = res.data;
        })
        .catch((error) => {
            data = error.data;
        });

    return data;
}

const getReviews = async (page = 1, size = 5) => {
    try {
        const backendPage = page - 1;
        const response = await api.get(`http://localhost:8080/products/listPaging?page=${backendPage}&size=${size}`);

        return response.data.results;
    } catch (error) {
        console.error('리뷰 조회 오류:', error);
        return { content: [], totalPages: 0, totalElements: 0 };
    }
}
export default { register, getReviews };