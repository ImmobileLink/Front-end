function hasStrongPassword(object: string) {
    const password = object;
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]/.test(password);

    if (
        password.length >= minLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar
    ) {
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
    cep: string
) => {
    const erros: { [k: string]: any } = {};

    const assignError = (campo: string, mensagem: string) => {
        erros[campo] =
            erros?.[campo]?.length > 0
                ? erros[campo].push(mensagem)
                : (erros[campo] = [mensagem]);
    };

    switch (telaAtual) {
        case 1:
            // verifica senha
            if (!hasStrongPassword(senha)) {
                assignError("senha", signup.signup1.logs.invalidpassword);
            }

            // verifica email
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;
            if (!regex.test(email)) {
                assignError("email", signup.signup1.logs.invalidemail);
            }

            let { data: usuario } = await supabase
                .from("usuario")
                .select("email")
                .eq("email", email);

            if (usuario?.length) {
                assignError("email", signup.signup1.logs.emailalreadyused);
            }
            break;
        case 3:
            if (tipoPerfil == 1) {
                if (nome.trim().length < 4) {
                    assignError("nome", signup.signup3.logs.invalidname);
                }
                if (cpf.length != 11) {
                    assignError("cpf", signup.signup3.logs.invalidcpf);
                } else {
                    let { data: usuario } = await supabase
                        .from("corretor")
                        .select("cpf")
                        .eq("cpf", cpf);

                    if (usuario?.length) {
                        assignError("cpf", signup.signup3.logs.invalidcpf);
                    }
                }

                if (cnpj.length > 0 && cnpj.length != 14) {
                    assignError("cnpj", signup.signup3.logs.invalidcnpj);
                } else if (cnpj.length == 14) {
                    let { data: usuario } = await supabase
                        .from("corretor")
                        .select("cnpj")
                        .eq("cnpj", cnpj);

                    if (usuario?.length) {
                        assignError("cnpj", signup.signup3.logs.invalidcnpj);
                    }
                }
            } else {
                // o nome fantasia tem no mínimo 12 pontos [LegisWEB]
                if (nomeFantasia.trim().length < 12) {
                    assignError(
                        "nomeFantasia",
                        signup.signup3.logs.invalidfantasyname
                    );
                }
                if (cnpj.length != 14) {
                    assignError("cnpj", signup.signup3.logs.invalidcnpj);
                } else {
                    let { data: usuario } = await supabase
                        .from("corporacao")
                        .select("cnpj")
                        .eq("cnpj", cnpj);

                    if (usuario?.length) {
                        assignError("cnpj", signup.signup3.logs.invalidcnpj);
                    }
                }
            }
            if (celular.length != 11 && celular.length != 0) {
                assignError("celular", signup.signup3.logs.invalidphone);
            }
            if (telefone.length != 10 && telefone.length != 0) {
                assignError("telefone", signup.signup3.logs.invalidphone);
            }
            if (comercial.length != 10 && comercial.length != 0) {
                assignError("comercial", signup.signup3.logs.invalidphone);
            }

            if (cep.length != 8){
                assignError("cep", signup.signup3.logs.invalidcep);
            }

            if (estado == "") {
                assignError("estado", signup.signup3.logs.invaliduf);
            }

            if (cidade.length < 2) {
                assignError("cidade", signup.signup3.logs.invalidcity);
            }

            if (bairro.length < 2) {
                assignError("bairro", signup.signup3.logs.invalidneighborhood);
            }

            if (logradouro.length < 2) {
                assignError("logradouro", signup.signup3.logs.invalidstreet);
            }

            if (numero == null || numero < 1) {
                assignError("numero", signup.signup3.logs.invalidnumber);
            }
            break;
        case 4:
            if (tipoPerfil == 1) {
                if (creci.length != 7) {
                    assignError("creci", signup.signup4.logs.invalidcreci);
                } else {
                    const regexCreci = /^\d{6}[a-zA-Z]$/;
                    if (!regexCreci.test(creci)) {
                        assignError("creci", signup.signup4.logs.invalidcreci);
                    } else {
                        let { data: usuario } = await supabase
                            .from("corretor")
                            .select("creci")
                            .eq("creci", creci);

                        if (usuario?.length) {
                            assignError(
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
    especialidade: Array<any>,
    regiaoAtuacao: Array<any>
) => {
    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
        options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
        },
    });

    if (!error) {
        const userId = data.user?.id!;

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
                    idregiao: item.id,
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
