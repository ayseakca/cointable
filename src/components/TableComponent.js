import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { Spinner } from "react-bootstrap";
import { Table } from "antd";

const FirstRow = (props) => {
  return (
    <div className={"firstRowDiv"}>
      <img src={props.text[0]} alt="Logo" className={"logo"} />
      <span className={"symbol"}>{props.text[1]} </span>
      <span className={"name"}> {props.text[2]}</span>
    </div>
  );
};
const PriceRow = (props) => {
  const price = props.text.toFixed(3);
  return <p className={"text"}>${price}</p>;
};

const ChangeRow = (props) => {
  const price = props.text.toFixed(3);
  let color;
  {
    price < 0 ? (color = "red") : (color = "green");
  }
  return (
    <p className={"text"} style={{ color }}>
      {price}%
    </p>
  );
};

const MarketRow = (props) => {
  const data = [];
  data.push(["time", "priceChange"]);
  props.text.map((e) => {
    data.push(e);
  });
  return (
    <>
      <Chart
        width={"120px"}
        height={"50px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          colors: ["orange"],
        }}
      />
    </>
  );
};

function TableComponent(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataCon = [];
    props.items.map((e, i) => {
      let row = {};
      row = {
        key: i,
        name: e.get("1"),
        lastPrice: e.get("2"),
        dayChange: e.get("3"),
        markets: e.get("4"),
      };
      dataCon.push(row);
    });
    setData(dataCon);
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <FirstRow text={text} />,
    },
    {
      title: "Last Price",
      dataIndex: "lastPrice",
      key: "lastPrice",
      render: (text) => <PriceRow text={text} />,
    },
    {
      title: "24h Change",
      dataIndex: "dayChange",
      key: "dayChange",
      render: (text) => <ChangeRow text={text} />,
    },
    {
      title: "Markets",
      key: "markets",
      dataIndex: "markets",
      render: (text) => <MarketRow text={text} />,
    },
  ];
  return data ? (
    <Table columns={columns} dataSource={data} />
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default TableComponent;
