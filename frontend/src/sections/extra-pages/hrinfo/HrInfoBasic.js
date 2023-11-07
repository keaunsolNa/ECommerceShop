// material-ui
import { Grid, List, ListItem, Stack, Typography, useMediaQuery } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { dispatch } from 'store';
import { getEmpDetailSearch } from 'store/reducers/phmBase';
import { useOutletContext } from 'react-router';

const HrInfoBasic = () => {
  // states
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [empData, setEmpData] = useState([]);
  const data = useOutletContext();
  // functions
  useEffect(() => {
    dispatch(getEmpDetailSearch(data, setEmpData));
  }, [data]);

  return (
    <MainCard border={false} boxShadow>
      <Grid item xs={12} sm={7} md={8} xl={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="인적사항 상세내역">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={4}>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">영문명</Typography>
                        <Typography>{empData.engName}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">국가명</Typography>
                        <Typography>{empData.nationality}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">휴대폰</Typography>
                        <Typography>{empData.phoneNumber}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={4}>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">사번</Typography>
                        <Typography>{empData.employeeID}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">나이(만)</Typography>
                        <Typography>{empData.age}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">자택번호</Typography>
                        <Typography>{empData.homeNumber}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={4}>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">근속년수</Typography>
                        <Typography>근속년수</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">성별</Typography>
                        <Typography>{empData.gender}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">내선번호</Typography>
                        <Typography>{empData.extensionNumber}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={4}>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">장애유형</Typography>
                        <Typography>{empData.disabilityType}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">결혼여부</Typography>
                        <Typography>{empData.marriage}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">이메일</Typography>
                        <Typography>{empData.email}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={4}>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">보훈여부</Typography>
                        <Typography>{empData.meritoriousServiceApplicability}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">외국인구분</Typography>
                        <Typography>{empData.foreigner}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">급여계좌</Typography>
                        <Typography>{empData.account}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={4}>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">최종학력</Typography>
                        <Typography>{empData.finalEducation}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={4}>
                    <Grid item xs={8} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">주소</Typography>
                        <Typography>{empData.address}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default HrInfoBasic;
