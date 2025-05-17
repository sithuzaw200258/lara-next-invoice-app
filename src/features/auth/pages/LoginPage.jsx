"use client"
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { userLogin } from '@/services/auth'
import { toast } from 'sonner'
import useAccountStore from '@/stores/useAccountStore'
import { useRouter } from 'next/navigation'
import { Spinner } from 'flowbite-react'

const LoginPage = () => {
    const router = useRouter()
    const { setToken } = useAccountStore();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const payload = {
                email: data.email,
                password: data.password,
            };

            const res = await userLogin(payload);

            if (!res.ok) {
                let errorMessage = 'Login failed';
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
            setToken(json.token); // Store the token in Zustand store
            router.push('/dashboard'); // Redirect to dashboard after successful login
            toast.success('Login successful');
            // navigate('/dashboard'); // Optional
        } catch (error) {
            toast.error(error.message || 'An error occurred');
        }
    };


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href="/" className="flex items-center mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-3 sm:py-8 sm:px-9">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-4">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="johndoe@gmail.com"
                                    {...register('email', { required: 'Email is required' })}
                                    className="text-xs bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Minimum 6 characters' }
                                    })}
                                    className="text-xs bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            {...register('remember')}
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                    <div className="ml-3 text-xs">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-xs font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full text-white bg-primary-600 disabled:opacity-75 disabled:cursor-not-allowed hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Spinner aria-label="Small spinner example" size="sm" />
                                        Signing in
                                    </span>
                                ) : (
                                    'Sign in'
                                )}
                            </button>

                            <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage
