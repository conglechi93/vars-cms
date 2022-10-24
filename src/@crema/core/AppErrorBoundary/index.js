import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from './ErrorIcon';
import './index.style.less';
import IntlMessages from '@crema/utility/IntlMessages';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    console.log('error: ', error);
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log('errorInfo: ', errorInfo);
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-boundary'>
          <ErrorIcon />
          <div style={{fontSize: 30, marginTop: 4}}>
            <IntlMessages id='error.label' />
          </div>
          <div style={{fontSize: 18, textAlign: 'center'}}>
            <IntlMessages id='error.message.somethingWentWrong' />
          </div>
          <div style={{fontSize: 18, textAlign: 'center'}}>
            <IntlMessages id='error.message.retry' />
          </div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

AppErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppErrorBoundary;
