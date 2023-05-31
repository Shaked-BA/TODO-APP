import { useState } from 'react';
import { addUser, authenticateUser } from '../services/users';

function Auth({ updateCookie }) {

  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [authData, setAuthdata] = useState({
      email: '',
      password: '',
      confirmedPassword: '',
    });

  const viewLogin = (newIsLogin) => {
    setError(null);
    setIsLogin(newIsLogin);
  }

  const handleChange = ({target}) => {
    setAuthdata(prevAuthdata => ({...prevAuthdata, [target.name]: target.value}));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isLogin && authData.password !== authData.confirmedPassword) {
      setError("Passwords do not match.");
    } else {
      authenticateUser(authData).then( (response) => {
        if (response.detail) {
          setError(response.detail);
        } else {
          updateCookie('Email', response.email);
          updateCookie('Token', response.token);
          window.location.reload();
        }
      });
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? 'Please log in' : 'Please sign up'}</h2>
          <input type="email" placeholder="email" name="email" onChange={handleChange} />
          <input type="password" placeholder="password" name="password" onChange={handleChange} />
          {!isLogin && <input type="password" placeholder="confirm password" name="confirmedPassword" onChange={handleChange} />}
          {/* <input type="submit" className="create" onClick={() => isLogin ? handleSubmit(authenticateUser) : handleSubmit(addUser)} /> */}
          <input type="submit" className="create" onClick={handleSubmit} />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button 
            onClick={() => viewLogin(false)}
            style={{backgroundColor: !isLogin ? 'white' : 'rgb(188, 188, 188)'}}
          >Sign up</button>
          <button 
            onClick={() => viewLogin(true)}
            style={{backgroundColor: isLogin ? 'white' : 'rgb(188, 188, 188)'}}
          >Log in</button>
        </div>
      </div>
    </div>
  );
}
  
export default Auth;