import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Alert, Box, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import extractMedia from '../utils/extractMedia';
import removeMedia from '../utils/removeMedia';
import { ArrowBack, ArrowForward, Edit, NearMe } from '@mui/icons-material';
import { getAllRenarrations } from '../apis/extractApis';
import RenarrationBlockSkeleton from './RenarrationBlockSkeleton';
import SharingIdModal from './SharingIdModal';
import SharingIDModal from './SharingIdModal';

const Sweet = () => {
    const renarrationId = useParams().id;
    const [renarration, setRenarration] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSharingIdIncorrect, setIsSharingIdIncorrect] = useState(false);
  const [resMessage,setresMessage] = useState('')

    const navigate = useNavigate();

    const getRennaration = async () => {
        try {
            await axios.get(`${getAllRenarrations}/${renarrationId}`).then((res) => { setRenarration(res.data); console.log(res.data) })
        } catch (error) {
            console.log(error)
        }
    }

   
    const handleEditClick = () => {
        setIsModalOpen(true);
        setIsSharingIdIncorrect(false);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleModalSubmit = async (sharingId) => {
        try {
            const response = await axios.get(`http://localhost:2000/verify-sharing/${sharingId}`);
const getRenarration = await axios.get(`http://localhost:2000/renarrations/${response.data}`);
            navigate(`/create-renarration`);
            
      
        } catch (error) {
            console.error('Error verifying sharing ID:', error);
            setIsSharingIdIncorrect(true);
            setresMessage(error.response.data)
        }
    };
    useEffect(() => {
        getRennaration();
        console.log(renarrationId)
    }, [renarrationId])
    const skeletons = Array.from({ length: 6 }, (_, index) => index);
    return renarration ?
        <Box >
            <Stack direction={'row'} justifyContent={'space-between'}>
            <Button startIcon={<ArrowBack />} sx={{ m: 4 }} onClick={() => { navigate('/') }} variant='contained'>Go Back</Button>
            <Button endIcon={<Edit />} sx={{ m: 4 }} onClick={handleEditClick} variant='contained'>Edit this Renarration</Button>
            </Stack>
            <Typography textAlign={'center'} variant='h4'>{renarration.renarrationTitle}</Typography>
            <Grid container maxWidth={'lg'} spacing={2} p={4}>

                {renarration.blocks.map((block,index) => (
                    <Grid item key={index} xs={12} lg={4} >
                        <Card>
                            <CardHeader
                                action={
                                    <Button variant='outlined' size='small' endIcon={<NearMe />} href={block.source} target='_blank'>source</Button>
                                }
                            />
                            <CardMedia>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', p: 1 }}>
                                    {extractMedia(block.content).map((src, index) => (
                                        <Box
                                            key={index}
                                            component="img"
                                            sx={{
                                                width: '50%',
                                                height: 'auto',
                                                objectFit: 'cover',
                                                p: 0.5,
                                            }}
                                            src={src}
                                            alt={`Renarration image ${index + 1}`}
                                        />
                                    ))}

                                </Box>
                            </CardMedia>
                            <CardContent>
                                <div dangerouslySetInnerHTML={{ __html: removeMedia(block.content) }} />
                                <Paper variant='outlined' sx={{ p: 2, my: 3 }}>
                                    <Typography>{block.description}</Typography>
                                    {block.img && (
                                        <Box component="img" src={URL.createObjectURL(block.img)} alt={`Renarration image`} sx={{ width: '50%', height: 'auto', objectFit: 'cover', p: 0.5 }} />
                                    )}
                                    <Typography my={2}>{block.desc}</Typography>
                                    {block.aud && (
                                        <audio controls src={URL.createObjectURL(block.aud)} style={{ marginBlock: "20px" }} />
                                    )}
                                    {block.vid && (
                                        <video controls width="100%" src={URL.createObjectURL(block.vid)} style={{ marginBlock: "20px" }} />
                                    )} </Paper>
                            </CardContent>

                        </Card>
                    </Grid>
                ))}
            </Grid>
            <SharingIDModal
                open={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                response={resMessage}
                idVerifyStatus = {isSharingIdIncorrect}
            />
       
        </Box>
        :
        <>
            <Button startIcon={<ArrowBack />} sx={{ m: 4 }} onClick={() => { navigate('/') }} variant='contained'>Go Back</Button>
            <Grid container spacing={2} p={3}>

                {skeletons.map((_, index) => (
                    <Grid key={index} item lg={3} md={4} xs={12}>
                        <RenarrationBlockSkeleton key={index} />
                    </Grid>
                ))}

            </Grid>

        </>

};

export default Sweet;
