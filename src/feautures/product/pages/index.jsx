import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import EditIcon from '@material-ui/icons/Edit';
// project imports
import MainCard from '../../../components/cards/MainCard';
import SecondaryAction from '../../../components/cards/CardSecondaryAction';
import EnhancedTableHead from '../../../components/table/TableHeader';
import EnhancedTableToolbar from '../components/EnhancedTableToolbar';
import ProductApi from '../../../apis/ProductApi';
import { Alert, Tooltip } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { getMe } from '../../../store/userSlice';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'name',
    numeric: false, // align table cell
    disablePadding: true, // padding table cell
    label: 'Name' // name cell
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price'
  },
  {
    id: 'categoryId',
    numeric: false,
    disablePadding: false,
    label: 'Category'
  },
  {
    id: 'quantity',
    numeric: false,
    disablePadding: false,
    label: 'Quantity'
  },
  {
    id: 'sold',
    numeric: false,
    disablePadding: false,
    label: 'Sold'
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: true,
    label: 'Action'
  }
];

const Index = () => {
  const [data, setData] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n._id);
      setSelected(newSelecteds);
      console.log(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };
  const handleDeleteRow = async (event) => {
    const result = await ProductApi.softDelete({ _id: selected });
    if (result.status === 200) setOpen(true);
    // console.log(result.status)
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Get data
  React.useEffect(() => {
    (async function () {
      try {
        const { data: product } = await ProductApi.getAll({});
        await setData(product.docs);
        console.log(data.slice(4));
      } catch (err) {
        console.log('connect failed');
      }
    })();
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <React.Fragment>
      <MainCard title="Category" secondary={<SecondaryAction link="https://tablericons.com/" />}>
        <EnhancedTableToolbar numSelected={selected} onRemove={handleDeleteRow} link="product/add" />

        {data.length > 0 ? (
          <React.Fragment>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={data.length}
                  headCells={headCells}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort(getComparator(order, orderBy))
                    .map((row, index) => {
                      const isItemSelected = isSelected(row._id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row._id} selected={isItemSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              onClick={(event) => handleClick(event, row._id)}
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId
                              }}
                            />
                          </TableCell>
                          <TableCell
                            onClick={(event) => handleClick(event, row._id)}
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            sx={{ cursor: 'pointer' }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="left">{row.price}</TableCell>
                          <TableCell align="left">{row.category_id.name}</TableCell>
                          <TableCell align="left">{row.quantity}</TableCell>
                          <TableCell align="left">{row.sold}</TableCell>
                          <TableCell align="left">
                            <Tooltip label="edit" title="edit">
                              <IconButton>
                                <Link to={`/admin/product/edit/${row.slug}`}>
                                  <EditIcon color="primary" />
                                </Link>
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'all', value: -1 }]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </React.Fragment>
        ) : (
          <Typography variant="h4" align="center">
            No data
          </Typography>
        )}
        {data && <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />}
        <Snackbar
          open={open}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClose={() => {
            setOpen(false);
          }}
          autoHideDuration={6000}
          // onClose={handleClose}
          message="Upload anh thanh cong"
          // action={action}
        >
          <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
            Remove successfully
          </Alert>
        </Snackbar>
      </MainCard>
    </React.Fragment>
  );
};

export default Index;
