import { useEffect, useState } from 'react';

// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// third-party
import styled from 'styled-components';

// project import
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import PropTypes from 'prop-types';
// assets

// styles
const RoundedCornerBox = styled(Box)`
  border-radius: 5px; /* 둥근 테두리 설정 */
  background-color: #1677ff; /* 배경색 설정 */
  padding: 5px;
`;

const ObjectToGrid = ({ data }) => {
  // states
  const [loading, setLoading] = useState(true);

  // functions
  const keyTranslator = (key) => {
    switch (key) {
      case 'id':
        return '아이디';
      case 'name':
        return '이름';
      case 'number':
        return '번호';
      case 'startDate':
        return '시작일자';
      case 'endDate':
        return '종료일자';
      case 'code':
        return '코드';
      case 'parent':
        return '상위';
      case 'children':
        return '하위';
      default:
        return key;
    }
  };

  useEffect(() => {
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);

  if (loading) return <Loader />;
  return (
    <Grid container spacing={1}>
      {Object.keys(data).map((key, index) => (
        <Grid item key={index} xs={12} lg={4} sm={6}>
          <MainCard>
            <Grid item>
              <Stack spacing={1}>
                <RoundedCornerBox>
                  <Typography variant="h5" color="white">
                    {keyTranslator(key)}
                  </Typography>
                </RoundedCornerBox>
                <Typography variant="h3">
                  {['string', 'number'].includes(typeof data[key]) && data[key] !== '' ? data[key] : '-'}
                </Typography>
              </Stack>
            </Grid>
          </MainCard>
        </Grid>
      ))}
    </Grid>
  );
};
ObjectToGrid.propTypes = {
  data: PropTypes.object
};

export default ObjectToGrid;
