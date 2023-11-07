import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

const SelectEditor = ({ selectContact, setSelectContact }) => {
  const handleChange = (event) => {
    setSelectContact(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" style={{ paddingTop: 2, marginTop: -2 }}>
          문서 형태
        </InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectContact} label="Age" onChange={handleChange}>
          <MenuItem value="기안지">기안지</MenuItem>
          <MenuItem value="지출 결의서">지출 결의서</MenuItem>
          <MenuItem value="교육 신청서">교육 신청서</MenuItem>
          <MenuItem value="도서 신청서">도서 신청서</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

SelectEditor.propTypes = {
  selectContact: PropTypes.string,
  setSelectContact: PropTypes.func
};

export default SelectEditor;
