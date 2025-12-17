import React from 'react'

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen text-center'>
            <img
                src="404.png"
                alt='not found'
                className='max-w-full mb-6 w-96' />
            <p className='text-xl font-semibold'> Có thể Cook không</p>

            <a href='/' className='inline-block px-6 py-3 mt-6 font-medium text-white transition shadow-md rounded-2xl hover:bg-primary-dark'>
                Quay về trang chủ
            </a>
        </div>
    )
}