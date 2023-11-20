import React from "react";
import { Controller } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import styles from "./ColorPicker.module.scss";

const ColorPickerWithHex = ({ control, name }) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue="#000"
        render={({ field }) => (
          <div>
            <HexColorPicker
              color={field.value}
              onChange={(color) => field.onChange(color)}
              style={{ width: "100%" }}
            />
            <input
              type="text"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className={styles.colorInput}
            />
          </div>
        )}
      />
    </div>
  );
};

export default ColorPickerWithHex;
