import { Redirect, Route } from "react-router-dom";

interface privateRouter {
    role: string;
    security: string[];
    children: any;
    exact: boolean;
    path: string;
  }
 export const PrivateRouter: React.FC<privateRouter> = ({
    role,
    security,
    children,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          security.includes(role) ? (
            children
          ) : (
            <Redirect
              to={{ pathname: "/dashboard", state: { from: location } }}
            />
          )
        }
      />
    );
  };
  