import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SmartJobModule = buildModule("SmartJobModule", (m) => {
  const owner = m.getAccount(0);
  const smartJob = m.contract("SmartJob", [owner]);

  const proxy = m.contract("TransparentUpgradeableProxy", [
      smartJob,
      owner,
      "0x"
  ]);

  const proxyAdminAddress = m.readEventArgument(
      proxy,
      "AdminChanged",
      "newAdmin"
  );

  const proxyAdmin = m.contractAt("ProxyAdmin", proxyAdminAddress)

  return { proxyAdmin, proxy };
});

export default SmartJobModule;
