import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'semantic-ui-react';

const options = [
  { key: 'm', text: 'Masculino', value: 'M' },
  { key: 'f', text: 'Feminino', value: 'F' },
  { key: 'o', text: 'Outro', value: 'O' },
];

class AddEditForm extends Component {
  state = {
    name: '',
    gender: 'M',
    birthday: '',
  };

  handleChange = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = { ...this.state };
    if (this.props.onSubmit) this.props.onSubmit(data);
  };

  render() {
    const { onCancel } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field
          label="Nome"
          name="name"
          control={Input}
          onChange={this.handleChange}
        />
        <Form.Field
          label="Aniversário"
          name="birthday"
          control={Input}
          onChange={this.handleChange}
        />
        <Form.Field
          label="Sexo"
          name="gender"
          options={options}
          control={Select}
          onChange={this.handleChange}
        />
        <div>
          <Button primary type="submit">
            Salvar
          </Button>
          <Button negative type="button" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </Form>
    );
  }
}

export default AddEditForm;
