import { AUTH, AUTH_ERROR, EMAIL, PASSWORD, REGISTER } from "../const/actionTypes"
import * as api from "../../api/index"


export const loadUser = () => async (dispath) => {
    const localUser = JSON.parse(localStorage.getItem("user_info"))

    if (localUser) {
        dispath({ type: AUTH, data: localUser })
    }
}

export const signin = (data2, Api, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(data2,Api)
        dispatch({ type: AUTH, data })
        
        navigate("/opx/account/home")
        return data;
    } catch (error) {
        console.log(error);
        dispatch({ type: AUTH_ERROR, errorMessage: error.response.data.message })
    }

}

export const signup = (formData, navigate) => async (dispatch) => {
         try {
             // signup user
             const { data } = await api.signUp(formData)
    
             dispatch({ type: REGISTER, data })
             navigate("/opx/account/patient-register")
         } catch (err) {
             console.log(err);
             dispatch({ type: AUTH_ERROR, errorMessage: err.response.data.message })
    
         }
     }



     export const signupDoctor = (formData, navigate) => async (dispatch) => {
        try {
            // signup user
            const { data } = await api.signUpDoctor(formData)
   
            dispatch({ type: REGISTER, data })
            navigate("/opx/account/doctor-register")
        } catch (err) {
            console.log(err.response.data.errors[0].message);
            dispatch({ type: AUTH_ERROR, errorMessage: err.response.data.errors[0].message })
   
        }
    }


    export const createPrescription = (formData, navigate) => async (dispatch) => {
        
            // signup user
            const { data } = await api.createPrescription(formData)
   
            dispatch({ type: REGISTER, data })
            navigate("/opx/account/write-prescription")
        
    }


    export const generateInvoice = (formData,navigate) => async (dispatch) => {
        try {
            // signup user
            const { data } = await api.generateInvoice(formData)
   
            dispatch({ type: REGISTER, data })

            return data;
        } catch (err) {
            console.log(err);
            dispatch({ type: AUTH_ERROR, errorMessage: err.response.data.message })
   
        }
    }

     export const addServiceDetails = (data1, navigate) => async (dispatch) => {
        try {
            // signup user
            const { data } = await api.addService(data1)
   
            dispatch({ type: REGISTER, data })
            navigate("/opx/account/services")
        } catch (err) {
            console.log(err);
            dispatch({ type: AUTH_ERROR, errorMessage: err.response.data.message })
   
        }
    }


    export const createMedicalRecord = (data1, navigate) => async (dispatch) => {
        try {
            // signup user
            const { data } = await api.createmedicalrecord(data1)
   
            dispatch({ type: REGISTER, data })
            // navigate("/opx/account/patient/medical-record")
        } catch (err) {
            console.log(err);
            dispatch({ type: AUTH_ERROR, errorMessage: err.response.data.message })
   
        }
    }



     export const getAllServicesDetails = () => async (dispatch) => {
             try {
                 const { data } = await api.getAllServices();
                 return data;
             } catch (error) {
                 console.log(error);
             }
         }


         export const getAllPatientsDetails = () => async (dispatch) => {
            try {
                const { data } = await api.getAllPatients();
                return data;
            } catch (error) {
                console.log(error);
            }
        }

        export const getMedicalDetails = (formData,navigate) => async (dispatch) => {
            try {
                const { data } = await api.getmedicalRecord(formData);
                return data;
            } catch (error) {
                console.log(error);
            }
        }


        export const getInvoiceDetails = (formData,navigate) => async (dispatch) => {
            try {
                const { data } = await api.getInvoiceDetail(formData);
                return data;
            } catch (error) {
                console.log(error);
            }
        }



    
         export const updateServiceDetails = (request, navigate) => async (dispatch) => {
                 try {
                     const { data } = await api.updateService(request);
                     dispatch({ type: 'REGISTER', data })
                     navigate("/opx/account/services");
                 } catch (error) {
                     console.log(error);
                 }
             }
             
   export const deleteServiceDetails= (request,navigate) => async(dispatch)=>{
                     try {
                         const { data } = await api.deleteService(request);
                         console.log(request)
                         navigate("/opx/account/services");
                        
                     } catch (error) {
                         console.log(error)
                     }
                 }
// export const signinGoogle = (accessToken, navigate) => async (dispatch) => {
//     try {
//         // login user
//         const { data } = await api.signInGoogle(accessToken)

//         dispatch({ type: AUTH, data })
//         navigate("/hokieforu/account/home")
//     } catch (err) {
//         console.log(err)
//     }
// }

// export const signupGoogle = (accessToken, navigate) => async (dispatch) => {
//     try {
//         // signup user

//         const { data } = await api.signUpGoogle(accessToken)

//         dispatch({ type: AUTH, data })
//         navigate("/hokieforu/account/home")
//     } catch (err) {
//         console.log(err)
//     }
// }

// export const sendEmail = (email, navigate) => async (dispatch) => {
//     try {
//         const { data } = await api.sendEmail(email);
//         dispatch({ type: EMAIL, data })
//         navigate("/hokieforu/login");
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const createNewPassword = (request, navigate) => async (dispatch) => {
//     try {
//         const { data } = await api.createNewPassword(request);
//         dispatch({ type: PASSWORD, data })
//         navigate("/hokieforu/login");
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const postJob = (request, navigate) => async (dispatch) => {
//     try {
//         const { data } = await api.postJob(request);
//         console.log(request)
//         dispatch({ type: 'REGISTER', data });
//         navigate("/hokieforu/account/post-a-job");
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getUserDetails = (request, navigate) => async (dispatch) => {
//     try {
//         console.log(request);
//         const { data } = await api.userDetails(request);
//         console.log(data)
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const updateUserDetails = (request, navigate) => async (dispatch) => {
//     try {
//         const { data } = await api.updateUserDetails(request);
//         dispatch({ type: 'REGISTER', data })
//         navigate("/hokieforu/account/myprofile");
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getJobDetails = (request, navigate) => async (dispatch) => {
//     try 
//     {
//         const {data} = await api.getJob(request);
//         return data;
//     } 
//     catch (error) {
//         console.log(error);
//     }
// }

// export const getJobDetailsById= (request, navigate) => async (dispatch) => {
//     try 
//     {
//         const {data} = await api.getJobById(request);
//         return data;
//     } 
//     catch (error) {
//         console.log(error);
//     }
// }

// export const updateJobDetails= (request,navigate) => async(dispatch)=>{
//     try {
//         const { data } = await api.editJobDetails(request);
//         console.log(request)
//         dispatch({ type: 'REGISTER', data });
//         navigate("/hokieforu/account/post-a-job");
        
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const deleteJobDetails= (request,navigate) => async(dispatch)=>{
//     try {
//         const { data } = await api.deleteJobDetails(request);
//         console.log(request)
//         navigate("/hokieforu/account/myjobs");
        
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const getUserPickedJobs = (request, navigate) => async (dispatch) => {
//     try 
//     {
//         const {data} = await api.getUserPickedJobs(request);
//         return data;
//     } 
//     catch (error) {
//         console.log(error);
//     }
// }

// export const getAllJobDetails = () => async (dispatch) => {
//     try {
//         const { data } = await api.getAllJobs();
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const pickJob = (request, navigate) => async (dispatch) => {
//     try {
//         const { data } = await api.pickJob(request);
//         console.log(request)
//         dispatch({ type: '', data })
//         navigate("/hokieforu/account/home");
//     } catch (error) {
//         console.log(error);
//     }
// }