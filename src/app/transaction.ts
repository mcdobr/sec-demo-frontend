export class Transaction {
  id: string;
  sum: number;
  otherParty: string;
  type: string;
  createdAt: string;
  lastModifiedAt: string;
  description: string;


  constructor(id: string,
              sum: number,
              otherParty: string,
              type: string,
              createdAt: string,
              lastModifiedAt: string,
              description: string
  ) {
    this.id = id;
    this.sum = sum;
    this.otherParty = otherParty;
    this.type = type;
    this.createdAt = createdAt;
    this.lastModifiedAt = lastModifiedAt;
    this.description = description;
  }
}
