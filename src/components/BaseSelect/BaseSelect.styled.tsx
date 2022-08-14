import styled from "styled-components";

export const Root = styled.div`
  position: relative;
`;

export const Trigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  border: 0;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.05);
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:focus,
  &[aria-expanded="true"] {
    background-color: #b7faac;
  }
`;

export const Content = styled.ul`
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
`;
