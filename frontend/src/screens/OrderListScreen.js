import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  ORDER_DETAILS_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const allOrders = useSelector((state) => state.allOrders)
  const { loading: loadingOrders, error: errorOrders, orders } = allOrders

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch({ type: ORDER_DETAILS_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getAllOrders())
    }
    return () => {
      //
    }
  }, [history, userInfo, dispatch])
  return (
    <Row>
      <Col>
        <h2>My orders</h2>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : orders.length === 0 ? (
          <Message>You do not have any orders yet!!!</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default OrderListScreen
