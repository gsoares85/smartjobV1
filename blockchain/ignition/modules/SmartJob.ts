import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SmartJobModule = buildModule("SmartJobModule", (m) => {
  const smartJob = m.contract("SmartJob", []);

  return { smartJob };
});

export default SmartJobModule;
