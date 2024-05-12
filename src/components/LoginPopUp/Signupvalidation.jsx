function validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.name === "") {
        error.name = "Name should not be empty";
    } else {
        error.name = "";
    }

    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email did not match";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Please enter a valid password";
    } else {
        error.password = "";
    }

 // Validate confirm password
 if (values.confirmpassword === "") {
    error.confirmpassword = "Password should not be empty";
} 
else if (values.password !== values.confirmpassword) {
    error.confirmpassword = "Password did not match";
} else {
    error.confirmpassword = "";
}

if (values.phone === "") {
    error.phone = "Phone number should not be empty";
} else if (!/^\d{10}$/.test(values.phone)) {
    error.phone = "Phone number is not valid";
} else {
    error.phone = "";
}


    return error;
}


export default validation;
