import React, {Component} from 'react';
import {FormErrors} from './FormErrors';
import './Form.css';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            category: '1',
            formErrors: {title: '', description: ''},
            titleValid: false,
            descriptionValid: false,
            formValid: false,
            message: ''
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
    }

    createSelectItems() {
        let items = [];
        for (let i = 1; i <= 100; i++) {
            items.push(<option value={i}>{i}</option>);
        }
        return items;
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let descriptionValid = this.state.descriptionValid;

        switch (fieldName) {
            case 'title':
                titleValid = value.length >= 1 && value.length < 255;
                fieldValidationErrors.title = titleValid ? '' : ' is not between 1-255 characters';
                break;
            case 'description':
                descriptionValid = value.length >= 1 && value.length < 5000;
                fieldValidationErrors.description = descriptionValid ? '' : ' is not between 1-5000 characters';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            titleValid: titleValid,
            descriptionValid: descriptionValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.titleValid && this.state.descriptionValid});
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleSubmit = event => {

        this.setState({message: "Saving"});
        event.preventDefault();

        const item = {
            title: this.state.title,
            description: this.state.description,
            category_id: this.state.category
        };

        axios.post(`http://localhost:3000/items`, {item})
            .then(res => {
                console.log(res)
                this.setState({message: "Item saved! Add another"});
                document.getElementById("demoForm").reset();
                this.setState({title: '', description: '', category: '1', errorMessage: ''});
            }).catch(err => {
                this.setState({message: '', errorMessage: "Item was not able to be saved."});
            })

    }

    render() {
        return (
            <form id="demoForm" className="demoForm" onSubmit={this.handleSubmit}>
                <h2>Save Item</h2>

                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors}/>
                </div>
                <div className="successMessage">{this.state.message}</div>
                <div className="errorMessage">{this.state.errorMessage}</div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.title)}`}>
                    <label htmlFor="title">Title</label>
                    <input type="text" required className="form-control" name="title"
                           placeholder="Title"
                           value={this.state.title}
                           onChange={this.handleUserInput}/>
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.description)}`}>
                    <label htmlFor="description">Description</label>
                    <textarea type="text" className="form-control" name="description" rows="4"
                              placeholder="Description"
                              value={this.state.description}
                              onChange={this.handleUserInput}/>
                </div>
                <div className="category">
                    <label htmlFor="category">Category</label>
                    <select type="select" name="category"
                            value={this.state.category}
                            onChange={this.handleUserInput}>
                        {this.createSelectItems()}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        )
    }
}

export default Form;
