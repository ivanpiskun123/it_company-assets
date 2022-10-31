import axios from "axios";

export default class NomiantionService {

    static async getAll(){
      const response =  axios.get('http://localhost:3000/nominations', {
           headers: {
             'Content-Type': 'application/json',
             'authorization': localStorage.getItem('token')
           }
          });
      return response;
    }

}
