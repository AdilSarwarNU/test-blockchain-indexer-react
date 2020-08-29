import React, {useCallback, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {withRouter, useLocation} from "react-router-dom";
import {useCookies} from "react-cookie";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TransactionListing from "../../Api/TransactionListing";
import * as _ from 'underscore';
import TextField from "@material-ui/core/TextField";
import UserConsts from "../../constants/Auth/User";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const columns = [
    { id: 'hash', label: 'Hash', minWidth: 170 },
    { id: 'block_number', label: 'Block', minWidth: 100 },
    {
        id: 'blockHash',
        label: 'Block\u00a0Hash',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'from',
        label: 'From',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'to',
        label: 'To',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'value',
        label: 'Value',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'transaction_index',
        label: 'Index',
        minWidth: 170,
        align: 'left',
    }
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: '100%',
    },
    margin: {
        margin: theme.spacing(1),
        marginBottom: '4%',
        marginTop: '2%',
    },
    Input: {
        margin: theme.spacing(1),
        marginTop: '4%',
        marginLeft: '2%',
        marginRight: '10%',
        width: '35%'
    },
    text: {
        marginLeft: '2%'
    }
}));

export default withRouter(props => {
    const PER_PAGE = 30;
    const queryParams = useQuery();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [cookies, setCookie] = useCookies(UserConsts.USER_COOKIE);
    const [loading, setLoading] = useState(true);


    const refresh = (data) => {
        TransactionListing.list({
            token: cookies[UserConsts.JWT_TOKEN],
            q: data.query,
            page: parseInt(data.page ? data.page : '1'),
            per_page: PER_PAGE,
        }).then(res => {
            setData(res.data.result.value);
        }, err => {

        }).finally(() => {
            setLoading(false)
        })
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const render = () => {
        props.history.push('/transaction')
    };

    const refreshDebounce = useCallback(_.debounce(data => refresh(data), 1000), []);

    useEffect(() => {
        setData([]);
        setLoading(true);
        refreshDebounce({query, page: parseInt(queryParams.get('page'))})
    }, [query, parseInt(queryParams.get('page'))]);

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Grid className={classes.margin}>
                    <Grid item xs>
                        <Typography gutterBottom variant="h5" className={classes.text}>
                            Transactions
                        </Typography>
                    </Grid>
                    <Divider variant="middle"/>
                    <Grid item xs>
                        <TextField
                            id="standard-full-width"
                            label="To/From"
                            className={classes.Input}
                            placeholder="Token..."
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead className={classes.container}>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
                            return (
                                <TableRow hover tabIndex={-1} key={key.toString()}
                                          onClick={() =>  {props.history.push({
                                              pathname: `/transaction/${row.id}`,
                                              state: {
                                                  ...row
                                              }
                                          })}}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })
                                    }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
});
