import { Comentario } from "./comentario.model";
import { FotoProduto } from "./foto-produto.model";

export class Produto {
    id: number;
    nome: string;
    descricao: string;
    fotos?: FotoProduto[];
    valor: number;
    dataInclusao: string;
    comentarios: Comentario[];
}