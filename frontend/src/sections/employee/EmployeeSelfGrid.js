import { useEffect, useState } from 'react';
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import { AimOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { PatternFormat } from 'react-number-format';
import MainCard from '../../components/MainCard';
// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const EmployeeSelfGrid = ({ data }) => {
  // states
  const [value, setValue] = useState(data);
  const avatarImage = require.context('assets/images/users', true);
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // functions
  useEffect(() => {
    setValue(data);
  }, [data]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} xl={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end"></Stack>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar alt="Avatar 1" size="xl" src={avatarImage(`./default.png`)} />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{value?.name}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-around" alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                      <Typography color="secondary">ID</Typography>
                      <Typography variant="h5">{value?.id}</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography color="secondary">직책</Typography>
                      <Typography variant="h5">{value?.role}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                    <ListItem>
                      <ListItemIcon>
                        <MailOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{value?.email}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{value?.phoneNumber}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AimOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{value?.address}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={7} md={8} xl={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="상세정보">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">이름</Typography>
                        <Typography>{value?.name}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">이메일</Typography>
                        <Typography>{value?.email}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">입사일자</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            format="yyyy-MM-dd"
                            value={parseISO(value?.createDate)}
                            sx={{
                              '& .MuiOutlinedInput-input': { py: 0.75, px: 1, width: { xs: 80 } },
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                            }}
                            disableOpenPicker={true}
                            readOnly={true}
                          />
                        </LocalizationProvider>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">성별</Typography>
                        <Typography>{value?.gender}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">직책</Typography>
                        <Typography>{value?.role}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">전화번호</Typography>
                        <Typography>
                          <PatternFormat value={value?.phoneNumber} displayType="text" type="text" format="###-####-####" />
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">일반전화번호</Typography>
                        <PatternFormat value={value?.callNumber} displayType="text" type="tel" format="###-####-####" />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">주소</Typography>
                        <Typography>{value?.address}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

EmployeeSelfGrid.propTypes = {
  select: PropTypes.object,
  data: PropTypes.object
};
export default EmployeeSelfGrid;
