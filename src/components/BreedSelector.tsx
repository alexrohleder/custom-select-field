import { useState } from "react";
import useSWR from "swr";
import * as BaseSelect from "./BaseSelect";
import * as Styled from "./BreedSelector.styled";
import BaseLabel from "./BaseLabel";
import fetcher from "../lib/fetcher";

type BreedSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

function BreedSelector(props: BreedSelectorProps) {
  const [api, setApi] = useState("");
  const { data, error, isValidating } = useSWR(api, fetcher);
  const isLoading = isValidating && !data && !error;

  const selected = data
    ? data.find((breed: any) => breed.id === props.value)
    : null;

  return (
    <BaseLabel title="Hunderase" error={error?.message}>
      <BaseSelect.Root
        value={props.value}
        onChange={props.onChange}
        onOpenStateChange={() => setApi("https://api.thedogapi.com/v1/breeds")}
      >
        <BaseSelect.Trigger>
          <BaseSelect.Value placeholder="Velg hunderase">
            {selected && (
              <Breed name={selected.name} imageUrl={selected.image.url} />
            )}
          </BaseSelect.Value>
          <BaseSelect.Icon isLoading={isLoading} />
        </BaseSelect.Trigger>
        <BaseSelect.Content>
          {data &&
            data.map((breed: any) => (
              <BaseSelect.Option key={breed.id} value={breed.id}>
                <Breed
                  name={breed.name}
                  imageUrl={breed.image.url}
                  temperament={breed.temperament ?? "Unknown"}
                />
              </BaseSelect.Option>
            ))}
        </BaseSelect.Content>
      </BaseSelect.Root>
    </BaseLabel>
  );
}

type BreedProps = {
  name: string;
  temperament?: string;
  imageUrl: string;
};

function Breed(props: BreedProps) {
  return (
    <Styled.Breed>
      <Styled.BreedImg src={props.imageUrl} alt={props.name} loading="lazy" />
      <Styled.BreedDescription>
        <Styled.BreedName hasTemperament={!!props.temperament}>
          {props.name}
        </Styled.BreedName>
        {props.temperament && <div>{props.temperament}</div>}
      </Styled.BreedDescription>
    </Styled.Breed>
  );
}

export default BreedSelector;
