import { gql } from '@apollo/client'
import React from 'react'
import { FETCHPOST } from '../../query'
import { client } from '../_app'
import { Avatar, IconButton, Input, Stack } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
export const getStaticPaths = async () => {
    const { loading, data: { getPosts: posts } = {}, error } = await client.query({
        query: FETCHPOST
    })
    // console.log(posts)
    const paths = posts.map(ninja => {
        return {
            params: { id: ninja.id.toString() }
        }
    })

    return {
        paths,
        fallback: false

    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch(`http://localhost:4000/api/findpost/?id=${id}`);
    const data = await res.json();

    return {
        props: { post: data }
    }
}

const BlogPage = ({ post }) => {
    const router = useRouter()
    // console.log(post)
    return (
        <>
            <div className="blog-details">
                {post && (
                    <>
                        <div className='bg-black  min-h-screen overflow-hidden'>

                            <div className='w-4/5 md:w-[45%] mx-auto'>
                                <Stack spacing={3}>
                                    <div className='mt-5 mr-2'>
                                        <IconButton onClick={() => router.push('/')} className="mt-3 h-10">
                                            <ArrowBackIcon className='text-white ' />
                                        </IconButton>
                                    </div>
                                    <motion.h3
                                        animate={{ y: 0 }}
                                        initial={{ y: "-100vh" }}
                                        transition={{ type: "spring", stiffness: 120 }}
                                        className='text-center font-bold text-[20px] py-2 mt-3 md:text-[30px] text-blue-600'>{post?.title}</motion.h3>
                                    <img src={post?.coverPhoto} className='w-full md:w-full mx-auto h-[450px] object-cover rounded-md' />

                                    <div>
                                        <Stack direction="row" spacing={6} justifyContent='center' alignItems='center'>
                                            <div className='flex items-center space-x-4'>
                                                <Link href={`/${post?.username}`}><h5 className='text-white font-bold text-[24px] font-mono'>Written By <span className='font-bold text-blue-700 text-[24px] font-mono'>@{post?.username}</span> </h5></Link>
                                            </div>
                                        </Stack>

                                        <div

                                            dangerouslySetInnerHTML={{ __html: post?.body }} className='text-white break-all over py-2 blog w-[90%] md:w-full mx-auto'>

                                        </div>
                                        <div className='p-3 py-4'>
                                            <form>
                                                <h1 className='text-xl font-bold text-white py-4'>Comments</h1>
                                                <Stack spacing={3}>
                                                    <Input className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500' placeholder='John ' type="text" />
                                                    <Input className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500' placeholder='John ' type="text" />
                                                    <Input className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500' placeholder='John ' type="text" />
                                                    <textarea  className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring' placeholder='John' rows={8}/>
                                                </Stack>

                                            </form>
                                        </div>
                                    </div>
                                </Stack>
                            </div>
                        </div>
                        {/* <Footer/> */}
                    </>
                )}
            </div>
        </>
    )
}

export default BlogPage;