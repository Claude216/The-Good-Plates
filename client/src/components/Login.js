import React, { useState } from 'react';
import { ApolloCache, ApolloClient, gql, useMutation, useQuery } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';
import "./css/Home.css";

const Login = (recprops) => {
  const [formState, setFormState] = useState({
    login: 0,
    email: '',
    password: '',
    name: '',
    error: 0
  });

  const SIGNUP_MUTATION = gql`
  mutation signupMutation(
    $email: String!,
    $name: String!,
    $password: String!,
    $restaurants: String
  ) {
    signup(
      email: $email,
      name: $name,
      password: $password,
      restaurants: $restaurants
    ) {
      user {
        name
        email
        restaurants
      }
    }
  }
  
  `;

  const LOGIN_MUTATION = gql`
    mutation LoginMutation(
      $email: String!
      $password: String!
    ) {
      login(email: $email, password: $password) {
        token
        user {
          name
          email
        }
      }
    }
  `;

  const DELETE_MUTATION = gql`
  mutation deleteMutation(
    $email: String!
    $password: String!
  ) {
    remove(email: $email, password: $password) {
      name
      email
    }
  }`

  // const GET_LIST = gql`
  // mutation getList(
  //   $email: String!
  // ) {
  //   get_list(email: $email) {
  //     list {
  //       name
  //       image
  //       address
  //       city
  //       state
  //       zip
  //     }
  //   }
  // }`

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
    },
    onError: () => {
      alert('Incorrect username/password!');
    }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
      restaurants: ""
    },
    onCompleted: ({ signup }) => {
      console.log(formState.name);
      console.log(formState.email);
      console.log(formState.password);
      localStorage.setItem(AUTH_TOKEN, signup.token);
    },
    onError: () => {
      formState.error = 1
    }
  });

  const [remove] = useMutation(DELETE_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: () => {
      localStorage.removeItem(AUTH_TOKEN);
    },
    onError: () => {
      alert("This account has been deleted");
    }
  });

  function login_enter() {
    login()
      .then(({data}) => {
        setFormState({
          ...formState,
          login: 2,
          name: data.login.user.name
        });
        set_info([data.login.user.email, data.login.user.name]);
      })
      .catch(e => {
        setFormState({
          login: 0,
          email: '',
          password: '',
          name: ''
        });
      })
  }
  function signup_enter() {
    setFormState({
      ...formState,
      login: 2,
      //name: data.signup.user.name
    });
  }

  function delete_enter() {
    remove()
      .then(() => {
        setFormState({
          ...formState,
          login: 0,
          email: '',
          password: '',
          name: '',
          error: 0
        });
      })
      .catch(e => {
        console.log(e);
        alert('come on bruh...')
      })
  }

  function sign_out() {
    remove_user();
    localStorage.removeItem(AUTH_TOKEN);
    setFormState({name: '', email: '', password: '', login: 0});
  }

  function set_info(info) {
    sessionStorage.setItem("currentUser", JSON.stringify(info));
  }

  function get_info() {

  }
  function remove_user() {
    sessionStorage.removeItem("currentUser");
  }

  return (
    <div class="whole-login">
      {/* This section is for the greeting */}
      {(formState.login === 0) && (
        <div>
          <p id='location-header'> Login </p>
          <div class="login-info">
            Once you login, you can save your data to reflect future recomendations
          </div>
        </div>
      )}
      
      <div>
        {(formState.login === 1) && (
          <div>
          <p id='location-header'> Sign Up </p>
          <div class="login-info">
            Once you login, you can save your data to reflect future recomendations
          </div>
        </div>

        )}
        {(formState.login === 2) && (
          <p id='location-header'> Welcome back Becky! </p>
        )}
      </div>

      {/* This section is for the two/three input fields */}
      <div class="flex flex-column account-field">
        {(formState.login === 1) && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Name"
          />
        )}
        {(formState.login !== 2) && (
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value
              })
            }
            type="text"
            placeholder="Email address"
          />
        )}
        {(formState.login !== 2) && (
          <input
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value
              })
            }
            type="password"
            placeholder="Password"
          />
        )}
      </div>

      {/* This is the Login / Create Account button */}
      <div class="flex mt3 login">
        {(formState.login !== 2) && (<button
          class="pointer mr2 button not-type"
          onClick={(formState.login === 0) ? login_enter : signup_enter}
        >
          {(formState.login === 0) ? 'Login' : 'Create Account'}
        </button>)}
      </div>
      
      {/* This is the Need an Account / Already have an Account button */}
      <div class="flex mt3 register">
        {(formState.login !== 2) && (<button
          class="pointer button not-type"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: (formState.login === 0) ? 1 : 0
            })
          }
        >
          {(formState.login === 0)
            ? 'Need an account?'
            : 'Already have an account?'}
        </button>)}
      </div>
      
      {/* This is the Sign Out Button */}
      <div class="flex mt3 login"> 
        {(formState.login === 2) && (<button
          class="pointer button not-type"
          //onClick={(localStorage.removeItem(AUTH_TOKEN), (() => setFormState({...formState, login: 0})))}
          onClick={sign_out}
        >
          Sign Out
        </button>)}
      </div>

      {/* This button will delete the currently logged in account!! */}
      <div class="flex mt3 register">
        {(formState.login === 2) && (<button
          class="pointer button not-type"
          onClick={delete_enter}
        >
            Delete Account
        </button>)}
      </div>

      {/* Test Button! */}
      <div class="flex mt3 register">
        {(formState.login !== 3) && (<button
          class="pointer button not-type"
          onClick={() => alert(sessionStorage.getItem("currentUser"))}
        >
            get session info
        </button>)}
      </div>
    </div>
  );
};

export default Login;