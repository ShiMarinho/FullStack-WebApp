import * as React from "react";
import { getAuthToken } from "../components/with_auth/with_auth";
import { withRouter } from "react-router";
import { UserPreviewDetails } from "../components/user_details/user_details";
import { Links } from "./links";

interface UserData{
    email: string;
    pic: string;
    bio: string;
    links: Links[];
    comments: Comment[];
}


interface ProfileProps {
    id: string | undefined;
}

interface ProfileState {
    user: UserPreviewDetails[] | null;
}

export class ProfileInternal extends React.Component<ProfileProps, ProfileState> {
    public constructor(props: ProfileProps) {
        super(props);
        this.state = {
            user: null
        };
    }
    public componentWillMount() {
        (async () => {
            if (this.props.id) {
                const user = await getUser(this.props.id);
                this.setState({ user: user });
            } else {
                const token = getAuthToken();
                if (token) {
                    const user = await getProfile(token);
                    this.setState({ user: user });
                }
            }
        })();
    }
    public render() {
        if (this.state.user === null) {
            return <div>Loading...</div>;
        } else {
            return <div>
             
            </div>
        }
    }
}

export const Profile = withRouter(props => <ProfileInternal id={props.match.params.id} />);

async function getProfile(token: string) {
    const reponse = await fetch(
        "/api/v1/auth/profile",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            }
        }
    );
    const json = await reponse.json();
    return json;
}

async function getUser(id: string) {
    const reponse = await fetch(
        `/api/v1/auth/profile/${id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    const json = await reponse.json();
    return json;
}
