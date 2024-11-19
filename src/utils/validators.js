import { isValidUsername } from "6pp";




export const usernameValidator = (username) =>{

    if(!isValidUsername(username))
        
    return {isValid:false, errorMassage:"Please enter a valid username"};
};