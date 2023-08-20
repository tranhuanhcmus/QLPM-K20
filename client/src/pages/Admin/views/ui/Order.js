import OrderTable from "../../components/dashboard/OrderTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";

const Order = () => {
  const listOrder =[
    {
      name:"Name 1 ",
      example1:"1",
      example2:"1"
    },
    {
      name:"Name 2 ",
      example1:"2",
      example2:"2"
    },
    {
      name:"Name 3 ",
      example1:"3",
      example2:"3"
    },
    {
      name:"Name 4 ",
      example1:"4",
      example2:"4"
    }
  ]
  return (
    <Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <OrderTable />
      </Col>

      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
          
          </CardTitle>
          <CardBody className="">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {
                  listOrder && listOrder.map((item, index)=>{
                      return (
                        <tr>
                          <th scope="row">{index}</th>
                          <td>{item.name}</td>
                          <td>{item.example1}</td>
                          <td>@{item.example2}</td>
                        </tr>
                      )
                  })
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Order;
