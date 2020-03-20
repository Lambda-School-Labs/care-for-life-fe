import React from 'react';
import { StyledButtonText, StyledButton } from './styled';

const Button = props => {
  const { title, ...rest } = props;
  return (
    <StyledButton
      activeOpacity={0.7}
      color={'#4A4A4A'}
      underlayColor={'#4A4A4A'}
      {...rest}
    >
      <StyledButtonText>{title.toUpperCase()}</StyledButtonText>
    </StyledButton>
  );
};

export default Button;
