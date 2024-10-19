
export const $HTTPValidationError = {
  properties: {
    detail: {
      type: "array",
      contains: {
        type: "ValidationError",
      },
    },
  },
} as const;


export const $ValidationError = {
  properties: {
    loc: {
      type: "array",
      contains: {
        type: "any-of",
        contains: [
          {
            type: "string",
          },
          {
            type: "number",
          },
        ],
      },
      isRequired: true,
    },
    msg: {
      type: "string",
      isRequired: true,
    },
    type: {
      type: "string",
      isRequired: true,
    },
  },
} as const;

export const $ValueAtRisk = {
  properties: {
    daily_var: { type: "number", isRequired: true },
    weekly_var: { type: "number", isRequired: true },
    yearly_var: { type: "number", isRequired: true },
  },
} as const;

export const $TickerHistoricalData = {
  properties: {
    date: { type: "string", isRequired: true },
    price: { type: "number", isRequired: true },
  },
} as const;

export const $HistoricalData = {
  properties: {
    historical_data: { type: "array", contains: { type: "$TickerHistoricalData" }, isRequired: true },
    first_price: { type: "number", isRequired: true },
    last_price: { type: "number", isRequired: true },
    absolute_change: { type: "number", isRequired: true },
    percentage_change: { type: "number", isRequired: true },
  },
} as const;

export const $OptimizationResult = {
  properties: {
    objective: { type: "string", isRequired: true },
    investment_term_days: { type: "number", isRequired: true },
    allocation: { type: "array", contains: { type: "number" }, isRequired: true },
    expected_daily_return: { type: "number", isRequired: true },
    expected_daily_risk: { type: "number", isRequired: true },
    expected_annual_return: { type: "number", isRequired: true },
    expected_annual_risk: { type: "number", isRequired: true },
    confidence_level: { type: "number", isRequired: true },
    value_at_risk: { type: "$ValueAtRisk", isRequired: true },
    historical_data: { type: "record", contains: { type: "$HistoricalData" }, isRequired: true },
  },
} as const;

export const $FinalReturn = {
  properties: {
    risk_level: { type: "string", isRequired: true },
    investment_term: { type: "number", isRequired: true },
    portfolio: { type: "$OptimizationResult", isRequired: true },
  },
} as const;

export const $Objective = {
  enum: ["max_return", "min_risk", "max_sharpe", "max_return_with_risk", "min_risk_with_return"],
} as const;

export const $AgeGroup = {
  enum: ["Under 30", "30-45", "46-60", "Over 60"],
} as const;

export const $InvestmentGoal = {
  enum: ["Capital preservation", "Income generation", "Growth", "Aggressive growth"],
} as const;

export const $LossReaction = {
  enum: ["Sell all investments", "Sell some investments", "Do nothing", "Invest more"],
} as const;

export const $InvestmentHorizon = {
  enum: ["Less than 1 year", "1-3 years", "3-5 years", "More than 5 years"],
} as const;

export const $QuestionnaireResponse = {
  properties: {
    age_group: { type: "$AgeGroup", isRequired: true },
    investment_goal: { type: "$InvestmentGoal", isRequired: true },
    loss_reaction: { type: "$LossReaction", isRequired: true },
    investment_horizon: { type: "$InvestmentHorizon", isRequired: true },
  },
} as const;
