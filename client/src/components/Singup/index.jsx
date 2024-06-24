import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        email: "",
        password: "",
        mobile: "",
        dept: "",
        gender: "",
    });
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateMobile = (mobile) => {
        const mobileRegex = new RegExp("^\\d{10}$");
        return mobileRegex.test(mobile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data being submitted:", JSON.stringify(data, null, 2));

        if (!validateMobile(data.mobile)) {
            setError("Mobile number must be a 10-digit number");
            return;
        }

        try {
            const url = "http://localhost:8080/api/users";
            const { data: res } = await axios.post(url, data);
            setMsg(res.message);
            console.log("Signup response:", res);
        } catch (error) {
            console.log("Signup error:", error.response);
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Sign In
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="Name"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <div className={styles.password_field}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className={styles.password_toggle}
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Mobile Number"
                            name="mobile"
                            onChange={handleChange}
                            value={data.mobile}
                            required
                            className={styles.input}
                        />
                        <select
                            name="dept"
                            onChange={handleChange}
                            value={data.dept}
                            required
                            className={styles.input}
                        >
                            <option value="">Select your department</option>
                            <option value="Accountant">ACCOUNTANT</option>
                            <option value="Material Procure">MATERIAL PROCURE</option>
                            <option value="warehouse">WAREHOUSE</option>
                            <option value="operation">OPERATION</option>
                        </select>
                        <select
                            name="gender"
                            onChange={handleChange}
                            value={data.gender}
                            required
                            className={styles.input}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        {msg && <div className={styles.success_msg}>{msg}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
