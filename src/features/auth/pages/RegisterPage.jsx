'use client'
import { userRegister } from '@/services/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { Spinner } from 'flowbite-react'

const RegisterPage = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const payload = {
                name: data.name,           // assuming name is required
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            };

            const res = await userRegister(payload);
            console.log(res);

            if (!res.ok) {
                let errorMessage = 'Registration failed';
                try {
                    const errorJson = await res.json();
                    errorMessage = errorJson.message || errorMessage;
                } catch {
                    const errorText = await res.text();
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const json = await res.json();
            console.log(json);
            router.push('/login'); // Redirect to login page after successful registration
            toast.success('Registration successful');
        } catch (error) {
            toast.error(error.message || 'An error occurred during registration');
        }
    };


    const password = watch('password')

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href="/" className="flex items-center mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-3 sm:py-6 sm:px-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white">
                            Create an account
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-3">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Name</label>
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    type="text"
                                    id="name"
                                    placeholder="John Doe"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    {...register('email', { required: 'Email is required' })}
                                    type="email"
                                    id="email"
                                    placeholder="johndoe@gmail.com"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Minimum 6 characters' }
                                    })}
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-0.5">{errors.password.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input
                                    {...register('password_confirmation', {
                                        required: 'Please confirm your password',
                                        validate: (value) => value === password || 'Passwords do not match'
                                    })}
                                    type="password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.password_confirmation && <p className="text-red-500 text-xs mt-0.5">{errors.password_confirmation.message}</p>}
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        {...register('terms', { required: 'You must accept the terms and conditions' })}
                                        id="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                                <div className="ml-3 text-xs">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                        I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a>
                                    </label>
                                    {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}
                                </div>
                            </div>

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full text-white bg-primary-600 disabled:opacity-75 disabled:cursor-not-allowed hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Spinner aria-label="Small spinner example" size="sm" />
                                        Registering
                                    </span>
                                ) : (
                                    'Register'
                                )}
                            </button>

                            <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage
