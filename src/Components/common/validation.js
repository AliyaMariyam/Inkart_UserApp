
export const validateEmail = email =>{
    const emailRegex =  new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    
     if(emailRegex.test(email)){
        return true
     }
     else{
        return false
     }

}

export const validatePhoneNumber = phone =>{

    const replacedString = phone.replace(/\s/g,'');
    const phoneNumberRegex = /^[0-9]{10}$/;
    if(phoneNumberRegex.test(phone)){
      return true
    }
    else{
      return false
    }
  //  console.warn(replacedString)
   // return !/[a-zA-Z]/.test(replacedString) && !/[^\d\-+]/.test(replacedString)
    
}

export const validateOTP = (otp) => {
    // Regular expression to match only numeric digits
    const numericRegex = /^[0-9]+$/;
  
    // Test the OTP against the regex
    if (numericRegex.test(otp)) {
      return true; // OTP contains only numeric digits
    } else {
      return false; // OTP contains special characters or letters
    }
  }
