import React, {Component} from 'react';
import './Form.css';
import axios from 'axios';

const config = require('../config')

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            category: '1',
            titleValid: true,
            descriptionValid: true,
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

    /**
     * Creates category drop down contents.
     * @returns {Array}
     */
    createSelectItems() {
        let items = [];
        for (let i = 1; i <= 100; i++) {
            items.push(<option value={i}>{i}</option>);
        }
        return items;
    }

    /**
     * Validates if a field is valid for submission.
     * Stores values in state
     * @param fieldName
     * @param value
     */

    validateField(fieldName, value) {
        let titleValid = this.state.titleValid;
        let descriptionValid = this.state.descriptionValid;

        switch (fieldName) {
            case 'title':
                titleValid = value.length >= 1 && value.length < 255;
                break;
            case 'description':
                descriptionValid = value.length >= 1 && value.length < 5000;
                break;
            default:
                break;
        }
        this.setState({
            titleValid: titleValid,
            descriptionValid: descriptionValid,
        }, this.validateForm);
    }

    /**
     * Runs validate on title and description.
     */
    validateForm() {
        this.setState({formValid: this.state.title.length > 0 && this.state.description.length > 0
            && this.state.titleValid && this.state.descriptionValid});
    }

    errorClass(error) {
        return (error ? '' : 'has-error');
    }

    /**
     * Sends Post to API if item is valid.
     * @param event
     */
    handleSubmit = event => {
        //Displays message while waiting on the post to finish.
        this.setState({message: "Saving"});
        event.preventDefault();

        const item = {
            title: this.state.title,
            description: this.state.description,
            category_id: this.state.category
        };
        //make sure the form is valid.
        this.validateForm()
        if (this.state.formValid) {
            //Send Post
            axios.post(config.apiHost + config.itemsApi, {item})
                .then(res => {
                    console.log(res)
                    this.setState({message: "Item saved! Add another"});
                    document.getElementById("demoForm").reset();
                    this.setState({title: '', description: '', category: '1', errorMessage: ''});
                }).catch(err => {
                this.setState({message: '', errorMessage: "Item was not able to be saved."});
            })
        } else {
            this.setState({message: '', errorMessage: "Please fill out the form properly."});
        }

    }

    render() {
        return (
            <form id="demoForm" className="demoForm" onSubmit={this.handleSubmit}>
                <h2>Save Item</h2>
                <div className="successMessage">{this.state.message}</div>
                <div className="errorMessage">{this.state.errorMessage}</div>
                <div className={`form-group ${this.errorClass(this.state.titleValid)}`}>
                    <label htmlFor="title">Title</label>
                    <input type="text" required className="form-control" name="title"
                           placeholder="Title"
                           value={this.state.title}
                           onChange={this.handleUserInput}/>
                </div>
                <div className={`form-group ${this.errorClass(this.state.descriptionValid)}`}>
                    <label htmlFor="description">Description</label>
                    <textarea type="text" className="form-control" name="description" rows="4"
                              placeholder="Description"
                              value={this.state.description}
                              onChange={this.handleUserInput}/>
                </div>
                <div className="category">
                    <label className="categoryLabel" htmlFor="category">Category </label>
                    <select type="select" name="category"
                            value={this.state.category}
                            onChange={this.handleUserInput}>
                        {this.createSelectItems()}
                    </select>
                </div>
                <button type="submit" disabled={!this.state.formValid} className="btn btn-primary">Save</button>
            </form>
        )
    }
}

export default Form;
