import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Popper,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import { ThemeMode } from 'config';

// assets
import {
  AuditOutlined,
  BellOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  GiftOutlined,
  MailOutlined,
  MessageOutlined,
  SettingOutlined
} from '@ant-design/icons';

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const anchorRef = useRef(null);
  const [read, setRead] = useState(0);
  const [open, setOpen] = useState(false);
  // const [notiList, setNotiList] = useState();
  const notiList = null;
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'grey.200' : 'grey.300';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100';

  // useEffect(() => {
  //   axios.get('/noti/notification').then((res) => {
  //     console.log(res.data.content);
  //     console.log(res.data.content.length);
  //     setRead(res.data.content.length);
  //     setNotiList(res.data.content);
  //   });
  // }, []);

  const IconClassification = (icon) => {
    if (icon === 'gift') {
      return <GiftOutlined />;
    } else if (icon === 'setting') {
      return <SettingOutlined />;
    } else if (icon === 'mail') {
      return <MailOutlined />;
    } else if (icon === 'reply') {
      return <MessageOutlined />;
    } else if (icon === 'invoice') {
      return <FileTextOutlined />;
    } else if (icon === 'approval') {
      return <AuditOutlined />;
    }
  };
  const ContentsClassification = (notiLists) => {
    console.log('notiLists is : ', notiLists);
    if (notiLists.icon === 'gift') {
      const ContentsText = `${notiLists.receiver} 님의 생일입니다.`;
      return ContentsText;
    } else if (notiLists.icon === 'setting') {
      const ContentsText = notiLists.contents;
      return ContentsText;
    } else if (notiLists.icon === 'mail') {
      const ContentsText = `${notiLists.sender}님이 메일을 보냈습니다.`;
      return ContentsText;
    } else if (notiLists.icon === 'reply') {
      const ContentsText = `${notiLists.receiver}님의 ${notiLists.contents}의 댓글이 달렸습니다.`;
      return ContentsText;
    } else if (notiLists.icon === 'invoice') {
      const ContentsText = `${notiLists.sender}님이 ${notiLists.contents}를 등록하였습니다.`;
      return ContentsText;
    } else if (notiLists.icon === 'approval') {
      const ContentsText = `${notiLists.sender}님이 등록한 ${notiLists.contents}`;
      return ContentsText;
    }
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color='secondary'
        variant='light'
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label='open profile'
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        <Badge badgeContent={read} color='primary'>
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type='grow' position={matchesXs ? 'top' : 'top-right'} sx={{ overflow: 'hidden' }}
                       in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title='Notification'
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <>
                      {read > 0 && (
                        <Tooltip title='Mark as all read'>
                          <IconButton color='success' size='small' onClick={() => setRead(0)}>
                            <CheckCircleOutlined style={{ fontSize: '1.15rem' }} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  }
                >
                  <List
                    component='nav'
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '&.Mui-selected': { bgcolor: 'grey.50', color: 'text.primary' },
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {notiList.map((notiLists, index) => (
                      <div key={index}>
                        <ListItemButton selected={read > 0}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                color: '#7dadfa',
                                bgcolor: '#e8fafc'
                              }}
                            >
                              {IconClassification(notiLists.icon)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography variant='h6'>{ContentsClassification(notiLists)}</Typography>}
                            secondary='2 min ago'
                          />
                          <ListItemSecondaryAction>
                            <Typography variant='caption' noWrap>
                              3:00 AM
                            </Typography>
                          </ListItemSecondaryAction>
                        </ListItemButton>
                        <Divider />
                      </div>
                    ))}
                    {/* <ListItemButton selected={read > 0}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'success.main',
                            bgcolor: 'success.lighter'
                          }}
                        >
                          <GiftOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            It&apos;s{' '}
                            <Typography component="span" variant="subtitle1">
                              Cristina danny&apos;s
                            </Typography>{' '}
                            birthday today.
                          </Typography>
                        }
                        secondary="2 min ago"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          3:00 AM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider /> */}
                    <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                      <ListItemText
                        primary={
                          <Typography variant='h6' color='primary'>
                            View All
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
