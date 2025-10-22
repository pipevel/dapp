"use client";

// import Link from "next/link";
import PapayosJson from "../../hardhat/deployments/bsc/Papayos.json";
import type { NextPage } from "next";
import { formatUnits } from "viem";
import { parseUnits } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const PAPAYOS_ABI = PapayosJson.abi;
const Home: NextPage = () => {
  const recipientAddress = "0xe790B4BEa7D812Ee9555944f8510dca7A51C31d2";
  const rawAmount = "5";
  const PPY_DECIMALS = 8;
  const amountToSend = parseUnits(rawAmount, PPY_DECIMALS);
  const PPY_TOKEN_ADDRESS = "0x5cf26934921c3537db91d0499568f040c5691240";
  const BSC_MAINNET_ID = 56;

  const { address: connectedAddress } = useAccount();
  const { data: ppyBalance, isLoading: isBalanceLoading } = useReadContract({
    address: PPY_TOKEN_ADDRESS as `0x${string}`,
    abi: PAPAYOS_ABI,
    functionName: "balanceOf",
    args: [connectedAddress],
    chainId: BSC_MAINNET_ID,
    query: {
      enabled: !!connectedAddress,
    },
  });

  const { writeContract, isPending: isMining } = useWriteContract();

  const { data: totalSupply } = useReadContract({
    address: PPY_TOKEN_ADDRESS as `0x${string}`,
    abi: PAPAYOS_ABI,
    functionName: "totalSupply",
    args: [],
    chainId: BSC_MAINNET_ID,
    query: {
      enabled: true,
    },
  });

  let formattedTotalSupply = "0.00";
  if (totalSupply && typeof totalSupply === "bigint") {
    const rawDecimalString = formatUnits(totalSupply, PPY_DECIMALS);

    formattedTotalSupply = Number(rawDecimalString).toLocaleString("es-ES", {});
  }

  let formattedPpyBalance = "0.00";
  if (ppyBalance && typeof ppyBalance === "bigint") {
    formattedPpyBalance = formatUnits(ppyBalance, PPY_DECIMALS);
  }

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Bienenidos a Lapapaya</span>
            <span className="block text-4xl font-bold">
              El PPY Token nos ha permitido recoger 22 Toneladas de residuos del río Cali
            </span>
          </h1>

          <div className="flex items-center flex-col grow pt-10">
            <div className="px-5">
              <h1 className="text-center">{"PPY"}</h1>
              <div className="flex justify-center items-center space-x-2 flex-col">
                <p className="my-2 font-medium">Connected Address:</p>
                <Address address={connectedAddress} />
              </div>

              <div className="nt-4 text-center p-4 bg-base-200 rounded-lg shadow-md">
                {isBalanceLoading ? (
                  <p className="text-xl text-secondary font-semibold"> Cargando Balance PPY... </p>
                ) : (
                  <p className="text-2xl font-extrabold text-primary">Balance Papayos (PPY) : {formattedPpyBalance}</p>
                )}
              </div>
              <p className="text-md font-semibold text-gray-600">Suministro total de PPY: {formattedTotalSupply}</p>
            </div>
            <div className="flex flex-col items-center pt-10">
              <h1 className="text-xl font-bold">Transferencia de Papayos (PPY)</h1>
              <p className="mb-4">
                Enviando {rawAmount} PPY a la dirección: {recipientAddress}
              </p>

              <button
                className="btn btn-primary"
                // B. Llama a writeContract pasando la configuración de la transacción
                onClick={() =>
                  writeContract({
                    address: PPY_TOKEN_ADDRESS as `0x${string}`,
                    abi: PAPAYOS_ABI,
                    functionName: "transfer",
                    args: [recipientAddress, amountToSend],
                    value: 0n,
                  })
                }
                disabled={isMining}
              >
                {isMining ? "Procesando..." : "Transferir Papayos"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
