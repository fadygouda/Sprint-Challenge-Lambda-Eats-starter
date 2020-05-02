import React, { useState, useEffect } from "react"
import * as yup from "yup"
import axios from "axios"

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
                setServerError("Error!")
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



    return(
        <form onSubmit={formSubmit}>
            {serverError ? <p className="error">{serverError}</p> : null}
            <label htmlFor="name">
                Name for the order:
                <input id="name" type="text" name="name" onChange={changeHandler} value={formState.name}/>
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>

            <label htmlFor="size">
                Size:
                <select id="size" name="size" onChange={changeHandler}>
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
                <select id="sauce" name="sauce" onChange={changeHandler}>
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
                    <input name="chicken" type="checkbox" checked={formState.chicken} onChange={changeHandler}/>
                </label>
                <label htmlFor="pepperoni">
                    Pepperoni
                    <input name="pepperoni" type="checkbox" checked= {formState.pepperoni} onChange={changeHandler}/>
                </label>
                <label htmlFor="sausage">
                    Sausage
                    <input name="sausage" type="checkbox" checked={formState.sausage} onChange={changeHandler}/>
                </label>
                <label htmlFor="bellPeppers">
                    Bell Peppers
                    <input name="bellPeppers" type="checkbox" checked={formState.bellPeppers} onChange={changeHandler}/>
                </label>
                <label htmlFor="pineapple">
                    Pineapple 
                    <input name="pineapple" type="checkbox" checked={formState.pineapple} onChange={changeHandler}/>
                </label>
                <label htmlFor="onions">
                    Onions 
                    <input name="onions" type="checkbox" checked={formState.onions} onChange={changeHandler}/>
                </label>
                <label htmlFor="olives">
                    Olives 
                    <input name="olives" type="checkbox" checked={formState.olives} onChange={changeHandler}/>
                </label>
            </div>

            <label htmlFor="specialRequest">
                Special Instructions:
                <textarea name="specialRequest" onChange={changeHandler}/>
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlFor="quantity">
                <select id="quantity" name="quantity" onChange={changeHandler}>
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

            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button type="submit" disabled={buttonDisabled}>Submit!</button>
        </form>
    )
}
export default Form;