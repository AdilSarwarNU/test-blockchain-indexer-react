import React, {useContext, useEffect, useState} from 'react';
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
import TransactionComments from "../../../Components/TransactionComments";
import Container from "@material-ui/core/Container";
import {AppContext} from "../../../Contexts/AppContext";
import CommentForm from "../../../Components/CommentForm";
import Comments from "../../../Api/Comments";

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
    }

}));

export default withRouter(props => {
    const classes = useStyles();
    const theme = useTheme();
    const context = useContext(AppContext);
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

    const submit = ({body, transaction_id}) => {
        Comments.create(body, transaction_id, {token}).then(res => {
            refresh();
        }, err => {
            context.showMessage(err.message, {error: true});
        }).finally(() => {
        })
    };

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
                        <Tab label="Comment" {...a11yProps(1)} />
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
                        <CommentForm
                            data={data}
                            onPositiveAction={item => {
                                submit(item);
                            }}/>
                        <TransactionComments/>
                    </TabPanel>
                </SwipeableViews>
            </Container>

        </div>
    );
});
