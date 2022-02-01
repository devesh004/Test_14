import React, { useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  FloatingLabel,
} from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useInput from "../../hooks/use-input";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/auth";
import Meta from "../../components/UI/Meta";
import SmallSpinners from "../../components/UI/SmallSpinners";

const LoginScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  //   console.log(redirect);
  const {
    value: enteredEmail,
    isValueValid: isEmailValid,
    hasError: isEmailInvalid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((val) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
  );

  const {
    value: enteredPassword,
    isValueValid: isPasswordValid,
    hasError: isPasswordInvalid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((val) => val.trim().length > 0);

  const isFormValid = isPasswordValid && isEmailValid ? true : false;

  useEffect(() => {
    if (user) {
      navigate(`/${redirect}`);
    }
  }, [redirect, user, navigate]);

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (!isFormValid) return;
    console.log("hahaah");

    dispatch(loginUser(enteredEmail, enteredPassword));
  };

  return (
    <>
      <Meta title='Login' />
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <div className='display-6 mt-5'>Sign in</div>

          <Form onSubmit={formSubmissionHandler} className='pt-3 pb-1'>
            {error && (
              <Alert variant='danger' className='py-2'>
                {error}
              </Alert>
            )}
            {loading && <SmallSpinners text='Logging you in' />}

            <FloatingLabel
              className='mb-2'
              controlId='email'
              label='Email address'
            >
              <Form.Control
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                type='email'
                placeholder='Enter email'
              />
              {isEmailInvalid && (
                <Form.Text className='error-text'>
                  Please enter a valid email
                </Form.Text>
              )}
            </FloatingLabel>

            <FloatingLabel
              controlId='password'
              className='mb-2'
              label='Password'
            >
              <Form.Control
                value={enteredPassword}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                type='password'
                placeholder='Password'
              />
              {isPasswordInvalid && (
                <Form.Text className='error-text'>
                  Password cannot be empty
                </Form.Text>
              )}
            </FloatingLabel>
            <Button
              disabled={!isFormValid}
              className='btn-s'
              style={{ width: "175px" }}
              variant='success'
              type='submit'
            >
              Login
            </Button>
          </Form>
          <Row>
            <Col sm={12}>
              New User ?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Create new account <i className='fas fa-location-arrow'></i>
              </Link>
            </Col>
            <Col>
              <Link to='/forgotpassword'>Forgot password?</Link>
            </Col>
          </Row>
        </Col>
      </Row>{" "}
    </>
  );
};

export default LoginScreen;
