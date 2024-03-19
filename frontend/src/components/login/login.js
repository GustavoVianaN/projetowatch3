import { useState, useEffect } from "react";
import { Enviroment } from "../../enviroment";
import { useNavigate } from "react-router-dom";
function Login() {
    const initialValues = {
        email: "",
        password: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    function calltheapi(values) {
        const url = `${Enviroment.REACT_APP_API_URL}/auth`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user": values.email,
                "password": values.password
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('keycloak_token', data.access_token)
                navigate('/')
            })
            .catch(error => {
                console.error('Houve um problema com sua requisição fetch:', error);
            });
    }

    useEffect(() => {

        if (Object.keys(formErrors).length === 0 && isSubmit) {

        }
    }, [formErrors, formValues, isSubmit]);
    var navigate = useNavigate();

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email || !values.password) {
            if (!values.email) {
                errors.email = "user is required!";
            }
            if (!values.password) {
                errors.password = "Password is required";
            }
        }
        else {
            calltheapi(values)
        }

        return errors;
    };


    useEffect(() => {
        document.body.style.background = 'url(https://assets.propmark.com.br/uploads/2023/05/Op--o-1.png) no-repeat center center';
        document.body.style.backgroundSize = 'cover';
        document.body.style.height = '100%';

        // Quando o componente for desmontado, limpe o estilo para não afetar outras páginas.
        return () => {
            document.body.style.background = '';
            document.body.style.backgroundSize = '';
            document.body.style.height = '';
        };
    }, []);

    return (
        <>
            <div></div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                maxWidth: '500px',
                width: '100%',
                margin: 'auto',
            }}>
                {Object.keys(formErrors).length === 0 && isSubmit ? (
                    <div className="ui message success">
                        Erro no login, senha ou usuario incorreto
                    </div>
                ) : (
                    console.log('')
                )}

                <form onSubmit={handleSubmit} style={{
                    width: '70%',
                    border: '1px solid #dfdfdf',
                    padding: '20px',
                    borderRadius: '5px',
                    background: 'rgba(255, 255, 255, 0.4)',
                    textAlign: 'center'

                }}>
                    <h1 style={{ marginBottom: '10px' }}>Login</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">

                        <div className="field">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleChange}
                                style={{
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    borderRadius: '1%',
                                    marginBottom: '10px',
                                    width: '100%',
                                    textAlign: 'center'
                                }}
                            />
                        </div>
                        <p style={{ color: 'rgb(255, 0, 0)' }}>{formErrors.email}</p>
                        <div className="field">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                                style={{
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    borderRadius: '1%',
                                    marginBottom: '10px',
                                    width: '100%',
                                    textAlign: 'center'


                                }}
                            />
                        </div>
                        <p style={{ color: 'rgb(255, 0, 0)' }}>{formErrors.password}</p>

                        <p style={{ color: 'rgb(255, 0, 0)' }}>{formErrors.confirmPassword}</p>
                        <button
                            style={{
                                background: '#05b462',
                                padding: '5px',
                                borderRadius: '10px',
                                width: '100%'
                            }}>Submit</button>
                    </div>
                </form>

            </div>
        </>

    );
}

export default Login;