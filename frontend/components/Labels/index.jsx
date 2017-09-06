import React from 'react';
import objectAssign from 'object-assign';
import Wrapper from './Wrapper';
import WritableGroupWrapper from '../WritableGroupWrapper';

const Labels = (props) => {
  const wrapperProps = objectAssign({}, props);
  delete wrapperProps.onAdd;

  return (
    <WritableGroupWrapper
      onAdd={props.onAdd}>
      <Wrapper {...wrapperProps} />
    </WritableGroupWrapper>
  );
};

export default Labels;
