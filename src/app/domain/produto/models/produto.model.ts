import { CaracteristicaProduto } from "./caracteristica-produto.model";
import { FotoProduto } from "./foto-produto.model";

export class Produto {
    nome: string;
    descricao: string;
    fotos?: FotoProduto[];
    valor: number;
    dataInclusao: string;
    caracteristicas?: CaracteristicaProduto[];
}