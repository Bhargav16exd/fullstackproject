import { useEffect, useState } from "react";
import axios from "axios";
import "../components/authentication.css";

function Authentication() {
  const [state, setState] = useState("Sign In");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [response ,setResponse] = useState();
  const [btnState , setBtnState] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(()=>{
   setError(null);
   setResponse(null); 
   
  },[state])





  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation, you can add more validation rules as needed
    if (state === "Sign Up" && !formData.name) {
      setError("Full Name is required.");
      return;
    }

    const apiUrl = state === "Sign In" ? "http://localhost:6969/api/auth/signin" : "http://localhost:6969/api/auth/signup";

    
      
    try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.data.success) {
           setResponse(response.data.message);
           setError(null);
        }
  
      } catch (error) {
        if (error.response) {
            setError(error.response.data.message);
            setResponse(null); 
          }
      }
  
    
  };

  return (
    <>
      <div className="container">
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="emailInput"
            placeholder="Email"
          />
          {state === "Sign Up" && (
            <>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="text"
              placeholder="Full Name"
            />
            <input
            type="password"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleInputChange}
            className="cpasswordField"
            placeholder="CPassword"
          />
            </>
          )}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="passwordField"
            placeholder="Password"
          />
          
          {error && <div className="error-message">{error}</div>}
          {response && <div className="success-message">{response}</div>}
          <button className="Button">{state}</button>
        </form>
        <p>
          {state === "Sign Up" ? (
            <>
              Already Have an Account? <a className="btn" onClick={() => 
                (setState("Sign In") , setBtnState(true))}>Sign In</a>
            </>
          ) : (
            <>
              Don't Have an Account? <a className="btn" onClick={() => setState("Sign Up")}>Sign Up</a>
            </>
          )}
        </p>
      </div>
    </>
  );
}

export default Authentication;
