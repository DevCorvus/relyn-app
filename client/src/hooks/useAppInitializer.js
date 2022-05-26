import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_API_URL } from '../config.json';

export default function useAppInitializer() {
  const [serverStatus, setServerStatus] = useState('loading');

  useEffect(() => {
    (async () => {
      try {
        await axios.get(`${SERVER_API_URL}`);
        setServerStatus('on');
      } catch (e) {
        setServerStatus('off');
      }
    })();
  }, []);

  return serverStatus;
}
