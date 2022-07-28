import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import { Grid, Stack } from '@mui/material'
import Link from 'next/link'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../components/AuthProvider'


const Register = () => {
    const [load, setLoading] = useState(false)
    const [values, setValues] = useState({ email: "", username: "", password: "", conFirmPassword: "" })
    const [user, setUser] = useState()
    const [errors, setErrors] = useState('')
    const { dispatch } = useContext(AuthContext)
    const router = useRouter()

    const [register, { loading, error, data }] = useMutation(REGISTERQUERY, {
        update(_, { data: { register } }) {
            console.log(register)
            dispatch({ type: "LOGIN", payload: register })
            router.push('/login')
            setUser(register)

        },
        onError(err) {
            console.log(err.graphQLErrors[0].message)
            setErrors(err.graphQLErrors[0].message)
            toast.error(errors, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        },
        variables: values
    })

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        await setLoading(true)
        e.preventDefault()
        console.log(values)
        await register()
        await setLoading(false)
    }
    return (
        <>
            <div className='bg-[#171d24] min-h-screen'>
                <Nav />
                <div className='grid w-[90%] mx-auto place-items-center h-[80vh]'>
                    <Grid container spacing={3} justifyContent='space-between' alignItems='center'>
                        <Grid item xs={12} md={6}>
                            <h2 className='text-center text-[#3466f6] mb-6 text-[32px]'>Sign Up</h2>
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <input className='py-3 px-4 outline-none border-0 rounded-md bg-[#0a0e14] text-white' type='username' placeholder='username' name='username' onChange={onChange} required/>
                                    <input className='py-3 px-4 outline-none border-0 rounded-md bg-[#0a0e14] text-white' type='email' placeholder='email' name='email' onChange={onChange} required/>
                                    <input className='py-3 px-4 outline-none border-0 rounded-md bg-[#0a0e14] text-white' type='password' placeholder='password' onChange={onChange} name='password' required/>
                                    <input className='py-3 px-4 outline-none border-0 rounded-md bg-[#0a0e14] text-white' type='password' placeholder='confirmpassword' onChange={onChange} name='conFirmPassword' required/>
                                    <Button type="submit" isLoading={load} className='rounded-[50px] cursor-pointer outline-none border-0 py-3 px-6 bg-[#3466f6] text-center text-white'>Sign Up</Button>
                                    <p className='text-white text-center'>Already have an account ? <Link href='/login' className="text-[#3466f6]">Login</Link></p>
                                </Stack>
                            </form>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src="/img/login.svg" className='object-cover' />
                        </Grid>
                    </Grid>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </div>
        </>
    )
}

const REGISTERQUERY = gql`
mutation($username: String!, $email: String!, $password: String!, $conFirmPassword: String!){
  register(username: $username, email: $email, password: $password, conFirmPassword: $conFirmPassword) {
    id
    token
    username
    email
    post
  }
}
`

export default Register