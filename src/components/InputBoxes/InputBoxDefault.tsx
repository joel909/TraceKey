import React from 'react';
import styled from 'styled-components';

interface InputProps {
  placeholder?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder = "undefined",
  name = "undefined"
}) => {
  return (
    <StyledWrapper>
      <input type="text" placeholder={placeholder} name={name} className="input" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input {
    border-radius: 10px;
    outline: 2px solid #FEBF00;
    border: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #e2e2e2;
    outline-offset: 3px;
    padding: 10px 1rem;
    transition: 0.25s;
  }

  .input:focus {
    outline-offset: 5px;
    background-color: #fff
  }`;

export default Input;
