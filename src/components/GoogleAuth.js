import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions/loginActions';
import {Link, Redirect} from 'react-router-dom';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import { FcGoogle } from 'react-icons/fc';


class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '364810501721-9s1tiuvckt8pl2e1ltrssff6jj4vhnr2.apps.googleusercontent.com',
                scope: 'email'
            }). then (() => {
                this.auth = window.gapi.auth2.getAuthInstance();

                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
          this.props.signIn(this.auth.currentUser.get().getId());
          <Redirect to="/" />
        } else {
          this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
        console.log("signing in");
      };

    onSignOutClick = () => {
        this.auth.signOut();
        console.log("signing out");
    }

    render (){
        if (this.props.isSignedIn === null) {
            return null;
          } else if (this.props.isSignedIn) {
            return (
              <div>You're already signed in!
                <button onClick={this.onSignOutClick} className="btn btn-lg btn-danger btn-block" type="submit">
                    <FcGoogle style={{fontSize: '30px'}} />Sign Out
                </button>
              </div>
            );
          } else {
            return (
              <button onClick={this.onSignInClick} className="btn btn-lg btn-light btn-block" type="submit">
                  <FcGoogle style={{fontSize: '30px'}} />oogle
              </button>
            );
        }
    }

}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
  };
  
  export default connect(
    mapStateToProps,
    { signIn, signOut }
  )(GoogleAuth);
  