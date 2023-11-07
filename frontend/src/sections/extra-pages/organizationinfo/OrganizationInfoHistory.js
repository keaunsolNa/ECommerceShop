import { useState, useEffect } from 'react';

// material-ui

// third-party

// project import
import VirtualizedInfiniteScrollTable from 'components/win/VirtualizedInfiniteScrollTable';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import ObjectToGrid from 'components/win/ObjectToGrid';

// assets

const OrganizationInfoHistory = () => {
  // states
  const [loading, setLoading] = useState(true);
  const data = [
    { id: 1, localeCode: '부산', postalCode: '730-906', address: '서울시 서초구 서초동', startDate: '1900.01.01', endDate: '2999.12.31' },
    { id: 2, localeCode: '울산', postalCode: '730-906', address: '서울시 서초구 서초동', startDate: '1900.01.01', endDate: '2999.12.31' },
    { id: 3, localeCode: '제주', postalCode: '730-906', address: '서울시 서초구 서초동', startDate: '1900.01.01', endDate: '2999.12.31' },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '2서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '3서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    },
    {
      localeCode: '4서울',
      postalCode: '730-906',
      address: '서울시 서초구 서초동',
      startDate: '1900.01.01',
      endDate: '2999.12.31'
    }
  ];

  const columns = [
    { Header: '아이디', accessor: 'id', dataType: 'Text' },
    { Header: '주소코드', accessor: 'localeCode', dataType: 'Text' },
    { Header: '우편번호', accessor: 'postalCode', dataType: 'Text' },
    { Header: '주소', accessor: 'address', dataType: 'Text' },
    { Header: '시작일자', accessor: 'startDate', dataType: 'Text' },
    { Header: '종료일자', accessor: 'endDate', dataType: 'Text' }
  ];
  const [previousIndex, setPreviousIndex] = useState(15);
  const [selected, setSelected] = useState(null);
  const [scrollData, setScrollData] = useState(data.slice(0, previousIndex));
  // functions
  const fetchMoreData = () => {
    console.log('fetchMoreData');
    setTimeout(() => {
      setScrollData(scrollData.concat(data.slice(previousIndex, previousIndex + 10)));
    }, 1500);
    setPreviousIndex(previousIndex + 10);
  };
  useEffect(() => {
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);

  if (loading) return <Loader />;
  return (
    <>
      <MainCard title="주소변경내역" content={false}>
        <VirtualizedInfiniteScrollTable
          data={scrollData}
          columns={columns}
          height={300}
          fetchMoreData={fetchMoreData}
          setSelected={setSelected}
        />
      </MainCard>
      <MainCard title="조직이력 상세" content={false}>
        {selected && <ObjectToGrid data={data.find((item) => item.id === selected)} />}
      </MainCard>
    </>
  );
};
export default OrganizationInfoHistory;
