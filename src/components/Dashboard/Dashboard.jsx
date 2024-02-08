import React, { useEffect, useRef, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Highcharts from "highcharts";
import http from "../../services/utility";
import { apisPath } from "../../utils/path";

export default function Dashboard() {
  const [profit, loss] = ["profit", "loss"];
  const highchartRef = useRef(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  const [months, setMonths] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  const [salesData, setSalesData] = useState([]);
  const [lastYearData, setLastYearData] = useState([]);
  const [cardsData, setCardsData] = useState([
    // {
    //   subHeading: "Yearly",
    //   earning: "20.4",
    //   profit: "5",
    //   outcome: "Profit",
    //   itemSold: "1500",
    // },
    // {
    //   subHeading: "Monthly",
    //   earning: "18.2",
    //   profit: "3",
    //   outcome: "Profit",
    //   itemSold: "500",
    // },
    // {
    //   subHeading: "Weekly",
    //   earning: "8.2",
    //   profit: "3",
    //   outcome: "Profit",
    //   itemSold: "40",
    // },
  ]);

  const [mostSoldItemsData, setMostSoldItemsData] = useState([
    { name: "Whey Protein", percentage: "70" },
    { name: "Whey Protein", percentage: "40" },
    { name: "Whey Protein", percentage: "60" },
    { name: "Whey Protein", percentage: "80" },
    { name: "Whey Protein", percentage: "20" },
  ]);

  const [tableTh, setTableTh] = useState([
    "Products",
    "Order ID",
    "Date",
    "Customer name",
    "Status",
    "Amount",
  ]);
  const [tableData, setTableData] = useState([]);

  const [revenueData, setRevenueData] = useState({
    amount: "63000",
    increment: "+0.8%",
    progress: [
      { name: "Yearly", percentage: "60" },
      { name: "Monthly", percentage: "80" },
      { name: "Weekly", percentage: "20" },
    ],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await http
      .get(`${apisPath?.admin?.dashboard}`)
      .then(async (res) => {
        let data = res?.data?.dashboard;
        setTableData(data?.recentOrders);
        // card data
        let card_data = [
          {
            subHeading: "Yearly",
            earning: data?.yearly?.totalPrice,
            profit: data?.yearly?.percentChangePrice,
            outcome: data?.yearly?.percentChangePrice >= 0 ? "Profit" : "Lose",
            itemSold: data?.yearly?.totalQty,
          },
          {
            subHeading: "Monthly",
            earning: data?.monthly?.totalPrice,
            profit: data?.monthly?.percentChangePrice,
            outcome: data?.monthly?.percentChangePrice >= 0 ? "Profit" : "Lose",
            itemSold: data?.monthly?.totalQty,
          },
        ];
        setCardsData(card_data);

        // bar chart data
        let sales = [],
          last_year = [];
        await data?.monthlyChart?.currentYear?.forEach((el) => {
          sales.push(el?.totalPrice);
        });
        await data?.monthlyChart?.lastYear?.forEach((el) => {
          last_year.push(el?.totalPrice);
        });
        setSalesData(sales);
        setLastYearData(last_year);

        // revenue data
        // let revData = {};
        // revData['amount'] = data?.

        setDashboardData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    var totalEarning = 0;
    for (let i = 0; i < cardsData.length; i++) {
      var outcome = cardsData[i]?.outcome;
      var earning = cardsData[i]?.earning;
      if (outcome.toLowerCase() === profit) {
        totalEarning += parseFloat(earning);
      } else {
        totalEarning -= parseFloat(earning);
      }
    }
    setTotalRevenue(totalEarning);
  }, []);

  useEffect(() => {
    if (totalRevenue !== null && lastYearData?.length !== 0) {
      Highcharts.chart(highchartRef?.current, {
        chart: {
          type: "column",
          borderRadius: 5,
        },
        title: {
          text: "Total Revenue",
          align: "left",
          style: {
            color: "#000",
            fontWeight: "700",
            fontFamily: "'Poppins', sans-serif",
            translate: "2px 2px",
            fontSize: "18px",
          },
        },
        subtitle: {
          text: "&#8377;" + totalRevenue + "K",
          align: "left",
          style: {
            color: "#000",
            fontSize: "26px",
            fontWeight: "800",
            fontFamily: "'Poppins', sans-serif",
            translate: "2px -4px",
          },
        },
        xAxis: {
          categories: months,
          crosshair: false,
          accessibility: {
            description: "Months",
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "",
          },
          labels: {
            formatter: function () {
              return this.value + "K";
            },
            style: {
              fontWeight: "500",
              fontSize: "12px",
              fontFamily: "'Poppins', sans-serif",
            },
          },
        },
        legend: {
          layout: "horizontal",
          align: "right",
          verticalAlign: "top",
          itemMarginTop: -80,
        },
        plotOptions: {
          column: {
            pointWidth: 20,
            groupPadding: 0.1,
            pointPadding: 0,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: "Sales",
            data: salesData,
            color: "#fb5151",
          },
          {
            name: "Last year",
            data: lastYearData,
            color: "#E3E7FC",
          },
        ],
      });
    }
  }, [totalRevenue, lastYearData]);

  return (
    <div className="dashboard">
      <h3 className="dashboard__heading page_heading">Dashboard</h3>
      <div className="dashboard__content">
        <div className="dashboard__content__cards">
          {cardsData?.map((card, index) => {
            return <DashboardCard key={index} data={card} />;
          })}
        </div>

        <div className="dashboard__content__middle_content">
          <div
            ref={highchartRef}
            className="dashboard__content__middle_content__total_revenue"
          ></div>


          <div className="dashboard__content__middle_content__revenue">
            <h4>Subscription Revenue</h4>
            <div className="dashboard__content__middle_content__revenue__total_revenue">
              <h1>&#8377; {revenueData?.amount}</h1>
              <span>{revenueData?.increment} than last week</span>
            </div>

            <div className="dashboard__content__middle_content__bars">
              {revenueData?.progress?.map((item, index) => {
                return (
                  <div
                    className="dashboard__content__middle_content__bars__item"
                    key={index}
                  >
                    <div className="dashboard__content__middle_content__bars__item__name_and_percentage">
                      <span>{item?.name}</span>
                      <span>{item?.percentage}%</span>
                    </div>
                    <div className="dashboard__content__middle_content__bars__item__progress">
                      <div
                        className="dashboard__content__middle_content__bars__item__progress__count gradient-red-box"
                        style={{ width: `${item?.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="dashboard__content__latest_orders">
          <h4>Latest Orders</h4>
          <table>
            <tr>
              {tableTh?.map((heading, index) => {
                return <th key={index}>{heading}</th>;
              })}
            </tr>
            {tableData?.map((data, index) => {
              return (
                <>
                  {data?.product?.map((prod, index1) => {
                    return (
                      <tr key={index1}>
                        <td>{prod?.name}</td>
                        <td>{data?.orderID}</td>
                        <td>{data?.createdAt}</td>
                        <td>{data?.user?.name}</td>
                        <td>{data?.status}</td>
                        <td>{prod?.price}</td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

const DashboardCard = ({ data }) => {
  return (
    <div className="card">
      <span className="card__sub_heading">{data?.subHeading}</span>
      <div className="card__middle_heading">
        <h3>&#8377;{data?.earning}K</h3>
        <span
          className="card__middle_heading__profit"
          style={{ color: data?.outcome === "Profit" ? "#4ce13f" : "#fb5151" }}
        >
          {data?.outcome === "Profit" ? (
            <ArrowUpwardIcon sx={{ color: "#4ce13f" }} />
          ) : (
            <ArrowDownwardIcon sx={{ color: "#fb5151" }} />
          )}{" "}
          {data?.profit}% than last {data?.subHeading?.split("ly")[0]}
        </span>
      </div>
      <p className="card__item_sold">We have sold {data?.itemSold} items</p>
    </div>
  );
};
