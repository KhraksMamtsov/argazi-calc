import React from "react";
import "./Select.css";

type SelectProps<T> = {
  value: T;
  onChange: (value: T) => void;
  values: ReadonlyArray<T>;
  renderOption: (option: T) => string;
  getId: (value: T) => string;
};
export const Select = <T, S>(props: SelectProps<T>) => {
  return (
    <select
      className={"select"}
      value={props.getId(props.value)}
      onChange={(x) => {
        console.log(x.target.value);
        const value = props.values.find(
          (v) => props.getId(v) === x.target.value
        );
        props.onChange(value!);
      }}
    >
      {props.values.map((x) => (
        <option key={props.getId(x)} value={props.getId(x)}>
          {props.renderOption(x)}
        </option>
      ))}
    </select>
  );
};
