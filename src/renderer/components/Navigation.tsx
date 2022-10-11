import { useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Navigation() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      <Tab
        label="Consulta"
        onClick={() => {
          navigate('/');
        }}
        {...a11yProps(0)}
      />
      <Tab
        label="Añadir"
        onClick={() => {
          navigate('/add');
        }}
        {...a11yProps(1)}
      />
    </Tabs>
  );
}

export default Navigation;
