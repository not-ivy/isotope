type Group = {
  name: string;
  id: string;
  createdAt: Date;
  socket?: WebSocket;
};

export default Group;
