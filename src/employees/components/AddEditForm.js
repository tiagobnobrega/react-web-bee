import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { Form as FormUI, Input, Select, Button } from 'semantic-ui-react';
import { TextField, SelectField } from 'common/form';

const options = [
  { key: 'm', text: 'Masculino', value: 'M' },
  { key: 'f', text: 'Feminino', value: 'F' },
  { key: 'o', text: 'Outro', value: 'O' },
  { key: 'i', text: 'Invalido', value: 'I' },
];

const required = value => {
  return value ? undefined : 'Campo obrigatório';
};

const validateSelect = value => {
  console.log('validate!!');
  const ret = value === 'I' ? 'Valor Inválido' : undefined;
  console.log('validateSelect:ret=' + ret);
  return ret;
};

class AddEditForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.initialValues &&
      nextProps.initialValues !== this.props.initialValues
    )
      this.setState(nextProps.initialValues);
  }

  handleSubmit = values => {
    console.log('VALUES:', values);
    // if (this.props.onSubmit) this.props.onSubmit(values);
  };

  render() {
    const { onCancel } = this.props;
    return (
      <Form
        onSubmit={this.handleSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <FormUI onSubmit={handleSubmit}>
            <Field
              label="Nome"
              name="name"
              component={TextField}
              validate={required}
              required={true}
            />
            <Field label="Aniversário" name="birthday" component={TextField} />
            <Field
              label="Sexo"
              name="gender"
              component={SelectField}
              options={options}
              validate={validateSelect}
            />
            <div>
              <Button primary type="submit">
                Salvar
              </Button>
              <Button negative type="button" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </FormUI>
        )}
      />
    );
  }
}

export default AddEditForm;
