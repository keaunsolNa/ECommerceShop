import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import SearchPagination from './SearchPagination';

const Search = () => {
  return (
    <div>
      <Grid>
        {/* <Grid item xs={12} sx={{ mb: -2.25 }}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <SearchList />
          </MainCard>
        </Grid> */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <SearchPagination />
          </MainCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default Search;
