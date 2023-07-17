import * as Flex from '@twilio/flex-ui';
import ApiService from '../../../utils/serverless/ApiService';
import { OpenAIMessage, OpenAIResponse } from '../types/AiResponses';

class AiResponsesService extends ApiService {
  getEnhancedResponseBasic = async (message: string): Promise<string> => {
    const open_ai_request: OpenAIMessage[] = [];
    open_ai_request.push({ role: 'system', content: `You are an AI assistant for a company. Enhance this message` });
    open_ai_request.push({ role: 'user', content: message });
    const result = await this.getOpenAIResponse(open_ai_request);
    return result.result.choices[0].message.content;
  };

  getEnhancedResponseWithPersona = async (message: string, persona_prompt: string): Promise<string> => {
    const open_ai_request: OpenAIMessage[] = [];
    open_ai_request.push({
      role: 'system',
      content: `You are an AI assistant. Your persona ${persona_prompt}. Enhance this message`,
    });
    open_ai_request.push({ role: 'user', content: message });
    const result = await this.getOpenAIResponse(open_ai_request);
    return result.result.choices[0].message.content;
  };

  getOpenAIResponse = async (open_ai_request: OpenAIMessage[]): Promise<OpenAIResponse> => {
    return new Promise((resolve, reject) => {
      const manager = Flex.Manager.getInstance();

      const params = {
        open_ai_request,
        Token: manager.user.token,
      };

      this.fetchJsonWithReject<OpenAIResponse>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/ai-responses/flex/enhance`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        },
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error(`Error fetching canned responses\r\n`, error);
          reject(error);
        });
    });
  };
}

export default new AiResponsesService();
