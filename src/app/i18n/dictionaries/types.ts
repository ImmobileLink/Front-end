// To parse this data:
//
//   import { Convert, Dictionaries } from "./file";
//
//   const dictionaries = Convert.toDictionaries(json);

export interface Dictionaries {
  auth: Auth;
}

export interface Auth {
  always:         Always;
  signin:         Signin;
  signup:         Signup;
  forgetpassword: Forgetpassword;
  recovery:       Recovery;
}

export interface Always {
  donthaveanaccount:    string;
  signup:               string;
  forgetpassword:       string;
  alreadyhaveanaccount: string;
  singin:               string;
  error:                string;
}

export interface Forgetpassword {
  emaillabel:           string;
  forgetpasswordbutton: string;
  success:              string;
  error:                string;
  logs:                 ForgetpasswordLogs;
}

export interface ForgetpasswordLogs {
  invalidemail:  string;
  emailnotfound: string;
  emailsend:     string;
}

export interface Recovery {
  newpassword:    string;
  recoverybutton: string;
  success:        string;
  error:          string;
  logs:           RecoveryLogs;
}

export interface RecoveryLogs {
  passwordchanged:    string;
  passwordnotchanged: string;
}

export interface Signin {
  emaillabel:       string;
  passwordlabel:    string;
  signinbutton:     string;
  or:               string;
  signinwithgoogle: string;
  error:            string;
  logs:             SigninLogs;
}

export interface SigninLogs {
  invalidcredentials: string;
}

export interface Signup {
  emaillabel:    string;
  passwordlabel: string;
  signupbutton:  string;
  success:       string;
  error:         string;
  logs:          SignupLogs;
}

export interface SignupLogs {
  invalidemail:     string;
  invalidpassword:  string;
  emailalreadyused: string;
  successsignup:    string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toDictionaries(json: string): Dictionaries {
      return JSON.parse(json);
  }

  public static dictionariesToJson(value: Dictionaries): string {
      return JSON.stringify(value);
  }
}
