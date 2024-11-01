import type { CancelablePromise } from "./core/CancelablePromise";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";

import type {
  FinalReturn, QuestionnaireResponse, PortfolioCalculator,
} from "./models";


export type TDataQuestionnairePortfolio = {
    requestBody: QuestionnaireResponse;
};

export type TDataCalculatorPortfolio = {
    requestBody: PortfolioCalculator;
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

    /**
   * Create Questionnaire
   * Create new Questionnaire.
   * @returns FinalReturn Successful Response
   * @throws ApiError
   */
    public static createCalculator(
      data: TDataCalculatorPortfolio
    ): CancelablePromise<FinalReturn> {
      const { requestBody } = data;
    
      return __request(OpenAPI, {
        method: "POST",
        url: "/api/v1/calculator/",
        query: {
          investment_term: requestBody.investment_term,
          target_return: requestBody.target_return,
          risk_limit: requestBody.risk_limit,
          confidence_level: 0.95, // Default value if not provided in the frontend
        },
        errors: {
          422: `Validation Error`,
        },
      });
    }
    
}