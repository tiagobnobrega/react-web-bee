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

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.initialValues &&
      nextProps.initialValues !== this.props.initialValues
    )
      this.setState(nextProps.initialValues);
  }

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
          value={this.state.name}
        />
        <Form.Field
          label="Aniversário"
          name="birthday"
          control={Input}
          onChange={this.handleChange}
          value={this.state.birthday}
        />
        <Form.Field
          label="Sexo"
          name="gender"
          options={options}
          control={Select}
          onChange={this.handleChange}
          value={this.state.gender}
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
