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
import { sendEmail } from "../../redux/actions/auth";
import Meta from "../../components/UI/Meta";

const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ForgotPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, mailing, mailerror, success } = useSelector(
    (state) => state.auth
  );

  // naviagte if registered
  useEffect(() => {
    if (user) {
      navigate(`/${redirect}`);
    }
  }, [redirect, user, navigate]);

  // form handling
  const [email, setEmail] = useState("");

  const [touched, setTouched] = useState(false);
  const emailInvalid = touched && !mailReg.test(email);

  const changeHandler = (e) => {
    setEmail(e.target.value);
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!mailReg.test(email)) {
      return;
    } else {
      setTouched(false);
      dispatch(sendEmail(email));
    }
  };

  return (
    <>
      <Meta title='Reset password' />
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <div className='display-6 mt-5'>Reset Password</div>

          <Form onSubmit={formSubmissionHandler} className='py-3'>
            {success && (
              <Alert variant='success' className='py-2'>
                {success}
              </Alert>
            )}
            {mailerror && (
              <Alert variant='danger' className='py-2'>
                {mailerror}
              </Alert>
            )}
            {mailing && (
              <div>
                <Spinner size='sm' animation='grow' variant='primary' />
                <Spinner
                  size='sm'
                  className='mx-1'
                  animation='grow'
                  variant='warning'
                />
                <Spinner size='sm' animation='grow' variant='success' />
                <span className='mx-1 text-warning'>Sending...</span>
              </div>
            )}
            <FloatingLabel
              controlId='email'
              label='Email address'
              className='mb-2'
            >
              <Form.Control
                value={email}
                onChange={changeHandler}
                name='email'
                type='email'
                placeholder='Enter email'
              />
              {emailInvalid && (
                <Form.Text className='error-text'>
                  Please enter a valid email
                </Form.Text>
              )}
            </FloatingLabel>

            <Button
              disabled={mailing}
              className='btn-s'
              variant='success'
              type='submit'
              style={{ width: "175px" }}
            >
              Send reset link
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
