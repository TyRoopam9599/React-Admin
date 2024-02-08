import React, { useEffect, useRef, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Highcharts from "highcharts";
// import http from "../../services/utility";
// import { apisPath } from "../../utils/path";

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

  const [res, setRes] = useState({
    data: {
      dashboard: {

      },
    },
  })

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    // await http
    //   .get(`${apisPath?.admin?.dashboard}`)
    //   .then(async (res) => {
        let data = dummyData;
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
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
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


const dummyData = {
  "yearly": {
      "totalQty": 0,
      "totalPrice": 0,
      "percentChangeSales": null,
      "percentChangePrice": null
  },
  "monthly": {
      "totalQty": 0,
      "totalPrice": 0,
      "percentChangeSales": 100,
      "percentChangePrice": -100
  },
  "monthlyChart": {
      "currentYear": [
          {
              "month": "January",
              "totalPrice": 17397
          },
          {
              "month": "February",
              "totalPrice": 0
          },
          {
              "month": "March",
              "totalPrice": 0
          },
          {
              "month": "April",
              "totalPrice": 0
          },
          {
              "month": "May",
              "totalPrice": 0
          },
          {
              "month": "June",
              "totalPrice": 0
          },
          {
              "month": "July",
              "totalPrice": 0
          },
          {
              "month": "August",
              "totalPrice": 0
          },
          {
              "month": "September",
              "totalPrice": 0
          },
          {
              "month": "October",
              "totalPrice": 0
          },
          {
              "month": "November",
              "totalPrice": 0
          },
          {
              "month": "December",
              "totalPrice": 0
          }
      ],
      "lastYear": [
          {
              "month": "January",
              "totalPrice": 0
          },
          {
              "month": "February",
              "totalPrice": 0
          },
          {
              "month": "March",
              "totalPrice": 0
          },
          {
              "month": "April",
              "totalPrice": 0
          },
          {
              "month": "May",
              "totalPrice": 0
          },
          {
              "month": "June",
              "totalPrice": 0
          },
          {
              "month": "July",
              "totalPrice": 0
          },
          {
              "month": "August",
              "totalPrice": 0
          },
          {
              "month": "September",
              "totalPrice": 0
          },
          {
              "month": "October",
              "totalPrice": 0
          },
          {
              "month": "November",
              "totalPrice": 0
          },
          {
              "month": "December",
              "totalPrice": 0
          }
      ]
  },
  "recentOrders": [
      {
          "id": 2,
          "user": {
              "id": 4,
              "image": "https://13.126.83.194/uploads/1705832257352.jpg",
              "name": "Kevin new",
              "phone": "8287413509",
              "email": "kev@gmail.com",
              "gender": "helicopter",
              "bglCash": 0,
              "dob": "2020-12-12",
              "height": null,
              "weight": null,
              "referCode": "BGL706825",
              "createdAt": "2024-01-20T15:53:47.000Z",
              "updatedAt": "2024-01-21T10:17:37.000Z"
          },
          "product": [
              {
                  "id": 2,
                  "catId": 1,
                  "subCatId": 1,
                  "name": "MuscleBlaze",
                  "price": 6100,
                  "sellingPrice": 5799,
                  "premiumPrice": 6000,
                  "expireDate": "2023-01-01",
                  "isBestSeller": false,
                  "weight": 10,
                  "stock": 1021,
                  "flavor": "test",
                  "images": [
                      "https://13.126.83.194/uploads/1705758250485.png",
                      "https://13.126.83.194/uploads/1705764265076.jpg",
                      "https://13.126.83.194/uploads/1705764267328.jpg",
                      "https://13.126.83.194/uploads/1705764270838.jpg",
                      "https://13.126.83.194/uploads/1705764274454.jpg",
                      "https://13.126.83.194/uploads/1705764278047.jpg"
                  ],
                  "overView": [
                      {
                          "value": "10",
                          "nutrients": "test"
                      }
                  ],
                  "details": [
                      {
                          "body": "test",
                          "heading": "test"
                      },
                      {
                          "body": "test",
                          "heading": "test"
                      }
                  ],
                  "tables": [
                      {
                          "table": [
                              {
                                  "for": "t",
                                  "value": "1"
                              },
                              {
                                  "for": "e",
                                  "value": "3"
                              },
                              {
                                  "for": "w",
                                  "value": "2"
                              },
                              {
                                  "for": "s",
                                  "value": "3"
                              },
                              {
                                  "for": "t",
                                  "value": "2"
                              }
                          ],
                          "title": "test"
                      }
                  ],
                  "information": [
                      {
                          "value": "10",
                          "nutrients": "test"
                      }
                  ],
                  "certificates": [
                      "https://13.126.83.194/uploads/1705758311739.png",
                      "https://13.126.83.194/uploads/1705764314426.jpg"
                  ],
                  "supplements": [
                      "https://13.126.83.194/uploads/1705758316603.png",
                      "https://13.126.83.194/uploads/1705764311938.webp"
                  ],
                  "brand": {
                      "body": "test",
                      "heading": "test"
                  },
                  "createdAt": "2024-01-20T13:45:22.000Z",
                  "updatedAt": "2024-01-22T17:05:09.000Z"
              }
          ],
          "address": {
              "id": 3,
              "user": 4,
              "flat": "267",
              "landmark": "near shiv mandir",
              "city": "palwal",
              "state": "",
              "pincode": "121102",
              "name": "ankit kumar",
              "phone": "8287413509",
              "type": "home",
              "isDefault": false,
              "createdAt": "2024-01-20T16:08:17.000Z",
              "updatedAt": "2024-01-20T16:08:17.000Z"
          },
          "usedCoupon": false,
          "coupon": 0,
          "couponDiscount": 0,
          "amount": 11598,
          "qty": [
              2
          ],
          "paymentMethod": "COD",
          "transactionId": null,
          "usedBGLCash": true,
          "bglCash": 0,
          "earnedBglCash": 0,
          "shiping": 262.76,
          "totalAmount": 11597,
          "orderID": "#218280",
          "trackingID": null,
          "status": "Processing",
          "createdAt": "2024-01-20T16:20:19.000Z",
          "updatedAt": "2024-01-20T16:20:19.000Z"
      },
      {
          "id": 1,
          "user": {
              "id": 1,
              "image": "https://13.126.83.194/uploads/1705832719127.jpg",
              "name": "Itachi Kumar uchiha",
              "phone": "8295451564",
              "email": "heli@gmail.com",
              "gender": "Helicopter",
              "bglCash": 0,
              "dob": "2024-01-10",
              "height": null,
              "weight": null,
              "referCode": "BGL675656",
              "createdAt": "2024-01-20T13:30:06.000Z",
              "updatedAt": "2024-01-21T10:45:38.000Z"
          },
          "product": [
              {
                  "id": 1,
                  "catId": 1,
                  "subCatId": 1,
                  "name": "test",
                  "price": 1,
                  "sellingPrice": 3,
                  "premiumPrice": 3,
                  "expireDate": "2022-01-01",
                  "isBestSeller": true,
                  "weight": 19,
                  "stock": 101011,
                  "flavor": "test",
                  "images": [
                      "https://13.126.83.194/uploads/1705756549833.png"
                  ],
                  "overView": [
                      {
                          "value": "18",
                          "nutrients": "test"
                      }
                  ],
                  "details": [
                      {
                          "body": "test",
                          "heading": "test"
                      },
                      {
                          "body": "test",
                          "heading": "test"
                      }
                  ],
                  "tables": [
                      {
                          "table": [
                              {
                                  "for": "t",
                                  "value": "1"
                              },
                              {
                                  "for": "e",
                                  "value": "11"
                              },
                              {
                                  "for": "st",
                                  "value": "1"
                              },
                              {
                                  "for": "t",
                                  "value": "1"
                              },
                              {
                                  "for": "t",
                                  "value": "1"
                              }
                          ],
                          "title": "test"
                      }
                  ],
                  "information": [
                      {
                          "value": "4",
                          "nutrients": "test"
                      }
                  ],
                  "certificates": [
                      "https://13.126.83.194/uploads/1705756608988.png"
                  ],
                  "supplements": [
                      "https://13.126.83.194/uploads/1705756613089.png"
                  ],
                  "brand": {
                      "body": "test",
                      "heading": "test"
                  },
                  "createdAt": "2024-01-20T13:17:04.000Z",
                  "updatedAt": "2024-01-22T17:05:06.000Z"
              }
          ],
          "address": {
              "id": 2,
              "user": 1,
              "flat": "A-102",
              "landmark": "Near Park",
              "city": "Cityville",
              "state": "Chhattigsarh",
              "pincode": "492013",
              "name": "Alhn",
              "phone": "9399369854",
              "type": "Home",
              "isDefault": true,
              "createdAt": "2024-01-20T14:53:34.000Z",
              "updatedAt": "2024-01-20T14:53:34.000Z"
          },
          "usedCoupon": false,
          "coupon": 0,
          "couponDiscount": 0,
          "amount": 5799,
          "qty": [
              1
          ],
          "paymentMethod": "COD",
          "transactionId": null,
          "usedBGLCash": true,
          "bglCash": 0,
          "earnedBglCash": 0,
          "shiping": 158.38,
          "totalAmount": 5798,
          "orderID": "#385733",
          "trackingID": null,
          "status": "Cancelled",
          "createdAt": "2024-01-20T15:45:12.000Z",
          "updatedAt": "2024-02-01T01:46:22.000Z"
      }
  ],
  "subscriptions": {
      "totalEarning": 0,
      "yearPercentage": null,
      "monthPercentage": null,
      "weekPercentage": null
  }
}