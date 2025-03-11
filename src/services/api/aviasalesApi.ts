import {
  TSearchIdResponse,
  searchIdResponseSchema,
} from '@/types/aviasales/TSearchIdResponse';

class AviasalesApi {
  #baseUrl = 'https://aviasales-test-api.kata.academy';

  #combineUrl(path: string, search?: Record<string, string>): URL {
    const url = new URL(path, this.#baseUrl);

    if (search) {
      const searchParams = new URLSearchParams(search);
      url.search = searchParams.toString();
    }

    return url;
  }

  async getSearchId(): Promise<TSearchIdResponse> {
    const response = await fetch(this.#combineUrl('search'));

    if (!response.ok) {
      throw new Error(
        `Error on response in getSearchId: ${response.status.toString()}`,
      );
    }

    const result: unknown = await response.json();
    const parsedResult = searchIdResponseSchema.parse(result);

    return parsedResult;
  }

  async getTicketsWithLongPolling(searchId: string): Promise<Response> {
    const response = await fetch(
      this.#combineUrl('tickets', { searchId: searchId }),
    );

    return response;
  }
}

export default new AviasalesApi();
