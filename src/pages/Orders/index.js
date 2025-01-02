import { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import Header from "../../components/Header";
import { toast } from "sonner";
import { getOrders, updateOrder, deleteOrder } from "../../utils/api_orders";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  const handleStatusUpdate = async (_id, status) => {
    const updatedOrder = await updateOrder(_id, status);
    if (updatedOrder) {
      // fetch the updated orders from API
      const updatedOrders = await getOrders();
      setOrders(updatedOrders);
      toast.success("Order status has been updated");
    }
  };

  const handleOrderDelete = async (_id) => {
    const response = await deleteOrder(_id);
    if (response && response.status === "success") {
      // fetch the updated orders from API
      const updatedOrders = await getOrders();
      setOrders(updatedOrders);
      toast.success("Order has been deleted");
    }
  };

  return (
    <Container>
      <Header title="My Orders" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Info</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <strong>{order.customerName}</strong>
                    <br />
                    <small>{order.customerEmail}</small>
                  </TableCell>
                  <TableCell>
                    {order.products.map((product) => (
                      <div key={product._id}>{product.name}</div>
                    ))}
                  </TableCell>
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      {order.status === "pending" ? (
                        <Select value={order.status} disabled={true}>
                          <MenuItem value="pending">Pending</MenuItem>
                        </Select>
                      ) : (
                        <Select
                          value={order.status}
                          onChange={(event) => {
                            handleStatusUpdate(order._id, event.target.value);
                          }}
                        >
                          <MenuItem value="paid">Paid</MenuItem>
                          <MenuItem value="failed">Failed</MenuItem>
                          <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                      )}
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    {order.paid_at ? order.paid_at : "Not Paid"}
                  </TableCell>
                  <TableCell>
                    {order.status === "pending" ? (
                      <Button
                        variant="contained"
                        color="error"
                        disabled={order.status !== "pending"}
                        onClick={() => {
                          handleOrderDelete(order._id);
                        }}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Orders;
