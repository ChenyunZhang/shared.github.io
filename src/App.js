import HomepageImg from "./Components/HomepageImg";
import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import NotFound from "./Components/NotFound";
import UserProfile from "./Components/UserProfile";
import UserHome from "./Components/UserHome";
import Followeds from "./Components/FollowedHouse";
import Myposts from "./Components/MyPost"

class App extends React.Component {
  state = {
    id: 0,
    username: "",
    email: "",
    token: "",
    error: "",
    like: [],
    avatar: "",
    location: "",
    gender: "",
    posts:[],
    search: "",
    followed_people: [],
    relationship_arr: [],
    renderUser: null
  };

  componentDidMount() {
    if (localStorage.token) {
      fetch("https://shared-backend.herokuapp.com/users/keep_logged_in", {
        method: "GET",
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then(this.helpHandleResponse);
    }
  }

  handleLoginSubmit = (userInfo) => {
    if (!userInfo.username) {
      fetch("https://shared-backend.herokuapp.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
        }),
      })
        .then((res) => res.json())
        .then(this.helpHandleResponse);
    } else {
      fetch("https://shared-backend.herokuapp.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          username: userInfo.username,
          password: userInfo.password,
          email: userInfo.email,
        }),
      })
        .then((res) => res.json())
        .then(this.helpHandleResponse);
    }
  };

  helpHandleResponse = (resp) => {
    if (resp.error) {
      this.setState({
        error: resp.error,
      });
      this.props.history.push("/login");
    } else {
      localStorage.token = resp.token;
      // console.log(resp.user)
      this.setState({
        id: resp.user.id,
        username: resp.user.username,
        email: resp.user.email,
        like: resp.user.likes,
        followed_people: resp.user.followeds,
        relationship_arr: resp.user.followers,
        token: resp.token,
        posts: resp.user.posts,
        error: "",
        post: resp.user.posts,
        gender: resp.user.gender,
        location: resp.user.location,
        avatar: resp.user.avatar,
      });
      this.props.history.push("/home");
    }
  };

  handleLogOut = () => {
    this.setState({
      id: 0,
      username: "",
      email: "",
      token: "",
    });
    localStorage.clear();
  };

  getUser = () =>{
    
  }

  // ###################################################################################
  addFollower = (newRelationship) => {
    // console.log(newRelationship.followed_id)
    fetch("https://shared-backend.herokuapp.com/users")
      .then((r) => r.json())
      .then((userArr) => {
        const new_being_followed_user = userArr.filter(
          (user) => user.id === newRelationship.followed_id
        );

        const new_followed_people_array = [
          new_being_followed_user[0],
          ...this.state.followed_people,
        ];
        this.setState({
          followed_people: new_followed_people_array,
        });
      });

    const newRelationshipArr = [
      newRelationship,
      ...this.state.relationship_arr,
    ];
    this.setState({
      relationship_arr: newRelationshipArr,
    });
  };


  deleteFollower = (deleteRelationshipObj) => {
    // console.log(deleteRelationshipObj)
    fetch("http://localhost:3000/users")
    .then((r) => r.json())
    .then((userArr) => {
      const new_being_followed_user = userArr.filter(
        (user) => user.id === deleteRelationshipObj.followed_id
      );

      const remove_followed_person_array = this.state.followed_people.filter(followed_user =>
        new_being_followed_user[0].id !== followed_user.id
        )
      // console.log(remove_followed_person_array)
      this.setState({
        followed_people: remove_followed_person_array
      });
    });
  };

  renderUserHome = () => {
    if (!!this.state.token) {
      return (
        <UserHome
          username={this.state.username}
          id={this.state.id}
          email={this.state.email}
          token={this.state.token}
          avatar={this.state.avatar}
          like={this.state.like}
          location={this.state.location}
          gender={this.state.gender}
          followed={this.state.followed_people}
          relationship={this.state.relationship_arr}
          handleLogOut={this.handleLogOut}
          addFollower={this.addFollower}
          deleteFollower={this.deleteFollower}
        />
      );
    } else {
      return <Redirect to="/" />;
    }
  };

  handleError = () => {
    this.setState({
      error: "",
    });
  };

  handleUserUpdate = (updatedUser) => {
    // console.log(updatedUser)
    this.setState({
      username: updatedUser.username,
      email: updatedUser.email,
      location: updatedUser.location,
      gender: updatedUser.gender,
      error: "Updated Successfully",
    });
    alert("updated successfully");
  };

  // renderInfomation= (clicked) =>{
  //   console.log(clicked.user)
  //   this.setState({
  //     renderUser: clicked
  //   })
  // }

  changeSearchTerm = (newSearchTerm) => {
    this.setState({
      search: newSearchTerm
    })
  };



  render() {
    return (
      <Switch>
        <Route exact path="/">
          <HomepageImg />
        </Route>
        <Route exact path="/followeds">
          <Followeds 
          followed_people={this.state.followed_people} 
          deleteFollower={this.deleteFollower}
          currentUserName = {this.state.username}
          relationship={this.state.relationship_arr}
          changeSearchTerm={this.changeSearchTerm}
          search={this.state.search}
          handleLogOut={this.handleLogOut}
          // renderUser={this.state.renderUser}
          // renderInfomation={this.renderInfomation}
          />
        </Route>
        <Route exact path="/home" render={this.renderUserHome} />
        <Route exact path="/myposts">
          <Myposts
            username={this.state.username}
            id={this.state.id}
            email={this.state.email}
            token={this.state.token}
            avatar={this.state.avatar}
            like={this.state.like}
            posts={this.state.posts}
            handleLogOut={this.handleLogOut}
            location={this.state.location}
            followed={this.state.followed_people}
            relationship={this.state.relationship_arr}
           />
        </Route>
        
        <Route exact path="/profile">
          <UserProfile
            username={this.state.username}
            id={this.state.id}
            location={this.state.location}
            email={this.state.email}
            gender={this.state.gender}
            token={this.state.token}
            error={this.state.error}
            handleError={this.handleError}
            handleLogOut={this.handleLogOut}
            handleUserUpdate={this.handleUserUpdate}
          />
        </Route>
        <Route exact path="/login">
          <LoginForm
            handleLoginSubmit={this.handleLoginSubmit}
            error={this.state.error}
            handleError={this.handleError}
          />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    );
  }
}

let magic = withRouter(App);
export default magic;
