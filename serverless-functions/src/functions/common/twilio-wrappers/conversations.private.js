const { isObject } = require('lodash');
const retryHandler = require(Runtime.getFunctions()[
  'common/twilio-wrappers/retry-handler'
].path).retryHandler;

/**
 * @param {object} parameters the parameters for the function
 * @param {string} parameters.participantId the ID of the participant (i.e. phone number)
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @returns {Array<Conversation>} An array of conversations that the participant has participated in
 * @description the following method is used to robustly retrieve
 *   the conversations that the participant has been involved in. It returns the 20 most recent
 *   conversations.
 */
exports.fetchConversations = async function fetchConversations(parameters) {
  if (!isObject(parameters.context))
    throw 'Invalid parameters object passed. Parameters must contain context object';

  const { participantId } = parameters;

  if (!isString(participantId))
    throw 'Invalid parameters object passed. Parameters must contain the participantId string';

  try {
    const client = parameters.context.getTwilioClient();
    const conversations = client.conversations.v1.participantConversations.list(
      {
        address: participantId,
        limit: 20,
      }
    );

    return { success: true, conversations, status: 200 };
  } catch (error) {
    return retryHandler(error, parameters, arguments.callee);
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {string} parameters.conversationSid the SID of the conversation
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @returns {Array<Message>} An array of messages for the conversation
 * @description the following method is used to robustly retrieve
 *   the messages associated with a conversation.
 */
exports.fetchMessagesForConversation =
  async function fetchMessagesForConversation(parameters) {
    if (!isObject(parameters.context))
      throw 'Invalid parameters object passed. Parameters must contain context object';

    const { conversationSid } = parameters;

    if (!isString(conversationSid))
      throw 'Invalid parameters object passed. Parameters must contain the conversationSid string';

    try {
      const client = parameters.context.getTwilioClient();
      const messages = client.conversations.v1
        .conversations(conversationSid)
        .messages.list({ limit: 20 });

      return { success: true, messages, status: 200 };
    } catch (error) {
      return retryHandler(error, parameters, arguments.callee);
    }
  };
