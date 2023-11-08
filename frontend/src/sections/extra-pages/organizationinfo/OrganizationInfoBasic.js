import { useEffect, useState } from 'react';

// material-ui
// third-party
// project import
import Loader from 'components/Loader';
import { useOutletContext } from 'react-router';
import ObjectToGrid from 'components/win/ObjectToGrid';

// assets

const OrganizationInfoBasic = () => {
  // states
  const outletContext = useOutletContext();
  const newContext = { ...outletContext, children: outletContext.children.map((item) => item.name).join(', ') };
  const [loading, setLoading] = useState(true);

  // functions

  useEffect(() => {
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);

  if (loading) return <Loader />;
  return <ObjectToGrid data={newContext} />;
};
export default OrganizationInfoBasic;
