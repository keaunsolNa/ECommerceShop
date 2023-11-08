import { Button, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import PostPagination from './PostPagination';
import { Link } from 'react-router-dom';

const PostPage = () => {
  return (
    <div>
      <Grid>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <PostPagination />
          </MainCard>
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Link to="/write">
              <Button style={{ color: 'white', backgroundColor: 'navy', marginTop: 10 }}>글쓰기</Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostPage;
