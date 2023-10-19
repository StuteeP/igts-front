import React from 'react'

const PasswordStrengthError = (props) => {
    
    const passwordR=props.passwordR;
    const handle=() => {
        var isError = "";
        let capsCount, smallCount, numberCount, symbolCount
        if (passwordR.length < 8) {
          isError="Password must be atleast 8 characters long, include one UPPERCASE, lowercase, number and special character: @$! % * ? &";
        }
        else {
          capsCount = (passwordR.match(/[A-Z]/g) || []).length
          smallCount = (passwordR.match(/[a-z]/g) || []).length
          numberCount = (passwordR.match(/[0-9]/g) || []).length
          symbolCount = (passwordR.match(/\W/g) || []).length
          if (capsCount < 1) {
            isError="Must contain one UPPERCASE letter";
          }
          else if (smallCount < 1) {
            isError=("Must contain one lowercase letter");
          }
          else if (numberCount < 1) {
            isError=("Must contain one number");
          }
          else if (symbolCount < 1) {
            isError=("Must contain one special character: @$! % * ? &");
          }
        }
        return ({
            errorMessage : isError
        });
    }
        

  return (
    <div>
    {(
        <p className="text-red-600"> {handle().errorMessage}</p>
    )}
    </div>
  )
}

export default PasswordStrengthError
