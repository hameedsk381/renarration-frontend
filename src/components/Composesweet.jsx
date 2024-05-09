import { Stack } from '@mui/material'
import React from 'react'
import UrlInput from './UrlInput/UrlInput'
import HomeTabs from './HomeTabs'
import Info from './Info'
import SweetsDataGrid from './SweetsDataGrid'

const Composesweet = () => {
  return (
   <>
     <Stack direction="column" alignItems="center" spacing={4} my={3}>
         <UrlInput homepage navigateTo="re-narrate" />
       </Stack>
       <SweetsDataGrid />

   
        
      
   </>
  )
}

export default Composesweet