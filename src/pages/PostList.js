import React from 'react';
import NavBar from '../Components/navBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import { format } from 'date-fns';
import API from '../api';

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: {},
            isLoading: true,
            error: false,
        };
    }

    loadData = () => {
        axios
            .get('https://jsonplaceholder.typicode.com/users/1/posts', {
                userId: this.props.userId,
            })
            .then(response => {
                this.setState({
                    Post: response.data,
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
        const { isLoading, error, posts } = this.state;

        if (isLoading) {
            return <h1>Loading ...</h1>;
        }
        if (error) {
            return (
                <div>
                    <NavBar />
                    <h1>
                        There was an error loading . ヾ"("＾∇＾")"
                        <button onClick={this.loadData}>Try again</button>
                    </h1>
                </div>
            );
        }
        return (
            <div>
                <NavBar props={this.props} />
                <List>
                    {this.state.persons.map(posts => {
                        return (
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={posts.title}
                                    secondary={posts.body}
                                />
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
