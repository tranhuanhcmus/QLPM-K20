import PatternTable from "../../components/dashboard/PatternTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";

const Pattern = () => {
  const listPatternDesisn =[
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
        <PatternTable />
      </Col>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-2*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
      
          </CardTitle>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên mẫu</th>
                  <th>Example 1</th>
                  <th>Example 2</th>
                </tr>
              </thead>
              <tbody>
              {
                listPatternDesisn && listPatternDesisn.map((item, index)=>{
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

export default Pattern;
