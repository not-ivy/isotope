export type Participant = {
  username: string;
  ecdsaPublicKey: Uint8Array;
  ecdhPublicKey: Uint8Array;
  role: "owner" | "trusted" | "participant";
};

// a group contain a list of participants
// when a new user joins the room, a trusted
// participant sends a list of participants
// to the new user, and the new user will perform
// a key exchange with each participant

class Group {
  participants: Participant[];

  constructor() {
    this.participants = [];
  }

  add(participant: Participant) {
    if (this.participants.find((p) => p.username === participant.username)) {
      throw Error("A participant with the same username already exists.");
    }
    this.participants.push(participant);
  }

  remove(username: string) {
    this.participants = this.participants.filter((p) =>
      p.username !== username
    );
  }
}

export default Group;
