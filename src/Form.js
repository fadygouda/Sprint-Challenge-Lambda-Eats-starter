import React, { useState, useEffect } from "react"
import * as yup from "yup"
import axios from "axios"

const Form = () => {

    const firstFormState = {
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

    const [formState, setFormState] = useState(firstFormState);


    const formSubmit = event => {
        event.preventDefault();

        axios.post("order", formState)
            .then(res => {
                setPost(res.data);
                
                setFormState({
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
            })
    }

    const changeHandler = event => {
        event.persist();

        const newFormData = {
            ...formState, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        }
        setFormState(newFormData);
    }



    return(
        <form>

            <label htmlFor="size">
                Size:
                <select id="size" name="size" onChange={changeHandler}>
                    <option value="">"What size pizza would you like?</option>
                    <option value="small">Small</option>
                    <option value="medium">Meduim</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                </select>
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
            </label>
            <div className="Toppings-section">
                <h2>Toppings</h2>
                
                <label htmlFor="chicken">
                    Chicken
                    <input name="chicken" type="checkbox" checked={false} onChange={changeHandler}/>
                </label>
                <label htmlFor="pepperoni">
                    Pepperoni
                    <input name="pepperoni" type="checkbox" checked= {false} onChange={changeHandler}/>
                </label>
                <label htmlFor="sausage">
                    Sausage
                    <input name="sausage" type="checkbox" checked={false} onChange={changeHandler}/>
                </label>
                <label htmlFor="bellPeppers">
                    Bell Peppers
                    <input name="bellPeppers" type="checkbox" checked={false} onChange={changeHandler}/>
                </label>
                <label htmlFor="pineapple">
                    Pineapple 
                    <input name="pineapple" type="checkbox" checked={false} onChange={changeHandler}/>
                </label>
                <label htmlFor="onions">
                    Onions 
                    <input name="onions" type="checkbox" checked={false} onChange={changeHandler}/>
                </label>
                <label htmlFor="olives">
                    Olives 
                    <input name="olives" type="checkbox" checked={false} onChange={changeHandler}/>
                </label>
            </div>

            <label htmlFor="special">
                Special Instructions:
                <textarea name="special" onChange={changeHandler}/>
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
            </label>

            <button type="submit">Place Order</button>
        </form>
    )
}
export default Form;