import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

interface ProfileData {
    role: string;
    displayName: string;
    id: string;
}

const ProfileComponent: React.FC = () => {
    const [role, setRole] = useState<string | null>(null);
    const [displayName, setDisplayName] = useState<string | null>(null);
    const [profileId, setProfileId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            setError(null);
            setLoading(true);

            try {
                const response = await fetch('http://localhost:8080/api/me', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 401) {
                    navigate("/login");
                    return;
                }

                const parsedResponse: ProfileData = await response.json();
                setRole(parsedResponse.role);
                setDisplayName(parsedResponse.displayName);
                setProfileId(parsedResponse.id);
            } catch (err: any) {
                setError('Mogelijk is de server tijdelijk niet bereikbaar.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div>
                    <p>Role: {role}</p>
                    <p>Display Name: {displayName}</p>
                    <p>Profile ID: {profileId}</p>
                </div>
            )}
        </div>
    );
};

export default ProfileComponent;