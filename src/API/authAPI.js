
// export const API_BASE_URL = "http://13.201.134.253:5000/api/admin"; 
export const API_BASE_URL = "http://3.110.119.145:5000/api/admin"; 
// export const API_BASE_URL = "http://localhost:5000/api/admin";
// export const API_BASE_URL =  "https://Health Carebackend.onrender.com/api";
export const API_ENDPOINTS = {
  //USER CRUD
  REGISTER: `${API_BASE_URL}/add-user`,
  LOGIN: `${API_BASE_URL}/login`,
  GET_USER: `${API_BASE_URL}/getall-user`,
  DELETE_USER: (id) => `${API_BASE_URL}/delete-user/${id}`,
  GETBYID_USER: (id) => `${API_BASE_URL}/getbyid-user/${id}`,
  UPDATEBYID_USER: (id) => `${API_BASE_URL}/update-user/${id}`,
  //CITY CRUD
  ADD_CITY: `${API_BASE_URL}/add-city`,
  GETALL_CITY: `${API_BASE_URL}/getall-city`,
  DELETE_CITY: (id) => `${API_BASE_URL}/delete-city/${id}`,
  GETBYID_CITY: (id) => `${API_BASE_URL}/getbyid-city/${id}`,
  UPDATEBYID_CITY: (id) => `${API_BASE_URL}/update-city/${id}`,
  //TREATMENTS CRUD
  ADD_TREATMENTS: `${API_BASE_URL}/add-treatments`,
  GETALL_TREATMENTS: `${API_BASE_URL}/getall-treatments`,
  DELETE_TREATMENTS: (id) => `${API_BASE_URL}/delete-treatments/${id}`,
  GETBYID_TREATMENTS: (id) => `${API_BASE_URL}/getbyid-treatments/${id}`,
  UPDATEBYID_TREATMENTS: (id) => `${API_BASE_URL}/update-treatments/${id}`,
  //CONDITIONS CRUD
  ADD_CONDITIONS: `${API_BASE_URL}/add-conditions`,
  GETALL_CONDITIONS: `${API_BASE_URL}/getall-conditions`,
  DELETE_CONDITIONS: (id) => `${API_BASE_URL}/delete-conditions/${id}`,
  GETBYID_CONDITIONS: (id) => `${API_BASE_URL}/getbyid-conditions/${id}`,
  UPDATEBYID_CONDITIONS: (id) => `${API_BASE_URL}/update-conditions/${id}`,
  //Hospital CRUD
  ADD_HOSPITAL: `${API_BASE_URL}/add-hospital`,
  GETALL_HOSPITAL: `${API_BASE_URL}/getall-hospital`,
  DELETE_HOSPITAL: (id) => `${API_BASE_URL}/delete-hospital/${id}`,
  GETBYID_HOSPITAL: (id) => `${API_BASE_URL}/getbyid-hospital/${id}`,
  UPDATEBYID_HOSPITAL: (id) => `${API_BASE_URL}/update-hospital/${id}`,
  //Doctor CRUD
  ADD_DOCTOR: `${API_BASE_URL}/add-doctor`,
  GETALL_DOCTOR: `${API_BASE_URL}/getall-doctor`,
  DELETE_DOCTOR: (id) => `${API_BASE_URL}/delete-doctor/${id}`,
  GETBYID_DOCTOR: (id) => `${API_BASE_URL}/getbyid-doctor/${id}`,
  UPDATEBYID_DOCTOR: (id) => `${API_BASE_URL}/update-doctor/${id}`,
  //GETALL Appointment
  GETALL_APPOINTMENT: `${API_BASE_URL}/getall-book-app`,
  //Account Details
  GETALL_ACCOUNTDETAILS: `${API_BASE_URL}/getall-accountDetails`,
  //update comission
  UPDATE_COMMISION: `${API_BASE_URL}/update-comission`,
  //Banners CRUD
  ADD_BANNER: `${API_BASE_URL}/add-banner`,
  GETALL_BANNER: `${API_BASE_URL}/getall-banner`,
  DELETE_BANNER: (id) => `${API_BASE_URL}/delete-banner/${id}`,
  GETBYID_BANNER: (id) => `${API_BASE_URL}/getbyid-banner/${id}`,
  UPDATEBYID_BANNER: (id) => `${API_BASE_URL}/update-banner/${id}`,

    //GETALL Doctor Refferals
    GETALL_DOCTOR_REFFERALS: `${API_BASE_URL}/getall-doctor-refer`,


     //Partner CRUD
  ADD_PARTNER: `${API_BASE_URL}/add-partner`,
  GETALL_PARTNER: `${API_BASE_URL}/getall-partner`,
  DELETE_PARTNER: (id) => `${API_BASE_URL}/delete-partner/${id}`,
  GETBYID_PARTNER: (id) => `${API_BASE_URL}/getbyid-partner/${id}`,
  UPDATEBYID_PARTNER: (id) => `${API_BASE_URL}/update-partner/${id}`,
};