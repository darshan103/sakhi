import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../pages/styles/authStyles.css";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();

// form function
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(name,email,password,phone,address);
    // toast.success('Register Successfully')
    try{
      const res = await axios.post('/api/v1/auth/register',{name,email,password,phone,address,answer});
      if(res && res.data.success){
        toast.success(res.data && res.data.message,{ delay: 1000 });
        navigate("/login");
      }else{
        toast.success(res.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error('Something went wrong')
    }
  }


  return (
    <Layout title="Register-Sakhi">
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
        <h4 className='title'>REGISTER PAGE</h4>
          <div className="mb-3">
            <input 
              type="text" 
              value={name}
              onChange={ (e) => setName(e.target.value) }
              className="form-control" 
              id="exampleInputName"
              placeholder='Enter your name' 
              required
            />
          </div>
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
          <div className="form-group">
            <input 
              type="number" 
              value={phone}
              onChange={ (e) => setPhone (e.target.value) }
              className="form-control" 
              id="exampleInputNumber"
              placeholder='Enter your number'
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              value={address}
              onChange={ (e) => setAddress(e.target.value) }
              className="form-control" 
              id="exampleInputAddress"
              placeholder='Enter your address' 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              value={answer}
              onChange={ (e) => setAnswer(e.target.value) }
              className="form-control" 
              id="exampleInputAddress"
              placeholder='What is your mother name ?'
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">REGISTER</button>
        </form>

      </div>
    </Layout>
  )
}

export default Register