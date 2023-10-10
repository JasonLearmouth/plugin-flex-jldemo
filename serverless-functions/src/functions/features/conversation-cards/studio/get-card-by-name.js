const { prepareStudioFunction } = require(Runtime.getFunctions()['common/helpers/function-helper'].path);
const requiredParameters = ['card'];

exports.handler = prepareStudioFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    const filename = `${event.card}.json`;

    const openCardDefinitionJSON = Runtime.getAssets()['/features/conversation-cards/definitions/' + filename].open;
    console.log('Opening response.file = ', filename);

    const data = JSON.parse(openCardDefinitionJSON());

    response.setStatusCode(200);
    response.setBody(data);

    return callback(null, response);
  } catch (error) {
    return handleError(error);
  }
});
