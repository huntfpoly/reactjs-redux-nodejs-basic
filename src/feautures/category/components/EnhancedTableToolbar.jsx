import Toolbar from '@material-ui/core/Toolbar';
import { alpha } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

 const EnhancedTableToolbar = (props) => {
  const { numSelected ,onRemove} = props;
  // console.log(listItemProps)
  return (
    <Toolbar
      sx={{
        pl: { sm: 0 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected.length > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected.length > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h3'
          id='tableTitle'
          component='div'
        >
          List
        </Typography>
      )}

      {numSelected.length > 0 ? (
        <Tooltip title='Delete'>
          <IconButton onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <React.Fragment>
          {/* button filter */}
          <Tooltip title='Filter list'>
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>

          {/* Button add category */}
          <Link to="category/add">
            <Tooltip title='AddEdit new' >
              <IconButton
                sx={{
                  ml:1,
                  color:"primary.light",
                  bgcolor:"primary.200",
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                <AddIcon/>
              </IconButton>
            </Tooltip>
          </Link>
        </React.Fragment>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired
};
export default EnhancedTableToolbar;