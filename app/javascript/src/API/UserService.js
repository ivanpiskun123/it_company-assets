import axios from "axios";

export default class UserService {

    static async getCurrentUserShort(){
      const response =  axios.get('http://localhost:3000/current_user', {
           headers: {
             'Content-Type': 'application/json',
             'authorization': localStorage.getItem('token')
           }
          });
      return response;
    }

    static async getAllShort(){
      const response =  axios.get('http://localhost:3000/users', {
           headers: {
             'Content-Type': 'application/json',
             'authorization': localStorage.getItem('token')
           }
          });
      return response;
    }



}
