import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: {},
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        axios
            .get(
                `https://jsonplaceholder.typicode.com/comments?postId=${this.props.id}`
            )
            .then(resp => {
                this.setState({ comments: resp.data });
                console.log('is there2', resp);
            });
    };

    render() {
        return (
            <div>
                <List>
                    {this.comments.map(item => {
                        return (
                            <ListItemText
                                key={item.id}
                                primary={item.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            {item.email}
                                        </Typography>
                                        {item.body}
                                    </React.Fragment>
                                }
                            >
                                <Divider variant="inset" component="li" />
                            </ListItemText>
                        );
                    })}
                </List>
            </div>
        );
    }
}
export default CommentList;