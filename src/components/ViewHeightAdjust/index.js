import useWindowSize from 'hooks/useWindowSize';
import debounce from 'lodash/debounce';
import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setViewHeight} from 'redux/actions/View';

export const ViewHeightAdjust = ({children}) => {
  const size = useWindowSize();
  const dispatch = useDispatch();

  const calculate = useCallback(
    debounce(() => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      dispatch(setViewHeight(vh));
    }, 200),
    [],
  );

  useEffect(() => {
    calculate();
  }, [size]);

  return children;
};
