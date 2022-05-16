import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório."),
  description: Yup.string().required("A descrição é obrigatório."),
  price: Yup.number()
    .typeError("O preço deve ser um numeral. ex: 12.99 ou 12")
    .min(0, "O preço deve ser maior ou igual a 0")
    .max(10000, "O preço deve ser menor ou igual a 10000")
    .required("O preço é obrigatório."),
});

export default validationSchema;
