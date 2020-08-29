import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {useCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import TransactionListing from "../../../Api/TransactionListing";
import UserConsts from "../../../constants/Auth/User";
import TextField from "@material-ui/core/TextField";
import TransactionComments from "../../../Components/TransactionComments";
import {Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        marginTop: '1%'
    },
    heading: {
        marginBottom: '3%'
    },
    tab: {
        flexGrow: 0
    },
    text: {
        marginLeft: '1%'
    },
    container: {
        flexDirection:"column",
        marginTop: 15,
        marginBottom: '3%'
    },
    textField:{
        flex:1,
        height: 65,
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        marginTop: '1%',
        width: 'fit-content'
    }

}));

export default withRouter(props => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [cookies, setCookie] = useCookies(UserConsts.USER_COOKIE);
    const token = cookies[UserConsts.JWT_TOKEN];
    const [data, setData] = useState({});

    const refresh = () => {
        TransactionListing.details(props.match.params.id, {token}).then(res => {
                setData(res.data.result)
            }
        ).finally(() => {
        });
    };

    useEffect(() => {
        refresh(data);
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const getTransactionDetail = (head, value) => (
        <Grid container spacing={3}>
            <Grid item xs={2}>
                <Typography><strong>{head}</strong></Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography>{value}</Typography>
            </Grid>
        </Grid>
    );

    return (
        <div className={classes.root}>
            <Grid>
                <Typography gutterBottom variant="h5" className={classes.text}>
                    Transaction detail
                </Typography>
            </Grid>
            <Divider variant="middle" className={classes.heading} />
            <Container maxWidth={"xl"}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Detail" {...a11yProps(0)} />
                        <Tab label="Comments" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        {getTransactionDetail('Transaction Hash:', data.hash)}
                        {getTransactionDetail('Block Number:', data.block_number)}
                        {getTransactionDetail('Block Hash:', data.blockHash)}
                        {getTransactionDetail('Timestamp:', data.time_stamp)}
                        {getTransactionDetail('From:', data.from)}
                        {getTransactionDetail('To:', data.to)}
                        {getTransactionDetail('Value:', data.value)}
                        {getTransactionDetail('Gas Price:', data.gas_price)}
                        {getTransactionDetail('Gas:', data.gas)}
                        {getTransactionDetail('Gas Used:', data.gas_used)}
                        {getTransactionDetail('Cumulative Gas Used:', data.cumulative_gas_used)}
                        {getTransactionDetail('Nonce:', data.nonce)}
                        {getTransactionDetail('IsError:', data.is_error)}
                        {getTransactionDetail('Txreceipt Status:', data.txreceipt_status)}
                        {getTransactionDetail('Input:', data.input)}
                        {getTransactionDetail('Contract Address:', data.contract_address)}
                        {getTransactionDetail('Confirmations:', data.confirmations)}
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Grid container className={classes.container}>
                            <TextField
                                className={classes.textField}
                                variant={"outlined"}
                                fullWidth
                                placeholder="Lets Discuss..."
                                multiline
                                rows={2}
                                rowsMax={4}
                            />
                            <Button variant="contained" color="primary" component="span" className={classes.button}>
                                Add Comment
                            </Button>
                        </Grid>
                        <TransactionComments/>
                    </TabPanel>
                </SwipeableViews>
            </Container>

        </div>
    );
});
