import React from 'react';
import './PasswordStrengthMeter.css';

const PasswordStrengthMeter = (props) => {
  const testedResult = props.password;
  const createPasswordLabel = () => {
    let score = 0
    let regexPositive = ["[A-Z]","[a-z]","[0-9]","\\W",]
    regexPositive.forEach((regex, index) => {
      if (new RegExp(regex).test(testedResult)) {
        score +=1
      }
    })
    if(testedResult.length >8) score+=1;
    switch (score) {
      case 0:
        return ({
          value: 0,
          info: "",
        });
      case 1:
        return ({
          value: 1,
          info: "Weak",
        });
      case 2:
        return ({
          value: 2,
          info: "Fair",
        });
      case 3:
        return ({
          value: 3,
          info: "Good",
        });
      case 4:
        return ({
          value: 4,
          info: "Strong",
        });
      case 5:
        return ({
          value: 5,
          info: "Very_Strong",
        });
      default:
        return null
    }
  }
  return (<>

{props.password && <div className="password-strength-meter">
      <progress className={`password-strength-meter-progress strength-${createPasswordLabel().info}`} value={createPasswordLabel().value} max="5" />
      <br />
      <p className="password-strength-meter-label">
        <>
          <p>Password strength: <span className={`strength-${createPasswordLabel().info}`}>{createPasswordLabel().info} </span></p> 
        </>
      </p>
    </div>}
  </>
   )
  }
export default PasswordStrengthMeter;