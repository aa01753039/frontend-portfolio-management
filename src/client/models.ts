export type HTTPValidationError = {
  detail?: Array<ValidationError>;
};


export type ValidationError = {
  loc: Array<string | number>;
  msg: string;
  type: string;
};


type ValueAtRisk = {
  daily_var: number;
  weekly_var: number;
  yearly_var: number;
};

type TickerHistoricalData = {
  date: string;
  price: number;
};

interface HistoricalData {
  historical_data: TickerHistoricalData[];
  first_price: number;
  last_price: number;
  absolute_change: number;
  percentage_change: number;
}

interface OptimizationResult {
  objective: string;
  investment_term_days: number;
  allocation: number[];
  expected_daily_return: number;
  expected_daily_risk: number;
  expected_annual_return: number;
  expected_annual_risk: number;
  confidence_level: number;
  value_at_risk: ValueAtRisk;
  historical_data: Record<string, HistoricalData>;
  correlation_matrix:  Record<string, Record<string, number>>;
}

interface FinalReturn {
  risk_level: string;
  investment_term: number;
  portfolio: OptimizationResult;
} 

enum Objective {
  max_return = "max_return",
  min_risk = "min_risk",
  max_sharpe = "max_sharpe",
  max_return_with_risk = "max_return_with_risk",
  min_risk_with_return = "min_risk_with_return",
}

enum AgeGroup {
  under_30 = "Menos de 30",
  _30_45 = "30-45",
  _46_60 = "46-60",
  over_60 = "Más de 60",
}

enum InvestmentGoal {
  capital_preservation = "Preservación de capital",
  income_generation = "Generación de ingresos",
  growth = "Crecimiento",
  aggressive_growth = "Crecimiento agresivo",
}

enum LossReaction {
  sell_all = "Vender todas las inversiones",
  sell_some = "Vender algunas inversiones",
  do_nothing = "No hacer nada",
  invest_more = "Invertir más",
}

enum InvestmentHorizon {
  less_than_1_year = "Menos de 1 año",
  _1_3_years = "1-3 años",
  _3_5_years = "3-5 años",
  more_than_5_years = "Más de 5 años",
}

interface QuestionnaireResponse {
  age_group: AgeGroup;
  investment_goal: InvestmentGoal;
  loss_reaction: LossReaction;
  investment_horizon: InvestmentHorizon;
}

interface PortfolioCalculator {
  investment_term: number;
  target_return?: number;
  risk_limit?: number;
}

export type { FinalReturn,  QuestionnaireResponse, PortfolioCalculator, };
export { Objective, AgeGroup, InvestmentGoal, LossReaction, InvestmentHorizon, };