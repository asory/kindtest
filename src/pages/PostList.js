import React from 'react';
import NavBar from '../Components/navBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import { Button, CardContent, CardActions, Card } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: {},
            isLoading: true,
            error: false,
            user: {},
        };
    }

    loadData = () => {
        axios
            .get(
                `https:jsonplaceholder.typicode.com/users/${this.state.user.id}/posts`
            )
            .then(response => {
                this.setState({
                    posts: response.data,
                    isLoading: false,
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoading: false,
                    error: true,
                });
            });
    };

    componentDidMount() {
        const user = localStorage.getItem('user');
        this.setState({ user });
        this.loadData();
    }

    render() {
        const { isLoading, error } = this.state;

        if (isLoading) {
            return <h1>Loading ...</h1>;
        }
        if (error) {
            return (
                <div>
                    <NavBar />
                    <h1 padding={'12%'}>
                        There was an error loading . ヾ"("＾∇＾")"
                        <button onClick={this.loadData}>Try again</button>
                    </h1>
                </div>
            );
        }
        return (
            <div>
                <NavBar props={this.props} />
                <List style={{ maxWidth: '50%', margin: 'auto' }}>
                    {this.state.posts.map(post => {
                        return (
                            <ListItem key={post.id} alignItems="center">
                                <Card>
                                    <CardContent>
                                        <Typography
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            {this.state.user.username}{' '}
                                        </Typography>
                                        <Typography variant="h5" component="h2" style={{textAlign:"center"}}>
                                            {post.title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            component="p"
                                        >
                                            {post.body}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color= "primary">Comments</Button>
                                    </CardActions>
                                </Card>

                                <Divider variant="inset" component="li" />
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
}

export default PostList;
