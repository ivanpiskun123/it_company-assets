import axios from "axios";

export default class AuthService {

    static async athenticate(email, password){
      const response =  axios.post('http://localhost:3000/login', {
               user: {
                 email: email,
                 password: password
               }
             })
        return response
    }

    static async logout(){
      const response =  axios.delete('http://localhost:3000/logout', {
           headers: {
             'Content-Type': 'application/json',
             'authorization': localStorage.getItem('token')
           }
          });
        return response
    }
}
//
// axios.post('/users/sign_in', {
//         user: {
//           email: email,
//           password: password
//         }
//       })
//       .then(response => {
//         console.log(response.data);
//         if(response.data.success){
//           console.log("Success Auth");
//           setIsAuth(true)
//         } else {
//            setIsFailImgMustShake(true)
//         }
//       })
//       .catch(error => {
//         console.log(error)
// })
