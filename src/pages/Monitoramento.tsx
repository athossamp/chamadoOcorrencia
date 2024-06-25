import s from "./Monitoramento.module.css";
import { DatagridChamado } from "../components/DatagridChamado/DatagridChamado";
import { DatagridOcorrencia } from "../components/DatagridOcorrencia/DatagridOcorrencia";

export default function Monitoramento() {
  return (
    <section className={s.monitoramentoTotal}>
      <h2>Ocorrencia</h2>
      <DatagridOcorrencia />
      <h2>Chamados</h2>
      <DatagridChamado />
    </section>
  );
}
