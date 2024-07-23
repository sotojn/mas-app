export function allAccess(req:any, res:any) {
    res.status(200).send("Public Content.");
  };
  
  export function playerBoard(req:any, res:any) {
    res.status(200).send("Player Content.");
  };
  
  export function adminBoard(req:any, res:any) {
    res.status(200).send("Admin Content.");
  };