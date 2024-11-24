import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5080/api/test/';

class UserService {

  /// This will probably be used to grab common data. Or not used at all and
  // handle this on the database level.
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();