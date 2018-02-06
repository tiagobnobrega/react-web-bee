import React, { Fragment } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { Input, Select } from 'semantic-ui-react';

const handleChange = onChange => (evt, data) => {
  onChange(data.value);
};
const SelectField = ({ input, label, meta, ...rest }) => (
  <Fragment>
    <Form.Field
      {...input}
      {...rest}
      label={label}
      control={Select}
      onChange={handleChange(input.onChange)}
      value={input.value}
      error={meta.touched && !!meta.error}
    />
    {meta.touched && meta.error && <Message negative content={meta.error} />}
  </Fragment>
);

SelectField.displayName = 'SelectField';
export default SelectField;
