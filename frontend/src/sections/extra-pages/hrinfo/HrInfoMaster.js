// material-ui
import {
  Chip,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// assets
import { AimOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { PropTypes } from 'prop-types';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const HrInfoMaster = ({ retrieveMaster }) => {
  console.log(retrieveMaster)
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  // const language = 'kr';
  // const name = response.name.filter((item) => item.language === language)[0];
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} xl={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end">
                    {/*<Chip label={retrieveMaster.contactType} size="small" color="primary" />*/}
                  </Stack>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar alt="Avatar 1" size="xl" src={avatarImage(`./default.png`)} />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{retrieveMaster.name}</Typography>
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
                      <Typography variant="h5">{retrieveMaster.id}</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography color="secondary">직책</Typography>
                      <Typography variant="h5">{retrieveMaster.role}</Typography>
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
                        <Typography align="right">{retrieveMaster.email ? retrieveMaster.email : '정보 없음'}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{retrieveMaster.phoneNumber ? retrieveMaster.phoneNumber : '정보 없음'}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AimOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{retrieveMaster.address ? retrieveMaster.address : '정보 없음'}</Typography>
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
                        <Typography>{retrieveMaster.name ? retrieveMaster.name : '정보 없음'}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">이메일</Typography>
                        <Typography>{retrieveMaster.email ? retrieveMaster.email : '정보 없음'}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">입사일자</Typography>
                        <Typography>
                          <PatternFormat value={retrieveMaster.createYmd} displayType="text" type="text" format="####-##-##" />
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">성별</Typography>
                        <Typography>{retrieveMaster.gender ? retrieveMaster.gender : '정보 없음'}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">직책</Typography>
                        <Typography>{retrieveMaster.role ? retrieveMaster.role : '정보 없음'}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">전화번호</Typography>
                        <Typography>
                          <PatternFormat value={retrieveMaster.phoneNumber ? retrieveMaster.phoneNumber : '정보 없음'} displayType="text" type="text" format="###-####-####" />
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
                        <PatternFormat value={retrieveMaster.callNumber ? retrieveMaster.callNumber : '정보 없음'} displayType="text" type="text" format="###-####-####" />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">주소</Typography>
                        <Typography>
                          <PatternFormat value={retrieveMaster.address ? retrieveMaster.address : '정보 없음'} displayType="text" type="text" format="###-####-####" />
                        </Typography>
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
HrInfoMaster.propTypes = {
  retrieveMaster: PropTypes.object
};

export default HrInfoMaster;
