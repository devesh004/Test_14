import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Spinner,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/actions/auth";
import Meta from "../../components/UI/Meta";

const passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  // naviagte if registered
  useEffect(() => {
    if (user) {
      navigate(`/${redirect}`);
    }
  }, [redirect, user, navigate]);

  // form handling
  const [formData, setFormData] = useState({
    password: "",
    confPass: "",
  });

  const [touched, setTouched] = useState(false);

  const { password, confPass } = formData;
  const passInvalid = touched && !passReg.test(password);
  const passNotMatch = touched && confPass !== password;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!passReg.test(password) || confPass !== password) {
      return;
    } else {
      setTouched(false);
      console.log(password);
      dispatch(resetPassword(password));
      //   dispatch(registerUser(password));
    }
  };

  return (
    <>
      <Meta title='Reset password' />
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <div className='display-6 mt-5'>Set New Password</div>

          <Form onSubmit={formSubmissionHandler} className='pt-3 pb-1'>
            {error && <Alert variant='danger'>{error}</Alert>}
            {loading && (
              <div>
                <Spinner size='sm' animation='grow' variant='primary' />
                <Spinner
                  size='sm'
                  className='mx-1'
                  animation='grow'
                  variant='warning'
                />
                <Spinner size='sm' animation='grow' variant='success' />
                <span className='mx-1 text-warning'>Logging you in...</span>
              </div>
            )}
            <FloatingLabel
              controlId='password'
              label='New Password'
              className='mb-2'
            >
              <Form.Control
                value={password}
                onChange={changeHandler}
                name='password'
                type='password'
                placeholder='Password'
              />
              <Form.Text className={passInvalid && "error-text"}>
                Password should be 7 to 15 characters which contain at least one
                numeric digit and a special character
              </Form.Text>
            </FloatingLabel>

            <FloatingLabel
              className='mb-2'
              controlId='confPass'
              label='Confirm New Password'
            >
              <Form.Control
                name='confPass'
                value={confPass}
                onChange={changeHandler}
                type='password'
                placeholder='Enter your password again'
              />
              {passNotMatch && (
                <Form.Text className='error-text'>
                  Password do not match
                </Form.Text>
              )}
            </FloatingLabel>

            <Button
              disabled={loading}
              className='btn-s'
              variant='success'
              type='submit'
              style={{ width: "175px" }}
            >
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ResetPassword;
