import React, { useState } from 'react';
import Axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { ClientsState } from './context/ClientsProvider'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '2px',
  boxShadow: 24,
  p: 4,
};

export default function PopUp({children}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {first_name, setFirst_name, last_name, setLast_name, bmp, setBmp, clients, setClients} = ClientsState();

  const addClients = async () => {
    await Axios.post('http://localhost:5000/create', {
      first_name: first_name,
      last_name: last_name,
      bmp: bmp
    }).then(() => {
      setClients([
        ...clients,
        {
          first_name: first_name,
          last_name: last_name,
          bmp: bmp
        }
      ])
    })
  }

  return (
    <>
      <Button onClick={handleOpen}>New Request</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create A New Alert
            </Typography>
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
              mt={3}
            >
              <TextField fullWidth label="First Name" id="fullWidth" onChange={(e) => { setFirst_name(e.target.value); } }/>
            </Box>
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
              mt={3}
            >
              <TextField fullWidth label="Last Name" id="fullWidth" onChange={(e) => { setLast_name(e.target.value); } }/>
            </Box>
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
              mt={3}
            >
              <TextField fullWidth label="BMP" id="fullWidth" onChange={(e) => { setBmp(e.target.value); } }/>
            </Box>
            <Box mt={4} style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button variant='contained' color='error' onClick={addClients}>Create</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
