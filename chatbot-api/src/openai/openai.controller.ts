import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateChatCompletionRequest } from './dto/create-chat-completion-request';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly OpenaiService: OpenaiService) {}

  @Post('chatCompletion')
  async chatCompletion(@Body() body: CreateChatCompletionRequest) {
    const completion = this.OpenaiService.createChatCompletion(body.messages);

    return completion;
  }
}
