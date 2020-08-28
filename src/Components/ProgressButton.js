import React from 'react';
import {Button} from 'reactstrap';
import PropTypes from "prop-types";
import ReactLoading from 'react-loading';

const ProgressButton = props => {
  return (
    <Button className={props.className}
            type="submit"
            fullWidth
            disabled={props.isLoading || props.disabled}
            size={props.size}
            color={props.color}
            onClick={props.handleClick}>
      {props.isLoading ? <ReactLoading type='spin' height={20} width={20} /> : props.children}</Button>
  );
};

ProgressButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func
};

export default ProgressButton;
