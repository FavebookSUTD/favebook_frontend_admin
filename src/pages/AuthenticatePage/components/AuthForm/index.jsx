/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-this-in-sfc */
// import React
import React from 'react';
import PropTypes from 'prop-types';

// import lodash
import isEqual from 'lodash/isEqual';

// import local styling
import './index.scss';

// import Antd
import { Form, Input, Icon, Button } from 'antd';

const AuthForm = ({ form, loading, submitHandler }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const { validateFields } = form;

    validateFields((error, values) => {
      if (!error) {
        submitHandler(values);
      }
    });
  };

  const onEnterKeyDownHandler = event => {
    if (isEqual(event.keyCode, 13)) {
      handleSubmit(event);
    }
  };

  const { getFieldDecorator } = form;

  return (
    <div className="auth-form__container" role="form" onKeyDown={onEnterKeyDownHandler}>
      <Form className="form__container" hideRequiredMark>
        <Form.Item label="NAME">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
              },
            ],
          })(<Input className="form-input" prefix={<Icon className="form-icon" type="user" />} />)}
        </Form.Item>

        <Form.Item label="PASSWORD">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input
              className="form-input password-input"
              prefix={<Icon className="form-icon" type="lock" theme="filled" />}
              type="password"
            />,
          )}
        </Form.Item>
      </Form>

      <Button
        className="form-submit-btn"
        block
        type="primary"
        shape="round"
        loading={loading}
        onClick={handleSubmit}
      >
        SIGN IN
      </Button>
    </div>
  );
};

AuthForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default AuthForm;
