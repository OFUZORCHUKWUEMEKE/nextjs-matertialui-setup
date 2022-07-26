import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import { Grid, Stack } from '@mui/material'
import Link from "next/link"
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client'
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../AuthProvider'
import { Button } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { client } from './_app';

const Login = ({login}) => {
  const router = useRouter()
//   const { dispatch } = useContext(AuthContext)
  const [values, setValues] = useState({ email: "", password: "" })
  const [user, setUser] = useState()
  const [load, setLoading] = useState(false)
  const [errors,setErrors] = useState('')
//   const [addUser, { loading, error, data }] = useMutation(LOGINQUERY, {
//     update(_, { data: { login } }) {
//       dispatch({ type: "LOGIN", payload: login })
//       router.push('/')
//       setUser(login)
//     },
//     onError(err) {
//       console.log(err.graphQLErrors[0].message)
//       setErrors(err.graphQLErrors[0].message)
//       toast.error(errors, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       })
//     },
//     variables: values
//   })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    try {
      setLoading(true)
      e.preventDefault()
      await addUser()
      await setLoading(false)
    } catch (error) {
      console.log(error.response);
    }
  }
  return (
    <>
      <div className='bg-[#171d24] min-h-screen'>
        <Nav />
        <div className='grid w-[90%] mx-auto place-items-center h-[80vh]'>
          <Grid container spacing={3} justifyContent='space-between' alignItems='center'>
            <Grid item xs={12} md={6}>
              <h2 className='text-center font-mono text-[#3466f6] mb-6 text-[32px]'>Sign In</h2>
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <input className='py-3 px-4 outline-none border-0 rounded-md  bg-[#0a0e14] text-white' name='email' type='email' placeholder='email' onChange={onChange} required />
                  <input className='py-3 px-4 outline-none border-0 rounded-md bg-[#0a0e14] text-white' name='password' type='password' placeholder='password' onChange={onChange} required />
                  <Button type="submit" isLoading={load} className='rounded-[50px] cursor-pointer outline-none border-0 py-3 px-6 bg-[#3466f6] text-center text-white'>Sign In</Button>
                  <p className='text-white text-center'>Dont have an account ? <Link href='/register' className='text-[#3466f6]'>Register</Link></p>
                </Stack>
              </form>
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
            </Grid>
            <Grid item xs={12} md={4}>
              <img src="/img/login.svg" className='object-cover' />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

const LOGINQUERY = gql`
  mutation login(
    $email:String!
    $password:String!
  ){
    login(  
        email:$email
        password:$password
    ){
       id
       email
       username 
       token  
      
    }
  }
`

export default Login;

export const getServerSideProps = ()=>{
  const [login, { loading, error, data }] = client.mutate({
    mutation: gql`
    mutation login(
      $email:String!
      $password:String!
    ){
      login(  
          email:$email
          password:$password
      ){
         id
         email
         username 
         token  
        
      }
    }
  `
  })
  return{
    prop:{
      login:login
    }
  }
}