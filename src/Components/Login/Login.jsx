import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { tokenContext } from '../../Context/tokenContext.jsx';

const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(tokenContext);
    const scheme = z.object({
        email: z.string().email("Invalid Email...").nonempty("Email is Required..."),
        password: z.string().nonempty("Password is Required..."),
    });
    const { handleSubmit, register, setError, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(scheme),
    });

    async function onSubmit(values) {
        try {
            const { data } = await axios.post('https://linked-posts.routemisr.com/users/signin', values);
            if (data.message == "success") {
                setToken(data?.token);
                localStorage.setItem("Token", data?.token);
                reset();
                navigate('/');
            }
        } catch (error) {
            setError("root", { message: error?.response?.data?.error });
        }
    }
    return (
        <div className='flex flex-col gap-6 shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-md w-1/2 mx-auto p-6 mt-12'>
            <h1 className='text-3xl text-info'>Login Now</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 justify-center items-center'>
                <p className="text-error me-auto">{errors?.root?.message}</p>
                <input
                    {...register('email')}
                    type="email"
                    placeholder="Type your Email"
                    className="input w-full"
                />
                <p className="text-error me-auto">{errors?.email?.message}</p>
                <input
                    {...register('password')}
                    type="password"
                    placeholder="Type your Password"
                    className="input  w-full"
                />
                <p className="text-error me-auto">{errors?.password?.message}</p>
                <button className="btn btn-info me-auto text-white">{isSubmitting ? "Loading..." : "Login"}</button>
            </form>
        </div>
    )
}

export default Login;
