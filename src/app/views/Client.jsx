import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
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
  Table,
} from "reactstrap";
import { getListClient } from "../service/frontendService";

const Client = () => {
  const handleRefresh = () => {};
  const [tableData, setTableData] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    getList();
  }, []);

  const handleClickDesable = (id) => {};
  const handleFilter = (text) => {
    console.log(text, "dddddddddddddddddddddddd");
    setInputText(text);
    if (text) {
    }
    setTableData(tableDataCopy);
  };

  const getList = () => {
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = getListClient(id);
      setTableData(res.Data);
      setTableDataCopy(res.Data);
    } catch (error) {}
  };

  useEffect(() => {}, [tableData]);

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
              <Col md={12} className="d-flex justify-content-between mt-4">
                <FormGroup md={6}>
                  <Button color="info" type="button" onClick={handleRefresh}>
                    <i class="fa fa-refresh" aria-hidden="true"></i> Actualiser
                  </Button>
                </FormGroup>
                <FormGroup md={6}>
                  <Button color="info" type="button" onClick={handleRefresh}>
                    <i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter
                    un client
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
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.length > 0 ? (
                        tableData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.adress}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                onClick={() => handleClickDesable(row.id)}
                              >
                                <i class="fa fa-pencil" aria-hidden="true"></i>
                                Modifier
                              </Button>
                            </TableCell>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Client;
