import { Comentario } from "./comentario.model";
import { FotoProduto } from "./foto-produto.model";

export class Produto {
    id?: string;
    nome: string;
    descricao: string;
    fotos?: FotoProduto[];
    valor: number;
    dataInclusao: string;
    comentarios?: Comentario[];
}