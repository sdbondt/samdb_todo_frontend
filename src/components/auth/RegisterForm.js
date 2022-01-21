import React, { useRef } from 'react'


const RegisterForm = (props) => {
    const { setToken, setIsLoggedIn, setUser, setError } = props

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef= useRef()
    const confirmPasswordRef = useRef()
    const genderRef = useRef()
    const dateRef = useRef()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const obj = {
                email: emailRef.current.value,
                name: nameRef.current.value,
                password: passwordRef.current.value
            }
            console.log(passwordRef.current.value)
            
            if (genderRef.current.value) {
                obj.gender = genderRef.current.value
            }

            if (dateRef.current.value) {
                obj.dob = dateRef.current.value
            }

            const responseData = await fetch('http://localhost:5000/api/auth/register',
                {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(responseData)
            const data = await responseData.json()
            if (!data.ok) {
                throw new Error(data.message)
            }
            const { user, token } = data
            setToken(token)
            setIsLoggedIn(true)
            setUser(user)
            localStorage.setItem('userdata', JSON.stringify({ user, token }))
        } catch (e) {
           setError(e.message || 'Something went wrong.')
        }
    }

    return (
        <div>
            <h2>No account yet? Sign up.</h2>  
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Name</label><br />
                <input type="text" id="name" ref={nameRef} /><br />
                <label htmlFor="email">Email</label><br />
                <input type="email" id="email" ref={emailRef} /><br />
                <label htmlFor="password">Password</label><br />
                <input type="password" id="password" ref={passwordRef} /><br />
                <label htmlFor="confirmpassword">Confirm your password</label><br />
                <input type="password" id="confirmpassword" ref={confirmPasswordRef} /><br />
                <select name="gender" id="gender" ref={genderRef}>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="UNKNOWN">I prefer not to say</option>
                </select><br />
                <label htmlFor="dob">Date of Birth</label><br />
                <input type="date" id="dob" ref={dateRef} /><br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterForm
