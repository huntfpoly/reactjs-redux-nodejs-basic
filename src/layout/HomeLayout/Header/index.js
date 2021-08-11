import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Paper, Toolbar } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React from 'react';
import { Link } from 'react-router-dom';
import LogoSection from '../../MainLayout/LogoSection';
import CartPreview from './CartPreview';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/feautures/auth/loginSlice';
import { clearUser } from '@/store/userSlice';
function Header() {
  const {
    user: { firstName, lastName, avatar, isAdmin }
  } = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.login);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    dispatch(clearUser());
  };

  return (
    <React.Fragment>
      <AppBar enableColorOnDark position="relative" color="inherit" elevation={0}>
        <Paper elevation={1} square>
          <Toolbar>
            <Container sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, width: '228px' }}>
                <LogoSection />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Link to="/product">
                  <Button variant="text">Product</Button>
                </Link>
              </Box>
              {isAuth ? (
                <Box>
                  <Button disableRipple={true} disableFocusRipple={true} aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                    {avatar && <Avatar alt={`${firstName} ${lastName}`} src={avatar} />}
                    {!avatar && <Avatar alt={`${firstName} ${lastName}`}>{`${firstName} ${lastName}`}</Avatar>}
                  </Button>
                  <Menu
                    id="basic-menu"
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                  >
                    <Link to="/profile" underline="none">
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    {isAdmin && (
                      <MenuItem
                        onClick={() => {
                          setAnchorEl(null);
                        }}
                      >
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Box>
                  <Link to="/login">
                    <Button variant="outlined" sx={{ mx: 1 }}>
                      sign in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outlined">sign up</Button>
                  </Link>
                </Box>
              )}
              <Box sx={{ mx: 1 }}>
                <CartPreview />
              </Box>
            </Container>
          </Toolbar>
        </Paper>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
