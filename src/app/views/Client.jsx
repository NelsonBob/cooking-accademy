import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Table
} from "reactstrap";
import { getListClient } from "../service/frontendService";

const Client = () => {
  const [tableData, setTableData] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);
  const [inputText, setInputText] = useState("");
  const [exampleModal, setExampleModal] = useState(false);
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {}, [tableData]);

  useEffect(() => {}, [exampleModal]);

  const handleFilter = (text) => {
    setInputText(text);
    if (text) {
      const filteredData = tableDataCopy.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(text.toLowerCase());
          }
          return false;
        });
      });
      setTableData(filteredData);
    } else {
      setTableData(tableDataCopy);
    }
  };

  const getList = async () => {
    setTableData([]);
    setTableDataCopy([]);
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await getListClient(id);
      if (res) {
        setTableData(res);
        setTableDataCopy(res);
      }
      setInputText("");
    } catch (error) {}
  };
  const handleChangePage = (event, newpage) => {
    setpg(newpage);
  };
  const toggleModal = () => {
    setExampleModal(!exampleModal);
  };
  const handleChangeRowsPerPage = (event) => {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col md={12}>
                <h5 className="text-uppercase text-white mb-0">
                  Liste des clients
                </h5>
              </Col>
              <Col md={12} className="d-flex justify-content-between mt-5">
                <FormGroup md={6}>
                  <Button color="info" type="button" onClick={getList}>
                    <i className="fa fa-refresh" aria-hidden="true"></i> Actualiser
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <Col md={12}>
            <Card className="bg-gradient-default shadow">
              <CardBody>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Search"
                        type="inputText"
                        onChange={(e) => handleFilter(e.target.value)}
                        value={inputText}
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Address</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData && tableData.length > 0 ? (
                        tableData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.adress}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            Aucun client trouvé
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={tableData.length}
                  rowsPerPage={rpg}
                  page={pg}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Client;
