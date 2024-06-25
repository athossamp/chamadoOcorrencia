import axios from "axios";

// AuthService.ts
export const login = async (
  teclogin: string,
  tecsenha: string
): Promise<void> => {
  const mockApiResponse = await fetch(
    `https://LINK.DA.API/tecnicologicom/login?teclogin=${teclogin}&tecsenha=${tecsenha}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const response = await mockApiResponse.json();
  const dataApi = JSON.stringify(response);
  if (response.teclogin == teclogin && response.tecsenha == tecsenha) {
    localStorage.setItem("user", dataApi);
    const funcodigoStorage = localStorage.getItem("user");
    if (funcodigoStorage) {
      const funcodigoJson = JSON.parse(funcodigoStorage);
      const ocotectipoApiResponse = await axios.get(
        `https://LINK.DA.API/funcao/getFuncaoByFuncodigo?funcodigo=${funcodigoJson.funcodigo}`
      );
      localStorage.setItem(
        "funcodigo",
        JSON.stringify(ocotectipoApiResponse.data)
      );
      console.log("funfou");
    }

    return;
  } else {
    throw new Error("Deu ruim");
  }
};
