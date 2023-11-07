import { Button, Grid, Divider } from '@mui/material';
import axios from 'axios';
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ElasticSearchDateDisplay = (elasticDate) => {
  const parsedDate = new Date(elasticDate);

  const formattedDate = parsedDate.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  return formattedDate;
};

const ViewPosting = () => {
  const id = new URL(window.location.href).searchParams.get('id');

  // const location = useLocation();
  const [contents, setContents] = useState([]);
  const [date, setDate] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [downInfoAttach, setDownInfoAttach] = useState(false);

  const navigate = useNavigate();

  // 마우스가 요소 위에 올라갔을 때와 나갔을 때 상태를 변경합니다.
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const updatePost = () => {
    navigate(`/updateposting?id=${id}`, { state: contents });
  };

  const deletePost = () => {
    axios.delete(`/post/deletePost?id=${id}`).then((res) => {
      console.log(res.data);
      navigate('/webpostingpage'), window.location.reload();
    });
  };

  const handleAttachClick = () => {
    setDownInfoAttach(!downInfoAttach);
  };

  // useEffect(() => {
  //   console.log('downInfoAttach is : ', downInfoAttach);
  // }, [downInfoAttach]);

  const divStyle = {
    backgroundColor: 'white',
    color: isHovered ? 'gray' : 'black',
    cursor: 'pointer' // 커서 모양을 포인터로 변경 (선택 사항)
  };

  //데이터 받아오기
  // const postingData = location.state;
  useEffect(() => {
    console.log('POST ID is : ', id);
    axios.get(`/post/viewposting?id=${id}`).then((res) => {
      console.log('res is : ', res.data);
      setContents(res.data[0]);
    });
  }, [id]);

  useEffect(() => {
    console.log('contents is : ', contents);
    setDate(ElasticSearchDateDisplay(contents.date));
  }, [contents]);

  return (
    <div>
      <Grid>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Button style={{ color: 'white', backgroundColor: 'navy', marginTop: 10, marginRight: 10 }} onClick={updatePost}>
              수정
            </Button>
            <Button style={{ color: 'white', backgroundColor: 'navy', marginTop: 10 }} onClick={deletePost}>
              삭제
            </Button>
          </div>
          <MainCard sx={{ mt: 2 }} content={false}>
            <div>
              <div style={{ margin: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 'bold' }}>제목 : {contents.title}</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <div>작성자 : {contents.actor}</div>
                  <div>게시일 : {date}</div>
                </div>
                {contents.attachFile == null ? (
                  <></>
                ) : (
                  <>
                    <Divider style={{ marginTop: 10, marginBottom: 10, height: '2px' }} />
                    <div>
                      <div>
                        <Button
                          style={divStyle}
                          disableRipple
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          onClick={handleAttachClick}
                        >
                          첨부파일: {contents.attachFile.length}개
                        </Button>
                      </div>
                      <div style={{ marginLeft: 0 }}>
                        {downInfoAttach ? (
                          <div>
                            {contents.attachFile.map((file, index) => (
                              <div key={index}>
                                <a href={`data:application/octet-stream;base64,${file.decodeFile}`} download={file.filesName}>
                                  {file.filesName}
                                </a>
                                {/* <Button>{file}</Button> */}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <Divider style={{ marginTop: 10, marginBottom: 10, height: '2px' }} />
                  </>
                )}
              </div>
              <Divider />
              <div style={{ marginLeft: 20 }} dangerouslySetInnerHTML={{ __html: contents.contents }} />
            </div>
          </MainCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewPosting;
