import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, FormHelperText, Grid, Stack, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import UploadMultiFile from 'components/third-party/dropzone/MultiFile';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const WritePostPage = () => {
  const [content, setContent] = useState('');
  const [postCount, setPostCount] = useState(0);
  // const [file, setFile] = useState();
  const navigate = useNavigate();

  // const title = '';
  // const actor = '';
  const list = false;

  useEffect(() => {
    axios.get('/post/postCount').then((res) => {
      setPostCount(res.data + 1);
    });
  }, []);

  useEffect(() => {
    console.log('postCount is :', postCount);
  }, [postCount]);

  // const handleButtonClick = () => {
  //   // 여기서 조건에 따라 다른 경로로 이동
  //   const data = {
  //     postNum: postCount,
  //     title: title,
  //     contents: content,
  //     actor: actor
  //   };
  //   if (title == '' || content == '' || actor == '') {
  //     alert('제목 or 내용 or 작성자는 필수입력 사항입니다.');
  //   } else {
  //     axios.post('/post/createPost', data).then(navigate('/webpostingpage'), window.location.reload());
  //   }

  //   //   navigate('/write'); // 다른 경로로 이동
  // };

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append('file', file);

            axios
              .post('http://localhost:8080/api/v0/file/upload', formData)
              .then((res) => {
                resolve({
                  default: res.data.data.uri
                });
              })
              .catch((err) => reject(err));
          });
        });
      }
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  const createPost = (formData) => {
    axios
      .post('/post/createPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res.data);
        // navigate('/webpostingpage'), window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        sx={{
          '& .ck-editor__editable': {
            minHeight: 135
          }
        }}
      >
        <MainCard>
          <Formik
            initialValues={{
              title: '',
              actor: '',
              content: '',
              files: null
            }}
            onSubmit={async (values) => {
              const formData = new FormData();
              values.content = content;

              // let fileInfo = [];
              // for (let i = 0; i < values.files.length; i++) {
              //   let fileArray = [];
              //   // console.log('values.files is : ', values.files[i]);
              //   fileArray.push(values.files[i].name);
              //   fileInfo.push(fileArray);
              // }
              // console.log('어테치 파일 : ', fileInfo);
              const post = {
                postNum: postCount,
                title: values.title,
                actor: values.actor,
                contents: values.content
                // attachFile: fileInfo
              };

              formData.append(
                'post',
                new Blob([JSON.stringify(post)], {
                  type: 'application/json'
                })
              );

              if (values.files != null) {
                for (let i = 0; i < values.files.length; i++) {
                  const a = values.files[i];
                  formData.append('files', a);
                }
              }

              // console.log(formData.get('files'));
              // console.log('form data file is : ', formData.get('files'));
              // console.log('form data file type is : ', typeof formData.get('files'));
              createPost(formData);
            }}
            validationSchema={yup.object().shape({})}
          >
            {({ values, handleSubmit, handleChange, setFieldValue, touched, errors }) => (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', marginBottom: 10 }}>
                    <div style={{ width: '70%' }}>
                      <TextField
                        style={{ width: '55%', marginRight: 10 }}
                        type="title"
                        value={values.title}
                        name="title"
                        onChange={handleChange}
                        placeholder="제목을 입력하세요"
                      />
                      <TextField
                        style={{ width: '25%', marginRight: 10 }}
                        type="actor"
                        value={values.actor}
                        name="actor"
                        onChange={handleChange}
                        label="작성자"
                        InputLabelProps={{ style: { paddingTop: 2, marginTop: -2 } }}
                      />
                    </div>
                  </div>
                  <CKEditor
                    editor={ClassicEditor}
                    data=""
                    config={uploadPlugin}
                    type="content"
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                      setContent(editor.getData());
                      console.log({ event, editor, content });
                    }}
                    onBlur={(event, editor) => {
                      console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log('Focus.', editor);
                    }}
                  />
                </div>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.5} alignItems="center">
                      <UploadMultiFile
                        showList={list}
                        setFieldValue={setFieldValue}
                        files={values.files}
                        error={touched.files && !!errors.files}
                      />
                      {touched.files && errors.files && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.files}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                      <Button color="error" onClick={() => setFieldValue('files', null)}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained">
                        Submit
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default WritePostPage;
