import React, { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";
import ApiService from "../service/ApiService";
import { Spinner } from "react-bootstrap";

const listItems = [];
const listItemsKeys = ["BNB", "BTC", "ETH", "XRP", "BCH", "LTC"];
const filterListItems = (item) => {
  if (listItemsKeys.filter((e) => e === item.symbol)) {
    const symbol = item.symbol;
    const container = new Map();
    const USD = item.quote.USD;
    ApiService.get("/cryptocurrency/info", { symbol })
      .then(({ data }) => {
        const obj = data.data;
        container.set("1", [
          obj[Object.keys(obj)[0]].logo,
          item.symbol,
          item.name,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
    container.set("2", USD.price);
    container.set("3", USD.percent_change_24h);
    container.set("4", [
      ["0", USD.percent_change_1h],
      ["1", USD.percent_change_24],
      ["7", USD.percent_change_7d],
      ["30", USD.percent_change_30d],
      ["60", USD.percent_change_60d],
      ["90", USD.percent_change_90d],
    ]);
    listItems.push(container);
  }
};

function TableView(props) {
  const [list, setList] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      ApiService.get("/cryptocurrency/listings/latest")
        .then((res) => {
          res.data.data.filter(filterListItems);
        })
        .catch((error) => {
          console.error(error);
          setLoading(true);
        });
    }, 5000);
    return () => clearInterval(intervalId);
    setList(listItems);
  });
  return loading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <> {list && <TableComponent items={list} />}</>
  );
}

export default TableView;
