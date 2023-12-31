import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import EmployeeSelfGrid from '../../sections/employee/EmployeeSelfGrid';

const EmployeeSelf = () => {
  // states
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const id = localStorage.getItem('id');
  // functions
  useEffect(() => {
    const retrieveCall = axios.get(`/empBase/${id}`);
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
  return <EmployeeSelfGrid data={data} />;
};

export default EmployeeSelf;
