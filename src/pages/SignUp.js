import React, {useState} from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import { toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slices/cartSlice';

export default function Login({setShowLogin, setShowRegister}) {

    const [formData, setFormData] = useState({name: "", email: "", password: "", p2: ""});

    const dispatch = useDispatch();

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ));
    }

    function handleLogin(e) {
        e.preventDefault();
        const {name, email, password, p2} = e.target;
        if (password.value !== p2.value) toast.error("Passwords do not match");
        else {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(addUser({
                    id: user.uid,
                    name: name.value,
                    email: email.value
                }));
                toast.success("Sign up successful");
                setShowRegister(false);
                updateProfile(user, {displayName: name.value})
                .then()
                .catch(() => toast.error("error in updating profile"))
            })
            .catch((error) => {
                toast.error(error.code);
            });
        }
    }

    return (
        <div
            className="fixed z-[1] w-full h-full overflow-auto bg-[rgba(0,0,0,0.4)] left-0 top-0">
            <div
                className="bg-[white] absolute -translate-x-2/4 -translate-y-2/4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.75)] w-[80%] md:w-2/5 lg:w-2/5 xl:w-2/5 p-5 rounded-[5px] left-2/4 top-2/4">
                <div className="h-full flex flex-col justify-center space-y-10 items-center py-2 mx-5">
                    <div className="text-center">
                        <h1 className="font-bold text-lg">Sign Up</h1>
                    </div>
                    <form onSubmit={handleLogin}>
                        <input
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                            type="text"
                            name='name'
                            placeholder="Username"
                            value={formData.name}
                            onChange={(e) => handleChange(e)}   
                        />
                        <input
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                            type="email"
                            name='email'
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => handleChange(e)}   
                        />
                        <input
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                            type="password"
                            name='password'
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => handleChange(e)}   
                        />
                        <input
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                            type="password"
                            name='p2'
                            placeholder="Confirm Password"
                            value={formData.p2}
                            onChange={(e) => handleChange(e)}   
                        />
                        <div className="text-center">
                            <button
                                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-sm tracking-wider"
                                type="submit">Sign Up</button>
                        </div>
                    </form>
                    <div
                        className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                        Already have an account?
                        <span
                            onClick={() => {
                                setShowRegister(false);
                                setShowLogin(true);
                            }}
                            className="text-red-600 hover:underline hover:underline-offset-4">Sign in</span>
                    </div>
                </div>
                <button className='absolute top-5 right-5' onClick={() => setShowRegister(false)}>
                    <AiOutlineClose/>
                </button>
            </div>
        </div>
    )
}