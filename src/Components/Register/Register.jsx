import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Register = () => {
    const navigate = useNavigate();
    const scheme = z.object({
        name: z.string().nonempty("Name is Required....").min(3, "Name must be at least 3 chars..."),
        email: z.string().email("Not Valid Email").nonempty("Email is Required...."),
        password: z.string().regex(/^[A-Z][a-z0-9]{3,9}/, "Password didn't match the Pattern").nonempty("Password is Required..."),
        rePassword: z.string().regex(/^[A-Z][a-z0-9]{3,9}/, "RePassword didn't match the Pattern").nonempty("RePassword is Required...."),
        dateOfBirth: z.string().nonempty("Date us Required..."),
        gender: z.enum(['male', 'female']),
    })
        .refine((data) => data.password === data.rePassword, {
            path: ['rePassword'],
            message: "RePassword must Match the Password.."
        });
    const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(scheme),
    });

    async function onSubmit(values) {
        try {
            const { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', values);
            if (data.message == "success") {
                reset();
                navigate('/login');
            }
        } catch (error) {
            setError("root", { message: `${error.response.data.error}....` });
        }
    }

    return (
        <div className='flex flex-col gap-3 shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-md w-1/2 mx-auto p-6 mt-4'>
            <h1 className='text-3xl text-info'>Register Now</h1>
            <p className="text-error me-auto">{errors?.root?.message}</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 justify-center items-center'>
                <input
                    {...register('email')}
                    type="email"
                    placeholder="Type your Email"
                    className="input w-full"
                />
                <p className="text-error me-auto">{errors?.email?.message}</p>
                <input
                    {...register('name')}
                    type="text"
                    placeholder="Type your Name"
                    className="input  w-full"
                />
                <p className="text-error me-auto">{errors?.name?.message}</p>
                <input
                    {...register('password')}
                    type="password"
                    placeholder="Type your Password"
                    className="input  w-full"
                />
                <p className="text-error me-auto">{errors?.password?.message}</p>
                <input
                    {...register('rePassword')}
                    type="password"
                    placeholder="Re-Type your Password"
                    className="input  w-full"
                />
                <p className="text-error me-auto">{errors?.rePassword?.message}</p>
                <input
                    {...register('dateOfBirth')}
                    type="date"
                    placeholder="select Date"
                    className="input  w-full"
                />
                <p className="text-error me-auto">{errors?.dateOfBirth?.message}</p>
                <div className="flex me-auto gap-5">
                    <div className="">
                        <input
                            {...register('gender')}
                            type="radio"
                            id='male'
                            value='male'
                            placeholder="Male"
                            name='gender'
                            className="radio me-2"
                        />
                        <label htmlFor="">Male</label>
                    </div>
                    <div className="">
                        <input
                            {...register('gender')}
                            type="radio"
                            id='female'
                            value='female'
                            name='gender'
                            placeholder="Female"
                            className="radio me-2"
                        />
                        <label htmlFor="">Female</label>
                    </div>
                </div>
                <p className="text-error me-auto">{errors?.gender?.message}</p>
                <button type="submit" className="btn btn-info me-auto text-white">{isSubmitting ? "Loading..." : "Register"}</button>
            </form>
        </div>
    )
}

export default Register;
