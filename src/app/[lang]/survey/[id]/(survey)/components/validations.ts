interface errors {
  campo1: boolean
  campo2: boolean
  campo3: boolean
  campo4: boolean
  campo5: boolean
  campo6: boolean
  campo7: boolean
  campo8: boolean
  campo9: boolean
  campo10: boolean,
}

export const verifyFields = async (
  fieldErros: errors,
  setFieldErros: Function,
  campo1: number | null,
  campo2: number | null,
  campo3: number | null,
  campo4: number | null,
  campo5: number | null,
  campo6: number | null,
  campo7: number | null,
  campo8: number | null,
  campo9: number | null,
  campo10: string | null,
) => {

  console.log(campo1)

  if (campo1 === null) {
    setFieldErros({
      ...fieldErros,
      campo1: true,
    });
  } else {
    setFieldErros({
      ...fieldErros,
      campo1: false,
    });
  }

  if (campo2 == null) {
    setFieldErros({
      ...fieldErros,
      campo2: true,
    });
  } else {
    setFieldErros({
      ...fieldErros,
      campo2: false,
    });
  }

  if (campo3 == null) {
    setFieldErros({
      ...fieldErros,
      campo3: true,
    });
  } else {
    setFieldErros({
      ...fieldErros,
      campo3: false,
    });
  }

  if (campo4 == null) {
    setFieldErros({
      ...fieldErros,
      campo4: true,
    });
  } else {
    setFieldErros({
      ...fieldErros,
      campo4: false,
    });
  }
  
  if (campo5 == null) {
    setFieldErros({
      ...fieldErros,
      campo5: true,
    });
  } else {
    setFieldErros({
      ...fieldErros,
      campo5: false,
    });
  }
  
  if (campo6 == null) {
    setFieldErros({
      ...fieldErros,
      campo6: true,
    });
  } else {
    setFieldErros({
      ...fieldErros,
      campo6: false,
    });
  }
  
  if (campo7 == null) {
    setFieldErros({
      ...fieldErros,
      campo7: true,
    });
  } else {
    setFieldErros({
      ...fieldErros,
      campo7: false,
    });
  }

  if (campo8 == null) {
    setFieldErros({
      ...fieldErros,
      campo8: true,
    });
  } else {
    setFieldErros({
      ...fieldErros,
      campo8: false,
    });
  }
  
  // if (!campo9) {
  //   assignError(erros, "campo9", survey.insertavalue);
  // }
  if (campo10!.length === 0 || campo10!.length > 3) {
    setFieldErros({
      ...fieldErros,
      campo10: true,
    });
  } else {
    setFieldErros({
      ...fieldErros,
      campo10: false,
    });
  }
  
  
  return fieldErros
}