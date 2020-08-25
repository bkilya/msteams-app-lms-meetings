import { Middleware } from 'redux';
import { msalApp } from './msalApp';
import {
  CHECK_FOR_SIGNEDIN_USER_COMMAND,
  OPEN_SIGNIN_DIALOG_COMMAND,
  HANDLE_TEAMS_SIGNIN_DIALOG_COMMAND,
  OPEN_TEAMS_SIGNIN_DIALOG_COMMAND,
  SIGNIN_COMPLETE_EVENT,
  SigninCompleteEvent,
  SIGNOUT_COMMAND,
  SIGNOUT_COMPLETE_EVENT
} from './actions';
import { replace } from 'connected-react-router';
import * as microsoftTeams from "@microsoft/teams-js";

export function createAuthMiddleware(): Middleware {
  return store => next => action => {
    if (action.type === CHECK_FOR_SIGNEDIN_USER_COMMAND) {
      if (!msalApp.getAccount()) {
        store.dispatch(replace('/signin'));
      }
    }
    
    if (action.type === HANDLE_TEAMS_SIGNIN_DIALOG_COMMAND) {
      msalApp.handleRedirectCallback(
        (response) => {
          if(response) {
            console.log('Login succeeded');
            microsoftTeams.initialize();
            microsoftTeams.authentication.notifySuccess();

          }
        }, 
        (error, state) => {
          console.log('Login failed:', error.errorMessage);
          microsoftTeams.initialize();
          microsoftTeams.authentication.notifyFailure(error.errorMessage);
        }
      );

      msalApp.loginRedirect({
        scopes: ['OnlineMeetings.ReadWrite']
      });

    }

    if (action.type === OPEN_TEAMS_SIGNIN_DIALOG_COMMAND) {
      microsoftTeams.initialize( () => {
        microsoftTeams.authentication.authenticate({
            url: window.location.origin + '/#/signinteams',
            successCallback: function (result) {
              store.dispatch(replace('/'));
            },
            failureCallback: function (reason) {
              console.log('error: ', reason?.toString());
              store.dispatch(replace('/'));
            }
          })
      });
    }

    if (action.type === OPEN_SIGNIN_DIALOG_COMMAND) {
      msalApp
        .loginPopup({
          scopes: ['OnlineMeetings.ReadWrite']
        })
        .then(response => {
          console.log('Login succeeded');
          store.dispatch({
            type: SIGNIN_COMPLETE_EVENT,
            idToken: response.idToken
          } as SigninCompleteEvent);
        })
        .catch(error => {
          console.log('Login failed:', error);
        });
    }

    if (action.type === SIGNIN_COMPLETE_EVENT) {
      store.dispatch(replace('/'));
    }

    if (action.type === SIGNOUT_COMMAND) {
      msalApp.logout();
      store.dispatch({
        type: SIGNOUT_COMPLETE_EVENT
      });
      console.log('logged out?');
    }

    next(action);
  };
}
