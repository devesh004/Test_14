import React, { useState } from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import SmallSpinners from "../../components/UI/SmallSpinners";
import axios from "axios";

const PredectorScreen = () => {
  const [nits, setNits] = useState([]);
  const [iits, setIits] = useState([]);
  const [mainsRank, setMainsRank] = useState("");
  const [advRank, setAdvRank] = useState("");
  const [category, setCategory] = useState("OPEN");
  const [quota, setQuota] = useState("OS");
  const [gender, setGender] = useState("Gender-Neutral");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!mainsRank && !advRank) return;
    if (mainsRank === "" || mainsRank <= 0) setNits([]);
    if (advRank === "" || advRank <= 0) setIits([]);
    setLoading(true);
    const { data } = await axios.get("./data2018.json");
    let temp;
    if (mainsRank !== "" && mainsRank > 0) {
      temp = data.filter(
        (el) =>
          el["Closing Rank"] >= mainsRank &&
          (el.type === "NIT" || el.type === "IIIT" || el.type === "GFTI") &&
          el["Gender"] === gender &&
          el["Seat Type"] === category &&
          el["Quota"] === quota
      );
      setNits(temp);
    }
    if (advRank !== "" && advRank > 0) {
      temp = data.filter(
        (el) =>
          el["Closing Rank"] >= advRank &&
          el.type === "IIT" &&
          el["Gender"] === gender &&
          el["Seat Type"] === category
      );

      setIits(temp);
    }

    setLoading(false);
  };

  return (
    <>
      <div>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId='mains'>
            <Row className='justify-content-center align-items-center mb-3'>
              <Col xs={5} md={3} className='text-center'>
                <Form.Label>JEE Mains Rank</Form.Label>
              </Col>
              <Col xs={7} md={5}>
                <Form.Control
                  value={mainsRank}
                  onChange={(e) => setMainsRank(e.target.value)}
                  type='Number'
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='advance'>
            <Row className='justify-content-center align-items-center mb-3'>
              <Col xs={5} md={3} className='text-center'>
                <Form.Label>JEE Advance Rank</Form.Label>
              </Col>
              <Col xs={7} md={5}>
                <Form.Control
                  value={advRank}
                  onChange={(e) => setAdvRank(e.target.value)}
                  type='Number'
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='category'>
            <Row className='justify-content-center align-items-center mb-3'>
              <Col xs={5} md={3} className='text-center'>
                <Form.Label>Category</Form.Label>
              </Col>
              <Col xs={7} md={5}>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label='Category select'
                >
                  <option value='OPEN'>OPEN</option>
                  <option value='OBC-NCL'>OBC-NCL</option>
                  <option value='SC'>SC</option>
                  <option value='ST'>ST</option>
                  <option value='OPEN (PwD)'>OPEN (PwD)</option>
                  <option value='OBC-NCL (PwD'>OBC-NCL (PwD)</option>
                  <option value='SC (PwD'>SC (PwD)</option>
                  <option value='ST (PwD'>ST (PwD)</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
          <Row className='justify-content-center'>
            <Col md={6}>
              <Form.Group controlId='gender'>
                <Row className='justify-content-center align-items-center mb-3'>
                  <Col xs={5} md={3} className='text-center'>
                    <Form.Label>Gender</Form.Label>
                  </Col>
                  <Col xs={7} md={5}>
                    <Form.Select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      aria-label='gender select'
                    >
                      <option value='Gender-Neutral'>Gender-Neutral</option>
                      <option value='Female-only (including Supernumerary)'>
                        Female-only
                      </option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId='category'>
                <Row className='justify-content-center align-items-center'>
                  <Col xs={5} md={3} className='text-center'>
                    <Form.Label>Quota</Form.Label>
                  </Col>
                  <Col xs={7} md={5}>
                    <Form.Select
                      value={quota}
                      onChange={(e) => setQuota(e.target.value)}
                      aria-label='quota select'
                    >
                      <option value='OS'>OS</option>
                      <option value='HS'>HS</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row className='justify-content-center align-items-center mt-3'>
            <Col md={5} className='d-flex justify-content-center'>
              <Button type='submit' variant='success'>
                Fetch
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      {loading && <SmallSpinners />}
      {iits.length > 0 && (
        <>
          <h4>IITs</h4>
          <Table>
            <thead>
              <tr>
                <th>Institue</th>
                <th>Branch</th>

                <th>Opening Rank</th>
                <th>Closing Rank</th>
              </tr>
            </thead>
            <tbody>
              {iits.map((el, idx) => (
                <tr key={idx}>
                  <td>{el["Institute"]}</td>
                  <td>{el["Academic Program Name"]}</td>
                  <td>{el["Opening Rank"]}</td>
                  <td>{el["Closing Rank"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {nits.length > 0 && (
        <>
          <h4>NITs, IIITs, GFTIs</h4>
          <Table>
            <thead>
              <tr>
                <th>Institue</th>
                <th>Branch</th>
                <th>Opening Rank</th>
                <th>Closing Rank</th>
              </tr>
            </thead>
            <tbody>
              {nits.map((el, idx) => (
                <tr key={idx}>
                  <td>{el["Institute"]}</td>
                  <td>{el["Academic Program Name"]}</td>
                  <td>{el["Opening Rank"]}</td>
                  <td>{el["Closing Rank"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default PredectorScreen;
