import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SelectMenu from "../components/UI/SelectMenu/SelectMenu";
import { SelectChangeEvent } from "@mui/material";
import ButtonLaranja from "../components/UI/ButtonLaranja/ButtonLaranja";
import TextareaModel from "../components/UI/Textarea/Textarea";

interface SelectTipoProblema {
  tipprocodigo: number;
  tipprodescricao: string;
}
interface SelectTipoSolucao {
  tipsolcodigo: number;
  tipsoldescricao: string;
}
interface ocorrencia {
  ocodescricao: string;
  ocosolucao: string;
  lgrcodigo: number;
  clicodigo: number;
  clifuncodigo: number;
  teccodigo: number;
  tipprocodigo: number;
  tipsolcodigo: number;
  ocofechamento: Date;
  ocostatus: string;
  ocodesenvolvimento: string;
  inclusaoUsucodigo: number;
  usucodigo: number;
}

export function GetOcorrenciaByOcocodigo() {
  const [ocorrencia, setOcorrencia] = useState<ocorrencia>();
  const { ococodigo } = useParams();
  const navigate = useNavigate();
  const [tipoProblema, setTipoProblema] = useState<SelectTipoProblema[]>([]);
  const [tipoSolucao, setTipoSolucao] = useState<SelectTipoSolucao[]>([]);

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
  const getProblema = async () => {
    try {
      const response = await axios.get<SelectTipoProblema[]>(
        "https://LINK.DA.API/tipoProblema/getTiposProblemas"
      );
      const tipoProblema: SelectTipoProblema[] = response.data.map(
        (problema) => ({
          tipprocodigo: problema.tipprocodigo,
          tipprodescricao: problema.tipprodescricao,
        })
      );
      setTipoProblema(tipoProblema);
    } catch (error) {
      console.error("Erro ao fazer requisição de tipo problema: ", error);
    }
  };
  const getSolucao = async () => {
    try {
      const response = await axios.get<SelectTipoSolucao[]>(
        "https://LINK.DA.API/tipoSolucao/getTiposSolucoes"
      );
      const tipoSolucao: SelectTipoSolucao[] = response.data.map(
        (problema) => ({
          tipsolcodigo: problema.tipsolcodigo,
          tipsoldescricao: problema.tipsoldescricao,
        })
      );
      setTipoSolucao(tipoSolucao);
    } catch (error) {
      console.error("Erro ao fazer requisição de tipo problema: ", error);
    }
  };

  useEffect(() => {
    getProblema();
    getSolucao();
  }, []);
  useEffect(() => {
    if (ococodigo) {
      axios
        .get(
          `https://LINK.DA.API/ocorrencia/getOcorrenciaByOcocodigo?ococodigo=${ococodigo}`
        )
        .then((response) => {
          setOcorrencia(response.data);
          console.log(response.data);
        })

        .catch((error) => {
          console.error("Error fetching occurrence:", error);
        });
    }
  }, [ococodigo]);

  function handleChangeOcorrencia(
    event: SelectChangeEvent<string> | ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setOcorrencia(
      (prevState) =>
        ({
          ...prevState,
          [name]: value,
        } as ocorrencia)
    );
  }
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const updatedOcorrencia = { ...ocorrencia };
    if (updatedOcorrencia.ocostatus === "F") {
      updatedOcorrencia.ocofechamento = new Date(); // Set ocofechamento to current date/time
      try {
        axios.post(
          "https://LINK.DA.API/ocorrencia/updateOcorrencia",
          updatedOcorrencia,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(updatedOcorrencia);
        navigate("/ocorrencia/");
      } catch (error) {
        console.log("erro ao submeter update: ", error);
      }
    } else {
      updatedOcorrencia.ocofechamento = undefined; // Set ocofechamento to current date/time
      try {
        axios.post(
          "https://LINK.DA.API/ocorrencia/updateOcorrencia",
          updatedOcorrencia,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(updatedOcorrencia);
        //navigate("/ocorrencia/");
      } catch (error) {
        console.log("erro ao submeter update: ", error);
      }
    }

    console.log(updatedOcorrencia);
    navigate("/ocorrencia/");
  }

  return (
    <div>
      {ocorrencia && (
        <form onSubmit={handleSubmit}>
          <SelectMenu
            labelProps="Status Ocorrência"
            changeHandler={handleChangeOcorrencia}
            itemMenu={statusOcorrencia.map((item) => ({
              itemName: item.itemName,
              itemValue: item.itemValue,
            }))}
            valor={ocorrencia.ocostatus}
            nome="ocostatus"
            sx={{
              color: "white",
              backgroundColor: "#1A1B1F",
              fontSize: "14px",
              marginBottom: "8px",
              borderRadius: "8px",
            }}
          />
          <SelectMenu
            labelProps="Tipo Problema"
            changeHandler={handleChangeOcorrencia}
            itemMenu={tipoProblema.map((item) => ({
              itemName: item.tipprodescricao,
              itemValue: item.tipprocodigo,
            }))}
            nome="tipprocodigo"
            sx={{
              color: "white",
              backgroundColor: "#1A1B1F",
              fontSize: "14px",
              marginBottom: "8px",
              borderRadius: "8px",
            }}
          />
          <SelectMenu
            labelProps="Tipo Solução"
            changeHandler={handleChangeOcorrencia}
            itemMenu={tipoSolucao.map((item) => ({
              itemName: item.tipsoldescricao,
              itemValue: item.tipsolcodigo,
            }))}
            nome="tipsolcodigo"
            sx={{
              color: "white",
              backgroundColor: "#1A1B1F",
              fontSize: "14px",
              marginBottom: "8px",
              borderRadius: "8px",
            }}
          />
          <div>
            <TextareaModel
              placeholder="Descrição da Ocorrencia"
              nome="ocodescricao"
              inputValue={ocorrencia.ocodescricao}
              onChangeHandler={handleChangeOcorrencia}
            />
            <TextareaModel
              placeholder="Descrição da Ocorrencia"
              nome="ocodescricao"
              inputValue={ocorrencia.ocosolucao}
              onChangeHandler={handleChangeOcorrencia}
            />
          </div>
          <ButtonLaranja value={"Atualizar Ocorrencia"} />
        </form>
      )}
    </div>
  );
}
