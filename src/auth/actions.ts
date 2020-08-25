import { IdToken } from 'msal/lib-commonjs/IdToken';

export const CHECK_FOR_SIGNEDIN_USER_COMMAND = 'CheckForSignedInUserCommand';
export interface CheckForSignedInUserCommand {
  type: typeof CHECK_FOR_SIGNEDIN_USER_COMMAND;
}

export const OPEN_TEAMS_SIGNIN_DIALOG_COMMAND = 'OpenTeamsSigninDialogCommand';
export interface OpenTeamsSigninDialogCommand {
  type: typeof OPEN_TEAMS_SIGNIN_DIALOG_COMMAND;
}

export const HANDLE_TEAMS_SIGNIN_DIALOG_COMMAND = 'HandleTeamsSigninDialogCommand';
export interface HandleTeamsSigninDialogCommand {
  type: typeof HANDLE_TEAMS_SIGNIN_DIALOG_COMMAND;
}

export const OPEN_SIGNIN_DIALOG_COMMAND = 'OpenSigninDialogCommand';
export interface OpenSigninDialogCommand {
  type: typeof OPEN_SIGNIN_DIALOG_COMMAND;
}

export const SIGNIN_COMPLETE_EVENT = 'SigninCompleteEvent';
export interface SigninCompleteEvent {
  type: typeof SIGNIN_COMPLETE_EVENT;
  idToken: IdToken;
}

export const SIGNOUT_COMMAND = 'SignoutCommand';
export interface SignoutCommand {
  type: typeof SIGNOUT_COMMAND;
}

export const SIGNOUT_COMPLETE_EVENT = 'SignoutCompleteEvent';
export interface SignoutCompleteEvent {
  type: typeof SIGNOUT_COMPLETE_EVENT;
}

export type AuthAction =
  | CheckForSignedInUserCommand
  | HandleTeamsSigninDialogCommand
  | OpenTeamsSigninDialogCommand
  | OpenSigninDialogCommand
  | SigninCompleteEvent
  | SignoutCommand
  | SignoutCompleteEvent;
