import ManageUserTable from "../../components/dashboard/ManageUserTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";

const ManageUser = () => {
  return (
    <Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <ManageUserTable />
      </Col>

    </Row>
  );
};

export default ManageUser;
