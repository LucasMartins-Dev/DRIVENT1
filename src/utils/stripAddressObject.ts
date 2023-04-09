type AddressProps = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  };
  
  export const stripAddressObject = async (address: AddressProps) => {
    return {
      logradouro: address.logradouro || '',
      complemento: address.complemento || '',
      bairro: address.bairro || '',
      cidade: address.localidade || '',
      uf: address.uf || '',
    };
  };