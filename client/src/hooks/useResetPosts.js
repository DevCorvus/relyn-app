import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { resetPosts } from '../redux/postSlice';

const useResetPosts = () => {
  const dispatch = useDispatch();
  const willMount = useRef(true);

  if (willMount.current) dispatch(resetPosts());

  willMount.current = false;
};

export default useResetPosts;
