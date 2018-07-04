# nix-react-state-validate

A validation package for the state object in React. It takes in your current state, validates whichever value you want to validate, and outputs a state object with new success/error values depending on the validation. This is useful for form validation in React.

This package is library-independent, i.e., it works with Material-UI, React-Bootstrap, Sematic UI and all other popular React libraries.

*I made this package after trying to use several React packages for form validation. Most give you custom components, and I found that often these custom components are not properly compatible with the components of the front-end library you are using (e.g., Material UI). Therefore, nix-react-state-validate does not use a custom component. This package gives you an easy way to change the state based on errors, but does not append any element into the page. It is left to the user to show the errors using whatever compoenents he/she wants to use.*

<br>

## Install

```
npm install nix-react-state-validate --save
```

<br>

## Quick Start Example

Let's suppose you're checking if the email entered by the user in the following form component is actually an email.

![Example gif](https://media.giphy.com/media/bca2sNSfF8FwJxjP8W/giphy.gif)

##### DetailForm.js

```
import React from 'react';
import validator, {nixCheckInput} from 'nix-react-state-validate';


class DetailForm extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            details: {
                name: '',
                email: '',
                phone: ''
            },
            errors: {
                name: '',
                email: '',
                phone: ''
            }
        }
    }

    handleChange = event => {
        this.setState( 
            nixCheckInput({
                validity: validator.isEmail(event.target.value),
                componentState: this.state,
                componentStateSuccessItem: {
                  details: {
                    email: event.target.value
                  }
                },
                componentStateErrorItem: {
                  errors: {
                    email: "Not a valid email"
                  }
                }
            })
        );
    }
    
    render() {
        return (
            <div>
                Name<br />
                <input /><br />

                Email<br />
                <input onChange={this.handleChange} /><br />
                <div style={{color:'red'}}>{this.state.errors.email}</div>

                Phone<br />
                <input />
            </div>
        );
    }
}


export default DetailForm;
```

<br>

## Options

| Key               | Definition                        | Value         | Required |
| ----------------- | --------------------------------- | ------------- | -------- |
| validity          | A validator function that returns either true or false. You can choose to use any of the validators in [validator.js](https://github.com/chriso/validator.js). The latest validator.js library is installed along with nix-react-state-validate by default.<br><br>You can also use your own validator function if you want. | Boolean | Yes | 
| componentState | Current state of the component. | Object (this.state) | Yes |
| componentStateSuccessItem | The address of the success key within the state object and its value (if it turns out to be a success). For example, let's say you want to validate 'city' in the following state object: <br><br><code>this.state = {<br>&nbsp;&nbsp;contactDetails: {<br>&nbsp;&nbsp;&nbsp;&nbsp;address: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;city: '', <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;country: ''<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;phone: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;landline: '', <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mobile: ''<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;contactErrors: {<br>&nbsp;&nbsp;&nbsp;&nbsp;address: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;city: '', <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;country: ''<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;phone: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;landline: '', <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mobile: ''<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}</code><br><br>The componentStateSuccessItem will be an object that leads to the value of 'city' inside the state object, and will also contain the success value. <br><br><code>componentStateSuccessItem:{<br>&nbsp;&nbsp;contactDetails: {<br>&nbsp;&nbsp;&nbsp;&nbsp;address: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;city: e.target.value<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}</code><br><br>Note that in the componentStateSuccessItem, each nested object will contain only a single key. | Object | Yes |
| componentStateErrorItem | The address of the error key within the state object and its value (if it turns out to be an error). The rest of the explanation is similar to ComponentStateSuccessItem above.| Object | Yes |

<br>