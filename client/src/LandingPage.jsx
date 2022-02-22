import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import PopUp from './PopUp'
import Update from './Update'
import { ClientsState } from './context/ClientsProvider'
import {
    styled,
    useTheme
} from '@mui/material/styles';
import { Box, Stack, Paper, Grid, Button } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { 
  GpsFixedOutlined, 
  NotificationsActiveOutlined, 
  DevicesOtherOutlined, 
  PeopleAltOutlined, 
  WhatshotOutlined, 
  SettingsOutlined,
  DeleteOutlineOutlined,
  MonitorHeartOutlined
} from '@mui/icons-material';

const LandingPage = () => {
    const drawerWidth = 240;
    const openedMixin = (theme) => ({
        width: drawerWidth,
        background: '#DCDCDC',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        // overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(9)} + 1px)`,
        },
    });

    const DrawerHeader = styled('div')(({
        theme
    }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({
        theme,
        open
    }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const Drawer = styled(MuiDrawer, {
        shouldForwardProp: (prop) => prop !== 'open'
    })(
        ({
            theme,
            open
        }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'inherit',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        width: '100ch',
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }));

      const ItemBox = styled(Paper)(({ theme }) => ({
        backgroundColor: '#ffffff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        boxShadow: '10px 10px 12px -13px rgba(0,0,0,0.43)'
      }));

      const sideMenus = [
        {name: 'Field Tracking', icon: <GpsFixedOutlined />},
        {name: 'Alerts', icon: <NotificationsActiveOutlined />},
        {name: 'Devices', icon: <DevicesOtherOutlined />},
        {name: 'Users', icon: <PeopleAltOutlined />},
        {name: 'Cases', icon: <WhatshotOutlined />},
        {name: 'Settings', icon: <SettingsOutlined />}
      ]

    // Get All Users on db
      const {clients, setClients} = ClientsState();
     const getClients = async () => {
        try {
          const { data} = await Axios.get('http://localhost:5000/clients')
          setClients(data)
      } catch (error) {
          console.log(error)
        }
      }

      useEffect(() => {
        getClients();
      }, [])

      //Delete API
      const deleteClients = async (id) => {
        await Axios.delete(`http://localhost:5000/delete/${id}`).then((response) => {
          setClients(
            clients.filter((val) => {
              return val.id !== id;
            })
          );
        });
      };

    return ( 
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" open={open} style={{backgroundColor: '#ffffff'}}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon color='primary'/>
        </IconButton>
        <Stack
        direction="row"
        spacing={2}
        >
            <Item>
              <Typography variant="h6" noWrap component="div" color='#101010'>
                Alerts
              </Typography>
              <PopUp />
            </Item>
      </Stack>
      </Toolbar>
    </AppBar>
    <Drawer variant="permanent" open={open} background='#000000'>
      <DrawerHeader>
      <Typography>Launch Code</Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
          {
            sideMenus.map((text, index) => (
              <ListItem button key={index}>
              <ListItemIcon>
               {text.icon}
            </ListItemIcon>
            <ListItemText primary={text.name} />
            </ListItem>
            ))
          }
      </List>
      <Divider />
    </Drawer>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
              clients.map((val) => (
                <Grid item xs={2} sm={4} md={4} key={val.id}>
                <ItemBox>
                  <Box>
                    {
                      <>
                      <Box>
                        <Typography style={{color: '#101010'}}><MonitorHeartOutlined color='error' style={{fontSize: '1rem'}} /> Heart Spike</Typography>
                        <Typography>{val.first_name} {val.last_name}</Typography>
                      </Box>
                      <Box mt={2}>
                        <Typography variant='p'>
                          {val.first_name} {val.last_name}'s heart rate rose above {val.bmp} BPM at for 2 minute Starting from 08:25 
                        </Typography>
                      </Box>
                      </>
                    }
                  </Box>
                  <Box style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
                    <button onClick={deleteClients} style={{backgroundColor: '#eeeeee', color: '#101010', borderRadius: '5px', border: 'none'}}>Cancel</button>
                    <Update />
                  </Box>
                </ItemBox>
                </Grid>
              ))
            }
          </Grid>
    </Box>
    </Box>
  </Box>
    )
}

export default LandingPage