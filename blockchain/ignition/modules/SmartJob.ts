import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SmartJobModule = buildModule("SmartJobV1Module", (m) => {
  const owner = m.getAccount(0);
  const smartJob = m.contract("SmartJobV1", [owner]);

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
