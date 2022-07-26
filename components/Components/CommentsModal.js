


import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { Avatar, IconButton, Stack } from '@mui/material';
import { height } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from 'next/link'
// import { Followers } from './Followers';
import { deepOrange } from '@mui/material/colors';
import LikeButton from './Button';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios'
// import './scrollbar.css'

export default function TransitionsModal({ open, setOpen, handleOpen, handleClose, post, token, user }) {
    //   const [open, setOpen] = React.useState(false);
    const [comments, setComments] = React.useState(post.comments)
    const [tokenn, setToken] = React.useState(token)
    const [userr, setUser] = React.useState(user)
    const [body, setBody] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [posted, setCommentPost] = React.useState(post)
    const [postCount, setPostCount] = React.useState(post.comments.length)
    const blogref = React.useRef()
    console.log(post)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const Comment = async (e) => {
        e.preventDefault()
        const comment = {
            body,
            username: userr.username
        }
        setComments([...comments, comment])
        blogref.current.scrollIntoView({ behavior: 'smooth' })
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenn}`
            }
            await setLoading(true)
            setBody('')
            const res = await axios.post(`http://localhost:4000/api/comments?id=${post.id}`, { body }, { headers: headers })
            await setLoading(false)
            setPostCount(res.data.comments)
            setCommentPost(res.data)
            console.log(res.data.comments)
        } catch (error) {
            console.log(error.response)
            await setLoading(false)
        }
        console.log(comments)
    }

    return (
        <div>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"

            >
                <Box className='scrolly bg-black w-full min-h-screen  py-2 px-4 overflow-scroll'>
                    <div style={{ position: "relative" }}>
                        <IconButton onClick={handleClose} style={{ position: "absolute", right: '0', top: "0" }}>
                            <CancelIcon className='text-white' />
                        </IconButton>
                    </div>
                    <div className='py-12 w-full md:w-2/5 mx-auto'>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <div className='flex space-x-3 items-center'>
                                <Avatar alt={post.username} sx={{ cursor: 'pointer', bgcolor: deepOrange[500] }} src="/static/images/avatar/1.jpg" />
                                <Typography id="transition-modal-title" variant="h6" component="h2" className='py-4 text-white font-mono text-2xl'>
                                    <Link href={`/${post.username}`}><p className='font-bold cursor-pointer font-mono text-gray-400 hover:hover:text-[#3366ff]'>@{post.username}</p></Link>
                                </Typography>
                            </div>

                            {/* <Followers /> */}
                        </Stack>
                        <div>
                            <h1 className='text-white font-mono p-4'>{post.title}</h1>
                            <img src={post.coverPhoto}
                                className="h-[300px] md:h-[400px] w-full md:w-4/5 object-cover rounded-lg"
                                sx={{ margin: "auto", borderRadius: "15px" }}
                            />
                        </div>


                
                        <div className='flex items-center space-x-2 text-white'>
                            <div className='flex items-center space-x-2'>
                                <CommentIcon />
                                <p>{comments.length}</p>
                            </div>
                            <LikeButton user={userr} post={post} />
                        </div>
                        <div>
                            <form className='flex items-center space-x-3' onSubmit={Comment}>
                                <input required value={body} onChange={(e) => setBody(e.target.value)} className='w-3/5 p-2 bg-white rounded-md outline-none' placeholder='Comment on Blog' autoFocus />
                                <button type='submit' className={loading ? 'p-2 rounded-md text-white bg-blue-200' : 'p-2 rounded-md text-white bg-blue-400'}>Comment</button>
                            </form>

                        </div>
                        <div className='p-2 ml-3'>
                            {comments.map((comment) => (
                                <>
                                    <div key={Math.floor(Math.random() * 10)} className='py-2 rounded-md emeke w-3/5 mt-2'>
                                        <div>
                                            <p className='px-2 text-blue-400 cursor-pointer'>@{comment.username}</p>
                                        </div>
                                        <p className='text-white px-2 cursor-pointer'>{comment.body}</p>
                                    </div>
                                </>
                            ))}
                            <div ref={blogref} className='py-1'></div>
                        </div>
                    </div>
                </Box>
            </Dialog>
        </div>
    );
}


export async function getServerSideProps() {
    // Fetch data from external API

    const data = JSON.parse(localStorage.getItem('token'))

    const user = JSON.parse(localStorage.getItem('user'))

    // Pass data to the page via props
    return { props: { token: data, user: user } }
}
