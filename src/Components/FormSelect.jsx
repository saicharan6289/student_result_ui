import React from "react";
import {useField, useFormikContext} from "formik";
import Select from "react-select";

const FormSelect = (props) => {
  const { name, ...restProps } = props;
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  //flatten the options so that it will be easier to find the value
  const flattenedOptions = props.options?.flatMap((o) => {
    const isNotGrouped = "value" in o;
    if (isNotGrouped) {
      return o;
    } else {
      return o.options;
    }
  });

  //get the value using flattenedOptions and field.value
  const value = flattenedOptions?.filter((o) => {
    const isArrayValue = Array.isArray(field.value);

    if (isArrayValue) {
      const values = field.value;
      return values.includes(o.value);
    } else {
      return field.value === o.value;
    }
  });

  return (
      <Select
          {...restProps}
          value={value}
          // onChange implementation
          onChange={(val) => {
            const _val = val ;
            const isArray = Array.isArray(_val);
            if (isArray) {
              const values = _val.map((o) => o.value);
              setFieldValue(name, values);
            } else {
              setFieldValue(name, _val.value);
            }
          }}
      />
  );
};

export default FormSelect;