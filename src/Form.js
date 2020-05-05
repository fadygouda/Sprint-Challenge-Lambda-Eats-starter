import React, { useState, useEffect } from "react"
import * as yup from "yup"
import axios from "axios"
import styled from "styled-components"

const Form = () => {

    const firstFormState = {
        name:"",
        size: "",
        sauce: "",
        chicken: false,
        pepperoni: false,
        sausage: false,
        bellPeppers: false,
        pineapple: false,
        onions: false,
        olives: false,
        specialRequest: "",
        quantity: ""
    };

    const [post, setPost] = useState([])

    const [errors, setErrors] = useState(firstFormState);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [serverError, setServerError] = useState("")

    const [formState, setFormState] = useState(firstFormState);

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is required").min(2, "Must have at least two letters"),
        size: yup.string().required("Please select a size"),
        sauce: yup.string().required("Please select a sauce"),
        chicken: yup.string(),
        pepperoni: yup.string(),
        sausage: yup.string(),
        bellPeppers: yup.string(),
        pineapple: yup.string(),
        onions: yup.string(),
        olives: yup.string(),
        specialRequest: yup.string(),
        quantity: yup.string().required("How many would you like?")
    })

    const validateChange = event => {
        yup.reach(formSchema, event.target.name).validate(event.target.value).then(valid => {
            setErrors({...errors, [event.target.name]: "" });
        })
        .catch(err => {
            setErrors({...errors, [event.target.name]: err.errors[0]});
        })
    };

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        })
    }, [formState]);


    const formSubmit = event => {
        event.preventDefault();

        axios.post("https://reqres.in/api/users", formState)
            .then(res => {
                console.log(res)
                setPost(res.data);
                
                setFormState({
                    name:"",
                    size: "",
                    sauce: "",
                    chicken: false,
                    pepperoni: false,
                    sausage: false,
                    bellPeppers: false,
                    pineapple: false,
                    onions: false,
                    olives: false,
                    specialRequest: "",
                    quantity: ""
                });

                setServerError(null);
            })
            .catch(err => {
                setServerError("Error!", err)
            })
    }

    const changeHandler = event => {
        event.persist();

        const newFormData = {
            ...formState, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        }
        validateChange(event);
        setFormState(newFormData);
    }
    const Pre = styled.div`
    background-color: #00ffd0;
    text-align: justify;
    display: flex;
    justify-content: center;
    `;

    const Form = styled.div`
    display: flex;
    text-align: center;
    background-color: #2aa4af;
    width: 80%;
    margin: 0 auto;
    border: 5px solid #110c0c;
    flex-direction: column;
    `;

    return(
        <Form>
        <form onSubmit={formSubmit}>
            {serverError ? <p className="error">{serverError}</p> : null}
            <label htmlFor="name">
                Name for the order:
                <input data-cy="name" id="name" type="text" name="name" onChange={changeHandler} value={formState.name}/>
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>

            <label htmlFor="size">
                Size:
                <select data-cy="size"id="size" name="size" onChange={changeHandler}>
                    <option value="">"What size pizza would you like?</option>
                    <option value="small">Small</option>
                    <option value="medium">Meduim</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                </select>
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>

            <label htmlFor="sauce">
                Sauce:
                <select data-cy="sauce"id="sauce" name="sauce" onChange={changeHandler}>
                    <option value="">What sauce would you like on your Pizza?</option>
                    <option value="marinera">Marinera</option>
                    <option value="alfredo">Alfredo</option>
                    <option value="bbq">BBQ</option>
                    <option value="no-sauce">No-Sauce</option>
                </select>
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <div className="Toppings-section">
                <h2>Toppings</h2>
                
                <label htmlFor="chicken">
                    Chicken
                    <input data-cy="chicken"name="chicken" type="checkbox" checked={formState.chicken} onChange={changeHandler}/>
                </label>
                <label htmlFor="pepperoni">
                    Pepperoni
                    <input data-cy="pepperoni" name="pepperoni" type="checkbox" checked= {formState.pepperoni} onChange={changeHandler}/>
                </label>
                <label htmlFor="sausage">
                    Sausage
                    <input data-cy="sausage"name="sausage" type="checkbox" checked={formState.sausage} onChange={changeHandler}/>
                </label>
                <label htmlFor="bellPeppers">
                    Bell Peppers
                    <input data-cy="bellPeppers" name="bellPeppers" type="checkbox" checked={formState.bellPeppers} onChange={changeHandler}/>
                </label>
                <label htmlFor="pineapple">
                    Pineapple 
                    <input data-cy="pineapple" name="pineapple" type="checkbox" checked={formState.pineapple} onChange={changeHandler}/>
                </label>
                <label htmlFor="onions">
                    Onions 
                    <input data-cy="onions"name="onions" type="checkbox" checked={formState.onions} onChange={changeHandler}/>
                </label>
                <label htmlFor="olives">
                    Olives 
                    <input data-cy="olives"name="olives" type="checkbox" checked={formState.olives} onChange={changeHandler}/>
                </label>
            </div>

            <label htmlFor="specialRequest">
                Special Instructions:
                <textarea data-cy="specialRequest" name="specialRequest" onChange={changeHandler}/>
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlFor="quantity">
                <select data-cy="quantity" id="quantity" name="quantity" onChange={changeHandler}>
                    <option value="">How many pizzas would you like?</option>
                    <option value="one">1</option>
                    <option value="two">2</option>
                    <option value="three">3</option>
                    <option value="four">4</option>
                    <option value="five">5</option>
                    <option value="six">6</option>
                </select>  
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}                  
            </label>

            <Pre><pre>{JSON.stringify(post, null, 2)}</pre></Pre>
            <button type="submit" disabled={buttonDisabled}>Submit!</button>
            </form></Form>
    )
}
export default Form;