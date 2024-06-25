import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
import { ChangeEvent } from "react";

interface AutoCompleteProps {
  options: { itemName: string; itemValue: string | number }[];
  labelProps: string;
  classNameProps?: string;
  onChange?: (
    event: ChangeEvent<{}>, // Change the type of event to ChangeEvent<{}> or specify the target element type if known
    newValue: { itemName: string; itemValue: string | number } | null, // Include null as a valid value option
    reason: AutocompleteChangeReason, // Include the reason for the change
    details?:
      | {
          option?: { itemName: string; itemValue: string | number };
        }
      | undefined // Include optional details
  ) => void;
  onClickProps?: (value: number | string) => void;
  nome: string;
}

export function AutoComplete(props: AutoCompleteProps) {
  return (
    <div>
      <Autocomplete
        className={props.classNameProps}
        isOptionEqualToValue={(option, value) =>
          option.itemValue === value?.itemValue
        }
        options={props.options}
        getOptionLabel={(option) => option.itemName || ""}
        onChange={(event, value, reason, details) => {
          if (props.onChange) {
            props.onChange(event, value, reason, details);
          }
        }}
        componentName={props.nome}
        onClick={() => {
          if (props.onClickProps) {
            props.onClickProps("value");
          }
        }}
        sx={{
          color: "white",
          borderColor: "white",
          backgroundColor: "#1A1B1F",
          borderRadius: "8px",
          marginBottom: "8px",
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              "& input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "inherit",
              },
            }}
            label={props.labelProps}
          />
        )}
      />
    </div>
  );
}
