import { Button, Stack } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UrlInput from './UrlInput/UrlInput'
import RenarrationDataGrid from './RenarrationDataGrid'

const Compose = () => {

  return (

   <>
      <Stack justifyContent={'center'} direction={'row'} my={3}>
    <UrlInput renarration navigateTo={'compose'} />
  
   </Stack>
     <RenarrationDataGrid />
   </>
  )
}

export default Compose