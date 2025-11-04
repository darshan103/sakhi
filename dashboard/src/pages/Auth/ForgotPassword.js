import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../pages/styles/authStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    // form function
    const handleSubmit = async(e) => {
      e.preventDefault();
      // console.log(name,email,password,phone,address);
      // toast.success('Register Successfully')
      try{
        const res = await axios.post('/api/v1/auth/forgot-password',{email,newPassword,answer});
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
        <Layout title="forgot-password-Sakhi">
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Reset Password</h4>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder='Enter your mother name ?'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder='Enter your new password'
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">RESET</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword