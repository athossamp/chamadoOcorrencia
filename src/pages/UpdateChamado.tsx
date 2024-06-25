import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SelectMenu from "../components/UI/SelectMenu/SelectMenu";
import { SelectChangeEvent } from "@mui/material";
import ButtonLaranja from "../components/UI/ButtonLaranja/ButtonLaranja";

interface chamado {
  chacodigo: number;
  ococodigo: number;
  chaabertura: Date;
  chafechamento: Date;
  chastatus: string;
  teccodigo: number;
  ultatualizacao: Date;
  usucodigo: number;
  inclusao: Date;
  inclusaoUsucodigo: number;
}

export function GetChamadoByChacodigo() {
  const [chamado, setChamado] = useState<chamado>();
  const { chacodigo } = useParams();
  const navigate = useNavigate();

  const statusOcorrencia = [
    {
      itemName: "Aberto",
      itemValue: "A",
    },
    {
      itemName: "Finalizado",
      itemValue: "F",
    },
    {
      itemName: "Finalizado",
      itemValue: "F",
    },
    {
      itemName: "Finalizado",
      itemValue: "F",
    },
  ];

  useEffect(() => {
    if (chacodigo) {
      axios
        .get(
          `https://LINK.DA.API/chamado/getChamadoByChacodigo?chacodigo=${chacodigo}`
        )
        .then((response) => {
          setChamado(response.data);
        })

        .catch((error) => {
          console.error("Error fetching occurrence:", error);
        });
    }
  }, [chacodigo]);

  function handleChangeOcorrencia(event: SelectChangeEvent<string>) {
    const { name, value } = event.target;

    setChamado(
      (prevState) =>
        ({
          ...prevState,
          chastatus: value,
          [name]: value,
        } as chamado)
    );
  }
  // console.log(chamado);
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      //const dataCerta = formatDate(new Date());
      if (chamado) {
        if (chamado.chastatus == "F") {
          setChamado({
            ...chamado,
          });
          axios.post("https://LINK.DA.API/chamado/updateChamado", chamado, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(chamado);
          navigate("/ocorrencia/");
        } else {
          axios.post("https://LINK.DA.API/chamado/updateChamado", chamado, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(chamado);
          navigate("/ocorrencia/");
        }
      }
    } catch (error) {
      console.log("erro ao submeter update: ", error);
    }
  }
  return (
    <div>
      {chamado && (
        <form onSubmit={handleSubmit}>
          <SelectMenu
            labelProps="Status Chamado"
            changeHandler={handleChangeOcorrencia}
            itemMenu={statusOcorrencia.map((item) => ({
              itemName: item.itemName,
              itemValue: item.itemValue,
            }))}
            valor={chamado.chastatus}
            nome="chastatus"
            sx={{
              color: "white",
              backgroundColor: "#1A1B1F",
              fontSize: "14px",
              marginBottom: "8px",
              borderRadius: "8px",
            }}
          />
          <ButtonLaranja value={"Atualizar Chamado"} />
        </form>
      )}
    </div>
  );
}
