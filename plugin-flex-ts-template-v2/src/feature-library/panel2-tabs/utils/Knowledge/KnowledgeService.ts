import axios from 'axios';
import { KnowledgeItem } from '../../types/Knowledge/KnowledgeItem';
import { getSearchUrl } from '../../config';

async function searchFunnelBack(question: string) {
  const url = getSearchUrl();
  console.log(`Doing FunnelBack search: ${url}`);
  const query_url = url + '&query=' + question;
  let response;

  try {
    response = await axios.post(query_url);
  } catch (error) {
    console.log('Error fetching suggested answer: ' + error);
  }

  if (response?.status !== 200 || !response?.data) {
    return;
  }

  let kbResponses: KnowledgeItem[] = [];

  console.log('KB response', response);

  if (response.data?.response?.resultPacket?.results) {
    response.data.response.resultPacket.results.map((item: any) => {
      kbResponses.push({
        title: item.title,
        body: item.summary,
        url: item.displayUrl,
      });
    });
  }

  return kbResponses;
}

async function searchRequestANZ(question: string) {
  return searchFunnelBack(question);
}

async function searchRequest(question: string) {
  return searchRequestANZ(question);
}

export { searchRequest };
