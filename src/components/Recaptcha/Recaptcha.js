import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';

const Recaptcha = React.forwardRef(({onChange, theme, ...rest}, ref) => {
  const handleChange = (data) => {
    if (onChange) onChange(data);
  };

  return (
    <ReCAPTCHA
      ref={ref}
      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
      onChange={handleChange}
      theme={theme}
      id='captcha'
      size='invisible'
      style={{display: 'none'}}
      {...rest}
    />
  );
});

export default Recaptcha;

Recaptcha.propTypes = {
  onChange: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark']),
};
