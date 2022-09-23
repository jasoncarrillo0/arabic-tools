import { useAuth } from 'src/contexts/AuthContext';

const ProfileInfo = () => {
    const { currUser } = useAuth();
    const { email, metadata } = currUser!;

    return (
        <div>
            <div>
                <span>Email: </span><span>{email}</span>
            </div>
            <div>
                <span>Created: </span><span>{metadata.creationTime}</span>
            </div>
        </div>
    );
};

export default ProfileInfo;