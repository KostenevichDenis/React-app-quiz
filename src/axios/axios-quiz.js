import axios from "axios";

export default axios.create( {
    baseURL: 'https://react-quiz-cba87-default-rtdb.europe-west1.firebasedatabase.app/'
} )