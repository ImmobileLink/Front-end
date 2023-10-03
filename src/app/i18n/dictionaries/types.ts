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
    planos:        Planos;
    profile:       Profile;
    dashboard:     Dashboard;
    calendar:      Calendar;
    imovel:        Imovel;
    chat:          Chat;
    cityselector:  DictionariesCityselector;
    survey:        Survey;
}

export interface Auth {
    always:         Always;
    signin:         Signin;
    signup:         Signup;
    forgetpassword: Forgetpassword;
    recovery:       Recovery;
    terms:          Terms;
}

export interface Always {
    donthaveanaccount:    string;
    signup:               string;
    forgetpassword:       string;
    alreadyhaveanaccount: string;
    singin:               string;
    error:                string;
    bylogginin:           string;
    bycreatinganaccount:  string;
    terms:                string;
    ofthisplataform:      string;
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
    invalidemail:              string;
    invalidpassword:           string;
    emailalreadyused:          string;
    invaliddifferentpasswords: string;
    invalidconfirmpassword:    string;
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
    ufacronim:    string;
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
    invalidcepnotfound:  string;
    invaliduf:           string;
    invalidcity:         string;
    invalidneighborhood: string;
    invalidstreet:       string;
    invalidnumber:       string;
    invalidcomplement:   string;
}

export interface Signup4 {
    creci:        string;
    speciality:   string;
    region:       string;
    languages:    string;
    logs:         Signup4Logs;
    cityselector: Signup4Cityselector;
}

export interface Signup4Cityselector {
    estate:             string;
    city:               string;
    selectaestate:      string;
    selectaestatefirst: string;
    nocityfound:        string;
    ufacronim?:         string;
    selectacity?:       string;
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
    select:               string;
    selected:             string;
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

export interface Terms {
    title:            string;
    warning:          string;
    introduction:     string;
    simulationTitle:  string;
    simulation:       string;
    fictiontitle:     string;
    fiction:          string;
    responsibletitle: string;
    responsible:      string;
    copyrighttitle:   string;
    copyright:        string;
    feedbacktitle:    string;
    feedback:         string;
    disclaimer1:      string;
    disclaimer2:      string;
    sincerely:        string;
    teamimmobile:     string;
    location:         string;
}

export interface Calendar {
    scheduledVisits: string;
}

export interface Chat {
    conversations:   string;
    you:             string;
    newconversation: string;
    newconvlabel1:   string;
    newconvlabel2:   string;
    uploadedfile:    string;
    chathome:        string;
}

export interface DictionariesCityselector {
    estate: string;
    city:   string;
}

export interface Dashboard {
    domain:          string;
    professionalism: string;
    goodService:     string;
    educated:        string;
    visited:         string;
    sales:           string;
    january:         string;
    february:        string;
    march:           string;
    april:           string;
    may:             string;
    june:            string;
}

export interface Feed {
    cards: Cards;
    pub:   Pub;
    form:  Form;
}

export interface Cards {
    yourenotlogged:      string;
    enjoyall:            string;
    singin:              string;
    findbrokers:         string;
    mybrokers:           string;
    myproperties:        string;
    schedules:           string;
    visitmyprofile:      string;
    notpremiumyet:       string;
    premium:             string;
    bepremium:           string;
    connections:         string;
    search:              string;
    nolinksyet:          string;
    relatedbrokers:      string;
    norelatedbrokersyet: string;
    myrelatedcompany:    string;
    norelatedcompanyyet: string;
}

export interface Form {
    regionchange:    string;
    post:            string;
    placeholder:     string;
    writeamessage:   string;
    imageinputlabel: string;
    imageerror:      string;
    cityselector:    Signup4Cityselector;
}

export interface Pub {
    regionfilter:              string;
    posted:                    string;
    regioncomboboxplaceholder: string;
    comboboxplaceholder:       string;
    noposts:                   string;
    error:                     string;
    selectaregion:             string;
}

export interface Imovel {
    mainlabels:  Mainlabels;
    formlabels:  Formlabels;
    newproperty: Newproperty;
}

export interface Formlabels {
    selectbroker:  string;
    findbroker:    string;
    delegatevisit: string;
    brokerdata:    string;
    clientdata:    string;
    scheduling:    string;
    name:          string;
    phone:         string;
    email:         string;
    date:          string;
    time:          string;
    formlogs:      Formlogs;
}

export interface Formlogs {
    invalidname:  string;
    invalidphone: string;
    invalidemail: string;
    invaliddate:  string;
    invalidtime:  string;
}

export interface Mainlabels {
    title:           string;
    delegatevisit:   string;
    location:        string;
    characteristics: string;
    price:           string;
}

export interface Newproperty {
    registerproperty: string;
    register:         string;
    uf:               string;
    city:             string;
    neighborhood:     string;
    street:           string;
    number:           string;
    price:            string;
    description:      string;
}

export interface Navbarbuttons {
    feed:             string;
    myprofile:        string;
    settings:         string;
    schedule:         string;
    links:            string;
    relatedbrokers:   string;
    myrelatedcompany: string;
    search:           string;
    subscription:     string;
    loginbutton:      string;
    logoutbutton:     string;
}

export interface Pesquisa {
    labels:        Labels;
    usertypevalue: Usertypevalue;
}

export interface Labels {
    nearbyusers:        string;
    name:               string;
    title:              string;
    usertype:           string;
    region:             string;
    state:              string;
    city:               string;
    all:                string;
    nocityfound:        string;
    selectaestatefirst: string;
    rating:             string;
    specialty:          string;
    error:              string;
    missingcombobox:    string;
    checkprofile:       string;
    specializations:    string;
    type:               string;
    furniture:          string;
    condition:          string;
    others:             string;
    advanced:           string;
    reset:              string;
    search:             string;
    selectafilter:      string;
    nouserfound:        string;
}

export interface Usertypevalue {
    broker:      string;
    corporation: string;
}

export interface Planos {
    subscription:        string;
    broker:              string;
    company:             string;
    month:               string;
    tryforfree:          string;
    allsubscriptions:    string;
    usertype:            string;
    sublabel:            string;
    feedbackreview:      string;
    dashboard:           string;
    feed:                string;
    companyafiliation:   string;
    chat:                string;
    visibility:          string;
    exclusivefunctions:  string;
    searchfilters:       string;
    oportunitiesposting: string;
    linktotenbrokers:    string;
    illimitedlinks:      string;
    buynow:              string;
}

export interface Profile {
    noAssociation:  string;
    hasAssociation: string;
    btnAssociate:   string;
    btnPending:     string;
    btnConnect:     string;
    overview:       string;
    posts:          string;
    infoBroker:     string;
    historic:       string;
}

export interface Survey {
    dear:                   string;
    nosurveyfound:          string;
    thanksforanswering:     string;
    bestregards:            string;
    welcome:                string;
    referenceday:           string;
    referencebroker:        string;
    referencecompany:       string;
    explanationsurveysite1: string;
    explanationsurveysite2: string;
    pleased:                string;
    notpleased:             string;
    finish:                 string;
    questions:              Questions;
}

export interface Questions {
    question1:  string;
    question2:  string;
    question3:  string;
    question4:  string;
    question5:  string;
    question6:  string;
    question7:  string;
    question8:  string;
    question9:  string;
    question10: string;
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
