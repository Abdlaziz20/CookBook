import axios from 'axios';
import React from 'react'

function InputForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = (isSignUp) ? "register" : "signin";
   
    setSuccess("");
    setError("");
    await axios.post(`http://localhost:5000/api/users/${endpoint}`, { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setSuccess(response.data.message);
     
      }).catch((error) => {
        setError(error.response.data.message);
        
      });
  }
  return (
    <>

      <form  className="input-form" onSubmit={handleSubmit}>

        <input onChange={(e) => setEmail(e.target.value)} className="form-control mt-3" type="email" name="email" id="" placeholder="email" />
        <input onChange={(e) => setPassword(e.target.value)} className="form-control mt-3" type="password" name="password" id="" placeholder="password" />
        
        <div className="text_center mt-5 w-100">
          <button type="submit">{(isSignUp) ? "sign up" : "sign in"} </button></div>

        <h5 className="error">{(error != "") && error}</h5>
<h5 className="success">{(success != "") && success}</h5>
        <p onClick={() => setIsSignUp(!isSignUp)} className='mt-3'>{(isSignUp) ? "Alredy have an account?" : "don't have an account? "} <a href="/signup">sign up</a></p>

      </form>

    </>
  )
}

export default InputForm
