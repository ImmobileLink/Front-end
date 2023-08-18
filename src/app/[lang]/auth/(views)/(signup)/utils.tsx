// O Auth possui alguns dados sensíveis de cadastro que não são interessantes de se passar pelo client-side
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
    setAlert: Function,
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
    creci: string
) => {
    var erros: { [k: string]: any } = {};

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

        case 2:
        // Nenhuma validação necessária no passo 2 por enquanto.
        //  return true;
        case 3:
            if (tipoPerfil == 1) {
                // valida nome
                if (nome.length < 4) {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup.signup3.logs.invalidname,
                    });
                    //     return false;
                }
                // valida cpf
                if (cpf.length != 11) {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup.signup3.logs.invalidcpf,
                    });
                    //   return false;
                }

                let { data: usuario } = await supabase
                    .from("corretor")
                    .select("cpf")
                    .eq("cpf", cpf);

                if (usuario?.length) {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup.signup3.logs.invalidcpf,
                    });
                    //    return false;
                }

                // valida cnpj
                if (cnpj.length != 14 && cnpj.length > 0) {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup.signup3.logs.invalidcnpj,
                    });
                    return false;
                } else if (cnpj.length == 14) {
                    let { data: usuario } = await supabase
                        .from("corretor")
                        .select("cnpj")
                        .eq("cnpj", cnpj);

                    if (usuario?.length) {
                        setAlert({
                            type: "warning",
                            title: "",
                            message: signup.signup3.logs.invalidcnpj,
                        });
                        //   return false;
                    }
                }
            } else {
                // o nome fantasia tem no mínimo 12 pontos [LegisWEB]
                if (nomeFantasia.length < 12) {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup.signup3.logs.invalidfantasyname,
                    });
                    //   return false;
                }
                if (cnpj.length != 14) {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup.signup3.logs.invalidcnpj,
                    });
                    //  return false;
                } else {
                    let { data: usuario } = await supabase
                        .from("corporacao")
                        .select("cnpj")
                        .eq("cnpj", cnpj);

                    if (usuario?.length) {
                        setAlert({
                            type: "warning",
                            title: "",
                            message: signup.signup3.logs.invalidcnpj,
                        });
                        //  return false;
                    }
                }
            }
            if (
                (celular.length != 11 && celular.length != 0) ||
                (telefone.length != 10 && telefone.length != 0) ||
                (comercial.length != 10 && comercial.length != 0)
            ) {
                setAlert({
                    type: "warning",
                    title: "",
                    message: signup.signup3.logs.invalidphone,
                });
                //  return false;
            }
        //  return true;
        case 4:
            if (tipoPerfil == 1) {
                if (creci.length < 7) {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup.signup4.logs.invalidcreci,
                    });
                    //   return false;
                } else {
                    const regexCreci = /^\d{6}[a-zA-Z]$/;
                    if (!regexCreci.test(creci)) {
                        setAlert({
                            type: "warning",
                            title: "",
                            message: signup.signup4.logs.invalidcreci,
                        });
                        //     return false;
                    }
                    let { data: usuario } = await supabase
                        .from("corretor")
                        .select("creci")
                        .eq("creci", creci);

                    if (usuario?.length) {
                        setAlert({
                            type: "warning",
                            title: "",
                            message: signup.signup4.logs.invalidcreci,
                        });
                        //    return false;
                    }
                }
            }
        // return true;
        case 5:
        // Nenhuma validação necessária no passo 5 por enquanto.
        //  return true;
    }
    // default
    //  return false;

    console.log(erros);
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
