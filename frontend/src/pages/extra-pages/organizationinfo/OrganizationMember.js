import { useState, useEffect } from 'react';

// material-ui
import { TreeView, TreeItem } from '@mui/x-tree-view';
import { Grid } from '@mui/material';
// third-party
import { dispatch, useSelector } from 'store';

// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import DynamicTable from 'components/win/DynamicTable';
import { dispatchRetrieveByDepartment } from 'store/reducers/organization';

// assets
import organizationTree from 'assets/data/organizationTree';

const OrganizationMember = () => {
  // states
  const [loading, setLoading] = useState(true);
  const organizationMember = useSelector((state) => state.organizationMember);
  const [item, setItem] = useState([]);
  // setting states
  const column = [
    {
      Header: '상태',
      accessor: 'rowStatus',
      dataType: 'rowStatus',
      Footer: 'rowStatus'
    },
    {
      Header: '번호',
      accessor: 'no',
      dataType: 'no',
      Footer: '번호'
    },
    {
      Header: '요약정보',
      accessor: 'popupBtn',
      dataType: 'popupBtn',
      Footer: '요약정보'
    },
    {
      Header: '부서',
      accessor: 'department',
      dataType: 'text',
      Footer: '부서'
    },
    {
      Header: '사번',
      accessor: 'employeeNumber',
      dataType: 'text',
      Footer: '사번'
    },
    {
      Header: '성명',
      accessor: 'empNm',
      dataType: 'text',
      Footer: '성명'
    },
    {
      Header: '직급',
      accessor: 'posGrdNm',
      dataType: 'text',
      Footer: '직급'
    },
    {
      Header: '직위',
      accessor: 'posNm',
      dataType: 'text',
      Footer: '직위'
    },
    {
      Header: '직책',
      accessor: 'dutyNm',
      dataType: 'text',
      Footer: '직책'
    }
  ];
  const tableType = {
    sort: true,
    search: true,
    input: true,
    save: true,
    download: true
  };
  const tree = organizationTree.data;

  // functions
  useEffect(() => {
    const retrieveCall = dispatch(dispatchRetrieveByDepartment(item));
    Promise.all([retrieveCall]).then(() => setLoading(false));
  }, [item]);

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => setItem(nodes.name)}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  if (loading) return <Loader />;
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ mb: -2.25 }}>
          <MainCard sx={{ mt: 2 }} content={false} title={'조직트리'}>
            <TreeView>{renderTree(tree)}</TreeView>
          </MainCard>
        </Grid>
        <Grid item xs={8} sx={{ mb: -2.25 }}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <DynamicTable
              name={'조직원조회'}
              columns={column}
              data={organizationMember.retrieve}
              tableType={tableType}
              popups={'http://localhost:3000/hrinfo/basic'}
            />
          </MainCard>
        </Grid>
      </Grid>
    </div>
  );
};
export default OrganizationMember;
