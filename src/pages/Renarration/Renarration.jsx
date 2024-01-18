import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
const Renarration = () => {
  const location = useLocation();
  const fileUrl = location.state?.fileUrl;


  return (
    <iframe src={fileUrl} width="100%" height="700px" title="Content Frame"></iframe>
  )
}

export default Renarration