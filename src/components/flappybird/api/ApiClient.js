import axios from 'axios'

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
        //baseURL: 'http://03-rest-api-full-stack-h2-env.eba-kua8mf3m.us-east-2.elasticbeanstalk.com' //#CHANGE
        //baseURL: 'http://03restapifullstackh2-env.eba-tmxhn3ah.ap-south-1.elasticbeanstalk.com/'
    }
);

/* For Best Practices https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables*/
