import {SSO_PREFIX} from 'shared/constants/SSOMessages';

const encrypt = (obj) => {
  const json = JSON.stringify(obj);
  const encode = btoa(unescape(encodeURIComponent(json)));
  const withPrefix = `${SSO_PREFIX}${encode}`;
  return withPrefix;
};

const decrypt = (data) => {
  try {
    const withoutPrefix = data.replace(SSO_PREFIX, '');
    const raw = decodeURIComponent(escape(atob(withoutPrefix)));
    return JSON.parse(raw);
  } catch (e) {
    console.error('error decrypt', data);
  }
};

export {encrypt, decrypt};
