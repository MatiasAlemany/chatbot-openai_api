import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, isNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateChatCompletionRequest {
  @IsArray()
  @ValidateNested({ each:true})
  @Type(() => Message)
  messages: Message[];
}

export class Message {

  @IsString()
  @IsNotEmpty()
  role: string;
  @IsString()
  @IsNotEmpty()
  content: string;
}