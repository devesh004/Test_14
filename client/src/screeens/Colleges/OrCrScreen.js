import React, { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import axios from "axios";
import SmallSpinners from "../../components/UI/SmallSpinners";

const OrCrScreen = () => {
  const [year, setYear] = useState("2020");
  const [itype, setItype] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [finalRes, setFinalRes] = useState([]);
  const [loading, setLoading] = useState(false);

  const typeChangeHandler = async (e) => {
    setItype(e.target.value);
    setName("");
    const { data } = await axios.get(`./data${year}.json`);
    const set = new Set();
    let type = e.target.value;
    for (let d of data) {
      if (d.type === type) {
        set.add(d.Institute);
      } else if (type === "ALL") {
        set.add(d.Institute);
      }
    }
    setColleges(["ALL", ...Array.from(set)]);
  };

  const nameChangeHandler = async (e) => {
    setName(e.target.value);
    setBranch("");
    let clgName = e.target.value;
    const set = new Set();
    const { data } = await axios.get(`./data${year}.json`);
    for (let d of data) {
      if (clgName === "ALL" || d.Institute === clgName) {
        set.add(d["Academic Program Name"]);
      }
    }
    setBranches(["ALL", ...Array.from(set)]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!itype || !name || !branch) {
      return;
    }
    setLoading(true);
    let { data } = await axios.get(`./data${year}.json`);
    if (itype !== "ALL") data = data.filter((el) => el.type === itype);
    if (name !== "ALL") data = data.filter((el) => el.Institute === name);
    if (branch !== "ALL")
      data = data.filter((el) => el["Academic Program Name"] === branch);
    setFinalRes(data);
    setLoading(false);
    // console.log(data);
  };

  return (
    <div>
      <Row className='justify-content-center'>
        <Col md={7}>
          <Form onSubmit={submitHandler} className='mb-5'>
            <Form.Group controlId='year' className='mb-3'>
              <Row>
                <Col md={3}>
                  <Form.Label>Year</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    aria-label='quota select'
                  >
                    <option value='2017'>2017</option>
                    <option value='2018'>2018</option>
                    <option value='2019'>2019</option>
                    <option value='2020'>2020</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId='itype' className='mb-3'>
              <Row>
                <Col md={3}>
                  <Form.Label>Institute Type</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Select
                    value={itype}
                    onChange={typeChangeHandler}
                    aria-label='quota select'
                  >
                    <option>Select</option>
                    <option value='ALL'>ALL</option>
                    <option value='IIT'>IIT</option>
                    <option value='NIT'>NIT</option>
                    <option value='GFTI'>GFTI</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId='institute' className='mb-3'>
              <Row>
                <Col md={3}>
                  <Form.Label>Institute Name</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Select
                    disabled={!itype}
                    value={name}
                    onChange={nameChangeHandler}
                    aria-label='quota select'
                  >
                    <option>Select</option>
                    {colleges.map((clg, idx) => (
                      <option key={idx} value={clg}>
                        {clg}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId='branch' className='mb-3'>
              <Row>
                <Col md={3}>
                  <Form.Label>Academic Program</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Select
                    disabled={!name || !itype}
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    aria-label='quota select'
                  >
                    <option>Select</option>
                    {branches.map((branch, idx) => (
                      <option key={idx} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Button type='submit' variant='success'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      {loading && <SmallSpinners />}
      {finalRes.length > 0 && (
        <>
          <h4>Results</h4>
          <Table responsive size='sm' bordered striped>
            <thead>
              <tr>
                <th>Institue</th>
                <th>Branch</th>
                <th>Seat Type</th>
                <th>Quota</th>
                <th>Gender</th>
                <th>Opening Rank</th>
                <th>Closing Rank</th>
              </tr>
            </thead>
            <tbody>
              {finalRes.map((el, idx) => (
                <tr key={idx}>
                  <td>{el["Institute"]}</td>
                  <td>{el["Academic Program Name"]}</td>
                  <td>{el["Seat Type"]}</td>
                  <td>{el["Quota"]}</td>
                  <td>{el["Gender"]}</td>
                  <td>{el["Opening Rank"]}</td>
                  <td>{el["Closing Rank"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default OrCrScreen;
