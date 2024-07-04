

export const protectAccountOwner = (ownerUserId: number, sessionUserId: number): boolean => {
  if (ownerUserId !== sessionUserId){
    return false;
  }
  return true;
}