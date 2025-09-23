import React, {useState, FormEvent} from 'react';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);


        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!email || !password) {
            setError("Email en/of wachtwoord ontbreekt!");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: "POST",
                "credentials": "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password})
            });

            if (response.status == 401){
                setError("Ongeldige inloggegevens.");
            }
            else if (response.status == 403) {
                setError("U heeft niet de juiste rechten.");
            }
            else if (!response.ok) {
                setError("Er ging iets fout.")
            }
            else {
                navigate("/homepage");
            }
        } catch (err: any) {
            setError("Mogelijk is de server tijdelijk niet bereikbaar.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <form id="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input id="email" name="email" placeholder="iemand@voorbeeld.com" type="text" disabled={loading}/>
            <br/>
            <label htmlFor="password">Password: </label>
            <input id="password" type="password" name="password" disabled={loading}/>
            <br/>
            <button type="submit" disabled={loading}>{loading ? "logging in..." : "Login"}</button>
            {error && (
                <p style={{ color: "red", marginTop: "10px" }} >
                    {error}
                </p>
            )}
        </form>
    );
}
export default LoginComponent;