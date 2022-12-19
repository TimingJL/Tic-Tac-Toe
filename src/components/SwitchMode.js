import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Switch from '../components/Switch';

const Row = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.span`
  margin-left: 8px;
  font-size: 20px;
  color: ${(props) => props.theme.color};
`;

const SwitchMode = ({ label, isActive, onClick }) => {
  return (
    <Row>
      <Switch
        isActive={isActive}
        onClick={onClick}
      />
      <Label>{label}</Label>
    </Row>
  );
};

SwitchMode.propTypes = {
  label: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};

export default SwitchMode;
