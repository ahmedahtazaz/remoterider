import * as Keychain from 'react-native-keychain';

export const setCredentials = async (username, password) => {
    
   return new Promise((resolve, reject) => {

       Keychain.setGenericPassword(username, password)
           .then(resp => {
               resolve(true)
           })
           .catch(err => {
               console.log("err: ", err);
               reject(err);
           });
   });
}

export const getCredentials = async () => {
    return new Promise((resolve, reject) => {
        Keychain.getGenericPassword()
            .then((credentials) => {
                if (credentials && credentials.username) {
                    resolve(credentials);
                } else {
                    resolve(null);
                }
            })
            .catch(err => {
                console.log("err: ", err);
                reject(err);
            });
    });
 }