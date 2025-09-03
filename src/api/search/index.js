import api from "@/plugins/axiosInterceptor";

const naemSearch = async (name) => {
    try {
        const response = await api.get(`/api/products/searchAndSort?name=${name}`);

        return response.data.results;
    } catch (error) {
        console.error('이름 검색 오류:', error);
        return { content: [], totalPages: 0, totalElements: 0 };
    }
}

export default { naemSearch }