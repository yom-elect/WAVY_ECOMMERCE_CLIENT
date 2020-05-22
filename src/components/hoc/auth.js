import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { authorizeUser } from "../../state/actions/userAction";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function (ComposedClass, reload, adminRoute = null) {
  const AuthenticationCheck = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    const update = (user) => {
      setUser(user);
      setLoading(false);
    };
    const tryAuthorizeUser = useCallback(async () => {
      dispatch(authorizeUser()).then((response) => {
        let user = response.payload;
        if (!user.isAuth) {
          if (reload) {
            props.history.push("/authorization");
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            props.history.push("/user/dashboard");
          } else {
            if (reload === false) {
              props.history.push("/user/dashboard");
            }
          }
        }
        update(user);
      });
    }, [dispatch, props.history]);

    useEffect(() => {
      let isMounted = true;
      if (isMounted) {
        tryAuthorizeUser();
      }
      return () => {
        isMounted = false;
      };
    }, [tryAuthorizeUser]);

    if (loading) {
      return (
        <div className="main_loader">
          <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
        </div>
      );
    } else {
      return <ComposedClass {...props} user={user} />;
    }
  };
  return AuthenticationCheck;
}
