import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../pages/styles/authStyles.css";
import { useAuth } from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth,setAuth]=useAuth()

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(name,email,password,phone,address);
    // toast.success('Register Successfully')
    try{
      const res = await axios.post('/api/v1/auth/login',{email,password});
      if(res && res.data.success){
        toast.success(res.data && res.data.message,{ delay: 1000 });
        setAuth({
            ...auth,
            user: res.data.user,
            token:res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate(location.state || "/");
      }else{
        toast.success(res.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error('Something went wrong')
    }
  }

  return (
    <Layout title="Login-Sakhi">
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
        <h4 className='title'>LOGIN PAGE</h4>
          <div className="mb-3">
            <input 
              type="email" 
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
              className="form-control" 
              id="exampleInputEmail" 
              placeholder='Enter your email'
              required
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              value={password}
              onChange={ (e) => setPassword(e.target.value) }
              className="form-control" 
              id="exampleInputPassword"
              placeholder='Enter your password' 
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">LOGIN</button>
        </form>

      </div>
    </Layout>
  )
}

export default Login