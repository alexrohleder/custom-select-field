import { useState } from "react";
import * as Styled from "./Index.styled";
import BaseSelect from "../BaseSelect";

const breeds = [
  "Affenpinscher",
  "Afghan Hound",
  "Airedale Terrier",
  "Akita",
  "Alaskan Malamute",
];

export default function Index() {
  const [breed, setBreed] = useState(breeds[0]);

  return (
    <Styled.Container>
      <Styled.Fieldset>
        <Styled.Label>
          Hunderase
          <BaseSelect value={breed} onChange={setBreed}>
            {breeds.map((value) => (
              <BaseSelect.Option key={value} value={value}>
                {value}
              </BaseSelect.Option>
            ))}
          </BaseSelect>
        </Styled.Label>
      </Styled.Fieldset>
    </Styled.Container>
  );
}
