import s from "./Chamado.module.css";
import { FormEvent, useEffect, useState } from "react";
import ButtonVermelho from "../components/UI/ButtonVermelho/ButtonVermelho";
import SelectMenu from "../components/UI/SelectMenu/SelectMenu";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import ButtonPreto from "../components/UI/ButtonPreto/ButtonPreto";
import { useNavigate } from "react-router-dom";
interface InsertChamado {
  ococodigo: number;
  chastatus: string;
  teccodigo: number;
  usucodigo: number;
  inclusaoUsucodigo: number;
}
// interface InsertAnexo {
//   ococodigo: number;
//   ocoanexo: File | null;
//   ocoanxtipo: string;
//   ocoanxstatus: string;
//   inclusaoUsucodigo: number;
//   usucodigo: number;
// }
interface InsertOcorrenciaXTecnico {
  ococodigo: number;
  chacodigo: number;
  teccodigo: number;
  ocotectipo: string;
  inclusaoUsucodigo: number;
}
// interface SelectTipoProblema {
//   tipprocodigo: number;
//   tipprodescricao: string;
// }
export function Chamado() {
  const ococodigoValue = localStorage.getItem("ocorrencia");
  const dataLocalStorage = localStorage.getItem("user");
  const dataLocalStorageFuncodigo = localStorage.getItem("funcodigo");
  const statusChamado = [
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

  // const statusOcorrencia = [
  //   {
  //     itemName: "Aberto",
  //     itemValue: "A",
  //   },
  //   {
  //     itemName: "Finalizado",
  //     itemValue: "F",
  //   },
  //   {
  //     itemName: "Finalizado",
  //     itemValue: "F",
  //   },
  //   {
  //     itemName: "Finalizado",
  //     itemValue: "F",
  //   },
  // ];
  const navigate = useNavigate();
  const [insertChamado, setInsertChamado] = useState<InsertChamado>({
    ococodigo: 0,
    chastatus: "",
    teccodigo: 0,
    usucodigo: 0,
    inclusaoUsucodigo: 0,
  });
  // const [insertAnexo, setInsertAnexo] = useState<InsertAnexo>({
  //   ococodigo: 0,
  //   ocoanexo: null,
  //   ocoanxtipo: "",
  //   ocoanxstatus: "",
  //   inclusaoUsucodigo: 0,
  //   usucodigo: 0,
  // });
  // const [itemAnexo, setItemAnexo] = useState<File | null>(null);
  // const [tipoProblema, setTipoProblema] = useState<SelectTipoProblema[]>([]);
  const [insertOcorrenciaXTecnico, setInsertOcorrenciaXTecnico] =
    useState<InsertOcorrenciaXTecnico>({
      ococodigo: 0,
      chacodigo: 0,
      teccodigo: 0,
      ocotectipo: "string",
      inclusaoUsucodigo: 0,
    });
  // const getProblema = async () => {
  //   try {
  //     const response = await axios.get<SelectTipoProblema[]>(
  //       "https://LINK.DA.API/tipoProblema/getTiposProblemas"
  //     );
  //     const tipoProblema: SelectTipoProblema[] = response.data.map(
  //       (problema) => ({
  //         tipprocodigo: problema.tipprocodigo,
  //         tipprodescricao: problema.tipprodescricao,
  //       })
  //     );
  //     setTipoProblema(tipoProblema);
  //   } catch (error) {
  //     console.error("Erro ao fazer requisição de tipo problema: ", error);
  //   }
  // };
  // useEffect(() => {
  //   getProblema();
  // }, []);

  useEffect(() => {
    if (ococodigoValue) {
      const ocodigo = JSON.parse(ococodigoValue);
      if (dataLocalStorage) {
        const userData = JSON.parse(dataLocalStorage);
        setInsertChamado((prevState) => ({
          ...prevState,
          ococodigo: ocodigo,
          usucodigo: userData.usucodigo,
          teccodigo: userData.teccodigo,
          inclusaoUsucodigo: userData.inclusaoUsucodigo,
        }));
        // setInsertAnexo((prevState) => ({
        //   ...prevState,
        //   ococodigo: ocodigo,
        //   usucodigo: userData.usucodigo,
        //   inclusaoUsucodigo: userData.inclusaoUsucodigo,
        // }));
        if (dataLocalStorageFuncodigo) {
          const userFuncodigo = JSON.parse(dataLocalStorageFuncodigo);
          setInsertOcorrenciaXTecnico((prevState) => ({
            ...prevState,
            ococodigo: ocodigo,
            inclusaoUsucodigo: userData.inclusaoUsucodigo,
            teccodigo: userData.teccodigo,
            ocotectipo: userFuncodigo.funtipo,
          }));
        }
      }
    }
  }, [dataLocalStorage, ococodigoValue, dataLocalStorageFuncodigo]);

  function handleChangeChamado(event: SelectChangeEvent<string>) {
    const { name, value } = event.target;
    setInsertChamado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  console.log(insertChamado);
  // function handleChangeAnexo(event: SelectChangeEvent<string>) {
  //   const { name, value } = event.target;
  //   setInsertAnexo((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // }
  // function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     setItemAnexo(file);

  //     setInsertAnexo((prevState) => ({
  //       ...prevState,
  //       ocoanexo: file,
  //     }));
  //   }
  // }
  async function handleSubmitChamado(event: FormEvent) {
    event.preventDefault();

    if (ococodigoValue !== null && dataLocalStorage) {
      setInsertChamado({
        ococodigo: insertChamado.ococodigo,
        chastatus: insertChamado.chastatus,
        teccodigo: insertChamado.teccodigo,
        usucodigo: insertChamado.usucodigo,
        inclusaoUsucodigo: insertChamado.inclusaoUsucodigo,
      });
      console.log(insertChamado);

      try {
        const data = axios.post<InsertChamado>(
          "https://LINK.DA.API/chamado/insertChamado",
          insertChamado,
          {
            headers: {
              "content-type": "text/json",
            },
          }
        );
        await data.then((response) => {
          try {
            const chacodigo = response.data;

            if (typeof chacodigo === "number") {
              setInsertOcorrenciaXTecnico((prevState) => ({
                ...prevState,
                chacodigo: chacodigo,
              }));
              console.log(insertOcorrenciaXTecnico);
              // axios.post<InsertOcorrenciaXTecnico>(
              //   "https://LINK.DA.API/ocorrencia/insertOcorrenciaXTecnico",
              //   insertOcorrenciaXTecnico,
              //   {
              //     headers: {
              //       "Content-Type": "text/json",
              //     },
              //   }
              // );
            }
          } catch (error) {
            console.log("Erro no submit de ocorrenciaxtecnico: ", error);
          }
        });
      } catch (error) {
        console.log("Não enviou dados para o banco de chamado: ", error);
      }
    } else {
      console.log("A chave 'ocorrencia' não foi encontrada no localStorage.");
    }
  }
  // async function handleSubmitAnexo(event: FormEvent) {
  //   event.preventDefault();
  //   const ococodigoValue = localStorage.getItem("ocorrencia");
  //   const dataLocalStorage = localStorage.getItem("user");
  //   if (ococodigoValue !== null && dataLocalStorage) {
  //     const ococodigo = parseInt(ococodigoValue, 10);
  //     const userData = JSON.parse(dataLocalStorage);
  //     const { usucodigo, inclusaoUsucodigo } = userData;
  //     setInsertAnexo({
  //       ococodigo: ococodigo,
  //       ocoanexo: itemAnexo,
  //       ocoanxstatus: insertAnexo.ocoanxstatus,
  //       ocoanxtipo: insertAnexo.ocoanxtipo,
  //       usucodigo,
  //       inclusaoUsucodigo,
  //     });
  //     try {
  //       const temp = await axios.post<InsertAnexo>(
  //         "https://LINK.DA.API/ocorrencia/insertOcorrenciaXAnexo",
  //         insertAnexo,
  //         {
  //           headers: {
  //             "content-type": "application/json",
  //           },
  //         }
  //       );
  //       console.log("Insert anexo:", insertAnexo.ocoanexo);
  //       console.log("temp: ", temp.data.ocoanexo);
  //     } catch (error) {
  //       console.log("Erro no insert de anexo: ", error);
  //     }
  //     console.log("Insert anexo:", insertAnexo);
  //   } else {
  //     console.log("Dados do usuário não encontrados no localStorage.");
  //   }
  // }

  function finalizarOcorrencia() {
    navigate("/");
    localStorage.removeItem("ocorrencia");
  }
  return (
    <div>
      <form onSubmit={handleSubmitChamado} className={s.chamadoForm}>
        <span className={s.chamadoTitle}>Chamado</span>
        <SelectMenu
          labelProps="Status Chamado"
          changeHandler={handleChangeChamado}
          itemMenu={statusChamado.map((item) => ({
            itemName: item.itemName,
            itemValue: item.itemValue,
          }))}
          nome="chastatus"
          sx={{
            color: "white",
            backgroundColor: "#1A1B1F",
            fontSize: "14px",
            marginBottom: "8px",
            borderRadius: "8px",
            width: "400px",
          }}
        />
        <ButtonVermelho nome="Abrir Chamado" type="submit" />
        <ButtonPreto
          nome="Finalizar Ocorrencia"
          type="submit"
          onClick={finalizarOcorrencia}
        />
      </form>
      {/*<form onSubmit={handleSubmitAnexo}>
        <SelectMenu
          labelProps="Tipo"
          changeHandler={handleChangeAnexo}
          itemMenu={tipoProblema.map((item) => ({
            itemName: item.tipprodescricao,
            itemValue: item.tipprocodigo,
          }))}
          nome="ocoanxtipo"
          sx={{
            color: "white",
            backgroundColor: "#1A1B1F",
            fontSize: "14px",
            marginBottom: "8px",
            borderRadius: "8px",
          }}
        />
        <SelectMenu
          labelProps="Status"
          changeHandler={handleChangeAnexo}
          itemMenu={statusOcorrencia.map((cliente) => ({
            itemName: cliente.itemName,
            itemValue: cliente.itemValue,
          }))}
          nome="ocoanxstatus"
          sx={{
            color: "white",
            backgroundColor: "#1A1B1F",
            fontSize: "14px",
            marginBottom: "8px",
            borderRadius: "8px",
          }}
        />
        <label htmlFor="fileInput">Anexar</label>
        <input
          placeholder="Arquivo"
          name="ocoanexo"
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          className={s.inputFile}
        />
        <ButtonVermelho nome="Submit anexo" type="submit" />
      </form>*/}
    </div>
  );
}
