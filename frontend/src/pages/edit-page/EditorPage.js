import { Grid } from '@mui/material';
import Editor from './Editor';
import MainCard from 'components/MainCard';

const EditorPage = () => {
  return (
    <div>
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
            <Editor />
          </MainCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditorPage;
