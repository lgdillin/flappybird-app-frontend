import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { createUserApi } from "./api/UserApiService"
import moment from 'moment'

const CreateUserComponent = () => {


    // username/password validation
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const minUsernameLength = 5
    const maxUsernameLength = 10
    const minPasswordLength = 8
    const maxPasswordLength = 16

    const validate = (values) => {
        let errors = {
            // username: 'Enter a valid description',
            // password: 'Enter a valid target date'
            // confirmPassword: 'Passwords do not match'
        }
        console.log('here')
        if(values.username.length < minUsernameLength || values.username.length > maxUsernameLength) {
            errors.username = 'Check username length'
        }


        if(values.password.length < minPasswordLength || values.password.length > maxPasswordLength) {
            errors.password = 'Check password length'
        }

        if(values.password != values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match'
        }

        // username does not have enough/too many characters
        // username has invalid characters
        // password is too short/long
        // password has bad characters
        return errors
    }

    const onSubmit = (values) => {
        const user = {
            username: values.username,
            password: values.password,
            score: 0
        }

        createUserApi(user)
        .then(response => {console.log(response)})
        .catch(error => console.log(error))
    }

    return (
        <div className="CreateUserComponent">
            <div className="CreateUserForm">
                <Formik 
                    initialValues={ { username, password, confirmPassword } } 
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                // > { (props) => (
                    >
                    <Form>
                        <ErrorMessage 
                            name="username"
                            component="div"
                            className = "alert alert-warning"
                        />

                        <ErrorMessage 
                            name="password"
                            component="div"
                            className = "alert alert-warning"
                        />

                        <ErrorMessage 
                            name="confirmPassword"
                            component="div"
                            className = "alert alert-warning"
                        />

                        <fieldset className="form-group">
                            <label>Username</label>
                            <Field type="text" className="form-control" name="username" />
                        </fieldset>

                        <fieldset className="form-group">
                            <label>Password</label>
                            <Field type="password" className="form-control" name="password" />
                        </fieldset>

                        <fieldset className="form-group">
                            <label>Confirm Password</label>
                            <Field type="password" className="form-control" name="confirmPassword" />
                        </fieldset>
                        <div>
                            <button className="btn btn-success m-5" type="submit">Confirm</button>
                        </div>
                    </Form> 
                 </Formik>
            </div>
        </div>
    )
}

export default CreateUserComponent