import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    container: {
        flexDirection: "column",
        marginTop: 15,
        marginBottom: '3%'
    },
    textField: {
        flex: 1,
        height: 65,
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        marginTop: '1%',
        width: 'fit-content'
    }
}));


const CommentForm = props => {
    const classes = useStyles();

    const [body, setBody] = useState("");
    const [transaction_id, setTransaction] = useState(props.transaction_id);

    useEffect(() => {
        setBody(props.body);
        setTransaction(props.data.id);
    }, [props.body, props.transaction_id]);

    const onSubmit = event => {
        event.preventDefault();
        props.onPositiveAction({body, transaction_id})
};

    return(
        <form onSubmit={onSubmit}>
            <Grid container className={classes.container}>
                <TextField
                    className={classes.textField}
                    variant={"outlined"}
                    fullWidth
                    placeholder="Lets Discuss..."
                    multiline
                    rows={2}
                    rowsMax={4}
                    onChange={e => setBody(e.target.value)}
                    value={body}
                />
                <Button variant="contained" color="primary" component="span" className={classes.button} type="submit" onClick={(e) => {
                    e.preventDefault();
                    onSubmit(e)
                }}>
                    Add Comment
                </Button>
            </Grid>
        </form>
    )
};

CommentForm.propTypes = {
    id: PropTypes.string,
    transaction_id: PropTypes.string,
    body: PropTypes.string,
    onPositiveAction: PropTypes.func,
};

CommentForm.defaultProps = {
    onPositiveAction: () => {},
    data: {}
};

export default CommentForm;
