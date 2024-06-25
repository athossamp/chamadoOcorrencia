import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import s from "./Home.module.css";
import ButtonVermelho from "../components/UI/ButtonVermelho/ButtonVermelho";
import SelectMenu from "../components/UI/SelectMenu/SelectMenu";
import { InputModel } from "../components/UI/Input/Input";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DatagridOcorrencia } from "../components/DatagridOcorrencia/DatagridOcorrencia";
import { AutoComplete } from "../components/AutoComplete/AutoComplete";
import TextareaModel from "../components/UI/Textarea/Textarea";

interface SelectCliente {
  clicodigo: number | string;
  clinome: string;
  cliapelido: string;
}
interface SelectClienteFuncionario {
  clifuncodigo: number;
  clicodigo: number | string;
  clifunnome: string;
  clifunfone: string;
}
interface SelectTipoProblema {
  tipprocodigo: number;
  tipprodescricao: string;
}
interface SelectTipoSolucao {
  tipsolcodigo: number;
  tipsoldescricao: string;
}
interface SelectRotina {
  lgrcodigo: number;
  lgrrotina: number;
  lgrdescricao: string;
}
interface InsertOcorrencia {
  ocodescricao: string;
  ocosolucao: string;
  lgrcodigo: number;
  clicodigo: number;
  clifunnome: string;
  clifunfone: string;
  clifuncodigo: number;
  teccodigo: number;
  tipprocodigo: number;
  tipsolcodigo: number;
  ocostatus: string;
  ocodesenvolvimento: string;
  inclusaoUsucodigo: number;
  usucodigo: number;
}
interface InsertFuncionario {
  clifuncodigo: number;
  clicodigo: number;
  clifunnome: string;
  clifunfone: string;
}
interface UpdateFuncionario {
  clicodigo: number;
  clifuncodigo: number;
  clifunnome: string;
  clifunfone: string;
}

export default function Home() {
  const dataLocalStorage = localStorage.getItem("user");
  //const dataUser = JSON.parse(dataLocalStorage || "");

  const dataLocalStorageFuncodigo = localStorage.getItem("funcodigo");
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
  const desenvolvimento = [
    {
      itemName: "Sim",
      itemValue: "s",
    },
    {
      itemName: "Não",
      itemValue: "n",
    },
  ];
  const [insertOcorrencia, setInsertOcorrencia] = useState<InsertOcorrencia>({
    ocodescricao: "",
    ocosolucao: "",
    lgrcodigo: 0,
    clicodigo: 0,
    clifunnome: "",
    clifunfone: "",
    clifuncodigo: 0,
    teccodigo: 0,
    tipprocodigo: 0,
    tipsolcodigo: 0,
    ocostatus: "",
    ocodesenvolvimento: "",
    inclusaoUsucodigo: 0,
    usucodigo: 0,
  });
  const [insertFuncionario, setInsertFuncionario] = useState<InsertFuncionario>(
    {
      clifuncodigo: 0,
      clicodigo: 0,
      clifunnome: "",
      clifunfone: "",
    }
  );
  const [clientes, setClientes] = useState<SelectCliente[]>([]);
  const [clienteFuncionario, setClienteFuncionario] = useState<
    SelectClienteFuncionario[]
  >([]);
  const [updateFuncionario, setUpdateFuncionario] = useState<UpdateFuncionario>(
    {
      clicodigo: 0,
      clifuncodigo: 0,
      clifunfone: "",
      clifunnome: "",
    }
  );
  const [tipoProblema, setTipoProblema] = useState<SelectTipoProblema[]>([]);
  const [tipoSolucao, setTipoSolucao] = useState<SelectTipoSolucao[]>([]);
  const [rotina, setRotina] = useState<SelectRotina[]>([]);
  const navigate = useNavigate();
  const getClientes = async () => {
    try {
      const response = await axios.get<SelectCliente[]>(
        "https://LINK.DA.API/cliente/getClientes"
      );
      const clientesFormatados: SelectCliente[] = response.data.map(
        (cliente) => ({
          clicodigo: cliente.clicodigo,
          clinome: cliente.clinome,
          cliapelido: cliente.cliapelido,
        })
      );
      setClientes(clientesFormatados);
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
    }
  };
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
  const getRotinas = async () => {
    try {
      const response = await axios.get<SelectRotina[]>(
        "https://LINK.DA.API/logicom/getLogicomRotinas"
      );
      const selectRotina: SelectRotina[] = response.data.map((problema) => ({
        lgrcodigo: problema.lgrcodigo,
        lgrrotina: problema.lgrrotina,
        lgrdescricao: problema.lgrdescricao,
      }));
      setRotina(selectRotina);
    } catch (error) {
      console.error("Erro ao fazer requisição de rotinas: ", error);
    }
  };
  //useEffect para pegar dados necessários do banco
  useEffect(() => {
    getClientes();
    getProblema();
    getSolucao();
    getRotinas();
  }, []);
  //useEffect para adicionar dados do usuario no Insert de Ocorrencia
  useEffect(() => {
    if (dataLocalStorage) {
      const userData = JSON.parse(dataLocalStorage);
      setInsertOcorrencia(userData);
      setInsertFuncionario(userData);
    }
  }, [dataLocalStorage, dataLocalStorageFuncodigo]);

  const getClientesFuncionario = async (codigoCliente: number | string) => {
    try {
      const response = await axios.get<SelectClienteFuncionario[]>(
        `https://LINK.DA.API/cliente/getClienteFuncionarios?clicodigo=${codigoCliente}`
      );
      console.log(response);
      const funcionariosFormatados: SelectClienteFuncionario[] =
        response.data.map((funcionario) => ({
          clicodigo: funcionario.clicodigo,
          clifunnome: funcionario.clifunnome,
          clifuncodigo: funcionario.clifuncodigo,
          clifunfone: funcionario.clifunfone,
        }));
      setUpdateFuncionario((prevState) => ({
        ...prevState,
        clicodigo: insertOcorrencia.clicodigo,
      }));
      setClienteFuncionario(funcionariosFormatados);
      console.log(clienteFuncionario);
    } catch (error) {
      console.error("Erro ao fazer a requisição ", error);
    }
  };

  function handleChangeOcorrencia(
    event: SelectChangeEvent<string> | ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setInsertOcorrencia((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setUpdateFuncionario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const handleFuncionarioSelection = (value: number | string) => {
    // Find the selected employee from clienteFuncionario array
    const selectedEmployee = clienteFuncionario.find(
      (employee) => employee.clifuncodigo === value
    );
    if (selectedEmployee) {
      setUpdateFuncionario((prevState) => ({
        ...prevState,
        clifunnome: selectedEmployee.clifunnome,
        clifunfone: selectedEmployee.clifunfone,
      }));
      console.log(selectedEmployee.clifunfone);
    }
  };
  const handleAutoCompleteChange = (
    _event: ChangeEvent<object>,
    newValue: { itemName: string; itemValue: string | number } | null,
    onClickProps: (value: number | string) => void // Accept onClickProps as parameter
  ) => {
    if (newValue !== null) {
      setInsertOcorrencia((prevState) => ({
        ...prevState,
        clicodigo: Number(newValue.itemValue),
        lgrcodigo: Number(newValue.itemValue),
      }));

      // Call the onClickProps function with the clicked value
      onClickProps(newValue.itemValue);
    }
  };

  function handleChangeFuncionario(event: SelectChangeEvent<string>) {
    const { name, value } = event.target;
    setInsertFuncionario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function handleUpdateFuncionario(event: FormEvent) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Update the state with the latest values
    setUpdateFuncionario((prevState) => ({
      ...prevState,
      clicodigo: insertOcorrencia.clicodigo,
      clifunfone: updateFuncionario.clifunfone,
      clifunnome: updateFuncionario.clifunnome,
    }));
    axios.post(
      "https://LINK.DA.API/cliente/upsertfuncionario",
      updateFuncionario,
      {
        headers: {
          "Content-Type": "text/json",
        },
      }
    );
    console.log(updateFuncionario);
  }

  async function handleSubmitFuncionario() {
    setInsertOcorrencia((prevState) => ({
      ...prevState,
      clifuncodigo: insertFuncionario.clifuncodigo,
    }));

    try {
      await axios.post<InsertFuncionario>(
        "https://LINK.DA.API/cliente/upsertFuncionario",
        insertFuncionario,
        {
          headers: {
            "content-type": "text/json",
          },
        }
      );

      console.log("Funcionario: ", insertFuncionario);
    } catch (error) {
      console.log("Erro no submit de ocorrenia: ", error);
      console.log("Funcionario: ", insertFuncionario);
    }
  }
  async function handleSubmitOcorrencia(event: FormEvent) {
    event.preventDefault();
    // insertOcorrencia.ocosolucao == undefined
    //   ? insertOcorrencia.ocosolucao == "Sem Solução"
    //   : insertOcorrencia.ocosolucao;
    if (insertOcorrencia.ocosolucao == undefined) {
      setInsertOcorrencia((prevState) => ({
        ...prevState,
        ocosolucao: "Sem solução",
      }));
    }
    try {
      const data = await axios.post<InsertOcorrencia>(
        "https://LINK.DA.API/ocorrencia/insertOcorrencia",
        insertOcorrencia,
        {
          headers: {
            "content-type": "text/json",
          },
        }
      );

      localStorage.setItem("ocorrencia", JSON.stringify(data.data));
      console.log("Ocorrencia: ", insertOcorrencia);
      navigate("/chamado");
    } catch (error) {
      console.log("Erro no submit de ocorrenia sem solução: ", error);
      console.log(insertOcorrencia);
    }
  }

  //console.log(insertOcorrencia);
  return (
    <div>
      <div className={s.homePage}>
        <div className={s.totalContainer}>
          <div className={s.containerImageBackground}>
            <img src="images/background.jpg" className={s.containerImage} />
            <div className={s.overlay}></div>
          </div>
          <h2>Abertura de atendimento</h2>
          <p>Sexta, 2 de Fevereiro</p>
          <div className={s.formContainer}>
            <div className={s.leftFormContainer}>
              <div className={s.clienteFormContainer}>
                <form onSubmit={handleSubmitOcorrencia}>
                  <span>Cliente</span>
                  <AutoComplete
                    classNameProps={s.autoComplete}
                    options={clientes.map((cliente) => ({
                      itemName: cliente.cliapelido,
                      itemValue: cliente.clicodigo,
                    }))}
                    onChange={
                      (event, newValue) =>
                        handleAutoCompleteChange(
                          event,
                          newValue,
                          getClientesFuncionario
                        ) // Pass getClientesFuncionario here
                    }
                    labelProps="Clientes"
                    nome="clicodigo"
                  />
                  <AutoComplete
                    classNameProps={s.autoComplete}
                    options={rotina.map((item) => ({
                      itemName: `${item.lgrrotina} - ${item.lgrdescricao}`,
                      itemValue: item.lgrrotina,
                    }))}
                    onChange={
                      (event, newValue) =>
                        handleAutoCompleteChange(
                          event,
                          newValue,
                          getClientesFuncionario
                        ) // Pass getClientesFuncionario here
                    }
                    labelProps="Rotinas"
                    nome="lgrcodigo"
                  />
                  <SelectMenu
                    labelProps="Funcionário"
                    changeHandler={handleChangeOcorrencia}
                    itemMenu={clienteFuncionario.map((cliente) => ({
                      itemName: cliente.clifunnome,
                      itemValue: cliente.clifuncodigo,
                    }))}
                    onClickProps={(value) => handleFuncionarioSelection(value)}
                    nome="clifuncodigo"
                    sx={{
                      color: "white",
                      backgroundColor: "#1A1B1F",
                      fontSize: "14px",
                      marginBottom: "8px",
                      borderRadius: "8px",
                    }}
                  />

                  <InputModel
                    classNameProps={s.inputModelStyle}
                    placeholder="Funcionário"
                    onChangeHandler={handleChangeOcorrencia}
                    nome="clifunnome"
                    inputValue={updateFuncionario.clifunnome}
                  />
                  <InputModel
                    classNameProps={s.inputModelStyle}
                    placeholder="Telefone"
                    onChangeHandler={handleChangeOcorrencia}
                    nome="clifunfone"
                    inputValue={updateFuncionario.clifunfone}
                  />
                  <ButtonVermelho
                    nome="Atualizar Funcionário"
                    type="submit"
                    onClick={handleUpdateFuncionario}
                  />

                  <SelectMenu
                    labelProps="Status Ocorrência"
                    changeHandler={handleChangeOcorrencia}
                    itemMenu={statusOcorrencia.map((item) => ({
                      itemName: item.itemName,
                      itemValue: item.itemValue,
                    }))}
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
                    labelProps="Desenvolvimento"
                    changeHandler={handleChangeOcorrencia}
                    itemMenu={desenvolvimento.map((item) => ({
                      itemName: item.itemName,
                      itemValue: item.itemValue,
                    }))}
                    nome="ocodesenvolvimento"
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
                  <div className={s.clienteFormContainerInput}>
                    <TextareaModel
                      placeholder="Descrição da Ocorrencia"
                      classNameProps={s.inputModelStyle}
                      nome="ocodescricao"
                      inputValue={insertOcorrencia.ocodescricao}
                      onChangeHandler={handleChangeOcorrencia}
                    />
                    <TextareaModel
                      placeholder="Descrição da Ocorrencia"
                      nome="ocosolucao"
                      inputValue={insertOcorrencia.ocosolucao}
                      onChangeHandler={handleChangeOcorrencia}
                    />
                  </div>

                  <ButtonVermelho nome="Iniciar Ocorrência" type="submit" />
                </form>
              </div>
              <div className={s.chamadoFormContainer}>
                {/*Submit de chamado*/}
              </div>
            </div>
            <div className={s.rightFormContainer}>
              <div className={s.desenvolvimentoFormContainer}>
                <span>Adicionar Funcionario</span>
                <form onSubmit={handleSubmitFuncionario}>
                  <InputModel
                    classNameProps={s.inputModelStyleFuncionario}
                    placeholder="Nome do funcionário"
                    onChangeHandler={handleChangeFuncionario}
                    nome="clifunnome"
                    inputValue={insertFuncionario.clifunnome}
                  />
                  <InputModel
                    classNameProps={s.inputModelStyleFuncionario}
                    placeholder="Telefone do funcionário"
                    onChangeHandler={handleChangeFuncionario}
                    nome="clifunfone"
                    inputValue={insertFuncionario.clifunfone}
                  />
                  <ButtonVermelho nome="Inserir Funcionário" type="submit" />
                </form>
              </div>
              <div className={s.solucaoFormContainer}></div>
            </div>
          </div>
        </div>
        <div className={s.planilhaContainer}>
          <div className={s.planilha}>
            <DatagridOcorrencia />
          </div>
        </div>
      </div>
    </div>
  );
}
