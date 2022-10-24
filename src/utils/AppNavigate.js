import {useNavigate} from 'react-router-dom';

let navigate;

export function NavigateProvider({children}) {
  navigate = useNavigate();
  return children;
}

export const appNavigate = () => {
  return {navigate};
};
