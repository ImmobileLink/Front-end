import { getCEP } from "../../../../lib/utils/externalApis";

export async function getData(supabase: any) {
    
    let { data: tipoImovel } = await supabase
        .from("tipoImovel")
        .select("id,descricao");

    return { tipoImovel };
} function hasStrongPassword(object: string) {
    const password = object;
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]/.test(password);

    if (password.length >= minLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar) {
        return true;
    } else {
        return false;
    }
}

export const verifyFields = async (
    telaAtual: number,
    setFieldErros: Function,
    signup: any,
    tipoPerfil: number,
    senha: string,
    confirmSenha: string,
    email: string,
    supabase: any,
    nome: string,
    cpf: string,
    cnpj: string,
    nomeFantasia: string,
    celular: string,
    telefone: string,
    comercial: string,
    creci: string,
    estado: string,
    cidade: string,
    logradouro: string,
    numero: number | null,
    bairro: string,
    cep: string,
) => {
    const erros: { [k: string]: any; } = {};

    switch (telaAtual) {
        case 1:
            // verifica senha
            if (confirmSenha.trim() == "") {
                assignError(erros, "confirmSenha", signup.signup1.logs.invalidconfirmpassword);
            } else {
                if (senha != confirmSenha) {
                    assignError(erros, "confirmSenha", signup.signup1.logs.invaliddifferentpasswords);
                }
            }

            if (!hasStrongPassword(senha)) {
                assignError(
                    erros,
                    "senha",
                    signup.signup1.logs.invalidpassword
                );
            }

            // verifica email
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;
            if (!regex.test(email)) {
                assignError(erros, "email", signup.signup1.logs.invalidemail);
            }

            let { data: usuario } = await supabase
                .from("usuario")
                .select("email")
                .eq("email", email);

            if (usuario?.length) {
                assignError(
                    erros,
                    "email",
                    signup.signup1.logs.emailalreadyused
                );
            }
            break;
        case 3:
            if (tipoPerfil == 1) {
                if (nome.trim().length < 4) {
                    assignError(erros, "nome", signup.signup3.logs.invalidname);
                }
                if (cpf.length != 11) {
                    assignError(erros, "cpf", signup.signup3.logs.invalidcpf);
                } else {
                    let { data: usuario } = await supabase
                        .from("corretor")
                        .select("cpf")
                        .eq("cpf", cpf);

                    if (usuario?.length) {
                        assignError(
                            erros,
                            "cpf",
                            signup.signup3.logs.invalidcpf
                        );
                    }
                }

                if (cnpj.length > 0 && cnpj.length != 14) {
                    assignError(erros, "cnpj", signup.signup3.logs.invalidcnpj);
                } else if (cnpj.length == 14) {
                    let { data: usuario } = await supabase
                        .from("corretor")
                        .select("cnpj")
                        .eq("cnpj", cnpj);

                    if (usuario?.length) {
                        assignError(
                            erros,
                            "cnpj",
                            signup.signup3.logs.invalidcnpj
                        );
                    }
                }
            } else {
                // o nome fantasia tem no mínimo 12 pontos [LegisWEB]
                if (nomeFantasia.trim().length < 12) {
                    assignError(
                        erros,
                        "nomeFantasia",
                        signup.signup3.logs.invalidfantasyname
                    );
                }
                if (cnpj.length != 14) {
                    assignError(erros, "cnpj", signup.signup3.logs.invalidcnpj);
                } else {
                    let { data: usuario } = await supabase
                        .from("corporacao")
                        .select("cnpj")
                        .eq("cnpj", cnpj);

                    if (usuario?.length) {
                        assignError(
                            erros,
                            "cnpj",
                            signup.signup3.logs.invalidcnpj
                        );
                    }
                }
            }
            if (celular.length != 11 && celular.length != 0) {
                assignError(erros, "celular", signup.signup3.logs.invalidphone);
            }
            if (telefone.length != 10 && telefone.length != 0) {
                assignError(
                    erros,
                    "telefone",
                    signup.signup3.logs.invalidphone
                );
            }
            if (comercial.length != 10 && comercial.length != 0) {
                assignError(
                    erros,
                    "comercial",
                    signup.signup3.logs.invalidphone
                );
            }

            if (cep.length != 8) {
                assignError(erros, "cep", signup.signup3.logs.invalidcep);
            } else {
                const data = await getCEP(cep);
                if (data.erro) {
                    assignError(
                        erros,
                        "cep",
                        signup.signup3.logs.invalidcepnotfound
                    );
                }
            }

            if (estado == "") {
                assignError(erros, "estado", signup.signup3.logs.invaliduf);
            }

            if (cidade.length < 2) {
                assignError(erros, "cidade", signup.signup3.logs.invalidcity);
            }

            if (bairro.length < 2) {
                assignError(
                    erros,
                    "bairro",
                    signup.signup3.logs.invalidneighborhood
                );
            }

            if (logradouro.length < 2) {
                assignError(
                    erros,
                    "logradouro",
                    signup.signup3.logs.invalidstreet
                );
            }

            if (numero == null || numero < 1) {
                assignError(erros, "numero", signup.signup3.logs.invalidnumber);
            }
            break;
        case 4:
            if (tipoPerfil == 1) {
                if (creci.length >= 8 || creci.length < 5) {                  
                    assignError(
                        erros,
                        "creci",
                        signup.signup4.logs.invalidcreci
                    );
                } else {
                    const regexCreci = /^\d{6}[a-zA-Z]$/;
                    if (!regexCreci.test(creci)) {
                        assignError(
                            erros,
                            "creci",
                            signup.signup4.logs.invalidcreci
                        );
                    } else {
                        let { data: usuario } = await supabase
                            .from("corretor")
                            .select("creci")
                            .eq("creci", creci);

                        if (usuario?.length) {
                            assignError(
                                erros,
                                "creci",
                                signup.signup4.logs.invalidcreci
                            );
                        }
                    }
                }
            }
            break;
    }
    setFieldErros(erros);
    return Object.keys(erros).length == 0;
};

export const assignError = (
    erros: { [k: string]: any; },
    campo: string,
    mensagem: string,
) => {
    if (erros?.[campo]?.length > 0) {
        erros[campo].push(mensagem);
    } else {
        erros[campo] = [mensagem];
    }
};

export const handleSignUpDB = async (
    tipoPerfil: number,
    senha: string,
    email: string,
    supabase: any,
    nome: string,
    cpf: string,
    cnpj: string,
    nomeFantasia: string,
    celular: string,
    telefone: string,
    comercial: string,
    creci: string,
    cep: string,
    estado: string,
    logradouro: string,
    numero: number | null,
    complemento: string,
    cidade: string,
    bairro: string,
    premium: boolean,
    especialidade: { id: any; descricao: any; }[],
    regiaoAtuacao: { estado: string; cidade: string; }[],
    locationOrigin: string
) => {

    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
        options: {
            emailRedirectTo: `${locationOrigin}/auth`,
        },
    });

    if (!error) {
        const userId = (data.user?.id)!;

        if (tipoPerfil == 1) {
            let { error } = await supabase.from("corretor").insert([
                {
                    id: userId,
                    nome: nome,
                    cpf: cpf,
                    cnpj: cnpj,
                    creci: creci,
                    cep: cep,
                    estado: estado,
                    cidade: cidade,
                    bairro: bairro,
                    logradouro: logradouro,
                    numero: numero,
                    complemento: complemento,
                    telefone: telefone,
                    celular: celular,
                    comercial: comercial,
                    premium: premium,
                },
            ]);
            // especialidade
            {
                let arrayEspecialidade: any = [];

                especialidade.map((item) => {
                    arrayEspecialidade.push({
                        idcorretor: userId,
                        idtipoimovel: item.id,
                    });
                });

                const { error } = await supabase
                    .from("especialidade")
                    .insert(arrayEspecialidade);
            }
        } else {
            let { error } = await supabase.from("corporacao").insert([
                {
                    id: userId,
                    nomefantasia: nomeFantasia,
                    cnpj: cnpj,
                    cep: cep,
                    estado: estado,
                    cidade: cidade,
                    bairro: bairro,
                    logradouro: logradouro,
                    numero: numero,
                    complemento: complemento,
                    telefone1: telefone,
                    telefone2: celular,
                    telefone3: comercial,
                    premium: premium,
                },
            ]);
        }
        //usuarioporregiao
        {
            let arrayUsuarioPorRegiao: any = [];

            regiaoAtuacao.map((item) => {
                arrayUsuarioPorRegiao.push({
                    idusuario: userId,
                    regiao: item,
                });
            });

            const { error } = await supabase
                .from("usuarioporregiao")
                .insert(arrayUsuarioPorRegiao);
        }
        return true;
    } else {
        return false;
    }
};

export const verificaEmailDBAPI = async (email: string, supabase: any) => {
    let { data, error } = await supabase
        .from("usuario")
        .select("email")
        .eq("email", email)
        .limit(1);
    if (error) {
        return false
    }
    if (data?.length) {
        return true
    }
    else {
        return false
    }
};

export const handleLoginAPI = async (email: string, senha: string, supabase: any) => {
    let { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
    });

    if (error) {
        return false
    } else {
        return true
    }
};

export const restorePasswordAPI = async (senha: string, supabase: any) => {
    const {error} = await supabase.auth.updateUser({senha})
    if(error) {
        console.log(error)
        return false;
    }
    else {
        return true;
    }
}

