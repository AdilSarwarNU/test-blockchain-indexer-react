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
    const [value, setValue] = React.useState(0);
    const [cookies, setCookie] = useCookies(UserConsts.USER_COOKIE);
    const token = cookies[UserConsts.JWT_TOKEN];
    const [data, setData] = useState({});

    const refresh = (data) => {
        TransactionListing.details(props.match.params.id, {token}).then(res => {
            console.log(res)
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

    console.log("There you go");
    const getStatsItem = (head, value) => (
        console.log(value),
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
                    {getStatsItem('Hash:', data.hash)}
                    {getStatsItem('Block Number:', data.block_number)}
                    {getStatsItem('Block Hash:', data.blockHash)}
                    {getStatsItem('From:', data.from)}
                    {getStatsItem('To:', data.to)}
                    {getStatsItem('Value:', data.value)}
                    {getStatsItem('Time Stamp:', data.time_stamp)}
                    {getStatsItem('Nonce:', data.nonce)}
                    {getStatsItem('Gas:', data.gas)}
                    {getStatsItem('Gas Price:', data.gas_price)}
                    {getStatsItem('Gas Used:', data.gas_used)}
                    {getStatsItem('Cumulative Gas Used:', data.cumulative_gas_used)}
                    {getStatsItem('IsError:', data.is_error)}
                    {getStatsItem('Txreceipt Status:', data.txreceipt_status)}
                    {getStatsItem('Input:', data.input)}
                    {getStatsItem('Contract Address:', data.contract_address)}
                    {getStatsItem('Confirmations:', data.confirmations)}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Item Two
                </TabPanel>
            </SwipeableViews>
        </div>
    );
});
