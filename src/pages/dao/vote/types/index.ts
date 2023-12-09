import protobuf from "protobufjs";

export interface IPollMessage {
  id: string;
  question: string;
  answers: string[];
}

export const PPollMessage = new protobuf.Type("PollMessage")
  .add(new protobuf.Field("id", 1, "string"))
  .add(new protobuf.Field("question", 2, "string"))
  .add(new protobuf.Field("answers", 3, "string", "repeated"));
