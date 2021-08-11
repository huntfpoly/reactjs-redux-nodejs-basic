import {
  Avatar,
  CardContent,
  Chip,
  ClickAwayListener,
  List,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography
} from '@material-ui/core';
import ListItemButton from '@material-ui/core/ListItemButton';
// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
// assets
import { IconLogout, IconSettings } from '@tabler/icons';
import React from 'react';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// project imports
import MainCard from '../../../../components/cards/MainCard';
import Transitions from '../../../../components/extended/Transitions';
import User1 from './../../../../assets/images/users/user-round.svg';

// style const
const useStyles = makeStyles((theme) => ({
  navContainer: {
    width: '100%',
    maxWidth: '350px',
    minWidth: '300px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%'
    }
  },
  headerAvatar: {
    cursor: 'pointer',
    ...theme.typography.mediumAvatar,
    margin: '8px 0 8px 8px !important'
  },
  profileChip: {
    height: '48px',
    alignItems: 'center',
    borderRadius: '27px',
    transition: 'all .2s ease-in-out',
    borderColor: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.light,
    '&[aria-controls="menu-list-grow"], &:hover': {
      borderColor: theme.palette.primary.main,
      background: theme.palette.primary.main + '!important',
      color: theme.palette.primary.light,
      '& svg': {
        stroke: theme.palette.primary.light
      }
    }
  },
  profileLabel: {
    lineHeight: 0,
    padding: '12px'
  },
  listItem: {
    marginTop: '5px'
  },
  cardContent: {
    padding: '16px !important'
  },
  card: {
    backgroundColor: theme.palette.primary.light,
    marginBottom: '16px',
    marginTop: '16px'
  },
  searchControl: {
    width: '100%',
    paddingRight: '8px',
    paddingLeft: '16px',
    marginBottom: '16px',
    marginTop: '16px'
  },
  startAdornment: {
    fontSize: '1rem',
    color: theme.palette.grey[500]
  },
  flex: {
    display: 'flex'
  },
  name: {
    marginLeft: '2px',
    fontWeight: 400
  },
  ScrollHeight: {
    height: '100%',
    maxHeight: 'calc(100vh - 250px)',
    overflowX: 'hidden'
  },
  badgeWarning: {
    backgroundColor: theme.palette.warning.dark,
    color: '#fff'
  }
}));

//-----------------------|| PROFILE MENU ||-----------------------//

const ProfileSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleLogout = async () => {
    console.error('Logout');
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose(event);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <React.Fragment>
      <Chip
        classes={{ label: classes.profileLabel }}
        className={classes.profileChip}
        icon={
          <Avatar
            src={User1}
            className={classes.headerAvatar}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <CardContent className={classes.cardContent}>
                    <PerfectScrollbar className={classes.ScrollHeight}>
                      <List component="nav" className={classes.navContainer}>
                        <ListItemButton
                          className={classes.listItem}
                          sx={{ borderRadius: customization.borderRadius + 'px' }}
                          selected={selectedIndex === 0}
                          onClick={(event) => handleListItemClick(event, 0)}
                          component={React.forwardRef((props, ref) => (
                            <RouterLink {...props} to="/" />
                          ))}
                        >
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="21px" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Website</Typography>} />
                        </ListItemButton>

                        <ListItemButton
                          className={classes.listItem}
                          sx={{ borderRadius: customization.borderRadius + 'px' }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="21px" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                        </ListItemButton>
                      </List>
                    </PerfectScrollbar>
                  </CardContent>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default ProfileSection;
