import React, { Fragment } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';

const TextField = ({ input, label, meta, ...rest }) => (
  <Fragment>
    <Form.Field
      {...input}
      label={label}
      control={Input}
      onChange={input.onChange}
      value={input.value}
      {...rest}
      error={meta.touched && !!meta.error}
    />
    {meta.touched && meta.error && <Message negative content={meta.error} />}
  </Fragment>
);

TextField.displayName = 'TextField';
export default TextField;
