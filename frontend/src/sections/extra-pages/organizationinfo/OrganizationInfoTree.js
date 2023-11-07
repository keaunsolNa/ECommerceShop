import { useState, useEffect } from 'react';

// material-ui
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView, TreeItem } from '@mui/x-tree-view';

// third-party

// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';
// assets

const OrganizationInfoTree = ({ organizationinfo, setSelected }) => {
  // states
  const [loading, setLoading] = useState(true);
  // functions
  const RecursiveTreeItem = ({ organizationinfo }) => {
    return (
      <TreeItem
        label={organizationinfo.name}
        nodeId={organizationinfo.id.toString()}
        onClick={() => {
          setSelected(organizationinfo);
        }}
      >
        {organizationinfo.children && organizationinfo.children.length > 0
          ? organizationinfo.children.map((child) => <RecursiveTreeItem key={child.id} organizationinfo={child} />)
          : null}
      </TreeItem>
    );
  };

  useEffect(() => {
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);

  if (loading) return <Loader />;
  return (
    <MainCard title="조직트리">
      <TreeView aria-label="file system navigator" defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
        <RecursiveTreeItem organizationinfo={organizationinfo} />
      </TreeView>
    </MainCard>
  );
};

OrganizationInfoTree.propTypes = {
  organizationinfo: PropTypes.object,
  setSelected: PropTypes.func
};
export default OrganizationInfoTree;
