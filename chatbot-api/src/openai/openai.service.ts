import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Message } from './dto/create-chat-completion-request';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class OpenaiService {
    constructor(private readonly openai: OpenAI){}

    async createChatCompletion(messages: Message[]) {
        const completion = await this.openai.chat.completions.create({
          messages: messages as ChatCompletionMessageParam[],
          model: "gpt-3.5-turbo",
        });
        
        return completion;
}
 }