import crypto from 'crypto';
export function mockCreateProject(project){
  const txHash = '0x'+crypto.randomBytes(12).toString('hex');
  return { txHash, createdAt: Date.now(), projectId: project.id };
}
export function mockMint(project, amount=100){
  const mintTx = '0xM'+crypto.randomBytes(12).toString('hex');
  return { mintTx, amount };
}
