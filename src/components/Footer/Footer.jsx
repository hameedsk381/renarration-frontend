import { Copyright } from '@mui/icons-material'
import { Container, Typography, Stack } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Stack sx={{bgcolor:'#F6FBFF'}} p={3} direction={{ xs: 'column', md: 'row' }}>
      <Container sx={{display:"flex",flexDirection:{ xs: 'column', md: 'row'},justifyContent:'space-between'}} >
        <Typography sx={{fontSize: 12, color: '#898383'}} textAlign={{xs:'center',md:'start'}}>
          <Copyright sx={{fontSize:'12px'}}/> 2024 <a style={{fontSize: 12, color: '#898383'}} href="https://open.janastu.org" target="_blank">janastu.org</a> Inc . <a href='https://gitlab.com/servelots/papad/papad-api/-/blob/prod/LICENSE' target='_blank' style={{fontSize: 12, color: '#898383'}}>GNU AGPLv3</a>
        </Typography>
        <Stack direction={'row'} justifyContent={'space-between'} spacing={4} fontSize={{xs:'12px',md:'14px'}} my={{xs:2,md:0}}>
          <a style={{textTransform:'initial',textDecoration:'none',color:'#898383',cursor:"pointer"}}>Documentation</a>
          <a style={{textTransform:'initial',textDecoration:'none',color:'#898383',cursor:"pointer"}}>Re-narration Repo</a>
          <a style={{textTransform:'initial',textDecoration:'none',color:'#898383',cursor:"pointer"}} >File an issue</a>
        </Stack>
      </Container>
    </Stack>
  )
}

export default Footer