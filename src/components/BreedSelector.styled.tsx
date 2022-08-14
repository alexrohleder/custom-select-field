import styled from "styled-components";

export const Breed = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const BreedImg = styled.img`
  border-radius: 100%;
  width: 1.5rem;
  min-width: 1.5rem;
  height: 1.5rem;
  background-color: #eee;
`;

export const BreedDescription = styled.div`
  width: calc(100% - 1.5rem - 0.5rem); // 2rem = img width + gap

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const BreedName = styled.div<{ hasTemperament: boolean }>`
  font-weight: ${(props) => (props.hasTemperament ? 400 : 300)};
`;
