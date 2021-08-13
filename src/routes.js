import React from "react";
import { Redirect } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import TableView from "./views/TableView";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/coin" />,
  },
  {
    path: "/coin",
    exact: true,
    layout: DefaultLayout,
    component: TableView,
  },
];
