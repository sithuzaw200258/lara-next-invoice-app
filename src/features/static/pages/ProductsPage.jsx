import React from 'react'
import Layout from '../components/StaticLayout'

const ProductsPage = () => {
    return (
        <>
            <Layout>
                <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900 dark:text-white">
                    <h1 className="text-4xl font-bold">Products</h1>
                </div>
            </Layout>
        </>
    )
}

export default ProductsPage