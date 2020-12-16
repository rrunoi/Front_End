import React from 'react';
import MUIDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    drawer: {
        width: "190px"
    }
});

const Drawer = props => {
    const { history } = props;
    const classes = useStyles();
    const itemsList = [
        {
            text: 'Customer',
            onClick: () => history.push('/CustomerList')
        },
        {
            text: 'Trainings',
            onClick: () => history.push('/TrainingList')
        }
    ];

    return (
        <BrowserRouter>
            <MUIDrawer variant="permanent" className={classes.drawer}>
                <List>
                    {itemsList.map((item, index) => {
                        const { text, onClick } = item;
                        return (
                            <ListItem button key={text} onClick={onClick}>
                                <ListItemText primary={text} />
                            </ListItem>
                        );
                    })}
                </List>
            </MUIDrawer>
        </BrowserRouter>
    );
};

export default withRouter(Drawer);