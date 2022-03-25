import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title as ChartTitle, Tooltip, Legend } from "chart.js";

import { Col, Row, Typography } from 'antd';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend);

const { Title } = Typography;

const LineChart = ({ timePeriod, coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  const longTime = ['3m', '1y', '3y', '5y']
  const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  const timeOptions = { hour: 'numeric', minute: 'numeric', hours12: true }
  let reverseCoinHistory = []

  if (coinHistory?.data?.history) {
    reverseCoinHistory = JSON.parse(JSON.stringify( coinHistory?.data?.history ))
    reverseCoinHistory.reverse()
  }

  for (let i = 0; i < reverseCoinHistory.length; i += 1) {
    coinPrice.push(reverseCoinHistory[i].price)

    let options = longTime.includes(timePeriod) ? dateOptions : {...dateOptions, ...timeOptions}
    coinTimestamp.push(`${new Intl.DateTimeFormat('en-US', options).format(new Date( reverseCoinHistory[i].timestamp * 1000 ))}`)
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          display: false
        },
        grid: {
          display: false
        }
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default React.memo(LineChart);