import { useEffect, useState } from 'react';

// material-ui
// third-party
import PropTypes from 'prop-types';

// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';

// assets

const ComponentTest = () => {
  // states
  const [loading, setLoading] = useState(true);

  // functions
  const GiveMeProps = ({ title }) => {
    return (
      <>
        <MainCard title={title}></MainCard>
      </>
    );
  };

  GiveMeProps.propTypes = {
    title: PropTypes.string
  };

  useEffect(() => {
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);

  if (loading) return <Loader />;
  return <GiveMeProps title="Give Me Props"></GiveMeProps>;
};
export default ComponentTest;
