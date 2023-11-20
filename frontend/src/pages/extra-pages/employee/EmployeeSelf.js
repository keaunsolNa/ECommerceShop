import axios from 'axios';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Loader from '../../../components/Loader';
import EmployeeSelfGrid from '../../../sections/extra-pages/employee/EmployeeSelfGrid';

const EmployeeSelf = () => {
  // states
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const id = localStorage.getItem('id');
  // functions
  useEffect(() => {
    const retrieveCall = axios.get(`http://localhost:8080/empBase/${id}`)
    Promise.all([retrieveCall])
      .then(([response1]) => {
        setData(response1.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);
  if (loading) return <Loader />;
  return (
    <EmployeeSelfGrid data={data} />
  );
};
EmployeeSelf.propTypes = {
  retrieveMaster: PropTypes.object
};

export default EmployeeSelf;
