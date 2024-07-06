import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SmartJobModule = buildModule("SmartJobModule", (m) => {
  const owner = m.getAccount(0);
  const smartJob = m.contract("SmartJob", [owner]);

  return { smartJob };
});

export default SmartJobModule;
