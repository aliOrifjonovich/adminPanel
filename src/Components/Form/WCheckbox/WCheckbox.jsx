import { useId } from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "@mui/material";

const WCheckbox = ({
  control,
  insideFormGenerator = false,
  isBlackBg,
  name,
  label,
  tabIndex,
  watch,
  className,
  defaultValue = false,
  mutateStaticRelation,
  ...props
}) => {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <div
          className={className}
          style={{
            background: isBlackBg ? "#2A2D34" : "",
            color: isBlackBg ? "#fff" : "",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            id={`checkbox-${id}`}
            style={{ transform: "translatey(-1px)" }}
            checked={value ?? false}
            autoFocus={tabIndex === 1}
            onChange={(_, val) => {
              onChange(val);
              if (mutateStaticRelation) {
                mutateStaticRelation();
              }
            }}
            {...props}
            inputProps={tabIndex}
          />
          <label htmlFor={`checkbox-${id}`}>{label}</label>
        </div>
      )}
    />
  );
};

export default WCheckbox;
