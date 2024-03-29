// To parse this data:
//
//   import { Convert, Dictionaries } from "./file";
//
//   const dictionaries = Convert.toDictionaries(json);

export interface Dictionaries {
    navbarbuttons:  Navbarbuttons;
    auth:           Auth;
    pesquisa:       Pesquisa;
    feed:           Feed;
    denuncia:       Denuncia;
    planos:         Planos;
    profile:        DictionariesProfile;
    configurations: Configurations;
    dashboard:      DictionariesDashboard;
    calendar:       Calendar;
    imovel:         Imovel;
    chat:           Chat;
    cityselector:   DictionariesCityselector;
    home:           Home;
    footer:         Footer;
    agenda:         Agenda;
    survey:         Survey;
    mylinks:        Mylinks;
}

export interface Agenda {
    visitdetails:   string;
    companyname:    string;
    brokername:     string;
    clientdetails:  string;
    clientname:     string;
    telefone:       string;
    scheduling:     string;
    date:           string;
    time:           string;
    placedetails:   string;
    address:        string;
    uf:             string;
    cidade:         string;
    cep:            string;
    bairro:         string;
    rua:            string;
    numero:         string;
    complemento:    string;
    submit:         string;
    close:          string;
    delete:         string;
    cannotbeundone: string;
    waiting:        string;
    sendsurvey:     string;
    logs:           AgendaLogs;
}

export interface AgendaLogs {
    emailerror:        string;
    emailok:           string;
    visitok:           string;
    visitchanged:      string;
    invaliddate:       string;
    invalidtime:       string;
    confirmVisit:      string;
    refuseVisit:       string;
    confirmVisitError: string;
    refuseVisitError:  string;
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
    emaillabel:      string;
    passwordlabel:   string;
    confirmpassword: string;
    logs:            Signup1Logs;
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
    uferror:      string;
}

export interface Signup5 {
    corretor:             Company;
    company:              Company;
    subscriptionmessage0: string;
    subscriptionmessage1: string;
    subscriptionmessage2: string;
    subscriptionmessage3: string;
    freetier:             string;
    brokertier:           string;
    companytier:          string;
    fullname:             string;
    cardnumber:           string;
    expirydate:           string;
    code:                 string;
    signupbutton:         string;
    select:               string;
    selected:             string;
    disclaimer:           string;
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
    sent:            string;
    newconversation: string;
    newconvlabel1:   string;
    newconvlabel2:   string;
    uploadedfile:    string;
    chathome:        string;
    errormessages:   Errormessages;
}

export interface Errormessages {
    insertfail: string;
}

export interface DictionariesCityselector {
    estate: string;
    city:   string;
}

export interface Configurations {
    changeData:           string;
    email:                string;
    password:             string;
    phone:                string;
    cellphone:            string;
    comercial:            string;
    confirmPassword:      string;
    confirmChange:        string;
    cancelChange:         string;
    edit:                 string;
    emailUpdated:         string;
    errorEmailUpdate:     string;
    passwordUpdated:      string;
    errorPasswordUpdate:  string;
    phonesUpdatedSuccess: string;
    errorPhoneUpdate:     string;
    emailNotNull:         string;
    invalidEmail:         string;
    passwordMinLength:    string;
    passwordRequired:     string;
    passwordsDoNotMatch:  string;
}

export interface DictionariesDashboard {
    noRating: string;
}

export interface Denuncia {
    reportpostoruser:  string;
    reportmade:        string;
    whichproblem:      string;
    has:               string;
    reportparagraph:   string;
    returntofeed:      string;
    cancel:            string;
    finishreport:      string;
    dateformat:        string;
    more:              string;
    less:              string;
    issues:            Issues;
    issuesdescription: Issues;
}

export interface Issues {
    offensive: string;
    abuse:     string;
    harm:      string;
    spam:      string;
    other?:    string;
    describe?: string;
}

export interface Feed {
    cards:    Cards;
    pub:      Pub;
    form:     Form;
    dropdown: Dropdown;
}

export interface Cards {
    yourenotlogged:      string;
    enjoyall:            string;
    singin:              string;
    findbrokers:         string;
    mybrokers:           string;
    myproperties:        string;
    schedules:           string;
    links:               string;
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

export interface Dropdown {
    addsaveditem:     string;
    removedsaveditem: string;
    seeprofile:       string;
    report:           string;
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
    chat:                      string;
    more:                      string;
    less:                      string;
    dateformat:                string;
    deletepub:                 string;
    areyousure:                string;
    irreversibleaction:        string;
    cancel:                    string;
    delete:                    string;
    tryagainlater:             string;
    errorcities:               string;
}

export interface Footer {
    usefulLinks: string;
    access:      string;
    premium:     string;
    moreLinks:   string;
    blog:        string;
    ytChannel:   string;
}

export interface Home {
    about:               string;
    resources:           string;
    premium:             string;
    access:              string;
    conecting:           string;
    ties:                string;
    whatIsImmobileLink:  string;
    searchOpportunities: string;
    searchParagraph:     string;
    manageYourCalendar:  string;
    manageParagraph:     string;
    amazingResources:    string;
    amazingParagraph:    string;
    itemResources:       ItemResources;
    tryPremium:          string;
    start:               string;
}

export interface ItemResources {
    item1: string;
    item2: string;
    item3: string;
    item4: string;
    item5: string;
    item6: string;
    item7: string;
    item8: string;
}

export interface Imovel {
    mainlabels:     Mainlabels;
    formlabels:     Formlabels;
    newproperty:    Newproperty;
    oldproperty:    Oldproperty;
    deleteproperty: Deleteproperty;
}

export interface Deleteproperty {
    title:              string;
    msg:                string;
    delete:             string;
    cancel:             string;
    loading:            string;
    deletepropertylogs: Deletepropertylogs;
}

export interface Deletepropertylogs {
    success: string;
    error1:  string;
    error2:  string;
}

export interface Formlabels {
    infoproperty:   Infoproperty;
    selectbroker:   string;
    findbroker:     string;
    delegatevisit:  string;
    requiredfields: string;
    warningmsg:     string;
    clickhere:      string;
    brokerdata:     string;
    specialty:      string;
    clientdata:     string;
    scheduling:     string;
    name:           string;
    phone:          string;
    email:          string;
    date:           string;
    time:           string;
    loading:        string;
    success:        string;
    checkcalendar:  string;
    formlogs:       Formlogs;
}

export interface Formlogs {
    invalidname:  string;
    invalidphone: string;
    invalidemail: string;
    invaliddate:  string;
    invalidtime:  string;
}

export interface Infoproperty {
    location:        string;
    characteristics: string;
    price:           string;
}

export interface Mainlabels {
    title:         string;
    delegatevisit: string;
    edit:          string;
    delete:        string;
}

export interface Newproperty {
    registerproperty: string;
    requiredfields:   string;
    register:         string;
    cep:              string;
    uf:               string;
    city:             string;
    neighborhood:     string;
    street:           string;
    number:           string;
    complement:       string;
    price:            string;
    type:             string;
    furniture:        string;
    condition:        string;
    others:           string;
    selectopt:        string;
    selectopts:       string;
    description:      string;
    imageupload:      string;
    imageformat:      string;
    loading:          string;
    newpropertylogs:  Newpropertylogs;
}

export interface Newpropertylogs {
    invalidcep:          string;
    invalidcepnotfound:  string;
    invaliduf:           string;
    invalidcity:         string;
    invalidneighborhood: string;
    invalidstreet:       string;
    invalidnumber:       string;
    invalidprice:        string;
}

export interface Oldproperty {
    editproperty: string;
    confirm:      string;
}

export interface Mylinks {
    links:     string;
    companies: string;
    brokers:   string;
    talk:      string;
    visit:     string;
    logs:      MylinksLogs;
}

export interface MylinksLogs {
    errorwhilesearchingdata: string;
    noconnectionswerefound:  string;
    noassociationswerefound: string;
}

export interface Navbarbuttons {
    feed:               string;
    myprofile:          string;
    settings:           string;
    schedule:           string;
    immobile:           string;
    links:              string;
    relatedbrokers:     string;
    myrelatedcompany:   string;
    search:             string;
    subscription:       string;
    loginbutton:        string;
    logoutbutton:       string;
    language:           string;
    notifications:      string;
    messages:           string;
    account:            string;
    notificationlabels: Notificationlabels;
    mylinks:            string;
    associated:         string;
}

export interface Notificationlabels {
    check:               string;
    association:         string;
    connection:          string;
    visit:               string;
    accept:              string;
    refuse:              string;
    nonotifications:     string;
    acceptedvisit:       string;
    refusedvisit:        string;
    updatedvisit:        string;
    acceptedconnection:  string;
    refusedconnection:   string;
    acceptedassociation: string;
    refusedassociation:  string;
}

export interface Pesquisa {
    labels:        PesquisaLabels;
    usertypevalue: Usertypevalue;
}

export interface PesquisaLabels {
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
    subscription:           string;
    chooseyourplan:         string;
    broker:                 string;
    company:                string;
    month:                  string;
    tryforfree:             string;
    allsubscriptions:       string;
    usertype:               string;
    sublabel:               string;
    pricing:                string;
    feedbackreview:         string;
    dashboard:              string;
    feed:                   string;
    companyafiliation:      string;
    chat:                   string;
    visibility:             string;
    exclusivefunctions:     string;
    searchfilters:          string;
    oportunitiesposting:    string;
    linktotenbrokers:       string;
    illimitedlinks:         string;
    buynow:                 string;
    confirmchange:          string;
    select:                 string;
    selected:               string;
    freetier:               string;
    brokertier:             string;
    companytier:            string;
    changeto:               string;
    changeforfree:          string;
    changetopremiumforfree: string;
    limitedtime:            string;
    cancel:                 string;
    change:                 string;
    changesuccess:          string;
    changeerror:            string;
    forbrokers:             string;
    forbusiness:            string;
}

export interface DictionariesProfile {
    infoBroker:    string;
    historic:      string;
    premium:       string;
    ratingPremium: string;
    rating:        string;
    withoutRating: string;
    visitPanel:    string;
    calendarLang:  string;
    doesntExist:   string;
    backToFeed:    string;
    editProfile:   EditProfile;
    buttonProfile: ButtonProfile;
    infos:         Infos;
    dashboard:     ProfileDashboard;
}

export interface ButtonProfile {
    buttonAssociate:  ButtonAssociate;
    buttonConnection: ButtonConnection;
}

export interface ButtonAssociate {
    questionDisassociate: string;
    confirmDisassociate:  string;
    cancelDisassociate:   string;
    sendAssociate:        string;
    accept:               string;
    associate:            string;
    pending:              string;
}

export interface ButtonConnection {
    questionDisconnection: string;
    confirmDisconnection:  string;
    cancelDisconnection:   string;
    connection:            string;
    accept:                string;
    connected:             string;
    pending:               string;
}

export interface ProfileDashboard {
    logintoseemore:   string;
    signup:           string;
    login:            string;
    features:         string;
    wantmoredetails:  string;
    seeplans:         string;
    satisfaction:     string;
    type:             string;
    interest:         string;
    seeless:          string;
    seemore:          string;
    noreviews:        string;
    quantityDelegate: string;
    visit:            string;
    options:          Options;
}

export interface Options {
    verysatisfied:    string;
    satisfied:        string;
    neutral:          string;
    dissatisfied:     string;
    verydissatisfied: string;
    scores:           string;
    profissionalism:  string;
    communication:    string;
    knowlodge:        string;
    clarity:          string;
    transparency:     string;
    detail:           string;
    others:           string;
    interested:       string;
    undecided:        string;
    notinterested:    string;
}

export interface EditProfile {
    edit:               string;
    name:               string;
    corporationName:    string;
    site:               string;
    about:              string;
    speciality:         string;
    localization:       string;
    city:               string;
    neighborhood:       string;
    street:             string;
    number:             string;
    complement:         string;
    confirm:            string;
    cancel:             string;
    changeImage:        string;
    changeImageTitle:   string;
    changeProfileTitle: string;
    confirmImage:       string;
    warn:               Warn;
    error:              Error;
}

export interface Error {
    cityNotFound:     string;
    selectStateFirst: string;
}

export interface Warn {
    insertName:              string;
    insertValidAddress:      string;
    insertNumber:            string;
    errorUpdatingData:       string;
    dataUpdatedSuccessfully: string;
    incompleteCEP:           string;
    nonexistentCEP:          string;
    minLengthName:           string;
    specialtyUpdated:        string;
    specialtyUpdatedFail:    string;
    regionUpdated:           string;
    regionUpdatedFail:       string;
}

export interface Infos {
    posts:      string;
    savedPosts: string;
    schedule:   string;
    profile:    InfosProfile;
}

export interface InfosProfile {
    data:             string;
    quantityBrokers:  string;
    site:             string;
    infoCompany:      string;
    specialties:      string;
    workRegion:       string;
    withoutData:      string;
    phoneNumber:      string;
    cellphoneNumber:  string;
    comercialContact: string;
    historic:         Historic;
}

export interface Historic {
    withoutHistoric:         string;
    edit:                    string;
    companyName:             string;
    addHistoric:             string;
    dateInit:                string;
    dateEnd:                 string;
    historicDescription:     string;
    confirmHistoric:         string;
    cancelHistoric:          string;
    untilMoment:             string;
    companyNameRequired:     string;
    minimumAllowedYear:      string;
    dateNotGreaterThanToday: string;
    insertStartDate:         string;
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
    insertavalue:           string;
    fieldlenght:            string;
    finish:                 string;
    questions:              Questions;
    labels:                 SurveyLabels;
}

export interface SurveyLabels {
    pleased:       string;
    notpleased:    string;
    notinterested: string;
    interested:    string;
    notinfluence:  string;
    influence:     string;
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
