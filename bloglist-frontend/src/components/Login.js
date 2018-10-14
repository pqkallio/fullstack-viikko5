import React from 'react'

const Login = ({ username, password, handleLoginFieldChange, handleSubmit }) => (
    <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor='username'>
                                username:
                            </label>
                        </td>
                        <td>
                            <input 
                                type='text' 
                                name='username' 
                                id='username' 
                                value={username} 
                                onChange={handleLoginFieldChange} 
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='password'>
                                password:
                            </label>
                        </td>
                        <td>
                            <input 
                                type='password' 
                                name='password' 
                                id='password' 
                                value={password} 
                                onChange={handleLoginFieldChange} 
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type='submit'>Login</button>
        </form>
    </div>
)

export default Login