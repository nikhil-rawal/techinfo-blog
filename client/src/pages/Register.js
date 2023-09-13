import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Box,Typography,TextField,Button} from '@mui/material'



const Register = () => {
    const navigate = useNavigate()
    const [input,setInput] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange = (e) => {
        setInput(prevState=>({
            ...prevState,[e.target.name]:e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
        <Box maxWidth={450} display={"flex"} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} margin={'auto'} marginTop={5} boxShadow={'1px 1px 5px #CCC'} padding={3} borderRadius={5}>
            <Typography variant='h4' sx={{textTransform:"uppercase"}} padding={3} textAlign={'center'}>Register</Typography>
            <TextField placeholder='Name' name='name' value={input.name} onChange={handleChange} margin='normal' type='text'required />
            <TextField placeholder='Email' name='email' value={input.email} onChange={handleChange} margin='normal' type='email'required />
            <TextField placeholder='Password' name='password' value={input.password} onChange={handleChange} margin='normal' type='password'required />
            <Button type='submit' variant='contained' color='primary' sx={{borderRadius:3,marginTop:3}}>Submit</Button>
            <Button onClick={()=>navigate("/login")} type='submit' color='primary' sx={{borderRadius:3,marginTop:3}}>Already Registered? Please Login</Button>
        </Box>
        </form>
        </>
    )
}

export default Register