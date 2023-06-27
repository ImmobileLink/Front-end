// To parse this data:
//
//   import { Convert, Dictionaries } from "./file";
//
//   const dictionaries = Convert.toDictionaries(json);

export interface Dictionaries {
  navbarbuttons: Navbarbuttons;
  auth:          Auth;
  pesquisa:      Pesquisa;
  feed:          Feed;
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
  signup1:        Signup1;
  signup2:        Signup2;
  signup3:        Signup3;
  signup4:        Signup4;
  signup5:        Signup5;
  stepper:        Stepper;
  nextbutton:     string;
  previousbutton: string;
  success:        string;
  error:          string;
  fixtheinputs:   string;
  successsignup:  string;
}

export interface Signup1 {
  emaillabel:    string;
  passwordlabel: string;
  logs:          Signup1Logs;
}

export interface Signup1Logs {
  invalidemail:     string;
  invalidpassword:  string;
  emailalreadyused: string;
}

export interface Signup2 {
  corretorlabel:  string;
  corretorbutton: string;
  companylabel:   string;
  companybutton:  string;
  yourchoiceis:   string;
  corretor:       string;
  company:        string;
}

export interface Signup3 {
  name:         string;
  fantasyname:  string;
  cpf:          string;
  cnpj:         string;
  phone1:       string;
  phone2:       string;
  phone3:       string;
  cep:          string;
  uf:           string;
  city:         string;
  neighborhood: string;
  street:       string;
  number:       string;
  complement:   string;
  optional:     string;
  logs:         Signup3Logs;
}

export interface Signup3Logs {
  invalidname:         string;
  invalidfantasyname:  string;
  invalidcpf:          string;
  invalidcnpj:         string;
  invalidphone:        string;
  invalidcep:          string;
  invaliduf:           string;
  invalidcity:         string;
  invalidneighborhood: string;
  invalidstreet:       string;
  invalidnumber:       string;
  invalidcomplement:   string;
}

export interface Signup4 {
  creci:      string;
  speciality: string;
  region:     string;
  languages:  string;
  logs:       Signup4Logs;
}

export interface Signup4Logs {
  invalidcreci: string;
}

export interface Signup5 {
  corretor:             Company;
  company:              Company;
  subscriptionmessage1: string;
  subscriptionmessage2: string;
  subscriptionmessage3: string;
  signupbutton:         string;
}

export interface Company {
  freelabel:           string;
  freedescription1:    string;
  freedescription2:    string;
  freedescription3:    string;
  freedescription4:    string;
  premiumlabel:        string;
  premiumdescription1: string;
  premiumdescription2: string;
  premiumdescription3: string;
  premiumdescription4: string;
}

export interface Stepper {
  label1: string;
  label2: string;
  label3: string;
  label4: string;
  label5: string;
}

export interface Feed {
  cards: Cards;
  pub:   Pub;
  form: Form;
}

export interface Cards {
  yourenotlogged: string;
  enjoyall:       string;
  singin:         string;
  findbrokers:    string;
  mybrokers:      string;
  myproperties:   string;
  schedules:      string;
  visitmyprofile: string;
  notpremiumyet:  string;
  bepremium:      string;
  connections:    string;
  search:         string;
}

export interface Pub {
  regionfilter: string;
  posted: string;
  regioncomboboxplaceholder: string;
  comboboxplaceholder: string;
  noposts: string;
  error: string
}

export interface Form {
  regionchange: string;
  post: string;
  placeholder: string;
}

export interface Navbarbuttons {
  searchbutton: string;
  logoutbutton: string;
}

export interface Pesquisa {
  labels:        Labels;
  usertypevalue: Usertypevalue;
}

export interface Labels {
  name:            string;
  title:           string;
  usertype:        string;
  region:          string;
  rating:          string;
  specialty:       string;
  error:           string;
  missingcombobox: string;
}

export interface Usertypevalue {
  broker:      string;
  corporation: string;
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
