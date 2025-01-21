import React, { useState } from "react";
import { useNavigate } from "react-router";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
    const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const userList= JSON.parse(localStorage.getItem('userList')) || [];
    const user={
        email: email,
        password:password,
        confirmpassword:confirmpassword,
        phone:phone,
        gender:gender
    }
    if(user.password === user.confirmpassword ) 
        {
            userList.push(user);
            navigate('/Home')

        }
    else{
        alert('Please Confirm your password')
    }
    
   localStorage.setItem('userList',JSON.stringify(userList))

};
  return (
    <div className="wrapper">
      <div className="signUpForm">
        <h2>Register Here!!!</h2>
        <div className="form-structure">
          <form onSubmit={handleSubmit}>
            <label>Email Id</label>
            <input
              placeholder="Email ID"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              value={password}
               minlength="8"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Confirm Password</label>
            <input
              placeholder="Confirm Password"
              type="Text"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>Phone Number</label>
            <input
              placeholder="Phone Number"
              type="tel"
              pattern= '[6-9]{1}[0-9]{9}'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label className="gender">Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option>Male</option>
              <option>Female</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
