import { Button } from '@mui/material';
import { useState } from 'react';
import SearchModal from './SearchModal';

const File = ({ file }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const fileClick = () => {
    setModalOpen(true);
  };
  return (
    <div
      style={{
        width: '100%',
        overflow: 'visible',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        marginLeft: 5,
        marginTop: 5,
        marginRight: 5
      }}
    >
      <Button onClick={() => fileClick()} style={{ color: 'black' }}>
        {file.title}
      </Button>
      {modalOpen && <SearchModal setModalOpen={setModalOpen} htmlContent={file.htmlContent} />}
    </div>
  );
};

export default File;
