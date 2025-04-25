import axios from "axios";
import { API_ENDPOINTS } from "../API/authAPI";
import axiosInstance from "../interceptor";
const token = localStorage.getItem('token');
export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, userData, {
            headers: {
                'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error in registerUser function:", error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(API_ENDPOINTS.LOGIN, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
       
        return response;
    } catch (error) {
        console.error("Error in registerUser function:", error);
        throw error;
    }
};


export const getAllUser = async (search = "", page = 1) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_USER, {
            headers: { Authorization: `Bearer ${token}` },
            params: { search, page, limit: 10 }
        });

        if (response?.data?.users) {
            return {
                users: response.data.users, 
                totalPages: response.data.totalPages 
            };
        }
        return { users: [], totalPages: 1 };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { users: [], totalPages: 1 };
    }
};

export const getAllUserWithoutSearch = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_USER, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response?.data || []; // Ensure an array is always returned
    } catch (error) {
        console.error("Error fetching users:", error);
        return []; // Return empty array on error to avoid breaking frontend logic
    }
};


export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_USER(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const getbyidUser = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETBYID_USER(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data?.user;
    } catch (error) {
        console.error("Error feching user:", error);
        throw error;
    }
};


export const updateByIDUser = async (userData, id) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATEBYID_USER(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Ensure token is correctly passed
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};

export const addCity = async (data) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ADD_CITY, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in function:", error);
        throw error;
    }
};

export const getAllCityWithoutSearch = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_CITY, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response?.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { categories: [], totalPages: 1 };
    }
};

export const deleteCity = async (id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_CITY(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const getbyidCity = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETBYID_CITY(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error feching user:", error);
        throw error;
    }
};


export const updateByIDCity= async (userData, id) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATEBYID_CITY(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Ensure token is correctly passed
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};

export const addTreatments = async (data) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ADD_TREATMENTS, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in function:", error);
        throw error;
    }
};

export const getAllTreatmentsWithoutSearch = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_TREATMENTS, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response?.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { categories: [], totalPages: 1 };
    }
};

export const deleteTreatments = async (id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_TREATMENTS(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const getbyidTreatments = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETBYID_TREATMENTS(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error feching user:", error);
        throw error;
    }
};


export const updateByIDTreatments= async (userData, id) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATEBYID_TREATMENTS(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Ensure token is correctly passed
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};


export const addConditions = async (data) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ADD_CONDITIONS, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in function:", error);
        throw error;
    }
};

export const getAllConditionsWithoutSearch = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_CONDITIONS, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response?.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { categories: [], totalPages: 1 };
    }
};

export const deleteConditions = async (id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_CONDITIONS(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const getbyidConditions = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETBYID_CONDITIONS(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error feching user:", error);
        throw error;
    }
};


export const updateByIDConditions= async (userData, id) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATEBYID_CONDITIONS(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Ensure token is correctly passed
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};

export const addHospitals = async (data) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ADD_HOSPITAL, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in function:", error);
        throw error;
    }
};

export const getAllHospitals = async (search = "", page = 1) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_HOSPITAL, {
            headers: { Authorization: `Bearer ${token}` },
            params: { search, page: parseInt(page), limit: 10 }
        });

        if (response?.data?.hospitals) {
            return {
                hospitals: response.data.hospitals,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            };
        }
        return { hospitals: [], totalPages: 1, currentPage: 1 };
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        return { hospitals: [], totalPages: 1, currentPage: 1 };
    }
};
export const getAllWithoutSearchHospitals = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_HOSPITAL, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response?.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { categories: [], totalPages: 1 };
    }
};

export const deleteHospitals = async (id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_HOSPITAL(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const getbyidHospitals = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETBYID_HOSPITAL(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error feching user:", error);
        throw error;
    }
};


export const updateByIDHospitals= async (userData, id) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATEBYID_HOSPITAL(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Ensure token is correctly passed
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};



export const addDoctor = async (data) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ADD_DOCTOR, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in function:", error);
        throw error;
    }
};

export const getAllDoctor = async (search = "", page = 1) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_DOCTOR, {
            headers: { Authorization: `Bearer ${token}` },
            params: { search, page: parseInt(page), limit: 10 }
        });

        if (response?.data) {
            return {
                hospitals: response.data,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            };
        }
        return { hospitals: [], totalPages: 1, currentPage: 1 };
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        return { hospitals: [], totalPages: 1, currentPage: 1 };
    }
};

export const getAllWithoutSearchDoctor = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_DOCTOR, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response?.data;
    } catch (error) {
        console.error("Error fetching Doctor:", error);
        return { error};
    }
};
export const deleteDoctor = async (id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_DOCTOR(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const getbyidDoctor = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETBYID_DOCTOR(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error feching user:", error);
        throw error;
    }
};


export const updateByIDDoctor= async (userData, id) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATEBYID_DOCTOR(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Ensure token is correctly passed
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};


export const getAllAppointment = async (search = "", page = 1) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_APPOINTMENT, {
            headers: { Authorization: `Bearer ${token}` },
            params: { search, page: parseInt(page), limit: 10 }
        });

        if (response?.data) {
            return {
                bookApp: response.data,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            };
        }
        return { bookApp: [], totalPages: 1, currentPage: 1 };
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        return { bookApp: [], totalPages: 1, currentPage: 1 };
    }
};

export const getAllAccountDetails = async (search = "", page = 1) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_ACCOUNTDETAILS, {
            headers: { Authorization: `Bearer ${token}` },
            params: { search, page: parseInt(page), limit: 10 }
        });

        if (response?.data) {
            return {
                accountDetail: response.data,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            };
        }
        return { accountDetail: [], totalPages: 1, currentPage: 1 };
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        return { accountDetail: [], totalPages: 1, currentPage: 1 };
    }
};


export const updateComission = async (data) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATE_COMMISION, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in function:", error);
        throw error;
    }
};


export const addBanner = async (data) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ADD_BANNER, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in function:", error);
        throw error;
    }
};

export const getAllBannerWithoutSearch = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_BANNER, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response?.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { categories: [], totalPages: 1 };
    }
};

export const deleteBanner= async (id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_BANNER(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const getbyidBanner = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETBYID_BANNER(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error feching user:", error);
        throw error;
    }
};


export const updateByIDBanner= async (userData, id) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATEBYID_BANNER(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Ensure token is correctly passed
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};


export const getAllDoctorRefferals= async (search = "", page = 1) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_DOCTOR_REFFERALS, {
            headers: { Authorization: `Bearer ${token}` },
            params: { search, page, limit: 10 }
        });

        if (response?.data?.referrals) {
            return {
                refferals: response.data.referrals, 
                totalPages: response.data.totalPages 
            };
        }
        return { refferals: [], totalPages: 1 };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { refferals: [], totalPages: 1 };
    }
};



export const addPartner = async (data) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ADD_PARTNER, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in function:", error);
        throw error;
    }
};

export const getAllPartner = async (search = "", page = 1) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_PARTNER, {
            headers: { Authorization: `Bearer ${token}` },
            params: { search, page: parseInt(page), limit: 10 }
        });

        if (response?.data) {
            return {
                partners: response.data.partners,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            };
        }
        return { partners: [], totalPages: 1, currentPage: 1 };
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        return { hospitals: [], totalPages: 1, currentPage: 1 };
    }
};

export const getAllWithoutSearchPartner = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_PARTNER, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response?.data;
    } catch (error) {
        console.error("Error fetching Doctor:", error);
        return { error};
    }
};
export const deletePartner = async (id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_PARTNER(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const getbyidPartner = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETBYID_PARTNER(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data?.partner;
    } catch (error) {
        console.error("Error feching user:", error);
        throw error;
    }
};


export const updateByIDPartner= async (userData, id) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATEBYID_PARTNER(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Ensure token is correctly passed
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};