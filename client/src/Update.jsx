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

export default function Update({children}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {clients, setClients } = ClientsState()
  const [newName, setNewName] = useState('');

  
  const updateClientsFirst_name = (id) => {
    Axios.put("http://localhost:5000/update", { first_name: newName, id: clients.id }).then(
      (response) => {
        setClients(
          clients.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  first_name: newName,
                }
              : val
          })
        );
      }
    );
  };

  return (
    <>
      <Button onClick={handleOpen}>Respond</Button>
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
              <TextField fullWidth label="Update" id="fullWidth" onChange={(e) => { setNewName(e.target.value); } }/>
            </Box>
            <Box mt={4} style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button variant='contained' color='success' onClick={updateClientsFirst_name}>Update</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
