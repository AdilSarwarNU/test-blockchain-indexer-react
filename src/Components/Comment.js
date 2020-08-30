import React, {useState, useEffect, useContext} from "react";
import { withRouter } from "react-router-dom";
import {useCookies} from "react-cookie";
import UserConsts from "../constants/Auth/User";
import {AppContext} from "../Contexts/AppContext";
import Comments from "../Api/Comments";
import CommentForm from "./CommentForm";

const Comment = props => {
    const [cookies, setCookie] = useCookies(UserConsts.USER_COOKIE);
    const context = useContext(AppContext);

    const [data, setData] = useState([]);
    const token = cookies[UserConsts.JWT_TOKEN];

    const refresh = () => {
        Comments.list(props.match.params.id, {token}).then(res => {
            setData(res.data);
        }, err => {
            console.log("Comment List", err)
        }).finally(() => {

        })
    };

    useEffect(() => {
        refresh();
    }, []);

    const submit = ({body, transaction_id}) => {
        Comments.create(body, transaction_id, {token}).then(res => {
            refresh();
        }, err => {
            console.log(err.message)
            context.showMessage(err.message, {error: true});
        }).finally(() => {
        })
    };

    return (
        <div className="animated fadeIn">
            <CommentForm
                data={data}
                onPositiveAction={item => {
                    submit(item);
                    console.log("Comment:", item);
                }}/>
        </div>
    );
};
export default withRouter(Comment)
