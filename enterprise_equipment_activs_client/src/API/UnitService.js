import axios from "axios";

export default class UnitService {

    static async getAll(user_id){
      const response =  axios.get('http://localhost:3000/units',{
          params: {user_id: user_id},
           headers: {
             'Content-Type': 'application/json',
             'authorization': localStorage.getItem('token')
           }
          });
      return response;
    }

    static async getById(id) {
      const response =  axios.get('http://localhost:3000/units/' + id, {
           headers: {
             'Content-Type': 'application/json',
             'authorization': localStorage.getItem('token')
           }
          });

      return response;

      }

      static async createNew(data) {
        const response = axios.post('http://localhost:3000/units',{}, {
            params: data,
             headers: {
               'Content-Type': 'application/json',
               'authorization': localStorage.getItem('token')
             }
            });
        return response;
      }
}
