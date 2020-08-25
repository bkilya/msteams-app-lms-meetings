import React from 'react';
import { AppState } from './RootReducer';
import { Dispatch } from 'redux';
import { HANDLE_TEAMS_SIGNIN_DIALOG_COMMAND } from './auth/actions';
import { connect } from 'react-redux';


interface SigninTeamsPageProps {
    initiateMsalSignIn: () => void;
  }
  
  const mapStateToProps = (state: AppState) => ({});
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
        initiateMsalSignIn: () => 
        dispatch({
          type: HANDLE_TEAMS_SIGNIN_DIALOG_COMMAND
        })
    });

function SigninTeamsPageComponent(props: SigninTeamsPageProps) {

    const initiateMsalSignIn = props.initiateMsalSignIn;
    React.useEffect(() => {
      initiateMsalSignIn();
    });
    
    return (
        <></>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SigninTeamsPageComponent);