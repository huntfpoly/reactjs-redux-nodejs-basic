import { ListItemIcon, ListItemText, Typography, useMediaQuery } from '@material-ui/core';
import ListItemButton from '@material-ui/core/ListItemButton';
// assets
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
// material-ui
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// project imports
import { MENU_OPEN, SET_MENU } from '../../../../../store/actions';

// style constant
const useStyles = makeStyles((theme) => ({
    listIcon: {
        minWidth: '18px',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    listCustomIconSub: {
        width: '6px',
        height: '6px'
    },
    listCustomIconSubActive: {
        width: '8px',
        height: '8px'
    },
    listItem: {
        marginBottom: '5px',
        alignItems: 'center'
    },
    listItemNoBack: {
        marginBottom: '5px',
        backgroundColor: 'transparent !important',
        paddingTop: '8px',
        paddingBottom: '8px',
        alignItems: 'flex-start'
    },
    subMenuCaption: {
        ...theme.typography.subMenuCaption
    }
}));

//-----------------------|| SIDEBAR MENU LIST ITEMS ||-----------------------//

const NavItem = ({ item, level }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    // console.log(customization.isOpen)
    // breakpoint 960 tro xuong
    const matchesSM = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const Icon = item.icon;
    const itemIcon = item.icon ? (
        <Icon stroke={1.5} size="21px" className={classes.listCustomIcon} />
    ) : (
        <FiberManualRecordIcon
            className={
                customization.isOpen.findIndex((id) => id === item.id) > -1 ? classes.listCustomIconSubActive : classes.listCustomIconSub
            }
            fontSize={level > 0 ? 'inherit' : 'default'}
        />
    );

    let itemIconClass = !item.icon ? classes.listIcon : classes.menuIcon;
    itemIconClass = customization.navType === 'nav-dark' ? [itemIconClass, classes.listCustomIcon].join(' ') : itemIconClass;

    let itemTarget = '';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = { component: React.forwardRef((props, ref) => <Link {...props} to={item.url} />) };

    if (item.external) {
        listItemProps = { component: 'a', href: item.url };
    }

    const itemHandler = (id) => {
        dispatch({ type: MENU_OPEN, id: id });
        matchesSM && dispatch({ type: SET_MENU, opened: false });
    };

    // active menu item on page load
    React.useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);


        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            className={level > 1 ? classes.listItemNoBack : classes.listItem}
            sx={{ borderRadius: customization.borderRadius }}
            selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
            target={itemTarget}
            style={{ paddingLeft: level * 23 }}
        >
            <ListItemIcon className={itemIconClass}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
