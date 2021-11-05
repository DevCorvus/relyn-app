import { useState, useEffect, useRef } from "react";
import {
  autoSetAuth,
  refreshTokenExists,
  refreshToken,
  csrfToken,
} from "../APIs/authAPI";
import userAPI from "../APIs/userAPI";

const useAuthSystem = () => {
  autoSetAuth();
  const accessTokenExpirationMinusOneSecond = 899000;
  const [authIterator, setAuthIterator] = useState(false);
  const authInterval = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        await csrfToken();
      } catch(e) {
        // ...
      }
    })();
    authInterval.current = setInterval(() => {
      setAuthIterator(prevState => !prevState);
    }, accessTokenExpirationMinusOneSecond);
  }, []);

  useEffect(() => {
    if (refreshTokenExists()) {
      (async () => {
        try {
          await refreshToken();
          await userAPI.account();
        } catch(e) {
          clearInterval(authInterval.current);
        }
      })();
    } else {
      clearInterval(authInterval.current);
    }
  }, [authIterator]);
};

export default useAuthSystem;