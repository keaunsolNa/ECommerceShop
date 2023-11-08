import axios from 'axios';
import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, FormHelperText, Grid, Stack, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import UploadMultiFile from 'components/third-party/dropzone/MultiFile';
import { Formik } from 'formik';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';

const UpdatePostPage = () => {
  const id = new URL(window.location.href).searchParams.get('id');
  const location = useLocation();
  const [data, setData] = useState(location.state);

  const [list, setList] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [actor, setActor] = useState(data.actor);
  const [attachFile, setAttachFile] = useState(data.attachFile);
  const [content, setContent] = useState(data.contents);
  const [files, setFiles] = useState([]);

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  const handleTitleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const changeDecodedToFile = () => {
    let fileArray = [];
    for (let i = 0; i < attachFile.length; i++) {
      const base64String = attachFile[i].decodeFile;
      // Base64 문자열을 ArrayBuffer로 변환
      const arrayBuffer = Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
      const blob = new Blob([arrayBuffer]);
      const fileName = attachFile[i].filesName; // 원하는 파일 이름을 지정
      const file = new File([blob], fileName, { type: attachFile[i].filesType });
      fileArray.push(file);
    }
    //setFiles(fileArray);
    return fileArray;
  };

  const updatePost = (formData) => {
    axios.patch(`/post/updatePost?id=${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  useEffect(() => {
    console.log('files is : ', files);
  }, [files]);

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
              title: title,
              actor: actor,
              content: content,
              files: changeDecodedToFile()
            }}
            onSubmit={async (values) => {
              const formData = new FormData();
              values.content = content;

              const update = {
                postNum: 100,
                title: values.title,
                actor: values.actor,
                contents: values.content
                // attachFile: fileInfo
              };

              formData.append(
                'update',
                new Blob([JSON.stringify(update)], {
                  type: 'application/json'
                })
              );
              for (let i = 0; i < values.files.length; i++) {
                const a = values.files[i];
                formData.append('files', a);
              }

              console.log(formData.get('files'));
              console.log('form data file is : ', formData.get('files'));
              console.log('form data file type is : ', typeof formData.get('files'));
              updatePost(formData);
            }}
            validationSchema={yup.object().shape({})}
          >
            {({ values, handleSubmit, handleChange, setFieldValue, touched, errors }) => (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 10 }}>
                  {console.log(values)}
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
                        style={{
                          width: '25%',
                          marginRight: 10
                        }}
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
                    data={content}
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
                        취소
                      </Button>
                      <Button type="submit" variant="contained">
                        수정
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

export default UpdatePostPage;
