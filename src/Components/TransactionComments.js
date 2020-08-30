import {withRouter} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import React, {useEffect, useState} from "react";
import TransactionListing from "../Api/TransactionListing";
import {useCookies} from "react-cookie";
import UserConsts from "../constants/Auth/User";
import Typography from "@material-ui/core/Typography";
import Comments from "../Api/Comments";

const TransactionComments = props => {
    const [data, setCommentData] = useState([]);
    const [cookies, setCookie] = useCookies(UserConsts.USER_COOKIE);
    const token = cookies[UserConsts.JWT_TOKEN];

    const refresh = (data) => {
        Comments.list(props.match.params.id, {token}).then(res => {
            setCommentData(res.data)
        }).finally(() => {
        });
    };

    useEffect(() => {
        refresh(data);
    }, []);

    return (
        <div>
            {
                data.map(item => (
                    <Paper style={{padding: "40px 20px", marginBottom: '1%'}}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{margin: 0, textAlign: "left"}}>Michel Michel</h4>
                                <Typography style={{textAlign: "left"}}>{item.body}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                ))
            }
        </div>
    )
};
export default withRouter(TransactionComments);
