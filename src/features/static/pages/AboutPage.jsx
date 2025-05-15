import React from 'react'
import Layout from '../Layout'

const AboutPage = () => {
    return (
        <>
            <Layout>
                <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900 dark:text-white">
                    <h1 className="text-4xl font-bold">About Us</h1>
                    <p className="mt-4 text-lg">We are a company dedicated to providing the best services.</p>
                </div>
            </Layout>
        </>
    )
}

export default AboutPage