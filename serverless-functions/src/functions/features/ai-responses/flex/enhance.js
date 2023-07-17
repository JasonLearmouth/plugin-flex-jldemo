const { Configuration, OpenAIApi } = require('openai');
const { prepareFlexFunction } = require(Runtime.getFunctions()['common/helpers/function-helper'].path);
const requiredParameters = ['open_ai_request'];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    const openAiConfiguration = new Configuration({
      apiKey: context.OPENAI_API_KEY,
    });

    const openaiClient = new OpenAIApi(openAiConfiguration);

    console.log(`Open AI Key ${context.OPENAI_API_KEY} with model ${context.OPENAI_MODEL}`);

    const completion = await openaiClient.createChatCompletion({
      model: context.OPENAI_MODEL,
      messages: event.open_ai_request,
      max_tokens: 500,
    });

    console.log('Open AI response', completion.data);
    response.setStatusCode(200);
    response.setBody({ result: completion.data });

    return callback(null, response);
  } catch (error) {
    return handleError(error);
  }
});
