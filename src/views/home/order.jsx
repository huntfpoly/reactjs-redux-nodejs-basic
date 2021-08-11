import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import OrderApi from '@/apis/OrderApi';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import numberFormatPrice from '@/utils/numberFormatPrice';

export default function Order() {
  const [order, setOrder] = React.useState([]);
  const { user } = useSelector((state) => state.user);

  React.useEffect(() => {
    Object.entries(user).length > 0 &&
      (async function () {
        const { data } = await OrderApi.getByUserId(user._id);
        setOrder(data);
        console.log(data);
      })();
  }, [user]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order #</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Order total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.length > 0 &&
            order.map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell>{Date(row.createdAt)}</TableCell>
                <TableCell>{numberFormatPrice(row.data.reduce((a, c) => a + c.total, 0))}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button>View</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
