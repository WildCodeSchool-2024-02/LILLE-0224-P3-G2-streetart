import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Menu from '@mui/icons-material/Menu';
import Camera from '@mui/icons-material/AddAPhoto';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useBurgerMenu } from '../../contexts/BurgerMenuContext';
import BurgerMenu from '../BurgerMenu/BurgerMenu';


export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(null);
  const ref = React.useRef(null);

    const navigate = useNavigate()

    const { isMenuOpen, handleOpenMenu } = useBurgerMenu();

  function goToCamera() {
    navigate("/ajouter-oeuvre/camera")
  }

  function goToProfile() {
    navigate("/profil/2")
  }

  return (
    <>
        {isMenuOpen && <BurgerMenu />}
        <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 3 }} elevation={4}>
            <BottomNavigation
            showLabel={false}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            >
            <BottomNavigationAction icon={<Menu fontSize="large" />} onClick={handleOpenMenu}/>
            <BottomNavigationAction icon={<Camera fontSize="large" />} onClick={() => goToCamera()} />
            <BottomNavigationAction icon={<AccountCircle fontSize="large" />} onClick={() => goToProfile()} />
            </BottomNavigation>
        </Paper>
        </Box>
    </>
  );
}
