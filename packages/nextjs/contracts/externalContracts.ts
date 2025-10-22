// nextjs/TS externalContracts.ts
// <-- ¡Añadir 'Abi' aquí!
import PapayosJson from "../../hardhat/deployments/bsc/Papayos.json";
// IMPORTA EL TIPO ABI AQUÍ
import type { Abi, Address } from "viem";
import { bsc } from "viem/chains";
import type { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

// Extraemos la ABI desde el JSON generado por Hardhat
// Aplica el tipo 'Abi' de viem
const PAPAYOS_ABI: Abi = PapayosJson.abi as any; // <--- Correct fix applied here

// Definimos la dirección del contrato de forma tipada
const PapayosAddress = "0x5cF26934921c3537D91b049569f4Af40c5691249" as Address;

// Definimos el objeto de contratos externos SIN la clave "contracts"
const externalContracts = {
  // AÑADE ESTA CLAVE 'contracts'
  contracts: {
    // Definimos el contrato Papayos bajo la ID de la cadena (bsc.id = 56)
    [bsc.id]: {
      Papayos: {
        address: PapayosAddress,
        abi: PAPAYOS_ABI,
      },
    },
  },
} as const; // <--- Aplica 'as const' al objeto completo

// Exportamos con verificación de tipo
export default externalContracts satisfies GenericContractsDeclaration;
