import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import SelectEditar from './SelectEditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Sample1 = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Table Example</title>
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <h2>기안지</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Location</th>
      </tr>
      <tr>
        <td>John</td>
        <td>25</td>
        <td>New York</td>
      </tr>
      <tr>
        <td>Jane</td>
        <td>30</td>
        <td>London</td>
      </tr>
      <tr>
        <td>Mike</td>
        <td>22</td>
        <td>Los Angeles</td>
      </tr>
    </table>
  </body>
  </html>`;
const Sample2 = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Table Example</title>
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <h2>지출 결의서</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Location</th>
      </tr>
      <tr>
        <td>Park</td>
        <td>26</td>
        <td>korean</td>
      </tr>
      <tr>
        <td>Lee</td>
        <td>27</td>
        <td>Korean</td>
      </tr>
      <tr>
        <td>Mike</td>
        <td>22</td>
        <td>USA</td>
      </tr>
    </table>
  </body>
  </html>`;
const Sample3 = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Table Example</title>
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <h2>교육 신청서</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Location</th>
      </tr>
      <tr>
        <td>Choi</td>
        <td>26</td>
        <td>korean</td>
      </tr>
      <tr>
        <td>James</td>
        <td>27</td>
        <td>Korean</td>
      </tr>
      <tr>
        <td>David</td>
        <td>25</td>
        <td>GBR</td>
      </tr>
    </table>
  </body>
  </html>`;
const Sample4 = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Table Example</title>
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <h2>도서 신청서</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Location</th>
      </tr>
      <tr>
        <td>Choi</td>
        <td>26</td>
        <td>korean</td>
      </tr>
      <tr>
        <td>James</td>
        <td>27</td>
        <td>Korean</td>
      </tr>
      <tr>
        <td>David</td>
        <td>25</td>
        <td>GBR</td>
      </tr>
    </table>
  </body>
  </html>`;

const Editor = () => {
  const titleRef = useRef();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectContact, setSelectContact] = useState('');
  const [htmlContent, setHtmlContent] = useState();

  useEffect(() => {
    console.log('selectContact is :', selectContact);
    if (selectContact == '기안지') {
      setHtmlContent(Sample1);
    } else if (selectContact == '지출 결의서') {
      setHtmlContent(Sample2);
    } else if (selectContact == '교육 신청서') {
      setHtmlContent(Sample3);
    } else if (selectContact == '도서 신청서') {
      setHtmlContent(Sample4);
    } else {
      setHtmlContent();
    }
  }, [selectContact]);

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

  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const handleSubmit = () => {
    const currentDate = new Date();
    const formattedDateTime = formatDateTime(currentDate);

    console.log('formattedDateTime is:', formattedDateTime);
    const data = {
      title: title,
      icon: 'invoice',
      contents: content,
      sender: 'ㅁㅁㅁ',
      receiver: 'ㄴㄴㄴ'
    };
    console.log('data is :', data);
    axios.post('/noti/createNoti', data);
  };

  return (
    <div>
      <section>
        <div style={{ display: 'flex', marginBottom: 10 }}>
          <div style={{ width: '50%', display: 'flex' }}>
            <TextField
              style={{ width: '55%', marginRight: 10 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              ref={titleRef}
            />
            <SelectEditar selectContact={selectContact} setSelectContact={setSelectContact} />
          </div>
          {/* <div style={{ width: 230, justifyContent: 'space-between', display: 'flex' }}>
            <div>
              <Button
                style={{ color: 'white', backgroundColor: 'navy' }}
                onClick={() => {
                  setHtmlContent(Sample1);
                }}
              >
                Sample1
              </Button>
            </div>
            <div>
              <Button
                style={{ color: 'white', backgroundColor: 'navy' }}
                onClick={() => {
                  setHtmlContent(Sample2);
                }}
              >
                Sample2
              </Button>
            </div>
            <div>
              <Button
                style={{ color: 'white', backgroundColor: 'navy' }}
                onClick={() => {
                  setHtmlContent(Sample3);
                }}
              >
                Sample3
              </Button>
            </div>
          </div> */}
        </div>
      </section>
      <section>
        <CKEditor
          editor={ClassicEditor}
          data={htmlContent}
          config={uploadPlugin}
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
      </section>
      <section>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <div>
            <Button
              label="완료"
              style={{ color: 'white', backgroundColor: 'navy' }}
              onClick={() => {
                handleSubmit();
              }}
            >
              완료
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Editor;
