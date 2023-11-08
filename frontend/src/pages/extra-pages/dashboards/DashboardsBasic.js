import { useEffect, useState } from 'react';

// material-ui
// third-party
// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import WinPieChart from 'components/win/WinPieChart';
import { Button } from '@mui/material';

// assets
const mockData = [
  { label: 'CS본부', value: 44 },
  { label: 'RND', value: 55 },
  { label: '경영지원', value: 13 },
  { label: '영업', value: 43 },
  { label: '프로젝트', value: 22 }
];

const randomize = (value) => {
  return Math.floor(Math.random() * value);
};

const DashboardsBasic = () => {
  // states
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState(mockData.map((item) => randomize(item.value)));
  randomize();
  const chartOptions = {
    chart: {
      type: 'pie',
      width: 450,
      height: 450
    },
    // labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    labels: mockData.map((item) => item.label),
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 12,
        height: 12,
        radius: 5
      },
      itemMargin: {
        horizontal: 25,
        vertical: 4
      }
    },
    responsive: [
      {
        breakpoint: 450,
        chart: {
          width: 280,
          height: 280
        },
        options: {
          legend: {
            show: false,
            position: 'bottom'
          }
        }
      }
    ]
  };
  // functions

  useEffect(() => {
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);

  if (loading) return <Loader />;
  return (
    <MainCard
      title="DashboardsBasic MainCard"
      secondary={<Button onClick={() => setSeries(mockData.map((item) => randomize(item.value)))}>랜덤</Button>}
    >
      <MainCard sx={{ width: '500px' }} title="Pie Chart">
        <WinPieChart series={series} chartOptions={chartOptions} />
      </MainCard>
    </MainCard>
  );
};
export default DashboardsBasic;
