import api from "@/plugins/axiosInterceptor";

const reservationIdxList = async (dateInfo) => {
    let data = {};
    let url = '/api/order/ReservationList';

    await api.get(url, { params: dateInfo })
        .then((res) => {
            data = res.data;
        })
        .catch((error) => {
            data = error.data;
        });

    return data;
}
export default { reservationIdxList }