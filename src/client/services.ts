import type { CancelablePromise } from "./core/CancelablePromise";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";

import type {
  FinalReturn, QuestionnaireResponse
} from "./models";


export type TDataQuestionnairePortfolio = {
    requestBody: QuestionnaireResponse;
};

export class PortfolioService {
    /**
   * Create Questionnaire
   * Create new Questionnaire.
   * @returns FinalReturn Successful Response
   * @throws ApiError
   */
  public static createQuestionnaire(
    data: TDataQuestionnairePortfolio
  ): CancelablePromise<FinalReturn> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/questionnaire/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}