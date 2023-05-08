import { getApi } from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const getdoctors = async () => {
    const response = await getApi()
        .get('/doctor/all')
        .then((res) => {
            return buildResponse(true, res.data);
        }).catch((err) => {
            return buildResponse(false, err.response.data, err.response.status);
        });
    return response;
};

export const GetAvailableBookings = async (doctorId) => {
    const response = await getApi()
        .get(`/appointment/available_bookings/${doctorId}`)
        .then((res) => {
            return buildResponse(true, res.data);
        }).catch((err) => {
            return buildResponse(false, err.response.data, err.response.status);
        });
    return response;
};

export const MakeABooking = async (bookingData) => {
    const response = await getApi()
        .post('/appointment/booking', bookingData)
        .then((res) => {
            return buildResponse(true, res.data);
        }).catch((err) => {
            return buildResponse(false, err.response.data, err.response.status);
        });
    return response;
}