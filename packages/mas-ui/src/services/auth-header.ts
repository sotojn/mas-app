export default function authHeader() {
    const userItem = localStorage.getItem('user');
    const user = (typeof userItem === 'string') ? JSON.parse(userItem) : null;
  
    if (user && user.accessToken) {
      // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
      return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
  }