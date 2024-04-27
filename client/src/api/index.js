import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:8000" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("user_info")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user_info")).token}`
    }

    return req;
})

export const signIn = (data,api) => API.post(api+"/signin", data)

export const signUp = (data,api) => API.post("staff/register-patient", data)
export const signUpDoctor = (data,api) => API.post("staff/register-doctor", data)

export const createPrescription = (data,api) => API.post("doctor/prescription", data)

export const generateInvoice = (data) => API.post("staff/generateInvoice", data)

export const getAllServices = (data) => API.get(`/staff/allServiceDetails`)
export const addService = (data) => API.post(`/staff/addService`,data)
export const createmedicalrecord= (data) => API.post(`/patient/insertMedicalRecord`,data)

export const updateService = (data) => API.post(`/staff/updateService`,data)
export const deleteService = (data) => API.post(`/staff/deleteService`,data)


export const getAllPatients = (data) => API.get(`/patient/allPatients`)
export const getmedicalRecord = (data) => API.post(`/doctor/viewPatientRecord`,data)

export const getInvoiceDetail = (data) => API.post(`/patient/viewInvoices`,data)

// export const signInGoogle = (accessToken) => API.post("/users/signin", {
//     googleAccessToken: accessToken
// })

// export const signUp = (data) => API.post("/users/signup", data)
// export const signUpGoogle = (accessToken) => API.post("/users/signup", {
//     googleAccessToken: accessToken
// })

// export const sendEmail = (data) => API.post("/users/forgot-password", data)
// export const createNewPassword = (data) => API.post(`/users/reset-password/${data.id}/${data.token}`, data)
// export const userDetails = (data) => API.post('/users/details',data)
// export const updateUserDetails = (data) => API.post('/users/update',data)

// export const postJob = (data) => API.post(`/jobs/post-job`,data)
// export const getJob = (data) => API.post(`/jobs/user-posted-jobs`,data)
// export const getJobById = (data) => API.post(`/jobs/fetch-jobById`,data)
// export const editJobDetails = (data) => API.post(`/jobs/edit-job-details`,data)
// export const deleteJobDetails = (data) => API.post(`/jobs/delete-job-details`,data)

// export const getUserPickedJobs = (data) => API.post(`/jobs/user-picked-jobs`,data)
// export const getAllJobs = (data) => API.get(`/jobs/fetch-jobs`)
// export const pickJob = (data) => API.post(`/jobs/pick-job`,data)

