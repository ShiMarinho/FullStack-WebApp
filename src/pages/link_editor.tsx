import * as React from "react";
import { withRouter } from "react-router";
import { getAuthToken } from "../components/with_auth/with_auth"


interface Link {
    id: number;
    userId: number;
    email: string;
    title: string;
    url: string;
    dateTime: string;
    commentCount: number | null;
    voteCount: number | null;
    
}

interface LinkEditorProps {
    id: string;
}

interface LinkEditorState {
    link: Link | null;
    newLink: Link | undefined
}

export class LinkDetailsInternal extends React.Component<LinkEditorProps, LinkEditorState> {
    public constructor(props: LinkEditorProps) {
        super(props);
        this.state = {
            link: null,
            newLink: undefined
        };
    }
    public componentWillMount() {
        (async () => {
            const data = await getData(this.props.id);
            this.setState({ link: data });
        })();
    }
    public render() {
       
            return <div>Loading...</div>;
      
    }
    private _renderEditor() {
        const token = getAuthToken();
        if (token) {
            return (
                <React.Fragment>
                    <div>
                        
                    </div>
                    <div>
                        <button
                           
                            style={{ width: "100%" }}
                            className="btn"
                        >
                            Submit
                        </button>
                    </div>
                </React.Fragment>
            );
        } else {
            return <div>Please Sign In if you wish to write a comment...</div>;
        }
    }
    
}

export const LinkEditor = withRouter(props => <LinkDetailsInternal id={props.match.params.id} />)
export const LinkCreation = withRouter(props => <LinkDetailsInternal id={props.match.params.id} />)

async function getData(id: string) {
    const response = await fetch(`/api/v1/links/${id}`);
    const json = await response.json();
    return json as Link;
}

async function editLink(linkId: number, content: string, jwt: string) {
    const update = {
        linkId: linkId,
        content: content
    };
    const response = await fetch(
        "/api/v1/link_editor",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            },
            body: JSON.stringify(update)
        }
    );
    const json = await response.json();
    return json;
}

