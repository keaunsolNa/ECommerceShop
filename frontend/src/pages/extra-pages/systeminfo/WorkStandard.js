// material-ui
import WorkStandardTable from 'sections/extra-pages/systeminfo/WorkStandardTable';
import { response } from 'assets/data/workstandardinfo';
import { Grid } from '@mui/material';
import MappingTable from 'sections/extra-pages/systeminfo/MappingTable';
import { useState } from 'react';
// project-import

// ==============================|| REACT TABLE - VIRTUALIZED ||============================== //

const WorkStandard = () => {
  const data = response.data[0].workStd;
  const [originalId, setOriginalId] = useState(1);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WorkStandardTable data={data} originalId={originalId} setOriginalId={setOriginalId} />
        </Grid>
        <Grid item xs={12}>
          <MappingTable data={data} originalId={originalId} />
        </Grid>
      </Grid>
    </>
  );
};

export default WorkStandard;
