import { useState } from "react";
import * as Styled from "./Index.styled";
import BreedSelector from "../BreedSelector";

export default function Index() {
  const [breed, setBreed] = useState("");

  return (
    <Styled.Container>
      <Styled.Fieldset>
        <BreedSelector value={breed} onChange={setBreed} />
      </Styled.Fieldset>
    </Styled.Container>
  );
}
