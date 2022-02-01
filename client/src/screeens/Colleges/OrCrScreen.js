import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const OrCrScreen = () => {
  const [year, setYear] = useState("2020");
  const [itype, setItype] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const typeChangeHandler = async (e) => {
    setItype(e.target.value);
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
    const { data } = await axios.get(`./data${year}.json`);
    console.log(data);
  };
  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            aria-label="quota select"
          >
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="itype">
          <Form.Label>Institute Type</Form.Label>
          <Form.Select
            value={itype}
            onChange={typeChangeHandler}
            aria-label="quota select"
          >
            <option>Select</option>
            <option value="ALL">ALL</option>
            <option value="IIT">IIT</option>
            <option value="NIT">NIT</option>
            <option value="GFTI">GFTI</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="institute">
          <Form.Label>Institute Name</Form.Label>
          <Form.Select
            disabled={!itype}
            value={name}
            onChange={nameChangeHandler}
            aria-label="quota select"
          >
            <option>Select</option>
            {colleges.map((clg, idx) => (
              <option key={idx} value={clg}>
                {clg}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="branch">
          <Form.Label>Academic Program</Form.Label>
          <Form.Select
            disabled={!name || !itype}
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            aria-label="quota select"
          >
            <option>Select</option>
            {branches.map((branch, idx) => (
              <option key={idx} value={branch}>
                {branch}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="success">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default OrCrScreen;
