import axios from "axios";

export default class BidService {

  static async getOpenedBidsCount(){
    const response =  axios.get('http://localhost:3000/bids/opened_bids_count', {
         headers: {
           'Content-Type': 'application/json',
           'authorization': localStorage.getItem('token')
         }
        });
    return response;
  }

  static async getAll(user_id){
    const response = await axios.get('http://localhost:3000/bids', {
        params: {user_id: user_id},
         headers: {
           'Content-Type': 'application/json',
           'authorization': localStorage.getItem('token')
         }
        });
    return response;
  }

  static async updateById(data){
    const response = await axios.put('http://localhost:3000/bids/' + data.id, {}, {
        params: data,
         headers: {
           'Content-Type': 'application/json',
           'authorization': localStorage.getItem('token')
         }
        });
    return response;
  }

  static async createNew(data) {
    const response = axios.post('http://localhost:3000/bids',{}, {
        params: data,
         headers: {
           'Content-Type': 'application/json',
           'authorization': localStorage.getItem('token')
         }
        });
    return response;
  }


}
