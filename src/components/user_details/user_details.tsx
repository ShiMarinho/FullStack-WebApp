import React from 'react';
import { Links } from '../../pages/links';
import { Listview } from '../listview/listview';
import { withRouter } from 'react-router';

export interface UserPreviewDetails {
    email: string;
    pic: string;
    bio: string;
    links: Links[];
    comments: Comment[];
}

interface UserDetailsProps extends UserPreviewDetails {
    id: string;
}

interface UserDetailsState {
    user: UserPreviewDetails | null;

}

export class UserDetailsInternal extends React.Component<UserDetailsProps, UserDetailsState> {
    public constructor(props: UserDetailsProps) {
        super(props);
        this.state = {
            user: null,

        };
    }
    public componentWillMount() {
        (async () => {
            const data = await getData(this.props.id);
            this.setState({ user: data });
        })();
    }
    public render() {
        if (this.state.user === null) {
            return <div>Loading...</div>;
        } else {

            return (
                <table className="user-details">
                    <tbody>
                        <tr>
                            <td className="left">
                                <Listview
                                    items={
                                        this.props.links.map(link => <div>
                                            <h3>{this.props.links}</h3>
                                        </div>)
                                    }
                                ></Listview>
                                <Listview
                                    items={
                                        this.props.comments.map(comment => <div>
                                            <p>{this.props.comments}</p>
                                        </div>)
                                    }

                                />
                                />
                        </td>
                            <td className="profile">
                                <img src={this.props.pic} />
                                <div>{this.props.email}</div>
                                <div>{this.props.bio}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            );
        }
    }


}

//export const UserDetails = withRouter(props => <UserDetailsInternal id={props.match.params.id} email={props.match.params.email} pic={props.match.params.pic} bio={props.match.params.bio} links={props.match.params.links} />)


async function getData(id: string) {
    const response = await fetch(`/api/v1/profile/${id}`);
    const json = await response.json();
    return json as UserPreviewDetails;
}
