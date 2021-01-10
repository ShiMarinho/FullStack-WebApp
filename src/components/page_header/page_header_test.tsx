import * as React from "react";
import { Link } from "react-router-dom";
import { withAuth, getAuthToken } from "../with_auth/with_auth";
import { UserPreviewDetails } from "../user_details/user_details";


interface PageHeaderInternalProps {
    token: string | null;
}

interface PageHeaderInternalState {
    id: string | undefined;
    user: UserPreviewDetails[] | null;
}

class PageHeaderInternal extends React.Component<PageHeaderInternalProps, PageHeaderInternalState> {
    public constructor(props: PageHeaderInternalProps) {
        super(props);
        this.state = {
            user: null,
            id: undefined,
        };
    }
    public componentWillMount() {
        (async () => {
            if (this.state.id) {
                const user = await getData(this.state.id);
               
            } else {
               const token = getAuthToken();
                if (token && this.state.id) {
                    const user = await getData(this.state.id);
                    this.setState({ user: user });
                }
            }
        })();
    }public render() {
        return (
            <div className="top-navbar">
                <div className="container">
                    <Link className="left" to="/">Links</Link>
                    {this._renderLoginOrProfile()}
                </div>
            </div>
        );
    }
    private _renderLoginOrProfile() {
        if (this.props.token) {
        return <Link className="btn right" to="/profile ">User Profile  </Link>
        } else {
            return <React.Fragment>
                <Link className="btn right" to="/sign_in">Sign In</Link>
                <Link className="btn right" to="/sign_up">Sign Up</Link>
                    </React.Fragment>
        }
    }
}

export const PageHeader = withAuth(props => <PageHeaderInternal token={props.authToken} />)

async function getData(id: string) {
    const response = await fetch(`/api/v1/profile/${id}`);
    const json = await response.json();
    return json as UserPreviewDetails[];
}