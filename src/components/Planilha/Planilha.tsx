import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ButtonLaranja from "../UI/ButtonLaranja/ButtonLaranja";
import s from "./Planilha.module.css";
type PlanilhaProps = {
  value: {
    descricao?: string;
    rotina?: string;
    tempo?: string;
    atendente?: string;
    data?: string;
  }[];
  tituloPlanilha: string[];
};
export default function Planilha(props: PlanilhaProps) {
  return (
    <TableContainer sx={{maxHeight:'335px'}}>
      <Table
        sx={{
          fontFamily: "Nunito",
          color: "white",
          backgroundColor: "#1A1B1F",
          borderRadius: "8px",
        }}>
        <TableHead>
          <TableRow>
            {props.tituloPlanilha.map((item, index) => (
              <TableCell sx={{color: "white"}} key={index}>{item}</TableCell>
            ))}
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.value.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  color: "white",
                  padding: "20px",
                  width: "650px",
                  paddingRight: "73px",
                }}>
                {row.descricao}
              </TableCell>
              <TableCell
                sx={{ color: "white", padding: "20px", paddingRight: "75px" }}>
                {row.rotina}
              </TableCell>
              <TableCell
                sx={{ color: "white", padding: "20px", paddingRight: "75px" }}>
                {row.tempo}
              </TableCell>
              <TableCell
                sx={{ color: "white", padding: "20px", width: "150px" }}>
                {row.data}
              </TableCell>
              <TableCell
                sx={{ color: "white", padding: "20px", paddingRight: "75px" }}>
                {row.atendente}
              </TableCell>
              <TableCell sx={{ padding: "0 16px" }}>
                <ButtonLaranja
                  value="Vincular"
                  classNameProps={s.vincularButton}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
