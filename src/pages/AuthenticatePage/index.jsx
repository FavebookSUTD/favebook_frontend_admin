// import React
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// import reducer and saga
import reducer from './reducers';
import saga from './saga';
import injectReducer from '@utils/core/injectReducer';
import injectSaga from '@utils/core/injectSaga';

// import actions
import { signInFromAPI } from './actions';

// import selector
import { selectLoading, selectError } from './selectors';

// import local components
import AuthForm from './components/AuthForm';

// import local styling
import './index.scss';

// import Antd
import { Typography, Form } from 'antd';

// Extract antd components
const { Title, Paragraph, Text } = Typography;

class AuthenticatePage extends PureComponent {
  componentDidUpdate(prevProps) {
    const { error, form } = this.props;
    if (error && prevProps.loading) {
      form.resetFields();
    }
  }

  handleSubmit = values => {
    const { signInFromAPI } = this.props;

    signInFromAPI(values.username, values.password);
  };

  render() {
    const { form, loading } = this.props;

    return (
      <div className="authenticate-page__main-container">
        <div className="authenticate-page__content">
          <div className="app-name__container">
            <Title className="app-name">Favebook</Title>
          </div>
          <div className="authenticate-page__form-container">
            <AuthForm form={form} loading={loading} submitHandler={this.handleSubmit} />
          </div>
          <div className="motivation-slogan__container">
            <Paragraph className="motivation-slogan">
              “With great power comes great responsibility.”
            </Paragraph>
            <Text className="author">– Uncle Ben</Text>
          </div>
        </div>
      </div>
    );
  }
}

AuthenticatePage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  signInFromAPI: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  error: selectError,
});

const mapDispatchToProps = {
  signInFromAPI,
};

const withReducer = injectReducer({ key: 'AuthenticatePage', reducer });
const withSaga = injectSaga({ key: 'AuthenticatePage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const AuthenticatePageFromWrapper = Form.create()(AuthenticatePage);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AuthenticatePageFromWrapper);
