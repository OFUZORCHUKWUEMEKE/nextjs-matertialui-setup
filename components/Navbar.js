import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link';
// import { AuthContext } from '../AuthProvider'
// import { Link } from 'react-router-dom'
import Inputed from './Input'
import BasicModal from './Modal'
// import styles from './Home.css'
import MenuIcon from '@mui/icons-material/Menu';
import TemporaryDrawer from './Drawer'
import { IconButton } from '@mui/material'
import {motion} from 'framer-motion'

const Navbar = ({data}) => {
  const [open, setOpen] = useState(false);
//   const { client, loading, data: { getPosts: posts } = {}, error } = useQuery(FETCHPOST, { fetchPolicy: "network-only" })
  const [post, setPost] = useState()
  const [user, setUser] = useState(data)
//   const { dispatch } = useContext(AuthContext)

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = async (e) => {
    dispatch({ type: "LOGOUT" })
    setUser(null)
    await client.clearStore()
  }
  const handleOpen = () => setOpen(true);  
  const handleClose = () => setOpen(false);
  return (
    <>
      <nav className='bg-[#1F2937] p-2 emeke' >
        <motion.div 
        initial={{y:"-100vh"}}
        transition={{type:"spring",stiffness:100}}
        animate={{y:0}}
        className='flex w-[90%] mx-auto flex-row justify-between'>
          <div className='space-x-4 flex items-center'>
            <Link href='/'><h1 className='text-white font-mono font-bold'>Blogg</h1></Link>
            <div className='hidden md:block'>
              <Inputed className="hidden md:block" />
            </div>

          </div>
          {user ? (
            <div className='space-x-6 flex items-center'>
              <Link href="/create"> <span className='rounded-[50px]  cursor-pointer py-3 px-6 bg-[#3466f6] text-white'>Write</span></Link>
              <span className='text-white hidden md:block bg-[#171d24] py-3 px-3 md:px-6 rounded-md'>Hello {user.username}</span>
              <span onClick={logout} className='text-white bg-[#3466f6]  hidden md:block cursor-pointer py-3 px-6 rounded-[50px]'>Logout</span>
              <div className='block md:hidden'>
                <IconButton onClick={toggleDrawer("left", true)} className='block md:hidden text-white'>
                  <MenuIcon className='text-white' />
                </IconButton>
              </div>

            </div>
          ) : (
            <div className='space-x-6 flex items-center'>
              <BasicModal />
              <Link href='/register'><span className='text-white  hidden md:block bg-[#171d24] p-3 rounded-md'>Create Account</span></Link>
              <Link href='/login'><span className='text-white hidden md:block  bg-[#171d24] py-3 px-6 rounded-md'>Login</span></Link>
              <div className='block md:hidden'>
                <IconButton onClick={toggleDrawer("left", true)} className='block md:hidden text-white'>
                  <MenuIcon className='text-white' />
                </IconButton>
              </div>
            </div>
          )}
        </motion.div>
        <TemporaryDrawer toggleDrawer={toggleDrawer} state={state} setState={setState} />
      </nav>
    </>
  )
}
const FETCHPOST = gql`
  {
    getPosts{
    id
    username
    body
    title
    comments {
      body
    }
    createdAt
    likes {
      username
    }
    slug
  }  
  }
`

export async function getServerSideProps() {
    // Fetch data from external API
   
    const data = localStorage.getItem('user')
  
    // Pass data to the page via props
    return { props: { data } }
  }
  
export default Navbar;  