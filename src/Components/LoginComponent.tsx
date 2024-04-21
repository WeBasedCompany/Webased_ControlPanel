import { useContext, useEffect, useRef, useState } from 'react';
import { LoginContext, UserContext } from './Context';
import '../Styling/LoginComponent.css';


function Checkshit(setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string | null>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setUser: React.Dispatch<React.SetStateAction<any>>,form: HTMLFormElement) {
    const getDataFromFromDB = async (form: HTMLFormElement) => {
        const formData = new FormData(form);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        setLoading(true);
        try{
            const user = await fetch('http://localhost:8080/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": username, "password": password }),
            });

            const res = (await user.json());
            const userResponse = {
                username: username,
                isAuthenticated: res.logIn.isAuthenticated,
                companyName: res.logIn.companyName,
            };

            setIsLoggedIn(userResponse.isAuthenticated);
            setUser(res.user);
            
            } catch (e: any){
                setError("There was an error: " + e.toString());
            } finally {
                setLoading(false);
            }
        }
        getDataFromFromDB(form);
    }

const LoginPanel = ({...props}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const { user, setUser } = useContext(UserContext); 

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        document.getElementById("loginForm")?.addEventListener("submit", (e) => {
            e.preventDefault();
            Checkshit(setIsLoggedIn, setError, setIsLoading, setUser, e.target as HTMLFormElement);
        });
    })
   
    return (
        <div className="LoginWrapper">
            <div>
                <form id="loginForm" ref={formRef}>
                    {isLoading ? <p>Loading</p> : error ?  <p>{error}</p> : null}
                    <label>Username</label>
                    <input type="text" name="username" id="username" />
                    <label>Password</label>
                    <input type="password" name="password" id="password" />
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    )
}

export const LogOutPanel = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

    return (
        <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
    )
}

function LoginComponent() {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const { user, setUser } = useContext(UserContext); 

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    return( 
        <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {!isLoggedIn ? 
                <LoginPanel setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setUser={setUser}/>
                    : 
                <LogOutPanel />
            }
        </LoginContext.Provider>
    )
}

export default LoginComponent;