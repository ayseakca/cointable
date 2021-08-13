import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./style/style.css";
import History from "./service/HistoryService";
import routes from "./routes";

export default () => (
  <Router History={History} basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={(props) => {
              return (
                <route.layout {...props}>
                  <route.component {...props} />
                </route.layout>
              );
            }}
          />
        );
      })}
    </div>
  </Router>
);
