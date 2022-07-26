import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from 'next/link';
import {motion} from 'framer-motion'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'white',
  border: '0px solid #000',
  border:'none',
  boxShadow: 24,
  p: 4, 
  borderRadius:"10px"
};

export default function BasicModal({data}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);  
  const handleClose = () => setOpen(false);
  const [user, setUser] = React.useState(data)
  return (
    
    <div>
        {user ?<Link href='/'><span onClick={handleOpen} className='rounded-[50px] cursor-pointer py-3 px-6 bg-[#3466f6] text-white '>Write</span></Link>:<span onClick={handleOpen} className='rounded-[50px] cursor-pointer py-3 px-6 bg-[#3466f6] text-white'>Write</span>}
      
      <Modal
        open={open}
        onClose={handleClose} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className='p-3 flex flex-col items-center space-y-5'>
              <h2 className='text-center font-mono font-bold '>Login To Continue</h2>
              <Link href='/login'><span className='bg-[#171d24] rounded-md text-white text-center cursor-pointer py-2 px-4 w-3/5 mx-auto font-mono'>Login</span></Link> 
            </div>        
        </Box>
      </Modal>  
    </div>
  );     
}

export async function getServerSideProps() {
    // Fetch data from external API
   
    const data = localStorage.getItem('user')
  
    // Pass data to the page via props
    return { props: { data } }
  }   
  
