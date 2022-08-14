import styled from "styled-components";

export const Root = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.div<{ hasError: boolean }>`
  color: ${(props) => (props.hasError ? "red" : "currentColor")};
`;

export const Error = styled.div`
  color: red;
  height: 1rem;
  font-size: 0.75rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
