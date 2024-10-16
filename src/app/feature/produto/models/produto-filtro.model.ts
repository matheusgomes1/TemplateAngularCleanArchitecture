import { FiltroBase } from "../../../core/models/filtro-base.model";

export class ProdutoFiltro extends FiltroBase {
  nome?: string;
  descricao?: string;
  valor?: number;
  dataInicial?: string;
  dataFinal?: string;
}